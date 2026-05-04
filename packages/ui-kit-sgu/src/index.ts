// @hashcodeti/ui-kit-sgu — widgets do dominio SGU.
// Apresentacionais puros: zero Redux, zero fetch, zero IO.
// Refactor 2026-05-04: roles vira enum string fixo (sem CRUD); UserList -> UserTable;
// SetorList -> SetorTable; SetorForm vira modal inline; PermissionMatrix removido.

// ─── Shared ───────────────────────────────────────────────────────
export { Modal, type ModalProps } from './shared/Modal'
export { Avatar, type AvatarProps } from './shared/Avatar'
export { RolePill, ROLE_VALUES, type RoleValue, type RolePillProps } from './shared/RolePill'

// ─── Users ────────────────────────────────────────────────────────
export { UserTable, type UserTableProps } from './users/UserTable'
export { UserForm, type UserFormProps, type UserFormValues } from './users/UserForm'

// ─── Setores ──────────────────────────────────────────────────────
export { SetorTable, type SetorTableProps } from './setores/SetorTable'
export {
  SetorFormModal,
  type SetorFormModalProps,
  type SetorFormValues,
} from './setores/SetorFormModal'

// ─── Types ────────────────────────────────────────────────────────
export type { User, Role, Setor } from './types'
