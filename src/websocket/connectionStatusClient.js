/**
 * connectionStatusClient — escuta o path especial `.info/connected` do
 * Firebase RTDB pra refletir o estado real da conexão (true/false).
 *
 * Esse path é um boolean que o SDK do Firebase mantém atualizado
 * automaticamente: vira `true` quando o cliente conecta, `false` quando
 * cai (rede, sleep, logout). Substitui o estado "Offline" hardcoded da
 * MenuBar que ficava sempre falso porque ninguém dispatchava o status.
 *
 * Sprint 2026-05-01-mo-fanout-per-user-channel — followup MenuBar status.
 */
import { initializeApp, getApps } from "firebase/app"
import { getDatabase, ref, onValue, off } from "firebase/database"

function getFirebaseDb() {
    if (!getApps().length) {
        let config = {}
        try {
            config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "{}")
        } catch {
            // sem config válida, observer vira no-op
        }
        if (!config || Object.keys(config).length === 0) return null
        initializeApp(config)
    }
    return getDatabase()
}

/**
 * @param {(connected: boolean) => void} onChange
 * @returns {() => void} unsubscribe
 */
export function watchRtdbConnection(onChange) {
    const db = getFirebaseDb()
    if (!db) {
        // Sem Firebase configurado, sinaliza offline e retorna no-op
        try { onChange(false) } catch { /* */ }
        return () => {}
    }

    const connectedRef = ref(db, ".info/connected")
    const handler = (snap) => {
        const connected = snap.val() === true
        try { onChange(connected) } catch (err) {
            console.warn("[ConnectionStatus] callback erro:", err?.message ?? err)
        }
    }
    onValue(connectedRef, handler)

    return () => off(connectedRef, "value", handler)
}
