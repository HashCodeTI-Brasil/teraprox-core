import React from "react";
export interface ApproveAndReproveButtonsProps {
    /** Tamanho dos ícones (padrão: 25) */
    buttonSize?: number;
    /** Callback para aprovação */
    approveCallback: () => void;
    /** Callback para reprovação */
    reproveCallback: () => void;
    /** Callback para cancelamento (ao pressionar ESC) */
    cancelCallback: () => void;
    /** Texto opcional do cabeçalho */
    headerText?: string;
    /** Texto opcional do botão de aprovação */
    approveText?: string;
    /** Texto opcional do botão de reprovação */
    repproveText?: string;
}
/**
 * Componente de botões de Aprovação e Reprovação (Check e Close).
 */
export declare const ApproveAndReproveButtons: React.FC<ApproveAndReproveButtonsProps>;
export default ApproveAndReproveButtons;
