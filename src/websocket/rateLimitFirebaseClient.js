/**
 * Listens for rate limit state on Firebase RTDB for a given company.
 * Same pattern as notificationFirebaseClient — onValue on a company subtree.
 *
 * RTDB path: {company}/rateLimits
 *
 * Each entry is: { used, limit, exceeded, windowReset }
 * Key is the pathGroup in snake_case (e.g. "user_auth_POST").
 */
import { initializeApp, getApps } from "firebase/app"
import { getDatabase, ref, onValue, off } from "firebase/database"

function getFirebaseDb() {
    if (!getApps().length) {
        let config = {}
        try {
            const configString = process.env.REACT_APP_FIREBASE_CONFIG || "{}"
            config = JSON.parse(configString)
        } catch (e) {
            console.error("[RateLimitFirebase] Erro ao carregar config:", e)
        }
        initializeApp(config)
    }
    return getDatabase()
}

/**
 * @param {string} company - Tenant identifier
 * @param {function} onUpdate - Callback recebe Record<pathGroup, { used, limit, exceeded, windowReset }>
 * @returns {{ disconnect: () => void }}
 */
export function createRateLimitFirebaseClient(company, onUpdate) {
    const database = getFirebaseDb()
    const rateLimitRef = ref(database, `${company}/rateLimits`)

    console.log(`[RateLimitFirebase] Listening on /${company}/rateLimits`)

    const handler = onValue(rateLimitRef, (snapshot) => {
        const state = snapshot.val() ?? {}
        onUpdate(state)
    }, (err) => {
        console.error("[RateLimitFirebase] onValue error:", err)
    })

    return {
        disconnect: () => {
            off(rateLimitRef, "value", handler)
            console.log("[RateLimitFirebase] Unsubscribed from rateLimits")
        },
    }
}
