import type { CoreService } from '../types/CoreService'
import type { ToastService } from '../types/Toast'
import type { HttpController } from '../types/HttpController'
import type { IObservabilityPort } from '../types/IObservabilityPort'
import type { MatchingObjectSubscription } from '../types/MatchingObject'
import type { HttpInterceptors } from '../types/HttpInterceptors'
import { NullCoreService, NullToastService, NullHttpController } from '../adapters/null/NullObjectAdapters'
import { NullObservabilityAdapter } from '../adapters/null/NullObservabilityAdapter'
import { TracingHttpAdapter } from '../adapters/TracingHttpAdapter'

export class FetchHttpAdapter implements HttpController {
  constructor(
    private endpoint: string,
    private extraHeaders?: Record<string, string>,
    private interceptors?: HttpInterceptors,
  ) {}

  private mergeHeaders(extraReqHeaders?: Record<string, string>, hasJsonBody?: boolean): Record<string, string> {
    return {
      ...this.extraHeaders,
      ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...extraReqHeaders,
    }
  }

  /** Join non-empty path segments, avoiding double slashes. */
  private joinPath(...parts: (string | number | null | undefined)[]): string {
    return parts.filter(p => p != null && p !== '').map(String).join('/')
  }

  private async request(method: string, extraPath: string, data?: any, extraHeaders?: Record<string, string>) {
    const url = extraPath ? `${this.endpoint}/${extraPath}` : this.endpoint
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData
    const body = data !== undefined ? (isFormData ? data : JSON.stringify(data)) : undefined

    const buildHeaders = async (): Promise<Record<string, string>> => {
      let h = this.mergeHeaders(extraHeaders, data !== undefined && !isFormData)
      if (this.interceptors?.onBeforeRequest) {
        h = await this.interceptors.onBeforeRequest(h)
      }
      return h
    }

    /** Same semantics as axios err.config._retry — at most one interceptor-driven retry per logical request. */
    let interceptorRetryConsumed = false

    const doFetch = async (): Promise<any> => {
      const headers = await buildHeaders()
      const res = await fetch(url, { method, headers, body })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        if (this.interceptors?.onError) {
          return this.interceptors.onError(
            { status: res.status, headers: res.headers, data: errorData, message: `HTTP ${res.status}` },
            async () => {
              if (interceptorRetryConsumed) {
                const e = new Error(`HTTP ${res.status} (retry limit)`)
                ;(e as any).status = res.status
                ;(e as any).data = errorData
                throw e
              }
              interceptorRetryConsumed = true
              return doFetch()
            },
          )
        }
        throw new Error(`HTTP ${res.status}`)
      }

      const responseData = await res.json().catch(() => ({}))

      if (this.interceptors?.onResponse) {
        return this.interceptors.onResponse(
          { status: res.status, headers: res.headers, data: responseData },
          method,
        )
      }
      return responseData
    }

    if (this.interceptors) {
      return await doFetch()
    }
    try {
      return await doFetch()
    } catch (e) {
      console.warn(`[FetchHttpAdapter] ${method} ${url}:`, e)
      return []
    }
  }

  private qs(query?: string): string { return query ? `?${query}` : '' }

  get(path?: string, query?: string) {
    return this.request('GET', `${this.joinPath(path)}${this.qs(query)}`)
  }
  post(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string) {
    return this.request('POST', `${this.joinPath(path)}${this.qs(query)}`, data, extraHeaders)
  }
  put(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string) {
    return this.request('PUT', `${this.joinPath(path)}${this.qs(query)}`, data, extraHeaders)
  }
  patch(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string) {
    return this.request('PATCH', `${this.joinPath(path)}${this.qs(query)}`, data, extraHeaders)
  }
  delete(path?: string, id?: string | number, extraHeaders?: Record<string, string>, query?: string) {
    return this.request('DELETE', `${this.joinPath(path, id)}${this.qs(query)}`, undefined, extraHeaders)
  }
  deleteSimple(path?: string, extraHeaders?: Record<string, string>, query?: string) {
    return this.request('DELETE', `${this.joinPath(path)}${this.qs(query)}`, undefined, extraHeaders)
  }
  save(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string) {
    if (data && (data.id || data._id)) {
      const id = data.id || data._id
      return this.request('PUT', `${this.joinPath(path, id)}${this.qs(query)}`, data, extraHeaders)
    }
    return this.request('POST', `${this.joinPath(path)}${this.qs(query)}`, data, extraHeaders)
  }
  read(path?: string, id?: string | number, extraHeaders?: Record<string, string>, query?: string) {
    return this.request('GET', `${this.joinPath(path, id)}${this.qs(query)}`, undefined, extraHeaders)
  }
  readAll(path?: string, extraHeaders?: Record<string, string>, query?: string) {
    return this.request('GET', `${this.joinPath(path)}${this.qs(query)}`, undefined, extraHeaders)
  }
  readAllwithPage(path?: string, page?: number, size?: number) {
    return this.request('GET', `${this.joinPath(path)}?page=${page}&size=${size}`)
  }
  bulkDelete(path?: string, ids?: (string | number)[], extraHeaders?: Record<string, string>, query?: string) {
    const bulkParam = ids ? `ids=${ids.join(',')}` : ''
    const fullQuery = query ? `${query}&${bulkParam}` : bulkParam
    return this.request('DELETE', `${this.joinPath(path)}?${fullQuery}`, undefined, extraHeaders)
  }
}

export class CoreServiceBuilder {
  private _toast: ToastService = new NullToastService()
  private _httpEndpoint?: string
  private _rtdbConfig?: any
  private _hostedByCore: boolean = false
  private _observability: IObservabilityPort = new NullObservabilityAdapter()
  private _tracing: boolean = false
  private _gatewayHost?: string
  private _fallbackControllers: Record<string, HttpController> = {}

  withToast(toast: ToastService) {
    this._toast = toast
    return this
  }

  withHttpEndpoint(url: string) {
    this._httpEndpoint = url
    return this
  }

  withGatewayHost(host: string) {
    this._gatewayHost = host
    return this
  }

  withFallbackController(context: string, controller: HttpController) {
    this._fallbackControllers[context] = controller
    return this
  }

  withRtdbConfig(config: any) {
    this._rtdbConfig = config
    return this
  }
  
  setHostedByCore(hosted: boolean) {
    this._hostedByCore = hosted;
    return this;
  }

  withObservability(observability: IObservabilityPort) {
    this._observability = observability
    return this
  }

  /**
   * Ativa Distributed Tracing W3C nos controllers HTTP.
   * Quando habilitado, `createController` retorna `TracingHttpAdapter` em vez de `FetchHttpAdapter`.
   * O header `traceparent` é injetado em todas as requisições automaticamente.
   */
  withTracing(enabled: boolean = true) {
    this._tracing = enabled
    return this
  }

  build(): CoreService {
    // Subscriptions are stored here so they survive re-renders and can be
    // tapped by a companion RtdbBridge component or tested directly.
    const subscriptions: MatchingObjectSubscription[] = []

    return {
      toast: this._toast,
      createController: (context: string, baseEndPoint?: string) => {
        // 1. Verifica se há um controller de fallback específico para desenvolvimento local ou injeção mockada
        if (this._fallbackControllers[context]) {
          return this._fallbackControllers[context];
        }

        const endpointStr = this._httpEndpoint ? (context ? `${this._httpEndpoint}/${context}` : this._httpEndpoint) : null;
        const endpoint = baseEndPoint ?? endpointStr;
        if (!endpoint) {
          console.warn(`[CoreServiceBuilder] HttpEndpoint nulo para "${context}". Usando NullHttpController.`)
          const controller = new NullHttpController();
          (controller as any).context = context;
          return controller;
        }

        // Recupera por injecao explicita (preferencial) ou por Variavel de Ambiente global do Client (React ou Vite), com fallback pro proprio contexto
        const _globalObject = typeof window !== 'undefined' ? window : globalThis;
        const globalProcess = (_globalObject as any).process || { env: {} };
        const envHost = globalProcess.env ? (globalProcess.env.REACT_APP_TERAPROX_GATEWAY_HOST || globalProcess.env.VITE_TERAPROX_GATEWAY_HOST) : undefined;
        const hostHeader = this._gatewayHost || envHost || context;
        
        const extraHeaders = { 'x-teraprox-host': hostHeader }

        return this._tracing
          ? new TracingHttpAdapter(endpoint, extraHeaders)
          : new FetchHttpAdapter(endpoint, extraHeaders)
      },

      // Subscriptions are properly managed so that:
      // 1. Components using useMatchingObject() have their registrations tracked.
      // 2. An external RtdbBridge / StandaloneProvider can dispatch to them.
      // 3. Tests can inspect which subscriptions are active.
      subscribe: (mo) => {
        subscriptions.push(mo)
      },
      unsubscribe: (mo) => {
        const idx = subscriptions.findIndex(
          (s) => s.context === mo.context && s.location === mo.location
        )
        if (idx >= 0) subscriptions.splice(idx, 1)
      },

      subscribeEvent: (_evt) => {},
      unsubscribeEvent: (_evt) => {},
      handleLogout: () => console.log('[CoreServiceBuilder] Logout invocado no Standalone mode'),
      hostedByCore: this._hostedByCore,
      observability: this._observability,
      rateLimits: {},
    }
  }
}
