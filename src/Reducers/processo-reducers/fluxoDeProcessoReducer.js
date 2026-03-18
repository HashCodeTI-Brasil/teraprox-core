import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	form: {
		processoId : '',
		processo: null,
		descricao: "",
		itensFluxoDeProcesso: [],
	},
}

const fluxoProcessoReducer = createSlice({
	name: "fluxoDeProcessoReducer",
	initialState,
	reducers: {
		setProcesso(state, action) {
			state.form.processo = action.payload
			state.form.processoId = action.payload.id
		},
		setDescricaoFluxoDeProcesso(state, action) {
			state.form.descricao = action.payload
		},
		setItensFluxoDeProcesso(state, action) {
			state.form.itensFluxoDeProcesso = action.payload
		},
		setUpdateOperacaoItemFluxoDeProcesso(state, action) {
			let { operacao, index } = action.payload
			state.form.itensFluxoDeProcesso[index].operacao = operacao
			state.form.itensFluxoDeProcesso[index].operacaoId = operacao.id
		},
		populateToEdit(state, action) {
			state.form = action.payload
		},
		clear(state) {
			state.form = initialState.form
		},
	},
})

export const {
	setProcesso,
	setItensFluxoDeProcesso,
	setDescricaoFluxoDeProcesso,
	populateToEdit,
	clear: clearFluxoDeProcessoForm,
    setUpdateOperacaoItemFluxoDeProcesso
} = fluxoProcessoReducer.actions
export default fluxoProcessoReducer.reducer
