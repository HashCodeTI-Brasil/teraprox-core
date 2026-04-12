import React from "react";
export interface CheckBoxOption {
    valor: string | number;
    [key: string]: any;
}
export interface CheckBoxProps {
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
export declare const CheckBox: React.FC<CheckBoxProps>;
export default CheckBox;
