import { Client } from "@stomp/stompjs"
import axios from "axios"
import React, {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications"
import {
    logOut,
    setSocketConnectionStatus,
    setToken,
} from "../Reducers/default-reducers/globalConfigReducer"
import { endPointNotification } from "../models/constantes"
import { routesConfig } from "../models/routesConfig"
import { useNavigate } from "react-router-dom"
import { setGlobalError } from "../Reducers/default-reducers/globalErrorReducer"
import { createNotificationFirebaseClient } from "./notificationFirebaseClient"
import { store } from "../store"

const WebProvider = createContext(null)
export { WebProvider }

export default function WebProviderComponent({ children }) {
    const dispatch = useDispatch()
    const toast = useToasts()
    const rawNavigate = useNavigate()
    const { userId, companyId, userName, company, token } = useSelector((state) => state.global)
    const matchingObjectsRef = useRef([]);
    const eventRef = useRef(null);
    const wsEvent = eventRef.current = eventRef.current || new EventTarget();

    const [socket, setSocket] = useState(null)
    const [notificationSocket, setNotificationSocket] = useState(null)

    useEffect(() => {
        if (token && userId && company) {
            const nSocket = createNotificationFirebaseClient(company, userId)
            setNotificationSocket(nSocket)
            return () => {
                if (nSocket) nSocket.disconnect()
            }
        }
    }, [token, userId, company])

    const handleLogout = useCallback(async () => {
        if (socket) socket.disconnect()
        if (notificationSocket) notificationSocket.disconnect()
        dispatch(logOut())
        rawNavigate("/Login")
    }, [socket, notificationSocket, dispatch, rawNavigate])

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
                if (res.config.method !== "get") {
                    toast.addToast("Sucesso", { appearance: "success", autoDismiss: true })
                }
                if (res.data?.newToken) dispatch(setToken(res.data.newToken))
                return res.data?.content || res.data
            },
            err => {
                const status = err.response?.status
                if (status === 401) {
                    const isStillAuth = store.getState().global.isAuth
                    if (isStillAuth) {
                        toast.addToast("Sessão expirada, faça login novamente.", { appearance: "warning", autoDismiss: true })
                        dispatch(logOut())
                    }
                    return Promise.reject(err)
                }
                dispatch(setGlobalError(err.message))
                return Promise.reject(err)
            }
        )

        http.interceptors.request.use(config => {
            const currentToken = store.getState().global.token
            if (currentToken) config.headers.Authorization = `${currentToken}`
            return config
        })

        return http
    }, [dispatch, toast])

    const basicController = useCallback((context, baseEndPoint) => {
        const api = setRestApi(context, baseEndPoint)
        return {
            get: (path, query) => {
                const p = path || context
                return api.get(`${p}${query ? "?" + query : ""}`)
            },
            post: (path, data, extraHeaders, query) => {
                const p = path || context
                return api.post(`${p}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            put: (path, data, extraHeaders, query) => {
                const p = path || context
                return api.put(`${p}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            delete: (path, id, extraHeaders, query) => {
                const p = path || context
                const url = id ? `${p}/${id}` : p
                return api.delete(`${url}${query ? "?" + query : ""}`)
            },
            patch: (path, data, extraHeaders, query) => {
                const p = path || context
                return api.patch(`${p}${query ? "?" + query : ""}`, data, extraHeaders ? { headers: extraHeaders } : undefined)
            },
            readAll: (path, extraHeaders, query) => {
                const p = path || context
                return api.get(`${p}/all${query ? "?" + query : ""}`)
            },
            read: (path, id, extraHeaders, query) => {
                const p = path || context
                return api.get(`${p}/${id}${query ? "?" + query : ""}`)
            },
            save: (path, data, extraHeaders, query) => {
                const p = path || context
                if (data.id || data._id) {
                    return api.put(`${p}/${data.id || data._id}${query ? "?" + query : ""}`, data)
                } else {
                    return api.post(`${p}${query ? "?" + query : ""}`, data)
                }
            },
            readAllwithPage: (path, page, size) => {
                const p = path || context
                return api.get(`${p}?page=${page}&size=${size}`)
            },
            bulkDelete: (path, ids, extraHeaders, query) => {
                const p = path || context
                const bulkParam = `ids=${ids.join(",")}`
                const fullQuery = query ? `${query}&${bulkParam}` : bulkParam
                return api.delete(`${p}?${fullQuery}`)
            },
            deleteSimple: (path, extraHeaders, query) => {
                const p = path || context
                return api.delete(`${p}${query ? "?" + query : ""}`)
            },
        }
    }, [setRestApi])

    // Stubs para métodos de WebSocket/STOMP que SGP espera mas Core não implementa
    const subscribe = useCallback(() => {}, [])
    const unsubscribe = useCallback(() => {}, [])
    const subscribeEvent = useCallback(() => {}, [])
    const unsubscribeEvent = useCallback(() => {}, [])
    const sendMessage = useCallback(() => {}, [])
    const connectSocket = useCallback(() => {}, [])
    const connectNotificationSocket = useCallback(() => {}, [])

    const value = {
        wsEvent,
        socket,
        notificationSocket,
        handleLogout,
        setRestApi,
        basicController,
        subscribe,
        unsubscribe,
        subscribeEvent,
        unsubscribeEvent,
        sendMessage,
        connectSocket,
        connectNotificationSocket,
        stompClient: null,
    }

    return (
        <WebProvider.Provider value={value}>
            {children}
        </WebProvider.Provider>
    )
}
