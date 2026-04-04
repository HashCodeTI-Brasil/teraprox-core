import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    dismissNotification,
    markAllAsRead,
    markAsRead,
    setArchivedNotifications,
    setUnreadCount,
    setUnreadNotifications
} from "../Reducers/default-reducers/notificationReducer"
import { useNotificationService } from "../Services/NotificationService"

export function useNotifications(notificationSocket) {
    const dispatch = useDispatch()
    const {
        markAsRead: markAsReadAPI,
        dismissNotification: dismissNotificationAPI,
        markAllAsRead: markAllAsReadAPI,
        getUnreadNotificationsForUser,
        getArchivedNotificationsForUser,
    } = useNotificationService()

    const { unreadNotifications, archivedNotifications, unreadCount } = useSelector((state) => state.notification)
    const { userId: loggedUserId } = useSelector((state) => state.global)

    const loadInitialNotifications = useCallback(
        async (userId) => {
            try {
                const { notifications, count } = await getUnreadNotificationsForUser(userId)
                dispatch(setUnreadNotifications(notifications))
                dispatch(setUnreadCount(count))
            } catch (err) {
                console.warn('[useNotifications] Falha ao carregar notificações:', err?.message)
            }
        },
        [dispatch, getUnreadNotificationsForUser]
    )

    const loadArchivedNotifications = useCallback(async () => {
        const archivedNotifications = await getArchivedNotificationsForUser(loggedUserId)
        dispatch(setArchivedNotifications(archivedNotifications))
    }, [dispatch, getArchivedNotificationsForUser, loggedUserId])

    const handleMarkAsRead = useCallback(async (id) => {
        dispatch(markAsRead(id))
        try { await markAsReadAPI(id) } catch (_) { }
    }, [dispatch, markAsReadAPI])

    const handleDismiss = useCallback(async (id) => {
        dispatch(dismissNotification(id))
        try { await dismissNotificationAPI(id) } catch (_) { }
    }, [dispatch, dismissNotificationAPI])

    const handleMarkAllAsRead = useCallback(async () => {
        const ids = unreadNotifications.map((n) => n.deliveryId ?? n._id ?? n.id).filter(Boolean)
        if (ids.length === 0) return
        dispatch(markAllAsRead(ids))
        try { await markAllAsReadAPI(ids) } catch (_) { }
    }, [dispatch, unreadNotifications, markAllAsReadAPI])

    return {
        unreadNotifications,
        archivedNotifications,
        unreadCount,
        loadInitialNotifications,
        handleMarkAsRead,
        handleDismiss,
        handleMarkAllAsRead,
        loadArchivedNotifications,
    }
}
