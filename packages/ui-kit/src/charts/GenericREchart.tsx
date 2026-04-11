import React from "react"
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts"
import dayjs from "dayjs"

export interface GenericREchartProps {
	/** Dados para o gráfico */
	data: any[]
	/** Configuração das linhas (Array de props para o componente <Line />) */
	lines: any[]
	/** Chave do objeto para o eixo X */
	xAxisKey?: string
	/** Exibe o grid de fundo */
	showGrid?: boolean
	/** Exibe a legenda */
	showLegend?: boolean
	/** Exibe o tooltip */
	showTooltip?: boolean
	/** Largura do container (padrão: 100%) */
	width?: string | number
	/** Altura do container (padrão: 400) */
	height?: string | number
	/** Oculta o eixo Y */
	hideYAxis?: boolean
	/** Unidade para o eixo Y (ex: %) */
	unit?: string
	/** Margens internas do gráfico */
	margin?: { top: number; right: number; left: number; bottom: number }
	/** Range do eixo Y (padrão: [0, 'auto']) */
	YAxisRange?: [number | string, number | string]
}

/**
 * Wrapper performático para Recharts (LineChart) com ordenação automática de datas.
 */
export const GenericREchart: React.FC<GenericREchartProps> = ({
	data = [],
	lines = [],
	xAxisKey = "data",
	showGrid = true,
	showLegend = true,
	showTooltip = true,
	width = "100%",
	height = 400,
	hideYAxis,
	unit,
	margin = { top: 20, right: 30, left: 20, bottom: 5 },
	YAxisRange = [0, "auto"],
}) => {
	// Ordena os dados pela data em ordem crescente
	const sortedData = [...data].sort(
		(a, b) => new Date(a[xAxisKey]).getTime() - new Date(b[xAxisKey]).getTime()
	)

	return (
		<div style={{ width, height }}>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={sortedData} margin={margin}>
					{showGrid && <CartesianGrid strokeDasharray="3 3" />}

					<XAxis
						dataKey={xAxisKey}
						reversed={false}
						tickFormatter={(tick) => dayjs(tick).format("DD/MM/YY HH:mm")}
					/>

					<YAxis domain={YAxisRange} unit={unit} hide={hideYAxis} type="number" />
					
					{showTooltip && (
						<Tooltip
							labelFormatter={(label) => dayjs(label).format("DD/MM/YY HH:mm")}
						/>
					)}
					
					{showLegend && <Legend />}
					
					{lines.map((lineCfg, idx) => (
						<Line key={idx} {...lineCfg} />
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default GenericREchart
