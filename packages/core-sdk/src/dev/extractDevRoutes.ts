import type { DevRoute } from './types'

interface RouteConfigEntry {
  configuration?: {
    path?: string
    [key: string]: any
  }
  [key: string]: any
}

interface ServiceRouteConfig {
  service?: string
  routes?: RouteConfigEntry[]
}

const SYSTEM_PATHS = new Set(['/', '/Login', '/login', '/errorScreen', '/acessoNaoPermitido'])

/**
 * Extracts DevRoute[] from the standard routesConfig format used by SGM/SGP.
 *
 * @example
 * import { routesConfig } from '../models/routesConfig'
 * const devRoutes = extractDevRoutes(routesConfig)
 */
export function extractDevRoutes(routesConfig: ServiceRouteConfig[]): DevRoute[] {
  const seen = new Set<string>()
  return routesConfig.flatMap(serviceConfig => {
    const category = capitalize(serviceConfig.service || 'Geral')
    return (serviceConfig.routes || [])
      .filter(route => {
        const path = route?.configuration?.path
        if (!path || SYSTEM_PATHS.has(path) || seen.has(path)) return false
        seen.add(path)
        return true
      })
      .map(route => ({
        label: pathToLabel(route.configuration!.path!),
        path: route.configuration!.path!,
        category,
      }))
  })
}

function pathToLabel(path: string): string {
  const name = path.replace(/^\//, '').split('/').pop() || path
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim()
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
