import { useContext } from 'react'
import { CoreServiceContext } from '../context/CoreServiceContext'
import type { CoreService } from '../types/CoreService'
import { NullCoreService } from '../adapters/null/NullObjectAdapters'

export function useCoreService(): CoreService {
  const ctx = useContext(CoreServiceContext)
  
  if (!ctx) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[useCoreService] rodando sem Provider. O SDK ativou os Fallbacks (Null Object Pattern).'
      )
    }
    return NullCoreService
  }
  
  return ctx
}
