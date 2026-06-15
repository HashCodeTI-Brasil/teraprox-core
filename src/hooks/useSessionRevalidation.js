// @agent-touched: 2026-06-15
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    logIn,
    logOut,
    setToken,
    setCompanySetores,
} from '../Reducers/default-reducers/globalConfigReducer'
import { endPointUser } from '../models/constantes'
import { getTenantFromHostname } from '../utils/tenantResolver.js'

/**
 * Valida o token persistido ao montar (após redux-persist rehydrate).
 *
 * Faz PATCH /loginFromToken direto via fetch (sem interceptors) — roteado
 * para a api-user pelo header x-teraprox-host:user — para não disparar o
 * fluxo de 401 → logOut que existe nos adapters.
 *
 * Retorna { validating: true } enquanto valida — App deve exibir loading.
 */
export function useSessionRevalidation() {
    const dispatch = useDispatch()
    const { isAuth, token } = useSelector(state => state.global)
    const [validating, setValidating] = useState(isAuth && !!token)
    const didRun = useRef(false)

    useEffect(() => {
        if (didRun.current || !isAuth || !token) {
            setValidating(false)
            return
        }
        didRun.current = true

        const validate = async () => {
            try {
                const tenant = getTenantFromHostname()
                const gatewayUrl = endPointUser.replace(/\/$/, '')

                const headers = {
                    Authorization: token,
                    'x-teraprox-host': 'user',
                }
                if (tenant) headers['x-tenant'] = tenant

                const res = await fetch(`${gatewayUrl}/loginFromToken`, {
                    method: 'PATCH',
                    headers,
                })

                if (res.ok) {
                    const json = await res.json()
                    const payload = json?.content || json
                    if (payload?.token) {
                        dispatch(logIn(payload))
                        dispatch(setToken(payload.token))

                        // Reload setores com token fresco
                        try {
                            const setoresRes = await fetch(`${gatewayUrl}/setor/all`, {
                                headers: {
                                    Authorization: payload.token,
                                    'x-teraprox-host': 'user',
                                    ...(tenant ? { 'x-tenant': tenant } : {}),
                                },
                            })
                            if (setoresRes.ok) {
                                const setoresJson = await setoresRes.json()
                                dispatch(setCompanySetores(setoresJson?.content || setoresJson))
                            }
                        } catch (_) {
                            // Não-crítico — setores são carregados depois
                        }
                    }
                } else if (res.status === 401) {
                    // Token irrecuperável — limpar sessão
                    dispatch(logOut())
                }
                // Outros erros (500, network) → manter sessão atual,
                // vai falhar no primeiro request real e o handler cuida.
            } catch (err) {
                console.warn('[useSessionRevalidation]', err.message)
            } finally {
                setValidating(false)
            }
        }

        validate()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { validating }
}
