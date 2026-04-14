import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  FiUploadCloud, FiTrash2, FiDownload, FiRefreshCw,
  FiFile, FiImage, FiFilm, FiMusic,
} from 'react-icons/fi'
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaFileArchive } from 'react-icons/fa'
import '../styles/AnexoManager.css'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AnexoPersistedItem {
  id: string | number
  nome: string
  tipo?: string
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
  /** Anexos já persistidos (vindos da API). */
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
  /** Tamanho máximo por arquivo em bytes (default 50MB). */
  maxFileSize?: number
  /** Máximo de arquivos simultâneos (default 10). */
  maxFiles?: number
  /** Label customizado para a dropzone. */
  dropzoneLabel?: string
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

function getFileCategory(tipo: string, nome: string): string {
  const ext = nome.split('.').pop()?.toLowerCase() || ''
  if (tipo.startsWith('image/')) return 'img'
  if (tipo === 'application/pdf' || ext === 'pdf') return 'pdf'
  if (tipo.includes('word') || ext === 'doc' || ext === 'docx') return 'doc'
  if (tipo.includes('excel') || tipo.includes('spreadsheet') || ext === 'xls' || ext === 'xlsx') return 'xls'
  if (ext === 'csv' || tipo === 'text/csv') return 'csv'
  if (tipo.startsWith('video/')) return 'vid'
  if (tipo.startsWith('audio/')) return 'aud'
  if (tipo.includes('zip') || tipo.includes('rar') || ext === 'zip' || ext === 'rar' || ext === '7z') return 'zip'
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
}) => {
  const [thumbUrls, setThumbUrls] = useState<Record<string, string>>({})
  const [unavailableIds, setUnavailableIds] = useState<Set<string | number>>(new Set())

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
      if (a.tipo.startsWith('image/') && !thumbUrls[a.localId]) {
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

  const allExtensions = useMemo(
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
              Máx. {formatFileSize(maxFileSize)} por arquivo · Até {maxFiles} arquivos
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
            const cat = getFileCategory(anexo.tipo || '', anexo.nome)
            const isUnavailable = anexo.unavailable || unavailableIds.has(anexo.id)
            return (
              <div key={`p-${anexo.id}`} className={`anexo-file-item ${isUnavailable ? 'anexo-file-unavailable' : ''}`}>
                <div className={`anexo-file-icon anexo-icon-${cat}`}>
                  <FileIcon category={cat} />
                </div>
                <div className="anexo-file-info">
                  <div className="anexo-file-name" title={anexo.nome}>{anexo.nome}</div>
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
                      title="Download"
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
            const cat = getFileCategory(anexo.tipo, anexo.nome)
            const isImg = anexo.tipo.startsWith('image/')
            return (
              <div key={`l-${anexo.localId}`} className="anexo-file-item">
                {isImg && thumbUrls[anexo.localId] ? (
                  <img src={thumbUrls[anexo.localId]} alt="" className="anexo-file-thumb" />
                ) : (
                  <div className={`anexo-file-icon anexo-icon-${cat}`}>
                    <FileIcon category={cat} />
                  </div>
                )}
                <div className="anexo-file-info">
                  <div className="anexo-file-name" title={anexo.nome}>{anexo.nome}</div>
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
    </div>
  )
}

export default AnexoManager
