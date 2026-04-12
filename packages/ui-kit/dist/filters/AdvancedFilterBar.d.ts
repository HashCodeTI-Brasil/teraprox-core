import React from "react";
import "../styles/AdvancedFilterBar.css";
export interface AdvancedFilterBarProps {
    /** Conteúdo dos filtros (grid de filtros) */
    children: React.ReactNode;
    /** Título da barra (padrão: Filtros) */
    title?: string;
    /** Quantidade de filtros ativos para exibir no badge */
    activeFiltersCount?: number;
    /** Callback para limpar todos os filtros */
    onClearAll?: () => void;
    /** Se deve iniciar expandido (padrão: false) */
    defaultExpanded?: boolean;
    /** Classe CSS adicional */
    className?: string;
}
/**
 * Container colapsável para filtros complexos.
 * Organiza filtros em um grid limpo e fornece ações de clearing.
 */
export declare const AdvancedFilterBar: React.FC<AdvancedFilterBarProps>;
export default AdvancedFilterBar;
