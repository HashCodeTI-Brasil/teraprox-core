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

// Recorrencia (sprint 2026-04-20 code-split-fix — Track C.1 Port;
// realinhado ao shape backend em Track C.1 UI finalizacao)
export type {
  IRecorrenciaViewModel,
  RecorrenciaValue,
  RecorrenciaValidationResult,
  RecorrenciaEscala,
} from './IRecorrenciaViewModel'

export { useRecorrenciaViewModel } from './useRecorrenciaViewModel'

export {
  default as recorrenciaReducer,
  setRecorrenciaValor,
  setRecorrenciaEscala,
  setRecorrenciaDataInicio,
  populateRecorrencia,
  clearRecorrencia,
  selectRecorrencia,
  RECORRENCIA_DEFAULT_KEY,
} from './recorrenciaSlice'
export type { RecorrenciaSliceState } from './recorrenciaSlice'

// Contador (sprint 2026-04-20 code-split-fix — Track C.2 Port)
export type {
  IContadorViewModel,
  ContadorValue,
  ContadorValidationResult,
  ContadorBoundRule,
} from './IContadorViewModel'

export { useContadorViewModel } from './useContadorViewModel'

// MantenedorPicker (Wave 5B — hexagonal promotion de MantenedoresDisplay)
export type {
  IMantenedorPickerViewModel,
  MantenedorOption,
} from './IMantenedorPickerViewModel'

export { useMantenedorPickerViewModel } from './useMantenedorPickerViewModel'

export {
  default as mantenedorPickerReducer,
  setMantenedorOptions,
  setMantenedorSearchTerm,
  setMantenedorLoading,
  setMantenedorError,
  setMantenedorPendingConfirm,
  clearMantenedorSlot,
} from './mantenedorPickerSlice'
export type {
  MantenedorPickerSliceState,
  MantenedorPickerSlot,
} from './mantenedorPickerSlice'

export {
  default as contadorReducer,
  setContadorValor,
  setContadorUnidade,
  setContadorParametro,
  addContadorLimite,
  removeContadorLimiteAt,
  updateContadorLimiteAt,
  populateContador,
  clearContador,
  selectContador,
  CONTADOR_DEFAULT_KEY,
} from './contadorSlice'
export type { ContadorSliceState } from './contadorSlice'

// TarefaStatus (sprint 2026-04-29 tarefa-item-unified — Phase 1)
export type {
  ITarefaStatusViewModel,
  TarefaStatus,
  UseTarefaStatusOptions,
} from './ITarefaStatusViewModel'

export { useTarefaStatusViewModel } from './ReduxTarefaStatusAdapter'

// ObservacoesTarefa (sprint 2026-04-29 tarefa-item-unified — Phase 1)
export type {
  IObservacoesTarefaViewModel,
  ObservacaoTarefaPayload,
  UseObservacoesTarefaOptions,
} from './IObservacoesTarefaViewModel'

export { useObservacoesTarefaViewModel } from './ReduxObservacoesTarefaAdapter'

// TarefaItem umbrella (sprint 2026-04-29 tarefa-item-unified — Phase 1)
export type {
  ITarefaItemViewModel,
  TarefaItemMode,
  UseTarefaItemViewModelOptions,
} from './ITarefaItemViewModel'

export { useTarefaItemViewModel } from './ReduxTarefaItemAdapter'
