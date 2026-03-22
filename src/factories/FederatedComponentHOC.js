import React, { lazy, Suspense, useState, useCallback, useMemo, useEffect, useContext } from 'react';
import { useWebProvider } from '../hooks/useWebProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useStore } from 'react-redux';
import { WebProvider as CoreWebProvider } from '../websocket/wsProvider';
import FederatedErrorBoundary from '../Components/error-handling/FederatedErrorBoundary';
import FederatedLoadingPlaceholder from '../Components/loading/FederatedLoadingPlaceholder';

/**
 * Wraps a dynamic import to auto-reload on stale chunk errors.
 */
const lazyWithChunkReload = (importFn) => {
    return lazy(() =>
        importFn().catch((error) => {
            const msg = error?.message || '';
            const isChunkError =
                msg.includes('Loading chunk') ||
                msg.includes('Loading CSS chunk') ||
                msg.includes('ChunkLoadError') ||
                msg.includes('Failed to fetch dynamically imported module');

            if (isChunkError) {
                const reloadKey = 'federated_chunk_reload_ts';
                const lastReload = sessionStorage.getItem(reloadKey);
                const now = Date.now();
                if (!lastReload || now - Number(lastReload) > 10000) {
                    sessionStorage.setItem(reloadKey, String(now));
                    window.location.reload();
                    return new Promise(() => {});
                }
            }
            throw error;
        })
    );
};

/**
 * Registro de componentes federados conhecidos.
 * Webpack requer strings estáticas para Module Federation no build time.
 * 
 * Telas que precisam de useWebInterface usam as Factories (DI de controller).
 * As demais telas usam useWebProvider() internamente, que funciona via FederatedBridge.
 */
const componentRegistry = {
    // === Telas de listagem (Menu) ===
    'teraprox_app_sgp/Processos': lazyWithChunkReload(() => import('teraprox_app_sgp/Processos')),
    'teraprox_app_sgp/Fluxos': lazyWithChunkReload(() => import('teraprox_app_sgp/Fluxos')),
    'teraprox_app_sgp/Operacoes': lazyWithChunkReload(() => import('teraprox_app_sgp/Operacoes')),
    'teraprox_app_sgp/ParametrosView': lazyWithChunkReload(() => import('teraprox_app_sgp/ParametrosView')),
    'teraprox_app_sgp/PlanosDeControle': lazyWithChunkReload(() => import('teraprox_app_sgp/PlanosDeControle')),
    'teraprox_app_sgp/C-E-P': lazyWithChunkReload(() => import('teraprox_app_sgp/C-E-P')),
    'teraprox_app_sgp/ReportScreen': lazyWithChunkReload(() => import('teraprox_app_sgp/ReportScreen')),
    'teraprox_app_sgp/OrdemDeCorrecaoList': lazyWithChunkReload(() => import('teraprox_app_sgp/OrdemDeCorrecaoList')),
    'teraprox_app_sgp/MaterialConsumptionDashboard': lazyWithChunkReload(() => import('teraprox_app_sgp/MaterialConsumptionDashboard')),
    'teraprox_app_sgp/Recursos': lazyWithChunkReload(() => import('teraprox_app_sgp/Recursos')),
    'teraprox_app_sgp/Acoes': lazyWithChunkReload(() => import('teraprox_app_sgp/Acoes')),
    'teraprox_app_sgp/Materiais': lazyWithChunkReload(() => import('teraprox_app_sgp/Materiais')),
    'teraprox_app_sgp/Unidades': lazyWithChunkReload(() => import('teraprox_app_sgp/Unidades')),
    // === Telas com Factory (useWebInterface - inject controller) ===
    'teraprox_app_sgp/Cadernos': lazyWithChunkReload(() => import('teraprox_app_sgp/CadernosFactory').then(m => ({ default: m.CadernosContainer }))),
    'teraprox_app_sgp/RecursoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/RecursoFormFactory')),
    'teraprox_app_sgp/UnidadeForm': lazyWithChunkReload(() => import('teraprox_app_sgp/UnidadeFormFactory').then(m => ({ default: m.UnidadeFormContainer }))),
    // === Formulários ===
    'teraprox_app_sgp/ProcessoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/ProcessoForm')),
    'teraprox_app_sgp/FluxoDeProcessoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/FluxoDeProcessoForm')),
    'teraprox_app_sgp/OperacaoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/OperacaoForm')),
    'teraprox_app_sgp/ParametroForm': lazyWithChunkReload(() => import('teraprox_app_sgp/ParametroForm')),
    'teraprox_app_sgp/PlanoDeControleForm': lazyWithChunkReload(() => import('teraprox_app_sgp/PlanoDeControleForm')),
    'teraprox_app_sgp/LinhaDePlanoDeControleForm': lazyWithChunkReload(() => import('teraprox_app_sgp/LinhaDePlanoDeControleForm')),
    'teraprox_app_sgp/CadernoDeVerificacaoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/CadernoDeVerificacaoForm')),
    'teraprox_app_sgp/CadernoDeVerificacao': lazyWithChunkReload(() => import('teraprox_app_sgp/CadernoDeVerificacao')),
    'teraprox_app_sgp/OrdenacaoDeFolhas': lazyWithChunkReload(() => import('teraprox_app_sgp/OrdenacaoDeFolhas')),
    'teraprox_app_sgp/Formularios': lazyWithChunkReload(() => import('teraprox_app_sgp/Formularios')),
    'teraprox_app_sgp/FormularioForm': lazyWithChunkReload(() => import('teraprox_app_sgp/FormularioForm')),
    'teraprox_app_sgp/AcaoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/AcaoForm')),
    'teraprox_app_sgp/MaterialForm': lazyWithChunkReload(() => import('teraprox_app_sgp/MaterialForm')),
    'teraprox_app_sgp/FrequenciaForm': lazyWithChunkReload(() => import('teraprox_app_sgp/FrequenciaForm')),
    'teraprox_app_sgp/SetorForm': lazyWithChunkReload(() => import('teraprox_app_sgp/SetorForm')),
    'teraprox_app_sgp/TurnoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/TurnoForm')),
    'teraprox_app_sgp/OrdemDeCorrecaoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/OrdemDeCorrecaoForm')),
    'teraprox_app_sgp/OrdemDeCorrecaoApontar': lazyWithChunkReload(() => import('teraprox_app_sgp/OrdemDeCorrecaoApontar')),
    'teraprox_app_sgp/RegraDeCorrecaoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/RegraDeCorrecaoForm')),
    'teraprox_app_sgp/RegistroDeCampoChart': lazyWithChunkReload(() => import('teraprox_app_sgp/RegistroDeCampoChart')),
    'teraprox_app_sgp/RegistroForm': lazyWithChunkReload(() => import('teraprox_app_sgp/RegistroForm')),

    // ====================================================================
    // === SGM - Manutenção: Telas de listagem (Menu) ===
    // ====================================================================
    'teraprox_app_sgm/VisaoGeral': lazyWithChunkReload(() => import('teraprox_app_sgm/VisaoGeral')),
    'teraprox_app_sgm/Agregador': lazyWithChunkReload(() => import('teraprox_app_sgm/Agregador')),
    'teraprox_app_sgm/PlanejamentoDeOsComFiltrosAvancados': lazyWithChunkReload(() => import('teraprox_app_sgm/PlanejamentoDeOsComFiltrosAvancados')),
    'teraprox_app_sgm/OrdensDeServico': lazyWithChunkReload(() => import('teraprox_app_sgm/OrdensDeServico')),
    'teraprox_app_sgm/OrdensDeManutencao': lazyWithChunkReload(() => import('teraprox_app_sgm/OrdensDeManutencao')),
    'teraprox_app_sgm/SolicitacoesDeServico': lazyWithChunkReload(() => import('teraprox_app_sgm/SolicitacoesDeServico')),
    'teraprox_app_sgm/MonitoramentoRecursos': lazyWithChunkReload(() => import('teraprox_app_sgm/MonitoramentoRecursos')),
    'teraprox_app_sgm/ArvoreEstruturalFormV2': lazyWithChunkReload(() => import('teraprox_app_sgm/ArvoreEstruturalFormV2')),
    'teraprox_app_sgm/Acoes': lazyWithChunkReload(() => import('teraprox_app_sgm/Acoes')),
    'teraprox_app_sgm/Tarefas': lazyWithChunkReload(() => import('teraprox_app_sgm/Tarefas')),
    'teraprox_app_sgm/Materiais': lazyWithChunkReload(() => import('teraprox_app_sgm/Materiais')),
    'teraprox_app_sgm/Unidades': lazyWithChunkReload(() => import('teraprox_app_sgm/Unidades')),
    'teraprox_app_sgm/ModelosDeOrdemDeServico': lazyWithChunkReload(() => import('teraprox_app_sgm/ModelosDeOrdemDeServico')),
    'teraprox_app_sgm/Mantenedores': lazyWithChunkReload(() => import('teraprox_app_sgm/Mantenedores')),
    'teraprox_app_sgm/TiposDeOrdem': lazyWithChunkReload(() => import('teraprox_app_sgm/TiposDeOrdem')),
    'teraprox_app_sgm/OsChart': lazyWithChunkReload(() => import('teraprox_app_sgm/OsChart')),
    'teraprox_app_sgm/Inspecoes': lazyWithChunkReload(() => import('teraprox_app_sgm/Inspecoes')),
    'teraprox_app_sgm/VisaoGeralDeMateriaPrima': lazyWithChunkReload(() => import('teraprox_app_sgm/VisaoGeralDeMateriaPrima')),
    // === SGM - Formulários ===
    'teraprox_app_sgm/AcaoForm': lazyWithChunkReload(() => import('teraprox_app_sgm/AcaoForm')),
    'teraprox_app_sgm/TarefaForm': lazyWithChunkReload(() => import('teraprox_app_sgm/TarefaForm')),
    'teraprox_app_sgm/MaterialForm': lazyWithChunkReload(() => import('teraprox_app_sgm/MaterialForm')),
    'teraprox_app_sgm/UnidadeForm': lazyWithChunkReload(() => import('teraprox_app_sgm/UnidadeForm')),
    'teraprox_app_sgm/MantenedorForm': lazyWithChunkReload(() => import('teraprox_app_sgm/MantenedorForm')),
    'teraprox_app_sgm/TipoDeOrdemForm': lazyWithChunkReload(() => import('teraprox_app_sgm/TipoDeOrdemForm')),
    'teraprox_app_sgm/SolicitacaoDeServicoForm': lazyWithChunkReload(() => import('teraprox_app_sgm/SolicitacaoDeServicoForm')),
    'teraprox_app_sgm/OrdemDeServicoFormV2': lazyWithChunkReload(() => import('teraprox_app_sgm/OrdemDeServicoFormV2')),
    'teraprox_app_sgm/OrdemDeManutencaoForm': lazyWithChunkReload(() => import('teraprox_app_sgm/OrdemDeManutencaoForm')),
    'teraprox_app_sgm/ExecutarOrdemDeManutencao': lazyWithChunkReload(() => import('teraprox_app_sgm/ExecutarOrdemDeManutencao')),
    'teraprox_app_sgm/RecursoFormV2': lazyWithChunkReload(() => import('teraprox_app_sgm/RecursoFormV2')),
    'teraprox_app_sgm/BranchLevelForm': lazyWithChunkReload(() => import('teraprox_app_sgm/BranchLevelForm')),
    'teraprox_app_sgm/ComponenteForm': lazyWithChunkReload(() => import('teraprox_app_sgm/ComponenteForm')),
    'teraprox_app_sgm/ClasseDeComponenteForm': lazyWithChunkReload(() => import('teraprox_app_sgm/ClasseDeComponenteForm')),
    'teraprox_app_sgm/ClasseDeRecursoForm': lazyWithChunkReload(() => import('teraprox_app_sgm/ClasseDeRecursoForm')),
    'teraprox_app_sgm/ModoDeFalhaForm': lazyWithChunkReload(() => import('teraprox_app_sgm/ModoDeFalhaForm')),
    'teraprox_app_sgm/RegistroDeTarefaForm': lazyWithChunkReload(() => import('teraprox_app_sgm/RegistroDeTarefaForm')),
    'teraprox_app_sgm/DimensaoPicker': lazyWithChunkReload(() => import('teraprox_app_sgm/DimensaoPicker')),
    'teraprox_app_sgm/AprovacaoStatus': lazyWithChunkReload(() => import('teraprox_app_sgm/AprovacaoStatus')),
    'teraprox_app_sgm/OrdemDeServico': lazyWithChunkReload(() => import('teraprox_app_sgm/OrdemDeServico')),
    'teraprox_app_sgm/SetorForm': lazyWithChunkReload(() => import('teraprox_app_sgm/SetorForm')),
    'teraprox_app_sgm/TurnoForm': lazyWithChunkReload(() => import('teraprox_app_sgm/TurnoForm')),
};

/**
 * @param {string} modulePath - Caminho do módulo federado (ex: 'teraprox_app_sgp/AcaoForm')
 * @param {string} actionEndPoint - Endpoint para a ação de salvar (ex: 'acao')
 * @param {boolean} hideFooter - Se true, não renderiza a barra de botões Salvar/Cancelar
 * @param {object} props - Outras props para passar ao componente remoto
 */
export const FederatedComponentHost = ({ modulePath, actionEndPoint, hideFooter, ...props }) => {
    const webProvider = useWebProvider();
    const coreWebProviderRaw = useContext(CoreWebProvider);
    const store = useStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [ready, setReady] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [BridgeComponent, setBridgeComponent] = useState(null);

    const context = props?.context;

    // Resolve o componente a partir do registro
    const RemoteComponent = useMemo(() => {
        if (!modulePath) return null;
        return componentRegistry[modulePath];
    }, [modulePath]);

    // Memorizar initialData vindo da location
    const initialData = useMemo(() => location.state?.initialData || {}, [location.state?.initialData]);

    // Estado local no Host para os dados do formulário remoto
    const [formData, setFormData] = useState(initialData);

    // Detecta qual remote este módulo pertence (para validar bridge)
    const expectedRemote = useMemo(() => {
        if (!modulePath) return null;
        if (modulePath.startsWith('teraprox_app_sgm/')) return 'sgm';
        if (modulePath.startsWith('teraprox_app_sgp/')) return 'sgp';
        return null;
    }, [modulePath]);
    const [bridgeRemote, setBridgeRemote] = useState(null);

    // Reset quando modulePath muda (ex: navegação SGP → SGM)
    useEffect(() => {
        setReady(false);
        setLoadError(null);
        setBridgeComponent(null);
        setBridgeRemote(null);
    }, [modulePath]);

    useEffect(() => {
        let active = true;

        const loadRemoteInfra = async () => {
            try {
                // Determina qual remote carregar com base no modulePath
                const isSGM = modulePath?.startsWith('teraprox_app_sgm/');

                const loadSGPInfra = () => Promise.all([
                    import('teraprox_app_sgp/ReducersBundle'),
                    import('teraprox_app_sgp/FederatedBridge'),
                ]);

                const loadSGMInfra = () => Promise.all([
                    import('teraprox_app_sgm/ReducersBundle'),
                    import('teraprox_app_sgm/FederatedBridge'),
                ]);

                const [remoteModule, bridgeModule] = isSGM
                    ? await loadSGMInfra()
                    : await loadSGPInfra();

                let remoteReducers = {};
                if (typeof remoteModule?.getReducersForModule === 'function') {
                    try {
                        remoteReducers = await remoteModule.getReducersForModule({ modulePath, context });
                    } catch (error) {
                        console.warn('Falha ao carregar reducers granulares; aplicando fallback completo.', error);
                        if (typeof remoteModule?.loadAllReducers === 'function') {
                            remoteReducers = await remoteModule.loadAllReducers();
                        }
                    }
                } else {
                    remoteReducers = remoteModule?.baseReducers || remoteModule?.default || {};
                }

                Object.entries(remoteReducers).forEach(([key, reducer]) => {
                    if (store?.injectReducer && !store?.asyncReducers?.[key]) {
                        store.injectReducer(key, reducer);
                    }
                });

                // Verifica se o reducer do contexto foi injetado com sucesso
                if (context && !store.getState()[context]) {
                    console.warn(`Reducer para contexto '${context}' não encontrado no store após injeção. Reducers carregados:`, Object.keys(remoteReducers));
                }

                if (active) {
                    setBridgeComponent(() => bridgeModule.default);
                    setBridgeRemote(isSGM ? 'sgm' : 'sgp');
                    setReady(true);
                }
            } catch (error) {
                console.error('Falha ao carregar infraestrutura remota:', error);
                
                // Se é erro de chunk stale, recarrega a página para obter bundles novos
                const msg = error?.message || '';
                const isChunkError =
                    msg.includes('Loading chunk') ||
                    msg.includes('Loading CSS chunk') ||
                    msg.includes('ChunkLoadError') ||
                    msg.includes('Failed to fetch dynamically imported module');

                if (isChunkError) {
                    const reloadKey = 'federated_chunk_reload_ts';
                    const lastReload = sessionStorage.getItem(reloadKey);
                    const now = Date.now();
                    if (!lastReload || now - Number(lastReload) > 10000) {
                        sessionStorage.setItem(reloadKey, String(now));
                        window.location.reload();
                        return;
                    }
                }

                if (active) {
                    setLoadError(error);
                }
            }
        };

        loadRemoteInfra();
        return () => { active = false; };
    }, [store, modulePath, context, retryCount]);

    const handleDataChange = useCallback((data) => {
        setFormData(prev => {
            if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
            return data;
        });
    }, []);

    const save = () => {
        webProvider.basicController(actionEndPoint).post(null, formData);
    };

    const cancelar = () => {
        navigate(-1);
    };

    if (!RemoteComponent) {
        return (
            <div className="alert alert-warning">
                Módulo federado não encontrado: <strong>{modulePath}</strong>.
                Certifique-se de registrá-lo no <code>FederatedComponentHOC.js</code>.
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
                    <Button variant="outline-danger" className="mt-2" onClick={() => { setLoadError(null); setRetryCount(c => c + 1); }}>
                        Tentar Novamente
                    </Button>
                </div>
            </FederatedErrorBoundary>
        );
    }

    if (!ready) {
        return <FederatedLoadingPlaceholder />;
    }

    // Guard: se o bridge não corresponde ao módulo atual, aguardar recarga
    if (expectedRemote && bridgeRemote && bridgeRemote !== expectedRemote) {
        return <FederatedLoadingPlaceholder />;
    }

    const remoteContent = (
        <Suspense fallback={<FederatedLoadingPlaceholder />}>
            <RemoteComponent
                initialData={initialData}
                onDataChange={handleDataChange}
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

            {!hideFooter && (
                <div className="mt-4 border-top pt-3 d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={cancelar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Salvar
                    </Button>
                </div>
            )}
        </div>
    );
};

// Mantém o alias para compatibilidade
export const FederatedAcaoForm = (props) => (
    <FederatedComponentHost modulePath="teraprox_app_sgp/AcaoForm" actionEndPoint="acao" {...props} />
);
