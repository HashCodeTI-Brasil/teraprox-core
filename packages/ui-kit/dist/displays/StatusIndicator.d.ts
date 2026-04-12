import React from "react";
import "../styles/StatusIndicator.css";
export interface StatusIndicatorProps {
    /** Status (pendente, executando, concluido, canceled, naoAtribuida) */
    status: string;
    /** Quantidade/Contagem associada ao status */
    count?: number | string;
    /** Classe CSS adicional para o container */
    containerClassName?: string;
    /** Mapeamento customizado de labels de status */
    customLabels?: Record<string, string>;
}
/**
 * Indicador de status tipo 'Flag' com destaque de cor e contagem.
 */
export declare const StatusIndicator: React.FC<StatusIndicatorProps>;
export default StatusIndicator;
