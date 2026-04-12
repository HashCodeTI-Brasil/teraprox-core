import React from "react";
import { ModalProps } from "react-bootstrap";
export interface ModalBasicTemplateProps {
    /** Se o modal deve ser exibido */
    show: boolean;
    /** Callback para fechar o modal */
    closeFunc: () => void;
    /** Conteúdo do Body (React Node ou Função que retorna Node) */
    body: React.ReactNode | (() => React.ReactNode);
    /** Conteúdo do Header (opcional) */
    header?: React.ReactNode | (() => React.ReactNode);
    /** Conteúdo do Footer (opcional) */
    footer?: React.ReactNode | (() => React.ReactNode);
    /** Props adicionais para o componente Modal do Bootstrap */
    props?: ModalProps & {
        bodyStyle?: React.CSSProperties;
        dialogStyle?: React.CSSProperties;
    };
}
/**
 * Template base flexível para criação de modais consistentes.
 */
export declare const ModalBasicTemplate: React.FC<ModalBasicTemplateProps>;
export default ModalBasicTemplate;
