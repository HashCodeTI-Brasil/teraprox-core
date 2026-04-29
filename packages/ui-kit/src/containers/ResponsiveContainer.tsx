import React from 'react'
import { Modal, ModalBody } from 'react-bootstrap'

interface ResponsiveContainerProps {
  title?: string
  show: boolean
  setShow: (show: boolean) => void
  children: React.ReactNode
  onClose?: () => void
  scrollable?: boolean
}

/**
 * ResponsiveContainer Component
 *
 * Renders a Modal for displaying content in a responsive container.
 * Previously used GenericOffCanvas for mobile, now uses Modal consistently.
 *
 * @param title - The title of the modal.
 * @param show - Controls the visibility of the modal.
 * @param setShow - Function to update the visibility state.
 * @param children - Content to be rendered inside the modal.
 * @param onClose - Optional function to be executed on close.
 * @param scrollable - Optional prop to enable scrolling the content.
 */
const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  title,
  show,
  setShow,
  children,
  onClose,
  scrollable = false,
}) => {
  const handleClose = () => {
    setShow(false)
    if (onClose) onClose()
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose} scrollable={scrollable}>
      <Modal.Header closeButton onClick={handleClose}>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      <ModalBody>{children}</ModalBody>
    </Modal>
  )
}

export default ResponsiveContainer
