/**
 * ReduxPermissaoAdapter — implementação default do `IPermissaoViewModel`.
 *
 * Carrega catálogo de permissões via endpoint legado (frontEndPerms.txt
 * encriptado AES-256-CBC, decifrado client-side por compat). Sprint
 * dedicada futura substituirá por endpoint server-side limpo.
 *
 * Endpoints:
 *  - GET   frontEndPerms.txt  (controller 'frontEndPerms') → loadCatalog
 *  - PUT   permissao/:id      (controller 'permissao')     → updatePermission
 *
 * Decisão: o decrypt fica fora do core-sdk (depende de `crypto` browser
 * polyfill / chave pública); aqui chamamos o endpoint e devolvemos o
 * payload já desserializado quando o backend enviar JSON, OU repassamos
 * o blob para o consumidor decifrar (caller fornece `decryptHook`).
 */

import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCoreService } from '../hooks/useCoreService'
import type { IPermissaoViewModel } from './IPermissaoViewModel'
import type {
  PermissionPath,
  PermissionComponent,
  BlockedPermissionItem,
  UpdatePermissionInput,
} from '../domain/sgu/Permission'
import {
  SGU_PERMISSAO_SLICE_KEY,
  setSguPermissaoCatalog,
  setSguPermissaoLoading,
  setSguPermissaoError,
  type SguPermissaoSliceState,
} from '../state/sgu/permissaoSlice'

export interface UsePermissaoViewModelOptions {
  /**
   * Hook de decrypt fornecido pelo consumer (web-client ou SGU-screens).
   * Recebe blob bruto e devolve PermissionPath[]. Default: assume JSON
   * limpo `JSON.parse(raw)` ou objeto já desserializado.
   */
  decrypt?: (raw: unknown) => PermissionPath[] | Promise<PermissionPath[]>
}

function defaultDecrypt(raw: unknown): PermissionPath[] {
  if (Array.isArray(raw)) return raw as PermissionPath[]
  if (raw && typeof raw === 'object') {
    const r: any = raw
    if (Array.isArray(r.content)) return r.content
    if (Array.isArray(r.data)) return r.data
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

export function usePermissaoViewModel(
  options: UsePermissaoViewModelOptions = {}
): IPermissaoViewModel {
  const dispatch = useDispatch()
  const core = useCoreService()

  const slice = useSelector(
    (s: { [SGU_PERMISSAO_SLICE_KEY]?: SguPermissaoSliceState }) =>
      s[SGU_PERMISSAO_SLICE_KEY] ?? null
  )

  const catalog = slice?.catalog ?? []
  const isLoading = slice?.isLoading ?? false
  const error = slice?.error ?? null

  const frontEndPermsCtrl = useMemo(
    () => core.createController('frontEndPerms'),
    [core]
  )
  const permissaoCtrl = useMemo(
    () => core.createController('permissao'),
    [core]
  )

  const decrypt = options.decrypt ?? defaultDecrypt

  const loadCatalog = useCallback(async (): Promise<PermissionPath[]> => {
    dispatch(setSguPermissaoLoading(true))
    dispatch(setSguPermissaoError(null))
    try {
      const raw: any = await frontEndPermsCtrl.get('')
      const decoded = await decrypt(raw)
      const result = Array.isArray(decoded) ? decoded : []
      dispatch(setSguPermissaoCatalog(result))
      return result
    } catch (e: any) {
      dispatch(setSguPermissaoError(e?.message ?? 'fetch error'))
      return []
    } finally {
      dispatch(setSguPermissaoLoading(false))
    }
  }, [frontEndPermsCtrl, dispatch, decrypt])

  const listPaths = useCallback(() => catalog, [catalog])

  const listComponents = useCallback((): PermissionComponent[] => {
    return catalog.flatMap((p) => p.components ?? [])
  }, [catalog])

  const listBlocked = useCallback((): BlockedPermissionItem[] => {
    return catalog
      .map((p) => {
        const componentesBloqueados = (p.components ?? [])
          .filter((c) => c.blocked)
          .map((c) => c.label)
        if (p.locationBloqueado || componentesBloqueados.length > 0) {
          return {
            ...(p.locationBloqueado && { locationBloqueado: p.path }),
            componentesBloqueados,
          }
        }
        return null
      })
      .filter(Boolean) as BlockedPermissionItem[]
  }, [catalog])

  const updatePermission = useCallback(
    async (
      permissaoId: number | string,
      payload: UpdatePermissionInput
    ): Promise<void> => {
      try {
        await permissaoCtrl.put(String(permissaoId), payload as any)
      } catch (e: any) {
        dispatch(setSguPermissaoError(e?.message ?? 'update error'))
        throw e
      }
    },
    [permissaoCtrl, dispatch]
  )

  return useMemo<IPermissaoViewModel>(
    () => ({
      catalog,
      isLoading,
      error,
      loadCatalog,
      listPaths,
      listComponents,
      listBlocked,
      updatePermission,
    }),
    [
      catalog,
      isLoading,
      error,
      loadCatalog,
      listPaths,
      listComponents,
      listBlocked,
      updatePermission,
    ]
  )
}
