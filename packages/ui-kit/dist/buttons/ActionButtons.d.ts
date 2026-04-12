import React from "react";
export interface ActionButtonsProps {
    /** Botão Salvar */
    onSave?: () => void;
    saveLabel?: string;
    saveVariant?: string;
    disabled?: boolean;
    /** Botão Excluir */
    onDelete?: (details?: string) => void;
    deleteLabel?: string;
    deleteConfirmMsg?: string;
    needExclusionDetails?: boolean;
    /** Botão Voltar */
    onBack?: () => void;
    backLabel?: string;
    /** Botão Cancelar Edição */
    onCancelEdit?: () => void;
    cancelEditLabel?: string;
    /** Botão Copiar Form */
    onCopy?: () => void;
    copyLabel?: string;
    /** Meta-estado */
    isEditing?: boolean;
    /** Configuração Especial: Deleção com Delay (Hold for 3s) */
    useDelayedDelete?: boolean;
    delayedDeleteTimeout?: number;
    /** Wrapper opcional para controle de permissões (ex: PermissionContainer) */
    PermissionWrapper?: React.ComponentType<{
        children: React.ReactNode;
        id?: string;
    }>;
}
/**
 * Agrupamento de botões de ação (Salvar, Excluir, Voltar, etc) padronizado.
 * Agrega funcionalidade de confirmação de deleção e animação de 'hold-to-delete'.
 */
export declare const ActionButtons: React.FC<ActionButtonsProps>;
