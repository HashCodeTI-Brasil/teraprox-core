/**
 * ReduxEmpresaAdapter — implementação default do `IEmpresaViewModel`.
 *
 * Endpoints (api-user):
 *  - GET    company/:id              → loadCurrent
 *  - GET    companiesByUser/:userId  → loadForUser
 *  - GET    colaborators[/:name]     → getMembers (delega via controller)
 *  - PUT    company/:id              → update (TODO backend; stub local)
 */

import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCoreService } from '../hooks/useCoreService'
import type { IEmpresaViewModel } from './IEmpresaViewModel'
import type { Empresa, UpdateEmpresaInput } from '../domain/sgu/Empresa'
import type { User } from '../domain/sgu/User'
import {
  SGU_EMPRESA_SLICE_KEY,
  setSguCurrentEmpresa,
  setSguEmpresaCompanies,
  setSguSelectedEmpresa,
  setSguEmpresaLoading,
  setSguEmpresaError,
  type SguEmpresaSliceState,
} from '../state/sgu/empresaSlice'

function unwrap<T = unknown>(raw: any): T {
  if (raw == null) return raw
  if (Array.isArray(raw)) return raw as T
  if (Array.isArray(raw?.content)) return raw.content as T
  if (Array.isArray(raw?.data)) return raw.data as T
  return (raw?.content ?? raw?.data ?? raw) as T
}

export function useEmpresaViewModel(): IEmpresaViewModel {
  const dispatch = useDispatch()
  const core = useCoreService()

  const slice = useSelector(
    (s: { [SGU_EMPRESA_SLICE_KEY]?: SguEmpresaSliceState }) =>
      s[SGU_EMPRESA_SLICE_KEY] ?? null
  )

  const current = slice?.current ?? null
  const companies = slice?.companies ?? []
  const selected = slice?.selected ?? null
  const isLoading = slice?.isLoading ?? false
  const error = slice?.error ?? null

  const companyCtrl = useMemo(() => core.createController('company'), [core])
  const companiesByUserCtrl = useMemo(
    () => core.createController('companiesByUser'),
    [core]
  )
  const colaboratorsCtrl = useMemo(
    () => core.createController('colaborators'),
    [core]
  )

  const loadCurrent = useCallback(
    async (companyId: number | string): Promise<Empresa> => {
      dispatch(setSguEmpresaLoading(true))
      dispatch(setSguEmpresaError(null))
      try {
        const raw: any = await companyCtrl.get(String(companyId))
        const empresa = unwrap<Empresa>(raw) as Empresa
        if (empresa) dispatch(setSguCurrentEmpresa(empresa))
        return empresa
      } catch (e: any) {
        dispatch(setSguEmpresaError(e?.message ?? 'fetch error'))
        throw e
      } finally {
        dispatch(setSguEmpresaLoading(false))
      }
    },
    [companyCtrl, dispatch]
  )

  const loadForUser = useCallback(
    async (userId: number | string): Promise<Empresa[]> => {
      try {
        const raw: any = await companiesByUserCtrl.get(String(userId))
        const result = (unwrap<Empresa[]>(raw) as Empresa[]) ?? []
        const list = Array.isArray(result) ? result : []
        dispatch(setSguEmpresaCompanies(list))
        return list
      } catch (e: any) {
        dispatch(setSguEmpresaError(e?.message ?? 'fetch error'))
        return []
      }
    },
    [companiesByUserCtrl, dispatch]
  )

  const update = useCallback(
    async (
      id: number | string,
      patch: UpdateEmpresaInput
    ): Promise<Empresa> => {
      // api-user atual não expõe PUT /company/:id; chamamos por convenção
      // — backend retornará 404 até implementar. Mantém contrato Port.
      const raw: any = await companyCtrl.put(String(id), patch as any)
      const updated = (unwrap<Empresa>(raw) as Empresa) ?? ({ id, ...patch } as Empresa)
      if (updated) dispatch(setSguCurrentEmpresa(updated))
      return updated
    },
    [companyCtrl, dispatch]
  )

  const getMembers = useCallback(
    async (companyId?: number | string): Promise<User[]> => {
      try {
        // Quando companyId é o id da company atual, usar /colaborators raiz;
        // caso contrário, chama por nome (contrato legado). Web-client atual
        // só consome /colaborators raiz — manter simples.
        const path = companyId != null ? '' : ''
        const raw: any = await colaboratorsCtrl.get(path)
        const result = (unwrap<User[]>(raw) as User[]) ?? []
        return Array.isArray(result) ? result : []
      } catch (e: any) {
        dispatch(setSguEmpresaError(e?.message ?? 'fetch error'))
        return []
      }
    },
    [colaboratorsCtrl, dispatch]
  )

  const select = useCallback(
    (empresa: Empresa | null) => dispatch(setSguSelectedEmpresa(empresa)),
    [dispatch]
  )

  return useMemo<IEmpresaViewModel>(
    () => ({
      current,
      companies,
      selected,
      isLoading,
      error,
      loadCurrent,
      loadForUser,
      update,
      getMembers,
      select,
    }),
    [
      current,
      companies,
      selected,
      isLoading,
      error,
      loadCurrent,
      loadForUser,
      update,
      getMembers,
      select,
    ]
  )
}
