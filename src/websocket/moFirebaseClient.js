/**
 * Escuta matching objects no Firebase RTDB para uma empresa.
 * Mesmo padrão do notificationFirebaseClient.js.
 *
 * RTDB path: {company}/matchingObjects/{timestamp}
 * O backend publica um array de MOs em cada chave timestamp.
 */
import { initializeApp, getApps } from "firebase/app"
import { getDatabase, ref, onChildAdded, off } from "firebase/database"

function getFirebaseDb() {
    if (!getApps().length) {
        const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "{}")
        if (!config || Object.keys(config).length === 0) {
            console.warn("[MoFirebase] REACT_APP_FIREBASE_CONFIG vazio ou ausente")
        }
        initializeApp(config)
        console.log("[MoFirebase] Firebase app inicializado")
    }
    return getDatabase()
}

/**
 * @param {string} company - Tenant/empresa
 * @param {function} onMessage - Callback(mo, socketType, source)
 * @returns {{ connected: boolean, disconnect: () => void }}
 */
export function createMoFirebaseClient(company, onMessage) {
    const database = getFirebaseDb()
    const moRef = ref(database, `${company}/matchingObjects`)

    console.log(`[MoFirebase] Listening for matching objects on /${company}/matchingObjects`)

    const unsub = onChildAdded(moRef, (snapshot) => {
        console.log(`[MoFirebase] child_added em key=${snapshot.key}`)
        const data = snapshot.val()
        if (!data) return
        if (Array.isArray(data)) {
            console.log(`[MoFirebase] Payload array com ${data.length} item(ns)`)
            data.forEach((mo) => onMessage(mo, true, "firebase"))
        } else {
            console.log("[MoFirebase] Payload objeto unico")
            onMessage(data, true, "firebase")
        }
    })

    return {
        connected: true,
        disconnect: () => {
            off(moRef, "child_added", unsub)
            console.log("[MoFirebase] Unsubscribed from matching objects")
        },
    }
}
