/**
 * Role — entidade de domínio para perfis de acesso dentro de uma Company.
 *
 * Shape extraído de `web-client/src/lib/roleSlice.js` +
 * `web-client/src/services/roleService.js` (GET role/byCompanie/:id, POST role,
 * PUT role/:id) e do consumo em components/roles/PermissionSelector.
 */

import type { PermissionPath } from './Permission'

export interface Role {
  id: number | string
  nome: string
  /** Nivel de acesso textual (livre, ex.: 'admin', 'manutentor') */
  accessLevel?: string
  /** Empresa-pai */
  companyId?: number | string
  /** Lista de paths/recursos com flags blocked aplicadas a esta Role */
  permissions?: PermissionPath[]
}

export interface CreateRoleInput {
  nome: string
  accessLevel?: string
  companyId?: number | string
  permissions?: PermissionPath[]
}

export type UpdateRoleInput = Partial<CreateRoleInput>
