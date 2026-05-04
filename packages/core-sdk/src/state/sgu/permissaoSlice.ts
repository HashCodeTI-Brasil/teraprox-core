/**
 * permissaoSlice — catálogo de permissões (paths + componentes UI).
 *
 * Web-client legacy não tinha slice próprio para isto: armazenava em
 * `empresa.frontEndPerms` (ver `setCompanieFrontEndPerms`). No core-sdk
 * promovemos a slice dedicado para isolar do tenant lifecycle.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { PermissionPath } from '../../domain/sgu/Permission'

export const SGU_PERMISSAO_SLICE_KEY = 'sguPermissao'

export interface SguPermissaoSliceState {
  catalog: PermissionPath[]
  isLoading: boolean
  error: string | null
}

const initialState: SguPermissaoSliceState = {
  catalog: [],
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: SGU_PERMISSAO_SLICE_KEY,
  initialState,
  reducers: {
    setCatalog(state, action: PayloadAction<PermissionPath[]>) {
      state.catalog = action.payload
    },
    upsertPath(state, action: PayloadAction<PermissionPath>) {
      const idx = state.catalog.findIndex((p) => p.path === action.payload.path)
      if (idx >= 0) state.catalog[idx] = action.payload
      else state.catalog.push(action.payload)
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
  setCatalog: setSguPermissaoCatalog,
  upsertPath: upsertSguPermissaoPath,
  setLoading: setSguPermissaoLoading,
  setError: setSguPermissaoError,
  clear: clearSguPermissao,
} = slice.actions

export const selectSguPermissao = (s: {
  [SGU_PERMISSAO_SLICE_KEY]?: SguPermissaoSliceState
}) => s[SGU_PERMISSAO_SLICE_KEY] ?? initialState

export default slice.reducer
