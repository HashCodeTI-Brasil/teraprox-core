import React, { useMemo, useContext, useCallback } from 'react'
import { CoreServiceContext, FetchHttpAdapter } from 'teraprox-core-sdk'
import { getTenantFromHostname } from '../utils/tenantResolver.js'
import { WebProvider } from '../websocket/wsProvider'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import {
    setNeedUserLogin,
    setToken,
} from '../Reducers/default-reducers/globalConfigReducer'
import { setGlobalError } from '../Reducers/default-reducers/globalErrorReducer'
import { routesConfig } from '../models/routesConfig'
import { store } from '../store'

function resolveEndpoint(context) {
    for (const svc of routesConfig) {
        for (const route of svc.routes) {
            if (route.configuration.context === context) {
                return route.configuration.endPoint
            }
        }
    }
    return undefined
}

function resolveService(context) {
    for (const svc of routesConfig) {
        if (svc.routes.some(r => r.configuration.context === context)) {
            return svc.service
        }
    }
    return undefined
}

/**
 * Mesmo padrão do `basicController` em wsProvider.js: enviar só o JWT no Authorization.
 * O gateway (`parseTokenFromHeader`) aceita `Bearer <jwt>` ou `<jwt>`; evitamos prefixar
 * com "Bearer " aqui para ficar idêntico ao axios e evitar headers com mais de 2 tokens
 * após split por espaço (ex.: "Bearer  jwt" → 401).
 */
function authorizationFromToken(raw) {
    if (!raw) return undefined
    let t = String(raw).trim()
    if (!t) return undefined
    if (/^bearer\s+/i.test(t)) {
        t = t.replace(/^bearer\s+/i, '').trim()
    }
    return t || undefined
}

export default function CoreServiceProvider({ children }) {
    const wp = useContext(WebProvider)
    const toast = useToasts()
    const dispatch = useDispatch()

    const successToastTimerRef = React.useRef(null)

    const enqueueSuccessToast = useCallback((message, options = {}, delay = 1000) => {
        if (successToastTimerRef.current) clearTimeout(successToastTimerRef.current)
        successToastTimerRef.current = setTimeout(() => {
            if (toast?.addToast) toast.addToast(message, options)
            successToastTimerRef.current = null
        }, delay)
    }, [toast])

    const processResponseMatchingObjects = useCallback((matchingObjects) => {
        if (!matchingObjects) return
        // Delegate to wsProvider so HTTP-response MOs walk the same path as
        // RTDB-delivered ones — both invoke useMatchingObject's refresher
        // callbacks. The local fallback (only wsEvent.dispatchEvent) reaches
        // subscribeEvent listeners but skips the refresher subscribers used
        // by core-sdk's useMatchingObject hook, leaving consumers to wait
        // on the RTDB round-trip (15-20s observed for confirmAnexo).
        if (wp?.processResponseMatchingObjects) {
            wp.processResponseMatchingObjects(matchingObjects)
            return
        }
        const mos = Array.isArray(matchingObjects) ? matchingObjects : [matchingObjects]
        for (const mo of mos) {
            if (wp?.wsEvent) {
                wp.wsEvent.dispatchEvent(
                    new CustomEvent(mo.context + (mo.location || ''), { detail: mo.payload })
                )
            }
        }
    }, [wp])

    const createController = useCallback((context, baseEndPoint) => {
        // Match SDK contract: when baseEndPoint is explicitly provided, use it as-is
        // (no context prefix). When absent, resolve from routesConfig + add context.
        let endpoint
        if (baseEndPoint != null) {
            endpoint = baseEndPoint.replace(/\/$/, '')
        } else {
            const resolved = resolveEndpoint(context) || ''
            endpoint = context
                ? `${resolved.replace(/\/$/, '')}/${context}`
                : resolved.replace(/\/$/, '')
        }
        const service = resolveService(context)
        const isNotification = context === 'notification'

        const tenant = getTenantFromHostname()

        const interceptors = {
            onBeforeRequest(headers) {
                const auth = authorizationFromToken(store.getState().global.token)
                if (auth) headers.Authorization = auth
                if (service) headers['x-teraprox-host'] = service
                if (context && !headers.Contexto) headers.Contexto = context
                if (tenant) headers['x-tenant'] = tenant
                return headers
            },

            onResponse(response, method) {
                if (method !== 'GET' && method !== 'PATCH') {
                    enqueueSuccessToast('Dados processados com sucesso', {
                        appearance: 'success',
                        autoDismiss: true,
                        autoDismissTimeout: 2000,
                    })
                }
                if (response.data?.newToken) dispatch(setToken(response.data.newToken))
                const gatewayNewToken = response.headers?.get?.('x-new-token')
                if (gatewayNewToken) dispatch(setToken(gatewayNewToken))
                processResponseMatchingObjects(response.data?.matchingObjects)
                return response.data?.content || response.data
            },

            onError(error, retry) {
                const { status, data } = error

                const sessionExpiredFlow = () => {
                    const alreadyWaiting = store.getState().global.needUserLogin
                    if (!alreadyWaiting) {
                        dispatch(setNeedUserLogin(true))
                        toast.addToast('Sessão expirada, faça login novamente.', { appearance: 'warning', autoDismiss: true })
                    }
                    return Promise.reject(error)
                }

                if (status === 400 || status === 404) {
                    if (status === 400 && Array.isArray(data?.errors)) {
                        data.errors.forEach((msg) =>
                            toast.addToast(msg, { appearance: 'warning', autoDismiss: true })
                        )
                    }
                    if (status === 404) {
                        toast.addToast('Recurso não encontrado.', { appearance: 'info', autoDismiss: true })
                    }
                    return data
                }

                if (status === 401) {
                    if (isNotification) return Promise.reject(error)

                    // Igual ao basicController (axios): no máximo 1 retry (limitado no FetchHttpAdapter);
                    // sem async/await aqui — Babel do core não trata onError como async.
                    const currentToken = store.getState().global.token
                    if (currentToken) {
                        return retry().catch(() => sessionExpiredFlow())
                    }
                    return sessionExpiredFlow()
                }

                if (isNotification) return Promise.reject(error)

                if (status === 403) {
                    toast.addToast('Você não tem permissão para acessar este recurso.', { autoDismiss: true })
                }
                if (status === 500 && Array.isArray(data?.errors)) {
                    data.errors.forEach((errMsg) =>
                        toast.addToast(errMsg, { autoDismiss: true, autoDismissTimeout: 2000 })
                    )
                }

                const customError = { message: error.message, status, data }
                dispatch(setGlobalError(customError))
                return Promise.reject(customError)
            },
        }

        return new FetchHttpAdapter(endpoint, {}, interceptors)
    }, [dispatch, enqueueSuccessToast, processResponseMatchingObjects, toast])

    const value = useMemo(() => ({
        createController,

        toast: {
            success: (msg, opts) => toast.addToast(msg, { appearance: 'success', autoDismiss: true, ...opts }),
            warning: (msg, opts) => toast.addToast(msg, { appearance: 'warning', autoDismiss: true, ...opts }),
            error:   (msg, opts) => toast.addToast(msg, { appearance: 'error', autoDismiss: true, ...opts }),
            info:    (msg, opts) => toast.addToast(msg, { appearance: 'info', autoDismiss: true, ...opts }),
        },

        subscribe: wp.subscribe,
        unsubscribe: wp.unsubscribe,
        subscribeEvent: wp.subscribeEvent,
        unsubscribeEvent: wp.unsubscribeEvent,
        handleLogout: wp.handleLogout,
        hostedByCore: true,
        rateLimits: wp.rateLimits ?? {},
    }), [createController, wp, toast])

    return (
        <CoreServiceContext.Provider value={value}>
            {children}
        </CoreServiceContext.Provider>
    )
}
