import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BranchLevelForm {
  nome: string
  level: number
  color: string
  hasComponents: boolean
  excludeLevels: number
}

interface BranchLevelState {
  form: BranchLevelForm
  levels: any[]
}

const initialState: BranchLevelState = {
  form: {
    nome: '',
    level: 0,
    color: '',
    hasComponents: false,
    excludeLevels: 0,
  },
  levels: [],
}

const branchLevelSlice = createSlice({
  name: 'branchLevelReducer',
  initialState,
  reducers: {
    setNome(state, action: PayloadAction<string>) {
      state.form.nome = action.payload
    },
    setLevel(state, action: PayloadAction<number>) {
      state.form.level = action.payload
    },
    setColor(state, action: PayloadAction<string>) {
      state.form.color = action.payload
    },
    setHaveComponente(state, action: PayloadAction<boolean>) {
      state.form.hasComponents = action.payload
    },
    setExcludeLevels(state, action: PayloadAction<number>) {
      state.form.excludeLevels = action.payload
    },
    setLevels(state, action: PayloadAction<any[]>) {
      state.levels = action.payload
    },
    populateToEdit(state, action: PayloadAction<BranchLevelForm>) {
      state.form = action.payload
    },
    clear(state) {
      state.form = initialState.form
    },
  },
})

export const {
  setNome,
  setLevel,
  populateToEdit,
  setColor,
  setHaveComponente,
  clear: clearBranchLevelForm,
  setExcludeLevels,
  setLevels,
} = branchLevelSlice.actions

export default branchLevelSlice.reducer
