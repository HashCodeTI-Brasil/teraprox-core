import React from "react";
/**
 * Representa um evento/ação no menu de 3 pontos.
 */
export declare class MenuEvent {
    label: string;
    callback: () => void;
    variant: string;
    renderCondition: boolean | (() => boolean);
    section: string;
    /**
     * @param label - O texto que aparecerá no botão.
     * @param callback - A função a ser chamada quando o botão for clicado.
     * @param variant - A variante do botão (padrão: 'primary').
     * @param renderCondition - Condição para renderizar o botão.
     * @param section - A seção para organizar os botões (padrão: 'default').
     */
    constructor(label: string, callback: () => void, variant?: string, renderCondition?: boolean | (() => boolean), section?: string);
}
export interface Generic3DotMenuProps {
    /** Lista de eventos (opções) do menu */
    events: MenuEvent[];
    /** Título exibido no modal do menu */
    tittle?: string;
}
/**
 * Menu de 3 pontos que abre um Modal com opções organizadas por seções.
 */
export declare const Generic3DotMenu: React.FC<Generic3DotMenuProps>;
export default Generic3DotMenu;
