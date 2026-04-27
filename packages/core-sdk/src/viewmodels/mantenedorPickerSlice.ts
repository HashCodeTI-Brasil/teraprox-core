import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { MantenedorOption } from './IMantenedorPickerViewModel'

/**
 * Slice do MantenedorPicker (Wave 5B). Parametrizado por entityId
 * (tipicamente osId) — mesmo padrão dos demais slices hexagonais.
 */

export interface MantenedorPickerSlot {
  options: MantenedorOption[]
  searchTerm: string
  isLoading: boolean
  error: string | null
  pendingConfirm: MantenedorOption | null
}

export interface MantenedorPickerSliceState {
  byEntity: Record<string, MantenedorPickerSlot>
}

const initialState: MantenedorPickerSliceState = { byEntity: {} }

function ensureSlot(
  state: MantenedorPickerSliceState,
  key: string
): MantenedorPickerSlot {
  if (!state.byEntity[key]) {
    state.byEntity[key] = {
      options: [],
      searchTerm: '',
      isLoading: false,
      error: null,
      pendingConfirm: null,
    }
  }
  return state.byEntity[key]
}

const slice = createSlice({
  name: 'mantenedorPicker',
  initialState,
  reducers: {
    setOptions(
      state,
      action: PayloadAction<{ key: string; options: MantenedorOption[] }>
    ) {
      ensureSlot(state, action.payload.key).options = action.payload.options
    },
    setSearchTerm(
      state,
      action: PayloadAction<{ key: string; term: string }>
    ) {
      ensureSlot(state, action.payload.key).searchTerm = action.payload.term
    },
    setLoading(
      state,
      action: PayloadAction<{ key: string; loading: boolean }>
    ) {
      ensureSlot(state, action.payload.key).isLoading = action.payload.loading
    },
    setError(
      state,
      action: PayloadAction<{ key: string; error: string | null }>
    ) {
      ensureSlot(state, action.payload.key).error = action.payload.error
    },
    setPendingConfirm(
      state,
      action: PayloadAction<{ key: string; item: MantenedorOption | null }>
    ) {
      ensureSlot(state, action.payload.key).pendingConfirm = action.payload.item
    },
    clearSlot(state, action: PayloadAction<{ key: string }>) {
      delete state.byEntity[action.payload.key]
    },
  },
})

export const {
  setOptions: setMantenedorOptions,
  setSearchTerm: setMantenedorSearchTerm,
  setLoading: setMantenedorLoading,
  setError: setMantenedorError,
  setPendingConfirm: setMantenedorPendingConfirm,
  clearSlot: clearMantenedorSlot,
} = slice.actions

export default slice.reducer
