import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAsyncResponse } from "../Reducers/default-reducers/asyncResponseReducer"

/**
 * Hook para consumir respostas assíncronas recebidas via RTDB.
 *
 * @param {string} route - A rota AMQP (e.g., "recursocreatepost") para filtrar a resposta.
 *                         Se não informada, retorna todas as respostas.
 * @returns {{ response, clear, allResponses }}
 */
export function useAsyncResponse(route) {
    const dispatch = useDispatch()
    const allResponses = useSelector((state) => state.asyncResponse?.responses ?? {})
    const response = route ? allResponses[route] ?? null : null

    const clear = useCallback((key) => {
        dispatch(clearAsyncResponse(key || route))
    }, [dispatch, route])

    return { response, clear, allResponses }
}
