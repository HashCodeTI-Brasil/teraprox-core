/**
 * roleSlice — gestão de Roles dentro da Company.
 * Migrado de `web-client/src/lib/roleSlice.js`.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Role } from '../../domain/sgu/Role'

export const SGU_ROLE_SLICE_KEY = 'sguRole'

export interface SguRoleSliceState {
  list: Role[]
  selected: Role | null
  isLoading: boolean
  error: string | null
}

const initialState: SguRoleSliceState = {
  list: [],
  selected: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: SGU_ROLE_SLICE_KEY,
  initialState,
  reducers: {
    setList(state, action: PayloadAction<Role[]>) {
      state.list = action.payload
    },
    upsertOne(state, action: PayloadAction<Role>) {
      const idx = state.list.findIndex((r) => r.id === action.payload.id)
      if (idx >= 0) state.list[idx] = action.payload
      else state.list.push(action.payload)
    },
    removeOne(state, action: PayloadAction<number | string>) {
      state.list = state.list.filter((r) => r.id !== action.payload)
      if (state.selected?.id === action.payload) state.selected = null
    },
    setSelected(state, action: PayloadAction<Role | null>) {
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
  setList: setSguRoleList,
  upsertOne: upsertSguRole,
  removeOne: removeSguRole,
  setSelected: setSguSelectedRole,
  setLoading: setSguRoleLoading,
  setError: setSguRoleError,
  clear: clearSguRole,
} = slice.actions

export const selectSguRole = (s: { [SGU_ROLE_SLICE_KEY]?: SguRoleSliceState }) =>
  s[SGU_ROLE_SLICE_KEY] ?? initialState

export default slice.reducer
