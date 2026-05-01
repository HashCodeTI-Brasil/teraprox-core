/**
 * Escuta matching objects no Firebase RTDB para um usuário dentro de um tenant.
 *
 * Estrutura RTDB (sprint 2026-05-01-mo-fanout-per-user-channel):
 *   - Backend escreve em /{company}/matchingObjects/{ts} (1 entry por request,
 *     com array de MOs no value — batching feito pelo Sentinel do @onroad/core).
 *   - Cloud Function `mo-fanout` (RTDB onCreate trigger) copia o entry para
 *     /{company}/users/{userId}/matchingObjects/{ts} para CADA user com presença
 *     ativa naquele tenant.
 *   - Este client escuta APENAS o path do user — sem broadcast, sem replay
 *     de atividade alheia.
 *
 * Compat: se userId for undefined/null (versão antiga sem migração de presence),
 * cai no path legado /{company}/matchingObjects para não quebrar.
 */
import { initializeApp, getApps } from "firebase/app"
import { getDatabase, ref, onChildAdded, off } from "firebase/database"

function getFirebaseDb() {
    if (!getApps().length) {
        let config = {}
        try {
            const configString = process.env.REACT_APP_FIREBASE_CONFIG || "{}"
            config = JSON.parse(configString)
        } catch (e) {
            console.error("[MoFirebase] Erro ao carregar config:", e)
        }

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
 * @param {string|number} userId - ID do user logado (canal individual)
 * @param {function} onMessage - Callback(mo, socketType, source)
 * @returns {{ connected: boolean, disconnect: () => void }}
 */
export function createMoFirebaseClient(company, userId, onMessage) {
    const database = getFirebaseDb()

    // Path por usuário (preferido). Cai no legado se userId ausente — defensive
    // para tolerar callers antigos enquanto migração propaga.
    const path = userId
        ? `${company}/users/${userId}/matchingObjects`
        : `${company}/matchingObjects`

    const moRef = ref(database, path)

    console.log(`[MoFirebase] Listening for matching objects on /${path}`)

    const unsub = onChildAdded(moRef, (snapshot) => {
        const data = snapshot.val()
        if (!data) return
        if (Array.isArray(data)) {
            data.forEach((mo) => onMessage(mo, true, "firebase"))
        } else {
            onMessage(data, true, "firebase")
        }
    })

    return {
        connected: true,
        disconnect: () => {
            off(moRef, "child_added", unsub)
            console.log(`[MoFirebase] Unsubscribed from /${path}`)
        },
    }
}
