import React from "react";
export interface QrCodeScanButtonProps {
    /** Callback chamado com o valor lido do QR Code */
    callback: (result: string) => void;
    /** Tamanho do ícone (padrão: 25) */
    size?: number;
}
/**
 * Botão que alterna a visualização do scanner de QR Code.
 */
export declare const QrCodeScanButton: React.FC<QrCodeScanButtonProps>;
export default QrCodeScanButton;
