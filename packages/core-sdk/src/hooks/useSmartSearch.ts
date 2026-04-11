import { useState, useMemo, useCallback } from 'react'

interface SmartSearchReturn<T> {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filteredData: T[]
  clearSearch: () => void
}

/**
 * Hook for in-memory list search/filter.
 * Replaces the duplicated useSmartSearch in SGM/SGP.
 */
export function useSmartSearch<T = any>(
  data: T[],
  searchFields: (keyof T)[] | string[],
  options?: { caseSensitive?: boolean; minLength?: number }
): SmartSearchReturn<T> {
  const [searchTerm, setSearchTerm] = useState('')
  const { caseSensitive = false, minLength = 1 } = options || {}

  const filteredData = useMemo(() => {
    if (!searchTerm || searchTerm.length < minLength) return data
    const term = caseSensitive ? searchTerm : searchTerm.toLowerCase()

    return data.filter((item) =>
      (searchFields as string[]).some((field) => {
        const value = (item as any)?.[field]
        if (value == null) return false
        const str = String(value)
        return (caseSensitive ? str : str.toLowerCase()).includes(term)
      })
    )
  }, [data, searchTerm, searchFields, caseSensitive, minLength])

  const clearSearch = useCallback(() => setSearchTerm(''), [])

  return { searchTerm, setSearchTerm, filteredData, clearSearch }
}
