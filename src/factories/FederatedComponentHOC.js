import React, { Suspense, useMemo } from 'react';
import { useWebProvider } from '../hooks/useWebProvider';
import { useCoreService } from 'teraprox-core-sdk';
import { useLocation } from 'react-router-dom';
import { useStore } from 'react-redux';
import FederatedErrorBoundary from '../Components/error-handling/FederatedErrorBoundary';
import FederatedLoadingPlaceholder from '../Components/loading/FederatedLoadingPlaceholder';
import FederatedUnavailableCard from '../Components/error-handling/FederatedUnavailableCard';
import { componentRegistry, resolveRemoteName } from '../federation/remoteRegistry';
import { useRemoteInfra } from '../hooks/useRemoteInfra';

const FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
const MEMO_TYPE = Symbol.for('react.memo');
const LAZY_TYPE = Symbol.for('react.lazy');

const isRenderableComponentType = (type) => {
    if (typeof type === 'function') return true;
    if (!type || typeof type !== 'object') return false;

    const marker = type.$$typeof;
    return marker === FORWARD_REF_TYPE || marker === MEMO_TYPE || marker === LAZY_TYPE;
};

/**
 * Host component que orquestra o carregamento de componentes federados.
 *
 * Responsabilidades:
 *  1. Resolver o componente React.lazy do registry
 *  2. Delegar ao useRemoteInfra a carga de ReducersBundle + Bridge + injeção de reducers
 *  3. Envolver o componente remoto no FederatedBridge para contexto WebProvider
 *  4. Passar webProvider como prop (padrão DI — host injeta no remote)
 */
export const FederatedComponentHost = ({ modulePath, hideFooter, ...props }) => {
    const webProvider = useWebProvider();
    const coreService = useCoreService();
    const store = useStore();
    const location = useLocation();

    const context = props?.context;

    const RemoteComponent = useMemo(() => {
        if (!modulePath) return null;
        return componentRegistry[modulePath];
    }, [modulePath]);

    const initialData = useMemo(() => location.state?.initialData || {}, [location.state?.initialData]);

    const expectedRemote = useMemo(() => resolveRemoteName(modulePath), [modulePath]);

    const { ready, loadError, BridgeComponent, bridgeRemote, retry } = useRemoteInfra(store, modulePath, context);

    if (!RemoteComponent) {
        return (
            <FederatedUnavailableCard
                modulePath={modulePath}
                errorMessage="Componente nao registrado no catalogo federado do Core."
                onRetry={retry}
            />
        );
    }

    if (!isRenderableComponentType(RemoteComponent)) {
        return (
            <FederatedUnavailableCard
                modulePath={modulePath}
                errorMessage="Componente remoto recebido em formato invalido."
                onRetry={retry}
            />
        );
    }

    if (loadError) {
        return (
            <FederatedErrorBoundary>
                <FederatedUnavailableCard
                    modulePath={modulePath}
                    errorMessage={loadError.message}
                    onRetry={retry}
                />
            </FederatedErrorBoundary>
        );
    }

    if (!ready) {
        return <FederatedLoadingPlaceholder />;
    }

    // Guard: bridge stale — aguarda recarga quando navega entre SGP ↔ SGM
    if (expectedRemote && bridgeRemote && bridgeRemote !== expectedRemote) {
        return <FederatedLoadingPlaceholder />;
    }

    if (BridgeComponent && !isRenderableComponentType(BridgeComponent)) {
        return (
            <FederatedUnavailableCard
                modulePath={modulePath}
                errorMessage="Bridge federado recebido em formato invalido."
                onRetry={retry}
            />
        );
    }

    const remoteContent = (
        <Suspense fallback={<FederatedLoadingPlaceholder />}>
            <RemoteComponent
                initialData={initialData}
                webProvider={webProvider}
                {...props}
            />
        </Suspense>
    );

    return (
        <div className="federated-container">
            <FederatedErrorBoundary>
                {BridgeComponent ? (
                    <BridgeComponent coreService={coreService}>
                        {remoteContent}
                    </BridgeComponent>
                ) : (
                    remoteContent
                )}
            </FederatedErrorBoundary>
        </div>
    );
};
