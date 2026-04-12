import React, { Suspense, useMemo } from 'react';
import { useWebProvider } from '../hooks/useWebProvider';
import { useCoreService } from 'teraprox-core-sdk';
import { useLocation } from 'react-router-dom';
import { useStore } from 'react-redux';
import FederatedErrorBoundary from '../Components/error-handling/FederatedErrorBoundary';
import FederatedLoadingPlaceholder from '../Components/loading/FederatedLoadingPlaceholder';
import FederatedUnavailableCard from '../Components/error-handling/FederatedUnavailableCard';
import { resolveRemoteName } from '../federation/remoteLoader';
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
 * Suporta dois modos:
 *  - Manifest-driven: recebe `LazyComponent` diretamente (auto-gerado pelo remoteLoader)
 *  - Legacy: recebe `modulePath` e faz lookup no componentRegistry legado
 *
 * O modo manifest-driven é preferido. O legacy será removido quando todos os remotes
 * exportarem manifests completos com formRoutes.
 */
export const FederatedComponentHost = ({ modulePath, LazyComponent, hideFooter, ...props }) => {
    const webProvider = useWebProvider();
    const coreService = useCoreService();
    const store = useStore();
    const location = useLocation();

    const context = props?.context;

    // LazyComponent pode vir do manifest (novo) ou do legado
    const ResolvedComponent = LazyComponent || null;

    const initialData = useMemo(() => location.state?.initialData || {}, [location.state?.initialData]);

    const expectedRemote = useMemo(() => resolveRemoteName(modulePath), [modulePath]);

    const { ready, loadError, BridgeComponent, bridgeRemote, retry } = useRemoteInfra(store, modulePath, context);

    if (!ResolvedComponent) {
        return (
            <FederatedUnavailableCard
                modulePath={modulePath}
                errorMessage="Componente não registrado no catálogo federado do Core."
                onRetry={retry}
            />
        );
    }

    if (!isRenderableComponentType(ResolvedComponent)) {
        return (
            <FederatedUnavailableCard
                modulePath={modulePath}
                errorMessage="Componente remoto recebido em formato inválido."
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

    if (expectedRemote && bridgeRemote && bridgeRemote !== expectedRemote) {
        return <FederatedLoadingPlaceholder />;
    }

    if (BridgeComponent && !isRenderableComponentType(BridgeComponent)) {
        return (
            <FederatedUnavailableCard
                modulePath={modulePath}
                errorMessage="Bridge federado recebido em formato inválido."
                onRetry={retry}
            />
        );
    }

    const remoteContent = (
        <Suspense fallback={<FederatedLoadingPlaceholder />}>
            <ResolvedComponent
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
