// @ts-nocheck
import React, { useState, useRef } from "react"
import { Button, Form, ProgressBar } from "react-bootstrap"
import { FiSave, FiTrash2, FiRotateCcw, FiCopy, FiChevronLeft } from "react-icons/fi"
import { DeleteConfirm } from "../forms/DeleteConfirm"

export interface ActionButtonsProps {
	/** Botão Salvar */
	onSave?: () => void
	saveLabel?: string
	saveVariant?: string
	disabled?: boolean

	/** Botão Excluir */
	onDelete?: (details?: string) => void
	deleteLabel?: string
	deleteConfirmMsg?: string
	needExclusionDetails?: boolean

	/** Botão Voltar */
	onBack?: () => void
	backLabel?: string

	/** Botão Cancelar Edição */
	onCancelEdit?: () => void
	cancelEditLabel?: string

	/** Botão Copiar Form */
	onCopy?: () => void
	copyLabel?: string

	/** Meta-estado */
	isEditing?: boolean

	/** Configuração Especial: Deleção com Delay (Hold for 3s) */
	useDelayedDelete?: boolean
	delayedDeleteTimeout?: number // ms, default 3000

	/** Wrapper opcional para controle de permissões (ex: PermissionContainer) */
	PermissionWrapper?: React.ComponentType<{ children: React.ReactNode; id?: string }>
}

/**
 * Agrupamento de botões de ação (Salvar, Excluir, Voltar, etc) padronizado.
 * Agrega funcionalidade de confirmação de deleção e animação de 'hold-to-delete'.
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
	onSave,
	saveLabel = "Salvar",
	saveVariant = "primary",
	disabled = false,
	onDelete,
	deleteLabel = "Excluir",
	deleteConfirmMsg,
	needExclusionDetails = false,
	onBack,
	backLabel = "Voltar",
	onCancelEdit,
	cancelEditLabel = "Cancelar",
	onCopy,
	copyLabel = "Copiar Formulário",
	isEditing = false,
	useDelayedDelete = false,
	delayedDeleteTimeout = 3000,
	PermissionWrapper = ({ children }) => <>{children}</>,
}) => {
	const [showConfirm, setShowConfirm] = useState(false)
	const [isHolding, setIsHolding] = useState(false)
	const [progress, setProgress] = useState(0)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// ─── Lógica de Delete com Delay ───────────────────────────────────────────
	const startHold = () => {
		if (disabled || !onDelete) return
		setIsHolding(true)
		setProgress(0)

		const step = 2 // % a cada tick
		const tickTime = delayedDeleteTimeout / (100 / step)

		intervalRef.current = setInterval(() => {
			setProgress((prev) => (prev >= 100 ? 100 : prev + step))
		}, tickTime)

		timeoutRef.current = setTimeout(() => {
			stopHold()
			onDelete()
		}, delayedDeleteTimeout)
	}

	const stopHold = () => {
		setIsHolding(false)
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		if (intervalRef.current) clearInterval(intervalRef.current)
		setProgress(0)
	}

	const renderDeleteButton = () => {
		if (!onDelete || !isEditing) return null

		if (useDelayedDelete) {
			return (
				<div style={{ position: "relative", display: "inline-block", margin: 2 }}>
					<Button
						variant="outline-danger"
						onMouseDown={startHold}
						onMouseUp={stopHold}
						onMouseLeave={stopHold}
						onTouchStart={startHold}
						onTouchEnd={stopHold}
						disabled={disabled}
						style={{ minWidth: "120px" }}
					>
						<FiTrash2 className="me-2" />
						{isHolding ? "Segure..." : deleteLabel}
					</Button>
					{isHolding && (
						<ProgressBar
							now={progress}
							style={{
								position: "absolute",
								bottom: 0,
								left: 0,
								right: 0,
								height: "4px",
								borderRadius: "0 0 4px 4px",
							}}
							variant="danger"
						/>
					)}
				</div>
			)
		}

		return (
			<Button
				variant="danger"
				onClick={() => setShowConfirm(true)}
				disabled={disabled}
				style={{ margin: 2 }}
			>
				<FiTrash2 className="me-2" />
				{deleteLabel}
			</Button>
		)
	}

	return (
		<>
			<DeleteConfirm
				show={showConfirm}
				onHide={setShowConfirm}
				onConfirm={(details) => onDelete && onDelete(details)}
				dialogText={deleteConfirmMsg}
				needExclusionDetails={needExclusionDetails}
			/>

			<Form.Group className="d-flex flex-wrap align-items-center mt-3 gap-1">
				{onBack && (
					<Button variant="outline-secondary" onClick={onBack} disabled={disabled} style={{ margin: 2 }}>
						<FiChevronLeft className="me-2" />
						{backLabel}
					</Button>
				)}

				{isEditing && onCancelEdit && (
					<Button variant="warning" onClick={onCancelEdit} disabled={disabled} style={{ margin: 2 }}>
						<FiRotateCcw className="me-2" />
						{cancelEditLabel}
					</Button>
				)}

				<PermissionWrapper>
					{renderDeleteButton()}
				</PermissionWrapper>

				{onSave && (
					<Button variant={saveVariant} onClick={onSave} disabled={disabled} style={{ margin: 2 }}>
						<FiSave className="me-2" />
						{saveLabel}
					</Button>
				)}

				{isEditing && onCopy && (
					<Button variant="outline-primary" onClick={onCopy} disabled={disabled} style={{ margin: 2 }}>
						<FiCopy className="me-2" />
						{copyLabel}
					</Button>
				)}
			</Form.Group>
		</>
	)
}
