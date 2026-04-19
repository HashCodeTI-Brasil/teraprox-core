import React from 'react';
import { UnidadeMaterialValue, IUnidadeMaterialViewModel, InspecaoValue, IInspecaoModalViewModel } from 'teraprox-core-sdk';

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

export { InspecaoModal, type InspecaoModalProps, UnidadeMaterialModal, type UnidadeMaterialModalProps };
