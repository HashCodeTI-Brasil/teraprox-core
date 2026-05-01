import { useCallback, useMemo, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

/**
 * Cache de estado de tela com persistência automática por path.
 *
 * Drop-in para `useState` quando o estado precisa sobreviver à navegação
 * intra-aba — incluindo navegação cross-MF (entre micro-frontends federados),
 * onde o host substitui a subárvore React e qualquer `useState` é descartado.
 *
 * Backed por `sessionStorage`, auto-keyado pelo `pathname` atual:
 *   `teraprox.screen.<pathname>.<key>`
 *
 * Diferenças de outras primitivas:
 *  - `useState` cru: state perde-se ao desmontar.
 *  - `useFormStorage`: persiste em `localStorage` (cross-session) — para drafts
 *    de formulário que devem sobreviver ao fechar a aba.
 *  - `useScreenCachedState`: persiste em `sessionStorage` (intra-aba),
 *    keyado por path — ideal para listas, filtros, range/setor selecionados.
 *
 * Compat com `useState`:
 *  - Aceita `initialValue` ou função lazy.
 *  - `setValue` aceita valor direto OU updater function `(prev) => next`.
 *
 * @param key sufixo único da entry. Combina com `pathname` para chave final.
 * @param initialValue valor inicial (ou função lazy) quando não há cache.
 * @param options ajustes finos (escopo, TTL, override de path).
 * @returns `[value, setValue, clear]` — `clear()` remove a entry e reseta.
 */
export interface ScreenCacheOptions {
  /**
   * Override da path-key. Default: `window.location.pathname`.
   * Útil quando rotas com `:id` devem COMPARTILHAR cache (ex: lista única
   * para todos os ids do mesmo recurso) ou quando a tela quer escopo
   * customizado (ex: agrupar por tenant).
   */
  pathOverride?: string
  /**
   * Storage backend. Default `'session'` (sessionStorage).
   * `'memory'` é um fallback in-memory útil em testes e em ambientes onde
   * sessionStorage está bloqueado (modo privacidade extremo / Safari ITP).
   */
  scope?: 'session' | 'memory'
  /**
   * TTL em ms. Se setado, hidratação descarta o cache se mais velho que `ttl`.
   * Default: sem TTL — cache só invalida via `clear()` ou navegação a outra path.
   */
  ttl?: number
  /**
   * Callback após hidratação bem-sucedida (cache hit). Útil para padrão SWR:
   * dispare uma revalidação silenciosa em background ao receber dados frescos.
   */
  onHydrate?: (cached: unknown) => void
}

interface CachedEntry<T> {
  v: T
  t: number // timestamp ms para cálculo de TTL
}

const STORAGE_PREFIX = 'teraprox.screen.'

/** Cache em memória (fallback quando scope='memory' ou sessionStorage indisponível). */
const memoryStore = new Map<string, string>()

function isWindowAvailable(): boolean {
  return typeof window !== 'undefined'
}

function getCurrentPath(override?: string): string {
  if (override) return override
  if (!isWindowAvailable()) return ''
  // Ignora ?query e #hash — paths como /os/planejamento?ss=42 e /os/planejamento
  // compartilham o mesmo cache de tela (a query muda intent, não conteúdo).
  return window.location.pathname || ''
}

function buildStorageKey(path: string, key: string): string {
  return `${STORAGE_PREFIX}${path}.${key}`
}

function readEntry<T>(
  storageKey: string,
  scope: 'session' | 'memory',
): CachedEntry<T> | null {
  try {
    const raw = scope === 'memory'
      ? memoryStore.get(storageKey) ?? null
      : isWindowAvailable() ? window.sessionStorage.getItem(storageKey) : null
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedEntry<T>
    // Schema mínimo: precisa ter `t` (number) e `v` (qualquer coisa).
    if (typeof parsed?.t !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

function writeEntry<T>(
  storageKey: string,
  entry: CachedEntry<T>,
  scope: 'session' | 'memory',
): void {
  try {
    const raw = JSON.stringify(entry)
    if (scope === 'memory') {
      memoryStore.set(storageKey, raw)
      return
    }
    if (isWindowAvailable()) {
      window.sessionStorage.setItem(storageKey, raw)
    }
  } catch {
    // QuotaExceededError, JSON cyclic, etc — falha silenciosa.
    // Cache é otimização: app continua funcionando, só sem persistência.
  }
}

function removeEntry(storageKey: string, scope: 'session' | 'memory'): void {
  try {
    if (scope === 'memory') {
      memoryStore.delete(storageKey)
      return
    }
    if (isWindowAvailable()) {
      window.sessionStorage.removeItem(storageKey)
    }
  } catch {
    // ignore
  }
}

function resolveInitialValue<T>(initialValue: T | (() => T)): T {
  return typeof initialValue === 'function'
    ? (initialValue as () => T)()
    : initialValue
}

export function useScreenCachedState<T>(
  key: string,
  initialValue: T | (() => T),
  options?: ScreenCacheOptions,
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const scope = options?.scope ?? 'session'
  const ttl = options?.ttl
  const pathOverride = options?.pathOverride
  const onHydrate = options?.onHydrate

  // Path resolvido uma vez por mount — alterações de path durante o ciclo
  // de vida do componente NÃO movem dados entre keys (escolha intencional:
  // se o path muda, o componente normalmente desmonta).
  const storageKey = useMemo(
    () => buildStorageKey(getCurrentPath(pathOverride), key),
    [key, pathOverride],
  )

  // Hidratação lazy (uma vez por mount). Respeita TTL.
  const [value, setValue] = useState<T>(() => {
    const entry = readEntry<T>(storageKey, scope)
    if (entry == null) return resolveInitialValue(initialValue)
    if (typeof ttl === 'number' && Date.now() - entry.t > ttl) {
      // Stale — descarta e usa initial.
      removeEntry(storageKey, scope)
      return resolveInitialValue(initialValue)
    }
    // Hidrata + dispara onHydrate fora do render (microtask) para SWR.
    if (onHydrate) {
      Promise.resolve().then(() => onHydrate(entry.v))
    }
    return entry.v
  })

  // Setter wrapper: escreve em sessionStorage SINCRONAMENTE no momento da
  // chamada (não em useEffect debounced). Evita races em navegação cross-MF
  // (componente desmonta antes do effect rodar) e garante que o cache
  // sempre reflete a última chamada de setValue, sem depender de cleanup.
  //
  // Custo: serialização JSON acontece a cada setValue. Para os volumes
  // típicos (50-200KB) é ~5-10ms — aceitável; smart-refresh dispara no
  // máximo poucas vezes por segundo.
  //
  // valueRef rastreia o último value escrito para que updater functions
  // (setValue(prev => next)) calculem a partir do estado real, não do
  // closure de uma render anterior.
  const valueRef = useRef<T>(value)
  valueRef.current = value

  const wrappedSetValue = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      const resolved = typeof next === 'function'
        ? (next as (prev: T) => T)(valueRef.current)
        : next
      valueRef.current = resolved
      writeEntry<T>(storageKey, { v: resolved, t: Date.now() }, scope)
      setValue(resolved)
    },
    [storageKey, scope],
  )

  const clear = useCallback(() => {
    removeEntry(storageKey, scope)
    const initial = resolveInitialValue(initialValue)
    valueRef.current = initial
    setValue(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialValue
    // intencionalmente fora das deps: clear sempre restaura ao valor da
    // chamada original do hook (consistente com semântica de useState).
  }, [storageKey, scope])

  return [value, wrappedSetValue, clear]
}
