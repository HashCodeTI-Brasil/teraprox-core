import React from "react"
import { Dropdown, Badge } from "react-bootstrap"
import { FiBell } from "react-icons/fi"
import { NotificationItem, Notification } from "./NotificationItem"

export interface NotificationBellProps {
	/** Lista de notificações a serem exibidas no dropdown */
	notifications: Notification[]
	/** Callback quando uma notificação é lida */
	onItemRead: (n: Notification) => void
	/** Callback quando uma notificação é descartada */
	onItemDismiss: (n: Notification) => void
	/** Callback para 'Marcar todas como lidas' */
	onMarkAllRead?: () => void
	/** Tamanho do ícone do sino (padrão: 20) */
	size?: number
	/** Classe CSS para o container */
	className?: string
}

/**
 * Sino de notificações com contador de mensagens não lidas e dropdown de itens.
 */
export const NotificationBell: React.FC<NotificationBellProps> = ({
	notifications,
	onItemRead,
	onItemDismiss,
	onMarkAllRead,
	size = 20,
	className = ""
}) => {
	const unreadCount = notifications.filter(n => n.status === 'unread').length

	return (
		<Dropdown align="end" className={`notification-bell-dropdown ${className}`}>
			<Dropdown.Toggle as="div" className="position-relative cursor-pointer p-2">
				<FiBell size={size} />
				{unreadCount > 0 && (
					<Badge
						pill
						bg="danger"
						className="position-absolute"
						style={{ top: 0, right: 0, fontSize: '0.65rem' }}
					>
						{unreadCount > 99 ? '99+' : unreadCount}
					</Badge>
				)}
			</Dropdown.Toggle>

			<Dropdown.Menu 
				className="shadow-lg border-0" 
				style={{ width: '320px', padding: 0, maxHeight: '500px', overflowY: 'auto' }}
			>
				<div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
					<h6 className="mb-0 fw-bold">Notificações</h6>
					{unreadCount > 0 && onMarkAllRead && (
						<button 
							className="btn btn-link btn-sm p-0 text-decoration-none"
							onClick={(e) => {
								e.stopPropagation()
								onMarkAllRead()
							}}
						>
							Limpar tudo
						</button>
					)}
				</div>

				<div className="notification-list">
					{notifications.length > 0 ? (
						notifications
							.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
							.map((n) => (
								<NotificationItem
									key={n.id}
									notification={n}
									onRead={onItemRead}
									onDismiss={onItemDismiss}
								/>
							))
					) : (
						<div className="p-4 text-center text-muted">
							<FiBell size={24} className="mb-2 opacity-25" />
							<p className="mb-0 small">Nenhuma notificação por aqui.</p>
						</div>
					)}
				</div>

				{notifications.length > 0 && (
					<div className="p-2 border-top text-center bg-light">
						<small className="text-muted">Total: {notifications.length} notificações</small>
					</div>
				)}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default NotificationBell
