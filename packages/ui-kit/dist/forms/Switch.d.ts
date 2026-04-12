import React from "react";
import { FormCheckProps } from "react-bootstrap";
export interface SwitchProps extends Omit<FormCheckProps, 'onChange' | 'value'> {
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
export declare const Switch: React.FC<SwitchProps>;
export default Switch;
