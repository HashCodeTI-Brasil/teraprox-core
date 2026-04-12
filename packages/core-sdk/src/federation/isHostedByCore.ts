/**
 * Indica se o bundle atual está sendo executado dentro do shell teraprox-core
 * (Module Federation). O host define `window.__TERAPROX_HOSTED_BY_CORE__` via
 * `FederatedBridge` ao montar o remote.
 *
 * Use para ramificações raras (ex.: não montar `StandaloneProvider` duplicado).
 * Para HTTP, prefira sempre `useCoreService().createController` — no host vem
 * do `CoreServiceProvider`; em standalone vem do `StandaloneProvider`.
 */
export function isHostedByCore(): boolean {
  if (typeof window === 'undefined') return false
  return !!(window as unknown as { __TERAPROX_HOSTED_BY_CORE__?: boolean }).__TERAPROX_HOSTED_BY_CORE__
}
