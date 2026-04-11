import type { IObservabilityPort } from '../types/IObservabilityPort';

/**
 * Instala PerformanceObserver para LCP e CLS automaticamente no bootstrap do módulo.
 * Fallback silencioso em ambientes que não suportam a API (Node, browsers antigos).
 *
 * @param observability - Implementação de IObservabilityPort para receber as métricas.
 */
export function initWebVitals(observability: IObservabilityPort): void {
  if (typeof PerformanceObserver === 'undefined') return;

  // ── LCP (Largest Contentful Paint) ────────────────────────────────────────
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (!entries.length) return;
      const last = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      observability.captureVitals({ name: 'LCP', value: Math.round(last.startTime), unit: 'ms' });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (_) {
    // Navegador não suporta LCP observer — silencioso
  }

  // ── CLS (Cumulative Layout Shift) ─────────────────────────────────────────
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const ls = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!ls.hadRecentInput && typeof ls.value === 'number') {
          clsValue += ls.value;
        }
      }
      observability.captureVitals({
        name: 'CLS',
        value: parseFloat(clsValue.toFixed(4)),
        unit: 'score',
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (_) {
    // Navegador não suporta CLS observer — silencioso
  }
}
