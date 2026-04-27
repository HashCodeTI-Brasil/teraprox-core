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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  FiUploadCloud, FiTrash2, FiDownload, FiRefreshCw, FiX,
  FiFile, FiImage, FiFilm, FiMusic,
} from 'react-icons/fi'
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaFileArchive } from 'react-icons/fa'
import './AnexoManager.css'

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

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

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

  return (
    <div className="anexo-manager">
      {/* Drop Zone */}
      {!readonly && (
        <div
          {...getRootProps()}
          className={`anexo-dropzone ${isDragActive ? 'anexo-drag-active' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="anexo-dropzone-inner">
            <FiUploadCloud className="anexo-dropzone-icon" />
            <p className="anexo-dropzone-text">
              {dropzoneLabel || (
                <>
                  <strong>Clique para selecionar</strong> ou arraste arquivos aqui
                </>
              )}
            </p>
            <p className="anexo-dropzone-hint">
              Max. {formatFileSize(maxFileSize)} por arquivo - Ate {maxFiles} arquivos
            </p>
          </div>
        </div>
      )}

      {/* File List */}
      {(totalCount > 0 || loading) && (
        <div className="anexo-file-list">
          {loading && (
            <div className="anexo-empty">Carregando anexos...</div>
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
              <div key={`p-${anexo.id}`} className={`anexo-file-item ${isUnavailable ? 'anexo-file-unavailable' : ''}`}>
                {isImg && pImg && !isUnavailable ? (
                  <button
                    type="button"
                    className="anexo-persist-thumb-wrap"
                    title="Ver imagem"
                    onClick={() => openImagePreview(anexo)}
                  >
                    <img src={pImg} alt="" className="anexo-file-thumb anexo-file-thumb--lg" />
                  </button>
                ) : isImg && pLoading ? (
                  <div className="anexo-persist-thumb-skel" aria-hidden />
                ) : (
                  <div className={`anexo-file-icon anexo-icon-${cat}`}>
                    <FileIcon category={cat} />
                  </div>
                )}
                <div className="anexo-file-info">
                  {canPreviewImage ? (
                    <button
                      type="button"
                      className="anexo-file-name anexo-file-name--link"
                      title={displayName}
                      onClick={() => openImagePreview(anexo)}
                    >
                      {displayName}
                    </button>
                  ) : (
                    <div className="anexo-file-name" title={displayName}>{displayName}</div>
                  )}
                  <div className="anexo-file-meta">
                    {isUnavailable && <span className="anexo-status-error">Anexo indisponivel</span>}
                    {!isUnavailable && anexo.tamanho ? <span>{formatFileSize(anexo.tamanho)}</span> : null}
                    {anexo.createdAt && <span>{new Date(anexo.createdAt).toLocaleDateString('pt-BR')}</span>}
                  </div>
                </div>
                <div className="anexo-file-actions">
                  {onDownload && !isUnavailable && (
                    <button
                      type="button"
                      className="anexo-btn-action anexo-btn-download"
                      title={isImg ? 'Abrir em nova aba' : 'Download'}
                      onClick={() => handleDownload(anexo)}
                    >
                      <FiDownload />
                    </button>
                  )}
                  {!readonly && onRemovePersistido && (
                    <button
                      type="button"
                      className="anexo-btn-action anexo-btn-danger"
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
            return (
              <div key={`l-${anexo.localId}`} className="anexo-file-item">
                {isImg && localPreviewUrl ? (
                  <button
                    type="button"
                    className="anexo-persist-thumb-wrap"
                    title="Pré-visualizar"
                    onClick={() => openLocalImagePreview(localPreviewUrl, localNome)}
                  >
                    <img src={localPreviewUrl} alt="" className="anexo-file-thumb anexo-file-thumb--lg" />
                  </button>
                ) : (
                  <div className={`anexo-file-icon anexo-icon-${cat}`}>
                    <FileIcon category={cat} />
                  </div>
                )}
                <div className="anexo-file-info">
                  {isImg && localPreviewUrl ? (
                    <button
                      type="button"
                      className="anexo-file-name anexo-file-name--link"
                      title={localNome}
                      onClick={() => openLocalImagePreview(localPreviewUrl, localNome)}
                    >
                      {localNome}
                    </button>
                  ) : (
                    <div className="anexo-file-name" title={localNome}>{localNome}</div>
                  )}
                  <div className="anexo-file-meta">
                    <span>{formatFileSize(anexo.tamanho)}</span>
                    {anexo.status === 'uploading' && <span className="anexo-status-uploading">Enviando...</span>}
                    {anexo.status === 'error' && (
                      <span className="anexo-status-error">{anexo.errorMessage || 'Erro'}</span>
                    )}
                  </div>
                  {(anexo.status === 'uploading' || anexo.status === 'done') && (
                    <div className="anexo-progress-bar">
                      <div
                        className={`anexo-progress-fill ${
                          anexo.status === 'done' ? 'anexo-progress-done' : ''
                        }`}
                        style={{ width: `${anexo.progress}%` }}
                      />
                    </div>
                  )}
                  {anexo.status === 'error' && (
                    <div className="anexo-progress-bar">
                      <div className="anexo-progress-fill anexo-progress-error" style={{ width: '100%' }} />
                    </div>
                  )}
                </div>
                <div className="anexo-file-actions">
                  {anexo.status === 'error' && onRetry && (
                    <button
                      type="button"
                      className="anexo-btn-action"
                      title="Tentar novamente"
                      onClick={() => onRetry(anexo.localId)}
                    >
                      <FiRefreshCw />
                    </button>
                  )}
                  {(anexo.status === 'pending' || anexo.status === 'error') && onRemoveLocal && (
                    <button
                      type="button"
                      className="anexo-btn-action anexo-btn-danger"
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
        <div className="anexo-empty">Nenhum anexo encontrado.</div>
      )}

      {lightbox && (
        <div
          className="anexo-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null)
          }}
        >
          <div className="anexo-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="anexo-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Fechar"
            >
              <FiX />
            </button>
            <div className="anexo-lightbox-title">{lightbox.title}</div>
            <div className="anexo-lightbox-img-wrap">
              <img src={lightbox.url} alt={lightbox.title} className="anexo-lightbox-img" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnexoManager
