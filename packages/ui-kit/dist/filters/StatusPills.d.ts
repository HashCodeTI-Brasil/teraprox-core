import React from "react";
import "../styles/StatusPills.css";
export interface StatusMeta {
    label: string;
    color: string;
    count?: number;
}
export interface StatusPillsProps {
    /** Objeto contendo os metadados de cada status (Chave -> Meta) */
    statuses: Record<string, StatusMeta>;
    /** Chaves dos status atualmente ativos/selecionados */
    activeKeys: string[];
    /** Callback chamado quando a seleção muda */
    onSelectionChange: (keys: string[]) => void;
    /** Se deve permitir seleção de múltiplos status (padrão: true) */
    multiSelect?: boolean;
    /** Classe CSS adicional */
    className?: string;
}
/**
 * Filtro rápido de status usando 'Pills' clicáveis.
 * Altamente performático por ser puramente visual e controlado via props.
 */
export declare const StatusPills: React.FC<StatusPillsProps>;
export default StatusPills;
