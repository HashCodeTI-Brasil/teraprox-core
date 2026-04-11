import { useState, useCallback } from 'react'
import { useToast } from './useToast'

type ValidationRule<T> = {
  field: keyof T
  message: string
  validate: (value: any, form: T) => boolean
}

interface ValidationReturn<T> {
  errors: Partial<Record<keyof T, string>>
  validate: (form: T) => boolean
  clearErrors: () => void
  setFieldError: (field: keyof T, message: string) => void
}

/**
 * Hook for form validation with automatic toast on first error.
 * Replaces the duplicated useValidationHook in SGM/SGP.
 */
export function useValidation<T = any>(rules: ValidationRule<T>[]): ValidationReturn<T> {
  const toast = useToast()
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const validate = useCallback(
    (form: T): boolean => {
      const newErrors: Partial<Record<keyof T, string>> = {}
      let valid = true

      for (const rule of rules) {
        if (!rule.validate(form[rule.field], form)) {
          newErrors[rule.field] = rule.message
          valid = false
        }
      }

      setErrors(newErrors)

      if (!valid) {
        const firstError = Object.values(newErrors)[0] as string
        toast.warning(firstError)
      }

      return valid
    },
    [rules, toast]
  )

  const clearErrors = useCallback(() => setErrors({}), [])
  const setFieldError = useCallback(
    (field: keyof T, message: string) =>
      setErrors((prev) => ({ ...prev, [field]: message })),
    []
  )

  return { errors, validate, clearErrors, setFieldError }
}
