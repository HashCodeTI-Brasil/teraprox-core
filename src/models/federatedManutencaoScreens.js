/**
 * Mapeamento das telas do MenuBar do SGM para Module Federation.
 * Os paths aqui devem ser IGUAIS aos paths do SGM (constantes.js).
 */

// === Itens do Menu (telas de navegação principal) ===
export const menuSections = [
    {
        title: 'Operação',
        items: [
            { label: 'Visão Geral', routePath: '/ordemDeServico/overview', modulePath: 'teraprox_app_sgm/VisaoGeral', context: 'visaoGeral' },
            { label: 'Contadores', routePath: '/agregadores', modulePath: 'teraprox_app_sgm/Agregador', context: 'agregador' },
            { label: 'Planejamento', routePath: '/planejamentoDeOs', modulePath: 'teraprox_app_sgm/PlanejamentoDeOsComFiltrosAvancados', context: 'ordemDeServico' },
            { label: 'Ordens de Serviço', routePath: '/ordensDeServico', modulePath: 'teraprox_app_sgm/OrdensDeServico', context: 'ordemDeServico' },
            { label: 'Ordens de Manutenção', routePath: '/ordensDeManutencao', modulePath: 'teraprox_app_sgm/OrdensDeManutencao', context: 'ordemDeManutencao' },
            { label: 'Solicitações de Serviço', routePath: '/solicitacoesDeServico', modulePath: 'teraprox_app_sgm/SolicitacoesDeServico', context: 'solicitacaoDeServico' },
            { label: 'Monitoramento de Ativos', routePath: '/monitoramento-recursos', modulePath: 'teraprox_app_sgm/MonitoramentoRecursos', context: 'monitoramentoRecursos' },
        ],
    },
    {
        title: 'Ativos',
        items: [
            { label: 'Árvore Estrutural', routePath: '/arvoreEstruturalForm', modulePath: 'teraprox_app_sgm/ArvoreEstruturalFormV2', context: 'arvoreEstrutural' },
        ],
    },
    {
        title: 'Cadastros',
        items: [
            { label: 'Modelos de OS', routePath: '/modelosDeOrdemDeServico', modulePath: 'teraprox_app_sgm/ModelosDeOrdemDeServico', context: 'ordemDeServico' },
            { label: 'Mantenedores', routePath: '/mantenedores', modulePath: 'teraprox_app_sgm/Mantenedores', context: 'mantenedor' },
            { label: 'Tipo de Ordem', routePath: '/tiposDeOrdem', modulePath: 'teraprox_app_sgm/TiposDeOrdem', context: 'unidade' },
        ],
    },
    {
        title: 'Indicadores',
        items: [
            { label: 'Indicadores de OS', routePath: '/osChart', modulePath: 'teraprox_app_sgm/OsChart', context: 'ordemDeServico' },
            { label: 'Indicadores de Inspeção', routePath: '/inspecoesDashboard', modulePath: 'teraprox_app_sgm/Inspecoes', context: 'inspecao' },
            { label: 'Consumo de M.P', routePath: '/visaoGeralDeMateriaPrima', modulePath: 'teraprox_app_sgm/VisaoGeralDeMateriaPrima', context: 'ordemDeServico' },
        ],
    },
];

// === Rotas de formulários (acessíveis via navegação interna, não aparecem no menu) ===
export const formRoutes = [
    { routePath: '/mantenedorForm', modulePath: 'teraprox_app_sgm/MantenedorForm', context: 'mantenedor' },
    { routePath: '/tipoDeOrdemForm', modulePath: 'teraprox_app_sgm/TipoDeOrdemForm', context: 'tipoDeOrdem' },
    { routePath: '/solicitacaoDeServicoForm', modulePath: 'teraprox_app_sgm/SolicitacaoDeServicoForm', context: 'solicitacaoDeServico' },
    { routePath: '/ordemDeServicoFormV2', modulePath: 'teraprox_app_sgm/OrdemDeServicoFormV2', context: 'ordemDeServico' },
    { routePath: '/ordemDeManutencaoForm', modulePath: 'teraprox_app_sgm/OrdemDeManutencaoForm', context: 'ordemDeManutencao' },
    { routePath: '/executarOrdemDeManutencao/:id', modulePath: 'teraprox_app_sgm/ExecutarOrdemDeManutencao', context: 'ordemDeManutencao' },
    { routePath: '/branchLevelForm', modulePath: 'teraprox_app_sgm/BranchLevelForm', context: 'branchLevel' },
    { routePath: '/componenteForm', modulePath: 'teraprox_app_sgm/ComponenteForm', context: 'componente' },
    { routePath: '/classeDeComponenteForm', modulePath: 'teraprox_app_sgm/ClasseDeComponenteForm', context: 'classeDeComponente' },
    { routePath: '/classeDeRecursoForm', modulePath: 'teraprox_app_sgm/ClasseDeRecursoForm', context: 'classeDeRecurso' },
    { routePath: '/modoDeFalhaForm', modulePath: 'teraprox_app_sgm/ModoDeFalhaForm', context: 'modoDeFalha' },
    { routePath: '/registroDeTarefaForm', modulePath: 'teraprox_app_sgm/RegistroDeTarefaForm', context: 'registroDeTarefa' },
    { routePath: '/dimensaoForm', modulePath: 'teraprox_app_sgm/DimensaoPicker', context: 'dimensao' },
    { routePath: '/aprovacaoStatus', modulePath: 'teraprox_app_sgm/AprovacaoStatus', context: 'solicitacaoDeServico' },
    { routePath: '/ordemDeServico/:id', modulePath: 'teraprox_app_sgm/OrdemDeServico', context: 'tarefa' },
];

// Lista flat de todos os itens do menu (para gerar rotas)
export const menuScreens = menuSections.flatMap((section) => section.items);

// Todas as rotas (menu + formulários)
export const allFederatedRoutes = [...menuScreens, ...formRoutes];
