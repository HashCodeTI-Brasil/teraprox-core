import { useState, useCallback } from 'react'
import { useCoreService } from './useCoreService'
import type { HttpController } from '../types/HttpController'

interface PostDataReturn<T = any> {
  result: T | null
  loading: boolean
  error: Error | null
  postData: (context: string, path: string, data: any, endpoint?: string) => Promise<T>
}

/**
 * Generic hook for POST/PUT via HttpController.
 * Replaces the duplicated usePostData in SGM/SGP.
 */
export function usePostData<T = any>(): PostDataReturn<T> {
  const { createController } = useCoreService()
  const [result, setResult] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const postData = useCallback(
    async (context: string, path: string, payload: any, endpoint?: string): Promise<T> => {
      const controller: HttpController = createController(context, endpoint)
      setLoading(true)
      setError(null)
      try {
        const res = await controller.post(path, payload)
        setResult(res)
        return res
      } catch (err: any) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [createController]
  )

  return { result, loading, error, postData }
}
