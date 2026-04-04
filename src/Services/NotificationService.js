import { useMemo, useRef } from "react"
import { useWebProvider } from "../hooks/useWebProvider"
import { endPointNotification } from "../models/constantes"

export const useNotificationService = () => {
    const { controller } = useWebProvider()
    const notificationController = controller(null, endPointNotification, { "x-teraprox-host": "notification" })
    const controllerRef = useRef(notificationController)
    controllerRef.current = notificationController

    return useMemo(() => ({
        getUnreadNotificationsForUser: async (userId) => {
            const result = await controllerRef.current.get(`user/${userId}/unread`, undefined, { "x-teraprox-host": "notification" })
            return result?.notifications ? { notifications: result.notifications, count: result.count } : { notifications: result || [], count: (result || []).length }
        },
        getArchivedNotificationsForUser: async (userId) => controllerRef.current.get(`user/${userId}/archived`, undefined, { "x-teraprox-host": "notification" }),
        markAsRead: async (id) => controllerRef.current.post(`${id}/read`, undefined, { "x-teraprox-host": "notification" }),
        dismissNotification: async (id) => controllerRef.current.post(`${id}/dismiss`, undefined, { "x-teraprox-host": "notification" }),
        markAllAsRead: async (notificationIds) => controllerRef.current.post(`/mark-all-read`, notificationIds, { "x-teraprox-host": "notification" }),
    }), [])
}
