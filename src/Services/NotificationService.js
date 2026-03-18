import { useMemo, useRef } from "react"
import { io } from "socket.io-client"
import {
    addNotification,
    markAllAsRead,
    markAsRead,
    resetInitialLoad,
    setReadNotificationIds,
} from "../Reducers/default-reducers/notificationReducer"
import { useWebProvider } from "../hooks/useWebProvider"
import { endPointNotification } from "../models/constantes"
import { store } from "../store"

export function createNotificationSocket(
    endPointNotification,
    token,
    user,
    company,
    onMessage
) {
    const tokenString = typeof token === "string" && token ? token.trim() : ""
    if (!tokenString) return null

    const notificationSocket = io(endPointNotification, {
        path: "/notification",
        auth: { token: tokenString, user, company, type: "notification" },
        extraHeaders: { user, company, token: tokenString, type: "notification" },
    })

    notificationSocket.on("connect", () => {
        console.log("[Notification] Connected:", notificationSocket.id)
        store.dispatch(resetInitialLoad())
    })

    notificationSocket.on("new_notification", (notification) => {
        store.dispatch(addNotification(normalizeNotificationPayload(notification)))
    })

    notificationSocket.on("central_notification", (payload, ackCallback) => {
        const item = mapCentralPayloadToNotification(payload)
        if (item) store.dispatch(addNotification(item))
        if (typeof ackCallback === "function") {
            ackCallback({ received: true, deliveryId: payload?.deliveryId })
        }
    })

    return notificationSocket
}

function normalizeNotificationPayload(notification) {
    if (!notification) return notification
    const id = notification.id ?? notification._id
    const origin = notification.origin ?? { context: "Notificação", contextId: String(id ?? "") }
    return {
        ...notification,
        _id: id,
        status: notification.status ?? "unread",
    }
}

function mapCentralPayloadToNotification(payload) {
    if (!payload) return null
    const id = payload.id ?? payload.notificationId
    return {
        id,
        _id: id,
        deliveryId: payload.deliveryId,
        content: payload.mensagem ?? "",
        status: "unread",
        createdAt: payload.created_at ?? new Date().toISOString(),
        origin: {
            context: payload.context ?? "Notificação",
            contextId: String(payload.context_id ?? id ?? ""),
            title: payload.title ?? `${payload.context} - ${payload.context_id}`,
        },
        readAt: null,
    }
}

export const useNotificationService = () => {
    const { basicController } = useWebProvider()
    const notificationController = basicController(null, endPointNotification)
    const controllerRef = useRef(notificationController)
    controllerRef.current = notificationController

    return useMemo(() => ({
        getUnreadNotificationsForUser: async (userId) => {
            const result = await controllerRef.current.get(`user/${userId}/unread`)
            return result?.notifications ? { notifications: result.notifications, count: result.count } : { notifications: result || [], count: (result || []).length }
        },
        getArchivedNotificationsForUser: async (userId) => controllerRef.current.get(`user/${userId}/archived`),
        markAsRead: async (id) => controllerRef.current.post(`${id}/read`),
        dismissNotification: async (id) => controllerRef.current.post(`${id}/dismiss`),
        markAllAsRead: async (notificationIds) => controllerRef.current.post(`/mark-all-read`, notificationIds),
    }), [])
}
