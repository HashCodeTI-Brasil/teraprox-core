import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FederatedComponentHost } from './factories/FederatedComponentHOC';
import MenuBar from './Components/Menu/MenuBar';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ServerErrorScreen from './Components/error-handling/ServerErrorScreen';
import LGPDConsentBanner from './Components/LGPDConsentBanner.jsx';
import { clearGlobalError } from './Reducers/default-reducers/globalErrorReducer';
import FederatedLoadingPlaceholder from './Components/loading/FederatedLoadingPlaceholder';
import { useFederatedRoutes } from './hooks/useFederatedRoutes';
import { useSessionRevalidation } from './hooks/useSessionRevalidation';

const homeRoute = '/home';

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const global = useSelector(state => state.global);
    const globalError = useSelector(state => state.errors);
    const isAuth = global?.isAuth;
    const { validating } = useSessionRevalidation();

    const { routes, componentRegistry, menuSections, menuTree, loading } = useFederatedRoutes();

    React.useEffect(() => {
        if (globalError) {
            dispatch(clearGlobalError());
        }
    }, [location.pathname]);

    const isServerError = globalError && (
        globalError.status === undefined ||
        (globalError.status >= 500 && globalError.status < 600)
    );

    return (
        <div className="teraprox-shell">
            {isAuth && !validating && <MenuBar menuSections={menuSections} menuTree={menuTree} />}
            
            {/* 🔒 LGPD Consent Banner — shown on first visit and annually */}
            <LGPDConsentBanner />
            
            <div className={isAuth ? "container-fluid mt-4" : ""}>
                <main>
                    {validating ? (
                        <FederatedLoadingPlaceholder />
                    ) : isServerError ? (
                        <ServerErrorScreen />
                    ) : (
                        <Routes>
                            <Route path="/Login" element={<Login />} />

                            {!isAuth ? (
                                <Route path="*" element={<Navigate to="/Login" replace />} />
                            ) : loading ? (
                                <Route path="*" element={<FederatedLoadingPlaceholder />} />
                            ) : (
                                <>
                                    <Route path="/" element={<Navigate to={homeRoute} replace />} />
                                    <Route path={homeRoute} element={<Home />} />

                                    {routes.map((screen) => (
                                        <Route
                                            key={screen.routePath}
                                            path={screen.routePath}
                                            element={
                                                <FederatedComponentHost
                                                    key={screen.routePath}
                                                    modulePath={screen.modulePath}
                                                    LazyComponent={componentRegistry[screen.modulePath]}
                                                    context={screen.context}
                                                    reducerKeys={screen.reducerKeys}
                                                    hideFooter
                                                />
                                            }
                                        />
                                    ))}

                                    <Route path="*" element={<Navigate to={homeRoute} replace />} />
                                </>
                            )}
                        </Routes>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
