# Plano Executivo de Implementação — MFE Teraprox

**Data:** Abril 2026  
**Pré-requisito:** [MFE_IMPROVEMENT_PLAN.md](MFE_IMPROVEMENT_PLAN.md) (diagnóstico)

> Este documento contém **código pronto** para cada passo. Cada seção pode ser executada como um PR independente.

---

## FASE 1 — SDK v0.3.0: Novos hooks, utils, reducers e federation runtime

### 1.1 — Novos arquivos no SDK

#### 1.1.1 — `useFetchData`

Atualmente duplicado nos remotes com dependência de `useWebProvider()`.  
Nova versão usa `useCoreService()` do SDK, zero dependência local.

**Criar:** `packages/core-sdk/src/hooks/useFetchData.ts`
```typescript
import { useState, useCallback, useRef } from 'react'
import { useCoreService } from './useCoreService'
import type { HttpController } from '../types/HttpController'

interface FetchDataReturn<T = any> {
  data: T | null
  loading: boolean
  error: Error | null
  fetchData: (context: string, path: string, endpoint?: string) => Promise<T>
  reset: () => void
}

/**
 * Hook genérico para fetch de dados via HttpController.
 * Substitui o useFetchData duplicado em SGM/SGP.
 */
export function useFetchData<T = any>(): FetchDataReturn<T> {
  const { createController } = useCoreService()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const activeRef = useRef(true)

  const fetchData = useCallback(
    async (context: string, path: string, endpoint?: string): Promise<T> => {
      const controller: HttpController = createController(context, endpoint)
      setLoading(true)
      setError(null)
      try {
        const result = await controller.get(path)
        if (activeRef.current) setData(result)
        return result
      } catch (err: any) {
        if (activeRef.current) setError(err)
        throw err
      } finally {
        if (activeRef.current) setLoading(false)
      }
    },
    [createController]
  )

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  return { data, loading, error, fetchData, reset }
}
```

#### 1.1.2 — `usePostData`

**Criar:** `packages/core-sdk/src/hooks/usePostData.ts`
```typescript
import { useState, useCallback } from 'react'
import { useCoreService } from './useCoreService'
import type { HttpController } from '../types/HttpController'

interface PostDataReturn<T = any> {
  result: T | null
  loading: boolean
  error: Error | null
  postData: (context: string, path: string, data: any, endpoint?: string) => Promise<T>
}

/**
 * Hook genérico para POST/PUT via HttpController.
 * Substitui o usePostData duplicado em SGM/SGP.
 */
export function usePostData<T = any>(): PostDataReturn<T> {
  const { createController } = useCoreService()
  const [result, setResult] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const postData = useCallback(
    async (context: string, path: string, payload: any, endpoint?: string): Promise<T> => {
      const controller: HttpController = createController(context, endpoint)
      setLoading(true)
      setError(null)
      try {
        const res = await controller.post(path, payload)
        setResult(res)
        return res
      } catch (err: any) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [createController]
  )

  return { result, loading, error, postData }
}
```

#### 1.1.3 — `useAnexoUpload`

**Criar:** `packages/core-sdk/src/hooks/useAnexoUpload.ts`
```typescript
import { useState, useCallback } from 'react'
import { useCoreService } from './useCoreService'
import { useToast } from './useToast'

interface AnexoUploadReturn {
  uploading: boolean
  progress: number
  upload: (context: string, path: string, file: File, extraHeaders?: Record<string, string>) => Promise<any>
  uploadMultiple: (context: string, path: string, files: FileList | File[], extraHeaders?: Record<string, string>) => Promise<any[]>
}

/**
 * Hook para upload de anexos via HttpController.
 * Substitui useAnexoUpload duplicado em SGM/SGP.
 */
export function useAnexoUpload(): AnexoUploadReturn {
  const { createController } = useCoreService()
  const toast = useToast()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = useCallback(
    async (context: string, path: string, file: File, extraHeaders?: Record<string, string>) => {
      const controller = createController(context)
      setUploading(true)
      setProgress(0)
      try {
        const formData = new FormData()
        formData.append('file', file)
        const result = await controller.post(path, formData, {
          'Content-Type': 'multipart/form-data',
          ...extraHeaders,
        })
        setProgress(100)
        return result
      } catch (err: any) {
        toast.error(err?.message || 'Erro ao enviar anexo')
        throw err
      } finally {
        setUploading(false)
      }
    },
    [createController, toast]
  )

  const uploadMultiple = useCallback(
    async (context: string, path: string, files: FileList | File[], extraHeaders?: Record<string, string>) => {
      const fileArray = Array.from(files)
      const results: any[] = []
      for (let i = 0; i < fileArray.length; i++) {
        setProgress(Math.round((i / fileArray.length) * 100))
        const res = await upload(context, path, fileArray[i], extraHeaders)
        results.push(res)
      }
      setProgress(100)
      return results
    },
    [upload]
  )

  return { uploading, progress, upload, uploadMultiple }
}
```

#### 1.1.4 — `useFormStorage`

**Criar:** `packages/core-sdk/src/hooks/useFormStorage.ts`
```typescript
import { useState, useCallback, useEffect } from 'react'

/**
 * Hook para persistir estado de formulário no localStorage.
 * Substitui useFormStorage/usePersistedState duplicado em SGM/SGP.
 */
export function useFormStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const storageKey = `teraprox_form_${key}`

  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
    } catch { /* quota exceeded — silent fail */ }
  }, [value, storageKey])

  const clear = useCallback(() => {
    localStorage.removeItem(storageKey)
    setValue(initialValue)
  }, [storageKey, initialValue])

  return [value, setValue, clear]
}
```

#### 1.1.5 — `useSmartSearch`

**Criar:** `packages/core-sdk/src/hooks/useSmartSearch.ts`
```typescript
import { useState, useMemo, useCallback } from 'react'

interface SmartSearchReturn<T> {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filteredData: T[]
  clearSearch: () => void
}

/**
 * Hook para busca/filtro em listas locais.
 * Substitui useSmartSearch duplicado em SGM/SGP.
 */
export function useSmartSearch<T = any>(
  data: T[],
  searchFields: (keyof T)[] | string[],
  options?: { caseSensitive?: boolean; minLength?: number }
): SmartSearchReturn<T> {
  const [searchTerm, setSearchTerm] = useState('')
  const { caseSensitive = false, minLength = 1 } = options || {}

  const filteredData = useMemo(() => {
    if (!searchTerm || searchTerm.length < minLength) return data
    const term = caseSensitive ? searchTerm : searchTerm.toLowerCase()

    return data.filter((item) =>
      (searchFields as string[]).some((field) => {
        const value = (item as any)?.[field]
        if (value == null) return false
        const str = String(value)
        return (caseSensitive ? str : str.toLowerCase()).includes(term)
      })
    )
  }, [data, searchTerm, searchFields, caseSensitive, minLength])

  const clearSearch = useCallback(() => setSearchTerm(''), [])

  return { searchTerm, setSearchTerm, filteredData, clearSearch }
}
```

#### 1.1.6 — `useValidation`

**Criar:** `packages/core-sdk/src/hooks/useValidation.ts`
```typescript
import { useState, useCallback } from 'react'
import { useToast } from './useToast'

type ValidationRule<T> = {
  field: keyof T
  message: string
  validate: (value: any, form: T) => boolean
}

interface ValidationReturn<T> {
  errors: Partial<Record<keyof T, string>>
  validate: (form: T) => boolean
  clearErrors: () => void
  setFieldError: (field: keyof T, message: string) => void
}

/**
 * Hook para validação de formulários com toast automático.
 * Substitui useValidationHook duplicado em SGM/SGP.
 */
export function useValidation<T = any>(rules: ValidationRule<T>[]): ValidationReturn<T> {
  const toast = useToast()
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const validate = useCallback(
    (form: T): boolean => {
      const newErrors: Partial<Record<keyof T, string>> = {}
      let valid = true

      for (const rule of rules) {
        if (!rule.validate(form[rule.field], form)) {
          newErrors[rule.field] = rule.message
          valid = false
        }
      }

      setErrors(newErrors)

      if (!valid) {
        const firstError = Object.values(newErrors)[0] as string
        toast.warning(firstError)
      }

      return valid
    },
    [rules, toast]
  )

  const clearErrors = useCallback(() => setErrors({}), [])
  const setFieldError = useCallback(
    (field: keyof T, message: string) =>
      setErrors((prev) => ({ ...prev, [field]: message })),
    []
  )

  return { errors, validate, clearErrors, setFieldError }
}
```

---

### 1.2 — Utilitários compartilhados

#### 1.2.1 — `dateUtils`

**Criar:** `packages/core-sdk/src/utils/dateUtils.ts`
```typescript
import dayjs from 'dayjs'

/**
 * Formata uma data para exibição no padrão brasileiro.
 * Corresponde ao dateUtils.js duplicado em SGM/SGP/Services/default/.
 */
export function formatDate(date: string | Date | null | undefined, format = 'DD/MM/YYYY'): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

export function formatDateTime(date: string | Date | null | undefined): string {
  return formatDate(date, 'DD/MM/YYYY HH:mm')
}

export function isDateBefore(date1: string | Date, date2: string | Date): boolean {
  return dayjs(date1).isBefore(dayjs(date2))
}

export function isDateAfter(date1: string | Date, date2: string | Date): boolean {
  return dayjs(date1).isAfter(dayjs(date2))
}

export function daysBetween(start: string | Date, end: string | Date): number {
  return dayjs(end).diff(dayjs(start), 'day')
}

export function addDays(date: string | Date, days: number): Date {
  return dayjs(date).add(days, 'day').toDate()
}

export function toISOString(date: string | Date): string {
  return dayjs(date).toISOString()
}
```

#### 1.2.2 — `stringUtils`

**Criar:** `packages/core-sdk/src/utils/stringUtils.ts`
```typescript
/**
 * Utilitários de string. Corresponde ao stringUtils.js duplicado em SGM/SGP.
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (!str || str.length <= maxLength) return str || ''
  return str.substring(0, maxLength) + suffix
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function slugify(str: string): string {
  return removeAccents(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function isBlank(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0
}
```

---

### 1.3 — Reducers comuns no SDK

Reducers que existem idênticos em SGM e SGP. Mover para o SDK.

#### 1.3.1 — `pickerReducer`

**Criar:** `packages/core-sdk/src/reducers/pickerReducer.ts`
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PickerState {
  selected: any | null
  items: any[]
  visible: boolean
  context: string
}

const initialState: PickerState = {
  selected: null,
  items: [],
  visible: false,
  context: '',
}

const pickerSlice = createSlice({
  name: 'picker',
  initialState,
  reducers: {
    setPickerSelected(state, action: PayloadAction<any>) { state.selected = action.payload },
    setPickerItems(state, action: PayloadAction<any[]>) { state.items = action.payload },
    setPickerVisible(state, action: PayloadAction<boolean>) { state.visible = action.payload },
    setPickerContext(state, action: PayloadAction<string>) { state.context = action.payload },
    clearPicker() { return initialState },
  },
})

export const { setPickerSelected, setPickerItems, setPickerVisible, setPickerContext, clearPicker } = pickerSlice.actions
export default pickerSlice.reducer
```

> **ATENÇÃO:** Antes de mover cada reducer, comparar os arquivos SGM vs SGP para garantir que são idênticos. Se houver divergências, unificar primeiro. Os reducers `globalErrorReducer`, `timerReducer`, `cachedReducer`, `notificationReducer` seguem o mesmo padrão de criação acima.

---

### 1.4 — Federation Runtime no SDK

#### 1.4.1 — `FederatedBridge` padronizado

**Criar:** `packages/core-sdk/src/federation/FederatedBridge.tsx`
```tsx
import React, { useEffect } from 'react'
import { CoreServiceContext } from '../context/CoreServiceContext'
import type { CoreService } from '../types/CoreService'

interface FederatedBridgeProps {
  /**
   * CoreService completo injetado pelo host.
   * O host monta este valor a partir do seu WebProvider interno.
   */
  coreService: CoreService
  children: React.ReactNode
}

/**
 * Bridge padronizado para módulos federados.
 *
 * Responsabilidades:
 * 1. Marca window.__TERAPROX_HOSTED_BY_CORE__ = true
 * 2. Provê CoreServiceContext com o valor do host
 *
 * USO NOS REMOTES:
 * ```
 * // remote/src/federation/FederatedBridge.js
 * export { FederatedBridge as default } from 'teraprox-core-sdk/federation'
 * ```
 */
export function FederatedBridge({ coreService, children }: FederatedBridgeProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.__TERAPROX_HOSTED_BY_CORE__ = true
    return () => {
      window.__TERAPROX_HOSTED_BY_CORE__ = false
    }
  }, [])

  return (
    <CoreServiceContext.Provider value={coreService}>
      {children}
    </CoreServiceContext.Provider>
  )
}
```

#### 1.4.2 — `createReducersBundle` factory

**Criar:** `packages/core-sdk/src/federation/createReducersBundle.ts`
```typescript
/**
 * Factory para criar ReducersBundle padronizado.
 *
 * Cada remote só precisa declarar SEUS reducers e contextos.
 * A lógica de resolução, deduplicação e loading fica no SDK.
 *
 * USO NOS REMOTES:
 * ```
 * import { createReducersBundle } from 'teraprox-core-sdk/federation'
 *
 * export default createReducersBundle({
 *   reducers: {
 *     ordemDeServico: () => import('../Reducers/osReducer'),
 *     ordemDeManutencao: () => import('../Reducers/omReducer'),
 *   },
 *   contextMap: {
 *     visaoGeral: ['ordemDeServico', 'ordemDeManutencao'],
 *     ordemDeServico: ['ordemDeServico'],
 *   },
 *   defaults: ['picker', 'globalError'],
 * })
 * ```
 */

export interface ReducersBundleConfig {
  /** Map de nome → importador lazy do reducer */
  reducers: Record<string, () => Promise<any>>
  /** Map de contexto → lista de reducer keys necessárias */
  contextMap: Record<string, string[]>
  /** Keys carregadas em TODOS os contextos */
  defaults?: string[]
}

export interface ReducersBundle {
  getReducerKeysByContext(context: string): string[]
  getReducersForKeys(keys: string[]): Promise<Record<string, any>>
  getReducersForModule(opts: { context?: string; modulePath?: string }): Promise<Record<string, any>>
  loadAllReducers(): Promise<Record<string, any>>
  baseReducers: Record<string, never>
}

export function createReducersBundle(config: ReducersBundleConfig): ReducersBundle {
  const { reducers, contextMap, defaults = [] } = config
  const allKeys = Object.keys(reducers)

  const getReducerKeysByContext = (context: string): string[] => {
    const contextKeys = contextMap[context]
    if (!contextKeys) return allKeys
    return [...new Set([...defaults, ...contextKeys])]
  }

  const getReducersForKeys = async (keys: string[] = []): Promise<Record<string, any>> => {
    const uniqueKeys = [...new Set(keys)].filter((key) => !!reducers[key])
    const loaded = await Promise.all(
      uniqueKeys.map(async (key) => {
        const module = await reducers[key]()
        return [key, module.default || module] as [string, any]
      })
    )
    return Object.fromEntries(loaded)
  }

  const getReducersForModule = async ({ context }: { context?: string; modulePath?: string } = {}): Promise<Record<string, any>> => {
    const keys = getReducerKeysByContext(context || '')
    return getReducersForKeys(keys)
  }

  const loadAllReducers = () => getReducersForKeys(allKeys)

  return {
    getReducerKeysByContext,
    getReducersForKeys,
    getReducersForModule,
    loadAllReducers,
    baseReducers: {},
  }
}
```

#### 1.4.3 — `StandaloneProvider`

**Criar:** `packages/core-sdk/src/federation/StandaloneProvider.tsx`
```tsx
import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { CoreServiceContext } from '../context/CoreServiceContext'
import type { CoreService } from '../types/CoreService'
import type { HttpController } from '../types/HttpController'
import type { ToastService } from '../types/Toast'
import type { MatchingObjectSubscription } from '../types/MatchingObject'

interface StandaloneConfig {
  /**
   * Factory para criar HttpController. O remote fornece sua
   * implementação local (usando basicController + axios).
   */
  createController: (context: string, baseEndPoint?: string) => HttpController

  /** Função de toast do react-toast-notifications */
  addToast: (message: string, options?: any) => void

  children: React.ReactNode
}

/**
 * Provider padronizado para modo standalone (npm start).
 *
 * Substitui o StandaloneCoreServiceProvider que cada remote copia.
 * O remote só precisa fornecer seu createController e addToast.
 *
 * USO NOS REMOTES:
 * ```
 * import { StandaloneProvider } from 'teraprox-core-sdk/federation'
 * import { basicController } from '../Http/basicController'
 * import { useToasts } from 'react-toast-notifications'
 *
 * function App() {
 *   const { addToast } = useToasts()
 *   return (
 *     <StandaloneProvider
 *       createController={(ctx, ep) => basicController(ctx, ep)}
 *       addToast={addToast}
 *     >
 *       <Routes />
 *     </StandaloneProvider>
 *   )
 * }
 * ```
 */
export function StandaloneProvider({ createController, addToast, children }: StandaloneConfig) {
  const [subscriptions] = useState<MatchingObjectSubscription[]>([])

  const toast: ToastService = useMemo(() => ({
    success: (msg, opts) => addToast(msg, { appearance: 'success', autoDismiss: true, ...opts }),
    warning: (msg, opts) => addToast(msg, { appearance: 'warning', autoDismiss: true, ...opts }),
    error:   (msg, opts) => addToast(msg, { appearance: 'error',   autoDismiss: true, ...opts }),
    info:    (msg, opts) => addToast(msg, { appearance: 'info',    autoDismiss: true, ...opts }),
  }), [addToast])

  const subscribe = useCallback((mo: MatchingObjectSubscription) => {
    subscriptions.push(mo)
  }, [subscriptions])

  const unsubscribe = useCallback((mo: MatchingObjectSubscription) => {
    const idx = subscriptions.findIndex(
      (s) => s.context === mo.context && s.location === mo.location
    )
    if (idx >= 0) subscriptions.splice(idx, 1)
  }, [subscriptions])

  const value: CoreService = useMemo(() => ({
    createController,
    toast,
    subscribe,
    unsubscribe,
    subscribeEvent: () => {},
    unsubscribeEvent: () => {},
    handleLogout: () => {},
    hostedByCore: false,
  }), [createController, toast, subscribe, unsubscribe])

  return (
    <CoreServiceContext.Provider value={value}>
      {children}
    </CoreServiceContext.Provider>
  )
}
```

#### 1.4.4 — `DevAutoLogin`

**Criar:** `packages/core-sdk/src/federation/DevAutoLogin.tsx`
```tsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface DevUser {
  firstName: string
  lastName: string
  token: string
  email: string
  id: string
  role: string
  user: string
  userName: string
  setor: string
  userSetor: { setorId: string }
  companyName: string
  companyId: string
  filters: any[]
}

interface DevAutoLoginProps {
  /** Ações Redux do globalConfigReducer do remote */
  actions: {
    logIn: (user: any) => any
    setCompany: (company: string) => any
  }
  /** Dados fictícios para dev (opcional, tem default) */
  devUser?: Partial<DevUser>
  children: React.ReactNode
}

const DEFAULT_DEV_USER: DevUser = {
  firstName: 'Dev',
  lastName: 'User',
  token: 'dev-standalone-token',
  email: 'dev@teraprox.local',
  id: 'dev-user-id',
  role: 'admin',
  user: 'devuser',
  userName: 'devuser',
  setor: 'Desenvolvimento',
  userSetor: { setorId: 'dev-setor-id' },
  companyName: 'Dev Company',
  companyId: 'dev-company-id',
  filters: [],
}

/**
 * Auto-login para modo standalone dev.
 *
 * USO:
 * ```
 * import { DevAutoLogin } from 'teraprox-core-sdk/federation'
 * import { logIn, setCompany } from '../Reducers/globalConfigReducer'
 *
 * <DevAutoLogin actions={{ logIn, setCompany }}>
 *   <App />
 * </DevAutoLogin>
 * ```
 */
export function DevAutoLogin({ actions, devUser, children }: DevAutoLoginProps) {
  const dispatch = useDispatch()
  const token = useSelector((state: any) => state.global?.token)
  const hostedByCore =
    typeof window !== 'undefined' && window.__TERAPROX_HOSTED_BY_CORE__ === true

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !hostedByCore && !token) {
      const user = { ...DEFAULT_DEV_USER, ...devUser }
      dispatch(actions.setCompany(user.companyId))
      dispatch(actions.logIn(user))
    }
  }, [dispatch, hostedByCore, token, actions, devUser])

  return <>{children}</>
}
```

#### 1.4.5 — Manifesto de Rotas (tipo)

**Criar:** `packages/core-sdk/src/federation/types.ts`
```typescript
/**
 * Manifesto que cada remote exporta para o Core
 * montar menu e rotas dinamicamente.
 */
export interface RemoteMenuItem {
  /** Label exibido no menu */
  label: string
  /** Rota no react-router (ex: '/manutencao/ordens-de-servico') */
  path: string
  /** Nome do módulo no exposes do webpack (ex: './OrdensDeServico') */
  module: string
  /** Contexto para ReducersBundle (ex: 'ordemDeServico') */
  context: string
  /** ID do componente para withPermission */
  componentId?: string
  /** Ícone react-icons (ex: 'FaTools') */
  icon?: string
}

export interface RemoteMenuSection {
  /** Nome da seção no menu (ex: 'Manutenção') */
  label: string
  /** Ícone da seção */
  icon?: string
  items: RemoteMenuItem[]
}

export interface RemoteManifest {
  /** Nome do remote (deve corresponder ao name do ModuleFederationPlugin) */
  name: string
  /** Versão semântica */
  version: string
  /** Seções de menu que este remote contribui */
  menuSections: RemoteMenuSection[]
}
```

---

### 1.5 — Atualizar barrel exports do SDK

**Editar:** `packages/core-sdk/src/index.ts` → adicionar os novos exports:
```typescript
// === EXISTENTE (manter tudo) ===
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

// === NOVOS HOOKS ===
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
  setLevels, setNome, setLevel, setColor,
  setHaveComponente, clearBranchLevelForm,
  setExcludeLevels, populateToEdit,
} from './reducers/branchLevelReducer'

// === NOVOS REDUCERS ===
export {
  default as pickerReducer,
  setPickerSelected, setPickerItems, setPickerVisible,
  setPickerContext, clearPicker,
} from './reducers/pickerReducer'

// Utils (existentes)
export { pickTextColorBasedOnBgColorAdvanced } from './utils/colorUtils'

// === NOVOS UTILS ===
export { formatDate, formatDateTime, isDateBefore, isDateAfter, daysBetween, addDays, toISOString } from './utils/dateUtils'
export { capitalize, truncate, removeAccents, slugify, isBlank } from './utils/stringUtils'

// === FEDERATION RUNTIME ===
export { FederatedBridge } from './federation/FederatedBridge'
export { createReducersBundle } from './federation/createReducersBundle'
export { StandaloneProvider } from './federation/StandaloneProvider'
export { DevAutoLogin } from './federation/DevAutoLogin'
export type { RemoteManifest, RemoteMenuSection, RemoteMenuItem } from './federation/types'
export type { ReducersBundle, ReducersBundleConfig } from './federation/createReducersBundle'
```

### 1.6 — Adicionar export path do federation

**Editar:** `packages/core-sdk/package.json` → adicionar export path:
```json
{
  "name": "teraprox-core-sdk",
  "version": "0.3.0",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./dev": {
      "types": "./dist/dev.d.ts",
      "import": "./dist/dev.mjs",
      "require": "./dist/dev.js"
    },
    "./federation": {
      "types": "./dist/federation.d.ts",
      "import": "./dist/federation.mjs",
      "require": "./dist/federation.js"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts src/dev.ts src/federation.ts --format esm,cjs --dts --clean",
    "dev": "tsup src/index.ts src/dev.ts src/federation.ts --format esm,cjs --dts --watch"
  },
  "peerDependencies": {
    "@reduxjs/toolkit": ">=1.9.0",
    "react": ">=17.0.0",
    "react-bootstrap": ">=2.0.0",
    "react-icons": ">=4.0.0",
    "react-redux": ">=8.0.0",
    "react-router-dom": ">=6.0.0",
    "dayjs": ">=1.11.0"
  }
}
```

**Criar:** `packages/core-sdk/src/federation.ts` (novo entry point):
```typescript
export { FederatedBridge } from './federation/FederatedBridge'
export { createReducersBundle } from './federation/createReducersBundle'
export type { ReducersBundle, ReducersBundleConfig } from './federation/createReducersBundle'
export { StandaloneProvider } from './federation/StandaloneProvider'
export { DevAutoLogin } from './federation/DevAutoLogin'
export type { RemoteManifest, RemoteMenuSection, RemoteMenuItem } from './federation/types'
```

### 1.7 — Build e testar SDK

```bash
cd packages/core-sdk
npm run build
# Verificar que dist/ contém:
#   index.js / index.mjs / index.d.ts
#   dev.js / dev.mjs / dev.d.ts
#   federation.js / federation.mjs / federation.d.ts
```

---

## FASE 2 — Migrar módulo Solicitação de Serviço (módulo menor, validação rápida)

### 2.1 — Atualizar FederatedBridge

**Antes** (`teraprox-app-solicitacao-de-servico/src/federation/FederatedBridge.js`):
```javascript
export default function FederatedBridge({ children }) {
  useEffect(() => { window.__TERAPROX_HOSTED_BY_CORE__ = true; ... });
  return <>{children}</>;
}
```

**Depois** (re-exporta do SDK):
```javascript
// Apenas 1 linha — toda a lógica vem do SDK
export { FederatedBridge as default } from 'teraprox-core-sdk'
```

### 2.2 — Atualizar ReducersBundle

**Antes** (~45 linhas de boilerplate):
```javascript
const reducerImporters = { solicitacaoDeServico: () => import(...) };
const defaultReducerKeys = ['solicitacaoDeServico'];
const contextReducerKeys = { solicitacaoDeServico: ['solicitacaoDeServico'] };
// ... getReducerKeysByContext, getReducersForKeys, getReducersForModule, loadAllReducers
```

**Depois** (~12 linhas):
```javascript
import { createReducersBundle } from 'teraprox-core-sdk/federation'

export default createReducersBundle({
  reducers: {
    solicitacaoDeServico: () => import(/* webpackMode: "eager" */ '../Reducers/solicitacaoDeServicoReducer'),
  },
  contextMap: {
    solicitacaoDeServico: ['solicitacaoDeServico'],
  },
  defaults: ['solicitacaoDeServico'],
})

// Re-export para compatibilidade com Core
export const { getReducerKeysByContext, getReducersForKeys, getReducersForModule, loadAllReducers } = 
  createReducersBundle({ /* mesmo config acima */ })
```

### 2.3 — Remover StandaloneCoreServiceProvider local

**Antes** (`src/providers/StandaloneCoreServiceProvider.js` — 30 linhas copiadas):
```javascript
import { CoreServiceContext } from 'teraprox-core-sdk';
import { useToasts } from 'react-toast-notifications';
import { useWebProvider } from '../hooks/useWebProvider';
// ...value montado manualmente...
```

**Depois** (`src/App.js` — usa StandaloneProvider do SDK):
```jsx
import { StandaloneProvider } from 'teraprox-core-sdk/federation'
import { DevAutoLogin } from 'teraprox-core-sdk/federation'
import { useToasts } from 'react-toast-notifications'
import { basicController } from './websocket/controllers/basicController'
import { logIn, setCompany } from './Reducers/globalConfigReducer'

function AppStandaloneWrapper({ children }) {
  const { addToast } = useToasts()
  const hostedByCore = typeof window !== 'undefined' && window.__TERAPROX_HOSTED_BY_CORE__

  if (hostedByCore) return <>{children}</>

  return (
    <StandaloneProvider
      createController={(ctx, ep) => basicController(ctx, { api: setRestApi(ctx, ep) })}
      addToast={addToast}
    >
      <DevAutoLogin actions={{ logIn, setCompany }}>
        {children}
      </DevAutoLogin>
    </StandaloneProvider>
  )
}
```

**Deletar:**
- `src/providers/StandaloneCoreServiceProvider.js`
- `src/dev/DevAutoLogin.js` (se existir)

---

## FASE 2.1 — Atualizar o Core (FederatedComponentHOC) para novo Bridge

> **Branch `gcp-migration`:** Corte limpo, sem backward compat. Todos os remotes migram juntos.

O Bridge agora recebe `coreService` em vez de `webProviderValue`.

**Editar:** `teraprox-core/src/factories/FederatedComponentHOC.js`

**Antes:**
```jsx
const coreWebProviderRaw = useContext(CoreWebProvider);
// ...
<BridgeComponent webProviderValue={coreWebProviderRaw}>
    {remoteContent}
</BridgeComponent>
```

**Depois:**
```jsx
import { useCoreService } from 'teraprox-core-sdk'
// ...
const coreService = useCoreService()  // Disponível porque CoreServiceProvider envolve tudo

// ...
<BridgeComponent coreService={coreService}>
    {remoteContent}
</BridgeComponent>
```

**Remover:**
- `useContext(CoreWebProvider)` — não é mais usado
- Prop `webProviderValue` — eliminado
- Import de `CoreWebProvider` (se não for usado em mais nenhum lugar)

---

## FASE 3 — Migrar SGM (módulo maior)

> **Branch `gcp-migration`:** Corte limpo. `useWebProvider()` é eliminado de uma vez, sem bridge de transição.

### 3.1 — Atualizar FederatedBridge

**Antes** (`src/federation/FederatedBridge.js`):
```javascript
import { WebProvider } from '../websocket/wsProvider';

export default function FederatedBridge({ webProviderValue, children }) {
    useEffect(() => { window.__TERAPROX_HOSTED_BY_CORE__ = true; ... });
    return (
        <WebProvider.Provider value={webProviderValue}>
            {children}
        </WebProvider.Provider>
    );
}
```

**Depois** (re-export direto do SDK — 1 linha):
```javascript
export { FederatedBridge as default } from 'teraprox-core-sdk'
```

**Deletar:**
- `src/websocket/wsProvider.js` (WebProvider context inteiro)
- `src/hooks/defaults/useWebProvider.js` (hook Frankenstein de 100+ linhas)
```

### 3.2 — Substituir `useWebProvider` → SDK (corte total)

> Sem gradualidade. O `useWebProvider.js` é deletado e TODOS os consumers migram de uma vez.

#### Exemplo: `useOrdemDeServico.js`

**Antes:**
```javascript
import { useWebProvider } from '../defaults/useWebProvider'

export const useOrdemDeServico = () => {
  const { controller } = useWebProvider()
  
  const carregarOrdens = async () => {
    const ctrl = controller('ordemDeServico')
    const result = await ctrl.get('ordemDeServico')
    // ...
  }
}
```

**Depois:**
```javascript
import { useHttpController, useToast } from 'teraprox-core-sdk'

export const useOrdemDeServico = () => {
  const controller = useHttpController('ordemDeServico')
  const toast = useToast()
  
  const carregarOrdens = async () => {
    try {
      const result = await controller.get('ordemDeServico')
      // ...
    } catch (err) {
      toast.error('Erro ao carregar ordens de serviço')
    }
  }
}
```

#### Tabela de substituição (find & replace em massa):

| Antes (useWebProvider) | Depois (SDK) |
|---|---|
| `import { useWebProvider } from '...'` | **DELETAR** — não existe mais |
| `const { controller } = useWebProvider()` | `const ctrl = useHttpController('contexto')` |
| `const ctrl = controller('contexto')` | (removido — já resolvido no import) |
| `ctrl.get(...)` / `ctrl.post(...)` | `ctrl.get(...)` / `ctrl.post(...)` (API idêntica) |
| `const { subscribe } = useWebProvider()` | `const { subscribe } = useCoreService()` |
| `const { toast } = useWebProvider()` | `const toast = useToast()` |

#### Script para migração em massa:
```bash
cd teraprox-app-sgm

# 1. Listar todos os arquivos afetados
grep -rln "useWebProvider" src/ --include="*.js" | grep -v node_modules > /tmp/wp_files.txt
echo "Arquivos a migrar: $(wc -l < /tmp/wp_files.txt)"

# 2. Substituir imports (sed)
while IFS= read -r file; do
  # Remove import do useWebProvider
  sed -i '' '/useWebProvider/d' "$file"
  echo "Cleaned: $file"
done < /tmp/wp_files.txt

# 3. Depois: adicionar imports do SDK manualmente por arquivo
#    (cada hook usa combinações diferentes de useHttpController/useToast/useCoreService)
```

> **ATENÇÃO:** O sed remove as linhas de import, mas os novos imports do SDK precisam ser adicionados manualmente porque cada hook usa combinações diferentes (`useHttpController` vs `useCoreService` vs `useToast`). Use o script apenas para identificar os arquivos e remover o import antigo.

### 3.3 — Migrar ReducersBundle

**Antes** (~100 linhas):
```javascript
const reducerImporters = {
  acao: () => import('../Reducers/manutencao-reducers/acaoReducer'),
  alarme: () => import('../Reducers/commons-reducers/alarmeReducer'),
  // ... 40+ linhas
}
// ... 60 linhas de boilerplate getReducerKeysByContext etc.
```

**Depois** (~40 linhas):
```javascript
import { createReducersBundle } from 'teraprox-core-sdk/federation'

const bundle = createReducersBundle({
  reducers: {
    // Domínio SGM
    acao:                       () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/acaoReducer'),
    alarme:                     () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/alarmeReducer'),
    arvoreEstrutural:           () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/arvoreEstruturalReducer'),
    branchLevel:                () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/branchLevelReducer'),
    classeDeComponente:         () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/classeDeComponenteReducer'),
    classeDeRecurso:            () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/classeDeRecursoReducer'),
    componente:                 () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/componenteReducer'),
    dimensao:                   () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/dimensaoReducer'),
    inspecao:                   () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/inspecaoReducer'),
    manutencao:                 () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/manutencaoReducer'),
    mantenedor:                 () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/mantenedorReducer'),
    modoDeFalha:                () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/modoDeFalhaReducer'),
    ordemDeServico:             () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/ordemDeServicoReducer'),
    ordemDeManutencao:          () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/ordemDeManutencaoReducer'),
    executarOrdemDeManutencao:  () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/executarOrdemDeManutencaoReducer'),
    recurso:                    () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/recursoReducer'),
    registroDeTarefa:           () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/registroDeTarefaReducer'),
    solicitacaoDeServico:       () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/solicitacaoDeServicoReducer'),
    tarefa:                     () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/tarefaReducer'),
    tipoDeOrdem:                () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/tipoDeOrdemReducer'),
    troca:                      () => import(/* webpackMode: "eager" */ '../Reducers/manutencao-reducers/trocaReducer'),
    limiteDeControle:           () => import(/* webpackMode: "eager" */ '../Reducers/default-reducers/limiteDeControleReducer'),
    // Commons
    cached:                     () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/cachedReducer'),
    composicao:                 () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/composicaoReducer'),
    frequencia:                 () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/frequenciaReducer'),
    justificativa:              () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/justificativaReducer'),
    material:                   () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/materialReducer'),
    registro:                   () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/registroReducer'),
    setor:                      () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/setorReducer'),
    status:                     () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/statusReducer'),
    turno:                      () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/turnoReducer'),
    unidade:                    () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/unidadeReducer'),
    unidadeMaterial:            () => import(/* webpackMode: "eager" */ '../Reducers/commons-reducers/unidadeMaterialReducer'),
    // Gestão
    grupo:                      () => import(/* webpackMode: "eager" */ '../Reducers/gestao-reducers/grupoReducer'),
    team:                       () => import(/* webpackMode: "eager" */ '../Reducers/gestao-reducers/timeReducer'),
    teamMember:                 () => import(/* webpackMode: "eager" */ '../Reducers/gestao-reducers/teamMemberReducer'),
    // Suprimentos
    requisicaoMaterial:         () => import(/* webpackMode: "eager" */ '../Reducers/suprimentos-reducers/requisicaoMaterialReducer'),
    // Defaults
    globalError:                () => import(/* webpackMode: "eager" */ '../Reducers/default-reducers/globalErrorReducer'),
    picker:                     () => import(/* webpackMode: "eager" */ '../Reducers/default-reducers/genericPickerReducer'),
    pickers:                    () => import(/* webpackMode: "eager" */ '../Reducers/default-reducers/pickersReducer'),
    timer:                      () => import(/* webpackMode: "eager" */ '../Reducers/default-reducers/timerReducer'),
    notification:               () => import(/* webpackMode: "eager" */ '../Reducers/default-reducers/notificationReducer'),
    internalFiltersReducer:     () => import(/* webpackMode: "eager" */ '../Reducers/default-reducers/internalFiltersReducer'),
  },
  contextMap: {
    visaoGeral:        ['ordemDeServico', 'ordemDeManutencao', 'manutencao', 'internalFiltersReducer'],
    agregador:         ['manutencao'],
    ordemDeServico:    ['ordemDeServico', 'ordemDeManutencao', 'executarOrdemDeManutencao', 'inspecao', 'registroDeTarefa', 'internalFiltersReducer', 'mantenedor', 'tarefa', 'modoDeFalha'],
    ordemDeManutencao: ['ordemDeManutencao', 'executarOrdemDeManutencao', 'tarefa', 'registroDeTarefa', 'mantenedor'],
    solicitacaoDeServico: ['solicitacaoDeServico'],
    monitoramentoRecursos: ['recurso', 'manutencao', 'classeDeRecurso'],
    arvoreEstrutural:  ['arvoreEstrutural', 'branchLevel', 'componente', 'classeDeComponente', 'classeDeRecurso'],
    acao:              ['acao'],
    tarefa:            ['tarefa', 'registroDeTarefa'],
    materiais:         ['material', 'requisicaoMaterial'],
    material:          ['material', 'requisicaoMaterial'],
    unidade:           ['unidade'],
    mantenedor:        ['mantenedor'],
    tipoDeOrdem:       ['tipoDeOrdem'],
    inspecao:          ['inspecao'],
    recurso:           ['recurso', 'classeDeRecurso', 'componente', 'mantenedor', 'dimensao'],
    branchLevel:       ['branchLevel', 'arvoreEstrutural'],
    componente:        ['componente', 'classeDeComponente'],
    classeDeComponente: ['classeDeComponente'],
    classeDeRecurso:   ['classeDeRecurso'],
    modoDeFalha:       ['modoDeFalha'],
    registroDeTarefa:  ['registroDeTarefa', 'tarefa'],
    dimensao:          ['dimensao'],
    setor:             ['setor'],
    turno:             ['turno'],
  },
  defaults: ['cached', 'status', 'globalError', 'picker', 'pickers', 'timer', 'internalFiltersReducer', 'notification'],
})

export const { getReducerKeysByContext, getReducersForKeys, getReducersForModule, loadAllReducers } = bundle
export const baseReducers = {}
export default baseReducers
```

### 3.4 — Migrar StandaloneCoreServiceProvider

**Antes** (`src/providers/StandaloneCoreServiceProvider.js`):
```javascript
import React, { useMemo } from 'react';
import { CoreServiceContext } from 'teraprox-core-sdk';
import { useToasts } from 'react-toast-notifications';
import { useWebProvider } from '../hooks/defaults/useWebProvider';
// ... 25 linhas montando value ...
```

**Depois** (`src/App.js` ou wrapper component):
```javascript
import { StandaloneProvider } from 'teraprox-core-sdk/federation'
import { DevAutoLogin } from 'teraprox-core-sdk/federation'
import { useToasts } from 'react-toast-notifications'
import { basicController } from './Http/basicController'
import { setRestApi } from './Http/SgpApi'
import { logIn, setCompany } from './Reducers/default-reducers/globalConfigReducer'

function StandaloneWrapper({ children }) {
  const { addToast } = useToasts()
  const hostedByCore = typeof window !== 'undefined' && window.__TERAPROX_HOSTED_BY_CORE__

  if (hostedByCore) return <>{children}</>

  return (
    <StandaloneProvider
      createController={(ctx, ep) => basicController(ctx, ep)}
      addToast={addToast}
    >
      <DevAutoLogin actions={{ logIn, setCompany }}>
        {children}
      </DevAutoLogin>
    </StandaloneProvider>
  )
}
```

**Deletar:**
- `src/providers/StandaloneCoreServiceProvider.js`
- `src/dev/DevAutoLogin.js`

---

## FASE 4 — Manifesto de Rotas (Auto-registro)

### 4.1 — SGM exporta Manifest

**Criar:** `teraprox-app-sgm/src/federation/manifest.js`
```javascript
/** @type {import('teraprox-core-sdk/federation').RemoteManifest} */
export const manifest = {
  name: 'teraprox_app_sgm',
  version: '1.0.0',
  menuSections: [
    {
      label: 'Manutenção',
      icon: 'FaTools',
      items: [
        { label: 'Visão Geral',           path: '/manutencao/visao-geral',           module: './VisaoGeral',           context: 'visaoGeral' },
        { label: 'Ordens de Serviço',     path: '/manutencao/ordens-de-servico',     module: './OrdensDeServico',      context: 'ordemDeServico' },
        { label: 'Ordens de Manutenção',  path: '/manutencao/ordens-de-manutencao',  module: './OrdensDeManutencao',   context: 'ordemDeManutencao' },
        { label: 'Monitoramento',         path: '/manutencao/monitoramento',         module: './MonitoramentoRecursos',context: 'monitoramentoRecursos' },
        { label: 'Inspeções',             path: '/manutencao/inspecoes',             module: './Inspecoes',            context: 'inspecao' },
        { label: 'Planejamento OS',       path: '/manutencao/planejamento',          module: './PlanejamentoDeOs',     context: 'ordemDeServico' },
        // ... restantes
      ],
    },
    {
      label: 'Cadastros',
      icon: 'FaClipboardList',
      items: [
        { label: 'Recursos',     path: '/cadastros/recursos',     module: './RecursoFormV2',     context: 'recurso' },
        { label: 'Ações',        path: '/cadastros/acoes',        module: './Acoes',             context: 'acao' },
        { label: 'Tarefas',      path: '/cadastros/tarefas',      module: './Tarefas',           context: 'tarefa' },
        { label: 'Materiais',    path: '/cadastros/materiais',    module: './Materiais',         context: 'materiais' },
        { label: 'Mantenedores', path: '/cadastros/mantenedores', module: './Mantenedores',      context: 'mantenedor' },
        { label: 'Tipos de Ordem', path: '/cadastros/tipos-de-ordem', module: './TiposDeOrdem',  context: 'tipoDeOrdem' },
        // ... restantes
      ],
    },
  ],
}
```

**Adicionar ao `config-overrides.js` (exposes):**
```javascript
exposes: {
  // ... telas existentes ...
  './Manifest': './src/federation/manifest',
}
```

### 4.2 — Core carrega manifestos dinamicamente

**Criar:** `teraprox-core/src/federation/useRemoteManifests.js`
```javascript
import { useState, useEffect } from 'react'

const REMOTE_NAMES = [
  'teraprox_app_sgm',
  'teraprox_app_sgp',
  'teraprox_app_solicitacao',
]

/**
 * Carrega manifestos de todos os remotes.
 * Falha silenciosa se um remote estiver offline.
 */
export function useRemoteManifests() {
  const [manifests, setManifests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const results = await Promise.allSettled(
        REMOTE_NAMES.map(async (name) => {
          // Webpack resolve o remote dynamically
          const mod = await import(/* webpackIgnore: true */ `${name}/Manifest`)
          return mod.manifest || mod.default
        })
      )

      const loaded = results
        .filter((r) => r.status === 'fulfilled' && r.value)
        .map((r) => r.value)

      setManifests(loaded)
      setLoading(false)
    }

    load()
  }, [])

  return { manifests, loading }
}
```

**NOTA:** Este passo requer que os imports dinâmicos de remotes sejam resolvíveis. Na prática, é melhor usar `__webpack_require__` ou mapear explicitamente:

```javascript
const MANIFEST_LOADERS = {
  teraprox_app_sgm: () => import('teraprox_app_sgm/Manifest').catch(() => null),
  teraprox_app_sgp: () => import('teraprox_app_sgp/Manifest').catch(() => null),
  teraprox_app_solicitacao: () => import('teraprox_app_solicitacao/Manifest').catch(() => null),
}

export function useRemoteManifests() {
  const [manifests, setManifests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled(
      Object.values(MANIFEST_LOADERS).map(loader => loader())
    ).then(results => {
      setManifests(
        results
          .map(r => r.status === 'fulfilled' ? r.value?.manifest || r.value?.default : null)
          .filter(Boolean)
      )
      setLoading(false)
    })
  }, [])

  return { manifests, loading }
}
```

### 4.3 — MenuBar consome manifestos

**Antes** (`MenuBar.js` — imports hardcoded):
```javascript
import { menuSections as sgpMenuSections } from '../../models/federatedProcessoScreens';
import { menuSections as sgmMenuSections } from '../../models/federatedManutencaoScreens';
```

**Depois** (dinâmico):
```javascript
import { useRemoteManifests } from '../../federation/useRemoteManifests'

const MenuBar = () => {
  const { manifests } = useRemoteManifests()

  // manifests[0].menuSections ← SGM
  // manifests[1].menuSections ← SGP
  // cada section tem items[] com label, path, module, context

  return (
    <Navbar>
      {manifests.map(manifest =>
        manifest.menuSections.map(section => (
          <NavDropdown key={section.label} title={section.label}>
            {section.items.map(item => (
              <NavDropdown.Item key={item.path} as={Link} to={item.path}>
                {item.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        ))
      )}
    </Navbar>
  )
}
```

### 4.4 — Registry dinâmico de componentes

**Antes** (`remoteRegistry.js` — 70 entradas manuais):
```javascript
export const componentRegistry = {
  'teraprox_app_sgm/VisaoGeral': lazyWithChunkReload(() => import('teraprox_app_sgm/VisaoGeral')),
  'teraprox_app_sgm/OrdensDeServico': lazyWithChunkReload(() => import('teraprox_app_sgm/OrdensDeServico')),
  // ... 68 more ...
}
```

**Depois** (gerado a partir dos manifestos):
```javascript
import { lazy } from 'react'

const lazyWithChunkReload = (loader) => lazy(async () => {
  try {
    return await loader()
  } catch (error) {
    if (error?.name === 'ChunkLoadError') {
      window.location.reload()
    }
    throw error
  }
})

// Each remote's modules are loaded lazily using webpack's dynamic import
// The key format is: `remoteName/ModuleName`
const REMOTE_IMPORT_MAP = {
  teraprox_app_sgm:         (mod) => import(`teraprox_app_sgm/${mod}`),
  teraprox_app_sgp:         (mod) => import(`teraprox_app_sgp/${mod}`),
  teraprox_app_solicitacao: (mod) => import(`teraprox_app_solicitacao/${mod}`),
}

const registryCache = {}

export function resolveComponent(remoteName, moduleName) {
  const key = `${remoteName}/${moduleName}`
  if (!registryCache[key]) {
    const loader = REMOTE_IMPORT_MAP[remoteName]
    if (!loader) return null
    // Strip './' prefix from module name if present
    const cleanModule = moduleName.replace(/^\.\//, '')
    registryCache[key] = lazyWithChunkReload(() => loader(cleanModule))
  }
  return registryCache[key]
}

export function resolveRemoteName(modulePath) {
  if (!modulePath) return null
  const parts = modulePath.split('/')
  return parts[0] || null
}
```

> **NOTA:** Webpack não suporta imports totalmente dinâmicos com Module Federation (`import(variable)` não funciona). Na prática, a abordagem mais viável é manter o registry estático mas **gerar ele automaticamente** via script a partir dos manifestos:

```bash
# scripts/generateRegistry.js
// Lê cada manifest.js e gera remoteRegistry.js automaticamente
// Roda como pre-build hook: "prebuild": "node scripts/generateRegistry.js"
```

---

## FASE 5 — Migrar default-components para UI Kit (incremental)

### 5.1 — Criar o pacote

```bash
cd teraprox-core/packages
mkdir -p ui-kit/src/{buttons,forms,displays,modals,table,layout,styles}
```

**Criar:** `packages/ui-kit/package.json`
```json
{
  "name": "@hashcodeti/ui-kit",
  "version": "0.1.0",
  "description": "Componentes visuais compartilhados entre módulos federados",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles": "./dist/styles/teraprox-base.css"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --clean",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
  },
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-bootstrap": ">=2.0.0",
    "react-icons": ">=4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.0",
    "react-icons": "^5.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.3.0"
  }
}
```

**Criar:** `packages/ui-kit/tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "node",
    "lib": ["ES2018", "DOM"],
    "jsx": "react-jsx",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 5.2 — Migrar primeiro batch (componentes 100% idênticos)

#### UuidPill (comprovado idêntico entre SGM e SGP)

**Criar:** `packages/ui-kit/src/displays/UuidPill.tsx`
```tsx
import React, { useState, useRef } from 'react'
import { Badge, Overlay, Tooltip } from 'react-bootstrap'

interface UuidPillProps {
  uuid: string | null | undefined
  bg?: string
  textColor?: string
  short?: number
}

const UuidPill: React.FC<UuidPillProps> = ({ uuid, bg = 'light', textColor = 'dark', short = 8 }) => {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  if (!uuid) return <span className="text-muted">—</span>

  const shortId = String(uuid).substring(0, short)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(uuid)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = uuid
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <Badge
        ref={ref as any}
        bg={bg}
        text={textColor as any}
        pill
        className="border px-2 py-1"
        style={{ cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.8rem', userSelect: 'none' }}
        onClick={handleCopy}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => { setShowTooltip(false); setCopied(false) }}
      >
        {shortId}…
      </Badge>
      <Overlay target={ref.current!} show={showTooltip} placement="top">
        {(props: any) => (
          <Tooltip {...props}>
            {copied ? (
              <span style={{ color: '#6f6' }}>Copiado!</span>
            ) : (
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                {uuid}
                <br />
                <small className="text-muted">Clique para copiar</small>
              </span>
            )}
          </Tooltip>
        )}
      </Overlay>
    </>
  )
}

export default UuidPill
```

#### AddButton (comprovado idêntico)

**Criar:** `packages/ui-kit/src/buttons/AddButton.tsx`
```tsx
import React from 'react'
import { Button } from 'react-bootstrap'
import { GrAdd } from 'react-icons/gr'

interface AddButtonProps {
  callback: () => void
  hiddenBool?: boolean
  size?: number
}

const AddButton: React.FC<AddButtonProps> = ({ callback, hiddenBool, size }) => (
  <Button
    hidden={hiddenBool || false}
    variant="outline-primary"
    onClick={() => callback()}
  >
    <GrAdd size={size || 25} />
  </Button>
)

export default AddButton
```

#### Barrel export

**Criar:** `packages/ui-kit/src/index.ts`
```typescript
// Buttons
export { default as AddButton } from './buttons/AddButton'

// Displays
export { default as UuidPill } from './displays/UuidPill'

// ... adicionar conforme migração avança
```

### 5.3 — Usar nos remotes

**No SGM/SGP**, substituir:
```javascript
// ANTES
import UuidPill from '../Components/default-components/UuidPill'
import AddButton from '../Components/default-components/buttons/AddButton'

// DEPOIS
import { UuidPill, AddButton } from '@hashcodeti/ui-kit'
```

**No webpack (shared):**
```javascript
shared: {
  '@hashcodeti/ui-kit': { singleton: true, requiredVersion: false, eager: true },
  // ...
}
```

### 5.4 — Script de migração automática

Para acelerar a substituição de imports nos remotes:
```bash
#!/bin/bash
# scripts/migrate-ui-imports.sh
# Substitui imports de default-components por @hashcodeti/ui-kit

COMPONENT=$1  # ex: UuidPill
REMOTE_DIR=$2 # ex: /path/to/teraprox-app-sgm

# Find e replace imports
find "$REMOTE_DIR/src" -name "*.js" -exec sed -i '' \
  "s|from '.*default-components.*/${COMPONENT}'|from '@hashcodeti/ui-kit'|g" {} +

find "$REMOTE_DIR/src" -name "*.js" -exec sed -i '' \
  "s|from \".*default-components.*/${COMPONENT}\"|from '@hashcodeti/ui-kit'|g" {} +

echo "Migrated $COMPONENT imports in $REMOTE_DIR"
```

---

## Checklist de Execução por PR

### PR 1: SDK v0.3.0 (core-sdk)
- [ ] Criar `hooks/useFetchData.ts`
- [ ] Criar `hooks/usePostData.ts`
- [ ] Criar `hooks/useAnexoUpload.ts`
- [ ] Criar `hooks/useFormStorage.ts`
- [ ] Criar `hooks/useSmartSearch.ts`
- [ ] Criar `hooks/useValidation.ts`
- [ ] Criar `utils/dateUtils.ts`
- [ ] Criar `utils/stringUtils.ts`
- [ ] Criar `reducers/pickerReducer.ts`
- [ ] Criar `federation/FederatedBridge.tsx`
- [ ] Criar `federation/createReducersBundle.ts`
- [ ] Criar `federation/StandaloneProvider.tsx`
- [ ] Criar `federation/DevAutoLogin.tsx`
- [ ] Criar `federation/types.ts`
- [ ] Criar `federation.ts` (entry point)
- [ ] Atualizar `index.ts` (barrel)
- [ ] Atualizar `package.json` (version 0.3.0, exports, peerDeps)
- [ ] Build e verificar dist/

### PR 2: Migrar Solicitação de Serviço
- [ ] FederatedBridge → re-export do SDK
- [ ] ReducersBundle → usar createReducersBundle
- [ ] Remover StandaloneCoreServiceProvider.js
- [ ] App.js → usar StandaloneProvider + DevAutoLogin do SDK
- [ ] Testar standalone mode (`npm start`)
- [ ] Testar federado (via Core)

### PR 3: Core — corte limpo para novo Bridge
- [ ] FederatedComponentHOC → passar SOMENTE `coreService` (remover `webProviderValue`)
- [ ] Remover import e uso de `CoreWebProvider` raw context

### PR 4: Migrar SGM (corte total)
- [ ] FederatedBridge → re-export do SDK (1 linha)
- [ ] ReducersBundle → usar createReducersBundle
- [ ] Remover StandaloneCoreServiceProvider
- [ ] Deletar `useWebProvider.js` e `wsProvider.js`
- [ ] Migrar TODOS os hooks de useWebProvider → SDK de uma vez

### PR 5: Migrar SGP (mesma receita do SGM)
- [ ] Mesmos passos do PR 4

### PR 6: Manifest + Menu dinâmico
- [ ] SGM/SGP/SS exportam Manifest
- [ ] Core: useRemoteManifests hook
- [ ] Core: MenuBar dinâmico
- [ ] Deletar federatedProcessoScreens/federatedManutencaoScreens

### PR 7+ (contínuo): UI Kit
- [ ] Batch 1: UuidPill, AddButton, DeleteButton, EditButton, StatusBadge
- [ ] Batch 2: FormField, GenericSelect, Switch, Autocomplete
- [ ] Batch 3: ConfirmModal, GenericTable, GenericListScreen
- [ ] ...

---

## Resumo: O que cada dev precisa saber

```
┌─────────────────────────────────────────────────────┐
│  REGRA 1: Preciso de HTTP?                          │
│  → useHttpController('contexto') do SDK             │
│                                                     │
│  REGRA 2: Preciso de toast?                         │
│  → useToast() do SDK                                │
│                                                     │
│  REGRA 3: Preciso de subscribe real-time?            │
│  → useCoreService().subscribe(mo) ou                │
│    useMatchingObject('ctx', 'loc', refresher)       │
│                                                     │
│  REGRA 4: Preciso de um componente visual genérico? │
│  → import { X } from '@hashcodeti/ui-kit'             │
│                                                     │
│  REGRA 5: Preciso de validação?                     │
│  → useValidation(rules) do SDK                      │
│                                                     │
│  REGRA 6: Preciso de utilitário (data, string)?     │
│  → import { formatDate } from 'teraprox-core-sdk'   │
│                                                     │
│  REGRA 7: useWebProvider() está DEPRECADO           │
│  → Substituir por useCoreService() em tudo          │
│                                                     │
│  REGRA 8: Reducer de DOMÍNIO fica no REMOTE         │
│  REGRA 9: Reducer GENÉRICO fica no SDK              │
└─────────────────────────────────────────────────────┘
```
