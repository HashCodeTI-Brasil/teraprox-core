import React from "react";
export interface Justificativa {
    id: string | number;
    descricao: string;
    user?: {
        userId: string | number;
        userName?: string;
        firstName?: string;
    };
    createdAt: string | number | Date;
    removed?: boolean;
    isNew?: boolean;
}
export interface JustificativaModalProps {
    /** Se o modal está aberto */
    show: boolean;
    /** Callback para fechar */
    onClose: () => void;
    /** Lista atual de justificativas */
    justificativas: Justificativa[];
    /** ID do usuário atual (para indentificar autoria) */
    currentUserId: string | number;
    /** Nome/Primeiro nome do usuário atual */
    currentUserName: string;
    /** Callback quando uma nova justificativa é adicionada ou a lista é alterada */
    onUpdateJustificativas: (justificativas: Justificativa[]) => Promise<void> | void;
}
/**
 * Modal de Justificativas com estilo de chat e suporte a edição/exclusão lógica.
 */
export declare const JustificativaModal: React.FC<JustificativaModalProps>;
export default JustificativaModal;
