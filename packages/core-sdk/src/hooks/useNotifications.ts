import { useSelector } from 'react-redux'
import type { NotificationState } from '../types/Notification'

/**
 * Hook read-only para estado de notificações do Redux (shared store).
 * Funciona tanto em modo federado quanto standalone pois react-redux é singleton.
 */
export function useNotifications(): NotificationState {
  return useSelector((state: any) => state.notification) as NotificationState
}
