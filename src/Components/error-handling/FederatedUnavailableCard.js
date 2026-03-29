import React from 'react';
import { Button } from 'react-bootstrap';

const illustrationStyle = {
    width: 220,
    maxWidth: '100%',
};

const containerStyle = {
    maxWidth: 760,
    width: '100%',
    border: '1px solid #d9e5f3',
    background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)',
};

const FederatedUnavailableCard = ({ modulePath, errorMessage, onRetry }) => {
    return (
        <div className="d-flex justify-content-center align-items-center py-4">
            <div className="card shadow-sm" style={containerStyle}>
                <div className="card-body p-4 p-md-5">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-4 text-center">
                            <svg viewBox="0 0 240 180" role="img" aria-label="Tela indisponivel" style={illustrationStyle}>
                                <rect x="20" y="24" width="200" height="132" rx="12" fill="#f3f8ff" stroke="#bfd3ec" />
                                <rect x="36" y="42" width="168" height="14" rx="7" fill="#d9e7f7" />
                                <rect x="36" y="66" width="94" height="10" rx="5" fill="#d9e7f7" />
                                <rect x="36" y="84" width="122" height="10" rx="5" fill="#d9e7f7" />
                                <circle cx="178" cy="105" r="18" fill="#e9f7ef" stroke="#8ec7a0" />
                                <line x1="178" y1="96" x2="178" y2="108" stroke="#2f7d4f" strokeWidth="4" strokeLinecap="round" />
                                <circle cx="178" cy="115" r="2.8" fill="#2f7d4f" />
                            </svg>
                        </div>

                        <div className="col-md-8">
                            <h4 className="mb-2" style={{ color: '#1e4f8c' }}>Tela indisponivel no momento</h4>
                            <p className="mb-2" style={{ color: '#35577f' }}>
                                O modulo responsavel por esta pagina parece estar indisponivel no momento.
                            </p>
                            <p className="mb-3" style={{ color: '#35577f' }}>
                                Tente novamente em alguns minutos.
                            </p>

                            {modulePath ? (
                                <p className="mb-2" style={{ color: '#4b6d95' }}><strong>Modulo:</strong> {modulePath}</p>
                            ) : null}

                            {errorMessage ? (
                                <details className="mb-3">
                                    <summary style={{ cursor: 'pointer', color: '#5e7ea4' }}>Ver detalhe tecnico</summary>
                                    <p className="mt-2 mb-0" style={{ fontSize: 13, color: '#6b7280' }}>
                                        {errorMessage}
                                    </p>
                                </details>
                            ) : null}

                            <Button variant="outline-primary" onClick={onRetry}>Tentar novamente</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FederatedUnavailableCard;
