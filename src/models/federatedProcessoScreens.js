/**
 * Mapeamento das telas do MenuBar do SGP para Module Federation.
 * Os paths aqui devem ser IGUAIS aos paths do SGP (constantes.js).
 */

// === Itens do Menu (telas de navegação principal) ===
export const menuSections = [
    {
        title: 'Engenharia',
        items: [
            { label: 'Processo', routePath: '/processos', modulePath: 'teraprox_app_sgp/Processos', context: 'processo' },
            { label: 'Fluxo', routePath: '/fluxos', modulePath: 'teraprox_app_sgp/Fluxos', context: 'fluxoDeProcesso' },
            { label: 'Operação', routePath: '/operacoes', modulePath: 'teraprox_app_sgp/Operacoes', context: 'fluxoDeProcesso' },
            { label: 'Parâmetro', routePath: '/parametros', modulePath: 'teraprox_app_sgp/ParametrosView', context: 'parametro' },
            { label: 'Plano de Controle', routePath: '/planosDeControle', modulePath: 'teraprox_app_sgp/PlanosDeControle', context: 'planoDeControle' },
        ],
    },
    {
        title: 'Controle de Processo',
        items: [
            { label: 'Cadernos', routePath: '/cadernos', modulePath: 'teraprox_app_sgp/Cadernos', context: 'cadernos' },
            { label: 'CEP', routePath: '/CEP', modulePath: 'teraprox_app_sgp/C-E-P', context: 'cadernoDeVerificacaco' },
            { label: 'Análise Performance', routePath: '/analisePerformanceCp', modulePath: 'teraprox_app_sgp/ReportScreen', context: 'registroDeCampo' },
            { label: 'Ordens de Correção', routePath: '/ordensDeCorrecao', modulePath: 'teraprox_app_sgp/OrdemDeCorrecaoList', context: 'ordemDeCorrecao' },
            { label: 'Dashboard de Consumo de Materiais', routePath: '/consumoDeMateriaPrima', modulePath: 'teraprox_app_sgp/MaterialConsumptionDashboard', context: 'material' },
        ],
    },
];

// === Rotas de formulários (acessíveis via navegação interna, não aparecem no menu) ===
export const formRoutes = [
    { routePath: '/processoForm', modulePath: 'teraprox_app_sgp/ProcessoForm', context: 'processo' },
    { routePath: '/fluxoDeProcessoForm', modulePath: 'teraprox_app_sgp/FluxoDeProcessoForm', context: 'fluxoDeProcesso' },
    { routePath: '/operacaoForm', modulePath: 'teraprox_app_sgp/OperacaoForm', context: 'operacao' },
    { routePath: '/parametroForm', modulePath: 'teraprox_app_sgp/ParametroForm', context: 'parametro' },
    { routePath: '/planoDeControleForm', modulePath: 'teraprox_app_sgp/PlanoDeControleForm', context: 'planoDeControle' },
    { routePath: '/linhaDePlanoDeControleForm', modulePath: 'teraprox_app_sgp/LinhaDePlanoDeControleForm', context: 'linhaDePlanoDeControle' },
    { routePath: '/cadernoDeVerificacaoForm', modulePath: 'teraprox_app_sgp/CadernoDeVerificacaoForm', context: 'cadernoDeVerificacao' },
    { routePath: '/cadernoDeVerificacao/:id', modulePath: 'teraprox_app_sgp/CadernoDeVerificacao', context: 'cadernoDeVerificacao' },
    { routePath: '/reporte/:dataInicio/:dataFim/:caderId', modulePath: 'teraprox_app_sgp/ReportScreen', context: 'registroDeCampo' },
    { routePath: '/ordenacaoDeFolhas', modulePath: 'teraprox_app_sgp/OrdenacaoDeFolhas', context: 'folhaDeVerificacao' },
    { routePath: '/formularios', modulePath: 'teraprox_app_sgp/Formularios', context: 'cadernoDeVerificacaco' },
    { routePath: '/formularioForm', modulePath: 'teraprox_app_sgp/FormularioForm', context: 'cadernoDeVerificacao' },
    { routePath: '/frequenciaForm', modulePath: 'teraprox_app_sgp/FrequenciaForm', context: 'frequencia' },
    { routePath: '/ordemDeCorrecaoForm', modulePath: 'teraprox_app_sgp/OrdemDeCorrecaoForm', context: 'ordemDeCorrecao' },
    { routePath: '/ordensDeCorrecaoApontar', modulePath: 'teraprox_app_sgp/OrdemDeCorrecaoApontar', context: 'ordemDeCorrecao' },
    { routePath: '/regraDeCorrecaoForm', modulePath: 'teraprox_app_sgp/RegraDeCorrecaoForm', context: 'regraDeCorrecao' },
    { routePath: '/registroDeCampoChart', modulePath: 'teraprox_app_sgp/RegistroDeCampoChart', context: 'registroDeCampo' },
    { routePath: '/registroForm', modulePath: 'teraprox_app_sgp/RegistroForm', context: 'registroDeCampo' },
];

// Lista flat de todos os itens do menu (para gerar rotas)
export const menuScreens = menuSections.flatMap((section) => section.items);

// Todas as rotas (menu + formulários)
export const allFederatedRoutes = [...menuScreens, ...formRoutes];

// Rota padrão ao logar
export const defaultRoute = '/processos';
