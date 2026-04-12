import React from "react";
export interface GenericREchartProps {
    /** Dados para o gráfico */
    data: any[];
    /** Configuração das linhas (Array de props para o componente <Line />) */
    lines: any[];
    /** Chave do objeto para o eixo X */
    xAxisKey?: string;
    /** Exibe o grid de fundo */
    showGrid?: boolean;
    /** Exibe a legenda */
    showLegend?: boolean;
    /** Exibe o tooltip */
    showTooltip?: boolean;
    /** Largura do container (padrão: 100%) */
    width?: string | number;
    /** Altura do container (padrão: 400) */
    height?: string | number;
    /** Oculta o eixo Y */
    hideYAxis?: boolean;
    /** Unidade para o eixo Y (ex: %) */
    unit?: string;
    /** Margens internas do gráfico */
    margin?: {
        top: number;
        right: number;
        left: number;
        bottom: number;
    };
    /** Range do eixo Y (padrão: [0, 'auto']) */
    YAxisRange?: [number | string, number | string];
}
/**
 * Wrapper performático para Recharts (LineChart) com ordenação automática de datas.
 */
export declare const GenericREchart: React.FC<GenericREchartProps>;
export default GenericREchart;
