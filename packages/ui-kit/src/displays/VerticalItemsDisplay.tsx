import React from "react"

export interface VerticalItemsDisplayProps {
	/** Conteúdo do primeiro item vertical */
	item1?: React.ReactNode
	/** Conteúdo do segundo item vertical */
	item2?: React.ReactNode
	/** Conteúdo do terceiro item vertical */
	item3?: React.ReactNode
	/** Classe CSS adicional */
	className?: string
	/** Estilo CSS customizado */
	style?: React.CSSProperties
}

/**
 * Exibidor simples de até 3 itens empilhados verticalmente.
 */
export const VerticalItemsDisplay: React.FC<VerticalItemsDisplayProps> = ({
	item1 = "",
	item2 = "",
	item3 = "",
	className = "",
	style
}) => {
	return (
		<div className={className} style={style}>
			<div>{item1}</div>
			<div>{item2}</div>
			<div>{item3}</div>
		</div>
	)
}

export default VerticalItemsDisplay
