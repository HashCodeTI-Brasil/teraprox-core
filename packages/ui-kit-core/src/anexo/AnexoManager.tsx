// Cross-domain (SGM + SGP). Props-driven — sem Redux, sem useCoreService,
// sem integracao direta a GCS/backend. Upload/download sao responsabilidade
// do caller (tipicamente via `useAnexoManagerViewModel` do core-sdk, que
// encapsula o `IAnexoPort` apontando para api-manutencao + GCS signed URL).
//
// Uso tipico:
//   const vm = useAnexoManagerViewModel({ context: 'ordemDeServico', entityId })
//   <AnexoManager
//     persistidos={vm.persistidos}
//     locais={vm.locais}
//     onAddFiles={vm.addFiles}
//     onRemoveLocal={vm.removeLocal}
//     onRemovePersistido={vm.removePersistido}
//     onDownload={async (a) => window.open(a.url ?? await vm.getUrl(a.id, a.key), '_blank')}
//     loading={vm.loading}
//   />
//
// Migrado de `teraprox-ui-kit/src/forms/AnexoManager.tsx` em Track C.3 da sprint
// 2026-04-20-code-split-fix-e-ports-faltantes (decisao: cross-domain -> ui-kit-core).
//
// Refatoração 2026-05-13 (sprint ui-kit Tailwind migration):
//   - Removido CSS scoped (anexo-*) → Tailwind tokens
//   - Lightbox → primitivo `Modal` (Radix Dialog: focus trap, ESC, overlay)
//   - Barras de progresso → primitivo `Progress` (Radix)
//   - Spinner de loading → primitivo `Spinner`
//   - API externa preservada 1:1 (AnexoManagerProps inalterado)
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  FiUploadCloud, FiTrash2, FiDownload, FiRefreshCw,
  FiFile, FiImage, FiFilm, FiMusic,
} from 'react-icons/fi'
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaFileArchive } from 'react-icons/fa'
import { cn } from '../lib/cn'
import { Modal, ModalBody } from '../primitives/Modal'
import { Progress, type ProgressTone } from '../primitives/Progress'
import { Spinner } from '../primitives/Spinner'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AnexoPersistedItem {
  id: string | number
  /** API costuma devolver `originalName` em vez de `nome`. */
  nome?: string
  originalName?: string
  /** Chave GCS/S3 — necessária para pedir signed URL de leitura. */
  key?: string
  tipo?: string
  /** API batch: `image/jpeg` etc. (alias a `tipo` se necessário) */
  mimeType?: string
  tamanho?: number
  url?: string
  signedUrl?: string
  createdAt?: string
  unavailable?: boolean
}

export interface AnexoLocalItem {
  localId: string
  file: File
  nome: string
  tipo: string
  tamanho: number
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  errorMessage?: string
}

export interface AnexoManagerProps {
  /** Anexos ja persistidos (vindos da API). */
  persistidos?: AnexoPersistedItem[]
  /** Anexos locais (fila de upload). */
  locais?: AnexoLocalItem[]
  /** Chamado ao adicionar arquivos (drag/click). */
  onAddFiles?: (files: File[]) => void
  /** Chamado ao remover um local da fila. */
  onRemoveLocal?: (localId: string) => void
  /** Chamado ao remover um persistido. */
  onRemovePersistido?: (id: string | number) => void
  /** Chamado ao clicar download/preview. Deve retornar URL. */
  onDownload?: (anexo: AnexoPersistedItem) => void
  /** Chamado ao clicar retry num arquivo com erro. */
  onRetry?: (localId: string) => void
  /** Se true, mostra spinner de loading geral. */
  loading?: boolean
  /** Modo read-only (sem upload/delete). */
  readonly?: boolean
  /** Tamanho maximo por arquivo em bytes (default 50MB). */
  maxFileSize?: number
  /** Maximo de arquivos simultaneos (default 10). */
  maxFiles?: number
  /** Label customizado para a dropzone. */
  dropzoneLabel?: string
  /**
   * Resolve URL de leitura assinada (ex. `getUrl(id, key)`) — necessário se `url`/`signedUrl` não
   * vêm do backend e ainda quiser miniatura de imagem + lightbox.
   */
  getImageReadUrl?: (anexo: AnexoPersistedItem) => Promise<string>
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const UNIVERSAL_ACCEPT: Record<string, string[]> = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'text/csv': ['.csv'],
  'video/*': ['.mp4', '.webm', '.avi', '.mov', '.mkv'],
  'audio/*': ['.mp3', '.wav', '.ogg', '.aac', '.m4a'],
  'application/zip': ['.zip', '.rar', '.7z', '.tar.gz'],
  'text/plain': ['.txt', '.log'],
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isImageAnexo(a: AnexoPersistedItem): boolean {
  const t = (a.mimeType || a.tipo || '').toString()
  if (t.startsWith('image/')) return true
  const n = (a.nome || a.originalName || '').toString()
  if (/\.(jpe?g|png|gif|webp|bmp|svg|avif|heic)$/i.test(n)) return true
  return getFileCategory(a.mimeType || a.tipo, a.nome || a.originalName) === 'img'
}

function getFileCategory(tipo: string | undefined, nome: string | undefined): string {
  const t = (tipo ?? '').toString()
  const n = (nome ?? '').toString()
  const ext = n.split('.').pop()?.toLowerCase() || ''
  if (t.startsWith('image/')) return 'img'
  if (t === 'application/pdf' || ext === 'pdf') return 'pdf'
  if (t.includes('word') || ext === 'doc' || ext === 'docx') return 'doc'
  if (t.includes('excel') || t.includes('spreadsheet') || ext === 'xls' || ext === 'xlsx') return 'xls'
  if (ext === 'csv' || t === 'text/csv') return 'csv'
  if (t.startsWith('video/')) return 'vid'
  if (t.startsWith('audio/')) return 'aud'
  if (t.includes('zip') || t.includes('rar') || ext === 'zip' || ext === 'rar' || ext === '7z') return 'zip'
  return 'generic'
}

function FileIcon({ category }: { category: string }) {
  switch (category) {
    case 'pdf': return <FaFilePdf />
    case 'doc': return <FaFileWord />
    case 'xls': return <FaFileExcel />
    case 'csv': return <FaFileCsv />
    case 'img': return <FiImage />
    case 'vid': return <FiFilm />
    case 'aud': return <FiMusic />
    case 'zip': return <FaFileArchive />
    default:   return <FiFile />
  }
}

// Cores de fundo (chip do ícone) por categoria — substituem .anexo-icon-*
const ICON_BG_BY_CAT: Record<string, string> = {
  pdf: 'bg-red-500',
  doc: 'bg-blue-500',
  xls: 'bg-green-500',
  img: 'bg-violet-500',
  vid: 'bg-orange-500',
  aud: 'bg-pink-500',
  csv: 'bg-teal-500',
  zip: 'bg-indigo-500',
  generic: 'bg-slate-400',
}

// ─── Component ──────────────────────────────────────────────────────────────

export const AnexoManager: React.FC<AnexoManagerProps> = ({
  persistidos = [],
  locais = [],
  onAddFiles,
  onRemoveLocal,
  onRemovePersistido,
  onDownload,
  onRetry,
  loading = false,
  readonly = false,
  maxFileSize = 50 * 1024 * 1024,
  maxFiles = 10,
  dropzoneLabel,
  getImageReadUrl,
}) => {
  const [thumbUrls, setThumbUrls] = useState<Record<string, string>>({})
  const [unavailableIds, setUnavailableIds] = useState<Set<string | number>>(new Set())
  /** Miniaturas de imagens persistidas (id → URL de leitura) */
  const [persistImageUrls, setPersistImageUrls] = useState<Record<string, string>>({})
  const [persistImageLoading, setPersistImageLoading] = useState<Set<string>>(new Set())
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null)

  /** Estável entre renders: evita loop quando o pai recria `[]` e `getImageReadUrl` a cada render. */
  const getImageReadUrlRef = useRef(getImageReadUrl)
  getImageReadUrlRef.current = getImageReadUrl
  const persistidosSig = JSON.stringify(
    persistidos.map((a) => ({
      id: a.id,
      u: a.url,
      s: a.signedUrl,
      k: a.key,
      m: a.mimeType || a.tipo,
      n0: a.nome,
      n1: a.originalName,
      un: a.unavailable,
    }))
  )

  const handleDownload = useCallback(async (anexo: AnexoPersistedItem) => {
    if (!onDownload) return
    const url = anexo.url || anexo.signedUrl
    if (url) {
      try {
        const res = await fetch(url, { method: 'HEAD', mode: 'cors' })
        if (res.ok) {
          onDownload(anexo)
          return
        }
      } catch { /* network error — fall through */ }
      setUnavailableIds(prev => new Set(prev).add(anexo.id))
      return
    }
    onDownload(anexo)
  }, [onDownload])

  // Generate object URLs for local image thumbnails
  useEffect(() => {
    const newUrls: Record<string, string> = {}
    locais.forEach((a) => {
      const t = a.tipo || a.file?.type || ''
      if (t.startsWith('image/') && !thumbUrls[a.localId]) {
        newUrls[a.localId] = URL.createObjectURL(a.file)
      }
    })
    if (Object.keys(newUrls).length) {
      setThumbUrls((prev) => ({ ...prev, ...newUrls }))
    }
    return () => {
      Object.values(newUrls).forEach(URL.revokeObjectURL)
    }
  }, [locais])

  // URLs para miniatura de anexos persistidos do tipo imagem
  // deps: só `persistidosSig` (não `persistidos` nem função) — evita loop com props instáveis.
  useEffect(() => {
    let cancelled = false
    setPersistImageUrls({})
    setPersistImageLoading(new Set())

    const idStr = (id: string | number) => String(id)
    const resolve = getImageReadUrlRef.current

    const run = async () => {
      for (const anexo of persistidos) {
        if (!isImageAnexo(anexo)) continue
        const sid = idStr(anexo.id)
        const direct = anexo.url || anexo.signedUrl
        if (direct) {
          setPersistImageUrls((p) => ({ ...p, [sid]: direct }))
          continue
        }
        if (resolve) {
          setPersistImageLoading((s) => new Set(s).add(sid))
          try {
            const u = await resolve(anexo)
            if (!cancelled && u) {
              setPersistImageUrls((p) => ({ ...p, [sid]: u }))
            }
          } catch {
            if (!cancelled) {
              /* sem miniatura: mantém ícone */
            }
          } finally {
            if (!cancelled) {
              setPersistImageLoading((s) => {
                const n = new Set(s)
                n.delete(sid)
                return n
              })
            }
          }
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [persistidosSig])

  const openImagePreview = useCallback(
    (anexo: AnexoPersistedItem) => {
      if (!isImageAnexo(anexo)) return
      const sid = String(anexo.id)
      const u = persistImageUrls[sid] || anexo.url || anexo.signedUrl
      if (u) {
        setLightbox({ url: u, title: anexo.nome || anexo.originalName || 'Imagem' })
        return
      }
      const resolve = getImageReadUrlRef.current
      if (resolve) {
        void (async () => {
          try {
            const url = await resolve(anexo)
            if (url) setLightbox({ url, title: anexo.nome || anexo.originalName || 'Imagem' })
          } catch { /* ignorar */ }
        })()
      }
    },
    [persistImageUrls]
  )

  const openLocalImagePreview = useCallback((url: string, title: string) => {
    if (url) setLightbox({ url, title })
  }, [])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onAddFiles) onAddFiles(acceptedFiles)
    },
    [onAddFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: maxFileSize,
    maxFiles,
    accept: UNIVERSAL_ACCEPT,
    disabled: readonly,
  })

  useMemo(
    () => Object.values(UNIVERSAL_ACCEPT).flat().map((e) => e.replace('.', '').toUpperCase()),
    []
  )

  const totalCount = persistidos.length + locais.length

  // ─── Tailwind class atoms (extraídos para reuso) ────────────────────────
  const fileItemCls = cn(
    'flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white',
    'px-3 py-2.5 transition-shadow duration-150 hover:shadow-sm',
  )
  const fileNameCls =
    'text-[0.85rem] font-medium text-slate-800 truncate'
  const fileNameLinkCls = cn(
    'block w-full text-left bg-transparent border-0 p-0 cursor-pointer',
    'text-[0.85rem] font-medium text-blue-600 truncate rounded',
    'hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2',
  )
  const fileMetaCls =
    'mt-px flex items-center gap-1.5 text-[0.72rem] text-slate-400'
  const iconChipCls = (cat: string) =>
    cn(
      'flex shrink-0 items-center justify-center w-9 h-9 rounded-lg text-white text-[1.1rem]',
      ICON_BG_BY_CAT[cat] ?? ICON_BG_BY_CAT.generic,
    )
  const thumbBtnCls = cn(
    'shrink-0 p-0 border-0 bg-transparent cursor-pointer rounded-[10px] leading-none',
    'transition-[box-shadow,transform] duration-150',
    'hover:shadow-md hover:scale-[1.02]',
    'focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2',
  )
  const thumbImgCls = 'shrink-0 w-12 h-12 rounded-[10px] object-cover border border-slate-200'
  const thumbSkelCls = cn(
    'shrink-0 w-12 h-12 rounded-[10px]',
    'bg-[linear-gradient(90deg,#e2e8f0_0%,#f1f5f9_50%,#e2e8f0_100%)] bg-[length:200%_100%]',
    'animate-[anexo-shimmer_1.2s_ease-in-out_infinite]',
  )
  const actionBtnBaseCls = cn(
    'inline-flex items-center justify-center w-7 h-7 rounded-md border-0 cursor-pointer',
    'text-[0.85rem] bg-slate-100 text-slate-500',
    'transition-colors duration-150 hover:bg-slate-200 hover:text-slate-800',
    'focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1',
  )
  const dangerBtnCls = 'hover:!bg-red-100 hover:!text-red-600'
  const downloadBtnCls = 'hover:!bg-blue-100 hover:!text-blue-600'

  // Tom da Progress por status
  const progressToneByStatus = (status: AnexoLocalItem['status']): ProgressTone => {
    if (status === 'done') return 'success'
    if (status === 'error') return 'error'
    return 'brand'
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Keyframes inline p/ shimmer skeleton — autossuficiente */}
      <style>{`@keyframes anexo-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Drop Zone */}
      {!readonly && (
        <div
          {...getRootProps()}
          className={cn(
            'select-none cursor-pointer rounded-[10px] border-2 border-dashed text-center',
            'transition-[border-color,background-color] duration-200',
            'px-4 py-6 sm:px-4 sm:py-6',
            'border-slate-300 bg-slate-50',
            'hover:border-blue-500 hover:bg-blue-50',
            isDragActive && '!border-blue-500 !bg-blue-100',
            'max-sm:px-3 max-sm:py-4',
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-1.5">
            <FiUploadCloud
              className={cn(
                'text-[2rem]',
                isDragActive ? 'text-blue-500' : 'text-slate-400',
              )}
            />
            <p className="text-sm text-slate-500">
              {dropzoneLabel || (
                <>
                  <strong className="text-blue-500 cursor-pointer">Clique para selecionar</strong> ou arraste arquivos aqui
                </>
              )}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              Max. {formatFileSize(maxFileSize)} por arquivo - Ate {maxFiles} arquivos
            </p>
          </div>
        </div>
      )}

      {/* File List */}
      {(totalCount > 0 || loading) && (
        <div className="flex flex-col gap-2">
          {loading && (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 p-4 text-[0.85rem] text-slate-400">
              <Spinner size="sm" tone="brand" srLabel="Carregando anexos" />
              <span>Carregando anexos...</span>
            </div>
          )}

          {/* Persistidos */}
          {persistidos.map((anexo) => {
            const displayName = anexo.nome || anexo.originalName || 'Anexo'
            const cat = getFileCategory(anexo.mimeType || anexo.tipo, displayName)
            const isUnavailable = anexo.unavailable || unavailableIds.has(anexo.id)
            const isImg = isImageAnexo(anexo)
            const sid = String(anexo.id)
            const pImg = persistImageUrls[sid] || anexo.url || anexo.signedUrl
            const pLoading = isImg && !pImg && persistImageLoading.has(sid)
            const canPreviewImage =
              isImg && !isUnavailable && (Boolean(pImg) || Boolean(getImageReadUrl))

            return (
              <div
                key={`p-${anexo.id}`}
                className={cn(fileItemCls, isUnavailable && 'opacity-50')}
              >
                {isImg && pImg && !isUnavailable ? (
                  <button
                    type="button"
                    className={thumbBtnCls}
                    title="Ver imagem"
                    onClick={() => openImagePreview(anexo)}
                  >
                    <img src={pImg} alt="" className={thumbImgCls} />
                  </button>
                ) : isImg && pLoading ? (
                  <div className={thumbSkelCls} aria-hidden />
                ) : (
                  <div className={cn(iconChipCls(cat), isUnavailable && '!bg-slate-400')}>
                    <FileIcon category={cat} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {canPreviewImage ? (
                    <button
                      type="button"
                      className={fileNameLinkCls}
                      title={displayName}
                      onClick={() => openImagePreview(anexo)}
                    >
                      {displayName}
                    </button>
                  ) : (
                    <div className={fileNameCls} title={displayName}>{displayName}</div>
                  )}
                  <div className={fileMetaCls}>
                    {isUnavailable && (
                      <span className="text-[0.72rem] font-medium text-red-500">Anexo indisponivel</span>
                    )}
                    {!isUnavailable && anexo.tamanho ? <span>{formatFileSize(anexo.tamanho)}</span> : null}
                    {anexo.createdAt && <span>{new Date(anexo.createdAt).toLocaleDateString('pt-BR')}</span>}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  {onDownload && !isUnavailable && (
                    <button
                      type="button"
                      className={cn(actionBtnBaseCls, downloadBtnCls)}
                      title={isImg ? 'Abrir em nova aba' : 'Download'}
                      onClick={() => handleDownload(anexo)}
                    >
                      <FiDownload />
                    </button>
                  )}
                  {!readonly && onRemovePersistido && (
                    <button
                      type="button"
                      className={cn(actionBtnBaseCls, dangerBtnCls)}
                      title="Remover"
                      onClick={() => onRemovePersistido(anexo.id)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            )
          })}

          {/* Locais (fila de upload) */}
          {locais.map((anexo) => {
            const localNome = anexo.nome || anexo.file?.name || 'Arquivo'
            const localTipo = anexo.tipo || anexo.file?.type || ''
            const cat = getFileCategory(localTipo, localNome)
            const isImg = localTipo.startsWith('image/')
            const localPreviewUrl = isImg ? thumbUrls[anexo.localId] : undefined
            const showProgress =
              anexo.status === 'uploading' || anexo.status === 'done' || anexo.status === 'error'
            return (
              <div key={`l-${anexo.localId}`} className={fileItemCls}>
                {isImg && localPreviewUrl ? (
                  <button
                    type="button"
                    className={thumbBtnCls}
                    title="Pré-visualizar"
                    onClick={() => openLocalImagePreview(localPreviewUrl, localNome)}
                  >
                    <img src={localPreviewUrl} alt="" className={thumbImgCls} />
                  </button>
                ) : (
                  <div className={iconChipCls(cat)}>
                    <FileIcon category={cat} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {isImg && localPreviewUrl ? (
                    <button
                      type="button"
                      className={fileNameLinkCls}
                      title={localNome}
                      onClick={() => openLocalImagePreview(localPreviewUrl, localNome)}
                    >
                      {localNome}
                    </button>
                  ) : (
                    <div className={fileNameCls} title={localNome}>{localNome}</div>
                  )}
                  <div className={fileMetaCls}>
                    <span>{formatFileSize(anexo.tamanho)}</span>
                    {anexo.status === 'uploading' && (
                      <span className="text-[0.72rem] font-medium text-blue-500">Enviando...</span>
                    )}
                    {anexo.status === 'error' && (
                      <span className="text-[0.72rem] font-medium text-red-500">
                        {anexo.errorMessage || 'Erro'}
                      </span>
                    )}
                  </div>
                  {showProgress && (
                    <div className="mt-1.5">
                      <Progress
                        value={anexo.status === 'error' ? 100 : anexo.progress}
                        tone={progressToneByStatus(anexo.status)}
                        size="sm"
                        aria-label={
                          anexo.status === 'error'
                            ? `Erro no upload de ${localNome}`
                            : `Upload de ${localNome}`
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  {anexo.status === 'error' && onRetry && (
                    <button
                      type="button"
                      className={actionBtnBaseCls}
                      title="Tentar novamente"
                      onClick={() => onRetry(anexo.localId)}
                    >
                      <FiRefreshCw />
                    </button>
                  )}
                  {(anexo.status === 'pending' || anexo.status === 'error') && onRemoveLocal && (
                    <button
                      type="button"
                      className={cn(actionBtnBaseCls, dangerBtnCls)}
                      title="Remover"
                      onClick={() => onRemoveLocal(anexo.localId)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty state */}
      {!loading && totalCount === 0 && readonly && (
        <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center text-[0.85rem] text-slate-400">
          Nenhum anexo encontrado.
        </div>
      )}

      {/* Lightbox (preview de imagem) — primitivo Modal (Radix) */}
      <Modal
        open={!!lightbox}
        onOpenChange={(open) => { if (!open) setLightbox(null) }}
        size="xl"
        className="!bg-transparent !shadow-none"
      >
        {lightbox && (
          <ModalBody className="!p-0 flex flex-col items-stretch gap-2.5">
            <div
              className="text-xs font-medium text-slate-50 truncate pr-11 max-w-[min(90vw,1000px)]"
              title={lightbox.title}
            >
              {lightbox.title}
            </div>
            <div className="flex max-h-[calc(92vh-48px)] items-center justify-center overflow-auto rounded-xl bg-slate-900 shadow-2xl">
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="block w-auto h-auto max-w-full max-h-[min(80vh,900px)] object-contain"
              />
            </div>
          </ModalBody>
        )}
      </Modal>
    </div>
  )
}

export default AnexoManager
