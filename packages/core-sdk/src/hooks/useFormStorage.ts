import { useState, useCallback, useEffect } from 'react'

/**
 * Hook for persisting form state in localStorage.
 * Replaces the duplicated useFormStorage/usePersistedState in SGM/SGP.
 */
export function useFormStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const storageKey = `teraprox_form_${key}`

  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
    } catch { /* quota exceeded — silent fail */ }
  }, [value, storageKey])

  const clear = useCallback(() => {
    localStorage.removeItem(storageKey)
    setValue(initialValue)
  }, [storageKey, initialValue])

  return [value, setValue, clear]
}
