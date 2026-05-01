import { useCallback, useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useScreenCachedState } from './useScreenCachedState'

/**
 * Cache de fetch por tela com padrão SWR (stale-while-revalidate).
 *
 * Constrói sobre `useScreenCachedState`: combina estado persistido em
 * `sessionStorage` com um effect que dispara `fetcher()` quando `deps`
 * mudam (ou quando não há cache). Padrão típico para telas-lista
 * (planejamento, agregadores, inspeções).
 *
 * Comportamento:
 *  - Mount com cache: hidratação imediata (sem `loading=true`) e, se `swr`,
 *    revalidação silenciosa em background (`revalidating=true`).
 *  - Mount sem cache: `loading=true` até `fetcher` resolver.
 *  - `deps` mudam: refetch (silent se cache atual válido para os novos deps,
 *    spinner caso contrário). A cache key inclui um hash de `deps` para
 *    evitar entregar dados de um filtro anterior.
 *  - `refresh()`: refetch explícito, sempre com spinner curto (botão refresh).
 *  - `mutate(next)`: update local imediato + persist (smart-refresh via WS).
 *
 * Erros em silent revalidation NÃO populam `error` — manter UI exibindo cache
 * é melhor UX que mostrar erro de background quando offline temporário.
 */
export interface ScreenFetchOptions<T> {
  /** Sufixo único da entry. Combina com `pathname` na chave final. */
  cacheKey: string
  /** Função de fetch. */
  fetcher: () => Promise<T>
  /**
   * Inputs que invalidam o cache. Mudança em qualquer deps dispara refetch.
   * Os deps também participam da chave de storage para evitar mostrar
   * dados de filtros anteriores.
   */
  deps: ReadonlyArray<unknown>
  /** Override de path (vide `useScreenCachedState`). */
  pathOverride?: string
  /** TTL ms — cache mais velho é descartado na hidratação. Default: sem TTL. */
  ttl?: number
  /**
   * `true` (default): hidrata cache imediatamente + revalida em background.
   * `false`: usa cache até `deps` mudarem; sem background fetch.
   */
  swr?: boolean
}

export interface ScreenFetchResult<T> {
  /** Dados (cache hidratado ou último fetch). `null` enquanto não há nada. */
  data: T | null
  /** `true` apenas na primeira carga sem cache. */
  loading: boolean
  /** `true` durante background fetch (revalidação SWR). */
  revalidating: boolean
  /** Último erro de fetch foreground (silent revalidation NÃO popula). */
  error: Error | null
  /** Refetch explícito (sempre foreground, com spinner curto). */
  refresh: () => Promise<void>
  /** Update local imediato + persist no cache (sem rede). */
  mutate: Dispatch<SetStateAction<T | null>>
}

function hashDeps(deps: ReadonlyArray<unknown>): string {
  // Hash leve estável: stringify simples. Boa o suficiente para chave de cache;
  // deps tipicamente são primitivos (setor, ISO date, ids) — não objetos profundos.
  try {
    return JSON.stringify(deps)
  } catch {
    // Cyclic ou non-serializable — fallback para length + tipos.
    return deps.map((d) => `${typeof d}:${String(d).slice(0, 32)}`).join('|')
  }
}

export function useScreenCachedFetch<T>(opts: ScreenFetchOptions<T>): ScreenFetchResult<T> {
  const { cacheKey, fetcher, deps, pathOverride, ttl, swr = true } = opts

  const depsHash = hashDeps(deps)
  // Chave inclui hash de deps — assim setor=A e setor=B têm caches separados,
  // sem risco de exibir dados de A quando B é selecionado.
  const fullKey = `${cacheKey}::${depsHash}`

  const [data, setData] = useScreenCachedState<T | null>(fullKey, null, {
    pathOverride,
    ttl,
  })

  const [loading, setLoading] = useState<boolean>(data == null)
  const [revalidating, setRevalidating] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Ref para a função fetcher mais recente — evita re-rodar effect por
  // mudança de identidade de função (caller geralmente passa arrow inline).
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  // Ref para distinguir o estado inicial (precisa ler cache) dos refetches.
  const hasMountedRef = useRef(false)

  const runFetch = useCallback(
    async (silent: boolean): Promise<void> => {
      if (silent) setRevalidating(true)
      else setLoading(true)
      try {
        const fresh = await fetcherRef.current()
        setData(fresh)
        if (!silent) setError(null)
      } catch (err) {
        if (!silent) {
          setError(err instanceof Error ? err : new Error(String(err)))
        }
        // silent revalidation: erro engolido — cache exibido segue válido.
      } finally {
        if (silent) setRevalidating(false)
        else setLoading(false)
      }
    },
    [setData],
  )

  // Effect: refetch quando depsHash muda; SWR no primeiro mount com cache.
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      // Primeiro mount.
      if (data != null) {
        // Cache hit — render imediato. SWR opcional em background.
        setLoading(false)
        if (swr) {
          void runFetch(true)
        }
      } else {
        // Cache miss — foreground fetch.
        void runFetch(false)
      }
      return
    }
    // depsHash mudou após o primeiro mount.
    if (data != null) {
      // Cache para este novo depsHash já existe (re-monta com mesma combinação) — SWR.
      if (swr) void runFetch(true)
    } else {
      // Cache miss para o novo depsHash — foreground.
      void runFetch(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- depsHash é o
    // disparador estável; data fora intencionalmente para não re-rodar a cada update.
  }, [depsHash, swr, runFetch])

  const refresh = useCallback(async () => {
    await runFetch(false)
  }, [runFetch])

  return {
    data,
    loading,
    revalidating,
    error,
    refresh,
    mutate: setData,
  }
}
