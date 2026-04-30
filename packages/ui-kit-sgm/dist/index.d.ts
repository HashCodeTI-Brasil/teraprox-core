import React from 'react';
import * as teraprox_core_sdk from 'teraprox-core-sdk';
import { UnidadeMaterialValue, IUnidadeMaterialViewModel, InspecaoValue, IInspecaoModalViewModel, IRecursoDisplayerViewModel, IFindRecursoByTagViewModel, HttpController, ITarefaItemViewModel, TarefaItemMode, IMantenedorPickerViewModel, MantenedorOption, IPickMantenedorTipoViewModel, PickMantenedorOption, PickTipoDeOrdemOption } from 'teraprox-core-sdk';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * UnidadeMaterialModal — modal composto para adicionar/editar uma
 * composição Unidade-Material de uma tarefa.
 *
 * Consome a Port `IUnidadeMaterialViewModel` (core-sdk). Nao acessa
 * Redux/useSelector/useDispatch/useCoreService diretamente — toda a
 * lógica de estado vive no adapter hexagonal.
 *
 * Wave 1 fase 2 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */
interface UnidadeMaterialModalProps {
    show: boolean;
    onClose: () => void;
    onConfirmed: (dto: UnidadeMaterialValue) => void | Promise<void>;
    vm: IUnidadeMaterialViewModel;
    title?: string;
    primaryLabel?: string;
}
declare const UnidadeMaterialModal: React.FC<UnidadeMaterialModalProps>;

/**
 * InspecaoModal — modal composto para adicionar/editar uma Inspecao
 * de uma Tarefa. Consome a Port `IInspecaoModalViewModel` (core-sdk).
 *
 * A UI nao acessa Redux/useSelector/useDispatch diretamente. Os dados
 * externos (listas, componente de limites) sao injetados via props —
 * o caller e responsavel por carregar `tiposDeDado` e `parametrosOps`
 * e por fornecer o `renderLimitesDeControle` (que vive em SGM-OS).
 *
 * Wave 1 fase 2 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */
interface InspecaoModalProps {
    show: boolean;
    onClose: () => void;
    onConfirmed: (dto: InspecaoValue) => void | Promise<void>;
    vm: IInspecaoModalViewModel;
    title?: string;
    primaryLabel?: string;
    /** Lista de tipos de dado para o AutoComplete (ex: tiposDeCampo filtrado) */
    tiposDeDado: Array<{
        nome: string;
        type?: string;
    }>;
    /** Lista de parametros pre-cadastrados (carregados pelo caller via useEffect) */
    parametrosOps: Array<{
        nome: string;
        labelUnidade?: string;
        id?: string;
        [k: string]: any;
    }>;
    /** Callback para carregar unidades sob demanda */
    loadUnidadesFunc: () => Promise<any[]>;
    /**
     * Componente de Limites de Controle (LimiteDeControlePicker) — o caller
     * injeta porque vive em SGM-OS. Opcional. So renderiza se tipo ===
     * 'Numerico' ou 'Numérico'.
     */
    renderLimitesDeControle?: (vm: IInspecaoModalViewModel) => React.ReactNode;
    /** Opcional — expoe trigger para selecao de parametro existente */
    onOpenParametrosPicker?: () => void;
}
declare const InspecaoModal: React.FC<InspecaoModalProps>;

/**
 * AcaoPicker (ui-kit-sgm) — Wave 2C migration.
 *
 * Widget puramente visual: lista de ações carregada via prop `loadAcoes`,
 * seleção comunicada via `onSelect` e callback `onNovaAcao` para o botão
 * de ação alternativa. Sem Redux, sem useCoreService, sem useNavigator.
 *
 * O consumidor em SGM-OS mantém o HOC `withGenericPicker` + o reducer de
 * ação — apenas embrulha este componente passando `acao`, `onSelect`
 * (dispatch de setAcaoPicked), `loadAcoes` (controller('acao').readAll)
 * e `onNovaAcao` (navigate(paths.acaoForm)).
 */
interface AcaoRef {
    id?: string | number;
    nome?: string;
    [key: string]: any;
}
interface AcaoPickerProps {
    /** Ação atualmente selecionada (mostra no campo) */
    acao?: AcaoRef | null;
    /** Chamado quando usuário seleciona uma ação no AutoComplete */
    onSelect: (selected: AcaoRef) => void;
    /** Carrega a lista de ações (ex.: controller('acao').readAll() no consumer) */
    loadAcoes: () => Promise<AcaoRef[]>;
    /** Chamado quando usuário clica no botão "Nova Ação" (ex.: navegar para form) */
    onNovaAcao?: () => void;
    /** Habilita/desabilita o fetch do AutoComplete */
    loadCondition?: boolean;
    /** Rótulo customizável (default: "Acao") */
    title?: string;
}
declare const AcaoPicker: React.FC<AcaoPickerProps>;

/**
 * ManutentoresDisplay (ui-kit-sgm) — Wave 2C migration.
 *
 * Componente 100% presentacional. Lista executores ativos (mantenedores
 * atribuídos a uma OS) com tooltip para os adicionais. Migrado 1:1 do
 * SGM-OS. Sem dependências de Redux/CoreService.
 */
interface ManutentorEntry {
    mantenedorId?: string | number;
    nomeUsuario?: string;
    active?: boolean;
    [key: string]: any;
}
interface ManutentoresDisplayProps {
    manutentores?: ManutentorEntry[];
    onIconClick?: () => void;
    label?: string;
}
declare const ManutentoresDisplay: React.FC<ManutentoresDisplayProps>;

/**
 * MantenedorRender (ui-kit-sgm) — Wave 2C migration.
 *
 * Widget composto que alterna entre:
 *   - modo display: `ManutentoresDisplay` (lista executores ativos)
 *   - modo picker : render prop `renderPicker()` injetado pelo consumidor
 *
 * Sem Redux/CoreService. As ações de atribuir/desatribuir e o próprio
 * MantenedorPicker (dependência SGM-OS) ficam responsabilidade do caller
 * via `renderPicker`.
 */
interface MantenedorRenderProps {
    readOnly?: boolean;
    osId?: string | number;
    isModalOpen?: boolean;
    setMantenedoresView?: (v: boolean) => void;
    setTargetOs?: (id: string | number) => void;
    maintainers?: ManutentorEntry[];
    /** Render prop para o MantenedorPicker (SGM-OS interno). Recebido do consumer. */
    renderPicker?: () => React.ReactNode;
}
declare const MantenedorRender: React.FC<MantenedorRenderProps>;

/**
 * MantenedorRenderCompact (ui-kit-sgm) — Wave 2C migration.
 *
 * Versão compacta do MantenedorRender: badges clicáveis por executor
 * ativo + botão com popover para atribuir novo. Sem Redux/CoreService
 * — todas as ações são callbacks injetados pelo consumer. O formulário
 * de autocomplete (SGM-OS interno GenericAutoCompleteForm) chega via
 * render prop `renderAtribuirForm`.
 */
interface MaintainerAssignment {
    mantenedorId?: string | number;
    active?: boolean;
    mantenedor?: {
        nomeUsuario?: string;
        _fullName?: string;
        [k: string]: any;
    };
    [k: string]: any;
}
interface MantenedorRenderCompactProps {
    readOnly?: boolean;
    maintainers?: MaintainerAssignment[];
    /** Chamado ao clicar no X de um badge (desatribuir) */
    onDesatribuir?: (assignment: MaintainerAssignment) => void;
    /**
     * Render prop para formulário de atribuição (normalmente um
     * GenericAutoCompleteForm vindo do SGM-OS). Recebe `handleClose`
     * do SwitchOnClick para fechar o popover após submit.
     */
    renderAtribuirForm?: (args: {
        handleClose: () => void;
    }) => React.ReactNode;
}
declare const MantenedorRenderCompact: React.FC<MantenedorRenderCompactProps>;

/**
 * ManutentorCard (ui-kit-sgm) — Wave 2C migration.
 *
 * Componente 100% presentacional. Exibe card de um mantenedor com
 * métricas, status (executando/pendente/concluído) e ação de detalhe.
 * Sem Redux/CoreService — todo IO via callbacks.
 */
interface MantenedorVM {
    id?: string | number;
    nomeUsuario?: string;
    metricas?: any;
    turno?: {
        nome?: string;
    };
    executing?: any[];
    pending?: any[];
    concluded?: any[];
    _busy?: boolean;
    osId?: string | number;
    [key: string]: any;
}
interface ManutentorCardProps {
    mantenedor: MantenedorVM;
    index?: number;
    viewDetailsCallback?: (m: MantenedorVM & {
        index?: number;
    }) => void;
    onRemoveCallback?: (m: MantenedorVM & {
        index?: number;
    }) => void;
    showBusyStatus?: boolean;
    onStatusClick?: (ordens: any[]) => void;
    loadMetrics?: ((m: MantenedorVM) => void) | null;
}
declare const ManutentorCard: React.FC<ManutentorCardProps>;

/**
 * ManutentorCardCompact (ui-kit-sgm)
 *
 * Versão simplificada e moderna do card de mantenedor, focada em
 * nome e disponibilidade para uso em modais de seleção rápida.
 */
interface ManutentorCardCompactProps {
    mantenedor: any;
    onClick?: () => void;
}
declare const ManutentorCardCompact: React.FC<ManutentorCardCompactProps>;

/**
 * MetricasDisplay (ui-kit-sgm) — Wave 2C internal.
 *
 * Subcomponente presentacional usado pelo ManutentorCard para exibir
 * métricas (tempo médio de execução e wrench time). Sem IO.
 */
interface MetricasDisplayProps {
    metricas?: {
        tempoProdutivo?: string | number;
        tempoOcioso?: string | number;
        tempoMedioExecucao?: string | number;
    } | string;
    wrenchTime?: string | number;
}
declare const MetricasDisplay: React.FC<MetricasDisplayProps>;

/**
 * RecursoDisplayer — apresentacional puro. Wave 2A.
 *
 * Toda logica de IO (useDispatch / useHttpController / setLevels / fetch de
 * branches) vive no Adapter do core-sdk (ReduxRecursoDisplayerAdapter).
 * Este componente apenas consome a Port `IRecursoDisplayerViewModel`.
 *
 * Se `vm` nao for fornecido, o componente resolve via
 * `useRecursoDisplayerViewModel()` default (DI via CoreService).
 */
interface RecursoDisplayerProps {
    selectedList?: any[];
    onSaveRecurso: (recursos: any[], checked?: boolean) => void;
    singleReturn?: boolean;
    /** Port opcional — se nao fornecido, cria via hook interno. */
    vm?: IRecursoDisplayerViewModel;
    /** Port opcional para busca por TAG. */
    findVm?: IFindRecursoByTagViewModel;
}
declare const RecursoDisplayer: ({ selectedList, onSaveRecurso, singleReturn, vm: vmProp, findVm: findVmProp, }: RecursoDisplayerProps) => react_jsx_runtime.JSX.Element;

/**
 * BranchDropDisplay — componente apresentacional puro do seletor-dropdown
 * de um nivel da arvore de recursos.
 *
 * Wave 2A: promovido do ui-kit legado para @teraprox/ui-kit-sgm/recurso/
 * sem mudanca de comportamento. Consumidores historicos continuam importando
 * de `teraprox-ui-kit` via re-export.
 */
interface BranchNode {
    recurso: {
        id: any;
        nome: string;
        branch: {
            id: any;
            branchLevel: {
                level: number;
            };
        };
    };
}
interface Branch {
    id?: any;
    branchLevel: {
        color: string;
        nome: string;
        level: number;
    };
    branchNodes: BranchNode[];
    nomeRecurso?: string;
}
interface BranchDropDisplayProps {
    branch: Branch;
    addBranch: (bn: BranchNode) => void;
    multiMode: boolean;
    setMultiMode: (v: boolean) => void;
    onSaveRecurso: (recursos: any[]) => void;
    backOnBranch: (branch: Branch) => void;
    branches: Branch[];
    singleReturn?: boolean;
}
declare const BranchDropDisplay: ({ branch, addBranch, multiMode, setMultiMode, onSaveRecurso, backOnBranch, branches, singleReturn, }: BranchDropDisplayProps) => react_jsx_runtime.JSX.Element;

/**
 * FindRecursoByTagField — apresentacional puro. Wave 2A.
 *
 * NAO usa useHttpController internamente — consome a Port
 * `IFindRecursoByTagViewModel`. Se `vm` nao for fornecido, resolve via
 * `useFindRecursoByTagViewModel()` default. Se `recursoController` for
 * fornecido (retrocompat), cria um Adapter local com ele.
 */
interface FindRecursoByTagFieldProps {
    /** Callback chamado quando um recurso e selecionado ou lido via QR. */
    callback: (recurso: any, confirmed: boolean) => void;
    /** Port opcional. */
    vm?: IFindRecursoByTagViewModel;
    /**
     * Retrocompat — se fornecido, o componente cria um Adapter interno com
     * este controller (workaround federation endpoint bake-in).
     */
    recursoController?: HttpController | Pick<HttpController, 'read' | 'get'>;
}
declare const FindRecursoByTagField: React.FC<FindRecursoByTagFieldProps>;

/**
 * UnidadeMaterialPicker — widget apresentacional migrado de SGM-OS
 * (Wave 2B da sprint 2026-04-21-ui-kit-domain-split-wave0).
 *
 * Origem: envolvido pelo HOC `withGenericPicker` + form embutido que
 * vivia em `teraprox-SGM-OS`. Aqui o comportamento de picker é local
 * (state próprio em useState) — sem Redux, sem useCoreService,
 * sem useHttpController. O caller injeta:
 *   - `outOption`: valor corrente do form (UnidadeMaterialValue-like,
 *     controlado pelo `useUnidadeMaterialViewModel` do core-sdk).
 *   - handlers do form (onMaterialSelected, onQuantidadeUpdate,
 *     onUnidadeSelected, loadMaterials, loadUnidades) — normalmente
 *     repassados a partir do ViewModel.
 *
 * A API de props exteriores preserva a forma do picker legado (usada
 * por TarefaCard/TarefaForm) para facilitar o swap de import no
 * Wave 2D sem refactor de call site.
 */
interface UnidadeMaterialPickerProps {
    saveOptions?: (pickedItem: any, index: number, allPicked: any[]) => void;
    singlePick?: boolean;
    displayName?: string;
    optionDisplayName?: string;
    optionDisplayKey?: string;
    hideOptions?: boolean;
    displayButtonName?: string;
    opsSelected?: any[] | any;
    outOption?: any;
    onSelectedOption?: (v: any) => any;
    formatationFunc?: (pi: any) => string;
    onPickerOpen?: () => void;
    onPickerClose?: () => void;
    clear?: () => void;
    clearPickerOptions?: () => void;
    optionComponent?: (args: {
        payload: any;
        index: number;
        onClickOp: (input?: any) => void;
        deleteButton: () => React.ReactNode | null;
    }) => React.ReactNode;
    onOptionEditClick?: (pi: any, index: number, optionsPicked: any[]) => void;
    showOpsWhenEdit?: boolean;
    onOptionDelete?: (pi: any, index: number, remaining: any[]) => void;
    containerStyles?: {
        bgColor?: string;
    };
    deleteDiaologText?: string;
    readOnlyMode?: boolean;
    deleteTitle?: string;
    onOptionUpdate?: (pi: any, index: number, allPicked: any[]) => void;
    fetchOpsSelected?: () => Promise<any[]>;
    onBuild?: (setView: (v: boolean) => void, optionsPicked: any[]) => void;
    parentColor?: string;
    onMaterialSelected?: (m: any) => void;
    onQuantidadeUpdate?: (q: any) => void;
    onUnidadeSelected?: (u: any) => void;
    loadMaterialsFunc?: (...args: any[]) => any;
    loadUnidadesFunc?: (...args: any[]) => any;
}
declare const UnidadeMaterialPicker: React.FC<UnidadeMaterialPickerProps>;

/**
 * TarefaCard — widget apresentacional migrado de SGM-OS
 * (Wave 2B da sprint 2026-04-21-ui-kit-domain-split-wave0).
 *
 * Diferenças vs. original:
 *   - Removido `useSelector(state => state.unidadeMaterial.form)`: o
 *     caller injeta `unidadeMaterial` como prop (tipicamente vindo do
 *     `useUnidadeMaterialViewModel` do core-sdk ou adjacente).
 *   - Removido `useCoreService()` que nunca era usado no render.
 *   - `InspecoesList` passa a ser injetado via prop `renderInspecoes`
 *     (slot), permitindo ao caller usar o componente legado sem que
 *     o widget conheça os imports.
 *   - Props do UnidadeMaterialPicker (handlers do form do ViewModel)
 *     são repassadas via `unidadeMaterialPickerProps`.
 */
interface TarefaCardProps {
    tarefa: any;
    posindex: number | string;
    onlyView?: boolean;
    removeTarefaClick: (sequencia: number | string) => void;
    onSequenciaChange: (value: number | string) => void;
    readOnlyMode?: boolean;
    onUnidadesMateriaisChange: (tarefaId: any, ops: any[]) => void;
    removed?: boolean;
    /** Valor corrente do form de unidade-material (do ViewModel do caller). */
    unidadeMaterial?: any;
    /** Render slot para a lista de inspeções (ex: `InspecoesList` do app). */
    renderInspecoes?: (inspecoes: any[]) => React.ReactNode;
    /** Props extras para o UnidadeMaterialPicker aninhado (handlers do form). */
    unidadeMaterialPickerProps?: Partial<React.ComponentProps<typeof UnidadeMaterialPicker>>;
}
declare const TarefaCard: React.FC<TarefaCardProps>;

/**
 * TarefaItem — componente apresentacional unificado para os tres modos
 * de uso (`edit`, `execute`, `readOnly`). Sprint 2026-04-29
 * tarefa-item-unified, Phase 2.
 *
 * Diferente da versao Wave 2B (slot-driven), este TarefaItem **internaliza**
 * todos os modais e consome o ViewModel umbrella `ITarefaItemViewModel`
 * (core-sdk). O caller monta o vm via `useTarefaItemViewModel({ tarefaId,
 * mode, fatherId })` e passa pelo prop `vm`.
 *
 * Restricao hexagonal:
 *  - Zero `useDispatch`, `useSelector`, `useCoreService`, `useHttpController`,
 *    `endPointManutencao`. Toda IO via Port `vm`.
 *  - Zero imports de `teraprox-SGM-OS/...` (componente nao conhece o caller).
 *  - Imports permitidos: `teraprox-ui-kit`, `@teraprox/ui-kit-core`,
 *    `teraprox-core-sdk` (apenas tipos), Bootstrap.
 *
 * Diferenciacao por modo:
 *  - `execute`  → StatusBadge clicavel (toggle PENDENTE↔ENCERRADO via
 *                 vm.status.toggle()), descricao plana, subscribeLive() ativo.
 *  - `edit`     → sem StatusBadge clicavel, ícones FaTimes/MdContentCopy
 *                 para remover/duplicar, descricao plana (TODO inline-edit).
 *  - `readOnly` → sem mutacao alguma; modais abrem em modo apresentacional.
 */
interface TarefaItemInspecaoExtras {
    /** Lista de tipos de dado (ex: filtrado de tiposDeCampo) */
    tiposDeDado: Array<{
        nome: string;
        type?: string;
    }>;
    /** Parametros pre-cadastrados (caller carrega via useEffect) */
    parametrosOps: Array<{
        nome: string;
        labelUnidade?: string;
        id?: string;
        [k: string]: any;
    }>;
    /** Carregador de unidades sob demanda (passa pro AutoComplete) */
    loadUnidadesFunc: () => Promise<any[]>;
    /**
     * Componente de Limites de Controle (LimiteDeControlePicker) — vive em
     * SGM-OS, injetado para compor o InspecaoModal. Opcional.
     */
    renderLimitesDeControle?: (vm: teraprox_core_sdk.IInspecaoModalViewModel) => React.ReactNode;
}
interface TarefaItemProps {
    /** Shape do backend (id, descricao, status, sequencia, inspecoes,
     *  tarefaUnidadesMateriais, anexos, acao, tarefaJustificativas). */
    tarefa: any;
    /** ViewModel umbrella vindo do core-sdk (`useTarefaItemViewModel(...)`). */
    vm: ITarefaItemViewModel;
    /** Modo de operacao do componente */
    mode: TarefaItemMode;
    /** Indice na lista (mantido para compat com legacy callers) */
    index: number;
    /** Detecta layout responsivo (default: false) */
    isMobile?: boolean;
    /** Remover esta tarefa (visivel apenas em mode='edit') */
    onRemove?: () => void;
    /** Duplicar esta tarefa (visivel apenas em mode='edit' e allowDupe) */
    onDuplicate?: () => void;
    /** Permite o icone de duplicar (visivel apenas em mode='edit') */
    allowDupe?: boolean;
    /**
     * Dados/render externos para o InspecaoModal embutido. Quando ausente,
     * o botao "Nova inspecao" nao e renderizado (modo readOnly de inspecao).
     */
    inspecaoExtras?: TarefaItemInspecaoExtras;
    /** Id do usuario atual — destaca bubbles "sent" no chat de observacoes */
    currentUserId?: string | number;
    /** Nome do usuario atual — incluido no payload de envio de observacoes */
    currentUserName?: string;
    /**
     * Renderizador da lista de inspecoes (legacy `InspecoesList` do SGM-OS).
     * Mantido como slot opcional porque o componente legacy depende de
     * `useInspecaoService`, `endPointManutencao`, `GenericImageAttachment`,
     * `InnerEditableTextField` e `InspecaoItem` — nao trivial migrar para
     * apresentacional puro nesta sprint. Quando ausente, exibe placeholder.
     *
     * Sub-sprint dedicada: 2026-04-29-tarefa-item-unified Phase 2 (slot
     * justificado em decisoes-log).
     */
    renderInspecoesList?: (ctx: {
        inspecoes: any[];
        isMobile?: boolean;
        readOnly?: boolean;
        /** Callback para atualizar campo de uma inspecao (delegado ao vm). */
        onUpdateInspecaoField?: (id: any, valor: any, field: string, indexInspecao: number) => void;
    }) => React.ReactNode;
    /**
     * Override opcional. Em `edit` mode, o caller redireciona a IO da
     * confirmacao do `<InspecaoModal>` para o Redux do form (em vez de
     * persistir direto via `vm.inspecao.submit()`). Em `execute`/`readOnly`
     * mode, deixe ausente — o componente chama `vm.inspecao.submit()` por
     * default e persiste direto via API.
     */
    onSaveNovaInspecao?: (dto: any) => void;
    /**
     * Override opcional. Em `edit` mode, o caller redireciona a IO da
     * confirmacao do `<UnidadeMaterialModal>` para o Redux do form. Em
     * `execute`/`readOnly` mode, deixe ausente — o componente chama
     * `vm.unidadeMaterial.submit()` por default.
     */
    onAddUnidadeMaterial?: (dto: any) => void;
    /**
     * Override opcional. Em `edit` mode, o caller redireciona o envio do
     * `<ObservacaoModal>` para o Redux do form. Em `execute`/`readOnly`
     * mode, deixe ausente — o componente chama `vm.observacoes.add({texto})`
     * por default.
     */
    onSaveObservacao?: (texto: string) => void;
}
declare const TarefaItem: React.FC<TarefaItemProps>;

/**
 * ObservacaoModal — modal apresentacional de chat de observacoes/justificativas.
 *
 * Promovido de `teraprox-SGM-OS/Components/manutencao/ObservacaoModal.js` para
 * `@teraprox/ui-kit-sgm` na sprint 2026-04-29 (tarefa-item-unified, Phase 2),
 * sem dependencia de Redux ou ChatComponent legacy. Apresentacao + state local
 * apenas; IO via callbacks (`onSend`, `onUpdate`, `onRemove`).
 *
 * Uso tipico (consumido por TarefaItem em ui-kit-sgm):
 *   <ObservacaoModal
 *     show={showObs}
 *     onClose={() => setShowObs(false)}
 *     observacoes={vm.observacoes.list}
 *     currentUserId={userId}
 *     currentUserName={fullName}
 *     readOnly={mode === 'readOnly'}
 *     onSend={(texto) => vm.observacoes.add({ texto })}
 *   />
 */
interface ObservacaoMessage {
    id?: string | number;
    descricao?: string;
    nomeUsuario?: string;
    userId?: string | number;
    createdAt?: string | Date;
    [k: string]: unknown;
}
interface ObservacaoModalProps {
    /** Controla a visibilidade do modal */
    show: boolean;
    /** Fecha o modal (clicar X / ESC / overlay) */
    onClose: () => void;
    /** Mensagens existentes (carregadas pelo caller via vm.observacoes.load()) */
    observacoes?: ObservacaoMessage[] | null;
    /** Id do usuario atual — destaca bubbles "sent" vs "received" */
    currentUserId?: string | number;
    /** Nome do usuario atual — incluido no payload de envio */
    currentUserName?: string;
    /** Modo somente-leitura: sem campo de envio nem edicao */
    readOnly?: boolean;
    /** Callback de envio. Recebe o texto digitado. */
    onSend?: (texto: string) => void | Promise<void>;
    /** Callback opcional de edicao de mensagem existente. */
    onUpdate?: (msg: {
        id?: string | number;
        descricao: string;
        index: number;
    }) => void;
    /** Callback opcional de remocao de mensagem existente. */
    onRemove?: (msg: ObservacaoMessage) => void;
    /** Titulo do modal (default: "Chat de Observacoes") */
    title?: string;
}
declare const ObservacaoModal: React.FC<ObservacaoModalProps>;

/**
 * MantenedorPicker (Wave 5B — hexagonal).
 *
 * Widget props-driven: consome IMantenedorPickerViewModel (Port do
 * core-sdk). Zero Redux/useDispatch/useSelector/useCoreService direto.
 *
 * Substitui MantenedoresDisplay.js local do SGM-OS. CSS continua em
 * teraprox-SGM-OS/src/styles/mantenedoresDisplay.css (débito residual —
 * ui-kit-sgm ainda não importa CSS via tsup).
 */
interface MantenedorPickerProps {
    viewModel: IMantenedorPickerViewModel;
    currentOsId?: number | string | null;
    onSelected: (item: MantenedorOption) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}
declare const MantenedorPicker: React.FC<MantenedorPickerProps>;

// Sprint 2026-04-30 pick-mantenedor-os-card-unified — types appended
// manualmente por bypass do DTS-build pré-existente broken (compass).
interface OsCardOrdem {
    id?: number | string;
    status?: string;
    isLate?: boolean;
    isVirtual?: boolean;
    modelId?: number | string | null;
    recorrenciaId?: number | string | null;
    agregadorId?: number | string | null;
    recurso?: { nome?: string } | null;
    father?: string | null;
    descricaoDoProblema?: string | null;
    osMantenedor?: Array<{ mantenedor?: { nomeUsuario?: string; nome?: string }; nome?: string }>;
    osTipos?: Array<{ tipoDeOrdem?: { tipo?: string } }>;
    dataPlanejada?: string | Date | null;
    dataDeEncerramento?: string | Date | null;
    setor?: string | null;
    setorDestino?: string | null;
    tarefas?: Array<unknown>;
    realizado?: number;
    valorPlanejado?: number;
    warn?: number;
    eficienciaDoAgregador?: number | null;
}
interface OsCardProps {
    ordem: OsCardOrdem;
    onView?: (id: number | string) => void;
    onEdit?: (ordem: OsCardOrdem) => void;
    onEditModel?: (modelId: number | string | null | undefined) => void;
    onCardAction?: (ordem: OsCardOrdem) => void;
    onViewAgregador?: (agregadorId: number | string) => void;
    onViewRecorrencia?: (recorrenciaId: number | string) => void;
    onIniciar?: (ordem: OsCardOrdem) => void | Promise<void>;
    onContinuar?: (ordem: OsCardOrdem) => void;
    isSelectable?: boolean;
    isSelected?: boolean;
    onToggleSelect?: (ordem: OsCardOrdem) => void;
    disableStatusIndicator?: boolean;
    loading?: boolean;
}
declare const OsCard: React.NamedExoticComponent<OsCardProps>;

interface PickMantenedorTipoModalProps {
    show: boolean;
    onHide: () => void;
    os: { id?: number | string; osMantenedor?: any[]; osTipos?: any[] } | null;
    viewModel: IPickMantenedorTipoViewModel;
    onAssigned?: (mantenedores: PickMantenedorOption[], tipo: PickTipoDeOrdemOption | null) => void;
    onError?: (err: unknown) => void;
}
declare const PickMantenedorTipoModal: React.FC<PickMantenedorTipoModalProps>;

interface OsStatusMeta { color: string; label: string }
declare const OS_STATUS_PALETTE: Record<string, OsStatusMeta>;
declare function getOsStatusMeta(status?: string): OsStatusMeta;

export { AcaoPicker, type AcaoPickerProps, type AcaoRef, BranchDropDisplay, type BranchDropDisplayProps, FindRecursoByTagField, type FindRecursoByTagFieldProps, InspecaoModal, type InspecaoModalProps, type MaintainerAssignment, MantenedorPicker, type MantenedorPickerProps, MantenedorRender, MantenedorRenderCompact, type MantenedorRenderCompactProps, type MantenedorRenderProps, type MantenedorVM, ManutentorCard, ManutentorCardCompact, type ManutentorCardCompactProps, type ManutentorCardProps, type ManutentorEntry, ManutentoresDisplay, type ManutentoresDisplayProps, MetricasDisplay, type MetricasDisplayProps, type ObservacaoMessage, ObservacaoModal, type ObservacaoModalProps, RecursoDisplayer, type RecursoDisplayerProps, TarefaCard, type TarefaCardProps, TarefaItem, type TarefaItemInspecaoExtras, type TarefaItemProps, UnidadeMaterialModal, type UnidadeMaterialModalProps, UnidadeMaterialPicker, type UnidadeMaterialPickerProps, OsCard, type OsCardProps, type OsCardOrdem, PickMantenedorTipoModal, type PickMantenedorTipoModalProps, OS_STATUS_PALETTE, getOsStatusMeta, type OsStatusMeta };
