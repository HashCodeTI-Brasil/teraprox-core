/**
 * Mapeamento das telas de Cadastros compartilhadas entre SGP e SGM.
 * Estas telas são comuns a ambos os módulos e aparecem na aba "Cadastros" do MenuBar.
 *
 * Padrão Pai/Filho:
 *   - Recurso: Pai = SGM (GET prioritário na API de manutenção), lista vem do SGP.
 *   - Ações, Materiais, Unidades: SGM como fonte.
 */

// === Itens do Menu (telas de navegação principal) ===
export const menuSections = [
    {
        title: 'Cadastros',
        items: [
            { label: 'Recursos', routePath: '/recursos', modulePath: 'teraprox_app_sgp/Recursos', context: 'recurso' },
            { label: 'Ações', routePath: '/acoes', modulePath: 'teraprox_app_sgm/Acoes', context: 'acao' },
            { label: 'Tarefas', routePath: '/tarefas', modulePath: 'teraprox_app_sgm/Tarefas', context: 'tarefa' },
            { label: 'Materiais', routePath: '/materiais', modulePath: 'teraprox_app_sgm/Materiais', context: 'materiais' },
            { label: 'Unidades', routePath: '/unidades', modulePath: 'teraprox_app_sgm/Unidades', context: 'unidade' },
        ],
    },
];

// === Rotas de formulários de cadastro (acessíveis via navegação interna, não aparecem no menu) ===
export const formRoutes = [
    { routePath: '/recursoForm', modulePath: 'teraprox_app_sgm/RecursoFormV2', context: 'recurso' },
    { routePath: '/acaoForm', modulePath: 'teraprox_app_sgm/AcaoForm', context: 'acao' },
    { routePath: '/tarefaForm', modulePath: 'teraprox_app_sgm/TarefaForm', context: 'tarefa' },
    { routePath: '/materialForm', modulePath: 'teraprox_app_sgm/MaterialForm', context: 'turno' },
    { routePath: '/unidadeForm', modulePath: 'teraprox_app_sgm/UnidadeForm', context: 'unidade' },
    { routePath: '/setorForm', modulePath: 'teraprox_app_sgm/SetorForm', context: 'setor' },
    { routePath: '/turnoForm', modulePath: 'teraprox_app_sgm/TurnoForm', context: 'turno' },
];

// Lista flat de todos os itens do menu (para gerar rotas)
export const menuScreens = menuSections.flatMap((section) => section.items);

// Todas as rotas (menu + formulários)
export const allFederatedRoutes = [...menuScreens, ...formRoutes];
