// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react'
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
 * Modos de uso:
 *  - **Single OS**: passar prop `os` (legacy SGM-OS). Modal exibe e
 *    atribui apenas para essa OS.
 *  - **Multi OS**: passar prop `osList` (>1 item). Modal exibe lista de
 *    OS com checkboxes (default todas selecionadas) e usa rotas bulk
 *    do core-sdk: PUT updateTipoBulk + POST atribuirMantenedorBulk.
 *
 * Em modo multi, missingMaintainers/missingType são derivados das OS
 * selecionadas (true se ALGUMA OS marcada está faltando o campo).
 */

export interface PickMantenedorTipoModalProps {
  show: boolean
  onHide: () => void
  /** Modo single-OS (legacy SGM-OS). Ignorado se `osList` é fornecido. */
  os?: { id?: number | string; osMantenedor?: any[]; osTipos?: any[] } | null
  /** Modo multi-OS — lista de OS a configurar em batch */
  osList?: Array<{ id?: number | string; osMantenedor?: any[]; osTipos?: any[]; recurso?: { nome?: string }; descricaoDoProblema?: string }> | null
  viewModel: IPickMantenedorTipoViewModel
  onAssigned?: (mantenedores: PickMantenedorOption[], tipo: PickTipoDeOrdemOption | null, osIds: Array<number | string>) => void
  onError?: (err: unknown) => void
}

const isMissingMaintainers = (os: any): boolean =>
  !os?.osMantenedor || os.osMantenedor.length === 0 || !os.osMantenedor.some((m: any) => m.active)

const isMissingType = (os: any): boolean =>
  !os?.osTipos || os.osTipos.length === 0

export const PickMantenedorTipoModal: React.FC<PickMantenedorTipoModalProps> = ({
  show,
  onHide,
  os,
  osList,
  viewModel,
  onAssigned,
  onError,
}) => {
  const isMulti = Array.isArray(osList) && osList.length > 0
  const targetList = useMemo(
    () => (isMulti ? (osList as any[]) : os ? [os] : []),
    [isMulti, osList, os],
  )

  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([])
  const [selectedTipoId, setSelectedTipoId] = useState<string>('')
  const [selectedOsIds, setSelectedOsIds] = useState<Array<number | string>>([])

  const { mantenedores, tiposDeOrdem, loading, assigning } = viewModel

  // OS selecionadas (no modo single, sempre a única)
  const selectedOs = useMemo(
    () => targetList.filter((o: any) => isMulti ? selectedOsIds.includes(o.id) : true),
    [targetList, selectedOsIds, isMulti],
  )

  const missingMaintainers = useMemo(
    () => selectedOs.some((o: any) => isMissingMaintainers(o)),
    [selectedOs],
  )
  const missingType = useMemo(
    () => selectedOs.some((o: any) => isMissingType(o)),
    [selectedOs],
  )

  useEffect(() => {
    if (show) {
      viewModel.loadOptions()
      setSelectedIds([])
      setSelectedTipoId('')
      // No modo multi, default = todas as OS marcadas
      setSelectedOsIds(isMulti ? targetList.map((o: any) => o.id) : [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const toggleMantenedor = (id: number | string) => {
    if (assigning) return
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleOs = (osId: number | string) => {
    if (assigning) return
    setSelectedOsIds((prev) =>
      prev.includes(osId) ? prev.filter((i) => i !== osId) : [...prev, osId]
    )
  }

  const isFormValid = (): boolean => {
    if (isMulti && selectedOsIds.length === 0) return false
    if (missingMaintainers && selectedIds.length === 0) return false
    if (missingType && !selectedTipoId) return false
    if (!missingMaintainers && !missingType) return false
    return true
  }

  const handleConfirm = async () => {
    if (assigning || !isFormValid()) return
    try {
      const selectedMantenedores = mantenedores.filter((m) => selectedIds.includes(m.id))
      let assignedTipo: PickTipoDeOrdemOption | null = null

      if (isMulti) {
        const osIds = selectedOsIds
        if (missingMaintainers && selectedMantenedores.length > 0) {
          await viewModel.assignMantenedoresMultiOs(osIds, selectedMantenedores)
        }
        if (missingType && selectedTipoId) {
          await viewModel.assignTipoMultiOs(osIds, selectedTipoId)
          assignedTipo = tiposDeOrdem.find((t) => String(t.id) === String(selectedTipoId)) ?? null
        }
        onAssigned?.(selectedMantenedores, assignedTipo, osIds)
      } else {
        const singleId = os?.id
        if (!singleId) return
        if (missingMaintainers && selectedMantenedores.length > 0) {
          await viewModel.assignMantenedores(singleId, selectedMantenedores)
        }
        if (missingType && selectedTipoId) {
          await viewModel.assignTipo(singleId, selectedTipoId)
          assignedTipo = tiposDeOrdem.find((t) => String(t.id) === String(selectedTipoId)) ?? null
        }
        onAssigned?.(selectedMantenedores, assignedTipo, [singleId])
      }
      onHide()
    } catch (err) {
      onError?.(err)
    }
  }

  const defaultActiveKeys: string[] = []
  if (isMulti) defaultActiveKeys.push('os')
  if (missingType) defaultActiveKeys.push('tipo')
  if (missingMaintainers) defaultActiveKeys.push('mantenedores')

  const headerSubtitle = isMulti
    ? `Configure mantenedor e tipo em batch para as OS selecionadas (${selectedOsIds.length}/${targetList.length})`
    : `Preencha os requisitos pendentes para iniciar a OS #${os?.id}`

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable className="pick-mantenedor-tipo-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>
          <div className="fw-bold">Configuração da Ordem de Serviço</div>
          <div className="text-muted small">{headerSubtitle}</div>
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
            {isMulti && (
              <Accordion.Item eventKey="os" className="mb-3 border-0 shadow-sm rounded">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <span className="fw-bold">Aplicar a quais OS?</span>
                    <span className="badge bg-info ms-2">{selectedOsIds.length} de {targetList.length}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex justify-content-end mb-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      disabled={assigning}
                      onClick={() => setSelectedOsIds(targetList.map((o: any) => o.id))}
                    >
                      Marcar todas
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      disabled={assigning}
                      onClick={() => setSelectedOsIds([])}
                    >
                      Desmarcar todas
                    </Button>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {targetList.map((o: any) => {
                      const checked = selectedOsIds.includes(o.id)
                      const recursoNome = o.recurso?.nome ?? ''
                      const desc = (o.descricaoDoProblema ?? '').slice(0, 80)
                      const tagMissing = []
                      if (isMissingMaintainers(o)) tagMissing.push('Sem executor')
                      if (isMissingType(o)) tagMissing.push('Sem tipo')
                      return (
                        <Form.Check
                          key={o.id}
                          type="checkbox"
                          id={`pmt-os-${o.id}`}
                          checked={checked}
                          disabled={assigning}
                          onChange={() => toggleOs(o.id)}
                          label={
                            <span>
                              <strong>OS #{o.id}</strong>
                              {recursoNome && <span className="text-muted ms-2">{recursoNome}</span>}
                              {desc && <span className="text-muted ms-2">— {desc}</span>}
                              {tagMissing.length > 0 && (
                                <span className="badge bg-warning text-dark ms-2">{tagMissing.join(' · ')}</span>
                              )}
                            </span>
                          }
                        />
                      )
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            )}

            {missingType && (
              <Accordion.Item eventKey="tipo" className="mb-3 border-0 shadow-sm rounded">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <span className="fw-bold">{isMulti ? '2.' : '1.'} Selecionar Tipo de Ordem</span>
                    {!selectedTipoId && <span className="badge bg-warning text-dark ms-2">Obrigatório</span>}
                    {selectedTipoId && <span className="badge bg-success ms-2">Selecionado</span>}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <Form.Label className="text-muted small">Tipo aplicado a {isMulti ? 'todas as OS marcadas' : 'esta OS'}</Form.Label>
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
                    <span className="fw-bold">{isMulti ? '3.' : missingType ? '2.' : '1.'} Selecionar Executores</span>
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
                              onClick={() => toggleMantenedor(m.id)}
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
