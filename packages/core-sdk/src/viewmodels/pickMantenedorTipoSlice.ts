import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {
  PickMantenedorOption,
  PickTipoDeOrdemOption,
} from './IPickMantenedorTipoViewModel'

export interface PickMantenedorTipoSliceState {
  mantenedores: PickMantenedorOption[]
  tiposDeOrdem: PickTipoDeOrdemOption[]
  loading: boolean
  assigning: boolean
  error: string | null
}

const initialState: PickMantenedorTipoSliceState = {
  mantenedores: [],
  tiposDeOrdem: [],
  loading: false,
  assigning: false,
  error: null,
}

const slice = createSlice({
  name: 'pickMantenedorTipo',
  initialState,
  reducers: {
    setOptions(
      state,
      action: PayloadAction<{
        mantenedores: PickMantenedorOption[]
        tiposDeOrdem: PickTipoDeOrdemOption[]
      }>
    ) {
      state.mantenedores = action.payload.mantenedores
      state.tiposDeOrdem = action.payload.tiposDeOrdem
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setAssigning(state, action: PayloadAction<boolean>) {
      state.assigning = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    reset() {
      return initialState
    },
  },
})

export const {
  setOptions: setPickMantenedorTipoOptions,
  setLoading: setPickMantenedorTipoLoading,
  setAssigning: setPickMantenedorTipoAssigning,
  setError: setPickMantenedorTipoError,
  reset: resetPickMantenedorTipo,
} = slice.actions

export default slice.reducer
