import React from "react";
import { ButtonProps } from "react-bootstrap";
export interface ClickToWriteFieldProps {
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
export declare const ClickToWriteField: React.FC<ClickToWriteFieldProps>;
export default ClickToWriteField;
