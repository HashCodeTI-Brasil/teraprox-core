/**
 * Listens for notifications on Firebase RTDB for a given user.
 * Same pattern as teraprox-app-sgp — the frontend subscribes
 * directly to Firebase SDK, without Socket.IO through the gateway.
 *
 * RTDB path: {company}/notifications/{userId}
 */
import { initializeApp, getApps } from "firebase/app"
import { getDatabase, ref, onChildAdded, off, remove } from "firebase/database"
import { store } from "../store"
import { addNotification } from "../Reducers/default-reducers/notificationReducer"

function getFirebaseDb() {
    if (!getApps().length) {
        let configString = "{}"
        if (typeof process !== "undefined" && process && process.env && process.env.REACT_APP_FIREBASE_CONFIG) {
            configString = process.env.REACT_APP_FIREBASE_CONFIG
        }
        const config = JSON.parse(configString)
        initializeApp(config)
    }
    return getDatabase()
}

function mapRtdbPayloadToNotification(payload) {
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

/**
 * @param {string} company - Tenant/empresa
 * @param {number} userId  - ID do utilizador logado
 * @param {function} onMessage - Callback para toast/UI
 * @returns {{ connected: boolean, disconnect: () => void }}
 */
export function createNotificationFirebaseClient(company, userId, onMessage) {
    const database = getFirebaseDb()
    const notifRef = ref(database, `${company}/notifications/${userId}`)

    console.log(`[NotificationFirebase] Listening on /${company}/notifications/${userId}`)

    const unsub = onChildAdded(notifRef, (snapshot) => {
        const raw = snapshot.val()
        if (!raw) return

        const notification = mapRtdbPayloadToNotification(raw)
        if (notification) {
            store.dispatch(addNotification(notification))
        }

        if (onMessage) {
            onMessage(notification ?? raw)
        }

        // Remove do RTDB após consumir (evita re-disparo no reload)
        remove(snapshot.ref).catch(() => {})
    })

    return {
        connected: true,
        disconnect: () => {
            off(notifRef, "child_added", unsub)
            console.log("[NotificationFirebase] Unsubscribed from notifications")
        },
    }
}
