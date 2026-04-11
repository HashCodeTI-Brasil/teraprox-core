import React from "react"
import "../styles/StatusIndicator.css"

export interface StatusIndicatorProps {
	/** Status (pendente, executando, concluido, canceled, naoAtribuida) */
	status: string
	/** Quantidade/Contagem associada ao status */
	count?: number | string
	/** Classe CSS adicional para o container */
	containerClassName?: string
	/** Mapeamento customizado de labels de status */
	customLabels?: Record<string, string>
}

/**
 * Indicador de status tipo 'Flag' com destaque de cor e contagem.
 */
export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
	status,
	count,
	containerClassName = "",
	customLabels
}) => {
	const statusLabels: Record<string, string> = customLabels || {
		pendente: "PENDENTE",
		executando: "EXECUTANDO",
		concluido: "CONCLUÍDA",
		canceled: "CANCELADA",
		naoAtribuida: "NÃO ATRIBUIDA",
	}

	const label = statusLabels[status] || status.toUpperCase()

	return (
		<div className={`status-flag ${status} ${containerClassName}`}>
			<div className="status-label">{label}</div>
			<div className="status-count">{count}</div>
		</div>
	)
}

export default StatusIndicator
