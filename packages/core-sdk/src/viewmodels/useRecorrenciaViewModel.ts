import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type {
  IRecorrenciaViewModel,
  RecorrenciaEscala,
  RecorrenciaValidationResult,
  RecorrenciaValue,
} from './IRecorrenciaViewModel'
import {
  clearRecorrencia,
  populateRecorrencia,
  selectRecorrencia,
  setRecorrenciaDataInicio,
  setRecorrenciaEscala,
  setRecorrenciaValor,
} from './recorrenciaSlice'

function runValidate(
  value: RecorrenciaValue | null
): RecorrenciaValidationResult {
  const errors: Record<string, string> = {}

  if (value === null) {
    // Estado "sem recorrencia" eh valido na UI (no-op); sinaliza invalido
    // porque a entidade ainda nao esta completa — o caller decide se a
    // ausencia eh aceitavel no contexto (XOR com dataPlanejada, etc.).
    errors._absent = 'Sem recorrencia definida.'
    return { ok: false, errors }
  }

  const valor = Number(value.valor)
  if (!Number.isFinite(valor) || valor < 1) {
    errors.valor = 'O valor da recorrencia deve ser >= 1.'
  }
  if (!value.escala) {
    errors.escala = 'A escala eh obrigatoria.'
  }
  // dataInicio NAO entra na validacao — e opcional no Port (dominios sem
  // agendamento temporal como caderno/planoDeControle nao preenchem).
  // Callers que exigem dataInicio devem validar em cima deste Port.

  return { ok: Object.keys(errors).length === 0, errors }
}

/**
 * Adapter Redux que implementa IRecorrenciaViewModel.
 *
 * Estado lido do slice 'recorrenciaVm' (ver recorrenciaSlice.ts),
 * parametrizado por entityId para suportar multiplas recorrencias
 * simultaneas.
 *
 * isSubmitting vive em useState local — estado transiente.
 */
export function useRecorrenciaViewModel(
  entityId?: string | number
): IRecorrenciaViewModel {
  const dispatch = useDispatch()

  const value = useSelector((state: any) =>
    selectRecorrencia(state, entityId)
  ) as RecorrenciaValue | null

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onValorChange = useCallback(
    (valor: number) => {
      dispatch(setRecorrenciaValor({ entityId, value: valor }))
    },
    [dispatch, entityId]
  )

  const onEscalaChange = useCallback(
    (escala: RecorrenciaEscala) => {
      dispatch(setRecorrenciaEscala({ entityId, value: escala }))
    },
    [dispatch, entityId]
  )

  const onDataInicioChange = useCallback(
    (dataInicio: string | undefined) => {
      dispatch(setRecorrenciaDataInicio({ entityId, value: dataInicio }))
    },
    [dispatch, entityId]
  )

  const clear = useCallback(() => {
    dispatch(clearRecorrencia({ entityId }))
  }, [dispatch, entityId])

  const populateFromExisting = useCallback(
    (next: RecorrenciaValue | null) => {
      dispatch(populateRecorrencia({ entityId, value: next }))
    },
    [dispatch, entityId]
  )

  const validate = useCallback(
    (): RecorrenciaValidationResult => runValidate(value),
    [value]
  )

  const submit = useCallback(async (): Promise<RecorrenciaValue | null> => {
    setIsSubmitting(true)
    try {
      if (value === null) return null
      const result = runValidate(value)
      if (!result.ok) {
        const firstErr = Object.values(result.errors)[0] ?? 'Dados invalidos.'
        throw new Error(firstErr)
      }
      return value
    } finally {
      setIsSubmitting(false)
    }
  }, [value])

  const isValid = useMemo(() => runValidate(value).ok, [value])

  return useMemo<IRecorrenciaViewModel>(
    () => ({
      value,
      isValid,
      isSubmitting,
      onValorChange,
      onEscalaChange,
      onDataInicioChange,
      clear,
      populateFromExisting,
      validate,
      submit,
      reset: clear,
    }),
    [
      value,
      isValid,
      isSubmitting,
      onValorChange,
      onEscalaChange,
      onDataInicioChange,
      clear,
      populateFromExisting,
      validate,
      submit,
    ]
  )
}
