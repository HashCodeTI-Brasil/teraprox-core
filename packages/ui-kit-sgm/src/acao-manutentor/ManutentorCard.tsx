// @ts-nocheck
import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { GrLineChart } from 'react-icons/gr'
import { MetricasDisplay } from './MetricasDisplay'

/**
 * ManutentorCard (ui-kit-sgm) — Wave 2C migration.
 *
 * Componente 100% presentacional. Exibe card de um mantenedor com
 * métricas, status (executando/pendente/concluído) e ação de detalhe.
 * Sem Redux/CoreService — todo IO via callbacks.
 */

export interface MantenedorVM {
  id?: string | number
  nomeUsuario?: string
  metricas?: any
  turno?: { nome?: string }
  executing?: any[]
  pending?: any[]
  concluded?: any[]
  _busy?: boolean
  osId?: string | number
  [key: string]: any
}

export interface ManutentorCardProps {
  mantenedor: MantenedorVM
  index?: number
  viewDetailsCallback?: (m: MantenedorVM & { index?: number }) => void
  onRemoveCallback?: (m: MantenedorVM & { index?: number }) => void
  showBusyStatus?: boolean
  onStatusClick?: (ordens: any[]) => void
  loadMetrics?: ((m: MantenedorVM) => void) | null
}

export const ManutentorCard: React.FC<ManutentorCardProps> = ({
  mantenedor,
  index,
  viewDetailsCallback,
  onRemoveCallback,
  showBusyStatus = true,
  onStatusClick,
  loadMetrics = null,
}) => {
  const hasMetrics = mantenedor.metricas
  const statusIndicator = (color: string) => ({
    backgroundColor: color,
    borderRadius: '50%',
    width: '12px',
    height: '12px',
    marginRight: '10px',
  })

  const handleStatusClick = (ordens: any[]) => {
    onStatusClick && onStatusClick(ordens)
  }

  return (
    <Col key={mantenedor.id}>
      <Card className="mantenedor-card">
        <Card.Body className="d-flex align-items-center">
          <div className="mantenedor-info">
            <Card.Title
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {mantenedor?.nomeUsuario}
              {loadMetrics && (
                <GrLineChart
                  className="zoom-container"
                  title="Ver Metricas"
                  onClick={() => loadMetrics(mantenedor)}
                  size={20}
                />
              )}
            </Card.Title>
            <Card.Text>ID: {mantenedor.id}</Card.Text>
            {hasMetrics && <Card.Text>{mantenedor.turno?.nome}</Card.Text>}

            <div className="status-list">
              {mantenedor.executing && (
                <div
                  className="clickable-status d-flex align-items-center mb-2"
                  onClick={() => handleStatusClick(mantenedor.executing!)}
                >
                  <div
                    className="status-indicator"
                    style={statusIndicator('green')}
                  />
                  <span className="status-text">
                    Executando: {mantenedor.executing.length}
                  </span>
                </div>
              )}
              {mantenedor.pending && (
                <div
                  className="clickable-status d-flex align-items-center mb-2"
                  onClick={() => handleStatusClick(mantenedor.pending!)}
                >
                  <div
                    className="status-indicator"
                    style={statusIndicator('#ffc107')}
                  />
                  <span className="status-text">
                    Pendentes: {mantenedor.pending.length}
                  </span>
                </div>
              )}
              {mantenedor.concluded && (
                <div
                  className="clickable-status d-flex align-items-center mb-2"
                  onClick={() => handleStatusClick(mantenedor.concluded!)}
                >
                  <div
                    className="status-indicator"
                    style={statusIndicator('#ccc')}
                  />
                  <span className="status-text">
                    Concluídas: {mantenedor.concluded.length}
                  </span>
                </div>
              )}
            </div>

            {showBusyStatus && (
              <div className="d-flex align-items-center status-container">
                <div
                  className="status-indicator"
                  style={statusIndicator(mantenedor._busy ? 'red' : 'green')}
                />

                {mantenedor._busy ? (
                  <>
                    <span className="status-text">{`Alocado em OS-${mantenedor.osId}`}</span>
                    <Button
                      variant="link"
                      className="navigate-button"
                      onClick={() =>
                        viewDetailsCallback &&
                        viewDetailsCallback({ ...mantenedor, index })
                      }
                    >
                      <FaArrowRightToBracket size={20} />
                    </Button>
                  </>
                ) : (
                  <span className="status-text">Disponível</span>
                )}
              </div>
            )}
            {onRemoveCallback && (
              <div
                onClick={() => onRemoveCallback({ ...mantenedor, index })}
                className="remove-text"
              >
                remover
              </div>
            )}
          </div>
        </Card.Body>

        <Card.Footer>
          <MetricasDisplay
            metricas={hasMetrics ? mantenedor.metricas.horas : '-'}
            wrenchTime={hasMetrics ? mantenedor.metricas.wrenchTime : '-'}
          />
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default ManutentorCard
