import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { clearGlobalError } from '../../Reducers/default-reducers/globalErrorReducer';

const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #f0f6ff 0%, #ffffff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
};

const cardStyle = {
    maxWidth: 680,
    width: '100%',
    border: '1px solid #d9e5f3',
    background: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(30, 79, 140, 0.08)',
};

const illustrationStyle = {
    width: 180,
    maxWidth: '100%',
};

const ServerErrorScreen = () => {
    const dispatch = useDispatch();

    const handleRetry = () => {
        dispatch(clearGlobalError());
        window.location.reload();
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div className="p-4 p-md-5">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-4 text-center">
                            <svg
                                viewBox="0 0 240 200"
                                role="img"
                                aria-label="Erro interno do servidor"
                                style={illustrationStyle}
                            >
                                {/* Server rack */}
                                <rect x="60" y="40" width="120" height="120" rx="10" fill="#f3f8ff" stroke="#bfd3ec" strokeWidth="2" />
                                <rect x="72" y="56" width="96" height="18" rx="5" fill="#deeaf9" stroke="#a8c4e0" />
                                <rect x="72" y="82" width="96" height="18" rx="5" fill="#deeaf9" stroke="#a8c4e0" />
                                <rect x="72" y="108" width="96" height="18" rx="5" fill="#deeaf9" stroke="#a8c4e0" />
                                {/* Status lights */}
                                <circle cx="152" cy="65" r="5" fill="#f87171" />
                                <circle cx="152" cy="91" r="5" fill="#fbbf24" />
                                <circle cx="152" cy="117" r="5" fill="#94a3b8" />
                                {/* Warning sign */}
                                <circle cx="180" cy="145" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                                <text x="180" y="152" textAnchor="middle" fontSize="20" fill="#d97706" fontWeight="bold">!</text>
                            </svg>
                        </div>

                        <div className="col-md-8">
                            <h4 className="mb-2" style={{ color: '#1e4f8c' }}>
                                Servidor enfrentando instabilidade
                            </h4>
                            <p className="mb-2" style={{ color: '#35577f' }}>
                                Algo inesperado aconteceu no servidor e não foi possível completar sua solicitação.
                            </p>
                            <p className="mb-4" style={{ color: '#35577f' }}>
                                Nossa equipe já foi notificada. Tente novamente em alguns instantes.
                            </p>
                            <Button variant="primary" onClick={handleRetry}>
                                Tentar novamente
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerErrorScreen;
