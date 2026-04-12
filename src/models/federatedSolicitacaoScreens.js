/**
 * Mapeamento das telas de Solicitações de Serviço — remote independente.
 * Remote: teraprox_app_solicitacao (porta 3004 dev, teraprox-solicitacoes.web.app prod)
 */

export const menuSections = [
    {
        title: 'Operação',
        items: [
            {
                label: 'Solicitações de Serviço',
                routePath: '/solicitacoesDeServico',
                modulePath: 'teraprox_app_solicitacao/SolicitacoesDeServico',
                context: 'solicitacaoDeServico',
            },
        ],
    },
];

export const formRoutes = [
    {
        routePath: '/solicitacaoDeServicoForm',
        modulePath: 'teraprox_app_solicitacao/SolicitacaoDeServicoForm',
        context: 'solicitacaoDeServico',
    },
    {
        routePath: '/aprovacaoStatus',
        modulePath: 'teraprox_app_solicitacao/AprovacaoStatus',
        context: 'solicitacaoDeServico',
    },
];

export const menuScreens = menuSections.flatMap((s) => s.items);

export const allFederatedRoutes = [...menuScreens, ...formRoutes];
