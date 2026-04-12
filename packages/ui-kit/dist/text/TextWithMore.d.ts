import React from "react";
export interface TextWithMoreProps {
    /** Texto a ser exibido */
    text?: string;
    /** Comprimento máximo antes de truncar */
    maxLength: number;
    /** Label para 'ver mais' (padrão: ver mais) */
    moreLabel?: string;
    /** Label para 'ver menos' (padrão: ver menos) */
    lessLabel?: string;
}
/**
 * Componente que trunca textos longos com opção de expansão in-place.
 */
export declare const TextWithMore: React.FC<TextWithMoreProps>;
export default TextWithMore;
