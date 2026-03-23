export const endPointRabbit = "https://api-rabbit.teraprox.com"
export const endPointNotification = "https://teraprox-gateway-7ggpsfrixq-rj.a.run.app/notification/"
export const endPointCaderno = "https://teraprox-gateway-7ggpsfrixq-rj.a.run.app/processo/"
export const endPointManutencao = "https://teraprox-gateway-7ggpsfrixq-rj.a.run.app/manutencao/"
export const endPointUser = "https://teraprox-gateway-7ggpsfrixq-rj.a.run.app/user/"
export const endPointTimer = "https://api-timer.teraprox.com/"

export const paths = {
    // Login / User
    loginForm: "/Login",
    menu: "/menu",
    acessoNaoPermitido: "/acessoNaoPermitido",
    // Engenharia
    processos: "/processos",
    processoForm: "/processoForm",
    fluxos: "/fluxos",
    fluxoDeProcessoForm: "/fluxoDeProcessoForm",
    operacoes: "/operacoes",
    operacaoForm: "/operacaoForm",
    parametros: "/parametros",
    parametroForm: "/parametroForm",
    planosDeControle: "/planosDeControle",
    planoDeControleForm: "/planoDeControleForm",
    linhaDePlanoDeControleForm: "/linhaDePlanoDeControleForm",
    // Controle de Processo
    cadernos: "/cadernos",
    cadernoDeVerificacao: "/cadernoDeVerificacao",
    reporte: "/reporte/:dataInicio/:dataFim/:caderId",
    cadernoDeVerificacaoForm: "/cadernoDeVerificacaoForm",
    ordenacaoDeFolhas: "/ordenacaoDeFolhas",
    formularios: "/formularios",
    formularioForm: "/formularioForm",
    C_E_P: "/CEP",
    analisePerformanceCp: "/analisePerformanceCp",
    ordensDeCorrecao: "/ordensDeCorrecao",
    ordemDeCorrecaoForm: "/ordemDeCorrecaoForm",
    ordemDeCorrecaoApontar: "/ordensDeCorrecaoApontar",
    regraDeCorrecaoForm: "/regraDeCorrecaoForm",
    registroDeCampoChart: "/registroDeCampoChart",
    materialConsumptionDashboard: "/consumoDeMateriaPrima",
    // Cadastros
    recursos: "/recursos",
    recursoForm: "/recursoForm",
    acoes: "/acoes",
    acaoForm: "/acaoForm",
    materiais: "/materiais",
    materialForm: "/materialForm",
    unidades: "/unidades",
    unidadeForm: "/unidadeForm",
    frequenciaForm: "/frequenciaForm",
    setorForm: "/setorForm",
    turnoForm: "/turnoForm",
    registroForm: "/registroForm",
    // === Manutenção (SGM) ===
    visaoGeralManutencao: "/ordemDeServico/overview",
    agregadores: "/agregadores",
    planejamentoDeOs: "/planejamentoDeOs",
    ordensDeServico: "/ordensDeServico",
    ordensDeManutencao: "/ordensDeManutencao",
    solicitacoesDeServico: "/solicitacoesDeServico",
    monitoramentoRecursos: "/monitoramento-recursos",
    arvoreEstruturalForm: "/arvoreEstruturalForm",
    tarefas: "/tarefas",
    tarefaForm: "/tarefaForm",
    modelosDeOrdemDeServico: "/modelosDeOrdemDeServico",
    mantenedores: "/mantenedores",
    mantenedorForm: "/mantenedorForm",
    tiposDeOrdem: "/tiposDeOrdem",
    tipoDeOrdemForm: "/tipoDeOrdemForm",
    osChart: "/osChart",
    inspecoesDashboard: "/inspecoesDashboard",
    visaoGeralDeMateriaPrima: "/visaoGeralDeMateriaPrima",
    ordemDeServicoFormV2: "/ordemDeServicoFormV2",
    ordemDeManutencaoForm: "/ordemDeManutencaoForm",
    executarOrdemDeManutencao: "/executarOrdemDeManutencao",
    solicitacaoDeServicoForm: "/solicitacaoDeServicoForm",
    branchLevelForm: "/branchLevelForm",
    componenteForm: "/componenteForm",
    classeDeComponenteForm: "/classeDeComponenteForm",
    classeDeRecursoForm: "/classeDeRecursoForm",
    modoDeFalhaForm: "/modoDeFalhaForm",
    registroDeTarefaForm: "/registroDeTarefaForm",
    dimensaoForm: "/dimensaoForm",
    aprovaStatus: "/aprovacaoStatus",
}

export const ids = {
    menuBar: {
        processoDropdownMenu: "processoDropdownMenu",
        manutencaoDropdownMenu: "manutencaoDropdownMenu",
        cadastrosDropdownMenu: "cadastrosDropdownMenu",
    }
}

export const version = "1.0.0-host"
