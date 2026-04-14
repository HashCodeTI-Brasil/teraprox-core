const LOCAL_STORAGE_KEY = 'teraprox-dev-tenant'

/**
 * Extracts tenant from subdomain.
 * cationbrasil.teraprox.com → "cationbrasil"
 * localhost → reads from localStorage (dev mode)
 */
export function getTenantFromHostname() {
  const hostname = window.location.hostname

  // Dev local: usar tenant salvo no localStorage
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || null
  }

  const parts = hostname.split('.')
  if (parts.length < 3) return null
  const sub = parts[0]
  if (sub === 'www' || sub === 'app') return null
  return sub
}

export function isLocalDev() {
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1'
}

export function setDevTenant(tenant) {
  if (tenant) {
    localStorage.setItem(LOCAL_STORAGE_KEY, tenant)
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }
}

export function getDevTenant() {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || ''
}
