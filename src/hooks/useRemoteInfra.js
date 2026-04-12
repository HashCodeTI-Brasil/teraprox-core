import { useState, useEffect, useCallback } from 'react';
import { loadRemoteInfraByName, resolveRemoteName } from '../federation/remoteLoader';

const FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
const MEMO_TYPE = Symbol.for('react.memo');
const LAZY_TYPE = Symbol.for('react.lazy');

const isRenderableComponentType = (type) => {
    if (typeof type === 'function') return true;
    if (!type || typeof type !== 'object') return false;

    const marker = type.$$typeof;
    return marker === FORWARD_REF_TYPE || marker === MEMO_TYPE || marker === LAZY_TYPE;
};

const resolveBridgeExport = (bridgeModule) => {
    const candidate =
        bridgeModule?.default?.default ||
        bridgeModule?.default ||
        bridgeModule?.FederatedBridge ||
        bridgeModule?.Bridge ||
        null;

    return isRenderableComponentType(candidate) ? candidate : null;
};

/**
 * Hook genérico para carregar a infraestrutura de qualquer remote.
 *
 * Deriva o nome do remote a partir do modulePath (ex: 'teraprox_app_sgm/...' → 'teraprox_app_sgm')
 * e usa loadRemoteInfraByName para carregar Bridge + ReducersBundle.
 *
 * Sem if/else por remote. Para adicionar um novo remote, basta adicioná-lo
 * em REMOTE_CONFIGS no remoteLoader.js — este hook não muda.
 */
export const useRemoteInfra = (store, modulePath, context, reducerKeys) => {
    const [ready, setReady] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [BridgeComponent, setBridgeComponent] = useState(null);
    const [bridgeRemote, setBridgeRemote] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        setReady(false);
        setLoadError(null);
        setBridgeComponent(null);
        setBridgeRemote(null);
    }, [modulePath]);

    useEffect(() => {
        if (!modulePath) return;
        let active = true;

        const remoteName = resolveRemoteName(modulePath);
        if (!remoteName) {
            setLoadError(new Error(`Não foi possível derivar remote de: ${modulePath}`));
            return;
        }

        const loadInfra = async () => {
            try {
                const [remoteModule, bridgeModule] = await loadRemoteInfraByName(remoteName);

                let remoteReducers = {};
                if (typeof remoteModule?.getReducersForModule === 'function') {
                    try {
                        remoteReducers = await remoteModule.getReducersForModule({ modulePath, context, reducerKeys });
                    } catch (error) {
                        console.warn('Falha ao carregar reducers granulares; aplicando fallback completo.', error);
                        if (typeof remoteModule?.loadAllReducers === 'function') {
                            remoteReducers = await remoteModule.loadAllReducers();
                        }
                    }
                } else {
                    remoteReducers = remoteModule?.baseReducers || remoteModule?.default || {};
                }

                Object.entries(remoteReducers).forEach(([key, reducer]) => {
                    if (store?.injectReducer && !store?.asyncReducers?.[key]) {
                        store.injectReducer(key, reducer);
                    }
                });

                if (active) {
                    const resolvedBridge = resolveBridgeExport(bridgeModule);
                    setBridgeComponent(() => resolvedBridge);
                    setBridgeRemote(remoteName);
                    setReady(true);
                }
            } catch (error) {
                console.error('Falha ao carregar infraestrutura remota:', error);

                if (isChunkLoadError(error)) {
                    const reloadKey = 'federated_chunk_reload_ts';
                    const lastReload = sessionStorage.getItem(reloadKey);
                    const now = Date.now();
                    if (!lastReload || now - Number(lastReload) > 10000) {
                        sessionStorage.setItem(reloadKey, String(now));
                        window.location.reload();
                        return;
                    }
                }

                if (active) {
                    setLoadError(error);
                }
            }
        };

        loadInfra();
        return () => { active = false; };
    }, [store, modulePath, context, retryCount]);

    const retry = useCallback(() => {
        setLoadError(null);
        setRetryCount(c => c + 1);
    }, []);

    return { ready, loadError, BridgeComponent, bridgeRemote, retry };
};

function isChunkLoadError(error) {
    const msg = error?.message || '';
    return (
        msg.includes('Loading chunk') ||
        msg.includes('Loading CSS chunk') ||
        msg.includes('ChunkLoadError') ||
        msg.includes('Failed to fetch dynamically imported module')
    );
}
