import React from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

/**
 * FormModal — base reutilizável para modais de formulário com ação primária.
 *
 * Slots: { title, icon, body (children), primaryAction, secondaryAction,
 * footerExtra, isValid, isLoading }. Substitui o padrão quebrado de
 * SwitchOnClick + GenericContextForm vazio + ResponsiveContainer sem footer.
 *
 * Wave 1 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */

export interface FormModalPrimaryAction {
  label: string
  onClick: () => void | Promise<void>
  icon?: React.ReactNode
  variant?: string
}

export interface FormModalSecondaryAction {
  label: string
  onClick: () => void
  variant?: string
}

export interface FormModalProps {
  show: boolean
  onClose: () => void
  title: string
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  primaryAction: FormModalPrimaryAction
  secondaryAction?: FormModalSecondaryAction
  isValid?: boolean
  isLoading?: boolean
  closeOnBackdrop?: boolean
  scrollable?: boolean
  footerExtra?: React.ReactNode
}

export const FormModal: React.FC<FormModalProps> = ({
  show,
  onClose,
  title,
  icon,
  size = 'md',
  children,
  primaryAction,
  secondaryAction,
  isValid = true,
  isLoading = false,
  closeOnBackdrop = true,
  scrollable = true,
  footerExtra,
}) => {
  const modalSize = size === 'md' ? undefined : size
  const primaryVariant = primaryAction.variant ?? 'primary'
  const secondaryVariant = secondaryAction?.variant ?? 'outline-secondary'
  const primaryDisabled = !isValid || isLoading

  return (
    <Modal
      show={show}
      onHide={onClose}
      size={modalSize}
      backdrop={closeOnBackdrop ? true : 'static'}
      scrollable={scrollable}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {icon ? <span style={{ marginRight: '0.5rem' }}>{icon}</span> : null}
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        {footerExtra ? <div className="me-auto">{footerExtra}</div> : null}

        {secondaryAction ? (
          <Button
            variant={secondaryVariant}
            onClick={secondaryAction.onClick}
            disabled={isLoading}
          >
            {secondaryAction.label}
          </Button>
        ) : null}

        <Button
          variant={primaryVariant}
          onClick={primaryAction.onClick}
          disabled={primaryDisabled}
        >
          {isLoading ? (
            <Spinner size="sm" animation="border" className="me-2" />
          ) : (
            primaryAction.icon
          )}
          {primaryAction.label}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FormModal
