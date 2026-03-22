import { useMemo, useRef } from "react"
import { useWebProvider } from "../hooks/useWebProvider"
import { endPointNotification } from "../models/constantes"

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
