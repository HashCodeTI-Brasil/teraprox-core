/**
 * Listens for async API responses on Firebase RTDB.
 * The backend (onRoad sentinel) writes results to:
 *   {company}/async-responses/{userId}/{messageId}
 *
 * This client consumes them in real-time via onChildAdded,
 * dispatches to Redux, and removes the entry from RTDB.
 */
import { getApps, initializeApp } from "firebase/app"
import { getDatabase, off, onChildAdded, ref, remove } from "firebase/database"
import { store } from "../store"
import { setAsyncResponse } from "../Reducers/default-reducers/asyncResponseReducer"

function getFirebaseDb() {
    if (!getApps().length) {
        let config = {}
        try {
            const configString = process.env.REACT_APP_FIREBASE_CONFIG || "{}"
            config = JSON.parse(configString)
        } catch (e) {
            console.error("[AsyncResponseFirebase] Erro ao carregar config:", e)
        }
        initializeApp(config)
    }
    return getDatabase()
}

/**
 * @param {string} company - Tenant/empresa
 * @param {number|string} userId - ID do utilizador logado
 * @returns {{ connected: boolean, disconnect: () => void }}
 */
export function createAsyncResponseClient(company, userId) {
    const database = getFirebaseDb()
    const asyncRef = ref(database, `${company}/async-responses/${userId}`)

    console.log(`[AsyncResponseFirebase] Listening on /${company}/async-responses/${userId}`)

    const unsub = onChildAdded(asyncRef, (snapshot) => {
        const payload = snapshot.val()
        if (!payload) return

        const messageId = snapshot.key

        store.dispatch(setAsyncResponse({
            messageId,
            route: payload.route || null,
            data: payload.data || null,
            ok: payload.ok ?? false,
            errors: payload.errors || null,
            timestamp: payload.timestamp || Date.now(),
        }))

        // Remove do RTDB após consumir (evita re-disparo no reload)
        remove(snapshot.ref).catch(() => {})
    })

    return {
        connected: true,
        disconnect: () => {
            off(asyncRef, "child_added", unsub)
            console.log("[AsyncResponseFirebase] Unsubscribed from async responses")
        },
    }
}
