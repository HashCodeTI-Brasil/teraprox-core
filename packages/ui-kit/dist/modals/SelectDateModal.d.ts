import React from "react";
export interface SelectDateModalProps {
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
export declare const SelectDateModal: React.FC<SelectDateModalProps>;
export default SelectDateModal;
