/**
 * ReduxSetorAdapter — implementação default do `ISetorViewModel`.
 *
 * Endpoints (api-user):
 *  - GET    findSetoresByCompanyId/:companieId → load(companyId)
 *  - POST   setor                              → create
 *  - PUT    setor/:setorId                     → update
 *  - PUT    user/:id { userSetor }             → assignUser/removeUser (proxy)
 */

import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCoreService } from '../hooks/useCoreService'
import type { ISetorViewModel } from './ISetorViewModel'
import type {
  Setor,
  CreateSetorInput,
  UpdateSetorInput,
} from '../domain/sgu/Setor'
import {
  SGU_SETOR_SLICE_KEY,
  setSguSetorList,
  upsertSguSetor,
  removeSguSetor,
  setSguSelectedSetor,
  setSguSetorLoading,
  setSguSetorError,
  type SguSetorSliceState,
} from '../state/sgu/setorSlice'

function unwrap<T = unknown>(raw: any): T {
  if (raw == null) return raw
  if (Array.isArray(raw)) return raw as T
  if (Array.isArray(raw?.content)) return raw.content as T
  if (Array.isArray(raw?.data)) return raw.data as T
  return (raw?.content ?? raw?.data ?? raw) as T
}

export function useSetorViewModel(): ISetorViewModel {
  const dispatch = useDispatch()
  const core = useCoreService()

  const slice = useSelector(
    (s: { [SGU_SETOR_SLICE_KEY]?: SguSetorSliceState }) =>
      s[SGU_SETOR_SLICE_KEY] ?? null
  )

  const list = slice?.list ?? []
  const selected = slice?.selected ?? null
  const isLoading = slice?.isLoading ?? false
  const error = slice?.error ?? null

  const setorCtrl = useMemo(() => core.createController('setor'), [core])
  const findSetoresCtrl = useMemo(
    () => core.createController('findSetoresByCompanyId'),
    [core]
  )
  const userCtrl = useMemo(() => core.createController('user'), [core])

  const load = useCallback(
    async (companyId?: number | string): Promise<Setor[]> => {
      if (companyId == null) return list
      dispatch(setSguSetorLoading(true))
      dispatch(setSguSetorError(null))
      try {
        const raw: any = await findSetoresCtrl.get(String(companyId))
        const result = (unwrap<Setor[]>(raw) as Setor[]) ?? []
        dispatch(setSguSetorList(Array.isArray(result) ? result : []))
        return Array.isArray(result) ? result : []
      } catch (e: any) {
        dispatch(setSguSetorError(e?.message ?? 'fetch error'))
        return []
      } finally {
        dispatch(setSguSetorLoading(false))
      }
    },
    [findSetoresCtrl, dispatch, list]
  )

  const getAll = useCallback(() => list, [list])
  const getById = useCallback(
    (id: number | string) => list.find((s) => s.id === id),
    [list]
  )

  const create = useCallback(
    async (input: CreateSetorInput): Promise<Setor> => {
      const raw: any = await setorCtrl.post('', input as any)
      const created = unwrap<Setor>(raw)
      if (created) dispatch(upsertSguSetor(created as Setor))
      return created as Setor
    },
    [setorCtrl, dispatch]
  )

  const update = useCallback(
    async (id: number | string, patch: UpdateSetorInput): Promise<Setor> => {
      const raw: any = await setorCtrl.put(String(id), patch as any)
      const updated = unwrap<Setor>(raw)
      if (updated) dispatch(upsertSguSetor(updated as Setor))
      return updated as Setor
    },
    [setorCtrl, dispatch]
  )

  const remove = useCallback(
    async (id: number | string): Promise<void> => {
      // api-user atual não expõe DELETE /setor — stub
      dispatch(removeSguSetor(id))
    },
    [dispatch]
  )

  const assignUser = useCallback(
    async (
      setorId: number | string,
      userId: number | string
    ): Promise<void> => {
      await userCtrl.put(String(userId), {
        userSetor: { setorId, updated: true },
      } as any)
    },
    [userCtrl]
  )

  const removeUser = useCallback(
    async (
      _setorId: number | string,
      userId: number | string
    ): Promise<void> => {
      await userCtrl.put(String(userId), {
        userSetor: { setorId: null, updated: true },
      } as any)
    },
    [userCtrl]
  )

  const select = useCallback(
    (setor: Setor | null) => dispatch(setSguSelectedSetor(setor)),
    [dispatch]
  )

  return useMemo<ISetorViewModel>(
    () => ({
      list,
      selected,
      isLoading,
      error,
      load,
      getAll,
      getById,
      create,
      update,
      delete: remove,
      assignUser,
      removeUser,
      select,
    }),
    [
      list,
      selected,
      isLoading,
      error,
      load,
      getAll,
      getById,
      create,
      update,
      remove,
      assignUser,
      removeUser,
      select,
    ]
  )
}
