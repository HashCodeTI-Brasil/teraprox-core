import React from "react";
export interface FindRecursoByTagFieldProps {
    /** Callback chamado quando um recurso é selecionado ou lido via QR. */
    callback: (recurso: any, confirmed: boolean) => void;
    /** Controller de recurso injetado (deve implementar read, get e findByTagDescription) */
    recursoController?: {
        read: (endpoint: string, data?: any) => Promise<any>;
        get: (endpoint: string) => Promise<any>;
    };
}
/**
 * Componente para encontrar um recurso por sua tag (descrição ou ID).
 * Suporta busca via AutoComplete e leitura via QR Code.
 */
export declare const FindRecursoByTagField: React.FC<FindRecursoByTagFieldProps>;
export default FindRecursoByTagField;
