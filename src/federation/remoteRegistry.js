import { lazy } from 'react';

/**
 * Wraps a dynamic import to auto-reload on stale chunk errors
 * (e.g. after a deploy that invalidates bundles).
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

// =====================================================================
// SGP — Telas de Processo
// =====================================================================

const sgpListScreens = {
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
};

const sgpFactoryScreens = {
    'teraprox_app_sgp/Cadernos': lazyWithChunkReload(() => import('teraprox_app_sgp/CadernosFactory').then(m => ({ default: m.CadernosContainer }))),
    'teraprox_app_sgp/RecursoForm': lazyWithChunkReload(() => import('teraprox_app_sgp/RecursoFormFactory')),
    'teraprox_app_sgp/UnidadeForm': lazyWithChunkReload(() => import('teraprox_app_sgp/UnidadeFormFactory').then(m => ({ default: m.UnidadeFormContainer }))),
};

const sgpFormScreens = {
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
};

// =====================================================================
// SGM — Telas de Manutenção
// =====================================================================

const sgmListScreens = {
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
};

const sgmFormScreens = {
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

// =====================================================================
// Solicitações de Serviço — remote independente
// =====================================================================

const solicitacaoListScreens = {
    'teraprox_app_solicitacao/SolicitacoesDeServico': lazyWithChunkReload(() => import('teraprox_app_solicitacao/SolicitacoesDeServico')),
};

const solicitacaoFormScreens = {
    'teraprox_app_solicitacao/SolicitacaoDeServicoForm': lazyWithChunkReload(() => import('teraprox_app_solicitacao/SolicitacaoDeServicoForm')),
};

// =====================================================================
// Registry unificado — lookup por modulePath
// =====================================================================

export const componentRegistry = {
    ...sgpListScreens,
    ...sgpFactoryScreens,
    ...sgpFormScreens,
    ...sgmListScreens,
    ...sgmFormScreens,
    ...solicitacaoListScreens,
    ...solicitacaoFormScreens,
};

/**
 * Resolve o remote name (sgp | sgm | solicitacao) a partir do modulePath.
 */
export const resolveRemoteName = (modulePath) => {
    if (!modulePath) return null;
    if (modulePath.startsWith('teraprox_app_sgm/')) return 'sgm';
    if (modulePath.startsWith('teraprox_app_sgp/')) return 'sgp';
    if (modulePath.startsWith('teraprox_app_solicitacao/')) return 'solicitacao';
    return null;
};
