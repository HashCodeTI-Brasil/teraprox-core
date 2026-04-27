import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {
  RecorrenciaEscala,
  RecorrenciaValue,
} from './IRecorrenciaViewModel'

/**
 * Slice autonomo para Recorrencia (core-sdk, cross-domain).
 *
 * Parametrizado por entityId — mesmo padrao dos demais slices
 * (unidadeMaterialSlice, inspecaoModalSlice).
 * Chave '__default__' armazena o estado quando nenhum entityId eh fornecido.
 *
 * Shape alinhado ao backend `api-manutencao/recorrencia`:
 *   { id?, valor, escala, dataInicio }
 *
 * `value === null` = estado "sem recorrencia" (entidade ausente).
 */

const DEFAULT_KEY = '__default__'

export interface RecorrenciaSliceState {
  byEntity: Record<string, RecorrenciaValue | null>
}

const initialState: RecorrenciaSliceState = {
  byEntity: {},
}

interface ByEntityPayload<T> {
  entityId?: string | number
  value: T
}

const keyOf = (entityId?: string | number): string =>
  entityId === undefined || entityId === null || entityId === ''
    ? DEFAULT_KEY
    : String(entityId)

const ensureSlot = (
  state: RecorrenciaSliceState,
  key: string
): RecorrenciaValue => {
  const existing = state.byEntity[key]
  if (!existing) {
    // dataInicio fica undefined — o componente UI (FrequenciaFormV2) decide se
    // preenche com today() quando `showDataInicio` esta ativo. Dominios sem
    // agendamento temporal (caderno/planoDeControle) mantem undefined.
    const fresh: RecorrenciaValue = {
      valor: 1,
      escala: 'day',
      dataInicio: undefined,
    }
    state.byEntity[key] = fresh
    return fresh
  }
  return existing
}

const recorrenciaSlice = createSlice({
  name: 'recorrenciaVm',
  initialState,
  reducers: {
    setValor(state, action: PayloadAction<ByEntityPayload<number>>) {
      const key = keyOf(action.payload.entityId)
      ensureSlot(state, key).valor = action.payload.value
    },
    setEscala(
      state,
      action: PayloadAction<ByEntityPayload<RecorrenciaEscala>>
    ) {
      const key = keyOf(action.payload.entityId)
      ensureSlot(state, key).escala = action.payload.value
    },
    setDataInicio(
      state,
      action: PayloadAction<ByEntityPayload<string | undefined | null>>
    ) {
      const key = keyOf(action.payload.entityId)
      const next = action.payload.value
      ensureSlot(state, key).dataInicio =
        next === null || next === undefined || next === '' ? undefined : next
    },
    populate(
      state,
      action: PayloadAction<ByEntityPayload<RecorrenciaValue | null>>
    ) {
      const key = keyOf(action.payload.entityId)
      state.byEntity[key] = action.payload.value
        ? { ...action.payload.value }
        : null
    },
    clearRecorrencia(
      state,
      action: PayloadAction<{ entityId?: string | number }>
    ) {
      const key = keyOf(action.payload?.entityId)
      state.byEntity[key] = null
    },
  },
})

export const {
  setValor: setRecorrenciaValor,
  setEscala: setRecorrenciaEscala,
  setDataInicio: setRecorrenciaDataInicio,
  populate: populateRecorrencia,
  clearRecorrencia,
} = recorrenciaSlice.actions

export const selectRecorrencia = (
  state: any,
  entityId?: string | number
): RecorrenciaValue | null => {
  const key = keyOf(entityId)
  const slice: RecorrenciaSliceState | undefined =
    state?.recorrenciaVm ?? state?.recorrencia
  const slot = slice?.byEntity?.[key]
  return slot === undefined ? null : slot
}

export default recorrenciaSlice.reducer
export { DEFAULT_KEY as RECORRENCIA_DEFAULT_KEY }
