import React, { useMemo, useContext } from 'react'
import { CoreServiceContext } from 'teraprox-core-sdk'
import { WebProvider } from '../websocket/wsProvider'
import { useToasts } from 'react-toast-notifications'

export default function CoreServiceProvider({ children }) {
    const wp = useContext(WebProvider)
    const toast = useToasts()

    const value = useMemo(() => ({
        createController: (context, baseEndPoint) => wp.basicController(context, baseEndPoint),

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
    }), [wp, toast])

    return (
        <CoreServiceContext.Provider value={value}>
            {children}
        </CoreServiceContext.Provider>
    )
}
