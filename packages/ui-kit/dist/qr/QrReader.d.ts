import React from "react";
export interface QrReaderProps {
    /** Callback chamado com o valor lido do QR Code */
    callback: (result: string) => void;
}
/**
 * Componente para leitura de QR Code usando a câmera do dispositivo.
 */
export declare const QrReader: React.FC<QrReaderProps>;
export default QrReader;
