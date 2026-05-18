import * as React from 'react';
import React__default from 'react';
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
declare const UnidadeMaterialModal: React__default.FC<UnidadeMaterialModalProps>;

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
    renderLimitesDeControle?: (vm: IInspecaoModalViewModel) => React__default.ReactNode;
    /** Opcional — expoe trigger para selecao de parametro existente */
    onOpenParametrosPicker?: () => void;
}
declare const InspecaoModal: React__default.FC<InspecaoModalProps>;

/**
 * AcaoPicker (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Widget puramente visual: lista de ações carregada via prop `loadAcoes`,
 * seleção comunicada via `onSelect` e callback `onNovaAcao` para o botão
 * de ação alternativa. Sem Redux, sem useCoreService, sem useNavigator.
 *
 * O consumidor em SGM-OS mantém o HOC `withGenericPicker` + o reducer de
 * ação — apenas embrulha este componente passando `acao`, `onSelect`
 * (dispatch de setAcaoPicked), `loadAcoes` (controller('acao').readAll)
 * e `onNovaAcao` (navigate(paths.acaoForm)).
 *
 * Wave F.1.A: react-bootstrap Button -> ui-kit-core Button.
 * AutoComplete (teraprox-ui-kit legacy) preservado — não é react-bootstrap.
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
declare const AcaoPicker: React__default.FC<AcaoPickerProps>;

/**
 * ManutentoresDisplay (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Componente 100% presentacional. Lista executores ativos (mantenedores
 * atribuídos a uma OS) com tooltip para os adicionais. Migrado 1:1 do
 * SGM-OS. Sem dependências de Redux/CoreService.
 *
 * Wave F.1.A: react-bootstrap (OverlayTrigger+Tooltip) -> ui-kit-core
 * Tooltip wrapper Radix.
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
declare const ManutentoresDisplay: React__default.FC<ManutentoresDisplayProps>;

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
    renderPicker?: () => React__default.ReactNode;
}
declare const MantenedorRender: React__default.FC<MantenedorRenderProps>;

/**
 * MantenedorRenderCompact (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Versão compacta do MantenedorRender: badges clicáveis por executor
 * ativo + botão com popover para atribuir novo. Sem Redux/CoreService
 * — todas as ações são callbacks injetados pelo consumer. O formulário
 * de autocomplete (SGM-OS interno GenericAutoCompleteForm) chega via
 * render prop `renderAtribuirForm`.
 *
 * Wave F.1.A: react-bootstrap Badge/Button + teraprox-ui-kit SwitchOnClick
 * -> ui-kit-core Badge/Button + Popover (Radix). API externa preservada
 * — `renderAtribuirForm({ handleClose })` continua recebendo handleClose
 * para fechar o popover após submit.
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
     * Quando fornecido, o botão Atribuir/Adicionar dispara este callback
     * em vez de abrir o popover SwitchOnClick + renderAtribuirForm.
     * Use para casos em que o caller quer abrir um modal externo
     * (ex.: PickMantenedorTipoModal em /os/execucao).
     */
    onAtribuirClick?: () => void;
    /**
     * Render prop para formulário de atribuição (normalmente um
     * GenericAutoCompleteForm vindo do SGM-OS). Recebe `handleClose`
     * do Popover para fechar após submit.
     */
    renderAtribuirForm?: (args: {
        handleClose: () => void;
    }) => React__default.ReactNode;
}
declare const MantenedorRenderCompact: React__default.FC<MantenedorRenderCompactProps>;

/**
 * ManutentorCard (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Componente 100% presentacional. Exibe card de um mantenedor com
 * métricas, status (executando/pendente/concluído) e ação de detalhe.
 * Sem Redux/CoreService — todo IO via callbacks.
 *
 * Wave F.1.A: react-bootstrap (Button, Card, Col) -> ui-kit-core
 * Button + Card/CardBody/CardFooter. `Col` (grid placeholder) virou
 * `<div>` simples — caller é responsável pelo grid externo.
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
declare const ManutentorCard: React__default.FC<ManutentorCardProps>;

/**
 * ManutentorCardCompact (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Versão simplificada e moderna do card de mantenedor, focada em
 * nome e disponibilidade para uso em modais de seleção rápida.
 *
 * Wave F.1.A: react-bootstrap Card -> ui-kit-core Card/CardBody.
 */
interface ManutentorCardCompactProps {
    mantenedor: any;
    onClick?: () => void;
}
declare const ManutentorCardCompact: React__default.FC<ManutentorCardCompactProps>;

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
declare const MetricasDisplay: React__default.FC<MetricasDisplayProps>;

/**
 * RecursoDisplayer — apresentacional puro. Wave 2A.
 *
 * Toda logica de IO (useDispatch / useHttpController / setLevels / fetch de
 * branches) vive no Adapter do core-sdk (ReduxRecursoDisplayerAdapter).
 * Este componente apenas consome a Port `IRecursoDisplayerViewModel`.
 *
 * Se `vm` nao for fornecido, o componente resolve via
 * `useRecursoDisplayerViewModel()` default (DI via CoreService).
 *
 * Wave F.1.A: react-bootstrap Button -> ui-kit-core Button.
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
 * Wave 2A: promovido do ui-kit legado para @hashcodeti/ui-kit-sgm/recurso/
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
declare const FindRecursoByTagField: React__default.FC<FindRecursoByTagFieldProps>;

interface BranchNodeRecurso {
    id: string | number;
    nome: string;
    descricao?: string;
    branchId?: string | number;
    branch?: unknown;
    active?: boolean;
}
interface BranchNodeData {
    id: string | number;
    position: number;
    recurso: BranchNodeRecurso;
    branchNodesCount?: number;
}
interface BranchData {
    id: string | number;
    branchLevelId?: string | number;
    branchLevel: {
        level: number;
        nome?: string;
        color?: string;
    };
    parentBranchNode?: {
        branchId?: string | number;
    };
}
interface BranchNodeDisplayV2Props {
    branchNode: BranchNodeData;
    branch: BranchData;
    level: number;
    index: number;
    bMapIndex?: number;
    fontColor?: string;
    /** Estado externo (vindo dos hooks/Redux do caller) */
    isPicker?: boolean;
    isLoading?: boolean;
    isCheckedRecurso?: (recursoId: string | number) => boolean;
    isFocused?: boolean;
    /** Callbacks */
    onOpenBranches?: (branchNode: BranchNodeData) => void;
    onEditRecurso?: (level: number, branchNode: BranchNodeData) => void;
    onPickRecurso?: (recursoId: string | number) => void;
    onMoveNode?: (dragPos: number, hoverPos: number) => void;
    onViewHistory?: (recurso: BranchNodeRecurso) => void;
    /** Wrappers opcionais para permissão (renderProp) */
    renderEditWrapper?: (children: React.ReactNode) => React.ReactNode;
    /** Tema por nível (override) */
    getLevelTheme?: (level: number) => {
        primary: string;
        secondary: string;
    };
}
declare const BranchNodeDisplayV2: React.FC<BranchNodeDisplayV2Props>;

interface BranchContainerV2Props {
    branch: BranchData & {
        branchNodes: BranchNodeData[];
        branchLevel: BranchData['branchLevel'] & {
            color?: string;
            nome?: string;
        };
    };
    index: number;
    /** Estado externo */
    filterValue?: string;
    showFilter?: boolean;
    positionsChanged?: boolean;
    isLoading?: boolean;
    /** Callbacks */
    onSetShowFilter?: (next: boolean | ((prev: boolean) => boolean)) => void;
    onFiltraRecurso?: (value: string) => void;
    onCreateAtLevel?: () => void;
    onMoveNode?: (dragPos: number, hoverPos: number, branch: BranchData) => void;
    onSavePositionChanges?: (branch: BranchData) => void;
    onUndoPositionChanges?: (branch: BranchData) => void;
    onNormalizePositions?: (branch: BranchData) => void;
    onSaveBranchLevelName?: (branchLevel: BranchData['branchLevel'], handleClose: () => void) => void;
    onUpdateBranchLevelName?: (index: number, nome: string) => void;
    onSwitchBranch?: (item: any, branch: BranchData) => void;
    /** Filter helper (caller injeta — original era multiTermFilter de hook) */
    multiTermFilter?: (text: string | undefined, term: string | undefined) => boolean;
    /** Hooks por-nó (descendem para BranchNodeDisplayV2) */
    isPicker?: boolean;
    isCheckedRecurso?: (recursoId: string | number) => boolean;
    getFocusedRecursoId?: () => string | number | undefined;
    onOpenBranches?: (branchNode: BranchNodeData) => void;
    onEditRecurso?: (level: number, branchNode: BranchNodeData) => void;
    onPickRecurso?: (recursoId: string | number) => void;
    onViewHistory?: (recurso: any) => void;
    renderEditWrapper?: (children: React.ReactNode) => React.ReactNode;
    renderCreateWrapper?: (children: React.ReactNode) => React.ReactNode;
    /** Render-prop para o título editavel — caller injeta seu SwitchOnClick/FormField */
    renderTitle?: (props: {
        nome: string;
        onSave: () => void;
        onUpdate: (nome: string) => void;
    }) => React.ReactNode;
}
declare const BranchContainerV2: React.FC<BranchContainerV2Props>;

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
        deleteButton: () => React__default.ReactNode | null;
    }) => React__default.ReactNode;
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
declare const UnidadeMaterialPicker: React__default.FC<UnidadeMaterialPickerProps>;

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
    renderInspecoes?: (inspecoes: any[]) => React__default.ReactNode;
    /** Props extras para o UnidadeMaterialPicker aninhado (handlers do form). */
    unidadeMaterialPickerProps?: Partial<React__default.ComponentProps<typeof UnidadeMaterialPicker>>;
}
declare const TarefaCard: React__default.FC<TarefaCardProps>;

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
 *  - Imports permitidos: `teraprox-ui-kit`, `@hashcodeti/ui-kit-core`,
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
    renderLimitesDeControle?: (vm: teraprox_core_sdk.IInspecaoModalViewModel) => React__default.ReactNode;
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
    }) => React__default.ReactNode;
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
declare const TarefaItem: React__default.FC<TarefaItemProps>;

/**
 * ObservacaoModal — modal apresentacional de chat de observacoes/justificativas.
 *
 * Promovido de `teraprox-SGM-OS/Components/manutencao/ObservacaoModal.js` para
 * `@hashcodeti/ui-kit-sgm` na sprint 2026-04-29 (tarefa-item-unified, Phase 2),
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
declare const ObservacaoModal: React__default.FC<ObservacaoModalProps>;

/**
 * MantenedorPicker (Wave 5B — hexagonal; Wave F.1.C — Tailwind/Radix migration).
 *
 * Widget props-driven: consome IMantenedorPickerViewModel (Port do
 * core-sdk). Zero Redux/useDispatch/useSelector/useCoreService direto.
 *
 * Substitui MantenedoresDisplay.js local do SGM-OS. CSS continua em
 * teraprox-SGM-OS/src/styles/mantenedoresDisplay.css (débito residual —
 * ui-kit-sgm ainda não importa CSS via tsup).
 *
 * Wave F.1.C (2026-05-13): removido `react-bootstrap` (ListGroup/ListGroup.Item)
 * em favor de `List`/`ListItem` de `@hashcodeti/ui-kit-core@0.7.0`. API
 * pública preservada (zero breaking change). FormField e
 * ApproveAndReproveButtons (teraprox-ui-kit) permanecem — não são bootstrap
 * e estão fora do escopo desta wave.
 */
interface MantenedorPickerProps {
    viewModel: IMantenedorPickerViewModel;
    currentOsId?: number | string | null;
    onSelected: (item: MantenedorOption) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}
declare const MantenedorPicker: React__default.FC<MantenedorPickerProps>;

/**
 * OsCard — promovido do teraprox-SGM-OS/Components/.../OsPlanejada/OsCard.js.
 *
 * Componente puramente apresentacional, props-driven. Usado por:
 *  - SGM-OS Planejamento (com features de virtual/recorrencia/agregador)
 *  - SGM-OM Executar Ordem (sem features extras — passa undefined nos handlers)
 *
 * As features planejamento-only (OS virtual, recorrência, agregador, edição
 * de model) são acionadas por **callbacks opcionais**: se `onCardAction`,
 * `onViewAgregador`, `onViewRecorrencia`, `onEditModel`, `onEdit` não forem
 * fornecidos, os botões/chips correspondentes não aparecem ou ficam mudos.
 *
 * O modal de OS virtual (OsVirtualActionModal) NÃO é mais embutido aqui —
 * o consumer deve renderizá-lo externamente quando `onCardAction` é chamado.
 */
interface OsCardOrdem {
    id?: number | string;
    status?: string;
    isLate?: boolean;
    isVirtual?: boolean;
    modelId?: number | string | null;
    recorrenciaId?: number | string | null;
    agregadorId?: number | string | null;
    /** Id da solicitação de serviço que originou esta OS, quando aplicável.
     *  Quando ausente, considera-se que a OS foi criada manualmente. */
    solicitacaoOrigemId?: number | string | null;
    recurso?: {
        nome?: string;
    } | null;
    father?: string | null;
    descricaoDoProblema?: string | null;
    osMantenedor?: Array<{
        mantenedor?: {
            nomeUsuario?: string;
            nome?: string;
        };
        nome?: string;
    }>;
    osTipos?: Array<{
        tipoDeOrdem?: {
            tipo?: string;
        };
    }>;
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
    /** Navega para a SS de origem (chip "Origem: SS #X"). Se omitido, o chip vira label não-clicável. */
    onViewSolicitacao?: (solicitacaoId: number | string) => void;
    onIniciar?: (ordem: OsCardOrdem) => void | Promise<void>;
    onContinuar?: (ordem: OsCardOrdem) => void;
    isSelectable?: boolean;
    isSelected?: boolean;
    onToggleSelect?: (ordem: OsCardOrdem) => void;
    disableStatusIndicator?: boolean;
    loading?: boolean;
}
declare const OsCard: React__default.NamedExoticComponent<OsCardProps>;

interface OrdemDeServicoDisplayCardItem {
    /** Rótulo curto (esquerda). */
    label: string;
    /** Conteúdo (direita ou abaixo do label). */
    content: React.ReactNode;
    /** Visualmente sinaliza interatividade (caret, cursor). */
    clickable?: boolean;
    /** Quando false, o item é omitido. Default: true. */
    shouldShow?: boolean;
}
interface OrdemDeServicoDisplayCardProps {
    /** Texto exibido no faixa esquerda (id da OS ou "Os em criação"). */
    idLabel: React.ReactNode;
    /** Cor de fundo da faixa esquerda (mapeia status → cor; passe roxo se isForm). */
    statusColor: string;
    /** Form mode (desenha id em vertical, faixa roxa). */
    isForm?: boolean;
    /** Highlight de destaque externo (ex.: navegação por anchor). */
    highlighted?: boolean;
    /** Lista de items label/valor; use slots para conteúdo customizado. */
    items: OrdemDeServicoDisplayCardItem[];
    /** Quantos itens ficam visíveis antes de "ver mais". Default: 5. */
    initialVisibleCount?: number;
    /** Texto do botão expandir. Default: "Ver mais". */
    expandLabel?: string;
    /** Texto do botão recolher. Default: "Ver menos". */
    collapseLabel?: string;
    /**
     * Disparado ao clicar no ícone de navegação (canto direito).
     * Caller é responsável por dispatchar setOrdemDeServicoView e navegar.
     */
    onNavigate?: () => void;
    /** Classe extra para o root Card. */
    className?: string;
}
declare const OrdemDeServicoDisplayCard: React.MemoExoticComponent<React.ForwardRefExoticComponent<OrdemDeServicoDisplayCardProps & React.RefAttributes<HTMLDivElement>>>;
type OsDisplayStatus = 'PENDENTE' | 'EXECUTANDO' | 'CONCLUIDO' | 'CANCELED' | string | undefined | null;
declare function getOrdemDeServicoDisplayColor(status: OsDisplayStatus): string;

/**
 * PickMantenedorTipoModal — promovido do
 * teraprox-SGM-OS/Components/.../OsPlanejada/PickMantenedorModal.js.
 *
 * Modos de uso:
 *  - **Single OS**: passar prop `os` (legacy SGM-OS). Modal exibe e
 *    atribui apenas para essa OS.
 *  - **Multi OS**: passar prop `osList` (>1 item). Modal exibe lista de
 *    OS com checkboxes (default todas selecionadas) e usa rotas bulk
 *    do core-sdk: PUT updateTipoBulk + POST atribuirMantenedorBulk.
 *
 * Em modo multi, missingMaintainers/missingType são derivados das OS
 * selecionadas (true se ALGUMA OS marcada está faltando o campo).
 */
interface PickMantenedorTipoModalProps {
    show: boolean;
    onHide: () => void;
    /** Modo single-OS (legacy SGM-OS). Ignorado se `osList` é fornecido. */
    os?: {
        id?: number | string;
        osMantenedor?: any[];
        osTipos?: any[];
    } | null;
    /** Modo multi-OS — lista de OS a configurar em batch */
    osList?: Array<{
        id?: number | string;
        osMantenedor?: any[];
        osTipos?: any[];
        recurso?: {
            nome?: string;
        };
        descricaoDoProblema?: string;
    }> | null;
    viewModel: IPickMantenedorTipoViewModel;
    onAssigned?: (mantenedores: PickMantenedorOption[], tipo: PickTipoDeOrdemOption | null, osIds: Array<number | string>) => void;
    onError?: (err: unknown) => void;
    /**
     * Força a exibição da seção de mantenedores mesmo quando a OS já tem
     * executores ativos. Usado em /os/execucao para "Adicionar mantenedor"
     * sobre OS que já tem alguém atribuído.
     */
    forceShowMantenedores?: boolean;
    /**
     * Força a exibição da seção de tipo mesmo quando a OS já tem tipo.
     * Usado em /os/execucao para "Alterar tipo" sobre OS que já tem tipo.
     */
    forceShowTipo?: boolean;
}
declare const PickMantenedorTipoModal: React__default.FC<PickMantenedorTipoModalProps>;

/**
 * Paleta canônica de status de Ordem de Serviço — promovida do
 * teraprox-SGM-OS/src/ui/statusPalette.js para uso compartilhado em
 * componentes do ui-kit-sgm (OsCard, etc).
 */
interface OsStatusMeta {
    color: string;
    label: string;
}
declare const OS_STATUS_PALETTE: Record<string, OsStatusMeta>;
declare function getOsStatusMeta(status?: string): OsStatusMeta;

/**
 * OrdemStatusIndicator — Wave G.1 promotion (de teraprox-SGM-OM/Components/OrdemStatusIndicator.js).
 *
 * Badge visual + ícone color-aware do status atual de uma Ordem de
 * Manutenção. Componente puramente apresentacional, props-driven.
 *
 * `getStatusColor` deve retornar um hex (ex: #f59e0b) — usamos inline
 * style em vez de classes utilitárias para preservar contraste exato
 * vindo da palette do consumer.
 */
type OrdemStatus = 'PENDENTE' | 'EXECUTANDO' | 'CONCLUIDO' | 'CANCELADO' | string;
interface OrdemStatusIndicatorProps {
    status: OrdemStatus;
    getStatusColor: (status: OrdemStatus) => string;
    getStatusText: (status: OrdemStatus) => string;
    className?: string;
}
declare const OrdemStatusIndicator: React__default.ForwardRefExoticComponent<OrdemStatusIndicatorProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * OrdemStatusActions — Wave G.1 promotion (de teraprox-SGM-OM/Components/OrdemStatusActions.js).
 *
 * Botões de ação adaptativos ao status de uma Ordem de Manutenção
 * (PENDENTE → Iniciar OM, EXECUTANDO → Concluir OM, CONCLUIDO →
 * meta de quem encerrou). Apresentacional puro, props-driven.
 */
interface OrdemStatusActionsOrdem {
    encerradoPor?: string | null;
    [k: string]: unknown;
}
interface OrdemStatusActionsProps {
    status: string;
    ordem?: OrdemStatusActionsOrdem;
    onIniciar?: () => void;
    onConcluir?: () => void;
    iniciando?: boolean;
    concluindo?: boolean;
    className?: string;
}
declare const OrdemStatusActions: React__default.FC<OrdemStatusActionsProps>;

/**
 * OrdemInfoCard — Wave G.1 promotion (secundário) de
 * teraprox-SGM-OM/Components/OrdemInfoCard.js.
 *
 * Card de exibição de metadados gerais + sistema de uma Ordem de
 * Manutenção. Pure display, sem Redux/router. `formatDate` é injetado
 * pelo consumer para preservar locale/timezone do shell.
 */
interface OrdemInfoCardOrdem {
    id?: number | string;
    descricao?: string | null;
    setor?: string | null;
    criadoPor?: string | null;
    encerradoPor?: string | null;
    dataDeInicio?: string | Date | null;
    dataDeFim?: string | Date | null;
    tempoPrevisto?: number | string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
}
interface OrdemInfoCardProps {
    ordem: OrdemInfoCardOrdem;
    formatDate: (value: string | Date | null | undefined) => string;
    className?: string;
}
declare const OrdemInfoCard: React__default.FC<OrdemInfoCardProps>;

/**
 * OSQuickEndModal — Wave G.1 promotion (de teraprox-SGM-OM/Components/OSQuickEndModal.js).
 *
 * Modal apresentacional para encerrar uma OS rapidamente, com parecer
 * técnico opcional. Sem Redux/useToast/useCoreService — toda a IO chega
 * via props:
 *   - `onEndOS(os, technicalReport)` callback assíncrono;
 *   - `onSuccess` / `onError` callbacks opcionais para o caller integrar
 *     toast/snackbar do shell;
 */
interface OSQuickEndModalOS {
    id?: number | string;
    tarefas?: Array<{
        status?: string;
    }>;
    [k: string]: unknown;
}
interface OSQuickEndModalProps {
    show: boolean;
    onHide: () => void;
    os?: OSQuickEndModalOS | null;
    onEndOS?: (os: OSQuickEndModalOS, technicalReport: string) => void | Promise<void>;
    onSuccess?: (os: OSQuickEndModalOS) => void;
    onError?: (error: unknown) => void;
}
declare const OSQuickEndModal: React__default.FC<OSQuickEndModalProps>;

/**
 * OSQuickActionsMenu — Wave G.1 promotion (de teraprox-SGM-OM/Components/OSQuickActionsMenu.js).
 *
 * Menu dropdown de ações rápidas para uma OS sem navegar para a tela
 * de execução. Componente apresentacional, props-driven:
 *  - `onStartOS` — abrir flow de início (caller renderiza modal próprio);
 *  - `onEndOS(os, parecer)` — encerrar OS (consumido pelo OSQuickEndModal);
 *  - `onQuickCheckOS(os)` — finalizar sem iniciar (QuickCheck);
 *  - `onUpdateOS(id, patch)` — patch de status (EXECUTANDO ↔ AGUARDANDO_RECURSO).
 *
 * O modal de "Iniciar OS" (OSQuickStartModal) NÃO é mais embutido aqui:
 * ele é DEDICADO (Port refactor pendente) e fica no caller. Quando o
 * usuário clica em "Iniciar OS", chamamos `onStartOS(os)` e o caller é
 * responsável por renderizar/abrir seu fluxo.
 *
 * O modal de encerramento (OSQuickEndModal) continua embutido aqui pois
 * já foi promovido nesta mesma wave (puramente apresentacional).
 */
interface OSQuickActionsMenuOS extends OSQuickEndModalOS {
    id?: number | string;
    status?: string;
}
interface OSQuickActionsMenuProps {
    os: OSQuickActionsMenuOS;
    onStartOS?: (os: OSQuickActionsMenuOS) => void;
    onEndOS?: (os: OSQuickActionsMenuOS, parecer: string) => void | Promise<void>;
    onQuickCheckOS?: (os: OSQuickActionsMenuOS) => void;
    onUpdateOS?: (id: number | string | undefined, patch: {
        status: string;
    }) => void;
    disabled?: boolean;
    quickCheckEnabled?: boolean;
    loading?: boolean;
}
declare const OSQuickActionsMenu: React__default.FC<OSQuickActionsMenuProps>;

/**
 * OSCheckoutModalV2 — Wave H.2 promotion (de teraprox-SGM-OS/Components/manutencao/OrdemDeServico/OSCheckoutModalV2.js).
 *
 * Modal apresentacional para checkout de uma OS recém-formada. Permite
 * 4 modos: save_only, save_model, add_to_om, new_om.
 *
 * Hexagonal: nada de useOrdemDeManutencao / useNavigate / paths internos.
 * O caller injeta:
 *   - `osForm` — objeto da OS em construção (com flags `isModel`,
 *     `modelIdentifier`, `isPublicView`, `recursos`).
 *   - `omContext` — { hasActiveOM, ordemDeManutencao, totalOS, osCompatibility }.
 *     osCompatibility = { canAdd: boolean, reason?: string }.
 *   - `onSaveOS(form)` — persiste OS isolada (modos save_only/save_model).
 *   - `onSaveOSAndAddToOM(form)` — persiste e enfileira para OM (modos add_to_om/new_om).
 *   - `onNavigateToOM()` — chamado após add_to_om/new_om (caller decide router).
 *   - `onCancel()` — fecha.
 *   - `onUpdateModelIdentifier`, `onUpdateModelVisibility` — controlled props p/ modelo.
 *   - `open` / `onOpenChange` — controle Radix.
 */
type OSCheckoutMode = 'save_only' | 'save_model' | 'add_to_om' | 'new_om';
interface OSCheckoutForm {
    isModel?: boolean;
    isPublicView?: boolean;
    modelIdentifier?: string;
    recursos?: unknown[];
    setorDestino?: unknown;
    [k: string]: unknown;
}
interface OSCheckoutOMContext {
    hasActiveOM?: boolean;
    ordemDeManutencao?: {
        descricao?: string | {
            nome?: string;
            id?: string | number;
        };
        setor?: string | {
            nome?: string;
            id?: string | number;
        };
    };
    totalOS?: number;
    osCompatibility?: {
        canAdd: boolean;
        reason?: string;
    };
}
interface OSCheckoutModalV2Props {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    osForm: OSCheckoutForm;
    omContext?: OSCheckoutOMContext;
    onSaveOS?: (form: OSCheckoutForm) => void | Promise<void>;
    onSaveOSAndAddToOM?: (form: OSCheckoutForm) => void | Promise<void>;
    onNavigateToOM?: () => void;
    onCancel?: () => void;
    onUpdateModelIdentifier?: (value: string) => void;
    onUpdateModelVisibility?: (isPublic: boolean) => void;
}
declare const OSCheckoutModalV2: React__default.FC<OSCheckoutModalV2Props>;

/**
 * OSQuickStartModal — Wave H.2 promotion (de teraprox-SGM-OM/Components/OSQuickStartModal.js).
 *
 * Modal apresentacional para iniciar uma OS (single ou bulk). Preserva
 * 100% da lógica de navegação <- -> e modo "Atribuir em Lote", mas
 * extrai todo o IO via props (Port no caller):
 *
 *   - `onStartOS(os)` — start single OS após validação;
 *   - `onUpdateOS(id)` — refetch após mutação;
 *   - `onUpdateTipo(osId, tipo)` — POST /updateTipoDeOrdem;
 *   - `onBulkAssignMantenedor(osIds, mantenedor)` — POST /atribuirMantenedorBulk;
 *   - `onBulkAssignTipo(osIds, tipo)` — POST /updateTipoBulk;
 *   - `onToast(msg, type)` — toast opcional (success/error/warning);
 *   - `renderMantenedorPanel({ os, onChanged })` — slot p/ MantenedorRender (caller injeta);
 *   - `renderTipoPicker({ currentTipo, onSelect })` — slot p/ autocomplete tipo (caller injeta);
 *   - `renderMantenedorPicker({ onSelect, onCancel })` — slot p/ bulk pick;
 *
 * Esses slots permitem ao caller manter `useCoreService`/Redux apenas no shell.
 */
interface OSQuickStartModalOS {
    id?: number | string;
    dataPlanejada?: string | Date;
    allowEarlyStart?: boolean;
    osMantenedor?: Array<{
        active?: boolean;
    }>;
    osTipos?: Array<{
        tipoDeOrdem?: {
            tipo?: string;
        };
    }>;
    [k: string]: unknown;
}
type ToastType = 'success' | 'error' | 'warning' | 'info';
interface OSQuickStartModalProps {
    show: boolean;
    onHide: () => void;
    os: OSQuickStartModalOS | OSQuickStartModalOS[] | null;
    bulk?: boolean;
    showStartButton?: boolean;
    onStartOS?: (os: OSQuickStartModalOS) => void | Promise<void>;
    onUpdateOS?: (id: number | string | undefined) => void | Promise<void>;
    onUpdateTipo?: (osId: number | string | undefined, tipo: any) => void | Promise<void>;
    onBulkAssignMantenedor?: (osIds: Array<number | string>, mantenedor: any) => Promise<{
        added?: number;
        skipped?: number;
        failed?: number;
    } | void>;
    onBulkAssignTipo?: (osIds: Array<number | string>, tipo: any) => Promise<{
        atualizados?: number;
        skipped?: number;
        falhas?: number;
    } | void>;
    onToast?: (msg: string, type: ToastType) => void;
    renderMantenedorPanel?: (ctx: {
        os: OSQuickStartModalOS;
        onChanged: () => void;
    }) => React__default.ReactNode;
    renderTipoPicker?: (ctx: {
        currentTipo?: string;
        onSelect: (tipo: any) => void;
    }) => React__default.ReactNode;
    renderMantenedorPicker?: (ctx: {
        onSelect: (mantenedor: any) => void;
    }) => React__default.ReactNode;
}
declare const OSQuickStartModal: React__default.FC<OSQuickStartModalProps>;

interface OsSkeletonProps {
    className?: string;
}
declare const OsSkeleton: React.FC<OsSkeletonProps>;
interface OsEmptyProps {
    message?: string;
}
declare const OsEmpty: React.FC<OsEmptyProps>;

interface TarefasTabTarefa {
    id?: number | string;
    __id?: string | number;
    sequencia?: number;
    descricao?: string;
    tarefaJustificativas?: any[];
    unidadesMateriais?: any[];
    tarefaUnidadesMateriais?: any[];
    [k: string]: unknown;
}
interface TarefasTabForm {
    tarefas?: TarefasTabTarefa[];
    [k: string]: unknown;
}
/** Hook do core-sdk (`useTarefaItemViewModel`) injetado como prop estável. */
type UseTarefaItemVmHook = (args: {
    tarefaId: string | number;
    mode: 'edit' | 'execute' | 'readOnly';
}) => any;
interface RenderInspecoesListArgs {
    inspecoes: any[];
    isMobile?: boolean;
    readOnly?: boolean;
    onRemove: (inspecao: any, idx: number) => void;
    onDuplicate: (inspecao: any) => void;
    updateInspecaoCallback: (id: any, nome: string, field: string, idx: number, inspecao: any) => void;
}
interface RenderLimitePickerArgs {
    insVm: any;
    limiteDeControleForm: any;
    onLimiteEditClick?: (op: any) => void;
    onLimiteClear?: () => void;
}
interface TarefasTabProps {
    /** Form atual (Redux do form pré-save) — fonte das tarefas. */
    form: TarefasTabForm;
    /** Quando true, oculta CTAs de mutação (status final). */
    isFinished: boolean;
    adicionarTarefaOs: (tarefa: {
        acao: any;
        descricao: string;
        sequencia: number;
    }) => void;
    /** Reservado (legacy). Mantido p/ compat — não usado internamente. */
    updateDescricaoTarefa?: (data: any) => void;
    onTarefaAction: (action: 'remove' | 'update' | string, data: any) => void;
    onInspecaoAction: (action: 'add' | 'remove' | 'update' | string, data: any) => void;
    onUnidadeMaterialAction: (action: 'add' | string, data: any) => void;
    onObservacaoAction: (action: 'add' | string, data: any) => void;
    onDupeTarefa: (tarefa: TarefasTabTarefa) => void;
    onOpenModelosTarefa: () => void;
    /** Caller injeta `useTarefaItemViewModel` do core-sdk. Função estável. */
    useTarefaItemVm: UseTarefaItemVmHook;
    loadUnidades: () => Promise<any[]>;
    loadParametros: () => Promise<any[]>;
    loadAcoes: () => Promise<any[]>;
    limiteDeControleForm?: any;
    onLimiteEditClick?: (op: any) => void;
    onLimiteClear?: () => void;
    renderInspecoesList: (args: RenderInspecoesListArgs) => React.ReactNode;
    renderLimiteDeControlePicker: (args: RenderLimitePickerArgs) => React.ReactNode;
    /** Lista de tipos de dado disponíveis no modal de Inspeção. Caller filtra
     *  conforme regras locais (ex.: remover Tempo / ƒ(x) e adicionar V/F). */
    tiposDeDadoInspecao: Array<{
        nome: string;
        type?: string;
    }>;
    onError?: (message: string, error?: unknown) => void;
    /** Caller injeta detecção mobile (ex.: `isMobile` de react-device-detect ou
     *  matchMedia). Default `false`. */
    isMobile?: boolean;
    className?: string;
}
declare const TarefasTab: React.ForwardRefExoticComponent<TarefasTabProps & React.RefAttributes<HTMLDivElement>>;

export { AcaoPicker, type AcaoPickerProps, type AcaoRef, BranchContainerV2, type BranchContainerV2Props, type BranchData, BranchDropDisplay, type BranchDropDisplayProps, type BranchNodeData, BranchNodeDisplayV2, type BranchNodeDisplayV2Props, type BranchNodeRecurso, FindRecursoByTagField, type FindRecursoByTagFieldProps, InspecaoModal, type InspecaoModalProps, type MaintainerAssignment, MantenedorPicker, type MantenedorPickerProps, MantenedorRender, MantenedorRenderCompact, type MantenedorRenderCompactProps, type MantenedorRenderProps, type MantenedorVM, ManutentorCard, ManutentorCardCompact, type ManutentorCardCompactProps, type ManutentorCardProps, type ManutentorEntry, ManutentoresDisplay, type ManutentoresDisplayProps, MetricasDisplay, type MetricasDisplayProps, type OSCheckoutForm, OSCheckoutModalV2, type OSCheckoutModalV2Props, type OSCheckoutMode, type OSCheckoutOMContext, OSQuickActionsMenu, type OSQuickActionsMenuOS, type OSQuickActionsMenuProps, OSQuickEndModal, type OSQuickEndModalOS, type OSQuickEndModalProps, OSQuickStartModal, type OSQuickStartModalOS, type OSQuickStartModalProps, type ToastType as OSQuickStartToastType, OS_STATUS_PALETTE, type ObservacaoMessage, ObservacaoModal, type ObservacaoModalProps, OrdemDeServicoDisplayCard, type OrdemDeServicoDisplayCardItem, type OrdemDeServicoDisplayCardProps, OrdemInfoCard, type OrdemInfoCardOrdem, type OrdemInfoCardProps, type OrdemStatus, OrdemStatusActions, type OrdemStatusActionsOrdem, type OrdemStatusActionsProps, OrdemStatusIndicator, type OrdemStatusIndicatorProps, OsCard, type OsCardOrdem, type OsCardProps, type OsDisplayStatus, OsEmpty, type OsEmptyProps, OsSkeleton, type OsSkeletonProps, type OsStatusMeta, PickMantenedorTipoModal, type PickMantenedorTipoModalProps, RecursoDisplayer, type RecursoDisplayerProps, type RenderInspecoesListArgs, type RenderLimitePickerArgs, TarefaCard, type TarefaCardProps, TarefaItem, type TarefaItemInspecaoExtras, type TarefaItemProps, TarefasTab, type TarefasTabForm, type TarefasTabProps, type TarefasTabTarefa, UnidadeMaterialModal, type UnidadeMaterialModalProps, UnidadeMaterialPicker, type UnidadeMaterialPickerProps, type UseTarefaItemVmHook, getOrdemDeServicoDisplayColor, getOsStatusMeta };
