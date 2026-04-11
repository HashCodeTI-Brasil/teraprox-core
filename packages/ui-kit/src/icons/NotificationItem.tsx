import React, { useState } from "react"
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FiClock, FiCheck, FiTrash2 } from "react-icons/fi"
import dayjs from "dayjs"
import "../styles/NotificationItem.css"

export interface Notification {
	id: string | number
	context?: string
	contextId?: string | number
	content?: string
	status: 'read' | 'unread'
	createdAt: string | number | Date
	readAt?: string | number | Date | null
}

export interface NotificationItemProps {
	/** Objeto da notificação */
	notification: Notification
	/** Callback ao clicar para ler/expandir */
	onRead: (notification: Notification) => void
	/** Callback para descartar/deletar a notificação */
	onDismiss: (notification: Notification) => void
	/** Tradução customizada para campos vazios */
	emptyContentLabel?: string
}

/**
 * Item individual de notificação com suporte a preview, modal de detalhes e ações rápidas.
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({
	notification,
	onRead,
	onDismiss,
	emptyContentLabel = "Sem conteúdo adicional disponível."
}) => {
	const [showModal, setShowModal] = useState(false)
	const { context, contextId, content, status, createdAt, readAt } = notification

	const handleOpenModal = (e: React.MouseEvent) => {
		e.stopPropagation()
		setShowModal(true)
	}

	const handleCloseModal = () => setShowModal(false)

	const handleReadAndClose = () => {
		onRead(notification)
		handleCloseModal()
	}

	const handleDismiss = (e: React.MouseEvent) => {
		e.stopPropagation()
		onDismiss(notification)
	}

	const displayTitle = contextId ? `${context} - ${contextId}` : context || "Notificação"

	return (
		<>
			<div
				className={`notification-item-modern ${status === 'unread' ? "unread" : ""}`}
				onClick={handleOpenModal}
			>
				{/* Indicador visual de lida/não lida */}
				<div className={`notification-status-indicator ${status}`}>
					{status === 'unread' ? <FiClock size={14} /> : <FiCheck size={14} />}
				</div>

				<div className="notification-main-content">
					<div className="notification-header-row">
						<div className="notification-title-modern">
							<span className="notification-context">{context}</span>
							{contextId && (
								<>
									<span className="notification-separator">/</span>
									<span className="notification-context-id">{contextId}</span>
								</>
							)}
						</div>
					</div>

					<div className="notification-preview">
						<p className="notification-content-preview">
							{content || "Nova mensagem recebida"}
						</p>
					</div>

					<div className="notification-meta">
						<div className="notification-timestamp">
							<FiClock size={12} className="me-1" />
							<small>{dayjs(createdAt).format("DD/MM/YYYY HH:mm")}</small>
						</div>
						{readAt && (
							<div className="notification-read-time">
								<FiCheck size={12} className="me-1" />
								<small>Lida em {dayjs(readAt).format("DD/MM HH:mm")}</small>
							</div>
						)}
					</div>
				</div>

				<div className="notification-quick-actions">
					{status === "unread" && (
						<OverlayTrigger 
							placement="top" 
							overlay={<Tooltip>Descartar</Tooltip>}
						>
							<button
								className="notification-action-btn notification-dismiss-btn"
								onClick={handleDismiss}
								aria-label="Descartar notificação"
							>
								<FiTrash2 size={14} />
							</button>
						</OverlayTrigger>
					)}
				</div>
			</div>

			{/* Modal de Detalhes */}
			<Modal 
				show={showModal} 
				onHide={handleCloseModal}
				centered
				className="notification-modal"
			>
				<Modal.Header closeButton className="notification-modal-header">
					<Modal.Title className="notification-modal-title">
						<div className="d-flex align-items-center">
							{status === 'unread' ? (
								<FiClock className="me-2 text-warning" />
							) : (
								<FiCheck className="me-2 text-success" />
							)}
							Detalhes da Notificação
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="notification-modal-body">
					<div className="notification-modal-content">
						<div className="notification-modal-meta">
							<h6 className="notification-modal-source">
								{displayTitle}
							</h6>
							<div className="notification-modal-timestamps">
								<small className="text-muted">
									<FiClock size={12} className="me-1" />
									Criada em {dayjs(createdAt).format("DD/MM/YYYY [às] HH:mm")}
								</small>
								{readAt && (
									<small className="text-muted ms-3">
										<FiCheck size={12} className="me-1" />
										Lida em {dayjs(readAt).format("DD/MM/YYYY [às] HH:mm")}
									</small>
								)}
							</div>
						</div>
						<div className="notification-modal-message">
							<p className="mb-0">{content || emptyContentLabel}</p>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className="notification-modal-footer">
					<Button variant="outline-secondary" onClick={handleCloseModal}>
						Fechar
					</Button>
					{status === "unread" && (
						<Button variant="primary" onClick={handleReadAndClose}>
							Marcar como lida
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default NotificationItem
