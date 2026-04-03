import { useMemo } from 'react'
import { useCoreService } from './useCoreService'
import type { HttpController } from '../types/HttpController'

export function useHttpController(context: string, baseEndPoint?: string): HttpController {
  const { createController } = useCoreService()
  return useMemo(
    () => createController(context, baseEndPoint),
    [createController, context, baseEndPoint]
  )
}
