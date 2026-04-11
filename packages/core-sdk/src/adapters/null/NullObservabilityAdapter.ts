import type { IObservabilityPort } from '../../types/IObservabilityPort';
import type { VitalsPayload, BreadcrumbPayload, InteractionPayload } from '../../types/IObservabilityPort';

/**
 * Null Object Pattern — implementação fallback de `IObservabilityPort`.
 * Apenas loga no console; substitua pela implementação real (Datadog/Sentry/Grafana)
 * via `CoreServiceBuilder.withObservability()` no host.
 */
export class NullObservabilityAdapter implements IObservabilityPort {
  trackInteraction(payload: InteractionPayload): void {
    console.info(`[Observability] INTERACTION: ${payload.name}`, payload.properties ?? {});
  }

  captureVitals(payload: VitalsPayload): void {
    const unit = payload.unit ?? '';
    console.info(`[Observability] VITAL: ${payload.name} = ${payload.value}${unit}`, payload.meta ?? {});
  }

  logBreadcrumb(payload: BreadcrumbPayload): void {
    console.info(`[Observability] BREADCRUMB [${payload.category}]: ${payload.message}`, payload.data ?? {});
  }
}
