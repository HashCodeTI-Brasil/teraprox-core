import React from "react";
export interface StatusBadgeProps {
    /** Texto do status */
    status: string;
    /** Se deve exibir um checkbox de seleção ao lado */
    showCheckbox?: boolean;
    /** Estado do checkbox */
    checked?: boolean;
    /** Callback para alteração do checkbox */
    onToggle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Estado de carregamento */
    loading?: boolean;
    /** Mapeamento customizado de classes de status (padrão: PENDENTE, EXECUTANDO, CONCLUIDO, CANCELED) */
    customStatusClasses?: Record<string, string>;
}
/**
 * Badge de Status com suporte opcional a checkbox e spinner.
 */
export declare const StatusBadge: React.FC<StatusBadgeProps>;
export default StatusBadge;
