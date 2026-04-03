import { useContext } from 'react'
import { CoreServiceContext } from '../context/CoreServiceContext'
import type { CoreService } from '../types/CoreService'

export function useCoreService(): CoreService {
  const ctx = useContext(CoreServiceContext)
  if (!ctx) {
    throw new Error(
      'useCoreService must be used within a CoreServiceProvider. ' +
      'Are you running outside Core (standalone mode)?'
    )
  }
  return ctx
}
