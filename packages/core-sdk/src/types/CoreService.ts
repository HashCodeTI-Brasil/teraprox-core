import type { HttpController } from './HttpController'
import type { ToastService } from './Toast'
import type { MatchingObjectSubscription } from './MatchingObject'

export interface CoreService {
  /** Cria um HttpController configurado para um contexto/endpoint */
  createController(context: string, baseEndPoint?: string): HttpController

  /** Serviço de toast/notificações */
  toast: ToastService

  /** Subscreve a um MatchingObject (real-time via Firebase RTDB) */
  subscribe(mo: MatchingObjectSubscription): void

  /** Remove subscrição de um MatchingObject */
  unsubscribe(mo: MatchingObjectSubscription): void

  /** Subscreve a eventos de MatchingObject via EventTarget */
  subscribeEvent(context: string, location: string, handler: EventListenerOrEventListenerObject): void

  /** Remove subscrição de evento de MatchingObject */
  unsubscribeEvent(context: string, location: string, handler: EventListenerOrEventListenerObject): void

  /** Encerra a sessão do usuário */
  handleLogout(): void

  /** Indica se o componente está hospedado pelo Core */
  hostedByCore: boolean
}
