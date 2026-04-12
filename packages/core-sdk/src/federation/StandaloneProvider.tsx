import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import { CoreServiceContext } from '../context/CoreServiceContext'
import type { CoreService } from '../types/CoreService'
import type { HttpController } from '../types/HttpController'
import type { ToastService } from '../types/Toast'
import type { MatchingObjectSubscription } from '../types/MatchingObject'
import { NullObservabilityAdapter } from '../adapters/null/NullObservabilityAdapter'

interface EmulatorConfig {
  host: string
  port: number
  namespace?: string
}

interface StandaloneConfig {
  /**
   * Factory for creating an HttpController. The remote provides its
   * local implementation (using basicController + axios).
   */
  createController: (context: string, baseEndPoint?: string) => HttpController

  /**
   * Pass a ToastService implementation directly (preferred).
   * Eliminates the need for an addToast bridge in every remote.
   *
   * Example:
   * ```
   * const myToast: ToastService = { success: ..., warning: ..., error: ..., info: ... }
   * <StandaloneProvider toast={myToast} ...>
   * ```
   */
  toast?: ToastService

  /**
   * react-toast-notifications style callback — kept for backward compatibility
   * with remotes that already use ToastProvider + useToasts().
   * When `toast` prop is provided, `addToast` is ignored.
   */
  addToast?: (message: string, options?: any) => void

  /**
   * Firebase client config object (from REACT_APP_FIREBASE_CONFIG).
   * When provided together with `tenant`, enables real-time matching
   * object listening via Firebase RTDB — same path the Core uses.
   *
   * If omitted, the provider auto-detects the RTDB emulator:
   *   1. Uses `emulator` prop if provided
   *   2. Reads `REACT_APP_RTDB_EMULATOR_HOST` env var
   *   3. Falls back to probing `localhost:9000`
   *   4. If neither works, shows a configuration popup (dev only)
   */
  firebaseConfig?: Record<string, unknown>

  /**
   * Explicit emulator configuration. Preferred over env vars because
   * DefinePlugin may not replace process.env.REACT_APP_* inside node_modules.
   * The app should read its own env vars and pass them here.
   *
   * Example: `{ host: 'localhost', port: 9000, namespace: 'teraprox-default-rtdb' }`
   */
  emulator?: EmulatorConfig

  /**
   * Tenant / company ID used to build the RTDB path:
   * `{tenant}/matchingObjects`
   *
   * Resolution order (first non-empty value wins):
   *   1. This prop (dynamic — typically from Redux state after login)
   *   2. `REACT_APP_RTDB_TENANT` env var (static — set in the app's .env)
   *   3. `'dev-local'` as last resort in NODE_ENV=development
   *
   * In production the prop MUST be provided; env-var fallback is for dev only.
   */
  tenant?: string

  children: React.ReactNode
}

// ---------------------------------------------------------------------------
// RTDB strategy resolution (emulator auto-detect + cloud fallback)
// ---------------------------------------------------------------------------

type RtdbStrategy =
  | { type: 'emulator'; host: string; port: number; namespace: string }
  | { type: 'cloud'; config: Record<string, unknown> }
  | { type: 'none' }

async function probeEmulator(host: string, port: number): Promise<boolean> {
  try {
    const res = await fetch(`http://${host}:${port}/.json`, {
      signal: AbortSignal.timeout(1500),
    })
    return res.ok || res.status === 404
  } catch {
    return false
  }
}

async function resolveRtdbStrategy(
  firebaseConfig?: Record<string, unknown>,
  emulator?: EmulatorConfig,
): Promise<RtdbStrategy> {
  // 0. Explicit emulator prop (always reliable — app reads its own env vars)
  if (emulator) {
    return {
      type: 'emulator',
      host: emulator.host,
      port: emulator.port,
      namespace: emulator.namespace ?? 'teraprox-default-rtdb',
    }
  }

  // 1. Explicit emulator env var (set by dev .env or RtdbEmulatorPlugin)
  const emulatorHostEnv =
    (typeof process !== 'undefined' &&
      (process.env as Record<string, string | undefined>).REACT_APP_RTDB_EMULATOR_HOST) ||
    undefined

  if (emulatorHostEnv) {
    const [host, portStr] = emulatorHostEnv.split(':')
    const port = parseInt(portStr ?? '9000', 10)
    const namespace =
      (process.env as Record<string, string | undefined>).REACT_APP_RTDB_EMULATOR_NS ??
      'demo-local'
    return { type: 'emulator', host, port, namespace }
  }

  // 2. Cloud Firebase config explicitly provided
  if (firebaseConfig && Object.keys(firebaseConfig).length > 0) {
    return { type: 'cloud', config: firebaseConfig }
  }

  // 3. Auto-probe default emulator port (RtdbEmulatorPlugin default)
  const alive = await probeEmulator('localhost', 9000)
  if (alive) {
    return { type: 'emulator', host: 'localhost', port: 9000, namespace: 'demo-local' }
  }

  return { type: 'none' }
}

// Track which named firebase apps already had connectDatabaseEmulator called
const _emulatorConnected = new Set<string>()

// ---------------------------------------------------------------------------
// Warning popup rendered when no RTDB config could be resolved (dev only)
// ---------------------------------------------------------------------------

function RtdbConfigWarning({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 99999,
        background: '#1a1a2e',
        color: '#fff',
        borderRadius: 8,
        padding: '16px 20px',
        maxWidth: 420,
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        borderLeft: '4px solid #f59e0b',
        fontFamily: 'monospace',
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#f59e0b', fontSize: 14 }}>
        ⚠ RTDB não configurado
      </div>
      <div>
        Matching Objects em tempo real desativados.
        <br />
        Configure no <code>.env.dev</code>:
        <br />
        <code style={{ color: '#86efac' }}>REACT_APP_RTDB_EMULATOR_HOST=localhost:9000</code>
        <br />
        <span style={{ color: '#94a3b8', fontSize: 11 }}>
          ou inicie o backend com <code>RtdbEmulatorPlugin</code> do @onroad/core
        </span>
        <br />
        <span style={{ color: '#94a3b8', fontSize: 11 }}>
          e rode o emulator com <code>firebase emulators:start --only database</code>
        </span>
      </div>
      <button
        onClick={onDismiss}
        style={{
          marginTop: 12,
          padding: '4px 14px',
          background: '#374151',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        Fechar
      </button>
    </div>
  )
}

/**
 * Standardized provider for standalone mode (npm start).
 *
 * Replaces the StandaloneCoreServiceProvider that each remote copies.
 * The remote only needs to provide its createController and addToast.
 *
 * RTDB auto-resolution order (no config required):
 *   1. `REACT_APP_RTDB_EMULATOR_HOST` env var → connects to emulator
 *   2. `firebaseConfig` prop → connects to Firebase cloud
 *   3. Auto-probe `localhost:9000` → uses emulator if alive
 *   4. None found → shows configuration popup (dev only)
 *
 * USAGE IN REMOTES:
 * ```
 * import { StandaloneProvider } from 'teraprox-core-sdk/federation'
 * import { basicController } from '../Http/basicController'
 * import { useToasts } from 'react-toast-notifications'
 *
 * function App() {
 *   const { addToast } = useToasts()
 *   const tenant = useSelector(s => s.global.companyId)
 *   return (
 *     <StandaloneProvider
 *       createController={(ctx, ep) => basicController(ctx, ep)}
 *       addToast={addToast}
 *       tenant={tenant}
 *     >
 *       <Routes />
 *     </StandaloneProvider>
 *   )
 * }
 * ```
 */
export function StandaloneProvider({
  createController,
  toast: toastProp,
  addToast,
  firebaseConfig,
  emulator,
  tenant,
  children,
}: StandaloneConfig) {
  const [subscriptions] = useState<MatchingObjectSubscription[]>([])
  const subscriptionsRef = useRef(subscriptions)
  subscriptionsRef.current = subscriptions

  const [rtdbWarning, setRtdbWarning] = useState(false)

  // Tenant resolution order:
  //   1. explicit prop (e.g. from Redux after login)
  //   2. REACT_APP_RTDB_TENANT env var (set in the app's .env — read at build time by webpack DefinePlugin)
  //   3. 'dev-local' fallback so RTDB always works in development without any config
  // Note: process.env.REACT_APP_* may not be replaced inside node_modules depending on the
  // bundler config, so the explicit prop or emulator prop remains the most reliable path.
  const _envTenant =
    typeof process !== 'undefined'
      ? (process.env as Record<string, string | undefined>).REACT_APP_RTDB_TENANT
      : undefined

  const resolvedTenant: string | undefined =
    tenant ||
    _envTenant ||
    (process.env.NODE_ENV !== 'production' ? 'dev-local' : undefined)

  // Prefer direct ToastService prop; fall back to addToast bridge for
  // backward compat with react-toast-notifications style providers.
  const toast: ToastService = useMemo(() => {
    if (toastProp) return toastProp
    if (addToast) {
      return {
        success: (msg, opts) => addToast(msg, { appearance: 'success', autoDismiss: true, ...opts }),
        warning: (msg, opts) => addToast(msg, { appearance: 'warning', autoDismiss: true, ...opts }),
        error:   (msg, opts) => addToast(msg, { appearance: 'error',   autoDismiss: true, ...opts }),
        info:    (msg, opts) => addToast(msg, { appearance: 'info',    autoDismiss: true, ...opts }),
      }
    }
    // Neither provided — no-op toast (logs to console in dev)
    const noop = (msg: string) => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[StandaloneProvider] Toast called but no toast/addToast prop provided:', msg)
      }
    }
    return { success: noop, warning: noop, error: noop, info: noop }
  }, [toastProp, addToast])

  const subscribe = useCallback(
    (mo: MatchingObjectSubscription) => {
      subscriptions.push(mo)
    },
    [subscriptions]
  )

  const unsubscribe = useCallback(
    (mo: MatchingObjectSubscription) => {
      const idx = subscriptions.findIndex(
        (s) => s.context === mo.context && s.location === mo.location
      )
      if (idx >= 0) subscriptions.splice(idx, 1)
    },
    [subscriptions]
  )

  // Warn in dev when even the resolved tenant is still absent — means no prop,
  // no REACT_APP_RTDB_TENANT and somehow NODE_ENV is not 'development'.
  useEffect(() => {
    if (resolvedTenant || process.env.NODE_ENV === 'production') return
    const timer = setTimeout(() => {
      console.warn(
        '[StandaloneProvider] RTDB listener deferred: tenant could not be resolved after 5 s.\n' +
        'Fix with any of:\n' +
        '  • Pass `tenant` prop (e.g. from Redux state.global.companyId)\n' +
        '  • Set REACT_APP_RTDB_TENANT=<companyId> in your .env\n' +
        '  • Run in NODE_ENV=development (auto-falls back to "dev-local")'
      )
    }, 5000)
    return () => clearTimeout(timer)
  }, [resolvedTenant])

  // --- Firebase RTDB listener with auto-detect emulator ---
  useEffect(() => {
    if (!resolvedTenant) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    ;(async () => {
      const strategy = await resolveRtdbStrategy(firebaseConfig, emulator)
      if (cancelled) return

      if (strategy.type === 'none') {
        if (process.env.NODE_ENV !== 'production') setRtdbWarning(true)
        return
      }

      try {
        const { initializeApp, getApps } = await import('firebase/app')
        const { getDatabase, ref, onChildAdded } = await import('firebase/database')

        let db: ReturnType<typeof getDatabase>

        if (strategy.type === 'emulator') {
          const appName = `onroad-rtdb-emulator-${strategy.port}`
          const existingApp = getApps().find((a) => a.name === appName)
          const emulatorApp =
            existingApp ??
            initializeApp(
              {
                projectId: strategy.namespace,
                databaseURL: `http://${strategy.host}:${strategy.port}?ns=${strategy.namespace}`,
              },
              appName
            )
          db = getDatabase(emulatorApp)

          // connectDatabaseEmulator must be called only once per db instance
          if (!_emulatorConnected.has(appName)) {
            const { connectDatabaseEmulator } = await import('firebase/database')
            try {
              connectDatabaseEmulator(db, strategy.host, strategy.port)
              _emulatorConnected.add(appName)
            } catch {
              // Already connected — safe to ignore
              _emulatorConnected.add(appName)
            }
          }

          console.info(
            `[StandaloneProvider] RTDB emulator at ${strategy.host}:${strategy.port} (ns=${strategy.namespace})`
          )
        } else {
          // Cloud Firebase
          const existingApp = getApps().find((a) => a.name === '[DEFAULT]') ?? getApps()[0]
          const cloudApp = existingApp ?? initializeApp(strategy.config)
          db = getDatabase(cloudApp)
        }

        const moRef = ref(db, `${resolvedTenant}/matchingObjects`)

        const unsub = onChildAdded(moRef, (snapshot: any) => {
          const data = snapshot.val()
          if (!data) return
          const items = Array.isArray(data) ? data : [data]
          for (const mo of items) {
            if (typeof mo !== 'object') continue
            const subs = subscriptionsRef.current || []
            for (const sub of subs) {
              const sameContext = sub.context === mo.context
              const sameLocation =
                sub.location === mo.location ||
                sub.location === '*' ||
                mo.location === '*' ||
                !sub.location ||
                !mo.location
              if (sameContext && sameLocation && sub.refresher) {
                try {
                  sub.refresher(mo.payload, () => {})
                } catch { /* swallow per-subscriber errors */ }
              }
            }
          }
        })

        // Firebase modular API: the returned function IS the unsubscribe — call it directly
        cleanup = () => unsub()
      } catch (err) {
        console.warn('[StandaloneProvider] Firebase RTDB listener failed:', err)
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [firebaseConfig, emulator, resolvedTenant])

  const value: CoreService = useMemo(
    () => ({
      createController,
      toast,
      subscribe,
      unsubscribe,
      subscribeEvent: () => {},
      unsubscribeEvent: () => {},
      handleLogout: () => {},
      hostedByCore: false,
      observability: new NullObservabilityAdapter(),
      rateLimits: {},
    }),
    [createController, toast, subscribe, unsubscribe]
  )

  return (
    <CoreServiceContext.Provider value={value}>
      {children}
      {rtdbWarning && <RtdbConfigWarning onDismiss={() => setRtdbWarning(false)} />}
    </CoreServiceContext.Provider>
  )
}
