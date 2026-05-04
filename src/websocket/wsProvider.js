import axios from "axios"
import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications"
import {
    logOut,
    setNeedUserLogin,
    setSocketConnectionStatus,
    setToken,
} from "../Reducers/default-reducers/globalConfigReducer"
import { routesConfig } from "../models/routesConfig"
import { useNavigate } from "react-router-dom"
import { setGlobalError } from "../Reducers/default-reducers/globalErrorReducer"
import { createNotificationFirebaseClient } from "./notificationFirebaseClient"
import { createAsyncResponseClient } from "./asyncResponseFirebaseClient"
import { watchRtdbConnection } from "./connectionStatusClient"
import { createMoFirebaseClient } from "./moFirebaseClient"
import { registerPresence } from "./presenceClient"
import { createRateLimitFirebaseClient } from "./rateLimitFirebaseClient"
import { store } from "../store"

/**
 * Logs verbosos do canal de Matching Objects são gatekept por flag pra evitar
 * 3 `console.log` por mensagem recebida — com devtools aberto e backend
 * publicando rajadas (osMantenedor, ordemDeServico…), isso degradava notavelmente
 * a tela de login e o dashboard. Habilita ligando `localStorage.setItem(
 * 'teraprox-debug-mo','1')` ou via env REACT_APP_DEBUG_MO=1.
 */
const isMoDebugEnabled = () => {
    if (typeof window === 'undefined') return false
    if (process.env.REACT_APP_DEBUG_MO === '1') return true
    try {
        return window.localStorage?.getItem('teraprox-debug-mo') === '1'
    } catch {
        return false
    }
}

const WebProvider = createContext(null)
export { WebProvider }

export default function WebProviderComponent({ children }) {
    const dispatch = useDispatch()
    const toast = useToasts()
    const rawNavigate = useNavigate()
    const { userId, company: legacyCompany, companyName, token } = useSelector((state) => state.global)
    const company = legacyCompany || companyName
    const matchingObjectsRef = useRef([]);
    const eventRef = useRef(null);
    const wsEvent = eventRef.current = eventRef.current || new EventTarget();
    const successToastTimerRef = useRef(null)

    const [socket, setSocket] = useState(null)
    const [notificationSocket, setNotificationSocket] = useState(null)
    const [rateLimits, setRateLimits] = useState({})

    const enqueueSuccessToast = useCallback((message, options = {}, delay = 1000) => {
        if (successToastTimerRef.current) {
            clearTimeout(successToastTimerRef.current)
        }
        successToastTimerRef.current = setTimeout(() => {
            if (toast?.addToast) {
                toast.addToast(message, options)
            }
            successToastTimerRef.current = null
        }, delay)
    }, [toast])

    useEffect(() => {
        return () => {
            if (successToastTimerRef.current) {
                clearTimeout(successToastTimerRef.current)
                successToastTimerRef.current = null
            }
        }
    }, [])

    // Status real da conexão RTDB → Redux global.socketConnection
    // Lê o path especial `.info/connected` que o Firebase SDK mantém:
    // true ao subir conexão, false em queda. A MenuBar (Connected/Offline)
    // observa esse mesmo state.
    useEffect(() => {
        const unwatch = watchRtdbConnection((connected) => {
            dispatch(setSocketConnectionStatus(connected))
        })
        return () => {
            unwatch()
            // Ao desmontar o provider (logout/unload), garante false
            dispatch(setSocketConnectionStatus(false))
        }
    }, [dispatch])

    useEffect(() => {
        if (token && userId && company) {
            console.log(`[Core][Notification] Conectando listener de notificacao: company=${company}, userId=${userId}`)
            const nSocket = createNotificationFirebaseClient(company, userId)
            setNotificationSocket(nSocket)
            return () => {
                if (nSocket) nSocket.disconnect()
            }
        }
        console.log(`[Core][Notification] Listener nao iniciado (token=${!!token}, userId=${!!userId}, company=${!!company})`)
    }, [token, userId, company])

    useEffect(() => {
        if (token && userId && company) {
            console.log(`[Core][AsyncResponse] Conectando listener: company=${company}, userId=${userId}`)
            const asyncClient = createAsyncResponseClient(company, userId)
            return () => {
                if (asyncClient) asyncClient.disconnect()
            }
        }
    }, [token, userId, company])

    useEffect(() => {
        if (token && company) {
            console.log(`[Core][RateLimit] Conectando listener: company=${company}`)
            const rlClient = createRateLimitFirebaseClient(company, (state) => {
                setRateLimits(state)
            })
            return () => {
                rlClient.disconnect()
            }
        }
    }, [token, company])

    const onMessageReceive = useCallback((incomingMatchingObject, socketType = true, source) => {
        if (typeof incomingMatchingObject !== "object") return
        const subscribers = matchingObjectsRef.current || []
        const debug = isMoDebugEnabled()
        // Fast path: sem subscribers e sem debug, descarta sem alocar/iterar.
        // Backend publica MOs em broadcast — o cliente que estiver na tela de
        // login ou em screens sem subscribe não tem o que fazer com eles.
        if (subscribers.length === 0) {
            if (debug) {
                console.log("[Core][MO] Mensagem recebida (sem subscribers):", incomingMatchingObject)
            }
            return
        }
        if (debug) {
            console.log("[Core][MO] Mensagem recebida:", incomingMatchingObject)
            console.log(`[Core][MO] Subscribers ativos: ${subscribers.length}`)
        }
        const matches = subscribers.filter((mO) => {
            const sameContext = mO.context === incomingMatchingObject.context
            const subscriberLocation = mO.location
            const incomingLocation = incomingMatchingObject.location
            const sameLocation =
                subscriberLocation === incomingLocation ||
                subscriberLocation === "*" ||
                incomingLocation === "*" ||
                !subscriberLocation ||
                !incomingLocation
            return sameContext && sameLocation
        })
        if (debug) {
            console.log(`[Core][MO] Matches encontrados: ${matches.length}`)
        }
        for (const mO of matches) {
            try {
                if (mO.refresher) {
                    mO.refresher(incomingMatchingObject.payload, dispatch)
                } else {
                    wsEvent.dispatchEvent(
                        new CustomEvent(mO.context + mO.location, {
                            detail: incomingMatchingObject.payload,
                        })
                    )
                }
            } catch (error) {
                console.error("[Core] Falha ao processar MO context:", incomingMatchingObject.context)
            }
        }
    }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (token && company && userId) {
            console.log(`[Core][MO] Conectando listener de matchingObjects: company=${company}, userId=${userId}`)
            // Registra presence ANTES do listener: garante que o fanout
            // (Cloud Function mo-fanout) já tenha o userId nos ativos quando
            // o backend disparar o primeiro MO desta sessão.
            const unregisterPresence = registerPresence(company, userId)
            const moSocket = createMoFirebaseClient(company, userId, onMessageReceive)
            setSocket(moSocket)
            return () => {
                moSocket.disconnect()
                unregisterPresence()
            }
        }
        console.log(`[Core][MO] Listener nao iniciado (token=${!!token}, company=${!!company}, userId=${!!userId})`)
    }, [token, company, userId]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogout = useCallback(async () => {
        if (socket) socket.disconnect()
        if (notificationSocket) notificationSocket.disconnect()
        dispatch(logOut())
        rawNavigate("/Login")
    }, [socket, notificationSocket, dispatch, rawNavigate])

    const processResponseMatchingObjects = useCallback((matchingObjects) => {
        if (!matchingObjects) return
        const mos = Array.isArray(matchingObjects) ? matchingObjects : [matchingObjects]
        for (const mo of mos) {
            onMessageReceive(mo, false, "http-response")
        }
    }, [onMessageReceive])

    const setRestApi = useCallback((context, baseEndPoint) => {
        let endPointToConfig = baseEndPoint
        if (!endPointToConfig) {
            routesConfig.forEach((rC) =>
                rC.routes.forEach((route) => {
                    if (route.configuration.context === context) {
                        endPointToConfig = route.configuration.endPoint
                    }
                })
            )
        }

        const http = axios.create({ baseURL: endPointToConfig })

        http.interceptors.response.use(
            res => {
                if (res.config.method !== "get" && res.config.method !== "patch") {
                    enqueueSuccessToast("Dados processados com sucesso", {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 2000,
                    })
                }
                if (res.data?.newToken) dispatch(setToken(res.data.newToken))
                const gatewayNewToken = res.headers?.['x-new-token']
                if (gatewayNewToken) dispatch(setToken(gatewayNewToken))
                processResponseMatchingObjects(res.data?.matchingObjects)
                return res.data?.content || res.data
            },
            err => {
                const status = err.response?.status
                const data = err.response?.data

                if (status === 400 || status === 404) {
                    if (status === 400 && Array.isArray(data?.errors)) {
                        data.errors.forEach((msg) =>
                            toast.addToast(msg, { appearance: "warning", autoDismiss: true })
                        )
                    }
                    if (status === 404) {
                        toast.addToast("Recurso não encontrado.", { appearance: "info", autoDismiss: true })
                    }
                    return Promise.resolve(data)
                }

                if (status === 401) {
                    // Serviços secundários nunca devem causar logout nem retry
                    if (context === "notification") {
                        return Promise.reject(err)
                    }

                    const currentToken = store.getState().global.token
                    const canRetry = !!currentToken && !err.config?._retry

                    if (canRetry) {
                        err.config._retry = true
                        err.config.headers = err.config.headers || {}
                        err.config.headers.Authorization = `${currentToken}`
                        return http.request(err.config)
                    }

                    // Evita toast/logOut duplicado quando vários requests expiram simultaneamente.
                    // needUserLogin só é resetado por logIn (não por logOut), então o guard é confiável.
                    const alreadyWaiting = store.getState().global.needUserLogin
                    if (!alreadyWaiting) {
                        dispatch(setNeedUserLogin(true))
                        toast.addToast("Sessão expirada, faça login novamente.", { appearance: "warning", autoDismiss: true })
                    }

                    // Rejeita o request. O route guard (isAuth=false) redireciona para /Login.
                    // Após re-login os componentes remontam e fazem requests frescos com o novo token.
                    return Promise.reject(err)
                }

                // Notification é secundário — nunca deve travar a UI com tela de erro
                if (context === "notification") {
                    return Promise.reject(err)
                }

                if (status === 403) {
                    toast.addToast("Você não tem permissão para acessar este recurso.", { autoDismiss: true })
                }
                if (status === 500 && Array.isArray(data?.errors)) {
                    data.errors.forEach((errMsg) =>
                        toast.addToast(errMsg, { autoDismiss: true, autoDismissTimeout: 2000 })
                    )
                }

                const customError = { message: err.message, status, data, stack: err.stack }
                dispatch(setGlobalError(customError))
                return Promise.reject(customError)
            }
        )

        http.interceptors.request.use(config => {
            const currentToken = store.getState().global.token
            if (currentToken) config.headers.Authorization = `${currentToken}`
            
            // Injetar x-teraprox-host baseado no service de origem no routesConfig
            const routeCfg = routesConfig.find(svc => 
                svc.routes.some(r => r.configuration.context === context)
            )
            if (routeCfg?.service) {
                config.headers["x-teraprox-host"] = routeCfg.service
            }

            if (context && !config.headers?.Contexto) {
                config.headers.Contexto = context
            }

            return config
        })

        return http
    }, [dispatch, enqueueSuccessToast, processResponseMatchingObjects, toast])

    const basicController = useCallback((context, baseEndPoint) => {
        const api = setRestApi(context, baseEndPoint)
        return {
            get: (path, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.get(`${p}${query ? "?" + query : ""}`)
            },
            post: (path, data, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.post(`${p}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            put: (path, data, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.put(`${p}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            delete: (path, id, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                const url = id ? `${p}/${id}` : p
                return api.delete(`${url}${query ? "?" + query : ""}`, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            patch: (path, data, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.patch(`${p}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            readAll: (path, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.get(`${p}${query ? "?" + query : ""}`, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            read: (path, id, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.get(`${p}/${id}${query ? "?" + query : ""}`, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            save: (path, data, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                if (data.id || data._id) {
                    return api.put(`${p}/${data.id || data._id}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
                } else {
                    return api.post(`${p}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
                }
            },
            readAllwithPage: (path, page, size) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.get(`${p}?page=${page}&size=${size}`)
            },
            bulkDelete: (path, ids, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                const bulkParam = `ids=${ids.join(",")}`
                const fullQuery = query ? `${query}&${bulkParam}` : bulkParam
                return api.delete(`${p}?${fullQuery}`, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            deleteSimple: (path, extraHeaders, query) => {
                const p = (path !== null && path !== undefined) ? path : context
                return api.delete(`${p}${query ? "?" + query : ""}`, extraHeaders ? { headers: extraHeaders } : undefined)
            },
        }
    }, [setRestApi])

    // API de subscrição de Matching Objects — alimentada pelo Firebase RTDB
    const subscribe = useCallback((matchingObject) => {
        matchingObject.userId = userId
        const current = matchingObjectsRef.current || []
        if (!current.find((mO) => mO.context === matchingObject.context && mO.location === matchingObject.location)) {
            matchingObjectsRef.current = [...current, matchingObject]
            if (isMoDebugEnabled()) {
                console.log(`[Core][MO] Subscreveu ${matchingObject.context}${matchingObject.location}`)
                console.log(`[Core][MO] Total de subscribers: ${matchingObjectsRef.current.length}`)
            }
        }
    }, [userId])

    const unsubscribe = useCallback((matchingObject) => {
        matchingObjectsRef.current = (matchingObjectsRef.current || []).filter(
            (c) => c.context !== matchingObject.context
        )
        if (isMoDebugEnabled()) {
            console.log(`[Core][MO] Unsubscribe ${matchingObject.context}${matchingObject.location || ""}`)
            console.log(`[Core][MO] Total de subscribers: ${matchingObjectsRef.current.length}`)
        }
    }, [])
    const subscribeEvent = useCallback((context, location, eventHandler) => {
        const eventName = context + location
        wsEvent.addEventListener(eventName, eventHandler)
        subscribe({ context, location, userId })
    }, [wsEvent, subscribe, userId])

    const unsubscribeEvent = useCallback((context, location, eventHandler) => {
        const eventName = context + location
        wsEvent.removeEventListener(eventName, eventHandler)
        unsubscribe({ context, location })
    }, [wsEvent, unsubscribe])
    const sendMessage = useCallback(() => {}, [])
    const connectSocket = useCallback(() => {}, [])
    const connectNotificationSocket = useCallback(() => {}, [])

    const value = useMemo(() => ({
        hostedByCore: true,
        wsEvent,
        socket,
        notificationSocket,
        rateLimits,
        handleLogout,
        setRestApi,
        basicController,
        subscribe,
        unsubscribe,
        subscribeEvent,
        unsubscribeEvent,
        // Exposed so non-axios HTTP layers (FetchHttpAdapter via core-sdk's
        // CoreServiceBuilder) can fan matching objects through the same
        // subscriber path (refresher callbacks) as the RTDB delivery.
        // Without this, useMatchingObject subscribers waited on RTDB
        // round-trip — observed 15-20s lag on confirmAnexo before the
        // registro card refreshed.
        processResponseMatchingObjects,
        sendMessage,
        connectSocket,
        connectNotificationSocket,
        stompClient: null,
    }), [
        wsEvent,
        socket,
        notificationSocket,
        rateLimits,
        handleLogout,
        setRestApi,
        basicController,
        subscribe,
        unsubscribe,
        subscribeEvent,
        unsubscribeEvent,
        processResponseMatchingObjects,
        sendMessage,
        connectSocket,
        connectNotificationSocket,
    ])

    return (
        <WebProvider.Provider value={value}>
            {children}
        </WebProvider.Provider>
    )
}
