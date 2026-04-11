import React, { useState } from "react"
import { Card, ListGroup } from "react-bootstrap"
import { FaChevronDown } from "react-icons/fa"
import "../styles/ExpandableCard.css"

export interface ExpandableCardItemObject {
	content: React.ReactNode
	label?: React.ReactNode
	clickable?: boolean
}

export type ExpandableCardItem = string | React.ReactNode | ExpandableCardItemObject

export interface ExpandableCardProps {
	/** Lista de itens a serem exibidos. Pode ser string, Nodo ou Objeto estruturado */
	items: ExpandableCardItem[]
	/** Quantidade inicial de itens visíveis (padrão: 3) */
	initialVisibleCount?: number
	/** Habilita a funcionalidade de expansão */
	expandable?: boolean
	/** Conteúdo para a lateral esquerda */
	leftSideContent?: React.ReactNode
	/** Conteúdo para a lateral direita */
	rightSideContent?: React.ReactNode
	/** Classe CSS para o Card */
	cardClassName?: string
	/** Classe CSS para o Body */
	cardBodyClassName?: string
	/** Estilo CSS para o Body */
	cardBodyStyle?: React.CSSProperties
	/** Detecta modo Mobile para layout empilhado */
	isMobile?: boolean
}

/**
 * Card expansível com suporte a listagem parcial de itens e conteúdos laterais.
 * Layout otimizado para visualização de densidade variável.
 */
export const ExpandableCard: React.FC<ExpandableCardProps> = ({
	items = [],
	initialVisibleCount = 3,
	expandable = true,
	leftSideContent,
	rightSideContent,
	cardClassName = "",
	cardBodyClassName = "",
	cardBodyStyle,
	isMobile = false
}) => {
	const [expandedCard, setExpandedCard] = useState(false)

	const handleToggleExpandCard = () => {
		setExpandedCard(!expandedCard)
	}

	const visibleItems = expandedCard ? items : items.slice(0, initialVisibleCount)
	const shouldShowExpandButton = expandable && items.length > initialVisibleCount

	const renderContentWithToggle = (content: React.ReactNode) => {
		// No original tinha lógica de texto longo aqui dentro, mas podemos abstrair.
		return content
	}

	return (
		<Card className={`expandable-card ${cardClassName}`}>
			{leftSideContent && (
				<div className="expandable-card-left-side">
					{leftSideContent}
				</div>
			)}

			<Card.Body className={`expandable-card-body ${cardBodyClassName}`} style={cardBodyStyle}>
				<ListGroup variant="flush">
					{visibleItems.map((item, index) => {
						const isObject = typeof item === "object" && item !== null && "content" in item
						const itemObj = isObject ? (item as ExpandableCardItemObject) : { content: item }

						const clickableClass = itemObj.clickable ? "expandable-card-list-item-clickable" : ""

						return (
							<ListGroup.Item
								key={index}
								className={`expandable-card-list-item ${clickableClass}`}
							>
								{isMobile ? (
									<div className="expandable-card-item">
										{itemObj.label && (
											<div className="expandable-card-item-header">
												<strong>{itemObj.label}</strong>
											</div>
										)}
										<div className="expandable-card-item-content">
											{renderContentWithToggle(itemObj.content)}
										</div>
									</div>
								) : (
									<div className="expandable-card-item-row">
										{itemObj.label && (
											<strong className="expandable-card-item-label">
												{itemObj.label}:
											</strong>
										)}
										<span className="expandable-card-item-content">
											{renderContentWithToggle(itemObj.content)}
										</span>
									</div>
								)}
							</ListGroup.Item>
						)
					})}

					{shouldShowExpandButton && (
						<ListGroup.Item
							className={`expandable-card-toggle ${expandedCard ? "expanded" : ""}`}
							onClick={handleToggleExpandCard}
						>
							<FaChevronDown className="expandable-card-toggle-icon" />
						</ListGroup.Item>
					)}
				</ListGroup>
			</Card.Body>

			{rightSideContent && (
				<div className="expandable-card-right-side">
					{rightSideContent}
				</div>
			)}
		</Card>
	)
}

export default ExpandableCard
