import { useCoreService } from './useCoreService'
import type { IObservabilityPort } from '../types/IObservabilityPort'

/**
 * Atalho para acessar o Port de observabilidade via React context.
 * Retorna a implementação real (quando fornecida pelo host) ou o NullObservabilityAdapter.
 *
 * @example
 * const obs = useObservability()
 * obs.logBreadcrumb({ category: 'action', message: 'Solicitação aprovada', data: { id } })
 */
export function useObservability(): IObservabilityPort {
  return useCoreService().observability
}
