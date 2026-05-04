/**
 * IRoleViewModel — Port para gestão de Roles (perfis de acesso) dentro
 * da Company.
 *
 * Origem:
 *  - `web-client/src/services/roleService.js`
 *  - `web-client/src/lib/roleSlice.js`
 *
 * Endpoints (api-user):
 *  - GET    /role/byCompanie/:companieId → list()
 *  - GET    /role/:roleId                → getById()
 *  - POST   /role                        → create()
 *  - PUT    /role/:roleId                → update() / setPermissions()
 */

import type {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
} from '../domain/sgu/Role'
import type { PermissionPath } from '../domain/sgu/Permission'

export interface IRoleViewModel {
  readonly list: Role[]
  readonly selected: Role | null
  readonly isLoading: boolean
  readonly error?: string | null

  load(companyId?: number | string): Promise<Role[]>

  getAll(): Role[]

  getById(id: number | string): Promise<Role | null>

  create(input: CreateRoleInput): Promise<Role>

  update(id: number | string, patch: UpdateRoleInput): Promise<Role>

  delete(id: number | string): Promise<void>

  /** Lê permissions da Role já carregada (snapshot). */
  getPermissions(roleId: number | string): PermissionPath[]

  /** Sobrescreve permissions de uma Role (PUT /role/:id com payload completo). */
  setPermissions(
    roleId: number | string,
    permissions: PermissionPath[]
  ): Promise<Role>

  select(role: Role | null): void
}
