import { useState, useCallback, useRef } from 'react'
import { useCoreService } from './useCoreService'
import type { IAnexoPort, AnexoPersistido, AnexoLocal, UploadIntent } from '../types/IAnexoPort'

interface UseAnexoManagerOptions {
  context: string
  entityId: string | number
  /** Port customizado (para injeção em testes ou implementações alternativas). */
  port?: IAnexoPort
}

interface UseAnexoManagerReturn {
  persistidos: AnexoPersistido[]
  locais: AnexoLocal[]
  loading: boolean
  /** Carrega anexos existentes da entidade. */
  loadAnexos: () => Promise<void>
  /** Adiciona arquivos locais (ainda não enviados). */
  addFiles: (files: File[]) => void
  /** Remove um arquivo local da fila. */
  removeLocal: (localId: string) => void
  /** Envia todos os arquivos pendentes. Se `overrideEntityId` for fornecido, usa-o em vez do entityId do hook. */
  uploadAll: (overrideEntityId?: string | number) => Promise<AnexoPersistido[]>
  /** Remove um anexo persistido (do servidor). */
  removePersistido: (anexoId: string | number) => Promise<void>
  /** Obtém signed URL para preview/download. */
  getUrl: (anexoId: string | number) => Promise<string>
}

function generateLocalId(): string {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Hook central para gerenciamento de anexos.
 * Conecta a UI (AnexoManager do ui-kit) com a infraestrutura HTTP (core-sdk).
 */
export function useAnexoManager({ context, entityId, port }: UseAnexoManagerOptions): UseAnexoManagerReturn {
  const { createController } = useCoreService()
  const [persistidos, setPersistidos] = useState<AnexoPersistido[]>([])
  const [locais, setLocais] = useState<AnexoLocal[]>([])
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef(createController('anexo'))

  const getPort = useCallback((): IAnexoPort => {
    if (port) return port
    const ctrl = controllerRef.current
    return {
      intent: (params) => ctrl.post('intent', {
        fileName: params.nome,
        contentType: params.tipo,
        size: params.tamanho,
        dataId: String(params.entityId),
        dataContext: params.context,
      }),
      confirm: (params) => ctrl.post('confirm', {
        key: (params as any).key,
        fileName: (params as any).fileName ?? '',
        contentType: (params as any).contentType ?? '',
        dataId: String(params.entityId),
        dataContext: params.context,
      }),
      uploadDirect: async ({ file, context: ctx, entityId: eid }) => {
        const targetCtrl = createController(ctx)
        return targetCtrl.put(`anexo/${eid}`, {
          anexos: [{ nome: file.name, tipo: file.type, tamanho: file.size }],
        })
      },
      readByEntity: (ctx, eid) => ctrl.get(`${eid}/${ctx}`),
      getSignedUrl: (anexoId) => ctrl.post('signedUrl', { anexoId }).then((r: any) => r?.url || r?.signedUrl || ''),
      remove: (anexoId) => ctrl.delete('', anexoId),
    }
  }, [port, createController])

  const loadAnexos = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getPort().readByEntity(context, entityId)
      setPersistidos(Array.isArray(data) ? data : [])
    } catch {
      setPersistidos([])
    } finally {
      setLoading(false)
    }
  }, [context, entityId, getPort])

  const addFiles = useCallback((files: File[]) => {
    const newLocais: AnexoLocal[] = files.map((file) => ({
      localId: generateLocalId(),
      file,
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      progress: 0,
      status: 'pending' as const,
    }))
    setLocais((prev) => [...prev, ...newLocais])
  }, [])

  const removeLocal = useCallback((localId: string) => {
    setLocais((prev) => prev.filter((a) => a.localId !== localId))
  }, [])

  const uploadAll = useCallback(async (overrideEntityId?: string | number): Promise<AnexoPersistido[]> => {
    const pending = locais.filter((a) => a.status === 'pending' || a.status === 'error')
    if (!pending.length) return []

    const eid = overrideEntityId ?? entityId
    const results: AnexoPersistido[] = []
    const p = getPort()

    for (const anexo of pending) {
      setLocais((prev) =>
        prev.map((a) => a.localId === anexo.localId ? { ...a, status: 'uploading' as const, progress: 10 } : a)
      )

      try {
        let intent: UploadIntent | null = null
        try {
          intent = await p.intent({
            nome: anexo.nome,
            tipo: anexo.tipo,
            tamanho: anexo.tamanho,
            context,
            entityId: eid,
          })
        } catch {
          // intent not available, fallback to direct
        }

        setLocais((prev) =>
          prev.map((a) => a.localId === anexo.localId ? { ...a, progress: 40 } : a)
        )

        let result: AnexoPersistido
        const intentUrl = intent?.uploadUrl || intent?.signedUrl
        if (intentUrl) {
          await fetch(intentUrl, {
            method: 'PUT',
            body: anexo.file,
            headers: { 'Content-Type': anexo.tipo },
          })
          setLocais((prev) =>
            prev.map((a) => a.localId === anexo.localId ? { ...a, progress: 80 } : a)
          )
          result = await p.confirm({
            anexoId: intent!.anexoId,
            context,
            entityId: eid,
            key: intent!.key,
            fileName: intent!.fileName ?? anexo.nome,
            contentType: intent!.contentType ?? anexo.tipo,
          } as any)
        } else {
          result = await p.uploadDirect({ file: anexo.file, context, entityId: eid })
        }

        setLocais((prev) =>
          prev.map((a) => a.localId === anexo.localId ? { ...a, status: 'done' as const, progress: 100 } : a)
        )
        results.push(result)
      } catch (err: any) {
        setLocais((prev) =>
          prev.map((a) =>
            a.localId === anexo.localId
              ? { ...a, status: 'error' as const, progress: 0, errorMessage: err?.message || 'Falha no upload' }
              : a
          )
        )
      }
    }

    if (results.length) {
      setPersistidos((prev) => [...prev, ...results])
      setLocais((prev) => prev.filter((a) => a.status !== 'done'))
    }

    return results
  }, [locais, getPort, context, entityId])

  const removePersistido = useCallback(async (anexoId: string | number) => {
    try {
      await getPort().remove(anexoId)
      setPersistidos((prev) => prev.filter((a) => a.id !== anexoId))
    } catch {
      // silently fail
    }
  }, [getPort])

  const getUrl = useCallback(async (anexoId: string | number): Promise<string> => {
    return getPort().getSignedUrl(anexoId)
  }, [getPort])

  return {
    persistidos,
    locais,
    loading,
    loadAnexos,
    addFiles,
    removeLocal,
    uploadAll,
    removePersistido,
    getUrl,
  }
}
