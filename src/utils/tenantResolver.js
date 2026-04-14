/**
 * Extracts tenant from subdomain.
 * cationbrasil.teraprox.com → "cationbrasil"
 * localhost / teraprox.com → null
 */
export function getTenantFromHostname() {
  const hostname = window.location.hostname
  if (hostname === 'localhost' || hostname === '127.0.0.1') return null
  const parts = hostname.split('.')
  if (parts.length < 3) return null
  const sub = parts[0]
  if (sub === 'www' || sub === 'app') return null
  return sub
}
