import type { HttpController } from '../types/HttpController';
import { generateTraceId, generateSpanId, buildTraceparent } from '../utils/tracing';

/**
 * Decorator de HTTP que implementa Distributed Tracing via W3C TraceContext.
 *
 * - Gera um `trace-id` único por instância (cobre todos os spans de um contexto/controller).
 * - Gera um `span-id` único por requisição HTTP.
 * - Injeta o header `traceparent` em todas as chamadas: GET, POST, PUT, PATCH, DELETE, etc.
 * - Mesclado com quaisquer `extraHeaders` já presentes na chamada.
 *
 * Uso via CoreServiceBuilder:
 * ```ts
 * new CoreServiceBuilder()
 *   .withHttpEndpoint(process.env.REACT_APP_END_POINT)
 *   .withTracing()
 *   .build()
 * ```
 */
export class TracingHttpAdapter implements HttpController {
  /** Identificador único desta cadeia de spans — compartilhado por todas as reqs do controller. */
  private readonly traceId: string;

  constructor(private readonly endpoint: string, private readonly extraHeaders?: Record<string, string>) {
    this.traceId = generateTraceId();
  }

  private mergeHeaders(extraHeaders?: Record<string, string>, withContentType = false): Record<string, string> {
    const spanId = generateSpanId();
    const headers: Record<string, string> = {
      traceparent: buildTraceparent(this.traceId, spanId),
      ...this.extraHeaders,
      ...extraHeaders,
    };
    if (withContentType && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  private async request(
    method: string,
    extraPath: string,
    data?: any,
    extraHeaders?: Record<string, string>,
  ): Promise<any> {
    const url = extraPath ? `${this.endpoint}/${extraPath}` : this.endpoint;
    const isFormData = data instanceof FormData;
    const headers = this.mergeHeaders(extraHeaders, data !== undefined && !isFormData);

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: data !== undefined
          ? (isFormData ? data : JSON.stringify(data))
          : undefined,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`[TracingHttpAdapter] Falha ao fazer ${method} para ${url}:`, e);
      return [];
    }
  }

  get(path?: string)                                                                        { return this.request('GET',    path  || '')                          }
  post(path?: string, data?: any, extraHeaders?: Record<string, string>)                   { return this.request('POST',   path  || '', data, extraHeaders)      }
  put(path?: string, data?: any, extraHeaders?: Record<string, string>)                    { return this.request('PUT',    path  || '', data, extraHeaders)      }
  patch(path?: string, data?: any, extraHeaders?: Record<string, string>)                  { return this.request('PATCH',  path  || '', data, extraHeaders)      }
  delete(path?: string, id?: string | number, extraHeaders?: Record<string, string>)       { return this.request('DELETE', `${path || ''}/${id}`, undefined, extraHeaders) }
  deleteSimple(path?: string, extraHeaders?: Record<string, string>)                       { return this.request('DELETE', path  || '', undefined, extraHeaders) }
  save(path?: string, data?: any, extraHeaders?: Record<string, string>)                   { return this.request('POST',   path  || '', data, extraHeaders)      }
  read(path?: string, id?: string | number, extraHeaders?: Record<string, string>)         { return this.request('GET',    `${path || ''}/${id}`, undefined, extraHeaders) }
  readAll(path?: string, extraHeaders?: Record<string, string>)                            { return this.request('GET',    path  || '', undefined, extraHeaders) }
  readAllwithPage(path?: string)                                                            { return this.request('GET',    path  || '')                          }
  bulkDelete(path?: string, ids?: (string | number)[], extraHeaders?: Record<string, string>) {
    return this.request('DELETE', path || '', ids, extraHeaders);
  }
}
