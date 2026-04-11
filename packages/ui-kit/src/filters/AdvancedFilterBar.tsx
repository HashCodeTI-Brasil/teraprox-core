import React, { useState } from "react"
import { Collapse, Button } from "react-bootstrap"
import { FiFilter, FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi"
import "../styles/AdvancedFilterBar.css"

export interface AdvancedFilterBarProps {
	/** Conteúdo dos filtros (grid de filtros) */
	children: React.ReactNode
	/** Título da barra (padrão: Filtros) */
	title?: string
	/** Quantidade de filtros ativos para exibir no badge */
	activeFiltersCount?: number
	/** Callback para limpar todos os filtros */
	onClearAll?: () => void
	/** Se deve iniciar expandido (padrão: false) */
	defaultExpanded?: boolean
	/** Classe CSS adicional */
	className?: string
}

/**
 * Container colapsável para filtros complexos.
 * Organiza filtros em um grid limpo e fornece ações de clearing.
 */
export const AdvancedFilterBar: React.FC<AdvancedFilterBarProps> = ({
	children,
	title = "Filtros e Busca",
	activeFiltersCount = 0,
	onClearAll,
	defaultExpanded = false,
	className = ""
}) => {
	const [expanded, setExpanded] = useState(defaultExpanded)

	return (
		<div className={`advanced-filter-bar ${className}`}>
			<div 
				className="filter-bar-header" 
				onClick={() => setExpanded(!expanded)}
			>
				<div className="filter-title-group">
					<FiFilter className="text-primary" />
					<h5 className="filter-title">{title}</h5>
					{activeFiltersCount > 0 && (
						<span className="filter-count-badge">
							{activeFiltersCount} ativos
						</span>
					)}
				</div>
				<div className="filter-chevron">
					{expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
				</div>
			</div>

			<Collapse in={expanded}>
				<div>
					<div className="filter-bar-content">
						<div className="filter-grid">
							{children}
						</div>

						{(onClearAll || activeFiltersCount > 0) && (
							<div className="filter-actions">
								{onClearAll && (
									<Button 
										variant="link" 
										className="text-danger text-decoration-none btn-sm d-flex align-items-center"
										onClick={(e) => {
											e.stopPropagation()
											onClearAll()
										}}
									>
										<FiTrash2 className="me-1" />
										Limpar Filtros
									</Button>
								)}
								<Button 
									variant="primary" 
									size="sm"
									onClick={() => setExpanded(false)}
								>
									Aplicar Filtros
								</Button>
							</div>
						)}
					</div>
				</div>
			</Collapse>
		</div>
	)
}

export default AdvancedFilterBar
