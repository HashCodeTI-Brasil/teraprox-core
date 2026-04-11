import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"

export interface DeleteConfirmProps {
	/** Controla visibilidade do modal */
	show: boolean
	/** Fecha o modal */
	onHide: (show: boolean) => void
	/** Callback chamado ao confirmar a exclusão */
	onConfirm: (details: string) => void
	/** Título do modal */
	title?: string
	/** Texto do corpo do modal (pode ser string ou função que recebe payload) */
	dialogText?: string | ((payload: any) => string)
	/** Dados extras para o dialogText */
	payload?: any
	/** Se true, exige um campo de 'Motivo' com pelo menos 8 caracteres */
	needExclusionDetails?: boolean
}

/**
 * Modal de confirmação de exclusão padronizado.
 */
export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
	show,
	onHide,
	onConfirm,
	title = "Confirmação de Exclusão",
	dialogText,
	payload,
	needExclusionDetails = false,
}) => {
	const [exclusionDetails, setExclusionDetails] = useState("")

	const getDialogContent = (): string => {
		if (typeof dialogText === "function" && payload) {
			return dialogText(payload)
		}
		return (dialogText as string) || "Você tem certeza que deseja excluir este item?"
	}

	const isConfirmEnabled = () => {
		if (!needExclusionDetails) return true
		return exclusionDetails.length >= 8
	}

	return (
		<Modal show={show} onHide={() => onHide(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex flex-column gap-3">
					<div>
						<strong>{getDialogContent()}</strong>
					</div>
					{needExclusionDetails && (
						<Form.Group>
							<Form.Label>Motivo da Exclusão (mín. 8 caracteres)</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={exclusionDetails}
								onChange={(e) => setExclusionDetails(e.target.value)}
								placeholder="Descreva o motivo..."
								autoFocus
							/>
						</Form.Group>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => onHide(false)}>
					Cancelar
				</Button>
				<Button
					variant="danger"
					disabled={!isConfirmEnabled()}
					onClick={() => {
						onConfirm(exclusionDetails)
						onHide(false)
					}}
				>
					Confirmar Exclusão
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
