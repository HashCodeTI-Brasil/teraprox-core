import React, { useEffect, useRef, useState } from "react"
import { Dropdown, Badge, Button, Nav, Modal, Offcanvas } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNotifications } from "../../hooks/useNotifications"
import { FaBell, FaArrowLeft } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import NotificationItem from "./NotificationItem"
import "./NotificationBell.css"

const NotificationBell = ({ socket, className = "", shouldClose = false }) => {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("unread")
    const [animate, setAnimate] = useState(false)
    const [isMobileView, setIsMobileView] = useState(false)
    const userId = useSelector((state) => state.global?.userId)
    const {
        unreadNotifications,
        archivedNotifications,
        unreadCount,
        handleMarkAsRead,
        handleDismiss,
        handleMarkAllAsRead,
        loadArchivedNotifications,
        loadInitialNotifications,
    } = useNotifications(socket)
    const prevUnreadCount = useRef(unreadCount)

    useEffect(() => {
        if (!userId) return
        loadInitialNotifications(userId)
    }, [userId, loadInitialNotifications])

    useEffect(() => {
        const checkMobile = () => setIsMobileView(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (unreadCount > prevUnreadCount.current) {
            setAnimate(true)
            const timeout = setTimeout(() => setAnimate(false), 3000)
            return () => clearTimeout(timeout)
        }
        prevUnreadCount.current = unreadCount
    }, [unreadCount])

    const renderNotificationContent = () => (
        <>
            <div className="notification-tabs-container">
                <Nav variant="pills" activeKey={activeTab} onSelect={(key) => {
                    setActiveTab(key)
                    if (key === "archived") loadArchivedNotifications()
                }} className="notification-nav-pills" fill>
                    <Nav.Item>
                        <Nav.Link eventKey="unread" className="notification-nav-pill">
                            <span>Novas</span>
                            {unreadCount > 0 && <Badge bg="danger" className="ms-2">{unreadCount}</Badge>}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="archived" className="notification-nav-pill">Lidas</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <div className="notification-content-area">
                {activeTab === "unread" && (
                    <>
                        <div className="notification-header">
                            <div className="notification-header-content">
                                <h6 className="notification-title">Notificações</h6>
                                {unreadNotifications.length > 0 && (
                                    <Button variant="link" size="sm" onClick={handleMarkAllAsRead} className="mark-all-button">
                                        Marcar todas como lidas
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="notification-list">
                            {unreadNotifications.length === 0 ? (
                                <div className="notification-empty">Nenhuma notificação nova</div>
                            ) : (
                                unreadNotifications.map((n) => (
                                    <NotificationItem key={n.id || n._id} notification={n} onRead={handleMarkAsRead} onDismiss={handleDismiss} />
                                ))
                            )}
                        </div>
                    </>
                )}
                {activeTab === "archived" && (
                    <div className="notification-list">
                        {archivedNotifications?.read?.length === 0 ? (
                            <div className="notification-empty">Nenhuma notificação arquivada</div>
                        ) : (
                            archivedNotifications?.read?.map((n) => (
                                <NotificationItem key={n.id || n._id} notification={n} onRead={handleMarkAsRead} onDismiss={handleDismiss} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    )

    if (isMobileView) {
        return (
            <>
                <button type="button" className={`notification-bell-mobile ${className}`} onClick={() => setOpen(!open)}>
                    <FaBell className={animate ? 'shake-animation' : ''} />
                    {unreadCount > 0 && <Badge bg="danger" className="notification-badge-mobile">{unreadCount}</Badge>}
                </button>
                <Offcanvas show={open} onHide={() => setOpen(false)} placement="end">
                    <Offcanvas.Header closeButton>Notificações</Offcanvas.Header>
                    <Offcanvas.Body>{renderNotificationContent()}</Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }

    return (
        <Dropdown className={`notification-bell ${className}`} show={open} onToggle={(next) => setOpen(next)}>
            <Dropdown.Toggle variant="link" className="nav-link p-0 d-flex align-items-center">
                <FaBell className={animate ? 'shake-animation' : ''} size={18} />
                {unreadCount > 0 && <Badge bg="danger" className="notification-badge">{unreadCount}</Badge>}
            </Dropdown.Toggle>
            <Dropdown.Menu className="notification-menu-desktop" align="end" style={{ width: '350px' }}>
                {renderNotificationContent()}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default NotificationBell
