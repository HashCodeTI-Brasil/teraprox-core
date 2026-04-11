/**
 * Factory for creating a standardized ReducersBundle.
 *
 * Each remote only needs to declare ITS reducers and context map.
 * Resolution, deduplication, and loading logic lives here in the SDK.
 *
 * USAGE IN REMOTES:
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

  const getReducersForModule = async ({
    context,
  }: { context?: string; modulePath?: string } = {}): Promise<Record<string, any>> => {
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
