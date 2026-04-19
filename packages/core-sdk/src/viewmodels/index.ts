/**
 * ViewModel Ports & Adapters — core-sdk
 *
 * Princípio hexagonal: UI consome Port via hook; Adapter conhece Redux/CoreService.
 */

// UnidadeMaterial
export type {
  IUnidadeMaterialViewModel,
  UnidadeMaterialValue,
  UnidadeMaterialRef,
  ValidationResult,
} from './IUnidadeMaterialViewModel'

export { useUnidadeMaterialViewModel } from './useUnidadeMaterialViewModel'

export {
  default as unidadeMaterialReducer,
  setMaterial as setUnidadeMaterialMaterial,
  setQuantidade as setUnidadeMaterialQuantidade,
  setUnidade as setUnidadeMaterialUnidade,
  populateUnidadeMaterial,
  clearUnidadeMaterial,
  selectUnidadeMaterial,
  UNIDADE_MATERIAL_DEFAULT_KEY,
} from './unidadeMaterialSlice'
export type { UnidadeMaterialSliceState } from './unidadeMaterialSlice'

// InspecaoModal
export type {
  IInspecaoModalViewModel,
  InspecaoValue,
  LimiteDeControle,
  InspecaoValidationResult,
} from './IInspecaoModalViewModel'

export { useInspecaoModalViewModel } from './useInspecaoModalViewModel'

export {
  default as inspecaoModalReducer,
  setInspecaoTipo,
  setInspecaoNomeParametro,
  setInspecaoUnidadeParametro,
  setInspecaoParametro,
  setInspecaoLimites,
  removeInspecaoLimiteAt,
  populateInspecaoModal,
  clearInspecaoModal,
  selectInspecaoModal,
  INSPECAO_MODAL_DEFAULT_KEY,
} from './inspecaoModalSlice'
export type { InspecaoModalSliceState } from './inspecaoModalSlice'
