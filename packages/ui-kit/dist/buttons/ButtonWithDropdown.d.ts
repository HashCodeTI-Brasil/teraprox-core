import React from "react";
import { ButtonProps } from "react-bootstrap";
export interface ButtonWithDropdownOption {
    label: string;
    callback: () => void;
}
export interface ButtonWithDropdownProps {
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
export declare const ButtonWithDropdown: React.FC<ButtonWithDropdownProps>;
export default ButtonWithDropdown;
