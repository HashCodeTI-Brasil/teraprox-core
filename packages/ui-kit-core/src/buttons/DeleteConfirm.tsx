/**
 * DeleteConfirm — @teraprox/ui-kit-core
 *
 * Modal de confirmação de exclusão padronizado, props-driven (zero Redux).
 * Promovido de teraprox-ui-kit/forms/DeleteConfirm para ui-kit-core em 2026-04-30
 * como dependência interna do FormActionButtons.
 */
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

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

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-3">
          <strong>{resolveDialog()}</strong>
          {needExclusionDetails && (
            <Form.Group>
              <Form.Label>Motivo da Exclusão (mín. {minDetailsLength} caracteres)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Descreva o motivo..."
                autoFocus
              />
            </Form.Group>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Cancelar
        </Button>
        <Button variant="danger" disabled={!canConfirm} onClick={handleConfirm}>
          Confirmar Exclusão
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
