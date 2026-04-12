import React from "react";
import { Accept } from "react-dropzone";
import "../styles/UploadArea.css";
export interface UploadAreaProps {
    /** Callback chamado ao selecionar um arquivo */
    onFilePut: (file: File) => void;
    /** Objeto do arquivo já anexado (opcional) */
    anexo?: {
        name: string;
    } | null;
    /** Tipos de arquivos aceitos (padrão: JPEG, PNG) */
    accept?: Accept;
    /** Tamanho máximo em bytes (padrão: 50MB) */
    maxSize?: number;
}
/**
 * Área de upload com suporte a Drag & Drop e indicação de arquivo anexado.
 */
export declare const UploadArea: React.FC<UploadAreaProps>;
export default UploadArea;
