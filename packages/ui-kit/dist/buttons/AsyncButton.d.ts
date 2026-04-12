import React from "react";
import { ButtonProps } from "react-bootstrap";
export interface AsyncButtonProps {
    /** Função assíncrona a ser executada no clique */
    onClick: () => Promise<void> | void;
    /** Conteúdo do botão */
    children: React.ReactNode;
    /** Componente de loading customizado (padrão: <LoadingProgress />) */
    loadingComponent?: React.ReactNode;
    /** Props adicionais para o componente Button do react-bootstrap */
    buttonProps?: ButtonProps;
}
/**
 * Componente de botão para operações assíncronas com tratamento interno de estado.
 */
export declare const AsyncButton: React.FC<AsyncButtonProps>;
export default AsyncButton;
