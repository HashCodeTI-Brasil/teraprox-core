// @hashcodeti/ui-kit-core/buttons/UtilButtons
//
// Wave G.1 (2026-05-15) — promovido de teraprox-SGM-OS/Components/default-components/buttons/UtilButtons.js.
// Conjunto de botões utilitários (Save/CancelEdit/Delete). DeleteButton mantém modal de
// confirmação interno (mesmo comportamento do legado), apoiando-se nos primitivos Button + Modal
// do ui-kit-core. Apresentacionais puros (zero Redux).

import * as React from 'react'
import { Button, type ButtonProps } from '../primitives/Button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../primitives/Modal'

export interface SaveButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
  label?: string
  loading?: boolean
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  label = 'Salvar',
  loading,
  disabled,
  ...props
}) => (
  <Button variant="primary" size="sm" disabled={disabled || loading} {...props}>
    {label}
  </Button>
)

export interface CancelEditButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
  label?: string
  loading?: boolean
}

export const CancelEditButton: React.FC<CancelEditButtonProps> = ({
  label = 'Limpar',
  loading,
  ...props
}) => (
  <Button variant="outline-secondary" size="sm" disabled={loading} {...props}>
    {label}
  </Button>
)

export interface DeleteButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
  label?: string
  isVisible?: boolean
  needExclusionDetails?: boolean
  confirmMessage?: React.ReactNode
  onConfirm?: (details: string) => void
  loading?: boolean
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  label = 'Excluir',
  isVisible = true,
  needExclusionDetails = false,
  confirmMessage,
  onConfirm,
  loading,
  ...props
}) => {
  const [show, setShow] = React.useState(false)
  const [details, setDetails] = React.useState('')

  if (!isVisible) return null

  const handleConfirm = () => {
    setShow(false)
    onConfirm?.(details)
    setDetails('')
  }

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        disabled={loading}
        onClick={() => setShow(true)}
        {...props}
      >
        {label}
      </Button>
      <Modal open={show} onOpenChange={setShow}>
        <ModalHeader>{label}</ModalHeader>
        <ModalBody>
          {confirmMessage || <p className="m-0">Confirma a operação?</p>}
          {needExclusionDetails && (
            <textarea
              className="mt-2 w-full rounded border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              rows={3}
              placeholder="Motivo / Relatório Técnico"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
