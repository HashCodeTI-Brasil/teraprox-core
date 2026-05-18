/**
 * DeleteConfirm — @hashcodeti/ui-kit-core
 *
 * Modal de confirmação de exclusão padronizado, props-driven (zero Redux).
 * Promovido de teraprox-ui-kit/forms/DeleteConfirm para ui-kit-core em 2026-04-30
 * como dependência interna do FormActionButtons.
 *
 * Refatorado em 2026-05-13 para Tailwind+Radix (ui-kit-core primitives).
 * API pública (DeleteConfirmProps) preservada — adapter interno mapeia
 * `show`→`open` do Modal novo. Usa TextField (multiline) em vez de Form.Control.
 */
import React, { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../primitives/Modal'
import { Button } from '../primitives/Button'
import { TextField } from '../primitives/TextField'

export interface DeleteConfirmProps {
  show: boolean
  onHide: (show: boolean) => void
  onConfirm: (details: string) => void
  title?: string
  dialogText?: string | ((payload: unknown) => string)
  payload?: unknown
  needExclusionDetails?: boolean
  minDetailsLength?: number
}

export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  show,
  onHide,
  onConfirm,
  title = 'Confirmação de Exclusão',
  dialogText,
  payload,
  needExclusionDetails = false,
  minDetailsLength = 8,
}) => {
  const [details, setDetails] = useState('')

  const resolveDialog = (): string => {
    if (typeof dialogText === 'function') return dialogText(payload)
    return dialogText ?? 'Você tem certeza que deseja excluir este item?'
  }

  const canConfirm = !needExclusionDetails || details.length >= minDetailsLength

  const handleConfirm = () => {
    onConfirm(details)
    setDetails('')
    onHide(false)
  }

  const handleHide = () => {
    setDetails('')
    onHide(false)
  }

  // Adapter show→open: só dispara onHide quando passa de open=true → false.
  const handleOpenChange = (next: boolean) => {
    if (!next) handleHide()
  }

  return (
    <Modal open={show} onOpenChange={handleOpenChange} size="md">
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <strong>{resolveDialog()}</strong>
          {needExclusionDetails && (
            <TextField
              label={`Motivo da Exclusão (mín. ${minDetailsLength} caracteres)`}
              multiline
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Descreva o motivo..."
              autoFocus
            />
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleHide}>
          Cancelar
        </Button>
        <Button variant="danger" disabled={!canConfirm} onClick={handleConfirm}>
          Confirmar Exclusão
        </Button>
      </ModalFooter>
    </Modal>
  )
}
