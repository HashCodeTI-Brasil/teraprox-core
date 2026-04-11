import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { CiMenuKebab } from "react-icons/ci"

/**
 * Representa um evento/ação no menu de 3 pontos.
 */
export class MenuEvent {
	label: string
	callback: () => void
	variant: string
	renderCondition: boolean | (() => boolean)
	section: string

	/**
	 * @param label - O texto que aparecerá no botão.
	 * @param callback - A função a ser chamada quando o botão for clicado.
	 * @param variant - A variante do botão (padrão: 'primary').
	 * @param renderCondition - Condição para renderizar o botão.
	 * @param section - A seção para organizar os botões (padrão: 'default').
	 */
	constructor(
		label: string,
		callback: () => void,
		variant: string = "primary",
		renderCondition: boolean | (() => boolean) = true,
		section: string = "default"
	) {
		this.label = label
		this.callback = callback
		this.variant = variant
		this.renderCondition = renderCondition
		this.section = section
	}
}

export interface Generic3DotMenuProps {
	/** Lista de eventos (opções) do menu */
	events: MenuEvent[]
	/** Título exibido no modal do menu */
	tittle?: string
}

/**
 * Menu de 3 pontos que abre um Modal com opções organizadas por seções.
 */
export const Generic3DotMenu: React.FC<Generic3DotMenuProps> = ({
	events,
	tittle = "Opções de Controle"
}) => {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const shouldRender = (event: MenuEvent) => {
		return typeof event.renderCondition === "function"
			? event.renderCondition()
			: event.renderCondition
	}

	// Agrupa os eventos por seção
	const groupedEvents = events.reduce((sections: Record<string, MenuEvent[]>, event) => {
		const section = event.section || "default"
		if (!sections[section]) {
			sections[section] = []
		}
		if (shouldRender(event)) {
			sections[section].push(event)
		}
		return sections
	}, {})

	return (
		<>
			<CiMenuKebab onClick={handleShow} style={{ cursor: "pointer" }} size={25} title={tittle} />

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>{tittle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{Object.keys(groupedEvents).length === 0 && (
						<div className="text-center text-muted">Nenhuma opção disponível.</div>
					)}
					{Object.keys(groupedEvents).map((section, sectionIndex) => (
						<div key={sectionIndex} className="mb-4">
							<h6 className="border-bottom pb-2 mb-3">
								{section !== "default" ? section : "Opções Principais"}
							</h6>
							<div className="d-grid gap-2">
								{groupedEvents[section].map((event, index) => (
									<Button
										key={index}
										variant={event.variant || "primary"}
										onClick={() => {
											event.callback()
											handleClose()
										}}
									>
										{event.label}
									</Button>
								))}
							</div>
						</div>
					))}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Fechar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Generic3DotMenu
