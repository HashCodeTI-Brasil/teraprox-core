import React from 'react';
import '../styles/AnexoManager.css';
export interface AnexoPersistedItem {
    id: string | number;
    nome: string;
    tipo?: string;
    tamanho?: number;
    url?: string;
    signedUrl?: string;
    createdAt?: string;
}
export interface AnexoLocalItem {
    localId: string;
    file: File;
    nome: string;
    tipo: string;
    tamanho: number;
    progress: number;
    status: 'pending' | 'uploading' | 'done' | 'error';
    errorMessage?: string;
}
export interface AnexoManagerProps {
    /** Anexos já persistidos (vindos da API). */
    persistidos?: AnexoPersistedItem[];
    /** Anexos locais (fila de upload). */
    locais?: AnexoLocalItem[];
    /** Chamado ao adicionar arquivos (drag/click). */
    onAddFiles?: (files: File[]) => void;
    /** Chamado ao remover um local da fila. */
    onRemoveLocal?: (localId: string) => void;
    /** Chamado ao remover um persistido. */
    onRemovePersistido?: (id: string | number) => void;
    /** Chamado ao clicar download/preview. Deve retornar URL. */
    onDownload?: (anexo: AnexoPersistedItem) => void;
    /** Chamado ao clicar retry num arquivo com erro. */
    onRetry?: (localId: string) => void;
    /** Se true, mostra spinner de loading geral. */
    loading?: boolean;
    /** Modo read-only (sem upload/delete). */
    readonly?: boolean;
    /** Tamanho máximo por arquivo em bytes (default 50MB). */
    maxFileSize?: number;
    /** Máximo de arquivos simultâneos (default 10). */
    maxFiles?: number;
    /** Label customizado para a dropzone. */
    dropzoneLabel?: string;
}
export declare const AnexoManager: React.FC<AnexoManagerProps>;
export default AnexoManager;
