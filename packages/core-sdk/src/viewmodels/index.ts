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

// RecursoDisplayer (Wave 2A)
export type {
  IRecursoDisplayerViewModel,
  Branch,
  BranchLevelRef,
  BranchNodeRef,
} from './IRecursoDisplayerViewModel'

export {
  useRecursoDisplayerViewModel,
  type RecursoDisplayerAdapterOverrides,
} from './useRecursoDisplayerViewModel'

// FindRecursoByTag (Wave 2A)
export type {
  IFindRecursoByTagViewModel,
  RecursoTagRef,
} from './IFindRecursoByTagViewModel'

export {
  useFindRecursoByTagViewModel,
  type FindRecursoByTagAdapterOverrides,
} from './useFindRecursoByTagViewModel'

// JustificativaModal (Wave 2E)
export type {
  IJustificativaModalViewModel,
  Justificativa,
  JustificativaUserRef,
  JustificativaValidationResult,
} from './IJustificativaModalViewModel'

export {
  useJustificativaModalViewModel,
  type JustificativaAdapterOptions,
} from './useJustificativaModalViewModel'

// AnexoManager (Wave 2E — formaliza hook parcial pre-existente)
export type {
  IAnexoManagerViewModel,
  UseAnexoManagerOptions as UseAnexoManagerViewModelOptions,
} from './IAnexoManagerViewModel'

export { useAnexoManagerViewModel } from './useAnexoManagerViewModel'
