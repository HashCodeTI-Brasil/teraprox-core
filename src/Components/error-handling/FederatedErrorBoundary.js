import React from 'react';

const isChunkLoadError = (error) => {
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
        console.error("Erro detectado no Federated Component:", error, errorInfo);

        // Auto-reload para erros de chunk stale (deploy novo invalidou bundles)
        if (isChunkLoadError(error)) {
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
                <div className="alert alert-danger p-4 border-danger shadow-sm">
                    <h4 className="alert-heading">Falha ao Carregar Componente</h4>
                    <p>
                        Não foi possível carregar o formulário remoto. Provavelmente o servidor de origem está offline.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">Erro: {this.state.error?.message}</small>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={this.handleRetry}
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default FederatedErrorBoundary;
