import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UnidadeMaterialRef, UnidadeMaterialValue } from './IUnidadeMaterialViewModel'

/**
 * Slice para o estado do UnidadeMaterialForm.
 *
 * Estrutura parametrizada por tarefaId:
 *   state.unidadeMaterial.byTarefa[tarefaId] = { material, quantidade, unidade }
 *
 * Chave '__default__' armazena o estado quando nenhum tarefaId eh fornecido.
 */

const DEFAULT_KEY = '__default__'

export interface UnidadeMaterialSliceState {
  byTarefa: Record<string, UnidadeMaterialValue>
}

const emptyValue: UnidadeMaterialValue = {
  material: null,
  quantidade: '',
  unidade: null,
}

const initialState: UnidadeMaterialSliceState = {
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
  state: UnidadeMaterialSliceState,
  key: string
): UnidadeMaterialValue => {
  if (!state.byTarefa[key]) {
    state.byTarefa[key] = { ...emptyValue }
  }
  return state.byTarefa[key]
}

const unidadeMaterialSlice = createSlice({
  name: 'unidadeMaterialVm',
  initialState,
  reducers: {
    setMaterial(
      state,
      action: PayloadAction<ByTarefaPayload<UnidadeMaterialRef | null>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      ensure(state, key).material = action.payload.value
    },
    setQuantidade(
      state,
      action: PayloadAction<ByTarefaPayload<string | number>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      ensure(state, key).quantidade = action.payload.value
    },
    setUnidade(
      state,
      action: PayloadAction<ByTarefaPayload<UnidadeMaterialRef | null>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      ensure(state, key).unidade = action.payload.value
    },
    populate(
      state,
      action: PayloadAction<ByTarefaPayload<UnidadeMaterialValue>>
    ) {
      const key = keyOf(action.payload.tarefaId)
      state.byTarefa[key] = { ...emptyValue, ...action.payload.value }
    },
    clearUnidadeMaterial(
      state,
      action: PayloadAction<{ tarefaId?: string | number }>
    ) {
      const key = keyOf(action.payload?.tarefaId)
      state.byTarefa[key] = { ...emptyValue }
    },
  },
})

export const {
  setMaterial,
  setQuantidade,
  setUnidade,
  populate: populateUnidadeMaterial,
  clearUnidadeMaterial,
} = unidadeMaterialSlice.actions

export const selectUnidadeMaterial = (
  state: any,
  tarefaId?: string | number
): UnidadeMaterialValue => {
  const key = keyOf(tarefaId)
  const slice: UnidadeMaterialSliceState | undefined =
    state?.unidadeMaterialVm ?? state?.unidadeMaterial
  return slice?.byTarefa?.[key] ?? emptyValue
}

export default unidadeMaterialSlice.reducer
export { DEFAULT_KEY as UNIDADE_MATERIAL_DEFAULT_KEY }
