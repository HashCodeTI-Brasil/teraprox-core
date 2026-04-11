import React from "react"
import { IconLabelItem } from "./IconLabelItem"
import "../styles/IconLabelList.css"

export interface IconLabelListItem {
	/** Ícone para o item */
	icon: React.ReactNode
	/** Label para o item */
	label: React.ReactNode
	/** Callback de clique opcional para este item específico */
	onClick?: () => void
}

export interface IconLabelListProps {
	/** Lista de itens a serem exibidos */
	items: IconLabelListItem[]
	/** Classe CSS adicional para o container da lista */
	className?: string
}

/**
 * Lista horizontal de ícones com labels.
 */
export const IconLabelList: React.FC<IconLabelListProps> = ({ items, className = "" }) => {
	return (
		<div className={`icon-label-list ${className}`}>
			{items.map((item, index) => (
				<IconLabelItem
					key={index}
					labelClassName="icon-label"
					containerClassName="icon-label-item"
					icon={item.icon}
					label={item.label}
					onClick={item.onClick}
				/>
			))}
		</div>
	)
}

export default IconLabelList
