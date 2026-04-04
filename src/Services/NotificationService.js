import { useMemo, useRef } from "react"
import { useWebProvider } from "../hooks/useWebProvider"
import { endPointNotification } from "../models/constantes"

export const useNotificationService = () => {
    const { controller } = useWebProvider()
    const notificationController = controller("notification", endPointNotification)
    const controllerRef = useRef(notificationController)
    controllerRef.current = notificationController

    return useMemo(() => ({
        getUnreadNotificationsForUser: async (userId) => {
            const result = await controllerRef.current.get(`notification/user/${userId}/unread`)
            return result?.notifications ? { notifications: result.notifications, count: result.count } : { notifications: result || [], count: (result || []).length }
        },
        getArchivedNotificationsForUser: async (userId) => controllerRef.current.get(`notification/user/${userId}/archived`),
        markAsRead: async (id) => controllerRef.current.patch(`notificationUser/${id}/read`),
        dismissNotification: async (id) => controllerRef.current.patch(`notification/${id}/dismiss`),
        markAllAsRead: async (notificationIds) => controllerRef.current.patch(`notificationUser/mark-all-read`, notificationIds),
    }), [])
}
