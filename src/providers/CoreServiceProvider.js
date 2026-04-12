import React, { useMemo, useContext, useCallback } from 'react'
import { CoreServiceContext } from 'teraprox-core-sdk'
import { WebProvider } from '../websocket/wsProvider'
import { useToasts } from 'react-toast-notifications'

/**
 * Normalizes custom paths so they are always relative to the context —
 * matching FetchHttpAdapter behavior used by standalone federated modules.
 *
 * Rules:
 *  - null/undefined  → undefined  (triggers auto-CRUD fallback to context)
 *  - ''              → ''         (keep empty — some callers use it with baseURL that already includes context)
 *  - path === ctx    → as-is      (caller already provided the full context)
 *  - path starts with ctx/ → as-is
 *  - otherwise       → ctx/path   (prepend context)
 *  - empty context   → as-is      (no prefix to add)
 */
function normalizePath(context, path) {
    if (path == null) return undefined
    if (path === '' || !context) return path
    if (path === context || path.startsWith(`${context}/`)) return path
    return `${context}/${path}`
}

function wrapController(ctrl, context) {
    return {
        get:             (path, query)                  => ctrl.get(normalizePath(context, path), query),
        post:            (path, data, eh, q)            => ctrl.post(normalizePath(context, path), data, eh, q),
        put:             (path, data, eh, q)            => ctrl.put(normalizePath(context, path), data, eh, q),
        delete:          (path, id, eh, q)              => ctrl.delete(normalizePath(context, path), id, eh, q),
        patch:           (path, data, eh, q)            => ctrl.patch(normalizePath(context, path), data, eh, q),
        readAll:         (path, eh, q)                  => ctrl.readAll(normalizePath(context, path), eh, q),
        read:            (path, id, eh, q)              => ctrl.read(normalizePath(context, path), id, eh, q),
        save:            (path, data, eh, q)            => ctrl.save(normalizePath(context, path), data, eh, q),
        readAllwithPage: (path, page, size)             => ctrl.readAllwithPage(normalizePath(context, path), page, size),
        bulkDelete:      (path, ids, eh, q)             => ctrl.bulkDelete(normalizePath(context, path), ids, eh, q),
        deleteSimple:    (path, eh, q)                  => ctrl.deleteSimple(normalizePath(context, path), eh, q),
    }
}

export default function CoreServiceProvider({ children }) {
    const wp = useContext(WebProvider)
    const toast = useToasts()

    const wrappedCreateController = useCallback((context, baseEndPoint) => {
        const ctrl = wp.basicController(context, baseEndPoint)
        return wrapController(ctrl, context)
    }, [wp])

    const value = useMemo(() => ({
        createController: wrappedCreateController,

        toast: {
            success: (msg, opts) => toast.addToast(msg, { appearance: 'success', autoDismiss: true, ...opts }),
            warning: (msg, opts) => toast.addToast(msg, { appearance: 'warning', autoDismiss: true, ...opts }),
            error:   (msg, opts) => toast.addToast(msg, { appearance: 'error', autoDismiss: true, ...opts }),
            info:    (msg, opts) => toast.addToast(msg, { appearance: 'info', autoDismiss: true, ...opts }),
        },

        subscribe: wp.subscribe,
        unsubscribe: wp.unsubscribe,
        subscribeEvent: wp.subscribeEvent,
        unsubscribeEvent: wp.unsubscribeEvent,
        handleLogout: wp.handleLogout,
        hostedByCore: true,

        // Rate limit state — updated in real-time via RTDB.
        // pathGroup → { used, limit, exceeded, windowReset }
        rateLimits: wp.rateLimits ?? {},
    }), [wrappedCreateController, wp, toast])

    return (
        <CoreServiceContext.Provider value={value}>
            {children}
        </CoreServiceContext.Provider>
    )
}
