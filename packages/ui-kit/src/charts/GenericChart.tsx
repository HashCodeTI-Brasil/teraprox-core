import React from "react"
import { Chart } from "react-google-charts"

export interface GenericChartProps {
	chartType: any // Tipagem de 'react-google-charts'
	graphID: string
	width?: string
	height?: string
	columns: any[]
	rows: any[][]
	chartEvents?: any[]
	options?: Record<string, any>
	/** Callback opcional para customizar os tooltips */
	tooltipFormatter?: (row: any[]) => string
}

/**
 * Wrapper para Google Charts com suporte a tooltips HTML customizados.
 */
export const GenericChart: React.FC<GenericChartProps> = ({
	chartType,
	graphID,
	width = "100%",
	height = "400px",
	columns,
	rows,
	chartEvents,
	options,
	tooltipFormatter,
}) => {
	let datachart = [columns, ...rows]

	if (tooltipFormatter) {
		datachart = datachart.map((row, index) => {
			if (index === 0) return row
			const formattedTooltip = tooltipFormatter(row)
			return [...row, formattedTooltip]
		})

		datachart[0] = [...columns, { type: "string", role: "tooltip", p: { html: true } }]
	}

	return (
		<Chart
			chartType={chartType}
			options={{ ...options, tooltip: { isHtml: true } }}
			data={datachart}
			graphID={graphID}
			width={width}
			height={height}
			chartEvents={chartEvents}
		/>
	)
}

export default GenericChart
