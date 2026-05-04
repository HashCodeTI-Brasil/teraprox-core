/**
 * Domain — SGU (Sistema de Gestão de Usuários)
 *
 * Tipos puros de domínio usados pelos Ports/Adapters em
 * `core-sdk/src/viewmodels/I{User,Role,Setor,Permissao,Empresa}ViewModel`
 * e pelas screens em `teraprox-SGU-useroles`.
 */

export type {
  User,
  UserSetorLink,
  UserRoleLink,
  CreateUserInput,
  UpdateUserInput,
  InvitationToken,
} from './User'

export type {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
} from './Role'

export type {
  Setor,
  CreateSetorInput,
  UpdateSetorInput,
} from './Setor'

export type {
  Empresa,
  UpdateEmpresaInput,
} from './Empresa'

export type {
  PermissionComponent,
  PermissionPath,
  BlockedPermissionItem,
  UpdatePermissionInput,
} from './Permission'
