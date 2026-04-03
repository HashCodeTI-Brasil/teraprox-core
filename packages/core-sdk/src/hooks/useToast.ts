import { useCoreService } from './useCoreService'
import type { ToastService } from '../types/Toast'

export function useToast(): ToastService {
  return useCoreService().toast
}
