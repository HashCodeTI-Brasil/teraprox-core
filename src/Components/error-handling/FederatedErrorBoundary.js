import React from 'react';

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
        // Atualiza o estado para que o próximo render mostre a UI de fallback.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Você pode logar o erro em um serviço de monitoramento aqui
        console.error("Erro detectado no Federated Component:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        // Força o recarregamento (opcional, ou apenas tenta renderizar de novo)
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
