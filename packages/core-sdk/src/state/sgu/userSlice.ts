/**
 * userSlice — gestão de colaboradores da Company (SGU).
 *
 * Migrado de `web-client/src/lib/userSlice.js` SEM os campos de auth
 * (token, password, formulario de login). Auth é separada (Sprint 5).
 *
 * Aqui é apenas estado de gestão (lista + selectedUser + flags UI).
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../domain/sgu/User'

export const SGU_USER_SLICE_KEY = 'sguUser'

export interface SguUserSliceState {
  list: User[]
  selected: User | null
  isLoading: boolean
  error: string | null
}

const initialState: SguUserSliceState = {
  list: [],
  selected: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: SGU_USER_SLICE_KEY,
  initialState,
  reducers: {
    setList(state, action: PayloadAction<User[]>) {
      state.list = action.payload
    },
    upsertOne(state, action: PayloadAction<User>) {
      const idx = state.list.findIndex((u) => u.id === action.payload.id)
      if (idx >= 0) state.list[idx] = action.payload
      else state.list.push(action.payload)
    },
    removeOne(state, action: PayloadAction<number | string>) {
      state.list = state.list.filter((u) => u.id !== action.payload)
      if (state.selected?.id === action.payload) state.selected = null
    },
    setSelected(state, action: PayloadAction<User | null>) {
      state.selected = action.payload
    },
    patchSelected(state, action: PayloadAction<Partial<User>>) {
      if (state.selected) {
        state.selected = { ...state.selected, ...action.payload }
      }
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
  setList: setSguUserList,
  upsertOne: upsertSguUser,
  removeOne: removeSguUser,
  setSelected: setSguSelectedUser,
  patchSelected: patchSguSelectedUser,
  setLoading: setSguUserLoading,
  setError: setSguUserError,
  clear: clearSguUser,
} = slice.actions

export const selectSguUser = (s: { [SGU_USER_SLICE_KEY]?: SguUserSliceState }) =>
  s[SGU_USER_SLICE_KEY] ?? initialState

export default slice.reducer
