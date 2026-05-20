import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';
import { AnexoPersistedItem, AnexoLocalItem } from '@hashcodeti/ui-kit-core';
export { FrequenciaFormV2, FrequenciaFormV2Props, RecorrenciaEscala, RecorrenciaValue } from '@hashcodeti/ui-kit-core';

interface CalculoVM {
    _id?: string | number;
    formula?: string;
    material?: {
        nome?: string;
        id?: string | number;
    };
    camposVirtuais?: Array<{
        id: string;
        token: string;
        name: string;
        value: string;
        valor: number | string;
        label: string;
    }>;
    [key: string]: any;
}
interface CalculoCorrecaoProps {
    calculo: CalculoVM;
    valorDesejado?: string | number;
    addCalculoHandler: (calculo: CalculoVM) => void;
}
declare const CalculoCorrecao: ({ calculo, valorDesejado: _valorDesejado, addCalculoHandler, }: CalculoCorrecaoProps) => react_jsx_runtime.JSX.Element;

interface CalculoDeCorrecaoVM {
    _id?: string | number;
    formula?: string;
    unidade?: string;
    material?: {
        id: any;
        nome: string;
    };
    camposVirtuais?: Array<{
        token: string;
        valor: any;
        name?: string;
        value?: string;
    }>;
    unidadeId?: string | number;
    nomeUnidade?: string;
    fatorSiUnidade?: number;
    unidadeBaseSi?: string;
}
interface RegraDeCorrecaoVM {
    tipoDeCorrecao: 'UP' | 'DOWN' | string;
    acao?: {
        nome?: string;
        descricao?: string;
    };
    calculosDeCorrecao?: CalculoDeCorrecaoVM[];
}
interface CalculadoraCorrecaoModalProps {
    show: boolean;
    onClose: (open: boolean) => void;
    regras: RegraDeCorrecaoVM[];
    valorAtual?: number | string;
    onConfirm: (regra: RegraDeCorrecaoVM | null, resultados: any[]) => Promise<void> | void;
    /**
     * Carrega uma dimensão por ID. Substitui o uso de `useCoreService` original.
     * Exemplo no caller (SGP-*): `fetchDimensao: (id) => controller('dimensao').read(null, id)`
     */
    fetchDimensao?: (idDimensao: string | number) => Promise<{
        valor: number | string;
    }>;
}
declare const CalculadoraCorrecaoModal: ({ show, onClose, regras, valorAtual, onConfirm, fetchDimensao, }: CalculadoraCorrecaoModalProps) => react_jsx_runtime.JSX.Element;

interface UnidadeMaterialVM {
    nomeMaterial?: string;
    unidadeLabel?: string;
    quantidade?: number | string;
    materialId?: string | number | null;
    unidadeId?: string | number | null;
    nomeUnidade?: string;
    fatorSiUnidade?: number;
    unidadeBaseSi?: string;
}
interface TarefaUnidadeMaterialVM {
    unidadeMaterial?: UnidadeMaterialVM;
    [key: string]: any;
}
interface UnidadeMaterialCardProps {
    tarefaUnidadeMaterial: TarefaUnidadeMaterialVM;
    onRemoveClick?: (tum: TarefaUnidadeMaterialVM) => void;
    onEditClick?: (tum: TarefaUnidadeMaterialVM) => void;
    header?: ReactNode;
    materialContent?: ReactNode;
    unidadeContent?: ReactNode;
    quantidadeContent?: ReactNode;
    actions?: ReactNode;
    indexLabel?: ReactNode;
}
declare const UnidadeMaterialCard: ({ onRemoveClick, onEditClick, tarefaUnidadeMaterial, header, materialContent, unidadeContent, quantidadeContent, actions, indexLabel, }: UnidadeMaterialCardProps) => react_jsx_runtime.JSX.Element;

interface UnidadeMaterialFormValue {
    material?: {
        id?: any;
        nome?: string;
    };
    unidade?: {
        id?: any;
        nome?: string;
        label?: string;
        fatorSi?: number;
        unidadeBaseSi?: string;
    };
    quantidade?: number;
}
interface AcaoOption {
    id?: any;
    nome?: string;
    descricao?: string;
}
interface TarefaFormVM {
    acaoId?: any;
    descricao?: string;
    status?: string;
    acao?: AcaoOption | null;
    tarefasUnidadeMaterial?: TarefaUnidadeMaterialVM[];
    [key: string]: any;
}
interface TarefaUnidadeFormProps {
    tarefaForm?: TarefaFormVM;
    onSaveForm?: (form: TarefaFormVM) => void;
    onCancelEdit?: () => void;
    /** Valor corrente do sub-form de unidade material (controlado pelo caller). */
    unidadeMaterial?: UnidadeMaterialFormValue;
    /** Limpa o sub-form (normalmente dispatch do reducer externo). */
    onClearUnidadeMaterial?: () => void;
    /** Pre-popula o sub-form com base no TarefaUnidadeMaterial que vai ser editado. */
    onLoadTumForEdit?: (tum: TarefaUnidadeMaterialVM) => void;
    /** Slot render do sub-form real de UnidadeMaterial (ex.: UnidadeMaterialForm do teraprox-ui-kit). */
    renderUnidadeMaterialForm?: () => ReactNode;
    /** Carrega as opcoes de Acao para o AutoComplete (ex.: `() => controller('acao', endPointCaderno).get('acao')`). */
    loadAcoes: () => Promise<AcaoOption[]>;
}
declare const TarefaUnidadeForm: ({ tarefaForm: initialTarefaForm, onSaveForm, onCancelEdit, unidadeMaterial, onClearUnidadeMaterial, onLoadTumForEdit, renderUnidadeMaterialForm, loadAcoes, }: TarefaUnidadeFormProps) => react_jsx_runtime.JSX.Element;

interface CampoVM {
    id?: string | number;
    __id?: string | number;
    label?: string;
    _operacao?: string;
    descricao?: string;
    controle?: {
        nomeParametro?: string;
    };
    tipoDeCampo?: 'number' | 'time' | 'formula' | 'text' | string;
    regrasDeCorrecao?: any[];
    reporter?: boolean;
    unidade?: string;
    _frequencia?: string;
    posicao?: number;
    checked?: boolean;
    removed?: boolean;
    [key: string]: any;
}
interface CampoDeVerificacaoV2Props {
    campo: CampoVM;
    index: number;
    camposFiltrados?: any[];
    eventsForCampo?: any;
    isMarking?: boolean;
    isReordering?: boolean;
    moveCard: (dragCampoId: string | number, hoverCampoId: string | number, position: 'before' | 'after') => void;
    getTipoNome: (tipo: string) => string;
    toggleTipoFilter: (tipo: string) => void;
    editCampoHandler: (campo: CampoVM) => void;
    toggleReporter: (campo: CampoVM) => void;
    onMarkCampo: (campo: CampoVM, checked: boolean) => void;
    onChangePosicao: (campo: CampoVM, valor: any) => void;
}
declare const CampoDeVerificacaoV2: ({ campo, index, moveCard, getTipoNome, toggleTipoFilter, editCampoHandler, toggleReporter, isMarking, isReordering, onMarkCampo, onChangePosicao, }: CampoDeVerificacaoV2Props) => react_jsx_runtime.JSX.Element;

interface OrdemDeCorrecaoCardProps {
    ordem: any;
    onEditar?: () => void;
    onApontar?: () => void;
    onViewRegistro?: (registroDeCampoId: any) => void;
    onSaveTarefa?: (ordem: any, tarefa: any) => Promise<void> | void;
    onSaveTarefaViaRabbit?: (ordem: any, tarefa: any) => Promise<void> | void;
    onCancel?: (ordem: any) => void;
}
declare const OrdemDeCorrecaoCard: React__default.MemoExoticComponent<({ ordem, onEditar, onApontar, onViewRegistro, onSaveTarefa, onSaveTarefaViaRabbit, onCancel, }: OrdemDeCorrecaoCardProps) => react_jsx_runtime.JSX.Element>;

interface UnidadeMaterialFormVM {
    material?: {
        id?: any;
        nome?: string;
    };
    unidade?: {
        id?: any;
        nome?: string;
        label?: string;
        fatorSi?: number;
        unidadeBaseSi?: string;
    };
    quantidade?: number | string;
    [key: string]: any;
}
interface TarefaCardProps {
    tarefa: any;
    tIdx: number;
    totalTarefas: number;
    onEdit: (tarefa: any) => void;
    onMove: (from: number, to: number) => void;
    onRemoveMaterial?: (...args: any[]) => void;
    onAddMaterial?: (tIdx: number, novoMaterial: any) => void;
    onRemove?: (tIdx: number) => void;
    onUndoRemove?: (tIdx: number) => void;
    /** Estado do form de unidade material (vem do store no caller). */
    unidadeMaterial?: UnidadeMaterialFormVM;
    /** Limpar form do unidadeMaterial (dispatch no caller). */
    onClearUnidadeMaterial?: () => void;
    /** Render do modal de adicionar material — caller injeta usando seu UnidadeMaterialForm/Modal. */
    renderUnidadeMaterialModal?: (args: {
        show: boolean;
        onClose: () => void;
        onConfirm: () => void;
        title: string;
    }) => React__default.ReactNode;
}
declare const TarefaCard: ({ tarefa, tIdx, totalTarefas, onEdit, onMove, onRemoveMaterial, onAddMaterial, onRemove, onUndoRemove, unidadeMaterial, onClearUnidadeMaterial, renderUnidadeMaterialModal, }: TarefaCardProps) => react_jsx_runtime.JSX.Element;

interface AutorizacaoVM {
    id: string | number;
    ordemDeCorrecaoId?: string | number;
    status?: 'AGUARDANDO' | 'APROVADA' | 'REJEITADA' | string;
    valorMedido?: number | string;
    valorCorrigido?: number | string;
    valorMinimoAutonomo?: number | string;
    valorMaximoAutonomo?: number | string;
    motivo?: string;
}
interface AutorizacaoCardProps {
    autorizacao: AutorizacaoVM;
    onAprovar: (id: string | number) => Promise<void> | void;
    onRejeitar: (id: string | number, motivo: string) => Promise<void> | void;
    /** Render prop opcional para o modal de rejeicao (caller controla). */
    renderRejeicaoModal?: (args: {
        show: boolean;
        onHide: () => void;
        onConfirm: (motivo: string) => Promise<void> | void;
        loading: boolean;
    }) => React__default.ReactNode;
}
declare const AutorizacaoCard: ({ autorizacao, onAprovar, onRejeitar, renderRejeicaoModal, }: AutorizacaoCardProps) => react_jsx_runtime.JSX.Element;

interface BadgePendenteAutorizacaoProps {
    status?: string;
    className?: string;
}
declare const BadgePendenteAutorizacao: React$1.FC<BadgePendenteAutorizacaoProps>;

interface MaterialApontarUnidadeMaterialVM {
    nomeMaterial: string;
    unidadeLabel: string;
    quantidade: number | string;
}
interface MaterialApontarTumVM {
    unidadeMaterial: MaterialApontarUnidadeMaterialVM;
    quantidade?: number | string;
}
interface MaterialApontarCardProps {
    tum: MaterialApontarTumVM;
    tarefaIdx: number;
    tumIdx: number;
    onInputChange: (tarefaIdx: number, tumIdx: number, valor: string) => void;
}
declare const MaterialApontarCard: React$1.FC<MaterialApontarCardProps>;

interface TarefaApontarVM {
    sequencia: number | string;
    descricao: string;
    status?: string;
    tarefasUnidadeMaterial: MaterialApontarTumVM[];
}
interface TarefaApontarCardProps {
    tarefa: TarefaApontarVM;
    tarefaIdx: number;
    onStatusChange: (tarefaIdx: number, checked: boolean) => void;
    onInputChange: (tarefaIdx: number, tumIdx: number, valor: string) => void;
    /**
     * Style da badge de status (palette inline definida pelo caller para parity
     * visual com OrdemDeCorrecaoCard). Caller pode reutilizar `badgeStyleForStatus`.
     */
    getStatusStyle: (status: string) => React$1.CSSProperties;
}
declare const TarefaApontarCard: React$1.FC<TarefaApontarCardProps>;

interface RelatorioModernCardProps {
    registro: any;
    showValidation?: boolean;
    onCopyToClipboard?: (registro: any) => void;
    onToggleVisibility?: (registroId: any) => void;
    /** Callback para abrir a ordem de correcao (substitui useNavigate). */
    onOpenCorrecao?: (correcao: any) => void;
}
declare const RelatorioModernCard: ({ registro, showValidation, onCopyToClipboard, onToggleVisibility, onOpenCorrecao, }: RelatorioModernCardProps) => react_jsx_runtime.JSX.Element;

interface RelatorioStats {
    total: number;
    conformes: number;
    naoConformes: number;
    comCorrecoes: number;
}
interface RelatorioModernWrapperProps {
    relatorio: any;
    /** userName injetado pelo caller (selecionado do store: state.global.userName). */
    userName: string;
    onStatsUpdate?: (relatorioId: any, stats: RelatorioStats) => void;
    /** Toast handler (substitui useToasts). */
    onToast?: (args: {
        message: string;
        appearance: 'success' | 'error' | 'info' | 'warning';
    }) => void;
    /** Navegacao para ordem de correcao (substitui useNavigate). */
    onOpenCorrecao?: (correcao: any) => void;
}
interface RelatorioModernWrapperHandle {
    generateEmailHTML: () => string;
}
declare const RelatorioModernWrapper: React__default.ForwardRefExoticComponent<RelatorioModernWrapperProps & React__default.RefAttributes<RelatorioModernWrapperHandle>>;

interface CadernoDeVerificacaoHeaderProps {
    isSaving?: boolean;
    saveCustomFolhas?: () => void;
    canSave?: boolean;
    getFolhaData: () => any;
    markRegistros?: () => void;
    deleteMarkedRegistros?: () => void;
    hasMarkedRecords?: boolean;
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    navigationComponent?: () => React__default.ReactNode;
    onRefresh?: () => void;
    isMobile?: boolean;
    /** Callback dispatch->Redux setData. */
    onDataChange?: (isoDate: string) => void;
    /** Slot para o picker de data (FormField do MF). */
    renderDateField?: (args: {
        value: any;
        onChange: (v: any) => void;
    }) => React__default.ReactNode;
    /** Slot para o painel de acoes deletar / selecionar (ActionButtons + PermissionContainer). */
    renderDeleteActions?: () => React__default.ReactNode;
}
declare const CadernoDeVerificacaoHeader: React__default.MemoExoticComponent<({ isSaving, saveCustomFolhas, canSave, getFolhaData, searchTerm, setSearchTerm, navigationComponent, onRefresh, isMobile, onDataChange, renderDateField, renderDeleteActions, }: CadernoDeVerificacaoHeaderProps) => react_jsx_runtime.JSX.Element>;

interface HistoryRecord {
    id: any;
    data: any;
    valor: any;
    intervalo?: number | null;
    nomeUsuario?: string;
    usuario?: {
        nome?: string;
    };
}
interface FrequencyVM {
    valor?: number | string;
    escala?: string;
}
interface HistoryModalProps {
    show: boolean;
    onClose: () => void;
    historyData: HistoryRecord[] | null | undefined;
    isLoading?: boolean;
    title?: string;
    unit?: string;
    frequency?: FrequencyVM | null;
    canShowChart?: boolean;
    onOpenChart?: () => void;
    onRefresh?: (range: {
        startDate: string;
        endDate: string;
    }) => void;
    /** Helpers/components injetados pelo caller para preservar parity. */
    formatDateTime?: (date: any) => string;
    convertToScale?: (valor: number, escala: string) => number | null;
    renderStatusLight?: (active: boolean) => React__default.ReactNode;
}
declare const HistoryModal: ({ show, onClose, historyData, isLoading, title, unit, frequency, onOpenChart, canShowChart, onRefresh, formatDateTime, convertToScale, renderStatusLight, }: HistoryModalProps) => react_jsx_runtime.JSX.Element;

interface RegistroDeCampoFieldPalette {
    ok: string;
    erro: string;
}
interface RegistroDeCampoFieldProps {
    folha: {
        id?: any;
        updatedAt?: any;
    };
    registro: any;
    setValor: (valor: any) => void;
    sendValor: (formatarStyleCampo: (v: any, r: any) => void) => void;
    setStyle: (style: Record<string, any>) => void;
    setErrorMsg: (msg: string) => void;
    recalculateValor: (formatarStyleCampo: (v: any, r: any) => void) => void;
    /** Cores aplicadas a sucesso/erro de validacao (default verde/vermelho pastel). */
    palette?: RegistroDeCampoFieldPalette;
    /** Info de formula injetada pelo caller (substitui helpers SGP locais). */
    formulaInfo?: {
        /** True se este campo eh formula sem dependencia de input do usuario. */
        needsUserInput?: boolean;
        /** Texto humano para o tooltip do icone de recalculo. */
        displayHint?: string;
    };
}
declare const RegistroDeCampoField: ({ folha, registro, setValor, sendValor, setStyle, setErrorMsg, recalculateValor, palette, formulaInfo, }: RegistroDeCampoFieldProps) => react_jsx_runtime.JSX.Element | null;

type OldestNewestMap = Map<any, {
    start?: any;
    end?: any;
    length?: number;
} | any[]>;
interface UseRegistroStyleArgs {
    registro: any;
    oldestAndNewestMap: OldestNewestMap;
}
declare const useRegistroStyle: ({ registro, oldestAndNewestMap }: UseRegistroStyleArgs) => "" | "custom-row-top" | "custom-row-bottom" | "custom-row";

type AnexoToastLevel = 'success' | 'error' | 'info';
interface UseAnexoManagerArgs {
    registroId: any;
    rawAnexos: any[] | undefined;
    putAnexoApi: (id: any, file: File) => Promise<any>;
    deleteAnexoApi: (id: any, key: string) => Promise<any>;
    getSignedUrl?: (key: string) => Promise<string>;
    onToast?: (level: AnexoToastLevel, msg: string) => void;
}
interface UseAnexoManagerResult {
    showAnexoModal: boolean;
    openAnexoModal: () => void;
    closeAnexoModal: () => void;
    persistedAnexos: AnexoPersistedItem[];
    locais: AnexoLocalItem[];
    anexoBadgeCount: number;
    onAddFiles: (files: File[]) => void;
    onRemoveLocal: (localId: string) => void;
    onRemovePersistido: (id: string | number) => Promise<void>;
    onDownloadAnexo: (anexo: AnexoPersistedItem) => Promise<void>;
    getImageReadUrl: (anexo: AnexoPersistedItem) => Promise<string>;
}
declare const useAnexoManager: ({ registroId, rawAnexos, putAnexoApi, deleteAnexoApi, getSignedUrl, onToast, }: UseAnexoManagerArgs) => UseAnexoManagerResult;

interface RegistroDeCampoCardPalette {
    okBg?: string;
    errBg?: string;
}
interface RegistroDeCampoCardViewProps {
    registro: any;
    index: number;
    folha: {
        id?: any;
        updatedAt?: any;
        registrosDeCampo?: any[];
    };
    paginaAtual?: number;
    oldestAndNewestMap: OldestNewestMap;
    /** Registros agrupados (pai + filhos) — sem o principal. */
    relatedRegistros?: any[];
    showRegistroData?: boolean;
    setValor: (valor: any) => void;
    setStyle: (style: Record<string, any>) => void;
    setErrorMsg: (msg: string) => void;
    sendValor: (formatarStyleCampo: (v: any, r: any) => void) => void;
    recalculateValor: (formatarStyleCampo: (v: any, r: any) => void) => void;
    onSaveJustificativas: (justificativas: any[]) => void;
    onCheck?: (checked: boolean) => void;
    onAddChild?: (registro: any) => void;
    onDelete?: (registro: any) => void;
    onAbrirCorrecao?: (registro: any) => void;
    putAnexoApi: (id: any, file: File) => Promise<any>;
    deleteAnexoApi: (id: any, key: string) => Promise<any>;
    getSignedUrl?: (key: string) => Promise<string>;
    fetchHistoryApi: (campoId: any, range: {
        startDate: string;
        endDate: string;
        limit: number;
        order: 'ASC' | 'DESC';
    }) => Promise<any[]>;
    loadChart?: (campo: any, controle: any, historyData: any[]) => void;
    onToast?: (level: AnexoToastLevel, msg: string) => void;
    renderJustificativaModal?: (args: {
        show: boolean;
        onClose: () => void;
        registro: any;
        onSaveJustificativas: (j: any[]) => void;
    }) => React.ReactNode;
    renderStatusLight?: (active: boolean) => React.ReactNode;
    formatDateTime?: (date: any) => string;
    convertMilisecondsToScale?: (valor: number, escala: string) => number | null;
    palette?: RegistroDeCampoCardPalette;
}
declare const RegistroDeCampoCardView: React$1.ForwardRefExoticComponent<RegistroDeCampoCardViewProps & React$1.RefAttributes<HTMLDivElement>>;

interface UseJustificativaModalArgs {
    registro: any;
    /** Callback do caller (substitui dispatch Redux original). */
    onSaveJustificativas: (justificativas: any[]) => void;
}
interface UseJustificativaModalResult {
    showJustificativaModal: boolean;
    openJustificativaModal: () => void;
    closeJustificativaModal: () => void;
    justificativasValidas: any[];
    validCount: number;
    saveJustificativas: (justificativas: any[]) => void;
}
declare const useJustificativaModal: ({ registro, onSaveJustificativas, }: UseJustificativaModalArgs) => UseJustificativaModalResult;

interface HistoryFilters {
    startDate?: string;
    endDate?: string;
    limit?: number;
    order?: 'ASC' | 'DESC';
}
interface UseHistoryArgs {
    campoDeVerificacaoId: any;
    fetchHistoryApi: (campoId: any, filters: Required<HistoryFilters>) => Promise<any[]>;
}
interface UseHistoryResult {
    showHistory: boolean;
    openHistory: () => void;
    closeHistory: () => void;
    historyData: any[];
    isLoadingHistory: boolean;
    fetchHistory: (filters?: HistoryFilters) => Promise<void>;
}
declare const useHistory: ({ campoDeVerificacaoId, fetchHistoryApi }: UseHistoryArgs) => UseHistoryResult;

interface ReferenciaCadernoVM {
    id: any;
    nome: string;
    [key: string]: any;
}
interface ReferenciaCampoVM {
    id: any;
    label?: string;
    descricao?: string;
    controle?: {
        nomeParametro?: string;
    };
    [key: string]: any;
}
interface ReferenciaDinamicaPickerProps {
    /** Carrega lista de cadernos (para o AutoComplete). */
    loadCadernos: () => Promise<ReferenciaCadernoVM[]>;
    /** Dado um caderno selecionado, carrega seus campos. */
    loadCamposByCaderno: (caderno: ReferenciaCadernoVM) => Promise<ReferenciaCampoVM[]>;
    /** Callback ao selecionar/desmarcar campo. */
    setCampo: (campo: ReferenciaCampoVM | null) => void;
}
declare const ReferenciaDinamicaPicker: ({ loadCadernos, loadCamposByCaderno, setCampo, }: ReferenciaDinamicaPickerProps) => react_jsx_runtime.JSX.Element;

interface FormulaBuilderOffcanvasProps {
    show: boolean;
    showFunc: (next: boolean) => void;
    /** Conteudo do builder injetado pelo caller. */
    children: ReactNode;
    title?: string;
}
declare const FormulaBuilderOffcanvas: ({ show, showFunc, children, title, }: FormulaBuilderOffcanvasProps) => react_jsx_runtime.JSX.Element;

interface SheetVM {
    id: any;
    numeroDaPagina: any;
    data: string | Date;
    [key: string]: any;
}
interface SheetMoveInfo {
    from: any;
    to: any;
}
interface SheetOrdenationCardProps {
    sheet: SheetVM;
    moveInfo?: SheetMoveInfo | null;
    onNumeroDaPaginaChange: (sheetId: any, novoNumero: any) => string | undefined;
    onUndoMove: (sheetId: any) => void;
    onRemove: (sheet: SheetVM) => void;
    /** Wrapper opcional de permissao (ex.: gating SGP). Recebe o botao trash. */
    renderRemoveButton?: (trashEl: ReactNode) => ReactNode;
    /** id DOM opcional para o container do botao trash (default: removerFolhaButton). */
    removeButtonId?: string;
}
declare const SheetOrdenationCard: ({ sheet, moveInfo, onNumeroDaPaginaChange, onUndoMove, onRemove, renderRemoveButton, removeButtonId, }: SheetOrdenationCardProps) => react_jsx_runtime.JSX.Element;

interface SelectableCampoVM {
    id?: any;
    label?: string;
    descricao?: string;
    controleRefId?: any;
    controle?: {
        nomeParametro?: string;
    };
    [key: string]: any;
}
interface CampoDeVerificacaoSelectableCardsProps<T extends SelectableCampoVM = SelectableCampoVM> {
    /** Lista de campos (filtrados pelo caller). */
    camposDeVerificacao: T[];
    /** Callback chamado a cada mudanca de selecao. */
    onSelectionChange?: (selecionados: T[]) => void;
    /** Slot opcional para o painel de filtro (renderizado acima dos cards). */
    filterSlot?: ReactNode;
    /** Botao opcional de toggle de filtro (renderizado no topo). */
    filterToggle?: ReactNode;
    /** Mostrar botoes "Selecionar todos" / "Desfazer selecao". Default true. */
    showBulkActions?: boolean;
}
declare const CampoDeVerificacaoSelectableCards: <T extends SelectableCampoVM = SelectableCampoVM>({ camposDeVerificacao, onSelectionChange, filterSlot, filterToggle, showBulkActions, }: CampoDeVerificacaoSelectableCardsProps<T>) => react_jsx_runtime.JSX.Element;

interface ChartStatsProps {
    media?: number | string;
    minimo?: number | string;
    maximo?: number | string;
    cpk?: number | string;
    atendimentoFrequencia?: number | string;
    frequenciaMedia?: number | string;
}
declare const ChartStats: ({ media, minimo, maximo, cpk, atendimentoFrequencia, frequenciaMedia, }: ChartStatsProps) => react_jsx_runtime.JSX.Element;

interface ChartWithStatsProps {
    data: any[];
    lines: any[];
    xAxisKey: string;
    stats: ChartStatsProps;
    hideZero?: boolean;
    hideYAxis?: boolean;
    hideZeroHandler?: (next: boolean) => void;
    unit?: string;
    enableHideZeroButton?: boolean;
    yAxisRange?: any;
}
declare const ChartWithStats: ({ data, lines, xAxisKey, stats, hideZero, hideYAxis, hideZeroHandler, unit, enableHideZeroButton, yAxisRange, }: ChartWithStatsProps) => react_jsx_runtime.JSX.Element;

type FluxoTipoConfigKey = 'inicio_fim' | 'decisao' | 'processo' | 'subprocesso' | 'operacao_manual' | 'conector' | 'documento';
interface FluxoTipoConfig {
    label: string;
    cor: string;
    textColor: string;
    borderRadius?: string;
    style: React$1.CSSProperties;
}
/** Map tipo → visual config compartilhado por FluxoNode/FluxoLegend/FluxoToolbar. */
declare const TIPO_CONFIG: Record<FluxoTipoConfigKey, FluxoTipoConfig>;
interface FluxoNodeData {
    tipo?: FluxoTipoConfigKey | string;
    label?: string;
    operacao?: {
        descricao?: string;
    };
    [key: string]: any;
}
interface FluxoNodeProps {
    data: FluxoNodeData;
    selected?: boolean;
}
declare const FluxoNode: React$1.FC<FluxoNodeProps>;

interface FluxoEdgeData {
    label?: string;
    [key: string]: any;
}
interface FluxoEdgeProps {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: any;
    targetPosition: any;
    data?: FluxoEdgeData;
    markerEnd?: string;
    style?: React$1.CSSProperties;
}
declare const FluxoEdge: React$1.FC<FluxoEdgeProps>;

interface FluxoLegendProps {
    className?: string;
}
declare const FluxoLegend: React$1.FC<FluxoLegendProps>;

interface FluxoToolbarProps {
    className?: string;
}
declare const FluxoToolbar: React$1.FC<FluxoToolbarProps>;

interface PlanoBadgeOption {
    value: string | number;
    label: string;
    totalRegistrosForaGlobal?: number;
    itensAlertaEstatistica?: number;
}
interface PlanoBadgeSelectorProps {
    selectedPlanoId?: string | number | null;
    setSelectedPlanoId: (value: string | number) => void;
    planoOptions?: PlanoBadgeOption[];
    disabled?: boolean;
    className?: string;
}
declare const PlanoBadgeSelector: React$1.FC<PlanoBadgeSelectorProps>;

interface EstatisticasFrequenciaVM {
    totalControles?: number;
    realizado?: number;
    planejado?: number;
    realizadoPct?: number;
    frequenciaPlanejada?: number;
    frequenciaRealizada?: number;
    frequenciaPct?: number;
}
interface EstatisticasFrequenciaDashboardProps {
    titulo?: string;
    estatisticas?: EstatisticasFrequenciaVM;
    className?: string;
}
declare const EstatisticasFrequenciaDashboard: React$1.FC<EstatisticasFrequenciaDashboardProps>;

interface EstatisticasPlanoVM {
    cpkMedio?: number | null;
    totalControles?: number;
    totalRegistrosForaGlobal?: number;
    totalRegistrosForaPct?: number;
    itensAlertaEstatistica?: number;
}
interface PlanoDashboardCardProps {
    selectedPlanoId?: string | number | null;
    setSelectedPlanoId: (value: string | number) => void;
    planoOptions: PlanoBadgeOption[];
    estatisticasPlano?: EstatisticasPlanoVM;
    estatisticasFrequencia?: EstatisticasFrequenciaVM;
    className?: string;
}
declare const PlanoDashboardCard: React$1.FC<PlanoDashboardCardProps>;

interface ControleOption {
    value: string | number;
    label?: string;
    nomeParametro?: string;
    operacao?: string;
    cpk?: number | null;
    qtdFora?: number;
    statAlert?: boolean;
}
interface ControleDashboardCardProps {
    nomePlanoSelecionado?: string;
    controleOptions: ControleOption[];
    selectedControleId?: string | number | null;
    setSelectedControleId: (value: string | number) => void;
    graficosAtivos?: Set<string>;
    onToggleGrafico?: (value: string | number) => void;
    className?: string;
}
declare const ControleDashboardCard: React$1.FC<ControleDashboardCardProps>;

interface ControleSelectorPlanoOption {
    id: string | number;
    nome: string;
    [key: string]: any;
}
interface ControleSelectorOperacao {
    id: string | number;
    descricao: string;
    [key: string]: any;
}
interface ControleSelectorLpc {
    id: string | number;
    operacao: ControleSelectorOperacao;
    controles: ControleSelectorControle[];
    [key: string]: any;
}
interface ControleSelectorLimite {
    nome?: string;
    boundRule?: string;
    valor?: number | string;
}
interface ControleSelectorEspecificacao {
    limitesDeControle?: ControleSelectorLimite[];
}
interface ControleSelectorControle {
    id: string | number;
    parametro: {
        nome: string;
        unidadeId?: string | number;
    };
    especificacao?: ControleSelectorEspecificacao;
    [key: string]: any;
}
interface ControleSelectorPlano {
    id: string | number;
    nome: string;
    linhasDePlanoDeControle: ControleSelectorLpc[];
}
interface ControleSelectorProps {
    /** Lista de planos disponiveis (resolvida pelo caller, ex.: via useCoreService) */
    planoOptions: ControleSelectorPlanoOption[];
    /** Carrega o detalhe completo de um plano (inclui linhasDePlanoDeControle). */
    loadPlano: (planoId: string | number) => Promise<ControleSelectorPlano>;
    /** Resolve label da unidade para exibicao nos limites. */
    getUnidadeLabel: (unidadeId: string | number | undefined) => string;
    /** Callback final com o controle selecionado e a operacao. */
    setControleFunc: (controle: ControleSelectorControle | null, operacao?: ControleSelectorOperacao | null) => void;
    className?: string;
}
declare const ControleSelector: React$1.FC<ControleSelectorProps>;

type HistogramHist = Map<number | string, number> | Record<string | number, number> | undefined;
interface HistogramData {
    hora: number;
    incidencias: number;
}
interface EstatisticaControleVM {
    cpk?: number | null;
    media?: number | null;
    menorValor?: number | null;
    maiorValor?: number | null;
    foraDeEspecificacaoTotal?: number;
}
interface EstatisticaDoControleCurrent {
    controleId?: string | number;
    controle?: {
        operacao?: string;
        nomeParametro?: string;
    };
    estatisticas?: EstatisticaControleVM;
    analiseFrequencia?: EstatisticasFrequenciaVM & {
        frequenciaPlanejada?: number;
    };
    histograma?: HistogramHist;
}
interface EstatisticaDoControleDashBoardProps {
    current: EstatisticaDoControleCurrent;
    /** Slot opcional p/ render do histograma (recharts injetado pelo caller). */
    renderHistogram?: (data: HistogramData[]) => React$1.ReactNode;
    className?: string;
}
declare const EstatisticaDoControleDashBoard: React$1.FC<EstatisticaDoControleDashBoardProps>;

interface RegistroviewLimite {
    nome?: string;
    boundRule?: string;
    valor?: number | string;
}
interface RegistroviewControle {
    operacao?: string;
    nomeParametro?: string;
    labelUnidade?: string;
    especificacao?: {
        limitesDeControle?: RegistroviewLimite[];
    };
}
interface RegistroviewRegistro {
    id: string | number;
    data: string;
    valor: number | string;
    frequenciaRealizada?: number;
    foraDeEspecificacao?: boolean;
    regrasQueFalharam?: Array<{
        boundRule: string;
        valor: number | string;
    }>;
}
interface RegistroviewDashboardCardProps {
    controle: RegistroviewControle;
    registros?: RegistroviewRegistro[];
    setShowHist: (show: boolean) => void;
    setRegistroModal: (registro: RegistroviewRegistro & {
        unidade?: string;
    }) => void;
    /** Default: formata como `DD/MM/YYYY HH:mm` sem dayjs. */
    formatDateTime?: (iso: string) => string;
    className?: string;
}
declare const RegistroviewDashboardCard: React$1.FC<RegistroviewDashboardCardProps>;

interface FrequenciaPickerProps {
    /** Componente FrequenciaForm injetado (MF resolve). Recebe `...props` adiante. */
    FrequenciaForm: React$1.ComponentType<any>;
    [key: string]: any;
}
declare const FrequenciaPicker: React$1.FC<FrequenciaPickerProps>;

interface AutorizacaoRejeicaoModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: (motivo: string) => void;
    loading?: boolean;
}
declare const AutorizacaoRejeicaoModal: React$1.FC<AutorizacaoRejeicaoModalProps>;

interface Justificativa {
    id: string | number;
    descricao: string;
    user?: {
        userId: string | number;
        userName?: string;
        firstName?: string;
    };
    createdAt: string | number | Date;
    removed?: boolean;
    isNew?: boolean;
}
interface JustificativaModalProps {
    /** Visibilidade do modal. */
    show: boolean;
    /** Callback de fechamento (overlay/ESC/X). */
    onClose: () => void;
    /** Lista atual de justificativas. */
    justificativas: Justificativa[];
    /** ID do usuário corrente (para identificar autoria). */
    currentUserId: string | number;
    /** Nome/Primeiro nome do usuário corrente. */
    currentUserName: string;
    /** Callback chamado a cada add/edit/remove/undo. Pode ser async. */
    onUpdateJustificativas: (justificativas: Justificativa[]) => Promise<void> | void;
}
/**
 * JustificativaModal — modal estilo chat para comentários sobre um registro
 * de campo. Mensagens próprias à esquerda, alheias à direita. Edição inline
 * apenas das próprias. Soft-delete + undo (mensagens removidas ficam riscadas).
 *
 * @example
 * <JustificativaModal
 *   show={open}
 *   onClose={() => setOpen(false)}
 *   justificativas={list}
 *   currentUserId={user.id}
 *   currentUserName={user.firstName}
 *   onUpdateJustificativas={async (next) => savePort.update(registroId, next)}
 * />
 *
 * @example
 * // Lista vazia — apenas formulário de "novo registro"
 * <JustificativaModal
 *   show={open}
 *   onClose={close}
 *   justificativas={[]}
 *   currentUserId={42}
 *   currentUserName="Maria"
 *   onUpdateJustificativas={persist}
 * />
 */
declare const JustificativaModal: React$1.FC<JustificativaModalProps>;

/**
 * Mantido por compat — UI agora é um toggle binário (`privateMode: boolean`).
 * O payload `access` final é resolvido em 3 formas:
 *   - 'all'                          → privateMode=false (aberto p/ empresa)
 *   - string[] vazio                 → privateMode=true, ninguém marcado
 *   - string[] com items             → privateMode=true, subset marcado
 */
type PresetAccessMode = 'private' | 'all' | 'users';
interface PresetSavePayload {
    nome: string;
    descricao: string | null;
    /**
     * `'all'` = todos da empresa.
     * `string[]` vazio = privado (só owner).
     * `string[]` com items = lista explícita de userIds com leitura.
     */
    access: 'all' | string[];
    /**
     * Lista explícita de `controleRefId` que o preset deve carregar.
     * - `[]` = sem filtro (todos os controles do plano)
     * - `[refId, ...]` = só esses controles
     * Convenção alinhada ao backend `projetarPorPlano` (query `controleRefIds`).
     */
    controleRefIds: string[];
    /**
     * Quando `true` força criar uma nova entrada mesmo no modo update
     * (`initial.id` presente). O caller deve fazer POST create em vez de PUT.
     */
    saveAsNew?: boolean;
}
interface PresetSummary {
    planoNome: string;
    periodo: string;
    groupOption: string;
    sortOption: string;
    activeStatus: string;
    visibleGroupsCount: number;
    pinnedCount: number;
    totalGroups?: number;
}
/** Opção mostrada no picker de controles do modal de save. */
interface PresetControleOption {
    refId: string;
    /** Nome principal exibido (geralmente `nomeParametro`). */
    label: string;
    /** Nome do recurso (para sub-linha contextual). */
    recursoNome?: string | null;
}
/** Opção mostrada no picker de usuários do modal de save (modo "users"). */
interface PresetUsuarioOption {
    /** Identificador estável usado em `access[]` no payload. */
    id: string;
    /** Nome exibido (geralmente firstName + lastName). */
    nome: string;
    /** Email para sub-linha contextual / desambiguação. */
    email?: string | null;
}
interface PresetSaveModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: PresetSavePayload) => Promise<void>;
    summary: PresetSummary;
    /** Pre-preenche o modal para editar um preset existente. */
    initial?: {
        /**
         * ID do preset que está sendo editado. Presença ativa o **modo update**:
         * - botão principal vira "Atualizar" e o caller deve fazer PUT.
         * - aparece botão secundário "Salvar como nova" (`saveAsNew: true` no payload).
         * Ausência ⇒ modo create (POST).
         */
        id?: string;
        nome?: string;
        descricao?: string | null;
        access?: 'all' | string[];
        /** Subset inicial de `controleRefIds` ao editar (vazio = "todos"). */
        controleRefIds?: string[];
        /**
         * Quando `false`, modo update bloqueia o botão "Atualizar" e instrui o
         * usuário a usar "Salvar como nova" (preset de terceiros sem permissão
         * de write). Default `true`.
         */
        canEdit?: boolean;
        /**
         * Pre-preenche o campo de busca do picker. Útil quando o caller já tem
         * o usuário filtrando na tela ("ph") e quer refletir no modal.
         */
        searchQuery?: string;
    };
    /**
     * Universo de controles disponíveis no plano corrente (para o picker).
     * Quando omitido ou vazio, o picker é escondido e `controleRefIds` sai
     * sempre como `[]` no payload (back-compat com callers antigos).
     */
    controles?: PresetControleOption[];
    /**
     * Universo de usuários disponíveis para compartilhar (modo `'users'`).
     * - `undefined` → aba "Usuários" some (back-compat com callers antigos).
     * - `[]`        → aba aparece mas mostra empty/loading state (caller ainda
     *                 está carregando ou tenant sem colaboradores).
     * - `[...]`     → picker funcional.
     * O caller deve **excluir o owner** desta lista — owner tem read implícito.
     */
    usuarios?: PresetUsuarioOption[];
    /**
     * Sinaliza ao picker que a lista de usuários ainda está sendo carregada.
     * Quando `true`, mostra "Carregando…" no lugar do empty state.
     */
    usuariosLoading?: boolean;
}
/**
 * PresetSaveModal — modal para nomear e salvar a visualização atual do
 * Caderno Dinâmico como preset. Acesso `private` (default) ou `all`.
 *
 * Decisão arquitetural: `decisions-log/2026-05-15-caderno-como-preset.md`.
 *
 * @example
 * // Criar novo preset
 * <PresetSaveModal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onSave={(p) => presetService.create(p)}
 *   summary={currentViewSummary}
 * />
 *
 * @example
 * // Editar preset existente — pre-preenche
 * <PresetSaveModal
 *   open={open}
 *   onClose={close}
 *   onSave={(p) => presetService.update(presetId, p)}
 *   summary={currentViewSummary}
 *   initial={{ nome: preset.nome, descricao: preset.descricao, access: preset.access }}
 * />
 */
declare const PresetSaveModal: React$1.FC<PresetSaveModalProps>;

interface FolhaVM {
    id?: any;
    cadernoDeVerificacaoId?: any;
    fetched?: boolean;
    registrosDeCampo: any[];
    [key: string]: any;
}
interface UseFolhaFetcherOptions {
    /** Folha "raw" recebida do caller (Redux/parent). Se ja `fetched`, nao refetch. */
    outFolha: FolhaVM | undefined;
    /** Pagina ativa. */
    paginaAtual: any;
    /** Caderno (precisa de `id` + `camposDeVerificacao`). */
    caderno: {
        id?: any;
        camposDeVerificacao?: any[];
    };
    /** IO injetada — caller controla controller/HTTP. */
    fetchFolha: (cadernoId: any, pagina: any) => Promise<FolhaVM>;
    /** Persistencia opcional — chamada apos enriquecimento (ex.: dispatch para Redux). */
    onPersistFolha?: (folha: FolhaVM) => void;
}
interface UseFolhaFetcherApi {
    folha: FolhaVM | undefined;
    setFolha: React.Dispatch<React.SetStateAction<FolhaVM | undefined>>;
    loading: boolean;
    refresh: (pagina: any) => Promise<void>;
    /** Atualiza um registro especifico in-place. */
    atualizarRegistro: (payload: any) => void;
}
declare function useFolhaFetcher({ outFolha, paginaAtual, caderno, fetchFolha, onPersistFolha, }: UseFolhaFetcherOptions): UseFolhaFetcherApi;

interface RegistroCardRenderProps {
    mainRegistro: any;
    history: any[];
    index: number;
    /** Callbacks injetados pelo FolhaDeVerificacao para o card. */
    addRegistroDeCampoChild: (father: any) => void;
    oldestAndNewestMap: Map<any, {
        start: any;
        end: any;
    }>;
    paginaAtual: any;
    updateRegistroDeCampo: (payload: any) => void;
    folha: FolhaVM;
    markChangesDetected?: () => void;
    /** Quando truthy, modo "edicao" (mostra botoes de delete). */
    deleteRegistroDeCampo?: any;
    /** Forwards de otherParams. */
    otherParams: Record<string, any>;
}
interface FolhaDeVerificacaoProps {
    paginaAtual: any;
    outFolha: FolhaVM | undefined;
    otherParams?: Record<string, any>;
    caderno: {
        id?: any;
        camposDeVerificacao?: any[];
    };
    searchTerm?: string;
    /** Modo edicao — quando truthy mostra "marcar todos" + botoes de delete nos cards. */
    deleteRegistroDeCampo?: any;
    markChangesDetected?: () => void;
    regIdToAncor?: any;
    /** Atualiza folha completa (substitui dispatch replaceFolha). */
    onReplaceFolha: (folha: FolhaVM) => void;
    /** Marca/desmarca todos os registros (substitui dispatch checkAllRegistroFromFolha). */
    onCheckAllRegistros: (folha: FolhaVM, checked: boolean) => void;
    /** Persistencia opcional pos-fetch (ex.: dispatch addFolhaDoCadernoView). */
    onPersistFolha?: (folha: FolhaVM) => void;
    /** IO injetada — caller resolve o controller. */
    fetchFolha: (cadernoId: any, pagina: any) => Promise<FolhaVM>;
    /** Renderiza o card de registro — caller injeta RegistroDeCampoCardView. */
    renderRegistroCard: (props: RegistroCardRenderProps) => ReactNode;
    /** Calculadora opcional (parity legado — invocada pelo card). */
    calculadoraOpenHandler?: (...args: any[]) => void;
}
declare const FolhaDeVerificacao: ({ paginaAtual, outFolha, otherParams, caderno, searchTerm, deleteRegistroDeCampo, markChangesDetected, regIdToAncor, onReplaceFolha, onCheckAllRegistros, onPersistFolha, fetchFolha, renderRegistroCard, }: FolhaDeVerificacaoProps) => react_jsx_runtime.JSX.Element;

type GroupingMode = 'none' | 'preenchimento' | 'status' | 'usuario' | 'data' | 'tipoCampo' | 'descricao' | 'unidade' | 'frequencia';
declare const GROUP_LABELS: Record<GroupingMode, string>;
interface GroupedItem {
    mainRegistro: any;
    history: any[];
}
interface DisplayGroupNode {
    path: string | null;
    label: string | null;
    items: GroupedItem[] | null;
    subGroups: {
        path: string;
        label: string;
        items: GroupedItem[];
        subGroups: null;
    }[] | null;
}
interface UseGroupingApi {
    groupingLevels: GroupingMode[];
    setGroupingLevels: React.Dispatch<React.SetStateAction<GroupingMode[]>>;
    collapsedGroups: Record<string, boolean>;
    setCollapsedGroups: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    toggleGroup: (key: string) => void;
    toggleAllGroups: () => void;
    allGroupsCollapsed: boolean;
    displayGroupTree: DisplayGroupNode[];
    resetFrozenKeys: () => void;
}
/** Recebe a lista ja-agrupada-por-campo (`groupedRegistros`) e produz a arvore display. */
declare function useGrouping(groupedRegistros: GroupedItem[]): UseGroupingApi;

interface FormulaEditorProps {
    /** Formula raw inicial (`[Name:value:label]` tokens entremeados de operadores). */
    defaultFormula?: string;
    /** Persistencia da formula raw — chamado em onBlur do editor de texto e em todo drop. */
    saveCallBack: (raw: string) => void;
    title?: string;
    resultLabel?: string;
    resultUnit?: string;
    /** Toast/feedback callback. Default: no-op. */
    onNotify?: (msg: string, level: 'success' | 'warning' | 'info' | 'error') => void;
    /**
     * Render-prop OBRIGATORIO: caller injeta o ReferenciaDinamicaPicker (canonico
     * em ui-kit-sgp/formula/) configurado com seus loaders de caderno/campos. Mantem
     * inversao de controle — o editor nao acopla IO de processo.
     */
    renderReferenciaPicker: (props: {
        onSelect: (campo: ReferenciaCampoVM) => void;
    }) => ReactNode;
}
declare const FormulaEditor: ({ defaultFormula, saveCallBack, title, resultLabel, resultUnit, onNotify, renderReferenciaPicker, }: FormulaEditorProps) => react_jsx_runtime.JSX.Element;

interface FormulaToken {
    name: string;
    value: any;
    label: string;
}
interface FormulaSegment$1 {
    type: 'token' | 'operator' | 'number';
    value: string;
    token?: FormulaToken;
    start?: number;
    end?: number;
}
interface UseDragFormulaOptions {
    defaultFormula?: string;
    /** Persiste a versao raw (com tokens [name:value:label]) — chamado em onBlur do
     *  editor de texto e ao final de cada drop. */
    onPersist: (raw: string) => void;
}
interface UseDragFormulaApi {
    formulaDisplay: string;
    setFormulaDisplay: (next: string) => void;
    tokenMap: Map<string, FormulaToken>;
    tokenIndexMap: Map<string, {
        start: number;
        end: number;
    }[]>;
    formulaKey: number;
    edited: boolean;
    setEdited: (v: boolean) => void;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    dropIndex: number | null;
    setDropIndex: (n: number | null) => void;
    getSegments: () => FormulaSegment$1[];
    rebuildFromSegments: (segs: FormulaSegment$1[]) => void;
    segmentsToRaw: (segs: FormulaSegment$1[]) => string;
    replaceTokensInDisplay: () => string;
    addTokenToFormula: (token: FormulaToken) => void;
    insertOperator: (op: string) => void;
    insertNumber: (num: string) => void;
    handleBackspace: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    handleCopy: (e: React.ClipboardEvent<HTMLInputElement>, onAfterCopy?: (raw: string) => void) => void;
    handleDeleteSegmentAt: (idx: number) => void;
    handleDragStart: (e: React.DragEvent, idx: number, isPalette?: boolean, pType?: string | null, pValue?: any) => void;
    handleDragEnd: (e: React.DragEvent) => void;
    handleDragOver: (e: React.DragEvent, idx: number) => void;
    handleDrop: (e: React.DragEvent, targetIdx: number) => void;
    saveFormula: (override?: string) => void;
    clearAll: () => void;
    parseTokens: (formula: string) => void;
}
declare function useDragFormula({ defaultFormula, onPersist }: UseDragFormulaOptions): UseDragFormulaApi;

interface TokenBadgeProps {
    /** chave do estilo (campoDeVerificacao, controle, ...). */
    styleKey?: string;
    /** rotulo curto exibido. */
    text: string;
    /** Substitui o icone padrao do estilo. */
    iconOverride?: ReactNode;
    /** Eventos drag/click sao injetados pelo wrapper externo. */
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLButtonElement>) => void;
    onDragEnd?: (e: React.DragEvent<HTMLButtonElement>) => void;
    onClick?: () => void;
    /** Estilo de cursor: 'grab' (paleta) | 'pointer'. */
    cursor?: 'grab' | 'pointer';
}
declare const TokenBadge: ({ styleKey, text, iconOverride, draggable, onDragStart, onDragEnd, onClick, cursor, }: TokenBadgeProps) => react_jsx_runtime.JSX.Element;

type FormulaSegmentType = 'token' | 'operator' | 'number';
interface FormulaSegment {
    type: FormulaSegmentType;
    value: string;
    /** populado apenas quando type === 'token'. */
    token?: {
        name?: string;
        label?: string;
        value?: any;
    };
    start?: number;
    end?: number;
}
interface TokenDragItemProps {
    seg: FormulaSegment;
    idx: number;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, idx: number) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    onDelete: (idx: number) => void;
}
declare const TokenDragItem: ({ seg, idx, onDragStart, onDragEnd, onDelete }: TokenDragItemProps) => react_jsx_runtime.JSX.Element;

type TokenLabelKind = 'valorCorrigido' | 'valorReal' | 'controle' | 'campoVirtual' | 'campoDeVerificacao' | string;
interface TokenStyle {
    bg: string;
    border: string;
    label: string;
    icon: JSX.Element;
}
declare const TOKEN_STYLES: Record<string, TokenStyle>;
declare const getTokenStyle: (label?: string) => TokenStyle;

export { type AcaoOption, type AnexoToastLevel, AutorizacaoCard, type AutorizacaoCardProps, AutorizacaoRejeicaoModal, type AutorizacaoRejeicaoModalProps, type AutorizacaoVM, BadgePendenteAutorizacao, type BadgePendenteAutorizacaoProps, CadernoDeVerificacaoHeader, type CadernoDeVerificacaoHeaderProps, CalculadoraCorrecaoModal, type CalculadoraCorrecaoModalProps, CalculoCorrecao, type CalculoCorrecaoProps, type CalculoDeCorrecaoVM, type CalculoVM, CampoDeVerificacaoSelectableCards, type CampoDeVerificacaoSelectableCardsProps, CampoDeVerificacaoV2, type CampoDeVerificacaoV2Props, type CampoVM, ChartStats, type ChartStatsProps, ChartWithStats, type ChartWithStatsProps, ControleDashboardCard, type ControleDashboardCardProps, type ControleOption, ControleSelector, type ControleSelectorControle, type ControleSelectorEspecificacao, type ControleSelectorLimite, type ControleSelectorLpc, type ControleSelectorOperacao, type ControleSelectorPlano, type ControleSelectorPlanoOption, type ControleSelectorProps, type DisplayGroupNode, type FormulaSegment$1 as DragFormulaSegment, type EstatisticaControleVM, type EstatisticaDoControleCurrent, EstatisticaDoControleDashBoard, type EstatisticaDoControleDashBoardProps, EstatisticasFrequenciaDashboard, type EstatisticasFrequenciaDashboardProps, type EstatisticasFrequenciaVM, type EstatisticasPlanoVM, FluxoEdge, type FluxoEdgeData, type FluxoEdgeProps, FluxoLegend, type FluxoLegendProps, FluxoNode, type FluxoNodeData, type FluxoNodeProps, type FluxoTipoConfig, type FluxoTipoConfigKey, FluxoToolbar, type FluxoToolbarProps, FolhaDeVerificacao, type FolhaDeVerificacaoProps, type FolhaVM, FormulaBuilderOffcanvas, type FormulaBuilderOffcanvasProps, FormulaEditor, type FormulaEditorProps, type FormulaSegmentType, type FormulaToken, FrequenciaPicker, type FrequenciaPickerProps, type FrequencyVM, GROUP_LABELS, type GroupedItem, type GroupingMode, type HistoryFilters, HistoryModal, type HistoryModalProps, type HistoryRecord, type Justificativa, JustificativaModal, type JustificativaModalProps, MaterialApontarCard, type MaterialApontarCardProps, type MaterialApontarTumVM, type MaterialApontarUnidadeMaterialVM, type OldestNewestMap, OrdemDeCorrecaoCard, type OrdemDeCorrecaoCardProps, type PlanoBadgeOption, PlanoBadgeSelector, type PlanoBadgeSelectorProps, PlanoDashboardCard, type PlanoDashboardCardProps, type PresetAccessMode, PresetSaveModal, type PresetSaveModalProps, type PresetSavePayload, type PresetSummary, type ReferenciaCadernoVM, type ReferenciaCampoVM, ReferenciaDinamicaPicker, type ReferenciaDinamicaPickerProps, type RegistroCardRenderProps, type RegistroDeCampoCardPalette, RegistroDeCampoCardView, type RegistroDeCampoCardViewProps, RegistroDeCampoField, type RegistroDeCampoFieldPalette, type RegistroDeCampoFieldProps, type RegistroviewControle, RegistroviewDashboardCard, type RegistroviewDashboardCardProps, type RegistroviewLimite, type RegistroviewRegistro, type RegraDeCorrecaoVM, RelatorioModernCard, type RelatorioModernCardProps, RelatorioModernWrapper, type RelatorioModernWrapperHandle, type RelatorioModernWrapperProps, type RelatorioStats, type SelectableCampoVM, type SheetMoveInfo, SheetOrdenationCard, type SheetOrdenationCardProps, type SheetVM, TIPO_CONFIG, TOKEN_STYLES, TarefaApontarCard, type TarefaApontarCardProps, type TarefaApontarVM, TarefaCard, type TarefaCardProps, type TarefaFormVM, TarefaUnidadeForm, type TarefaUnidadeFormProps, type TarefaUnidadeMaterialVM, TokenBadge, type TokenBadgeProps, TokenDragItem, type TokenDragItemProps, type FormulaSegment as TokenDragSegment, type TokenLabelKind, type TokenStyle, UnidadeMaterialCard, type UnidadeMaterialCardProps, type UnidadeMaterialFormVM, type UnidadeMaterialFormValue, type UnidadeMaterialVM, type UseAnexoManagerArgs, type UseAnexoManagerResult, type UseDragFormulaApi, type UseDragFormulaOptions, type UseFolhaFetcherApi, type UseFolhaFetcherOptions, type UseGroupingApi, type UseHistoryArgs, type UseHistoryResult, type UseJustificativaModalArgs, type UseJustificativaModalResult, type UseRegistroStyleArgs, getTokenStyle, useAnexoManager, useDragFormula, useFolhaFetcher, useGrouping, useHistory, useJustificativaModal, useRegistroStyle };
