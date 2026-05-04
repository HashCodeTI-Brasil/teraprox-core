/**
 * ReduxRoleAdapter — implementação default do `IRoleViewModel`.
 *
 * Endpoints (api-user):
 *  - GET    role/byCompanie/:companieId → load(companyId)
 *  - GET    role/:id                    → getById
 *  - POST   role                        → create
 *  - PUT    role/:id                    → update / setPermissions
 */

import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCoreService } from '../hooks/useCoreService'
import type { IRoleViewModel } from './IRoleViewModel'
import type {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
} from '../domain/sgu/Role'
import type { PermissionPath } from '../domain/sgu/Permission'
import {
  SGU_ROLE_SLICE_KEY,
  setSguRoleList,
  upsertSguRole,
  removeSguRole,
  setSguSelectedRole,
  setSguRoleLoading,
  setSguRoleError,
  type SguRoleSliceState,
} from '../state/sgu/roleSlice'

function unwrap<T = unknown>(raw: any): T {
  if (raw == null) return raw
  if (Array.isArray(raw)) return raw as T
  if (Array.isArray(raw?.content)) return raw.content as T
  if (Array.isArray(raw?.data)) return raw.data as T
  return (raw?.content ?? raw?.data ?? raw) as T
}

export function useRoleViewModel(): IRoleViewModel {
  const dispatch = useDispatch()
  const core = useCoreService()

  const slice = useSelector(
    (s: { [SGU_ROLE_SLICE_KEY]?: SguRoleSliceState }) =>
      s[SGU_ROLE_SLICE_KEY] ?? null
  )

  const list = slice?.list ?? []
  const selected = slice?.selected ?? null
  const isLoading = slice?.isLoading ?? false
  const error = slice?.error ?? null

  const roleCtrl = useMemo(() => core.createController('role'), [core])

  const load = useCallback(
    async (companyId?: number | string): Promise<Role[]> => {
      if (companyId == null) return list
      dispatch(setSguRoleLoading(true))
      dispatch(setSguRoleError(null))
      try {
        const raw: any = await roleCtrl.get(`byCompanie/${companyId}`)
        const result = (unwrap<Role[]>(raw) as Role[]) ?? []
        dispatch(setSguRoleList(Array.isArray(result) ? result : []))
        return Array.isArray(result) ? result : []
      } catch (e: any) {
        dispatch(setSguRoleError(e?.message ?? 'fetch error'))
        return []
      } finally {
        dispatch(setSguRoleLoading(false))
      }
    },
    [roleCtrl, dispatch, list]
  )

  const getAll = useCallback(() => list, [list])

  const getById = useCallback(
    async (id: number | string): Promise<Role | null> => {
      try {
        const raw: any = await roleCtrl.get(String(id))
        const role = unwrap<Role>(raw)
        if (role) dispatch(upsertSguRole(role as Role))
        return (role as Role) ?? null
      } catch (e: any) {
        dispatch(setSguRoleError(e?.message ?? 'fetch error'))
        return null
      }
    },
    [roleCtrl, dispatch]
  )

  const create = useCallback(
    async (input: CreateRoleInput): Promise<Role> => {
      const raw: any = await roleCtrl.post('', input as any)
      const created = unwrap<Role>(raw)
      if (created) dispatch(upsertSguRole(created as Role))
      return created as Role
    },
    [roleCtrl, dispatch]
  )

  const update = useCallback(
    async (id: number | string, patch: UpdateRoleInput): Promise<Role> => {
      const raw: any = await roleCtrl.put(String(id), patch as any)
      const updated = unwrap<Role>(raw)
      if (updated) dispatch(upsertSguRole(updated as Role))
      return updated as Role
    },
    [roleCtrl, dispatch]
  )

  const remove = useCallback(
    async (id: number | string): Promise<void> => {
      // api-user atual não expõe DELETE /role — stub via Adapter quando
      // backend ganhar suporte. Por ora apenas remove do estado.
      dispatch(removeSguRole(id))
    },
    [dispatch]
  )

  const getPermissions = useCallback(
    (roleId: number | string): PermissionPath[] => {
      const role = list.find((r) => r.id === roleId)
      return role?.permissions ?? []
    },
    [list]
  )

  const setPermissions = useCallback(
    async (
      roleId: number | string,
      permissions: PermissionPath[]
    ): Promise<Role> => update(roleId, { permissions }),
    [update]
  )

  const select = useCallback(
    (role: Role | null) => dispatch(setSguSelectedRole(role)),
    [dispatch]
  )

  return useMemo<IRoleViewModel>(
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
      getPermissions,
      setPermissions,
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
      getPermissions,
      setPermissions,
      select,
    ]
  )
}
