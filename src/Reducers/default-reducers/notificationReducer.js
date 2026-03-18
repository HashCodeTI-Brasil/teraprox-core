import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    form: {},
    picker: {
        notificacao: null,
    },
    unreadNotifications: [],
    archivedNotifications: { read: [], dismissed: [] },
    readNotificationIds: [],
    unreadCount: 0,
    initialLoadComplete: false,
}

const notificationReducer = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setUnreadNotifications(state, action) {
            const list = Array.isArray(action.payload) ? action.payload : []
            const seen = new Set()
            state.unreadNotifications = list.filter((n) => {
                const key = Number(n?.deliveryId ?? n?.id ?? n?._id)
                if (Number.isNaN(key) || seen.has(key)) return false
                seen.add(key)
                return true
            })
            state.initialLoadComplete = true
        },
        setArchivedNotifications(state, action) {
            state.archivedNotifications = action.payload
        },
        addNotification(state, action) {
            if (!state.initialLoadComplete) return
            const deliveryId = action.payload.deliveryId
            const id = action.payload._id ?? action.payload.id
            const uniqueKey = Number(deliveryId ?? id)
            if (Number.isNaN(uniqueKey)) return
            if (!deliveryId && id != null && state.readNotificationIds.includes(id)) return
            const alreadyExists = state.unreadNotifications.some(
                (n) => Number(n.deliveryId ?? n._id ?? n.id) === uniqueKey,
            )
            if (alreadyExists) return
            state.unreadNotifications.unshift(action.payload)
            state.unreadCount += 1
        },
        setReadNotificationIds(state, action) {
            state.readNotificationIds = Array.isArray(action.payload) ? action.payload : []
        },
        setUnreadCount(state, action) {
            state.unreadCount = action.payload
        },
        markAsRead(state, action) {
            const id = action.payload
            if (id != null && !state.readNotificationIds.includes(id)) {
                state.readNotificationIds.push(id)
            }
            const idx = state.unreadNotifications.findIndex(
                (n) => n.deliveryId === id || (n._id ?? n.id) === id,
            )
            if (idx !== -1) {
                state.unreadNotifications.splice(idx, 1)
                state.unreadCount = Math.max(0, state.unreadCount - 1)
            }
        },
        dismissNotification(state, action) {
            const id = action.payload
            const idx = state.unreadNotifications.findIndex(
                (n) => n.deliveryId === id || (n._id ?? n.id) === id,
            )
            if (idx !== -1) {
                state.unreadNotifications.splice(idx, 1)
                state.unreadCount = Math.max(0, state.unreadCount - 1)
            }
        },
        markAllAsRead(state, action) {
            const idsToMark = action.payload
            const remaining = state.unreadNotifications.filter((n) => {
                const key = n.deliveryId
                const mainId = n._id ?? n.id
                return !idsToMark.includes(key) && !idsToMark.includes(mainId)
            })
            state.unreadNotifications = remaining
            state.unreadCount = remaining.length
        },
        resetInitialLoad(state) {
            state.initialLoadComplete = false
        }
    },
})

export const {
    setUnreadNotifications,
    addNotification,
    setReadNotificationIds,
    setUnreadCount,
    markAsRead,
    dismissNotification,
    markAllAsRead,
    setArchivedNotifications,
    resetInitialLoad
} = notificationReducer.actions

export default notificationReducer.reducer
