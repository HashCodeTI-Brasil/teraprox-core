import React from "react";
export interface DeleteConfirmProps {
    /** Controla visibilidade do modal */
    show: boolean;
    /** Fecha o modal */
    onHide: (show: boolean) => void;
    /** Callback chamado ao confirmar a exclusão */
    onConfirm: (details: string) => void;
    /** Título do modal */
    title?: string;
    /** Texto do corpo do modal (pode ser string ou função que recebe payload) */
    dialogText?: string | ((payload: any) => string);
    /** Dados extras para o dialogText */
    payload?: any;
    /** Se true, exige um campo de 'Motivo' com pelo menos 8 caracteres */
    needExclusionDetails?: boolean;
}
/**
 * Modal de confirmação de exclusão padronizado.
 */
export declare const DeleteConfirm: React.FC<DeleteConfirmProps>;
