// Types
export type { CoreService } from './types/CoreService'
export type { HttpController } from './types/HttpController'
export type { ToastService, ToastOptions } from './types/Toast'
export type { MatchingObjectSubscription } from './types/MatchingObject'
export type { Notification, NotificationState } from './types/Notification'
export type { NavigateFn, NavigationConfig } from './types/Navigation'

// Context
export { CoreServiceContext } from './context/CoreServiceContext'

// Hooks (existentes)
export { useCoreService } from './hooks/useCoreService'
export { useHttpController } from './hooks/useHttpController'
export { useToast } from './hooks/useToast'
export { useMatchingObject } from './hooks/useMatchingObject'
export { useNotifications } from './hooks/useNotifications'
export { useNavigator } from './hooks/useNavigator'

// Hooks (novos v0.3.0)
export { useFetchData } from './hooks/useFetchData'
export { usePostData } from './hooks/usePostData'
export { useAnexoUpload } from './hooks/useAnexoUpload'
export { useFormStorage } from './hooks/useFormStorage'
export { useSmartSearch } from './hooks/useSmartSearch'
export { useValidation } from './hooks/useValidation'

// Components
export { default as RecursoDisplayer } from './components/recurso/RecursoDisplayer'

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

// Federation Runtime (v0.3.0)
export { FederatedBridge } from './federation/FederatedBridge'
export { createReducersBundle } from './federation/createReducersBundle'
export { StandaloneProvider } from './federation/StandaloneProvider'
export { DevAutoLogin } from './federation/DevAutoLogin'
export type { RemoteManifest, RemoteMenuSection, RemoteMenuItem } from './federation/types'
export type { ReducersBundle, ReducersBundleConfig } from './federation/createReducersBundle'
