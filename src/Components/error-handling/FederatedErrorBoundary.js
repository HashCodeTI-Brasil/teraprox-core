import React from 'react';
import FederatedUnavailableCard from './FederatedUnavailableCard';

const isRemoteOffline = (error) =>
    error?.name === 'ScriptExternalLoadError';

const isStaleChunkError = (error) => {
    if (isRemoteOffline(error)) return false;
    const msg = error?.message || '';
    return (
        msg.includes('Loading chunk') ||
        msg.includes('Loading CSS chunk') ||
        msg.includes('Failed to fetch dynamically imported module') ||
        msg.includes('ChunkLoadError')
    );
};

/**
 * ErrorBoundary especializado para Module Federation.
 * Captura erros de rede ou de chunk quando uma aplicação remota cai.
 */
class FederatedErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        if (isRemoteOffline(error)) {
            console.warn('[Federation] Remote offline — exibindo fallback sem reload', error.message);
            return;
        }

        console.error("Erro detectado no Federated Component:", error, errorInfo);

        if (isStaleChunkError(error)) {
            const reloadKey = 'federated_chunk_reload_ts';
            const lastReload = sessionStorage.getItem(reloadKey);
            const now = Date.now();
            if (!lastReload || now - Number(lastReload) > 10000) {
                sessionStorage.setItem(reloadKey, String(now));
                window.location.reload();
            }
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <FederatedUnavailableCard
                    errorMessage={this.state.error?.message}
                    onRetry={this.handleRetry}
                />
            );
        }

        return this.props.children;
    }
}

export default FederatedErrorBoundary;
