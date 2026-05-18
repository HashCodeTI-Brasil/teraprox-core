// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/AutorizacaoRejeicaoModal.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Modal de captura de motivo para rejeitar
// uma autorizacao. react-bootstrap zero — Modal/Button/TextField do ui-kit-core.
import * as React from 'react'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@hashcodeti/ui-kit-core'

export interface AutorizacaoRejeicaoModalProps {
  show: boolean
  onHide: () => void
  onConfirm: (motivo: string) => void
  loading?: boolean
}

export const AutorizacaoRejeicaoModal: React.FC<AutorizacaoRejeicaoModalProps> = ({
  show,
  onHide,
  onConfirm,
  loading,
}) => {
  const [motivo, setMotivo] = useState('')

  const handleConfirm = () => {
    if (!motivo.trim()) return
    onConfirm(motivo.trim())
    setMotivo('')
  }

  const handleHide = () => {
    setMotivo('')
    onHide()
  }

  return (
    <Modal open={show} onOpenChange={(o) => (o ? null : handleHide())}>
      <ModalHeader>Rejeitar Autorização</ModalHeader>
      <ModalBody>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Motivo da rejeição <span className="text-danger">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Descreva o motivo da rejeição..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2 rounded-md border border-neutral-300 text-sm focus:outline-none focus:border-primary-500 disabled:opacity-60"
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleHide} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          disabled={!motivo.trim() || loading}
        >
          {loading ? 'Rejeitando...' : 'Rejeitar'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AutorizacaoRejeicaoModal
