import React from "react";
export interface GenericChartProps {
    chartType: any;
    graphID: string;
    width?: string;
    height?: string;
    columns: any[];
    rows: any[][];
    chartEvents?: any[];
    options?: Record<string, any>;
    /** Callback opcional para customizar os tooltips */
    tooltipFormatter?: (row: any[]) => string;
}
/**
 * Wrapper para Google Charts com suporte a tooltips HTML customizados.
 */
export declare const GenericChart: React.FC<GenericChartProps>;
export default GenericChart;
