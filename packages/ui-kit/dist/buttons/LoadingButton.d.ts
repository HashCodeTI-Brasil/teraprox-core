import React from "react";
import { ButtonProps } from "react-bootstrap";
import "../styles/LoadingButton.css";
export interface LoadingButtonProps extends ButtonProps {
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
export declare const LoadingButton: React.FC<LoadingButtonProps>;
export default LoadingButton;
