import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import dayjs from "dayjs"

export interface SelectDateModalProps {
	/** Se o modal deve ser exibido */
	show: boolean
	/** Callback para fechar o modal */
	onClose: () => void
	/** Callback quando uma data é selecionada/confirmada */
	onSelect: (date: string) => void
	/** Título do modal (padrão: Selecionar Data) */
	title?: string
	/** Label do campo de data (padrão: Escolha a data) */
	label?: string
	/** Data inicial (padrão: agora) */
	initialDate?: string
	/** Permite datas futuras? */
	allowFuture?: boolean
}

/**
 * Modal simples para seleção de uma única data/hora.
 */
export const SelectDateModal: React.FC<SelectDateModalProps> = ({
	show,
	onClose,
	onSelect,
	title = "Selecionar Data",
	label = "Escolha a data",
	initialDate,
	allowFuture = true
}) => {
	const [selectedDate, setSelectedDate] = useState(
		initialDate || dayjs().format("YYYY-MM-DDTHH:mm")
	)

	const handleConfirm = () => {
		onSelect(selectedDate)
		onClose()
	}

	return (
		<Modal show={show} onHide={onClose} centered size="sm">
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<Form.Label>{label}</Form.Label>
					<Form.Control
						type="datetime-local"
						value={selectedDate}
						max={allowFuture ? undefined : dayjs().format("YYYY-MM-DDTHH:mm")}
						onChange={(e) => setSelectedDate(e.target.value)}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-secondary" onClick={onClose}>
					Cancelar
				</Button>
				<Button variant="primary" onClick={handleConfirm}>
					Confirmar
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default SelectDateModal
