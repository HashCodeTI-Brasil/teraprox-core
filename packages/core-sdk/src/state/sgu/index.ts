/**
 * State SGU — slices Redux para gestão de Usuários/Roles/Setores/
 * Permissões/Empresa. Cada slice é independente e pode ser registrado
 * no host store individualmente, ou todos via createReducersBundle.
 */

export {
  default as sguUserReducer,
  SGU_USER_SLICE_KEY,
  setSguUserList,
  upsertSguUser,
  removeSguUser,
  setSguSelectedUser,
  patchSguSelectedUser,
  setSguUserLoading,
  setSguUserError,
  clearSguUser,
  selectSguUser,
} from './userSlice'
export type { SguUserSliceState } from './userSlice'

export {
  default as sguRoleReducer,
  SGU_ROLE_SLICE_KEY,
  setSguRoleList,
  upsertSguRole,
  removeSguRole,
  setSguSelectedRole,
  setSguRoleLoading,
  setSguRoleError,
  clearSguRole,
  selectSguRole,
} from './roleSlice'
export type { SguRoleSliceState } from './roleSlice'

export {
  default as sguSetorReducer,
  SGU_SETOR_SLICE_KEY,
  setSguSetorList,
  upsertSguSetor,
  removeSguSetor,
  setSguSelectedSetor,
  setSguSetorLoading,
  setSguSetorError,
  clearSguSetor,
  selectSguSetor,
} from './setorSlice'
export type { SguSetorSliceState } from './setorSlice'

export {
  default as sguPermissaoReducer,
  SGU_PERMISSAO_SLICE_KEY,
  setSguPermissaoCatalog,
  upsertSguPermissaoPath,
  setSguPermissaoLoading,
  setSguPermissaoError,
  clearSguPermissao,
  selectSguPermissao,
} from './permissaoSlice'
export type { SguPermissaoSliceState } from './permissaoSlice'

export {
  default as sguEmpresaReducer,
  SGU_EMPRESA_SLICE_KEY,
  setSguCurrentEmpresa,
  setSguEmpresaCompanies,
  setSguSelectedEmpresa,
  setSguEmpresaLoading,
  setSguEmpresaError,
  clearSguEmpresa,
  selectSguEmpresa,
} from './empresaSlice'
export type { SguEmpresaSliceState } from './empresaSlice'
