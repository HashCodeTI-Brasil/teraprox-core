import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FederatedComponentHost } from './factories/FederatedComponentHOC';
import MenuBar from './Components/Menu/MenuBar';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ServerErrorScreen from './Components/error-handling/ServerErrorScreen';
import { allFederatedRoutes as sgpRoutes } from './models/federatedProcessoScreens';
import { allFederatedRoutes as sgmRoutes } from './models/federatedManutencaoScreens';
import { allFederatedRoutes as cadastroRoutes } from './models/federatedCadastroScreens';
import { allFederatedRoutes as solicitacaoRoutes } from './models/federatedSolicitacaoScreens';

const allFederatedRoutes = [...sgpRoutes, ...sgmRoutes, ...cadastroRoutes, ...solicitacaoRoutes];
const homeRoute = '/home';

const App = () => {
    const global = useSelector(state => state.global);
    const globalError = useSelector(state => state.errors);
    const isAuth = global?.isAuth;

    const isServerError = globalError && (
        globalError.status === undefined ||   // network error (sem resposta do servidor)
        (globalError.status >= 500 && globalError.status < 600)  // 5xx
    );

    if (isServerError) {
        return <ServerErrorScreen />;
    }

    return (
        <div className="teraprox-shell">
            {isAuth && <MenuBar />}
            <div className={isAuth ? "container-fluid mt-4" : ""}>
                <main>
                    <Routes>
                        <Route path="/Login" element={<Login />} />

                        {!isAuth ? (
                            <Route path="*" element={<Navigate to="/Login" replace />} />
                        ) : (
                            <>
                                <Route path="/" element={<Navigate to={homeRoute} replace />} />
                                <Route path={homeRoute} element={<Home />} />

                                {allFederatedRoutes.map((screen) => (
                                    <Route
                                        key={screen.routePath}
                                        path={screen.routePath}
                                        element={
                                            <FederatedComponentHost
                                                key={screen.routePath}
                                                modulePath={screen.modulePath}
                                                context={screen.context}
                                                hideFooter
                                            />
                                        }
                                    />
                                ))}

                                <Route path="*" element={<Navigate to={homeRoute} replace />} />
                            </>
                        )}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;
