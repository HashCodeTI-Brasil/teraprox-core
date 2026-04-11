import { useState, useCallback, useRef } from 'react'
import { useCoreService } from './useCoreService'
import type { HttpController } from '../types/HttpController'

interface FetchDataReturn<T = any> {
  data: T | null
  loading: boolean
  error: Error | null
  fetchData: (context: string, path: string, endpoint?: string) => Promise<T>
  reset: () => void
}

/**
 * Generic hook for data fetching via HttpController.
 * Replaces the duplicated useFetchData in SGM/SGP.
 */
export function useFetchData<T = any>(): FetchDataReturn<T> {
  const { createController } = useCoreService()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const activeRef = useRef(true)

  const fetchData = useCallback(
    async (context: string, path: string, endpoint?: string): Promise<T> => {
      const controller: HttpController = createController(context, endpoint)
      setLoading(true)
      setError(null)
      try {
        const result = await controller.get(path)
        if (activeRef.current) setData(result)
        return result
      } catch (err: any) {
        if (activeRef.current) setError(err)
        throw err
      } finally {
        if (activeRef.current) setLoading(false)
      }
    },
    [createController]
  )

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  return { data, loading, error, fetchData, reset }
}
