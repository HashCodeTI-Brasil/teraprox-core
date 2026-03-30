import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    /**
     * Map de route → { data, ok, errors, timestamp, messageId }
     * Permite que qualquer tela consuma o resultado async pelo nome da rota.
     */
    responses: {},
}

const asyncResponseReducer = createSlice({
    name: "asyncResponse",
    initialState,
    reducers: {
        setAsyncResponse(state, action) {
            const { route, messageId, ...rest } = action.payload
            const key = route || messageId
            if (!key) return
            state.responses[key] = { ...rest, messageId, route, receivedAt: Date.now() }
        },
        clearAsyncResponse(state, action) {
            const key = action.payload
            if (key) delete state.responses[key]
        },
        clearAllAsyncResponses(state) {
            state.responses = {}
        },
    },
})

export const { setAsyncResponse, clearAsyncResponse, clearAllAsyncResponses } = asyncResponseReducer.actions
export default asyncResponseReducer.reducer
