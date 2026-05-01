/**
 * Presence client — registra que `userId` está conectado em `company`,
 * possibilitando que a Cloud Function `mo-fanout` distribua MOs apenas
 * para usuários ativos (sprint 2026-05-01-mo-fanout-per-user-channel).
 *
 * Estrutura RTDB:
 *   /{company}/presence/{userId} = { online: true, lastSeen: <timestamp> }
 *
 * Garantias:
 *   - Ao desconectar (logout, refresh, perda de conexão), `onDisconnect`
 *     remove a entrada automaticamente — sem janela de "ghost active user".
 *   - Heartbeat a cada HEARTBEAT_MS atualiza `lastSeen` para que o
 *     fanout consiga descartar entries stale caso o `onDisconnect` falhe.
 */
import { initializeApp, getApps } from "firebase/app"
import {
    getDatabase,
    ref,
    set,
    serverTimestamp,
    onDisconnect,
    update,
} from "firebase/database"

const HEARTBEAT_MS = 30_000

function getFirebaseDb() {
    if (!getApps().length) {
        let config = {}
        try {
            config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "{}")
        } catch {
            // sem config válido, presence vira no-op
        }
        if (!config || Object.keys(config).length === 0) return null
        initializeApp(config)
    }
    return getDatabase()
}

/**
 * @param {string} company
 * @param {string|number} userId
 * @returns {() => void} cleanup — chama on logout / unmount
 */
export function registerPresence(company, userId) {
    const db = getFirebaseDb()
    if (!db || !company || !userId) return () => {}

    const presenceRef = ref(db, `${company}/presence/${userId}`)

    set(presenceRef, { online: true, lastSeen: serverTimestamp() }).catch((err) => {
        console.warn("[Presence] erro ao registrar:", err?.message ?? err)
    })

    // Auto-remove ao perder conexão (Firebase server-side garantia)
    onDisconnect(presenceRef).remove().catch(() => {})

    const heartbeat = setInterval(() => {
        update(presenceRef, { lastSeen: serverTimestamp() }).catch(() => {})
    }, HEARTBEAT_MS)

    return () => {
        clearInterval(heartbeat)
        // Tenta remover proativamente em logout limpo (não bloqueia)
        set(presenceRef, null).catch(() => {})
    }
}
