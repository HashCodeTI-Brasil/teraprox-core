// Promovido de teraprox-SGP-caderno/RegistroDeCampoCardView.
// Wave H.4 (2026-05-15) — DOMAIN_PURO. Encapsula o adapter
// registro.anexos -> AnexoPersistedItem + fila de uploads locais
// + cleanup do "twin" (persisted que chega depois do done local) +
// optimistic badge count.
//
// IO injetada (Port-style):
//   - putAnexoApi(id, file) -> Promise<persistedItem>  (adapter HTTP)
//   - deleteAnexoApi(id, key) -> Promise<void>
//   - getSignedUrl(key) -> Promise<string>             (signed URL on-demand)
//   - onToast?(level,msg)                              (callback opcional)
//
// uuid -> import { v4 as uuid } from 'uuid'  (jamais o pacote `uuidv4`,
// que crasha o browser com stack overflow — feedback canonico).
import { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { AnexoLocalItem, AnexoPersistedItem } from '@hashcodeti/ui-kit-core'

export type AnexoToastLevel = 'success' | 'error' | 'info'

export interface UseAnexoManagerArgs {
  registroId: any
  rawAnexos: any[] | undefined
  putAnexoApi: (id: any, file: File) => Promise<any>
  deleteAnexoApi: (id: any, key: string) => Promise<any>
  getSignedUrl?: (key: string) => Promise<string>
  onToast?: (level: AnexoToastLevel, msg: string) => void
}

export interface UseAnexoManagerResult {
  showAnexoModal: boolean
  openAnexoModal: () => void
  closeAnexoModal: () => void
  persistedAnexos: AnexoPersistedItem[]
  locais: AnexoLocalItem[]
  anexoBadgeCount: number
  onAddFiles: (files: File[]) => void
  onRemoveLocal: (localId: string) => void
  onRemovePersistido: (id: string | number) => Promise<void>
  onDownloadAnexo: (anexo: AnexoPersistedItem) => Promise<void>
  getImageReadUrl: (anexo: AnexoPersistedItem) => Promise<string>
}

export const useAnexoManager = ({
  registroId,
  rawAnexos,
  putAnexoApi,
  deleteAnexoApi,
  getSignedUrl,
  onToast,
}: UseAnexoManagerArgs): UseAnexoManagerResult => {
  const [showAnexoModal, setShowAnexoModal] = useState(false)
  const [locais, setLocais] = useState<AnexoLocalItem[]>([])

  const openAnexoModal = useCallback(() => setShowAnexoModal(true), [])
  const closeAnexoModal = useCallback(() => setShowAnexoModal(false), [])

  // Adapter: registro.anexos shape -> AnexoPersistedItem.
  // Memoizado p/ preservar identidade entre re-renders (evita bust em
  // memos internos do AnexoManager — causava lag visivel pós-upload).
  const persistedAnexos = useMemo<AnexoPersistedItem[]>(
    () =>
      (rawAnexos || []).map((a: any, i: number) => ({
        id: a.id ?? `p-${i}`,
        nome: a.nome ?? a.originalName ?? a.fileName ?? `Anexo ${i + 1}`,
        originalName: a.originalName ?? a.nome,
        tipo: a.tipo ?? a.contentType ?? a.mimeType ?? '',
        mimeType: a.mimeType ?? a.contentType,
        tamanho: a.tamanho ?? a.size,
        url: a.url ?? a.signedUrl,
        signedUrl: a.signedUrl,
        key: a.key,
        createdAt: a.createdAt,
      })),
    [rawAnexos],
  )

  // Optimistic badge: persistidos + locais 'done' (twin ainda nao chegou).
  const anexoBadgeCount = useMemo(
    () => persistedAnexos.length + locais.filter((l) => l.status === 'done').length,
    [persistedAnexos.length, locais],
  )

  const onAddFiles = useCallback(
    (files: File[]) => {
      const newLocais: AnexoLocalItem[] = files.map((file) => ({
        localId: uuid(),
        file,
        nome: file.name,
        tipo: file.type,
        tamanho: file.size,
        progress: 0,
        status: 'uploading',
      }))
      setLocais((prev) => [...prev, ...newLocais])
      newLocais.forEach(async (item) => {
        try {
          await putAnexoApi(registroId, item.file)
          setLocais((prev) =>
            prev.map((l) =>
              l.localId === item.localId ? { ...l, status: 'done', progress: 100 } : l,
            ),
          )
          onToast?.('success', 'Anexo enviado com sucesso!')
        } catch (err) {
          console.error('Falha ao enviar anexo', err)
          setLocais((prev) =>
            prev.map((l) =>
              l.localId === item.localId
                ? { ...l, status: 'error', errorMessage: 'Falha no upload' }
                : l,
            ),
          )
          onToast?.('error', 'Erro ao enviar anexo')
        }
      })
    },
    [registroId, putAnexoApi, onToast],
  )

  // Drop locais 'done' cujo persisted twin chegou (matched por nome+tamanho).
  useEffect(() => {
    if (locais.length === 0) return
    setLocais((prev) =>
      prev.filter((l) => {
        if (l.status !== 'done') return true
        const arrived = persistedAnexos.some(
          (p) =>
            (p.nome === l.nome || p.originalName === l.nome) &&
            (p.tamanho === l.tamanho || !p.tamanho),
        )
        return !arrived
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedAnexos])

  const onRemoveLocal = useCallback((localId: string) => {
    setLocais((prev) => prev.filter((l) => l.localId !== localId))
  }, [])

  const onRemovePersistido = useCallback(
    async (id: string | number) => {
      const target = persistedAnexos.find((a) => String(a.id ?? '') === String(id))
      const key = target?.key
      if (!key) return
      try {
        await deleteAnexoApi(registroId, key)
        onToast?.('success', 'Anexo removido com sucesso!')
      } catch (err) {
        console.error('Erro ao remover anexo', err)
        onToast?.('error', 'Erro ao remover anexo')
      }
    },
    [persistedAnexos, registroId, deleteAnexoApi, onToast],
  )

  const getImageReadUrl = useCallback(
    async (anexo: AnexoPersistedItem) => {
      if (anexo?.url) return anexo.url
      if (anexo?.signedUrl) return anexo.signedUrl
      if (!anexo?.key || !getSignedUrl) return ''
      try {
        return (await getSignedUrl(anexo.key)) || ''
      } catch (err) {
        console.error('Falha ao obter URL assinada', err)
        return ''
      }
    },
    [getSignedUrl],
  )

  const onDownloadAnexo = useCallback(
    async (anexo: AnexoPersistedItem) => {
      const url = anexo.url || anexo.signedUrl || (await getImageReadUrl(anexo))
      if (url) window.open(url, '_blank')
    },
    [getImageReadUrl],
  )

  return {
    showAnexoModal,
    openAnexoModal,
    closeAnexoModal,
    persistedAnexos,
    locais,
    anexoBadgeCount,
    onAddFiles,
    onRemoveLocal,
    onRemovePersistido,
    onDownloadAnexo,
    getImageReadUrl,
  }
}

export default useAnexoManager
