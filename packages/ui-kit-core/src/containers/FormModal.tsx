import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  type ModalSize,
} from '../primitives/Modal'
import { Button, type ButtonVariant } from '../primitives/Button'
import { Spinner } from '../primitives/Spinner'

/**
 * FormModal — base reutilizável para modais de formulário com ação primária.
 *
 * Slots: { title, icon, body (children), primaryAction, secondaryAction,
 * footerExtra, isValid, isLoading }. Substitui o padrão quebrado de
 * SwitchOnClick + GenericContextForm vazio + ResponsiveContainer sem footer.
 *
 * Wave 1 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 *
 * Refatorado em 2026-05-13 para Tailwind+Radix (ui-kit-core primitives).
 * API pública (FormModalProps) preservada — adapter interno mapeia
 * `show`→`open`, `closeOnBackdrop=false`→bloqueio de overlay/esc, e variantes
 * legadas de bootstrap (`outline-secondary`) para o novo Button.
 */

export interface FormModalPrimaryAction {
  label: string
  onClick: () => void | Promise<void>
  icon?: React.ReactNode
  /** Aceita variantes do Button novo (primary, danger, outline-*, etc.) */
  variant?: string
}

export interface FormModalSecondaryAction {
  label: string
  onClick: () => void
  /** Aceita variantes do Button novo (primary, danger, outline-*, etc.) */
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
  /**
   * @deprecated O Modal novo (Radix) gerencia scroll do body via overflow no
   * próprio ModalBody. Prop mantido para parity de assinatura — sem efeito.
   */
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
  // scrollable é tratado nativamente pelo ModalBody (overflow-y-auto)
  scrollable: _scrollable = true,
  footerExtra,
}) => {
  const modalSize: ModalSize = size
  const primaryVariant = (primaryAction.variant ?? 'primary') as ButtonVariant
  const secondaryVariant = (secondaryAction?.variant ??
    'outline-secondary') as ButtonVariant
  const primaryDisabled = !isValid || isLoading

  // Adapter show→open: só dispara onClose quando passa de open=true → false.
  const handleOpenChange = (next: boolean) => {
    if (!next) onClose()
  }

  return (
    <Modal
      open={show}
      onOpenChange={
        closeOnBackdrop
          ? handleOpenChange
          : (next) => {
              // Bloqueia fechamento por overlay/ESC quando backdrop="static"
              if (next) handleOpenChange(next)
            }
      }
      size={modalSize}
    >
      <ModalHeader>
        {icon ? <span className="mr-2 inline-flex">{icon}</span> : null}
        {title}
      </ModalHeader>

      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        {footerExtra ? <div className="mr-auto">{footerExtra}</div> : null}

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
          leftIcon={
            isLoading ? <Spinner size="sm" variant="border" /> : primaryAction.icon
          }
        >
          {primaryAction.label}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default FormModal
