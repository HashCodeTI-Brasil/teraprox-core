import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {
  InspecaoValue,
  LimiteDeControle,
} from './IInspecaoModalViewModel'

/**
 * Slice autonomo para o modal de Inspecao (core-sdk).
 *
 * Parametrizado por tarefaId — mesmo padrao do unidadeMaterialSlice.
 * Chave '__default__' armazena o estado quando nenhum tarefaId eh fornecido.
 *
 * Nao depende do slice legado state.inspecao do SGM-OS — o caller
 * decide se quer espelhar (ou nao) de volta para o slice antigo.
 */

const DEFAULT_KEY = '__default__'

export interface InspecaoModalSliceState {
  byTarefa: Record<string, InspecaoValue>
}

const emptyValue: InspecaoValue = {
  tipo: '',
  nomeParametro: '',
  unidadeParametro: '',
  parametroId: '',
  limitesDeControle: [],
}

const initialState: InspecaoModalSliceState = {
  byTarefa: {},
}

interface ByTarefaPayload<T> {
  tarefaId?: string | number
  value: T
}

const keyOf = (tarefaId?: string | number): string =>
  tarefaId === undefined || tarefaId === null || tarefaId === ''
    ? DEFAULT_KEY
    : String(tarefaId)

const ensure = (
  state: InspecaoModalSliceState,
  key: string
): InspecaoValue => {
  if (!state.byTarefa[key]) {
    state.byTarefa[key] = { ...emptyValue, limitesDeControle: [] }
  }
  return state.byTarefa[key]
}

const inspecaoModalSlice = createSlice({
  name: 'inspecaoModalVm',
  initialState,
  reducers: {
    setTipo(state, action: PayloadAction<ByTarefaPayload<string>>) {
      const key = keyOf(action.payload.tarefaId)
      ensure(state, key).tipo = action.payload.value
    },
    setNomeParametro(
      state,
      action: PayloadAction<ByTarefaPayload<string>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      ensure(state, key).nomeParametro = action.payload.value
    },
    setUnidadeParametro(
      state,
      action: PayloadAction<ByTarefaPayload<string>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      ensure(state, key).unidadeParametro = action.payload.value
    },
    setParametro(
      state,
      action: PayloadAction<ByTarefaPayload<any>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      const slot = ensure(state, key)
      const p = action.payload.value ?? {}
      slot.nomeParametro = p.nome ?? p.nomeParametro ?? ''
      slot.unidadeParametro =
        p.labelUnidade ?? p.unidade ?? p.unidadeParametro ?? ''
      slot.parametroId = p.id ?? p.parametroId ?? ''
    },
    setLimites(
      state,
      action: PayloadAction<ByTarefaPayload<LimiteDeControle[]>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      ensure(state, key).limitesDeControle = action.payload.value ?? []
    },
    removeLimiteAt(
      state,
      action: PayloadAction<{ tarefaId?: string | number; idx: number }>
    ) {
      const key = keyOf(action.payload.tarefaId)
      const slot = ensure(state, key)
      const { idx } = action.payload
      if (slot.limitesDeControle?.[idx]) {
        slot.limitesDeControle[idx] = {
          ...slot.limitesDeControle[idx],
          removed: true,
        }
      }
    },
    populate(
      state,
      action: PayloadAction<ByTarefaPayload<InspecaoValue>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      state.byTarefa[key] = {
        ...emptyValue,
        ...action.payload.value,
        limitesDeControle: action.payload.value?.limitesDeControle ?? [],
      }
    },
    clearInspecaoModal(
      state,
      action: PayloadAction<{ tarefaId?: string | number }>
    ) {
      const key = keyOf(action.payload?.tarefaId)
      state.byTarefa[key] = { ...emptyValue, limitesDeControle: [] }
    },
  },
})

export const {
  setTipo: setInspecaoTipo,
  setNomeParametro: setInspecaoNomeParametro,
  setUnidadeParametro: setInspecaoUnidadeParametro,
  setParametro: setInspecaoParametro,
  setLimites: setInspecaoLimites,
  removeLimiteAt: removeInspecaoLimiteAt,
  populate: populateInspecaoModal,
  clearInspecaoModal,
} = inspecaoModalSlice.actions

export const selectInspecaoModal = (
  state: any,
  tarefaId?: string | number
): InspecaoValue => {
  const key = keyOf(tarefaId)
  const slice: InspecaoModalSliceState | undefined =
    state?.inspecaoModalVm ?? state?.inspecaoModal
  return (
    slice?.byTarefa?.[key] ?? { ...emptyValue, limitesDeControle: [] }
  )
}

export default inspecaoModalSlice.reducer
export { DEFAULT_KEY as INSPECAO_MODAL_DEFAULT_KEY }
