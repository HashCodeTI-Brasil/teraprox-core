/**
 * setorSlice — gestão de Setores da Company.
 * Migrado de `web-client/src/lib/setorSlice.js`.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Setor } from '../../domain/sgu/Setor'

export const SGU_SETOR_SLICE_KEY = 'sguSetor'

export interface SguSetorSliceState {
  list: Setor[]
  selected: Setor | null
  isLoading: boolean
  error: string | null
}

const initialState: SguSetorSliceState = {
  list: [],
  selected: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: SGU_SETOR_SLICE_KEY,
  initialState,
  reducers: {
    setList(state, action: PayloadAction<Setor[]>) {
      state.list = action.payload
    },
    upsertOne(state, action: PayloadAction<Setor>) {
      const idx = state.list.findIndex((s) => s.id === action.payload.id)
      if (idx >= 0) state.list[idx] = action.payload
      else state.list.push(action.payload)
    },
    removeOne(state, action: PayloadAction<number | string>) {
      state.list = state.list.filter((s) => s.id !== action.payload)
      if (state.selected?.id === action.payload) state.selected = null
    },
    setSelected(state, action: PayloadAction<Setor | null>) {
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
  setList: setSguSetorList,
  upsertOne: upsertSguSetor,
  removeOne: removeSguSetor,
  setSelected: setSguSelectedSetor,
  setLoading: setSguSetorLoading,
  setError: setSguSetorError,
  clear: clearSguSetor,
} = slice.actions

export const selectSguSetor = (s: { [SGU_SETOR_SLICE_KEY]?: SguSetorSliceState }) =>
  s[SGU_SETOR_SLICE_KEY] ?? initialState

export default slice.reducer
