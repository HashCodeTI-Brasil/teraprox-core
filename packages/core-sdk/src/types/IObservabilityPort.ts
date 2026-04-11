/**
 * Port de Observabilidade — contrato entre os Use Cases/Adapters e
 * qualquer implementação de RUM (Datadog, Sentry, Grafana, console…).
 */
export interface VitalsPayload {
  /** Nome da métrica Web Vital: 'LCP', 'CLS', 'FID', 'TTFB', etc. */
  name: string;
  /** Valor numérico da métrica */
  value: number;
  /** Unidade da métrica: 'ms', 'score', 'count', etc. */
  unit?: string;
  /** Metadados adicionais opcionais */
  meta?: Record<string, unknown>;
}

export interface BreadcrumbPayload {
  /** Categoria do breadcrumb: 'action', 'navigation', 'http', 'error', etc. */
  category: string;
  /** Mensagem legível descrevendo o evento */
  message: string;
  /** Dados estruturados adicionais */
  data?: Record<string, unknown>;
}

export interface InteractionPayload {
  /** Nome da interação (ex.: 'save-solicitacao', 'approve-ss', 'reject-ss') */
  name: string;
  /** Propriedades associadas à interação */
  properties?: Record<string, unknown>;
}

export interface IObservabilityPort {
  /**
   * Registra uma interação do usuário (clique, submit, navegação intencional).
   * Usado para rastrear fluxos de negócio e funis.
   */
  trackInteraction(payload: InteractionPayload): void;

  /**
   * Captura métricas de performance (Web Vitals: LCP, CLS, FID, TTFB).
   */
  captureVitals(payload: VitalsPayload): void;

  /**
   * Adiciona um breadcrumb ao trail de eventos para diagnóstico de erros.
   */
  logBreadcrumb(payload: BreadcrumbPayload): void;
}
