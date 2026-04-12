import type { ToastService } from '../../types/Toast'
import type { HttpController } from '../../types/HttpController'
import type { CoreService } from '../../types/CoreService'
import { NullObservabilityAdapter } from './NullObservabilityAdapter'

export class NullToastService implements ToastService {
  success(message: string): void {
    console.log(`[Toast Fallback] SUCCESS: ${message}`)
  }
  warning(message: string): void {
    console.warn(`[Toast Fallback] WARNING: ${message}`)
  }
  error(message: string): void {
    console.error(`[Toast Fallback] ERROR: ${message}`)
  }
  info(message: string): void {
    console.info(`[Toast Fallback] INFO: ${message}`)
  }
}

export class NullHttpController implements HttpController {
  private logAndResolve(method: string, path?: string, context?: string): Promise<any[]> {
    console.warn(`[Http Fallback] MOCK ${method} requisitado para ${path} (Contexto: ${context})`)
    
    return Promise.resolve([]) // Retorna array vazio genérico para não quebrar maps
  }

  get(path?: string) { return this.logAndResolve('GET', path, (this as any).context) }
  post(path?: string) { return this.logAndResolve('POST', path, (this as any).context) }
  put(path?: string) { return this.logAndResolve('PUT', path, (this as any).context) }
  patch(path?: string) { return this.logAndResolve('PATCH', path, (this as any).context) }
  delete(path?: string, id?: string | number) { return this.logAndResolve('DELETE', `${path}/${id}`, (this as any).context) }
  deleteSimple(path?: string) { return this.logAndResolve('DELETE', path, (this as any).context) }
  save(path?: string) { return this.logAndResolve('SAVE', path, (this as any).context) }
  read(path?: string, id?: string | number) { return this.logAndResolve('READ', `${path}/${id}`, (this as any).context) }
  readAll(path?: string) { return this.logAndResolve('READ_ALL', path, (this as any).context) }
  readAllwithPage(path?: string) { return this.logAndResolve('READ_ALL_PAGE', path, (this as any).context) }
  bulkDelete(path?: string) { return this.logAndResolve('BULK_DELETE', path, (this as any).context) }
}

export const NullCoreService: CoreService = {
  toast: new NullToastService(),
  createController: (context: string) => {
    console.warn(`[CoreService Fallback] createController chamado para "${context}" sem Adapter. Usando NullHttpController.`)
    const controller = new NullHttpController();
    (controller as any).context = context;
    return controller;
  },
  subscribe: (mo) => console.log(`[CoreService Fallback] Inscrição simulada RTDB: ${mo.context}`),
  unsubscribe: (mo) => console.log(`[CoreService Fallback] Desinscrição simulada RTDB: ${mo.context}`),
  subscribeEvent: (evt) => console.log(`[CoreService Fallback] Inscrição Evento: ${evt}`),
  unsubscribeEvent: (evt) => console.log(`[CoreService Fallback] Desinscrição Evento: ${evt}`),
  handleLogout: () => console.log(`[CoreService Fallback] Realizando logout...`),
  hostedByCore: false,
  rateLimits: {},
  observability: new NullObservabilityAdapter(),
}
