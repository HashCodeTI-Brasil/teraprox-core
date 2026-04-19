import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type {
  IInspecaoModalViewModel,
  InspecaoValidationResult,
  InspecaoValue,
  LimiteDeControle,
} from './IInspecaoModalViewModel'
import {
  clearInspecaoModal,
  populateInspecaoModal,
  removeInspecaoLimiteAt,
  selectInspecaoModal,
  setInspecaoLimites,
  setInspecaoNomeParametro,
  setInspecaoParametro,
  setInspecaoTipo,
  setInspecaoUnidadeParametro,
} from './inspecaoModalSlice'

const TIPO_NUMERICO = 'Numerico'
const TIPO_NUMERICO_ACENTUADO = 'Numérico'
const TIPO_BOOLEAN = 'Verdadeiro ou Falso'

/** Normaliza o tipo para comparação tolerando acento/caixa. */
function isNumericoTipo(tipo?: string): boolean {
  if (!tipo) return false
  const normalized = tipo.trim()
  return (
    normalized === TIPO_NUMERICO ||
    normalized === TIPO_NUMERICO_ACENTUADO ||
    normalized.toLowerCase() === 'numerico' ||
    normalized.toLowerCase() === 'numérico'
  )
}

function runValidate(value: InspecaoValue): InspecaoValidationResult {
  const errors: Record<string, string> = {}

  if (!value?.tipo || String(value.tipo).trim() === '') {
    errors.tipo = 'O tipo de dado é obrigatório.'
  }

  if (isNumericoTipo(value?.tipo)) {
    const ativos = (value?.limitesDeControle ?? []).filter(
      (l) => l && l.removed !== true
    )
    if (ativos.length === 0) {
      errors.limitesDeControle =
        'Adicione ao menos um limite de controle para parâmetros numéricos.'
    }
  }

  return { ok: Object.keys(errors).length === 0, errors }
}

/**
 * Adapter Redux que implementa IInspecaoModalViewModel.
 *
 * Le de state.inspecaoModalVm (slice proprio — inspecaoModalSlice.ts).
 * isSubmitting vive em useState local (estado transiente do modal).
 */
export function useInspecaoModalViewModel(
  tarefaId?: string | number
): IInspecaoModalViewModel {
  const dispatch = useDispatch()

  const value = useSelector((state: any) =>
    selectInspecaoModal(state, tarefaId)
  ) as InspecaoValue

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onTipoDeDado = useCallback(
    (tipo: string) => {
      dispatch(setInspecaoTipo({ tarefaId, value: tipo }))
    },
    [dispatch, tarefaId]
  )

  const onNomeParametro = useCallback(
    (nome: string) => {
      dispatch(setInspecaoNomeParametro({ tarefaId, value: nome }))
    },
    [dispatch, tarefaId]
  )

  const onParametroSelected = useCallback(
    (parametro: any) => {
      dispatch(setInspecaoParametro({ tarefaId, value: parametro }))
    },
    [dispatch, tarefaId]
  )

  const onUnidadeParametro = useCallback(
    (unidade: string) => {
      dispatch(setInspecaoUnidadeParametro({ tarefaId, value: unidade }))
    },
    [dispatch, tarefaId]
  )

  const onLimitesChange = useCallback(
    (limites: LimiteDeControle[]) => {
      dispatch(setInspecaoLimites({ tarefaId, value: limites }))
    },
    [dispatch, tarefaId]
  )

  const removeLimite = useCallback(
    (idx: number) => {
      dispatch(removeInspecaoLimiteAt({ tarefaId, idx }))
    },
    [dispatch, tarefaId]
  )

  const editLimite = useCallback((_limite: LimiteDeControle) => {
    // Noop no adapter Redux — a UI controla o modo de edicao localmente.
    // Existe na Port para que a UI nao precise conhecer esse detalhe.
  }, [])

  const validate = useCallback((): InspecaoValidationResult => {
    return runValidate(value)
  }, [value])

  const reset = useCallback(() => {
    dispatch(clearInspecaoModal({ tarefaId }))
  }, [dispatch, tarefaId])

  const populateFromExisting = useCallback(
    (inspecao: InspecaoValue) => {
      dispatch(populateInspecaoModal({ tarefaId, value: inspecao }))
    },
    [dispatch, tarefaId]
  )

  const submit = useCallback(async (): Promise<InspecaoValue> => {
    setIsSubmitting(true)
    try {
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

  return useMemo<IInspecaoModalViewModel>(
    () => ({
      value,
      isValid,
      isSubmitting,
      onTipoDeDado,
      onNomeParametro,
      onParametroSelected,
      onUnidadeParametro,
      onLimitesChange,
      removeLimite,
      editLimite,
      validate,
      submit,
      reset,
      populateFromExisting,
    }),
    [
      value,
      isValid,
      isSubmitting,
      onTipoDeDado,
      onNomeParametro,
      onParametroSelected,
      onUnidadeParametro,
      onLimitesChange,
      removeLimite,
      editLimite,
      validate,
      submit,
      reset,
      populateFromExisting,
    ]
  )
}
