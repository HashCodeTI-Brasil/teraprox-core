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

/**
 * Cache em memória primário, vivo enquanto o JS module estiver carregado.
 * Sobrevive a navegação cross-MF (árvore React desmonta mas o módulo
 * persiste). Perde-se em F5/refresh — aceitável (usuário prefere dados
 * frescos após reload).
 *
 * Por que primário e não fallback: sessionStorage tem limite de 5MB.
 * Listas grandes (ex: 4914 OS × ~10KB ≈ 50MB) jogam QuotaExceededError
 * em setItem, e o try/catch engole silenciosamente — o cache fica com
 * o último valor que coube, geralmente um Array(0) inicial. Memória JS
 * não tem esse limite; só estoura mesmo em datasets absurdos (>100k itens).
 *
 * sessionStorage é mantido como BEST-EFFORT (small-state e pós-reload):
 * sempre tentamos escrever em ambos; se sessionStorage falhar (quota),
 * memória continua válida. Reads preferem memória (mais rápida) e caem
 * para sessionStorage só se memória estiver vazia (após F5).
 */
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

/**
 * Leitura em duas camadas: memória primeiro (rápida e sem limite),
 * sessionStorage como fallback (só ativa após F5, antes do primeiro write
 * a memória ficou limpa). `scope: 'memory'` desliga sessionStorage
 * completamente (testes ou modos de privacidade extrema).
 */
function readEntry<T>(
  storageKey: string,
  scope: 'session' | 'memory',
): CachedEntry<T> | null {
  // 1. Memória (sempre tentada primeiro)
  const memRaw = memoryStore.get(storageKey)
  if (memRaw != null) {
    try {
      const parsed = JSON.parse(memRaw) as CachedEntry<T>
      if (typeof parsed?.t === 'number') return parsed
    } catch {
      // memória corrompida — segue para sessionStorage
    }
  }
  // 2. sessionStorage (fallback pós-reload, só se scope permitir)
  if (scope !== 'memory' && isWindowAvailable()) {
    try {
      const raw = window.sessionStorage.getItem(storageKey)
      if (!raw) return null
      const parsed = JSON.parse(raw) as CachedEntry<T>
      if (typeof parsed?.t !== 'number') return null
      // Promove para memória — próximas leituras evitam JSON.parse de sessionStorage.
      memoryStore.set(storageKey, raw)
      return parsed
    } catch {
      return null
    }
  }
  return null
}

/**
 * Escrita em duas camadas: memória sempre (primária, sem limite de quota),
 * sessionStorage best-effort (falha silenciosa em QuotaExceededError mas
 * loga warn no console p/ visibilidade). Memória garante consistência;
 * sessionStorage é só p/ sobreviver F5.
 */
function writeEntry<T>(
  storageKey: string,
  entry: CachedEntry<T>,
  scope: 'session' | 'memory',
): void {
  let raw: string
  try {
    raw = JSON.stringify(entry)
  } catch (err) {
    // Cyclic/non-serializable — não tem como cachear.
    // eslint-disable-next-line no-console
    console.warn('[useScreenCachedState] JSON.stringify falhou', storageKey, err)
    return
  }
  // 1. Memória (sempre escreve, sem limite de quota)
  memoryStore.set(storageKey, raw)
  // 2. sessionStorage (best-effort)
  if (scope !== 'memory' && isWindowAvailable()) {
    try {
      window.sessionStorage.setItem(storageKey, raw)
    } catch (err) {
      // QuotaExceededError típico p/ payloads > 5MB. Loga 1x por key
      // para visibilidade — memória continua válida, app não quebra.
      logQuotaWarnOnce(storageKey, raw.length)
    }
  }
}

/**
 * Throttle do warn de quota: 1x por storageKey por sessão, evita
 * flood de console quando setter dispara várias vezes.
 */
const quotaWarnedKeys = new Set<string>()
function logQuotaWarnOnce(storageKey: string, byteSize: number): void {
  if (quotaWarnedKeys.has(storageKey)) return
  quotaWarnedKeys.add(storageKey)
  // eslint-disable-next-line no-console
  console.warn(
    `[useScreenCachedState] sessionStorage quota exceeded para "${storageKey}" ` +
    `(~${(byteSize / 1024 / 1024).toFixed(1)}MB). Cache mantido em memória — ` +
    `sobrevive cross-MF nav, mas perde em F5/refresh.`,
  )
}

function removeEntry(storageKey: string, scope: 'session' | 'memory'): void {
  memoryStore.delete(storageKey)
  if (scope !== 'memory' && isWindowAvailable()) {
    try {
      window.sessionStorage.removeItem(storageKey)
    } catch {
      // ignore
    }
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
      // Diagnostic log (TEMP) — investigar relato de allOrdens vazio em cache.
      // Remover após validar que writes estão de fato ocorrendo.
      try {
        const sample = Array.isArray(resolved)
          ? `Array(${(resolved as unknown[]).length})`
          : typeof resolved
        // eslint-disable-next-line no-console
        console.debug('[useScreenCachedState] write', storageKey, sample)
      } catch {
        // ignore
      }
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
