import { useContext } from 'react';
import { WebProvider } from '../websocket/wsProvider';

const noop = () => {};
const emptyPromise = Promise.resolve([]);
const noopController = () => ({
    get: () => emptyPromise, post: () => emptyPromise,
    put: () => emptyPromise, delete: () => emptyPromise,
    save: () => emptyPromise, read: () => emptyPromise,
    readAll: () => emptyPromise, readAllwithPage: () => emptyPromise,
    patch: () => emptyPromise, bulkDelete: () => emptyPromise,
    deleteSimple: () => emptyPromise,
});

export const useWebProvider = () => {
    const webProvider = useContext(WebProvider);
    const hostedByCore = typeof window !== 'undefined' && window.__TERAPROX_HOSTED_BY_CORE__ === true;

    if (!webProvider) {
        return {
            socket: null, notificationSocket: null,
            hostedByCore,
            sendMessage: noop, subscribe: noop, unsubscribe: noop,
            controller: noopController,
            connectSocket: noop, connectNotificationSocket: noop,
            handleLogout: noop, subscribeEvent: noop, unsubscribeEvent: noop,
            wsProvider: null,
        };
    }

    return {
        socket: webProvider.socket,
        notificationSocket: webProvider.notificationSocket,
        hostedByCore: !!webProvider.hostedByCore || hostedByCore,
        sendMessage: webProvider.sendMessage || noop,
        subscribe: webProvider.subscribe || noop,
        unsubscribe: webProvider.unsubscribe || noop,
        controller: webProvider.basicController,
        connectSocket: webProvider.connectSocket || noop,
        connectNotificationSocket: webProvider.connectNotificationSocket || noop,
        handleLogout: webProvider.handleLogout || noop,
        subscribeEvent: webProvider.subscribeEvent || noop,
        unsubscribeEvent: webProvider.unsubscribeEvent || noop,
        wsProvider: webProvider,
    };
};
