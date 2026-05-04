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
export { useScreenCachedState } from './hooks/useScreenCachedState'
export type { ScreenCacheOptions } from './hooks/useScreenCachedState'
export { useScreenCachedFetch } from './hooks/useScreenCachedFetch'
export type { ScreenFetchOptions, ScreenFetchResult } from './hooks/useScreenCachedFetch'
export { useSmartSearch } from './hooks/useSmartSearch'
export { useValidation } from './hooks/useValidation'
export { useTimeFormat, secondsToHms, hmsToSeconds } from './hooks/useTimeFormat'
export type { TimeFormatApi } from './hooks/useTimeFormat'
export {
  useFilterCombineMode,
  FILTER_COMBINE_MODES,
} from './hooks/useFilterCombineMode'
export type {
  FilterCombineMode,
  FilterCombineModeApi,
} from './hooks/useFilterCombineMode'

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
  IJustificativaModalViewModel,
  Justificativa,
  JustificativaUserRef,
  JustificativaValidationResult,
  JustificativaAdapterOptions,
  IAnexoManagerViewModel,
  UseAnexoManagerViewModelOptions,
  IRecorrenciaViewModel,
  RecorrenciaValue,
  RecorrenciaValidationResult,
  RecorrenciaEscala,
  RecorrenciaSliceState,
  IContadorViewModel,
  ContadorValue,
  ContadorValidationResult,
  ContadorBoundRule,
  ContadorSliceState,
  IMantenedorPickerViewModel,
  MantenedorOption,
  MantenedorPickerSliceState,
  MantenedorPickerSlot,
  IPickMantenedorTipoViewModel,
  PickMantenedorOption,
  PickTipoDeOrdemOption,
  PickMantenedorTipoSliceState,
  ITarefaStatusViewModel,
  TarefaStatus,
  UseTarefaStatusOptions,
  IObservacoesTarefaViewModel,
  ObservacaoTarefaPayload,
  UseObservacoesTarefaOptions,
  ITarefaItemViewModel,
  TarefaItemMode,
  UseTarefaItemViewModelOptions,
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
  useJustificativaModalViewModel,
  useAnexoManagerViewModel,
  useRecorrenciaViewModel,
  recorrenciaReducer,
  setRecorrenciaValor,
  setRecorrenciaEscala,
  setRecorrenciaDataInicio,
  populateRecorrencia,
  clearRecorrencia,
  selectRecorrencia,
  RECORRENCIA_DEFAULT_KEY,
  useContadorViewModel,
  contadorReducer,
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
  useMantenedorPickerViewModel,
  mantenedorPickerReducer,
  setMantenedorOptions,
  setMantenedorSearchTerm,
  setMantenedorLoading,
  setMantenedorError,
  setMantenedorPendingConfirm,
  clearMantenedorSlot,
  usePickMantenedorTipoViewModel,
  pickMantenedorTipoReducer,
  setPickMantenedorTipoOptions,
  setPickMantenedorTipoLoading,
  setPickMantenedorTipoAssigning,
  setPickMantenedorTipoError,
  resetPickMantenedorTipo,
  useTarefaStatusViewModel,
  useObservacoesTarefaViewModel,
  useTarefaItemViewModel,
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

// SGU domain types (sprint 2026-05-02 web-client-site-teraprox — Sprint 3 EX3)
export type {
  User,
  UserSetorLink,
  UserRoleLink,
  CreateUserInput,
  UpdateUserInput,
  InvitationToken,
  Role,
  CreateRoleInput,
  UpdateRoleInput,
  Setor,
  CreateSetorInput,
  UpdateSetorInput,
  Empresa,
  UpdateEmpresaInput,
  PermissionComponent,
  PermissionPath,
  BlockedPermissionItem,
  UpdatePermissionInput,
} from './domain/sgu'

// SGU Ports + Adapters
export type {
  IUserViewModel,
  UserListFilters,
  IRoleViewModel,
  ISetorViewModel,
  IPermissaoViewModel,
  IEmpresaViewModel,
} from './viewmodels'
export {
  useUserViewModel,
  useRoleViewModel,
  useSetorViewModel,
  usePermissaoViewModel,
  useEmpresaViewModel,
} from './viewmodels'
export type { UsePermissaoViewModelOptions } from './viewmodels'

// SGU state slices
export {
  sguUserReducer,
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
  sguRoleReducer,
  SGU_ROLE_SLICE_KEY,
  setSguRoleList,
  upsertSguRole,
  removeSguRole,
  setSguSelectedRole,
  setSguRoleLoading,
  setSguRoleError,
  clearSguRole,
  selectSguRole,
  sguSetorReducer,
  SGU_SETOR_SLICE_KEY,
  setSguSetorList,
  upsertSguSetor,
  removeSguSetor,
  setSguSelectedSetor,
  setSguSetorLoading,
  setSguSetorError,
  clearSguSetor,
  selectSguSetor,
  sguPermissaoReducer,
  SGU_PERMISSAO_SLICE_KEY,
  setSguPermissaoCatalog,
  upsertSguPermissaoPath,
  setSguPermissaoLoading,
  setSguPermissaoError,
  clearSguPermissao,
  selectSguPermissao,
  sguEmpresaReducer,
  SGU_EMPRESA_SLICE_KEY,
  setSguCurrentEmpresa,
  setSguEmpresaCompanies,
  setSguSelectedEmpresa,
  setSguEmpresaLoading,
  setSguEmpresaError,
  clearSguEmpresa,
  selectSguEmpresa,
} from './state/sgu'
export type {
  SguUserSliceState,
  SguRoleSliceState,
  SguSetorSliceState,
  SguPermissaoSliceState,
  SguEmpresaSliceState,
} from './state/sgu'

// Federation Runtime (v0.3.0 + v0.4.0 manifest-driven reducers)
export { FederatedBridge } from './federation/FederatedBridge'
export { isHostedByCore } from './federation/isHostedByCore'
export { createReducersBundle, createReducersFromManifest } from './federation/createReducersBundle'
export { StandaloneProvider } from './federation/StandaloneProvider'
export { DevAutoLogin } from './federation/DevAutoLogin'
export type { RemoteManifest, RemoteMenuSection, RemoteMenuItem, RemoteFormRoute, RemoteReducerMap, DefaultReducerKeys, ReducerDep } from './federation/types'
export type { ReducersBundle, ReducersBundleConfig } from './federation/createReducersBundle'
export { groupMenuSections } from './federation/groupMenuSections'
export type { MenuTreeNode, MenuTreeChild } from './federation/groupMenuSections'
