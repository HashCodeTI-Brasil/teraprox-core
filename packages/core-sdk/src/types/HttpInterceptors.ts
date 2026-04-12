/**
 * Interceptors that can be injected into FetchHttpAdapter.
 *
 * The core provides implementations (token injection, auto-toast, MO dispatch, etc.).
 * Standalone mode can use a subset or none at all.
 */
export interface HttpInterceptors {
  /**
   * Called before every request.
   * Use to inject dynamic headers (Authorization, tenant, etc.).
   * Return the final headers to use.
   */
  onBeforeRequest?(headers: Record<string, string>): Record<string, string> | Promise<Record<string, string>>

  /**
   * Called on successful HTTP response (2xx).
   * Receives raw status, headers, and parsed JSON body.
   * Return the value that callers will receive.
   */
  onResponse?(response: HttpResponseMeta, method: string): any

  /**
   * Called on HTTP error (non-2xx).
   * Can return a resolved value (swallow error), or throw/reject.
   * `retry` re-executes the original request (useful for 401 token refresh).
   */
  onError?(error: HttpErrorMeta, retry: () => Promise<any>): any
}

export interface HttpResponseMeta {
  status: number
  headers: Headers
  data: any
}

export interface HttpErrorMeta {
  status: number
  headers: Headers
  data: any
  message: string
}
