import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ContadorValue, LimiteDeControle } from './IContadorViewModel'

/**
 * Slice autonomo para Contador (core-sdk, cross-domain).
 *
 * Parametrizado por entityId — mesmo padrao de recorrenciaSlice /
 * unidadeMaterialSlice / inspecaoModalSlice.
 * Chave '__default__' armazena o estado quando nenhum entityId eh fornecido.
 *
 * `entityId` eh generico: no SGM-OS eh o id da tarefa/OS; no SGP-caderno
 * pode ser o id do campo de verificacao.
 */

const DEFAULT_KEY = '__default__'

export interface ContadorSliceState {
  byEntity: Record<string, ContadorValue>
}

const emptyValue: ContadorValue = {
  valor: null,
  unidade: null,
  parametro: null,
  limitesDeControle: [],
}

const initialState: ContadorSliceState = {
  byEntity: {},
}

interface ByEntityPayload<T> {
  entityId?: string | number
  value: T
}

interface ByEntityIndexedPayload<T> {
  entityId?: string | number
  index: number
  value: T
}

const keyOf = (entityId?: string | number): string =>
  entityId === undefined || entityId === null || entityId === ''
    ? DEFAULT_KEY
    : String(entityId)

const ensure = (state: ContadorSliceState, key: string): ContadorValue => {
  if (!state.byEntity[key]) {
    state.byEntity[key] = { ...emptyValue, limitesDeControle: [] }
  }
  return state.byEntity[key]
}

const contadorSlice = createSlice({
  name: 'contadorVm',
  initialState,
  reducers: {
    setValor(
      state,
      action: PayloadAction<ByEntityPayload<number | null>>
    ) {
      ensure(state, keyOf(action.payload.entityId)).valor =
        action.payload.value
    },
    setUnidade(state, action: PayloadAction<ByEntityPayload<string>>) {
      ensure(state, keyOf(action.payload.entityId)).unidade =
        action.payload.value
    },
    setParametro(state, action: PayloadAction<ByEntityPayload<string>>) {
      ensure(state, keyOf(action.payload.entityId)).parametro =
        action.payload.value
    },
    addLimite(
      state,
      action: PayloadAction<ByEntityPayload<LimiteDeControle>>
    ) {
      const slot = ensure(state, keyOf(action.payload.entityId))
      slot.limitesDeControle = [
        ...(slot.limitesDeControle ?? []),
        action.payload.value,
      ]
    },
    removeLimiteAt(
      state,
      action: PayloadAction<{ entityId?: string | number; index: number }>
    ) {
      const slot = ensure(state, keyOf(action.payload.entityId))
      const list = slot.limitesDeControle ?? []
      slot.limitesDeControle = list.filter(
        (_, i) => i !== action.payload.index
      )
    },
    updateLimiteAt(
      state,
      action: PayloadAction<ByEntityIndexedPayload<LimiteDeControle>>
    ) {
      const slot = ensure(state, keyOf(action.payload.entityId))
      const list = [...(slot.limitesDeControle ?? [])]
      if (action.payload.index >= 0 && action.payload.index < list.length) {
        list[action.payload.index] = action.payload.value
        slot.limitesDeControle = list
      }
    },
    populate(state, action: PayloadAction<ByEntityPayload<ContadorValue>>) {
      const key = keyOf(action.payload.entityId)
      const v = action.payload.value ?? emptyValue
      state.byEntity[key] = {
        ...emptyValue,
        ...v,
        limitesDeControle: Array.isArray(v.limitesDeControle)
          ? [...v.limitesDeControle]
          : [],
      }
    },
    clearContador(
      state,
      action: PayloadAction<{ entityId?: string | number }>
    ) {
      const key = keyOf(action.payload?.entityId)
      state.byEntity[key] = { ...emptyValue, limitesDeControle: [] }
    },
  },
})

export const {
  setValor: setContadorValor,
  setUnidade: setContadorUnidade,
  setParametro: setContadorParametro,
  addLimite: addContadorLimite,
  removeLimiteAt: removeContadorLimiteAt,
  updateLimiteAt: updateContadorLimiteAt,
  populate: populateContador,
  clearContador,
} = contadorSlice.actions

export const selectContador = (
  state: any,
  entityId?: string | number
): ContadorValue => {
  const key = keyOf(entityId)
  const slice: ContadorSliceState | undefined =
    state?.contadorVm ?? state?.contador
  return (
    slice?.byEntity?.[key] ?? {
      ...emptyValue,
      limitesDeControle: [],
    }
  )
}

export default contadorSlice.reducer
export { DEFAULT_KEY as CONTADOR_DEFAULT_KEY }
