/**
 * empresaSlice — gestão da Company corrente do usuário logado.
 * Migrado de `web-client/src/lib/empresaSlice.js`.
 *
 * NB: campo `frontEndPerms` legado foi promovido para `permissaoSlice`.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Empresa } from '../../domain/sgu/Empresa'

export const SGU_EMPRESA_SLICE_KEY = 'sguEmpresa'

export interface SguEmpresaSliceState {
  current: Empresa | null
  companies: Empresa[]
  selected: Empresa | null
  isLoading: boolean
  error: string | null
}

const initialState: SguEmpresaSliceState = {
  current: null,
  companies: [],
  selected: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: SGU_EMPRESA_SLICE_KEY,
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<Empresa | null>) {
      state.current = action.payload
    },
    setCompanies(state, action: PayloadAction<Empresa[]>) {
      state.companies = action.payload
    },
    setSelected(state, action: PayloadAction<Empresa | null>) {
      state.selected = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clear() {
      return initialState
    },
  },
})

export const {
  setCurrent: setSguCurrentEmpresa,
  setCompanies: setSguEmpresaCompanies,
  setSelected: setSguSelectedEmpresa,
  setLoading: setSguEmpresaLoading,
  setError: setSguEmpresaError,
  clear: clearSguEmpresa,
} = slice.actions

export const selectSguEmpresa = (s: {
  [SGU_EMPRESA_SLICE_KEY]?: SguEmpresaSliceState
}) => s[SGU_EMPRESA_SLICE_KEY] ?? initialState

export default slice.reducer
