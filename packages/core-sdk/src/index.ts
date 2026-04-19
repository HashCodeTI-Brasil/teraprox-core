// Types
export type { CoreService, RateLimitEntry } from './types/CoreService'
export type { HttpController } from './types/HttpController'
export type { ToastService, ToastOptions } from './types/Toast'
export type { MatchingObjectSubscription } from './types/MatchingObject'
export type { Notification, NotificationState } from './types/Notification'
export type { NavigateFn, NavigationConfig } from './types/Navigation'
export type { SolicitacaoDeServico, StatusSolicitacao } from './types/SolicitacaoDeServico'
export type { OrdemDeCorrecao, OrdemDeCorrecaoFormState, StatusOrdemDeCorrecao, TarefaDeCorrecao, TarefaUnidadeMaterial } from './types/OrdemDeCorrecao'
export type { RegraDeCorrecao, RegraDeCorrecaoFormState, CalculoDeCorrecao } from './types/RegraDeCorrecao'
export type { IObservabilityPort, VitalsPayload, BreadcrumbPayload, InteractionPayload } from './types/IObservabilityPort'
export type { IAnexoPort, AnexoPersistido, AnexoLocal, UploadIntent } from './types/IAnexoPort'
export type { HttpInterceptors, HttpResponseMeta, HttpErrorMeta } from './types/HttpInterceptors'

// Context
export { CoreServiceContext } from './context/CoreServiceContext'

// Factories & Adapters (Null Object Pattern)
export { CoreServiceBuilder, FetchHttpAdapter } from './factories/CoreServiceBuilder'
export { NullCoreService, NullToastService, NullHttpController } from './adapters/null/NullObjectAdapters'
export { NullObservabilityAdapter } from './adapters/null/NullObservabilityAdapter'
export { TracingHttpAdapter } from './adapters/TracingHttpAdapter'

// Hooks (existentes)
export { useCoreService } from './hooks/useCoreService'
export { useHttpController } from './hooks/useHttpController'
export { useToast } from './hooks/useToast'
export { useMatchingObject } from './hooks/useMatchingObject'
export { useNotifications } from './hooks/useNotifications'
export { useNavigator } from './hooks/useNavigator'
export { useObservability } from './hooks/useObservability'
export { useAnexoManager } from './hooks/useAnexoManager'

// Hooks (novos v0.3.0)
export { useFetchData } from './hooks/useFetchData'
export { usePostData } from './hooks/usePostData'
export { useAnexoUpload } from './hooks/useAnexoUpload'
export { useFormStorage } from './hooks/useFormStorage'
export { useSmartSearch } from './hooks/useSmartSearch'
export { useValidation } from './hooks/useValidation'

// Modules removed to ui-kit

// ViewModels (Ports & Adapters — hexagonal-viewmodel pattern)
export type {
  IUnidadeMaterialViewModel,
  UnidadeMaterialValue,
  UnidadeMaterialRef,
  UnidadeMaterialSliceState,
  ValidationResult,
  IInspecaoModalViewModel,
  InspecaoValue,
  LimiteDeControle,
  InspecaoValidationResult,
  InspecaoModalSliceState,
  IRecursoDisplayerViewModel,
  Branch,
  BranchLevelRef,
  BranchNodeRef,
  RecursoDisplayerAdapterOverrides,
  IFindRecursoByTagViewModel,
  RecursoTagRef,
  FindRecursoByTagAdapterOverrides,
} from './viewmodels'
export {
  useUnidadeMaterialViewModel,
  unidadeMaterialReducer,
  setUnidadeMaterialMaterial,
  setUnidadeMaterialQuantidade,
  setUnidadeMaterialUnidade,
  populateUnidadeMaterial,
  clearUnidadeMaterial,
  selectUnidadeMaterial,
  UNIDADE_MATERIAL_DEFAULT_KEY,
  useInspecaoModalViewModel,
  inspecaoModalReducer,
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
  useRecursoDisplayerViewModel,
  useFindRecursoByTagViewModel,
} from './viewmodels'

// Reducers (existentes)
export {
  default as branchLevelReducer,
  setLevels,
  setNome,
  setLevel,
  setColor,
  setHaveComponente,
  clearBranchLevelForm,
  setExcludeLevels,
  populateToEdit,
} from './reducers/branchLevelReducer'

// Reducers (novos v0.3.0)
export {
  default as pickerReducer,
  setPickerSelected,
  setPickerItems,
  setPickerVisible,
  setPickerContext,
  clearPicker,
} from './reducers/pickerReducer'

// Utils (existentes)
export { pickTextColorBasedOnBgColorAdvanced } from './utils/colorUtils'
export { initWebVitals } from './utils/webVitals'
export { generateTraceId, generateSpanId, buildTraceparent } from './utils/tracing'

// Utils (novos v0.3.0)
export {
  formatDate,
  formatDateTime,
  isDateBefore,
  isDateAfter,
  daysBetween,
  addDays,
  toISOString,
} from './utils/dateUtils'
export { capitalize, truncate, removeAccents, slugify, isBlank } from './utils/stringUtils'

// Federation Runtime (v0.3.0 + v0.4.0 manifest-driven reducers)
export { FederatedBridge } from './federation/FederatedBridge'
export { isHostedByCore } from './federation/isHostedByCore'
export { createReducersBundle, createReducersFromManifest } from './federation/createReducersBundle'
export { StandaloneProvider } from './federation/StandaloneProvider'
export { DevAutoLogin } from './federation/DevAutoLogin'
export type { RemoteManifest, RemoteMenuSection, RemoteMenuItem, RemoteFormRoute, RemoteReducerMap, DefaultReducerKeys, ReducerDep } from './federation/types'
export type { ReducersBundle, ReducersBundleConfig } from './federation/createReducersBundle'
