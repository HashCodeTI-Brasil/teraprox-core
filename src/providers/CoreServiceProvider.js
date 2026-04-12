import React, { useMemo, useContext, useCallback } from 'react'
import { CoreServiceContext, FetchHttpAdapter } from 'teraprox-core-sdk'
import { WebProvider } from '../websocket/wsProvider'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import {
    logOut,
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

/** Mesmo padrão de `webInterface.js`: Bearer + JWT (gateway aceita com ou sem prefixo). */
function authorizationFromToken(raw) {
    if (!raw) return undefined
    const t = String(raw).trim()
    if (!t) return undefined
    return /^bearer\s+/i.test(t) ? t : `Bearer ${t}`
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
        const gatewayBase = baseEndPoint || resolveEndpoint(context) || ''
        const endpoint = context
            ? `${gatewayBase.replace(/\/$/, '')}/${context}`
            : gatewayBase.replace(/\/$/, '')
        const service = resolveService(context)
        const isNotification = context === 'notification'

        const interceptors = {
            onBeforeRequest(headers) {
                const auth = authorizationFromToken(store.getState().global.token)
                if (auth) headers.Authorization = auth
                if (service) headers['x-teraprox-host'] = service
                if (context && !headers.Contexto) headers.Contexto = context
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
                        dispatch(logOut())
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
