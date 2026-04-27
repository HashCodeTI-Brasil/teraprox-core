import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
export { FrequenciaFormV2, FrequenciaFormV2Props, RecorrenciaEscala, RecorrenciaValue } from '@teraprox/ui-kit-core';

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

export { type AcaoOption, CalculadoraCorrecaoModal, type CalculadoraCorrecaoModalProps, CalculoCorrecao, type CalculoCorrecaoProps, type CalculoDeCorrecaoVM, type CalculoVM, CampoDeVerificacaoV2, type CampoDeVerificacaoV2Props, type CampoVM, type RegraDeCorrecaoVM, type TarefaFormVM, TarefaUnidadeForm, type TarefaUnidadeFormProps, type TarefaUnidadeMaterialVM, UnidadeMaterialCard, type UnidadeMaterialCardProps, type UnidadeMaterialFormValue, type UnidadeMaterialVM };
