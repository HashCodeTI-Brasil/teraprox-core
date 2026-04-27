import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type {
  ContadorValidationResult,
  ContadorValue,
  IContadorViewModel,
  LimiteDeControle,
} from './IContadorViewModel'
import {
  addContadorLimite,
  clearContador,
  populateContador,
  removeContadorLimiteAt,
  selectContador,
  setContadorParametro,
  setContadorUnidade,
  setContadorValor,
  updateContadorLimiteAt,
} from './contadorSlice'

function runValidate(value: ContadorValue): ContadorValidationResult {
  const errors: Record<string, string> = {}

  if (value?.valor !== null && value?.valor !== undefined) {
    if (!Number.isFinite(Number(value.valor))) {
      errors.valor = 'O valor deve ser um número finito.'
    }
  }

  if (
    value?.valor !== null &&
    value?.valor !== undefined &&
    (!value.unidade || String(value.unidade).trim() === '')
  ) {
    errors.unidade = 'Informe a unidade de medida.'
  }

  const limites = value?.limitesDeControle ?? []
  limites.forEach((l, idx) => {
    if (!l?.nome || String(l.nome).trim() === '') {
      errors[`limitesDeControle[${idx}].nome`] =
        'Nome do limite é obrigatório.'
    }
    if (!l?.boundRule) {
      errors[`limitesDeControle[${idx}].boundRule`] =
        'Regra de comparação é obrigatória.'
    }
    const v = Number(l?.valor)
    if (!Number.isFinite(v)) {
      errors[`limitesDeControle[${idx}].valor`] =
        'Valor do limite deve ser numérico.'
    }
  })

  return { ok: Object.keys(errors).length === 0, errors }
}

/**
 * Adapter Redux que implementa IContadorViewModel.
 *
 * Estado lido do slice 'contadorVm' (ver contadorSlice.ts),
 * parametrizado por entityId para suportar multiplos contadores
 * simultaneos (ex.: varias tarefas com leitura propria).
 *
 * isSubmitting vive em useState local — estado transiente.
 */
export function useContadorViewModel(
  entityId?: string | number
): IContadorViewModel {
  const dispatch = useDispatch()

  const value = useSelector((state: any) =>
    selectContador(state, entityId)
  ) as ContadorValue

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onValorChange = useCallback(
    (v: number | null) => {
      dispatch(setContadorValor({ entityId, value: v }))
    },
    [dispatch, entityId]
  )

  const onUnidadeChange = useCallback(
    (u: string) => {
      dispatch(setContadorUnidade({ entityId, value: u }))
    },
    [dispatch, entityId]
  )

  const onParametroChange = useCallback(
    (p: string) => {
      dispatch(setContadorParametro({ entityId, value: p }))
    },
    [dispatch, entityId]
  )

  const onLimiteAdd = useCallback(
    (limite: LimiteDeControle) => {
      dispatch(addContadorLimite({ entityId, value: limite }))
    },
    [dispatch, entityId]
  )

  const onLimiteRemove = useCallback(
    (index: number) => {
      dispatch(removeContadorLimiteAt({ entityId, index }))
    },
    [dispatch, entityId]
  )

  const onLimiteUpdate = useCallback(
    (index: number, limite: LimiteDeControle) => {
      dispatch(updateContadorLimiteAt({ entityId, index, value: limite }))
    },
    [dispatch, entityId]
  )

  const validate = useCallback(
    (): ContadorValidationResult => runValidate(value),
    [value]
  )

  const reset = useCallback(() => {
    dispatch(clearContador({ entityId }))
  }, [dispatch, entityId])

  const populateFromExisting = useCallback(
    (next: ContadorValue) => {
      dispatch(populateContador({ entityId, value: next }))
    },
    [dispatch, entityId]
  )

  const submit = useCallback(async (): Promise<ContadorValue> => {
    setIsSubmitting(true)
    try {
      const result = runValidate(value)
      if (!result.ok) {
        const firstErr =
          Object.values(result.errors)[0] ?? 'Dados inválidos.'
        throw new Error(firstErr)
      }
      return value
    } finally {
      setIsSubmitting(false)
    }
  }, [value])

  const isValid = useMemo(() => runValidate(value).ok, [value])

  return useMemo<IContadorViewModel>(
    () => ({
      value,
      isValid,
      isSubmitting,
      onValorChange,
      onUnidadeChange,
      onParametroChange,
      onLimiteAdd,
      onLimiteRemove,
      onLimiteUpdate,
      validate,
      submit,
      reset,
      populateFromExisting,
    }),
    [
      value,
      isValid,
      isSubmitting,
      onValorChange,
      onUnidadeChange,
      onParametroChange,
      onLimiteAdd,
      onLimiteRemove,
      onLimiteUpdate,
      validate,
      submit,
      reset,
      populateFromExisting,
    ]
  )
}
