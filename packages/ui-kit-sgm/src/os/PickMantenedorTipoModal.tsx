// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Accordion, Form } from 'react-bootstrap'
import { ManutentorCardCompact } from '../acao-manutentor/ManutentorCardCompact'
import type {
  IPickMantenedorTipoViewModel,
  PickMantenedorOption,
  PickTipoDeOrdemOption,
} from 'teraprox-core-sdk'

/**
 * PickMantenedorTipoModal — promovido do
 * teraprox-SGM-OS/Components/.../OsPlanejada/PickMantenedorModal.js.
 *
 * Componente apresentacional. Consome IPickMantenedorTipoViewModel
 * (Port do core-sdk). Zero Redux/createController internos.
 */

export interface PickMantenedorTipoModalProps {
  show: boolean
  onHide: () => void
  os: { id?: number | string; osMantenedor?: any[]; osTipos?: any[] } | null
  viewModel: IPickMantenedorTipoViewModel
  onAssigned?: (mantenedores: PickMantenedorOption[], tipo: PickTipoDeOrdemOption | null) => void
  onError?: (err: unknown) => void
}

export const PickMantenedorTipoModal: React.FC<PickMantenedorTipoModalProps> = ({
  show,
  onHide,
  os,
  viewModel,
  onAssigned,
  onError,
}) => {
  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([])
  const [selectedTipoId, setSelectedTipoId] = useState<string>('')

  const { mantenedores, tiposDeOrdem, loading, assigning } = viewModel

  const missingMaintainers = !os?.osMantenedor || os.osMantenedor.length === 0 || !os.osMantenedor.some((m: any) => m.active)
  const missingType = !os?.osTipos || os.osTipos.length === 0

  useEffect(() => {
    if (show) {
      viewModel.loadOptions()
      setSelectedIds([])
      setSelectedTipoId('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const toggleSelection = (id: number | string) => {
    if (assigning) return
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const isFormValid = (): boolean => {
    if (missingMaintainers && selectedIds.length === 0) return false
    if (missingType && !selectedTipoId) return false
    return true
  }

  const handleConfirm = async () => {
    if (assigning || !isFormValid() || !os?.id) return
    try {
      const selectedMantenedores = mantenedores.filter((m) => selectedIds.includes(m.id))
      if (missingMaintainers && selectedMantenedores.length > 0) {
        await viewModel.assignMantenedores(os.id, selectedMantenedores)
      }
      let assignedTipo: PickTipoDeOrdemOption | null = null
      if (missingType && selectedTipoId) {
        await viewModel.assignTipo(os.id, selectedTipoId)
        assignedTipo = tiposDeOrdem.find((t) => String(t.id) === String(selectedTipoId)) ?? null
      }
      onAssigned?.(selectedMantenedores, assignedTipo)
      onHide()
    } catch (err) {
      onError?.(err)
    }
  }

  const defaultActiveKeys: string[] = []
  if (missingType) defaultActiveKeys.push('tipo')
  if (missingMaintainers) defaultActiveKeys.push('mantenedores')

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable className="pick-mantenedor-tipo-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>
          <div className="fw-bold">Configuração da Ordem de Serviço</div>
          <div className="text-muted small">Preencha os requisitos pendentes para iniciar a OS #{os?.id}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        {loading ? (
          <div className="text-center p-5">
            <Spinner animation="border" variant="primary" />
            <div className="mt-2 text-muted">Carregando opções...</div>
          </div>
        ) : (
          <Accordion alwaysOpen defaultActiveKey={defaultActiveKeys}>
            {missingType && (
              <Accordion.Item eventKey="tipo" className="mb-3 border-0 shadow-sm rounded">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <span className="fw-bold">1. Selecionar Tipo de Ordem</span>
                    {!selectedTipoId && <span className="badge bg-warning text-dark ms-2">Obrigatório</span>}
                    {selectedTipoId && <span className="badge bg-success ms-2">Selecionado</span>}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <Form.Label className="text-muted small">Selecione o tipo que melhor descreve esta OS</Form.Label>
                    <Form.Select
                      value={selectedTipoId}
                      onChange={(e) => setSelectedTipoId(e.target.value)}
                      disabled={assigning}
                    >
                      <option value="">-- Selecione um tipo --</option>
                      {tiposDeOrdem.map((t) => (
                        <option key={t.id} value={t.id as string}>{t.tipo}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            )}

            {missingMaintainers && (
              <Accordion.Item eventKey="mantenedores" className="border-0 shadow-sm rounded">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <span className="fw-bold">{missingType ? '2.' : '1.'} Selecionar Executores</span>
                    {selectedIds.length === 0 && <span className="badge bg-warning text-dark ms-2">Obrigatório</span>}
                    {selectedIds.length > 0 && <span className="badge bg-success ms-2">{selectedIds.length} Selecionado(s)</span>}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="g-3">
                    {!Array.isArray(mantenedores) || mantenedores.length === 0 ? (
                      <Col xs={12} className="text-center py-5 text-muted">
                        Nenhum mantenedor encontrado.
                      </Col>
                    ) : (
                      mantenedores.map((m) => {
                        const isSelected = selectedIds.includes(m.id)
                        return (
                          <Col md={6} lg={4} key={m.id as React.Key}>
                            <div
                              onClick={() => toggleSelection(m.id)}
                              style={{
                                cursor: assigning ? 'not-allowed' : 'pointer',
                                opacity: assigning ? 0.7 : 1,
                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                transition: 'transform 0.2s',
                              }}
                            >
                              <div className={isSelected ? 'rounded-3 p-1 bg-primary bg-opacity-10 border border-primary' : ''}>
                                <ManutentorCardCompact mantenedor={m} />
                              </div>
                            </div>
                          </Col>
                        )
                      })
                    )}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="outline-secondary" onClick={onHide} disabled={assigning}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={assigning || !isFormValid()}
          className="px-4"
        >
          {assigning ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Salvando...
            </>
          ) : (
            'Confirmar'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PickMantenedorTipoModal
