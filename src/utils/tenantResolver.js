const LOCAL_STORAGE_KEY = 'teraprox-dev-tenant'

/**
 * Hostnames servidos pelo Firebase Hosting / Cloud preview que NÃO devem
 * ter o subdomain interpretado como tenant. Ex.: `teraprox-core.web.app`
 * tem subdomain `teraprox-core`, mas isso é o nome do site, não tenant.
 */
const NON_TENANT_HOST_SUFFIXES = ['.web.app', '.firebaseapp.com', '.run.app']

function isNonTenantHost(hostname) {
  return NON_TENANT_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))
}

/**
 * Extracts tenant from subdomain.
 * cationbrasil.teraprox.com.br → "cationbrasil"
 * teraprox-core.web.app        → null (host de preview, sem tenant no DNS)
 * localhost                    → lê do localStorage (dev mode)
 */
export function getTenantFromHostname() {
  const hostname = window.location.hostname

  // Dev local OU preview Firebase/Cloud Run: usar tenant salvo no localStorage
  if (hostname === 'localhost' || hostname === '127.0.0.1' || isNonTenantHost(hostname)) {
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

/**
 * Verdadeiro quando o host atual NÃO carrega tenant do DNS — seja localhost
 * (dev) ou preview Firebase/Cloud Run sem custom domain. Login mostra o
 * input manual de tenant nesses casos.
 */
export function shouldPromptTenant() {
  const hostname = window.location.hostname
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true
  return isNonTenantHost(hostname)
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
