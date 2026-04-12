import React from "react";
export interface ReusableTableColumnConfig {
    columns: string[];
    dataObj: any;
}
export interface ReusableTableWithModalProps {
    /** Promise que resolve para os dados brutos */
    fetchDataCallback: () => Promise<any[]>;
    /** Callback para configurar colunas de cada linha */
    configureColumnsCallback: (item: any) => ReusableTableColumnConfig;
    /** Cabeçalhos da tabela */
    headers: string[];
    /** Callback chamado pelo botão principal do modal */
    modalButtonCallback?: (selectedItem: any) => void;
    /** Conteúdo customizado do modal */
    modalContent?: (selectedItem: any) => React.ReactNode;
    /** Label para o botão de confirmação do modal */
    confirmLabel?: string;
    /** Callback opcional quando os dados são carregados */
    onFetchData?: (data: any[]) => void;
}
/**
 * Tabela interativa que abre um modal de detalhes ao clicar na linha.
 * Combina carregamento de dados e apresentação modal em um único componente.
 */
export declare const ReusableTableWithModal: React.FC<ReusableTableWithModalProps>;
export default ReusableTableWithModal;
