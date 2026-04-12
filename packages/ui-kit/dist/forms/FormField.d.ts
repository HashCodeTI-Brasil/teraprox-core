import React from 'react';
export interface FormFieldProps {
    /** Valor do campo */
    val?: string | number;
    /** Callback quando o valor muda */
    onValueUpdate?: (val: string, event: React.ChangeEvent<any>) => void;
    /** Callback no blur */
    onBlur?: (val: string, event: React.FocusEvent<any>) => void;
    /** Label exibida no FloatingLabel */
    label?: string;
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
 * Campo de formulário padronizado com suporte a FloatingLabel e botões de ação laterais.
 */
export declare const FormField: React.FC<FormFieldProps>;
export default FormField;
