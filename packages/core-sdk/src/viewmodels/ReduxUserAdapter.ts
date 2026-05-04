/**
 * ReduxUserAdapter — implementação default do `IUserViewModel`.
 *
 * Pattern: ver `useMantenedorPickerViewModel` (Wave 5B). HTTP via
 * `useCoreService().createController(...)`; estado via slice
 * `state/sgu/userSlice`.
 *
 * Endpoints:
 *  - GET    colaborators[/:companyName] (controller 'colaborators')
 *  - GET    user/byUserName/:userName   (controller 'user')
 *  - PUT    user/:id                    (controller 'user')
 *  - POST   registerUser                (controller 'registerUser')
 *  - POST   inviteToCompany             (controller 'inviteToCompany')
 */

import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCoreService } from '../hooks/useCoreService'
import type {
  IUserViewModel,
  UserListFilters,
} from './IUserViewModel'
import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  InvitationToken,
} from '../domain/sgu/User'
import {
  SGU_USER_SLICE_KEY,
  setSguUserList,
  upsertSguUser,
  removeSguUser,
  setSguSelectedUser,
  setSguUserLoading,
  setSguUserError,
  type SguUserSliceState,
} from '../state/sgu/userSlice'

function unwrap<T = unknown>(raw: any): T {
  if (raw == null) return raw
  if (Array.isArray(raw)) return raw as T
  if (Array.isArray(raw?.content)) return raw.content as T
  if (Array.isArray(raw?.data)) return raw.data as T
  if (Array.isArray(raw?.items)) return raw.items as T
  return (raw?.content ?? raw?.data ?? raw) as T
}

export function useUserViewModel(): IUserViewModel {
  const dispatch = useDispatch()
  const core = useCoreService()

  const slice = useSelector(
    (s: { [SGU_USER_SLICE_KEY]?: SguUserSliceState }) =>
      s[SGU_USER_SLICE_KEY] ?? null
  )

  const list = slice?.list ?? []
  const selected = slice?.selected ?? null
  const isLoading = slice?.isLoading ?? false
  const error = slice?.error ?? null

  const colaboratorsCtrl = useMemo(
    () => core.createController('colaborators'),
    [core]
  )
  const userCtrl = useMemo(() => core.createController('user'), [core])
  const registerCtrl = useMemo(
    () => core.createController('registerUser'),
    [core]
  )
  const inviteCtrl = useMemo(
    () => core.createController('inviteToCompany'),
    [core]
  )

  const load = useCallback(
    async (filters?: UserListFilters): Promise<User[]> => {
      dispatch(setSguUserLoading(true))
      dispatch(setSguUserError(null))
      try {
        const path = filters?.companyName ? String(filters.companyName) : ''
        const raw: any = await colaboratorsCtrl.get(path)
        let result = unwrap<User[]>(raw)
        if (!Array.isArray(result)) result = []
        if (filters?.search) {
          const q = filters.search.toLowerCase()
          result = result.filter((u) =>
            `${u.firstName} ${u.lastName} ${u.email}`
              .toLowerCase()
              .includes(q)
          )
        }
        if (filters?.active === true) {
          result = result.filter((u) => u.active !== false)
        }
        dispatch(setSguUserList(result))
        return result
      } catch (e: any) {
        dispatch(setSguUserError(e?.message ?? 'fetch error'))
        return []
      } finally {
        dispatch(setSguUserLoading(false))
      }
    },
    [colaboratorsCtrl, dispatch]
  )

  const getAll = useCallback(() => list, [list])
  const getById = useCallback(
    (id: number | string) => list.find((u) => u.id === id),
    [list]
  )

  const getByUsername = useCallback(
    async (userName: string): Promise<User | null> => {
      try {
        const raw: any = await userCtrl.get(`byUserName/${userName}`)
        const data = unwrap<User>(raw)
        return (data as User) ?? null
      } catch (e: any) {
        dispatch(setSguUserError(e?.message ?? 'fetch error'))
        return null
      }
    },
    [userCtrl, dispatch]
  )

  const create = useCallback(
    async (input: CreateUserInput): Promise<User> => {
      const raw: any = await registerCtrl.post('', input as any)
      const created = unwrap<User>(raw)
      if (created) dispatch(upsertSguUser(created as User))
      return created as User
    },
    [registerCtrl, dispatch]
  )

  const update = useCallback(
    async (id: number | string, patch: UpdateUserInput): Promise<User> => {
      const raw: any = await userCtrl.put(String(id), patch as any)
      const updated = unwrap<User>(raw)
      if (updated) dispatch(upsertSguUser(updated as User))
      return updated as User
    },
    [userCtrl, dispatch]
  )

  const remove = useCallback(
    async (id: number | string): Promise<void> => {
      // api-user atual não expõe DELETE — soft-delete via active=false
      await userCtrl.put(String(id), { active: false } as any)
      dispatch(removeSguUser(id))
    },
    [userCtrl, dispatch]
  )

  const invite = useCallback(
    async (
      email: string,
      roleId: number | string
    ): Promise<InvitationToken> => {
      const raw: any = await inviteCtrl.post('', { email, roleId } as any)
      const data = unwrap<InvitationToken>(raw)
      return data as InvitationToken
    },
    [inviteCtrl]
  )

  const assignRole = useCallback(
    (userId: number | string, roleId: number | string) =>
      update(userId, { roleId }),
    [update]
  )

  const assignSetor = useCallback(
    (userId: number | string, setorId: number | string) =>
      update(userId, { setorId }),
    [update]
  )

  const select = useCallback(
    (user: User | null) => dispatch(setSguSelectedUser(user)),
    [dispatch]
  )

  return useMemo<IUserViewModel>(
    () => ({
      list,
      selected,
      isLoading,
      error,
      load,
      getAll,
      getById,
      getByUsername,
      create,
      update,
      delete: remove,
      invite,
      assignRole,
      assignSetor,
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
      getByUsername,
      create,
      update,
      remove,
      invite,
      assignRole,
      assignSetor,
      select,
    ]
  )
}
