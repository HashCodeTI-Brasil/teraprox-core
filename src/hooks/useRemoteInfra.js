import { useState, useEffect, useCallback } from 'react';

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
 * Hook para carregar a infraestrutura de um remote (ReducersBundle + FederatedBridge).
 * Injeta os reducers necessários no store do host, baseado no contexto da rota.
 *
 * @param {object} store - Redux store do host
 * @param {string} modulePath - Caminho do módulo federado (ex: 'teraprox_app_sgm/VisaoGeral')
 * @param {string} context - Contexto para seleção de reducers (ex: 'ordemDeServico')
 */
export const useRemoteInfra = (store, modulePath, context) => {
    const [ready, setReady] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [BridgeComponent, setBridgeComponent] = useState(null);
    const [bridgeRemote, setBridgeRemote] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    // Reset quando modulePath muda (ex: navegação SGP → SGM)
    useEffect(() => {
        setReady(false);
        setLoadError(null);
        setBridgeComponent(null);
        setBridgeRemote(null);
    }, [modulePath]);

    useEffect(() => {
        if (!modulePath) return;
        let active = true;

        const loadRemoteInfra = async () => {
            try {
                const isSGM = modulePath.startsWith('teraprox_app_sgm/');
                const isSolicitacao = modulePath.startsWith('teraprox_app_solicitacao/');

                let remoteModule, bridgeModule;

                if (isSolicitacao) {
                    [remoteModule, bridgeModule] = await Promise.all([
                        import('teraprox_app_solicitacao/ReducersBundle'),
                        import('teraprox_app_solicitacao/FederatedBridge'),
                    ]);
                } else if (isSGM) {
                    [remoteModule, bridgeModule] = await Promise.all([
                        import('teraprox_app_sgm/ReducersBundle'),
                        import('teraprox_app_sgm/FederatedBridge'),
                    ]);
                } else {
                    [remoteModule, bridgeModule] = await Promise.all([
                        import('teraprox_app_sgp/ReducersBundle'),
                        import('teraprox_app_sgp/FederatedBridge'),
                    ]);
                }

                // Carrega os reducers por contexto ou fallback completo
                let remoteReducers = {};
                if (typeof remoteModule?.getReducersForModule === 'function') {
                    try {
                        remoteReducers = await remoteModule.getReducersForModule({ modulePath, context });
                    } catch (error) {
                        console.warn('Falha ao carregar reducers granulares; aplicando fallback completo.', error);
                        if (typeof remoteModule?.loadAllReducers === 'function') {
                            remoteReducers = await remoteModule.loadAllReducers();
                        }
                    }
                } else {
                    remoteReducers = remoteModule?.baseReducers || remoteModule?.default || {};
                }

                // Injeta no store do host (apenas reducers novos)
                Object.entries(remoteReducers).forEach(([key, reducer]) => {
                    if (store?.injectReducer && !store?.asyncReducers?.[key]) {
                        store.injectReducer(key, reducer);
                    }
                });

                if (active) {
                    const resolvedBridge = resolveBridgeExport(bridgeModule);
                    setBridgeComponent(() => resolvedBridge);
                    setBridgeRemote(isSolicitacao ? 'solicitacao' : isSGM ? 'sgm' : 'sgp');
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

        loadRemoteInfra();
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
