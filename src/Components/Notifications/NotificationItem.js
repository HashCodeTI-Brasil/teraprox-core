import React, { useState } from "react"
import { OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap"
import { FiEye, FiTrash2, FiClock, FiCheck } from "react-icons/fi"
import dayjs from "dayjs"
import { GoUnread, GoRead } from "react-icons/go"
import "./NotificationItem.css"

const NotificationItem = ({ notification, onRead, onDismiss }) => {
    const { _id, id, deliveryId, content, status, createdAt, origin, readAt } = notification
    const { context = "Notificação", contextId = "", title } = origin || {}
    const displayTitle = title ?? `${context} - ${contextId}`
    const resolvedId = deliveryId ?? _id ?? id

    const [showModal, setShowModal] = useState(false)
    const [pendingRead, setPendingRead] = useState(false)

    const handleOpenModal = (e) => {
        e.stopPropagation()
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleReadAndClose = () => {
        setShowModal(false)
        if (status === "unread") {
            setPendingRead(true)
        }
    }

    const handleModalExited = () => {
        if (pendingRead) {
            onRead(resolvedId)
            setPendingRead(false)
        }
    }

    const handleDismiss = (e) => {
        e.stopPropagation()
        onDismiss(resolvedId)
    }

    return (
        <>
            <div
                className={`notification-item-modern ${status}`}
                onClick={handleOpenModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleOpenModal(e)
                    }
                }}
                aria-label={`Notificação: ${displayTitle}`}
            >
                <div className={`notification-status-indicator ${status}`}>
                    {status === 'unread' ? <FiClock size={12} /> : <FiCheck size={12} />}
                </div>

                <div className="notification-main-content">
                    <div className="notification-header-row">
                        <div className="notification-title-modern">
                            <strong className="notification-context">{displayTitle}</strong>
                        </div>
                        {status === 'unread' && (
                            <div className="notification-unread-badge" />
                        )}
                    </div>

                    <div className="notification-preview">
                        <p className="notification-content-preview">
                            {content && content.length > 80
                                ? `${content.substring(0, 80)}...`
                                : content || 'Clique para ver detalhes'}
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

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                onExited={handleModalExited}
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
                            <h6 className="notification-modal-source">{displayTitle}</h6>
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
                            <p className="mb-0">{content || 'Sem conteúdo adicional disponível.'}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="notification-modal-footer">
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Fechar</Button>
                    {status === "unread" && (
                        <Button variant="primary" onClick={handleReadAndClose}>Marcar como lida</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NotificationItem
