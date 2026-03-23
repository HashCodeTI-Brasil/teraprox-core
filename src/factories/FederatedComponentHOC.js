import React, { Suspense, useMemo, useContext } from 'react';
import { useWebProvider } from '../hooks/useWebProvider';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useStore } from 'react-redux';
import { WebProvider as CoreWebProvider } from '../websocket/wsProvider';
import FederatedErrorBoundary from '../Components/error-handling/FederatedErrorBoundary';
import FederatedLoadingPlaceholder from '../Components/loading/FederatedLoadingPlaceholder';
import { componentRegistry, resolveRemoteName } from '../federation/remoteRegistry';
import { useRemoteInfra } from '../hooks/useRemoteInfra';

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
    const coreWebProviderRaw = useContext(CoreWebProvider);
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
            <div className="alert alert-warning">
                Módulo federado não encontrado: <strong>{modulePath}</strong>.
                Registre-o em <code>src/federation/remoteRegistry.js</code>.
            </div>
        );
    }

    if (loadError) {
        return (
            <FederatedErrorBoundary>
                <div className="alert alert-danger">
                    <strong>Falha ao Carregar Componente</strong>
                    <p>Não foi possível carregar o módulo remoto. Provavelmente o servidor de origem está offline.</p>
                    <hr />
                    <p className="mb-0">Erro: {loadError.message}</p>
                    <Button variant="outline-danger" className="mt-2" onClick={retry}>
                        Tentar Novamente
                    </Button>
                </div>
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
                    <BridgeComponent webProviderValue={coreWebProviderRaw}>
                        {remoteContent}
                    </BridgeComponent>
                ) : (
                    remoteContent
                )}
            </FederatedErrorBoundary>
        </div>
    );
};
