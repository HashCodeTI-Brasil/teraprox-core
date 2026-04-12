import React from "react";
export interface AutoCompleteProps {
    className?: string;
    /** Opções estáticas iniciais */
    ops?: any[];
    /** Chave para ordenação */
    sortKey?: string;
    /** Chave para exibição no input */
    displayKey?: string;
    /** Chaves para exibição concatenada */
    displayKeys?: string[];
    /** Callback de alteração no input */
    onValueChanged?: (val: string) => void;
    /** Callback ao clicar em uma sugestão */
    onSelectedClick: (li: any, index: number, lItem: any[]) => void;
    /** Valor controlado */
    value?: string;
    /** Botão de ação opcional (ex: clear) */
    actionButton?: (clear: () => void) => React.ReactNode;
    /** Segundo botão de ação opcional */
    actionButton2?: (input: string) => React.ReactNode;
    placeH?: string;
    title?: string;
    /** Valor para filtrar a lista inicial */
    filter?: any;
    filterField?: string;
    /** Função de carregamento assíncrono */
    loadFunc?: () => Promise<any[]>;
    /** Condição para disparar o carregamento */
    loadCondition?: boolean;
    onBlurEvent?: (e: React.FocusEvent<HTMLInputElement>, input: string) => void;
    /** Função customizada para formatar a label da lista */
    formatationFunc?: (item: any) => string;
    onEscKeyDown?: () => void;
    onEnterKeyDown?: (input: string) => void;
    /** Margem superior */
    margT?: number;
    /** Margem inferior */
    margB?: number;
    hideComponent?: boolean;
    disableComponent?: boolean;
    disableSelect?: boolean;
    autoFocusConfig?: boolean;
    onLoad?: (data: any[]) => void;
    /** Chave para cache em memória */
    cacheKey?: string;
    /** Mínimo de caracteres para mostrar a lista */
    minChars?: number;
    /** Limite de itens na lista */
    maxItems?: number;
    /** Se deve mostrar a lista ao focar */
    showListOnFocus?: boolean;
    /** Se deve carregar sob demanda ao digitar */
    lazyLoad?: boolean;
}
/**
 * Componente de Input com Auto-complete dinâmico.
 * Suporta cache em memória compartilhada entre instâncias via window.
 */
export declare const AutoComplete: React.FC<AutoCompleteProps>;
