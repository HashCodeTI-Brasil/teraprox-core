import { useState, useEffect } from 'react';
import { loadRemoteManifests } from '../federation/remoteLoader';

/**
 * Hook que carrega os manifests dos remotes e devolve rotas + registry.
 * O App usa isso em vez de listas manuais de federated*Screens.
 */
export function useFederatedRoutes() {
    const [routes, setRoutes] = useState([]);
    const [componentRegistry, setComponentRegistry] = useState({});
    const [menuSections, setMenuSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        loadRemoteManifests()
            .then((result) => {
                if (cancelled) return;
                setRoutes(result.allRoutes);
                setComponentRegistry(result.componentRegistry);
                setMenuSections(result.menuSections);
                setLoading(false);
            })
            .catch((err) => {
                console.error('[useFederatedRoutes] Falha ao carregar manifests:', err);
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    return { routes, componentRegistry, menuSections, loading };
}
