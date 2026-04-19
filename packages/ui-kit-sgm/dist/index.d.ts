import React from 'react';
import { UnidadeMaterialValue, IUnidadeMaterialViewModel, InspecaoValue, IInspecaoModalViewModel, IRecursoDisplayerViewModel, IFindRecursoByTagViewModel, HttpController } from 'teraprox-core-sdk';
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
 * TarefaItem — widget apresentacional migrado de SGM-OS
 * (Wave 2B da sprint 2026-04-21-ui-kit-domain-split-wave0).
 *
 * Fluxos removidos vs. original:
 *   - `useDispatch`, `useCoreService` (subscribe/unsubscribe + controller),
 *     `useTarefaService`, `useUnidadeMaterialViewModel` saem da UI.
 *   - `endPointManutencao`, `ObjectUtils`, reducers SGM-OS e Screens
 *     (`InspecaoForm`, `ObservacaoModal`, `InspecoesList`,
 *     `GenericContextForm`, `GenericImageAttachment`,
 *     `InnerEditableTextField`, `IconWithBadge`) passam a ser injetados
 *     via props/slots pelo caller (SGM-OS).
 *
 * O widget foca apenas em composição visual + interações locais
 * (showObs / showInsp / showMat / edição inline de quantidade).
 * O caller orquestra: fetch, dispatch Redux, subscribes MatchingObject,
 * ciclo de ViewModel (Port `IUnidadeMaterialViewModel` do core-sdk).
 */
interface TarefaItemProps {
    tarefa: any;
    readOnly?: boolean;
    index: number;
    fatherId?: number | null;
    isMobile?: boolean;
    saving?: boolean;
    /** Chamado quando o status switch muda (argumento: evento). */
    onToggleStatus: (e: any) => void;
    /** Chamado com a nova descrição após edição inline. */
    onDescricaoUpdate: (descricao: string) => void;
    /** Chamado quando o usuário edita a quantidade utilizada de uma TUM. */
    onQuantidadeUnidadeMaterialChange: (quantidade: any, indexUnidadeMaterial: number) => void;
    /** Chamado no blur da quantidade (persiste no backend). */
    onQuantidadeUnidadeMaterialBlur: (tarefaUnidadeMaterialId: any, formToUpdate: any) => void;
    /** Chamado ao abrir o modal de observações (fetch + open). */
    onOpenObservacoes: () => void;
    /** Chamado ao salvar observação no modal. */
    onSaveObservacao: (obs: any) => void;
    /** Chamado ao enviar um anexo (file). */
    onUploadAnexo: (anexo: any) => void;
    /** Chamado ao deletar um anexo. */
    onDeleteAnexo: (id: any, anexoKey: any) => void;
    /** Chamado ao salvar uma nova inspeção a partir do form. */
    onSaveNovaInspecao: (inspecao: any) => void;
    /** Chamado ao adicionar uma unidade-material no modal de materiais. */
    onAddUnidadeMaterial: (form: any, closeForm: () => void) => void;
    /** Chamado para atualizar inspeção (usado no slot de inspeções). */
    onUpdateInspecaoField: (id: any, valor: any, field: string, indexInspecao: number) => void;
    /** Estado do formulário unidade-material (do ViewModel do core-sdk). */
    unidadeMaterialFormValue?: any;
    unidadeMaterialFormHandlers?: {
        onMaterialSelected?: (m: any) => void;
        onQuantidadeUpdate?: (q: any) => void;
        onUnidadeSelected?: (u: any) => void;
        loadMaterialsFunc?: (...a: any[]) => any;
        loadUnidadesFunc?: (...a: any[]) => any;
    };
    /** Slot: anexos (GenericImageAttachment) controlado pelo caller. */
    renderAnexos: (ctx: {
        onUpload: (anexo: any) => void;
        onDelete: (id: any, anexoKey: any) => void;
        filesData: any[];
    }) => React.ReactNode;
    /** Slot: componente de contador com badge (IconWithBadge). */
    renderIconWithBadge: (ctx: {
        icon: React.ReactNode;
        content: number;
    }) => React.ReactNode;
    /** Slot: campo editável inline (InnerEditableTextField). */
    renderEditableDescricao: (ctx: {
        initialValue: string;
        onHide: (desc: string) => void;
        renderFallback: (setActive: (v: boolean) => void, setOldValue: (v: any) => void) => React.ReactNode;
    }) => React.ReactNode;
    /** Slot: modal de observações (ObservacaoModal). */
    renderObservacaoModal: (ctx: {
        readOnly?: boolean;
        show: boolean;
        close: () => void;
        saveCallback: (obs: any) => void;
    }) => React.ReactNode;
    /** Slot: lista de inspeções (InspecoesList). */
    renderInspecoesList: (ctx: {
        readOnly?: boolean;
        inspecoes: any[];
        isMobile?: boolean;
        updateInspecaoCallback: (id: any, valor: any, field: string, indexInspecao: number) => void;
    }) => React.ReactNode;
    /** Slot: form de nova inspeção (GenericContextForm + InspecaoForm). */
    renderNovaInspecaoForm: (ctx: {
        onSaveClick: (inspecao: any) => void;
        handleClose: () => void;
    }) => React.ReactNode;
    /** Slot: form de nova unidade-material no container de Materiais. */
    renderNovaUnidadeMaterialForm: (ctx: {
        onSaveClick: (form: any) => void;
        handleClose: () => void;
        value?: any;
        handlers?: TarefaItemProps['unidadeMaterialFormHandlers'];
    }) => React.ReactNode;
}
declare const TarefaItem: React.FC<TarefaItemProps>;

export { AcaoPicker, type AcaoPickerProps, type AcaoRef, BranchDropDisplay, type BranchDropDisplayProps, FindRecursoByTagField, type FindRecursoByTagFieldProps, InspecaoModal, type InspecaoModalProps, type MaintainerAssignment, MantenedorRender, MantenedorRenderCompact, type MantenedorRenderCompactProps, type MantenedorRenderProps, type MantenedorVM, ManutentorCard, type ManutentorCardProps, type ManutentorEntry, ManutentoresDisplay, type ManutentoresDisplayProps, MetricasDisplay, type MetricasDisplayProps, RecursoDisplayer, type RecursoDisplayerProps, TarefaCard, type TarefaCardProps, TarefaItem, type TarefaItemProps, UnidadeMaterialModal, type UnidadeMaterialModalProps, UnidadeMaterialPicker, type UnidadeMaterialPickerProps };
