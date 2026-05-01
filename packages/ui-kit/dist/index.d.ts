import React from 'react';
import { ButtonProps, FormCheckProps, ModalProps } from 'react-bootstrap';
export { BranchDropDisplay, BranchDropDisplayProps, FindRecursoByTagField, FindRecursoByTagFieldProps, RecursoDisplayer, RecursoDisplayerProps } from '@teraprox/ui-kit-sgm';
import dayjs from 'dayjs';
import { Accept } from 'react-dropzone';
export { AnexoLocalItem, AnexoManager, AnexoManagerProps, AnexoPersistedItem } from '@teraprox/ui-kit-core';
export { CalculadoraCorrecaoModal, CalculoCorrecao, CampoDeVerificacaoV2, FrequenciaFormV2, TarefaUnidadeForm, UnidadeMaterialCard } from '@teraprox/ui-kit-sgp';

interface AddButtonProps {
    callback: () => void;
    hiddenBool?: boolean;
    size?: number;
}
declare const AddButton: React.FC<AddButtonProps>;

interface DeleteButtonProps {
    title: string;
    onDeleteClick: () => void;
}
declare const DeleteButton: React.FC<DeleteButtonProps>;

interface ActionButtonsProps {
    /** Botão Salvar */
    onSave?: () => void;
    saveLabel?: string;
    saveVariant?: string;
    disabled?: boolean;
    /** Botão Excluir */
    onDelete?: (details?: string) => void;
    deleteLabel?: string;
    deleteConfirmMsg?: string;
    needExclusionDetails?: boolean;
    /** Botão Voltar */
    onBack?: () => void;
    backLabel?: string;
    /** Botão Cancelar Edição */
    onCancelEdit?: () => void;
    cancelEditLabel?: string;
    /** Botão Copiar Form */
    onCopy?: () => void;
    copyLabel?: string;
    /** Meta-estado */
    isEditing?: boolean;
    /** Configuração Especial: Deleção com Delay (Hold for 3s) */
    useDelayedDelete?: boolean;
    delayedDeleteTimeout?: number;
    /** Wrapper opcional para controle de permissões (ex: PermissionContainer) */
    PermissionWrapper?: React.ComponentType<{
        children: React.ReactNode;
        id?: string;
    }>;
}
/**
 * Agrupamento de botões de ação (Salvar, Excluir, Voltar, etc) padronizado.
 * Agrega funcionalidade de confirmação de deleção e animação de 'hold-to-delete'.
 */
declare const ActionButtons: React.FC<ActionButtonsProps>;

interface ApproveAndReproveButtonsProps {
    /** Tamanho dos ícones (padrão: 25) */
    buttonSize?: number;
    /** Callback para aprovação */
    approveCallback: () => void;
    /** Callback para reprovação */
    reproveCallback: () => void;
    /** Callback para cancelamento (ao pressionar ESC) */
    cancelCallback: () => void;
    /** Texto opcional do cabeçalho */
    headerText?: string;
    /** Texto opcional do botão de aprovação */
    approveText?: string;
    /** Texto opcional do botão de reprovação */
    repproveText?: string;
}
/**
 * Componente de botões de Aprovação e Reprovação (Check e Close).
 */
declare const ApproveAndReproveButtons: React.FC<ApproveAndReproveButtonsProps>;

interface AsyncButtonProps {
    /** Função assíncrona a ser executada no clique */
    onClick: () => Promise<void> | void;
    /** Conteúdo do botão */
    children: React.ReactNode;
    /** Componente de loading customizado (padrão: <LoadingProgress />) */
    loadingComponent?: React.ReactNode;
    /** Props adicionais para o componente Button do react-bootstrap */
    buttonProps?: ButtonProps;
}
/**
 * Componente de botão para operações assíncronas com tratamento interno de estado.
 */
declare const AsyncButton: React.FC<AsyncButtonProps>;

interface BonusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Condição para renderizar o botão */
    renderCondition?: boolean;
    /** Callback chamando ao clicar */
    onClickCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Texto do botão */
    label: string;
}
/**
 * Botão chamativo com animação de 'glow'. usado para ações de destaque.
 */
declare const BonusButton: React.FC<BonusButtonProps>;

interface ButtonWithDropdownOption {
    label: string;
    callback: () => void;
}
interface ButtonWithDropdownProps {
    /** Texto do botão principal */
    title: string;
    /** Callback ao clicar no botão principal */
    onClickButton: () => void;
    /** Lista de opções para o dropdown */
    options: ButtonWithDropdownOption[];
    /** Varinate do menu (padrão: light) */
    menuVariant?: "light" | "dark";
    /** Variante do botão (padrão: primary) */
    variant?: ButtonProps["variant"];
    /** Variante do toggle (padrão: coincide com variant) */
    toggleVariant?: ButtonProps["variant"];
}
/**
 * Botão principal com um dropdown (split button) que ocupa 100% da largura.
 */
declare const ButtonWithDropdown: React.FC<ButtonWithDropdownProps>;

interface CheckBoxOption {
    valor: string | number;
    [key: string]: any;
}
interface CheckBoxProps {
    /** Lista de opções para renderizar */
    opcoes: CheckBoxOption[];
    /** Modo edição/hover para alteração de nomes */
    isHover?: boolean;
    /** Modo 'criador' (novo item) */
    isCreator?: boolean;
    /** Callback para atualizar valor (modo hover) */
    updateEvent?: (event: React.ChangeEvent<any>, index: number) => void;
    /** Callback para deletar opção (modo hover) */
    deleteEvent?: () => void;
    /** Callback para a tecla Enter (modo hover) */
    enterEvent?: (event: React.KeyboardEvent<any>, index: number, opcao: CheckBoxOption) => void;
    /** Desabilita interação */
    disabled?: boolean;
    /** Classe CSS customizada */
    className?: string;
}
/**
 * Componente de CheckBox múltiplo com suporte a modo de edição dinâmica (hover).
 */
declare const CheckBox: React.FC<CheckBoxProps>;

/**
 * Representa um evento/ação no menu de 3 pontos.
 */
declare class MenuEvent {
    label: string;
    callback: () => void;
    variant: string;
    renderCondition: boolean | (() => boolean);
    section: string;
    /**
     * @param label - O texto que aparecerá no botão.
     * @param callback - A função a ser chamada quando o botão for clicado.
     * @param variant - A variante do botão (padrão: 'primary').
     * @param renderCondition - Condição para renderizar o botão.
     * @param section - A seção para organizar os botões (padrão: 'default').
     */
    constructor(label: string, callback: () => void, variant?: string, renderCondition?: boolean | (() => boolean), section?: string);
}
interface Generic3DotMenuProps {
    /** Lista de eventos (opções) do menu */
    events: MenuEvent[];
    /** Título exibido no modal do menu */
    tittle?: string;
}
/**
 * Menu de 3 pontos que abre um Modal com opções organizadas por seções.
 */
declare const Generic3DotMenu: React.FC<Generic3DotMenuProps>;

interface LoadingButtonProps extends ButtonProps {
    /** Função de clique */
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Estado de carregamento */
    loading?: boolean;
    /** Label do botão (string ou ReactNode) */
    label?: React.ReactNode;
    /** Ícone opcional */
    icon?: React.ReactNode;
    /** Texto exibido durante o loading */
    loadingLabel?: string;
}
/**
 * Botão com estado de carregamento integrado e suporte a ícones.
 */
declare const LoadingButton: React.FC<LoadingButtonProps>;

interface NavigateButtonProps extends ButtonProps {
    /** Nome exibido no botão */
    displayName: React.ReactNode;
    /** Caminho para navegação */
    path: string;
    /** Configurações extras de navegação */
    config?: any;
    /** Nome da página para rastreamento/contexto */
    pageName?: string;
    /** Função de navegação (ex: vinda do useNavigator ou useNavigate) */
    navigator: (path: string, config?: any, pageName?: string) => void;
    /** Callback opcional antes de mudar de página */
    onBeforeNavigate?: () => void;
}
/**
 * Botão de navegação agnóstico.
 * Requer que a função de navegação seja passada via props.
 */
declare const NavigateButton: React.FC<NavigateButtonProps>;

interface StatusBadgeProps {
    /** Texto do status */
    status: string;
    /** Se deve exibir um checkbox de seleção ao lado */
    showCheckbox?: boolean;
    /** Estado do checkbox */
    checked?: boolean;
    /** Callback para alteração do checkbox */
    onToggle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Estado de carregamento */
    loading?: boolean;
    /** Mapeamento customizado de classes de status (padrão: PENDENTE, EXECUTANDO, CONCLUIDO, CANCELED) */
    customStatusClasses?: Record<string, string>;
}
/**
 * Badge de Status com suporte opcional a checkbox e spinner.
 */
declare const StatusBadge: React.FC<StatusBadgeProps>;

interface SwitchOnClickProps {
    /** Conteúdo exibido quando clicado. Recebe objeto com handleClose para fechar internamente. */
    children: (props: {
        handleClose: () => void;
    }) => React.ReactNode;
    /** Elemento exibido antes do clique (padrão: ícone de Adicionar) */
    placeHolder?: React.ReactNode;
    /** Callback chamado ao clicar no placeholder */
    onSwitchClick?: () => void;
    /** Callback chamado ao cancelar/fechar */
    onCancel?: () => void;
    /** Classe CSS adicional para o container */
    containerClassName?: string;
}
/**
 * Componente que alterna entre um Placeholder (ex: botão de adicionar)
 * e um formulário/conteúdo detalhado.
 */
declare const SwitchOnClick: React.FC<SwitchOnClickProps>;

interface GenericChartProps {
    chartType: any;
    graphID: string;
    width?: string;
    height?: string;
    columns: any[];
    rows: any[][];
    chartEvents?: any[];
    options?: Record<string, any>;
    /** Callback opcional para customizar os tooltips */
    tooltipFormatter?: (row: any[]) => string;
}
/**
 * Wrapper para Google Charts com suporte a tooltips HTML customizados.
 */
declare const GenericChart: React.FC<GenericChartProps>;

interface GenericREchartProps {
    /** Dados para o gráfico */
    data: any[];
    /** Configuração das linhas (Array de props para o componente <Line />) */
    lines: any[];
    /** Chave do objeto para o eixo X */
    xAxisKey?: string;
    /** Exibe o grid de fundo */
    showGrid?: boolean;
    /** Exibe a legenda */
    showLegend?: boolean;
    /** Exibe o tooltip */
    showTooltip?: boolean;
    /** Largura do container (padrão: 100%) */
    width?: string | number;
    /** Altura do container (padrão: 400) */
    height?: string | number;
    /** Oculta o eixo Y */
    hideYAxis?: boolean;
    /** Unidade para o eixo Y (ex: %) */
    unit?: string;
    /** Margens internas do gráfico */
    margin?: {
        top: number;
        right: number;
        left: number;
        bottom: number;
    };
    /** Range do eixo Y (padrão: [0, 'auto']) */
    YAxisRange?: [number | string, number | string];
}
/**
 * Wrapper performático para Recharts (LineChart) com ordenação automática de datas.
 */
declare const GenericREchart: React.FC<GenericREchartProps>;

interface ResponsiveContainerProps {
    title?: string;
    show: boolean;
    setShow: (show: boolean) => void;
    children: React.ReactNode;
    onClose?: () => void;
    scrollable?: boolean;
}
/**
 * ResponsiveContainer Component
 *
 * Renders a Modal for displaying content in a responsive container.
 * Previously used GenericOffCanvas for mobile, now uses Modal consistently.
 *
 * @param title - The title of the modal.
 * @param show - Controls the visibility of the modal.
 * @param setShow - Function to update the visibility state.
 * @param children - Content to be rendered inside the modal.
 * @param onClose - Optional function to be executed on close.
 * @param scrollable - Optional prop to enable scrolling the content.
 */
declare const ResponsiveContainer: React.FC<ResponsiveContainerProps>;

interface ExpandableCardItemObject {
    content: React.ReactNode;
    label?: React.ReactNode;
    clickable?: boolean;
}
type ExpandableCardItem = string | React.ReactNode | ExpandableCardItemObject;
interface ExpandableCardProps {
    /** Lista de itens a serem exibidos. Pode ser string, Nodo ou Objeto estruturado */
    items: ExpandableCardItem[];
    /** Quantidade inicial de itens visíveis (padrão: 3) */
    initialVisibleCount?: number;
    /** Habilita a funcionalidade de expansão */
    expandable?: boolean;
    /** Conteúdo para a lateral esquerda */
    leftSideContent?: React.ReactNode;
    /** Conteúdo para a lateral direita */
    rightSideContent?: React.ReactNode;
    /** Classe CSS para o Card */
    cardClassName?: string;
    /** Classe CSS para o Body */
    cardBodyClassName?: string;
    /** Estilo CSS para o Body */
    cardBodyStyle?: React.CSSProperties;
    /** Detecta modo Mobile para layout empilhado */
    isMobile?: boolean;
}
/**
 * Card expansível com suporte a listagem parcial de itens e conteúdos laterais.
 * Layout otimizado para visualização de densidade variável.
 */
declare const ExpandableCard: React.FC<ExpandableCardProps>;

interface UuidPillProps {
    uuid: string | null | undefined;
    bg?: string;
    textColor?: string;
    short?: number;
}
declare const UuidPill: React.FC<UuidPillProps>;

declare class ConfigObject {
    dotNotation: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    onBlur?: () => void;
    onHideClick?: () => void;
    hidden?: boolean;
    mapData?: any;
    additionalComponents?: (() => React.ReactNode)[];
    constructor(dotNotation: string, style?: React.CSSProperties, onClick?: () => void, onBlur?: () => void, onHideClick?: () => void, hidden?: boolean, mapData?: any, additionalComponents?: (() => React.ReactNode)[]);
}
interface GenericDisplayProps {
    ops?: any[];
    loadFunc?: () => Promise<any>;
    configObjects?: ConfigObject[];
    rootName?: string;
    context?: string;
    /** Optional hook to call on mount/context update. Replaces the app-specific useContextUpdateHandler. */
    onRefresh?: (refreshFunc: () => void) => void;
    /** Optional renderer for edit buttons on root objects. */
    editButtonRenderer?: (obj: any, location: string | null) => React.ReactNode;
}
declare const GenericDisplay: React.FC<GenericDisplayProps>;

interface RateLimitEntry {
    used: number;
    limit: number;
    exceeded: boolean;
    windowReset: string;
}
interface RateLimitBarProps {
    /** Rate limit entry from CoreService.rateLimits[pathGroup] */
    entry: RateLimitEntry | undefined;
    /** Optional label shown above the bar (e.g. "Login") */
    label?: string;
    /** Additional CSS class */
    className?: string;
}
/**
 * Displays a colored progress bar with rate limit usage.
 *
 * Color thresholds:
 *   < 70% → green
 *   70–89% → yellow
 *   ≥ 90% or exceeded → red
 *
 * Hides itself when no entry is provided (tenant has no rate limit configured).
 *
 * Usage in remotes:
 *   import { RateLimitBar } from 'teraprox-ui-kit'
 *   const { rateLimits } = useCoreService()
 *   <RateLimitBar entry={rateLimits['user_auth_POST']} label="Login" />
 */
declare const RateLimitBar: React.FC<RateLimitBarProps>;

interface StatusIndicatorProps {
    /** Status (pendente, executando, concluido, canceled, naoAtribuida) */
    status: string;
    /** Quantidade/Contagem associada ao status */
    count?: number | string;
    /** Classe CSS adicional para o container */
    containerClassName?: string;
    /** Mapeamento customizado de labels de status */
    customLabels?: Record<string, string>;
}
/**
 * Indicador de status tipo 'Flag' com destaque de cor e contagem.
 */
declare const StatusIndicator: React.FC<StatusIndicatorProps>;

interface VerticalItemsDisplayProps {
    /** Conteúdo do primeiro item vertical */
    item1?: React.ReactNode;
    /** Conteúdo do segundo item vertical */
    item2?: React.ReactNode;
    /** Conteúdo do terceiro item vertical */
    item3?: React.ReactNode;
    /** Classe CSS adicional */
    className?: string;
    /** Estilo CSS customizado */
    style?: React.CSSProperties;
}
/**
 * Exibidor simples de até 3 itens empilhados verticalmente.
 */
declare const VerticalItemsDisplay: React.FC<VerticalItemsDisplayProps>;

interface StatusLightProps {
    /** Se a luz deve estar ativa (verde) ou inativa (cinza) */
    active?: boolean;
    /** Cor customizada para o estado ativo (padrão: green) */
    activeLightColor?: string;
    /** Cor customizada para o estado inativo (padrão: gray) */
    inactiveLightColor?: string;
    /** Tamanho do círculo (padrão: 20px) */
    size?: number | string;
    /** Classe CSS adicional */
    className?: string;
    /** Estilo CSS customizado */
    style?: React.CSSProperties;
}
/**
 * Componente de luz indicativa para status binários (Ativo/Inativo, Online/Offline, etc).
 */
declare const StatusLight: React.FC<StatusLightProps>;

interface TimerDisplayProps {
    /** ID único do timer ou da entidade relacionada */
    id?: string | number;
    /** Tempo atual em segundos */
    tempo?: number;
    /** Se o timer já foi encerrado definitivamente */
    isStopped?: boolean;
    /** Exibe o botão de pausa */
    pausable?: boolean;
    /** Exibe o botão de play */
    playable?: boolean;
    /** Se falso, exibe um placeholder de visualização (ex: - : - : -) */
    enableView?: boolean;
    /** Callback chamado ao clicar em pausar */
    onPause?: (id: string | number) => void;
    /** Callback chamado ao clicar em iniciar/continuar */
    onPlay?: (id: string | number) => void;
    /** Label customizado para quando o timer não foi iniciado */
    emptyMessage?: string;
}
/**
 * Componente visual para exibição e controle básico de timers.
 * Mantém-se agnóstico à lógica de persistência e notificações do host.
 */
declare const TimerDisplay: React.FC<TimerDisplayProps>;

interface StatusMeta {
    label: string;
    color: string;
    count?: number;
}
interface StatusPillsProps {
    /** Objeto contendo os metadados de cada status (Chave -> Meta) */
    statuses: Record<string, StatusMeta>;
    /** Chaves dos status atualmente ativos/selecionados */
    activeKeys: string[];
    /** Callback chamado quando a seleção muda */
    onSelectionChange: (keys: string[]) => void;
    /** Se deve permitir seleção de múltiplos status (padrão: true) */
    multiSelect?: boolean;
    /** Classe CSS adicional */
    className?: string;
}
/**
 * Filtro rápido de status usando 'Pills' clicáveis.
 * Altamente performático por ser puramente visual e controlado via props.
 */
declare const StatusPills: React.FC<StatusPillsProps>;

type PeriodPreset = "today" | "week" | "fortnight" | "month" | "year";
interface PeriodSelectorProps {
    /** Data inicial formatada (YYYY-MM-DDTHH:mm) */
    startDate: string;
    /** Data final formatada (YYYY-MM-DDTHH:mm) */
    endDate: string;
    /** Callback quando a data inicial muda */
    onStartDateChange: (date: string) => void;
    /** Callback quando a data final muda */
    onEndDateChange: (date: string) => void;
    /** Callback opcional quando um atalho é selecionado */
    onPresetSelect?: (preset: PeriodPreset) => void;
    /** Título do componente */
    label?: string;
    /** Se permite selecionar datas futuras (padrão: false) */
    allowFuture?: boolean;
    /** Classe CSS adicional */
    className?: string;
}
/**
 * Seletor de período (datas) com visão compacta e atalhos rápidos.
 */
declare const PeriodSelector: React.FC<PeriodSelectorProps>;

interface AdvancedFilterBarProps {
    /** Conteúdo dos filtros (grid de filtros) */
    children: React.ReactNode;
    /** Título da barra (padrão: Filtros) */
    title?: string;
    /** Quantidade de filtros ativos para exibir no badge */
    activeFiltersCount?: number;
    /** Callback para limpar todos os filtros */
    onClearAll?: () => void;
    /** Se deve iniciar expandido (padrão: false) */
    defaultExpanded?: boolean;
    /** Classe CSS adicional */
    className?: string;
}
/**
 * Container colapsável para filtros complexos.
 * Organiza filtros em um grid limpo e fornece ações de clearing.
 */
declare const AdvancedFilterBar: React.FC<AdvancedFilterBarProps>;

type QuickPresetKey = "today" | "week" | "month" | "year";
interface PeriodRange {
    dataInicio: string;
    dataFim: string;
}
interface UnifiedPeriodSelectorProps {
    /** Current start date (ISO string) */
    dataInicio?: string | null;
    /** Current end date (ISO string) */
    dataFim?: string | null;
    /** Called whenever the period changes */
    onSelect: (range: PeriodRange) => void;
    /** Which tab to show by default */
    defaultTab?: "quick" | "month" | "custom";
    /** Allow selecting future dates (default: true) */
    allowFuture?: boolean;
    /** Custom quick presets (overrides defaults) */
    quickPresets?: {
        key: string;
        label: string;
        start: () => dayjs.Dayjs;
        end: () => dayjs.Dayjs;
    }[];
    /** Additional CSS class */
    className?: string;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Compact mode — shows only the header until clicked */
    compact?: boolean;
}
declare const UnifiedPeriodSelector: React.FC<UnifiedPeriodSelectorProps>;

interface MailSenderProps {
    /** Conteúdo HTML a ser enviado no corpo do e-mail */
    htmlContent: string;
    /** Nome da empresa para o assunto/corpo padrão */
    companyName: string;
    /** Callback para buscar a lista de e-mails da companhia */
    onFetchEmails: () => Promise<Array<{
        email: string;
    }>>;
    /** Callback para enviar o e-mail consolidado */
    onSendEmail: (emailData: {
        to: string;
        subject: string;
        text: string;
        html: string;
    }) => Promise<void>;
    /** Flag para ocultar o componente */
    hide?: boolean;
    /** Render prop opcional para o botão de ativação customizado */
    renderTrigger?: (props: {
        onClick: () => void;
        loading: boolean;
    }) => React.ReactNode;
}
/**
 * Componente para seleção de destinatários e envio de e-mails.
 * Refatorado para ser agnóstico a implementações de hooks/endpoints específicos das apps.
 */
declare const MailSender: React.FC<MailSenderProps>;

interface DeleteConfirmProps {
    /** Controla visibilidade do modal */
    show: boolean;
    /** Fecha o modal */
    onHide: (show: boolean) => void;
    /** Callback chamado ao confirmar a exclusão */
    onConfirm: (details: string) => void;
    /** Título do modal */
    title?: string;
    /** Texto do corpo do modal (pode ser string ou função que recebe payload) */
    dialogText?: string | ((payload: any) => string);
    /** Dados extras para o dialogText */
    payload?: any;
    /** Se true, exige um campo de 'Motivo' com pelo menos 8 caracteres */
    needExclusionDetails?: boolean;
}
/**
 * Modal de confirmação de exclusão padronizado.
 */
declare const DeleteConfirm: React.FC<DeleteConfirmProps>;

type LabelPosition = "top" | "floating";
interface AutoCompleteProps {
    className?: string;
    /** Opções estáticas iniciais */
    ops?: any[];
    /** Chave para ordenação */
    sortKey?: string;
    /** Chave para exibição no input */
    displayKey?: string;
    /** Chaves para exibição concatenada */
    displayKeys?: string[];
    /** Callback de alteração no input */
    onValueChanged?: (val: string) => void;
    /** Callback ao clicar em uma sugestão */
    onSelectedClick: (li: any, index: number, lItem: any[]) => void;
    /** Valor controlado */
    value?: string;
    /** Botão de ação opcional (ex: clear) */
    actionButton?: (clear: () => void) => React.ReactNode;
    /** Segundo botão de ação opcional */
    actionButton2?: (input: string) => React.ReactNode;
    placeH?: string;
    title?: string;
    /** Valor para filtrar a lista inicial */
    filter?: any;
    filterField?: string;
    /** Função de carregamento assíncrono */
    loadFunc?: () => Promise<any[]>;
    /** Condição para disparar o carregamento */
    loadCondition?: boolean;
    onBlurEvent?: (e: React.FocusEvent<HTMLInputElement>, input: string) => void;
    /** Função customizada para formatar a label da lista */
    formatationFunc?: (item: any) => string;
    onEscKeyDown?: () => void;
    onEnterKeyDown?: (input: string) => void;
    /** Margem superior */
    margT?: number;
    /** Margem inferior */
    margB?: number;
    hideComponent?: boolean;
    disableComponent?: boolean;
    disableSelect?: boolean;
    autoFocusConfig?: boolean;
    onLoad?: (data: any[]) => void;
    /** Chave para cache em memória */
    cacheKey?: string;
    /** Mínimo de caracteres para mostrar a lista */
    minChars?: number;
    /** Limite de itens na lista */
    maxItems?: number;
    /** Se deve mostrar a lista ao focar */
    showListOnFocus?: boolean;
    /** Se deve carregar sob demanda ao digitar */
    lazyLoad?: boolean;
    /**
     * Posicao da label:
     *  - 'top' (default): label acima do input (padrao UX /os/form)
     *  - 'floating': comportamento Bootstrap FloatingLabel legado
     */
    labelPosition?: LabelPosition;
}
/**
 * Componente de Input com Auto-complete dinâmico.
 * Suporta cache em memória compartilhada entre instâncias via window.
 */
declare const AutoComplete: React.FC<AutoCompleteProps>;

interface SelectOption {
    label: string;
    value: string | number;
}
interface FieldDefinition {
    label: string;
    key: string;
    type: 'text' | 'number' | 'select' | 'date' | 'custom-select';
    options?: SelectOption[];
    placeholder?: string;
    required?: boolean;
}
interface GenericFormProps {
    fields: FieldDefinition[];
    onSubmit: (values: Record<string, any>) => void;
    /** Optional custom select renderer. If not provided, custom-select falls back to native select. */
    renderCustomSelect?: (props: {
        label: string;
        value: any;
        options?: SelectOption[];
        onChange: (value: any) => void;
        placeholder?: string;
    }) => React.ReactNode;
}
declare const GenericForm: React.FC<GenericFormProps>;

interface GenericSelectProps {
    noLabel?: boolean;
    title?: string;
    onChange: (value: any) => void;
    ops?: any[];
    selection?: any;
    returnType?: string;
    displayType?: string;
    filter?: string;
    filterField?: string;
    valueType?: string;
    loadFunc?: () => Promise<any>;
    loadCondition?: boolean;
    actionClick?: () => React.ReactNode;
    locked?: boolean;
    isBold?: boolean;
    default?: string;
}
declare class GenericSelectOps {
    noLabel?: boolean;
    title?: string;
    onChange?: (value: any) => void;
    ops?: any[];
    selection?: any;
    returnType?: string;
    displayType?: string;
    filter?: string;
    filterField?: string;
    valueType?: string;
    loadFunc?: () => Promise<any>;
    loadCondition?: boolean;
    actionClick?: () => React.ReactNode;
    locked?: boolean;
    constructor(noLabel?: boolean, title?: string, onChange?: (value: any) => void, ops?: any[], selection?: any, returnType?: string, displayType?: string, filter?: string, filterField?: string, valueType?: string, loadFunc?: () => Promise<any>, loadCondition?: boolean, actionClick?: () => React.ReactNode, locked?: boolean);
}
declare const GenericSelect: React.FC<GenericSelectProps>;

interface FormFieldProps {
    /** Valor do campo */
    val?: string | number;
    /** Callback quando o valor muda */
    onValueUpdate?: (val: string, event: React.ChangeEvent<any>) => void;
    /** Callback no blur */
    onBlur?: (val: string, event: React.FocusEvent<any>) => void;
    /** Label exibida acima do input (top) ou dentro como FloatingLabel */
    label?: string;
    /**
     * Posicao da label:
     *  - 'top'      (default): label como elemento separado acima do control
     *  - 'floating'          : comportamento Bootstrap FloatingLabel wrapping
     * Default 'top' alinhado com auditoria browser /os/form (Wave 5A fix).
     */
    labelPosition?: 'top' | 'floating';
    /** Tipo do input (text, number, password, etc) */
    ty?: string;
    /** Callback para botão de ação à direita */
    actionClick?: () => React.ReactNode;
    /** Callback para segundo botão de ação à direita */
    actionClick2?: () => React.ReactNode;
    /** Referência para o input */
    reference?: React.Ref<any>;
    /** Outros props para o Form.Control */
    others?: any;
    /** Objeto de estilo customizado para o container */
    styleObj?: React.CSSProperties;
    /** Se o campo está bloqueado/desabilitado */
    locked?: boolean;
    /** Se o campo deve ser escondido */
    hide?: boolean;
    /** Callback no mouse leave */
    onMouseLv?: () => void;
    /** Callback ao pressionar Enter */
    onEnterPress?: (val: string) => void;
    /** Classe CSS customizada */
    className?: string;
    /** Se o estado é inválido */
    isInvalid?: boolean;
    /** Mensagem de erro/feedback */
    feedback?: string;
    /** Callback no foco */
    onFocus?: (val: string) => void;
    /** Número de linhas para textarea */
    rows?: number;
    /** Se deve renderizar como textarea */
    asTextArea?: boolean;
    /** ID único para o controle */
    controlId?: string;
}
/**
 * Campo de formulário padronizado com suporte a label-top (default) ou
 * FloatingLabel, mais botões de ação laterais.
 *
 * Wave 5A fix (sprint 2026-04-21-ui-kit-domain-split-wave0): default de
 * `labelPosition` e 'top' para alinhar com padrao visual auditado no browser.
 * Callers que dependem explicitamente de FloatingLabel devem passar
 * `labelPosition="floating"`.
 */
declare const FormField: React.FC<FormFieldProps>;

interface ClickToWriteFieldProps {
    /** Valor exibido no botão inicial */
    buttonDisplay: React.ReactNode | (() => React.ReactNode);
    /** Tipo do campo de input (default: 'text') */
    fieldType?: string;
    /** Texto/Label para o FormField */
    fieldLabel?: string;
    /** Props para o botão inicial */
    buttonProps?: ButtonProps;
    /** Props extras para o FormField */
    fieldProps?: any;
    /** Callback chamado ao digitar no campo */
    onFieldValueUpdate: (val: string) => void;
    /** Habilita botão de ação extra no campo de input */
    enableFieldActionButton?: boolean;
    /** Ícone para o botão extra */
    fieldActionButtonIcon?: () => React.ReactNode;
    /** Props para o botão extra */
    fieldActionButtonProps?: ButtonProps;
    /** Callback para o botão extra */
    fieldActionButtonCallback?: (ref: React.RefObject<HTMLInputElement>) => void;
    /** Callback ao pressionar Enter */
    onEnterPress?: (ref: React.RefObject<HTMLInputElement>) => void;
    /** Callback para limpar o input ao abrir */
    cleanRef?: (ref: React.RefObject<HTMLInputElement>) => void;
}
/**
 * Componente que exibe um botão e, ao ser clicado, alterna para um campo de input.
 * Ideal para edições rápidas in-place.
 */
declare const ClickToWriteField: React.FC<ClickToWriteFieldProps>;

interface ColorPickerProps {
    /** Cor selecionada atualmente */
    selectedColor?: string;
    /** Callback para quando a cor muda */
    onColorChange?: (color: string) => void;
    /** Retrocompat legado */
    defaultColor?: string;
    /** Retrocompat legado */
    setCor?: (color: string) => void;
    /** Lista de cores sugeridas para a paleta rápida */
    presetColors?: string[];
    /** Título do componente (padrão: 'Cor de Identificação') */
    title?: string;
}
/**
 * Seletor de cores com preview e paleta de cores pré-definidas.
 */
declare const ColorPicker: React.FC<ColorPickerProps>;

interface SwitchProps extends Omit<FormCheckProps, 'onChange' | 'value'> {
    /** Rótulo do switch */
    label?: string;
    /** Valor atual (checked) */
    value?: boolean;
    /** Callback chamado quando o valor muda */
    onSwitchChange?: (val: boolean) => void;
    /** Valor padrão inicial (se não for controlado) */
    defaultChecked?: boolean;
}
/**
 * Componente de Switch (Checkbox tipo switch) padronizado.
 */
declare const Switch: React.FC<SwitchProps>;

interface UploadAreaProps {
    /** Callback chamado ao selecionar um arquivo */
    onFilePut: (file: File) => void;
    /** Objeto do arquivo já anexado (opcional) */
    anexo?: {
        name: string;
    } | null;
    /** Tipos de arquivos aceitos (padrão: JPEG, PNG) */
    accept?: Accept;
    /** Tamanho máximo em bytes (padrão: 50MB) */
    maxSize?: number;
}
/**
 * Área de upload com suporte a Drag & Drop e indicação de arquivo anexado.
 */
declare const UploadArea: React.FC<UploadAreaProps>;

interface Sector {
    id: string | number;
    nome: string;
}
interface SectorSelectorProps {
    /** Lista de setores a serem exibidos */
    setores: Sector[];
    /** Callback quando um setor é selecionado */
    onSectorSelect: (setor: Sector) => void;
    /** Label exibido acima do seletor */
    selectionLabel?: string;
    /** Placeholder quando nada está selecionado */
    selectionPlaceholder?: string;
    /** Permite selecionar a opção "Todos" */
    allowAll?: boolean;
    /** Nome do setor selecionado por padrão/externamente */
    defaultSectorName?: string | false;
    /** Oculta o componente */
    hideComponent?: boolean;
}
/**
 * Seletor de setores customizado com dropdown estilizado.
 * Totalmente desacoplado do Redux/API; dados devem ser injetados via props.
 */
declare const SectorSelector: React.FC<SectorSelectorProps>;

interface UnidadeMaterialValue {
    material?: {
        id: string | number;
        nome: string;
    } | null;
    quantidade?: number | string;
    unidade?: {
        id: string | number;
        nome: string;
    } | null;
}
interface UnidadeMaterialFormProps {
    /** Valor atual da composição Unidade-Material */
    value: UnidadeMaterialValue;
    /** Calback quando o material é selecionado */
    onMaterialSelected: (material: any) => void;
    /** Callback quando a quantidade é alterada */
    onQuantidadeUpdate: (qtd: string) => void;
    /** Callback quando a unidade de medida é selecionada */
    onUnidadeSelected: (unidade: any) => void;
    /** Callback para o botão 'Novo Material' */
    onNavigateToCreateMaterial?: () => void;
    /** Callback para o botão 'Nova Unidade' */
    onNavigateToCreateUnidade?: () => void;
    /** Função que retorna a Promise de carregamento de materiais */
    loadMaterialsFunc: () => Promise<any[]>;
    /** Função que retorna a Promise de carregamento de unidades */
    loadUnidadesFunc: () => Promise<any[]>;
    /** Label para o campo de Material (padrão: Materia Prima) */
    materialLabel?: string;
    /** Oculta campos específicos se necessário */
    hideMaterial?: boolean;
    hideQuantidade?: boolean;
    hideUnidade?: boolean;
    /** Classe CSS customizada */
    className?: string;
}
/**
 * Componente de formulário para associação de Materiais e Unidades com quantidades.
 * Agnóstico ao Redux; deve ser controlado pelo componente pai.
 */
declare const UnidadeMaterialForm: React.FC<UnidadeMaterialFormProps>;

interface IconLabelItemProps {
    /** Ícone a ser exibido (ex: vindo de react-icons) */
    icon: React.ReactNode;
    /** Texto/Label associado ao ícone */
    label: React.ReactNode;
    /** Classe CSS para o container principal */
    containerClassName?: string;
    /** Classe CSS para o label */
    labelClassName?: string;
    /** Callback de clique */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Estilo CSS opcional para o container */
    style?: React.CSSProperties;
}
/**
 * Componente que agrupa um ícone e um label.
 */
declare const IconLabelItem: React.FC<IconLabelItemProps>;

interface IconLabelListItem {
    /** Ícone para o item */
    icon: React.ReactNode;
    /** Label para o item */
    label: React.ReactNode;
    /** Callback de clique opcional para este item específico */
    onClick?: () => void;
}
interface IconLabelListProps {
    /** Lista de itens a serem exibidos */
    items: IconLabelListItem[];
    /** Classe CSS adicional para o container da lista */
    className?: string;
}
/**
 * Lista horizontal de ícones com labels.
 */
declare const IconLabelList: React.FC<IconLabelListProps>;

interface Notification {
    id: string | number;
    context?: string;
    contextId?: string | number;
    content?: string;
    status: 'read' | 'unread';
    createdAt: string | number | Date;
    readAt?: string | number | Date | null;
}
interface NotificationItemProps {
    /** Objeto da notificação */
    notification: Notification;
    /** Callback ao clicar para ler/expandir */
    onRead: (notification: Notification) => void;
    /** Callback para descartar/deletar a notificação */
    onDismiss: (notification: Notification) => void;
    /** Tradução customizada para campos vazios */
    emptyContentLabel?: string;
}
/**
 * Item individual de notificação com suporte a preview, modal de detalhes e ações rápidas.
 */
declare const NotificationItem: React.FC<NotificationItemProps>;

interface NotificationBellProps {
    /** Lista de notificações a serem exibidas no dropdown */
    notifications: Notification[];
    /** Callback quando uma notificação é lida */
    onItemRead: (n: Notification) => void;
    /** Callback quando uma notificação é descartada */
    onItemDismiss: (n: Notification) => void;
    /** Callback para 'Marcar todas como lidas' */
    onMarkAllRead?: () => void;
    /** Tamanho do ícone do sino (padrão: 20) */
    size?: number;
    /** Classe CSS para o container */
    className?: string;
}
/**
 * Sino de notificações com contador de mensagens não lidas e dropdown de itens.
 */
declare const NotificationBell: React.FC<NotificationBellProps>;

interface ModalBasicTemplateProps {
    /** Se o modal deve ser exibido */
    show: boolean;
    /** Callback para fechar o modal */
    closeFunc: () => void;
    /** Conteúdo do Body (React Node ou Função que retorna Node) */
    body: React.ReactNode | (() => React.ReactNode);
    /** Conteúdo do Header (opcional) */
    header?: React.ReactNode | (() => React.ReactNode);
    /** Conteúdo do Footer (opcional) */
    footer?: React.ReactNode | (() => React.ReactNode);
    /** Props adicionais para o componente Modal do Bootstrap */
    props?: ModalProps & {
        bodyStyle?: React.CSSProperties;
        dialogStyle?: React.CSSProperties;
    };
}
/**
 * Template base flexível para criação de modais consistentes.
 */
declare const ModalBasicTemplate: React.FC<ModalBasicTemplateProps>;

interface SelectDateModalProps {
    /** Se o modal deve ser exibido */
    show: boolean;
    /** Callback para fechar o modal */
    onClose: () => void;
    /** Callback quando uma data é selecionada/confirmada */
    onSelect: (date: string) => void;
    /** Título do modal (padrão: Selecionar Data) */
    title?: string;
    /** Label do campo de data (padrão: Escolha a data) */
    label?: string;
    /** Data inicial (padrão: agora) */
    initialDate?: string;
    /** Permite datas futuras? */
    allowFuture?: boolean;
}
/**
 * Modal simples para seleção de uma única data/hora.
 */
declare const SelectDateModal: React.FC<SelectDateModalProps>;

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
    /** Se o modal está aberto */
    show: boolean;
    /** Callback para fechar */
    onClose: () => void;
    /** Lista atual de justificativas */
    justificativas: Justificativa[];
    /** ID do usuário atual (para indentificar autoria) */
    currentUserId: string | number;
    /** Nome/Primeiro nome do usuário atual */
    currentUserName: string;
    /** Callback quando uma nova justificativa é adicionada ou a lista é alterada */
    onUpdateJustificativas: (justificativas: Justificativa[]) => Promise<void> | void;
}
/**
 * Modal de Justificativas com estilo de chat e suporte a edição/exclusão lógica.
 */
declare const JustificativaModal: React.FC<JustificativaModalProps>;

interface ImageData {
    key: string;
    author?: string;
    signedUrl?: string;
    dataContext?: string;
    dataId?: string | number;
}
interface ImageViewModalProps {
    /** Se o modal está aberto */
    show: boolean;
    /** Callback para fechar */
    onHide: () => void;
    /** Lista de imagens disponíveis para visualização */
    imagesData: ImageData[];
    /** Imagem inicial selecionada */
    initialImageData?: ImageData;
    /** Texto alternativo para a imagem */
    imageAltText?: string;
    /** Callback para resolver a URL final da imagem caso não tenha signedUrl */
    resolveImageUrl?: (key: string) => string;
}
/**
 * Modal especializado para visualização de uma ou mais imagens com seletor de galeria.
 */
declare const ImageViewModal: React.FC<ImageViewModalProps>;

interface LoadingProgressProps {
    hidden?: boolean;
}
/**
 * Componente de indicador de carregamento (Spinner) padronizado.
 */
declare const LoadingProgress: React.FC<LoadingProgressProps>;

interface QrReaderProps {
    /** Callback chamado com o valor lido do QR Code */
    callback: (result: string) => void;
}
/**
 * Componente para leitura de QR Code usando a câmera do dispositivo.
 */
declare const QrReader: React.FC<QrReaderProps>;

interface QrCodeScanButtonProps {
    /** Callback chamado com o valor lido do QR Code */
    callback: (result: string) => void;
    /** Tamanho do ícone (padrão: 25) */
    size?: number;
}
/**
 * Botão que alterna a visualização do scanner de QR Code.
 */
declare const QrCodeScanButton: React.FC<QrCodeScanButtonProps>;

interface ReusableTableColumnConfig {
    columns: string[];
    dataObj: any;
}
interface ReusableTableWithModalProps {
    /** Promise que resolve para os dados brutos */
    fetchDataCallback: () => Promise<any[]>;
    /** Callback para configurar colunas de cada linha */
    configureColumnsCallback: (item: any) => ReusableTableColumnConfig;
    /** Cabeçalhos da tabela */
    headers: string[];
    /** Callback chamado pelo botão principal do modal */
    modalButtonCallback?: (selectedItem: any) => void;
    /** Conteúdo customizado do modal */
    modalContent?: (selectedItem: any) => React.ReactNode;
    /** Label para o botão de confirmação do modal */
    confirmLabel?: string;
    /** Callback opcional quando os dados são carregados */
    onFetchData?: (data: any[]) => void;
}
/**
 * Tabela interativa que abre um modal de detalhes ao clicar na linha.
 * Combina carregamento de dados e apresentação modal em um único componente.
 */
declare const ReusableTableWithModal: React.FC<ReusableTableWithModalProps>;

interface TextWithMoreProps {
    /** Texto a ser exibido */
    text?: string;
    /** Comprimento máximo antes de truncar */
    maxLength: number;
    /** Label para 'ver mais' (padrão: ver mais) */
    moreLabel?: string;
    /** Label para 'ver menos' (padrão: ver menos) */
    lessLabel?: string;
}
/**
 * Componente que trunca textos longos com opção de expansão in-place.
 */
declare const TextWithMore: React.FC<TextWithMoreProps>;

export { ActionButtons, type ActionButtonsProps, AddButton, AdvancedFilterBar, type AdvancedFilterBarProps, ApproveAndReproveButtons, type ApproveAndReproveButtonsProps, AsyncButton, type AsyncButtonProps, AutoComplete, type AutoCompleteProps, BonusButton, type BonusButtonProps, ButtonWithDropdown, type ButtonWithDropdownOption, type ButtonWithDropdownProps, CheckBox, type CheckBoxOption, type CheckBoxProps, ClickToWriteField, type ClickToWriteFieldProps, ColorPicker, type ColorPickerProps, ConfigObject, DeleteButton, DeleteConfirm, type DeleteConfirmProps, ExpandableCard, type ExpandableCardItem, type ExpandableCardItemObject, type ExpandableCardProps, FormField, type FormFieldProps, Generic3DotMenu, type Generic3DotMenuProps, GenericChart, type GenericChartProps, GenericDisplay, GenericForm, GenericREchart, type GenericREchartProps, GenericSelect, GenericSelectOps, IconLabelItem, type IconLabelItemProps, IconLabelList, type IconLabelListItem, type IconLabelListProps, type ImageData, ImageViewModal, type ImageViewModalProps, type Justificativa, JustificativaModal, type JustificativaModalProps, LoadingButton, type LoadingButtonProps, LoadingProgress, type LoadingProgressProps, MailSender, type MailSenderProps, MenuEvent, ModalBasicTemplate, type ModalBasicTemplateProps, NavigateButton, type NavigateButtonProps, type Notification, NotificationBell, type NotificationBellProps, NotificationItem, type NotificationItemProps, type PeriodPreset, type PeriodRange, PeriodSelector, type PeriodSelectorProps, QrCodeScanButton, type QrCodeScanButtonProps, QrReader, type QrReaderProps, type QuickPresetKey, RateLimitBar, type RateLimitBarProps, type RateLimitEntry, ResponsiveContainer, type ReusableTableColumnConfig, ReusableTableWithModal, type ReusableTableWithModalProps, type Sector, SectorSelector, type SectorSelectorProps, SelectDateModal, type SelectDateModalProps, StatusBadge, type StatusBadgeProps, StatusIndicator, type StatusIndicatorProps, StatusLight, type StatusLightProps, type StatusMeta, StatusPills, type StatusPillsProps, Switch, SwitchOnClick, type SwitchOnClickProps, type SwitchProps, TextWithMore, type TextWithMoreProps, TimerDisplay, type TimerDisplayProps, UnidadeMaterialForm, type UnidadeMaterialFormProps, type UnidadeMaterialValue, UnifiedPeriodSelector, type UnifiedPeriodSelectorProps, UploadArea, type UploadAreaProps, UuidPill, VerticalItemsDisplay, type VerticalItemsDisplayProps };
