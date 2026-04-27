import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * FormModal — base reutilizável para modais de formulário com ação primária.
 *
 * Slots: { title, icon, body (children), primaryAction, secondaryAction,
 * footerExtra, isValid, isLoading }. Substitui o padrão quebrado de
 * SwitchOnClick + GenericContextForm vazio + ResponsiveContainer sem footer.
 *
 * Wave 1 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */
interface FormModalPrimaryAction {
    label: string;
    onClick: () => void | Promise<void>;
    icon?: React.ReactNode;
    variant?: string;
}
interface FormModalSecondaryAction {
    label: string;
    onClick: () => void;
    variant?: string;
}
interface FormModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
    primaryAction: FormModalPrimaryAction;
    secondaryAction?: FormModalSecondaryAction;
    isValid?: boolean;
    isLoading?: boolean;
    closeOnBackdrop?: boolean;
    scrollable?: boolean;
    footerExtra?: React.ReactNode;
}
declare const FormModal: React.FC<FormModalProps>;

/**
 * Enum completo do backend (`api-manutencao/recorrencia`). Por default o UI
 * dropdown mostra `hour|day|week|month` (contrato SGM atual). Callers podem
 * restringir ou expandir via `escalasVisiveis`.
 */
type RecorrenciaEscala = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
interface RecorrenciaValue {
    id?: number;
    valor: number;
    escala: RecorrenciaEscala;
    /** ISO 8601. Opcional — dominios sem agendamento temporal nao preenchem. */
    dataInicio?: string;
}
interface FrequenciaFormV2Props {
    /** `null` = estado "sem recorrencia". */
    value: RecorrenciaValue | null;
    onValorChange: (valor: number) => void;
    onEscalaChange: (escala: RecorrenciaEscala) => void;
    /**
     * Exigido apenas quando `showDataInicio !== false`. Aceita undefined para
     * limpar (dominios sem agendamento temporal).
     */
    onDataInicioChange?: (dataInicio: string | undefined) => void;
    /** Opcional — se definido, renderiza botao "Remover recorrencia" quando value !== null. */
    onClear?: () => void;
    disabled?: boolean;
    className?: string;
    /**
     * Escalas exibidas no dropdown (ordem preservada). Default mantem contrato
     * SGM atual: `['hour','day','week','month']`.
     */
    escalasVisiveis?: RecorrenciaEscala[];
    /**
     * Controla exibicao do campo "Data de inicio". Default true (SGM-OS).
     * Caderno/planoDeControle passam `false`.
     */
    showDataInicio?: boolean;
}
declare const FrequenciaFormV2: ({ value, onValorChange, onEscalaChange, onDataInicioChange, onClear, disabled, className, escalasVisiveis, showDataInicio, }: FrequenciaFormV2Props) => react_jsx_runtime.JSX.Element;

/**
 * ContadorPicker — componente props-driven (zero Redux, zero useCoreService).
 *
 * Substitui o padrao legado `withGenericPicker(LimiteDeControlePicker)` por
 * um componente autonomo que recebe `value` + callbacks explicitos. A
 * camada de estado (Redux/slice) fica em useContadorViewModel no core-sdk.
 *
 * Sprint 2026-04-20 code-split-fix — Track C.2 UI.
 */
type ContadorBoundRule = '>=' | '<=' | '>' | '<' | '==' | '!=';
interface ContadorLimite {
    nome?: string;
    boundRule?: string;
    valor?: number | string;
    [k: string]: unknown;
}
interface ContadorPickerValue {
    valor: number | null;
    unidade: string | null;
    parametro: string | null;
    limitesDeControle: ContadorLimite[];
}
interface ContadorPickerProps {
    value: ContadorPickerValue;
    onValorChange: (v: number | null) => void;
    onUnidadeChange: (u: string) => void;
    onParametroChange: (p: string) => void;
    onLimiteAdd: (limite: ContadorLimite) => void;
    onLimiteRemove: (index: number) => void;
    onLimiteUpdate: (index: number, limite: ContadorLimite) => void;
    /** Desabilita todos os inputs (readOnly de fato). */
    disabled?: boolean;
    /** Oculta o bloco de limites de controle (quando nao relevante). */
    hideLimites?: boolean;
    /** Placeholder do campo parametro. */
    parametroPlaceholder?: string;
    /** Placeholder do campo unidade. */
    unidadePlaceholder?: string;
    className?: string;
}
declare const ContadorPicker: React.FC<ContadorPickerProps>;

interface AnexoPersistedItem {
    id: string | number;
    /** API costuma devolver `originalName` em vez de `nome`. */
    nome?: string;
    originalName?: string;
    /** Chave GCS/S3 — necessária para pedir signed URL de leitura. */
    key?: string;
    tipo?: string;
    /** API batch: `image/jpeg` etc. (alias a `tipo` se necessário) */
    mimeType?: string;
    tamanho?: number;
    url?: string;
    signedUrl?: string;
    createdAt?: string;
    unavailable?: boolean;
}
interface AnexoLocalItem {
    localId: string;
    file: File;
    nome: string;
    tipo: string;
    tamanho: number;
    progress: number;
    status: 'pending' | 'uploading' | 'done' | 'error';
    errorMessage?: string;
}
interface AnexoManagerProps {
    /** Anexos ja persistidos (vindos da API). */
    persistidos?: AnexoPersistedItem[];
    /** Anexos locais (fila de upload). */
    locais?: AnexoLocalItem[];
    /** Chamado ao adicionar arquivos (drag/click). */
    onAddFiles?: (files: File[]) => void;
    /** Chamado ao remover um local da fila. */
    onRemoveLocal?: (localId: string) => void;
    /** Chamado ao remover um persistido. */
    onRemovePersistido?: (id: string | number) => void;
    /** Chamado ao clicar download/preview. Deve retornar URL. */
    onDownload?: (anexo: AnexoPersistedItem) => void;
    /** Chamado ao clicar retry num arquivo com erro. */
    onRetry?: (localId: string) => void;
    /** Se true, mostra spinner de loading geral. */
    loading?: boolean;
    /** Modo read-only (sem upload/delete). */
    readonly?: boolean;
    /** Tamanho maximo por arquivo em bytes (default 50MB). */
    maxFileSize?: number;
    /** Maximo de arquivos simultaneos (default 10). */
    maxFiles?: number;
    /** Label customizado para a dropzone. */
    dropzoneLabel?: string;
    /**
     * Resolve URL de leitura assinada (ex. `getUrl(id, key)`) — necessário se `url`/`signedUrl` não
     * vêm do backend e ainda quiser miniatura de imagem + lightbox.
     */
    getImageReadUrl?: (anexo: AnexoPersistedItem) => Promise<string>;
}
declare const AnexoManager: React.FC<AnexoManagerProps>;

/**
 * ClickToWriteField — campo de texto props-driven para edicao inline.
 *
 * Promovido de teraprox-SGM-OS `InnerEditableTextField` na Wave 5C da sprint
 * 2026-04-21-ui-kit-domain-split-wave0. Zero Redux, zero dominio — apenas
 * state local + callbacks explicitos. Caller controla `isActive` (quando
 * exibir) e `onHide` (quando o blur ocorre).
 *
 * API retrocompativel com `InnerEditableTextField`:
 *  - `value`, `onChange(value)`
 *  - `label`, `placeholder`, `disabled`
 *  - `onEnterPress(value)` — opcional, disparado no Enter
 *  - `onHide(value)` — opcional, disparado no blur (usado para fechar modo edicao)
 *
 * Props `isActive`, `initialValue`, `fallBack` sao absorvidas (compat com
 * callers legados) mas nao vazam para o DOM — evitam React warnings.
 */
interface ClickToWriteFieldProps {
    value?: string | number | null;
    onChange?: (value: string) => void;
    label?: React.ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onEnterPress?: (value: string) => void;
    onHide?: (value: string) => void;
    isActive?: boolean;
    initialValue?: string;
    fallBack?: unknown;
    [key: string]: unknown;
}
declare const ClickToWriteField: React.FC<ClickToWriteFieldProps>;

/**
 * CombineModeToggle — toggle visual com ícones de Venn para modos de combinação
 * de filtros multi-select. Props-driven (zero Redux, zero dominio).
 *
 * Use em conjunto com `useFilterCombineMode` do `teraprox-core-sdk`:
 *
 * ```tsx
 * const combine = useFilterCombineMode('union')
 * <CombineModeToggle mode={combine.mode} onChange={combine.setMode} />
 * ```
 */
type CombineMode = 'union' | 'intersection' | 'xor';
interface CombineModeToggleProps {
    mode: CombineMode;
    onChange: (mode: CombineMode) => void;
    /** Exibe rótulo junto aos ícones. */
    showLabel?: boolean;
    disabled?: boolean;
    /** Tamanho do ícone em pixels. Default: 18. */
    size?: number;
    className?: string;
}
declare const CombineModeToggle: React.FC<CombineModeToggleProps>;

export { type AnexoLocalItem, AnexoManager, type AnexoManagerProps, type AnexoPersistedItem, ClickToWriteField, type ClickToWriteFieldProps, type CombineMode, CombineModeToggle, type CombineModeToggleProps, type ContadorBoundRule, type ContadorLimite, ContadorPicker, type ContadorPickerProps, type ContadorPickerValue, FormModal, type FormModalProps, FrequenciaFormV2, type FrequenciaFormV2Props, type RecorrenciaEscala, type RecorrenciaValue };
