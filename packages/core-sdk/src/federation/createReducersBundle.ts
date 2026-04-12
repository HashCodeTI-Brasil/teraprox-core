/**
 * Factories for creating standardized ReducersBundles.
 *
 * Two APIs:
 *
 * 1. `createReducersFromManifest` (RECOMENDADO) — Manifest-driven.
 *    O manifest.js é a FONTE ÚNICA DE VERDADE: declara rotas, menu E reducer deps.
 *    Zero contextMap manual.
 *
 *    ```ts
 *    import { createReducersFromManifest } from 'teraprox-core-sdk/federation'
 *    import { manifest } from './manifest'
 *
 *    export default createReducersFromManifest(manifest, {
 *      solicitacaoDeServico: () => import('../Reducers/solicitacaoDeServicoReducer'),
 *      tarefa:               () => import('../Reducers/tarefaReducer'),
 *      justificativa:        () => import('../Reducers/justificativaReducer'),
 *      globalError:          () => import('../Reducers/default-reducers/globalErrorReducer'),
 *    })
 *    ```
 *
 * 2. `createReducersBundle` (LEGADO) — contextMap manual.
 *    Mantido para retrocompatibilidade com remotes que ainda não declararam
 *    `reducers[]` nas rotas do manifest.
 */

import type { RemoteManifest, RemoteMenuItem, RemoteFormRoute } from './types'

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

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
  getReducersForModule(opts: { context?: string; modulePath?: string; reducerKeys?: string[] }): Promise<Record<string, any>>
  loadAllReducers(): Promise<Record<string, any>>
  baseReducers: Record<string, never>
}

// ---------------------------------------------------------------------------
// Shared loader
// ---------------------------------------------------------------------------

function buildGetReducersForKeys(
  reducers: Record<string, () => Promise<any>>,
) {
  return async (keys: string[] = []): Promise<Record<string, any>> => {
    const uniqueKeys = [...new Set(keys)].filter((key) => !!reducers[key])
    const loaded = await Promise.all(
      uniqueKeys.map(async (key) => {
        const mod = await reducers[key]()
        return [key, mod.default || mod] as [string, any]
      }),
    )
    return Object.fromEntries(loaded)
  }
}

// ---------------------------------------------------------------------------
// 1. NEW — Manifest-driven factory
// ---------------------------------------------------------------------------

/**
 * Cria um ReducersBundle a partir do manifest + mapa de importadores.
 *
 * O contextMap é DERIVADO automaticamente dos campos `reducers[]` e `context`
 * de cada rota do manifest. Nenhuma declaração manual de contexto é necessária.
 *
 * @param manifest   — O mesmo objeto exportado como ./Manifest
 * @param reducerMap — { storeKey: () => import('...') } para TODOS os reducers do remote
 * @param defaultReducerKeys — Keys injetadas em todas as rotas (ex: 'globalError', 'notification')
 */
export function createReducersFromManifest(
  manifest: RemoteManifest,
  reducerMap: Record<string, () => Promise<any>>,
  defaultReducerKeys: string[] = [],
): ReducersBundle {
  const allKeys = Object.keys(reducerMap)
  const getReducersForKeys = buildGetReducersForKeys(reducerMap)

  // Coleta todas as rotas (menu + form)
  const allRoutes: Array<RemoteMenuItem | RemoteFormRoute> = []
  for (const section of manifest.menuSections ?? []) {
    allRoutes.push(...(section.items ?? []))
  }
  allRoutes.push(...(manifest.formRoutes ?? []))

  // Deriva contextMap automaticamente dos `reducers[]` declarados em cada rota
  const derivedContextMap: Record<string, string[]> = {}
  for (const route of allRoutes) {
    if (!route.context) continue
    const routeReducers = route.reducers ?? []
    const existing = derivedContextMap[route.context] ?? []
    derivedContextMap[route.context] = [...new Set([...existing, ...routeReducers])]
  }

  const mergedDefaults = [
    ...new Set([...defaultReducerKeys, ...(manifest.defaultReducers ?? [])]),
  ]

  const getReducerKeysByContext = (context: string): string[] => {
    const contextKeys = derivedContextMap[context]
    if (!contextKeys || contextKeys.length === 0) return allKeys
    return [...new Set([...mergedDefaults, ...contextKeys])]
  }

  const getReducersForModule = async ({
    context,
    reducerKeys,
  }: { context?: string; modulePath?: string; reducerKeys?: string[] } = {}): Promise<Record<string, any>> => {
    // Se o core enviar reducerKeys explícitos (do manifest route), usar direto
    if (reducerKeys && reducerKeys.length > 0) {
      const keys = [...new Set([...mergedDefaults, ...reducerKeys])]
      return getReducersForKeys(keys)
    }
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

// ---------------------------------------------------------------------------
// 2. LEGACY — Manual contextMap factory (retrocompatível)
// ---------------------------------------------------------------------------

export function createReducersBundle(config: ReducersBundleConfig): ReducersBundle {
  const { reducers, contextMap, defaults = [] } = config
  const allKeys = Object.keys(reducers)
  const getReducersForKeys = buildGetReducersForKeys(reducers)

  const getReducerKeysByContext = (context: string): string[] => {
    const contextKeys = contextMap[context]
    if (!contextKeys) return allKeys
    return [...new Set([...defaults, ...contextKeys])]
  }

  const getReducersForModule = async ({
    context,
  }: { context?: string; modulePath?: string; reducerKeys?: string[] } = {}): Promise<Record<string, any>> => {
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
