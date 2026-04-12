import React from "react";
import "../styles/PeriodSelector.css";
export type PeriodPreset = "today" | "week" | "fortnight" | "month" | "year";
export interface PeriodSelectorProps {
    /** Data inicial formatada (YYYY-MM-DDTHH:mm) */
    startDate: string;
    /** Data final formatada (YYYY-MM-DDTHH:mm) */
    endDate: string;
    /** Callback quando a data inicial muda */
    onStartDateChange: (date: string) => void;
    /** Callback quando a data final muda */
    onEndDateChange: (date: string) => void;
    /** Callback opcional quando um atalho é selecionado */
    onPresetSelect?: (preset: PeriodPreset) => void;
    /** Título do componente */
    label?: string;
    /** Se permite selecionar datas futuras (padrão: false) */
    allowFuture?: boolean;
    /** Classe CSS adicional */
    className?: string;
}
/**
 * Seletor de período (datas) com visão compacta e atalhos rápidos.
 */
export declare const PeriodSelector: React.FC<PeriodSelectorProps>;
export default PeriodSelector;
