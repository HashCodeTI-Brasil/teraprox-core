/**
 * Utilitários de Distributed Tracing seguindo a especificação W3C TraceContext.
 * https://www.w3.org/TR/trace-context/
 */

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Gera um trace-id de 128 bits (32 chars hex) conforme W3C TraceContext.
 * Usado uma vez por instância de adapter — identifica toda a cadeia de spans de um contexto.
 */
export function generateTraceId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return toHex(bytes);
}

/**
 * Gera um span-id de 64 bits (16 chars hex) conforme W3C TraceContext.
 * Chamado a cada requisição HTTP — identifica um span individual.
 */
export function generateSpanId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return toHex(bytes);
}

/**
 * Monta o header `traceparent` no formato W3C:
 * `{version}-{traceId}-{spanId}-{flags}`
 *
 * Flags: `01` = sampled (enviado ao coletor), `00` = não-amostrado.
 */
export function buildTraceparent(traceId: string, spanId: string, sampled = true): string {
  return `00-${traceId}-${spanId}-${sampled ? '01' : '00'}`;
}
