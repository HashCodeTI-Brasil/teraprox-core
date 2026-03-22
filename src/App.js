import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FederatedComponentHost } from './factories/FederatedComponentHOC';
import MenuBar from './Components/Menu/MenuBar';
import Login from './Screens/Login';
import { allFederatedRoutes as sgpRoutes, defaultRoute } from './models/federatedProcessoScreens';
import { allFederatedRoutes as sgmRoutes } from './models/federatedManutencaoScreens';
import { allFederatedRoutes as cadastroRoutes } from './models/federatedCadastroScreens';

const allFederatedRoutes = [...sgpRoutes, ...sgmRoutes, ...cadastroRoutes];

const App = () => {
    const global = useSelector(state => state.global);
    const isAuth = global?.isAuth;
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
                                <Route path="/" element={<Navigate to={defaultRoute} replace />} />

                                {allFederatedRoutes.map((screen) => (
                                    <Route
                                        key={screen.modulePath}
                                        path={screen.routePath}
                                        element={
                                            <FederatedComponentHost
                                                key={screen.modulePath}
                                                modulePath={screen.modulePath}
                                                context={screen.context}
                                                hideFooter
                                            />
                                        }
                                    />
                                ))}

                                <Route path="*" element={<Navigate to={defaultRoute} replace />} />
                            </>
                        )}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;
