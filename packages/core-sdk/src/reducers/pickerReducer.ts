import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PickerState {
  selected: any | null
  items: any[]
  visible: boolean
  context: string
}

const initialState: PickerState = {
  selected: null,
  items: [],
  visible: false,
  context: '',
}

const pickerSlice = createSlice({
  name: 'picker',
  initialState,
  reducers: {
    setPickerSelected(state, action: PayloadAction<any>) { state.selected = action.payload },
    setPickerItems(state, action: PayloadAction<any[]>) { state.items = action.payload },
    setPickerVisible(state, action: PayloadAction<boolean>) { state.visible = action.payload },
    setPickerContext(state, action: PayloadAction<string>) { state.context = action.payload },
    clearPicker() { return initialState },
  },
})

export const {
  setPickerSelected,
  setPickerItems,
  setPickerVisible,
  setPickerContext,
  clearPicker,
} = pickerSlice.actions

export default pickerSlice.reducer
