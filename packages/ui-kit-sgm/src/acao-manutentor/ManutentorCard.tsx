// @ts-nocheck
import React from 'react'
import { Button, Card, CardBody, CardFooter } from '@hashcodeti/ui-kit-core'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { GrLineChart } from 'react-icons/gr'
import { MetricasDisplay } from './MetricasDisplay'

/**
 * ManutentorCard (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Componente 100% presentacional. Exibe card de um mantenedor com
 * métricas, status (executando/pendente/concluído) e ação de detalhe.
 * Sem Redux/CoreService — todo IO via callbacks.
 *
 * Wave F.1.A: react-bootstrap (Button, Card, Col) -> ui-kit-core
 * Button + Card/CardBody/CardFooter. `Col` (grid placeholder) virou
 * `<div>` simples — caller é responsável pelo grid externo.
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

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'executing':
        return '#10b981' // emerald-500
      case 'pending':
        return '#f59e0b' // amber-500
      case 'concluded':
        return '#94a3b8' // slate-400
      case 'busy':
        return '#ef4444' // red-500
      case 'available':
        return '#10b981' // emerald-500
      default:
        return '#cbd5e1'
    }
  }

  const handleStatusClick = (ordens: any[]) => {
    onStatusClick && onStatusClick(ordens)
  }

  return (
    <div key={mantenedor.id}>
      <Card variant="elevated" className="mantenedor-card border-0 overflow-hidden">
        <CardBody className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="mantenedor-info flex-grow">
              <h6
                className="mb-0 font-bold text-neutral-900"
                style={{ fontSize: '0.95rem' }}
              >
                {mantenedor?.nomeUsuario}
              </h6>
              <div className="text-neutral-500" style={{ fontSize: '0.75rem' }}>
                ID: {mantenedor.id} {mantenedor.setor && `· ${mantenedor.setor}`}
              </div>
            </div>
            {loadMetrics && (
              <Button
                variant="link"
                size="sm"
                className="p-0 text-neutral-500"
                onClick={() => loadMetrics(mantenedor)}
                title="Ver Métricas"
              >
                <GrLineChart size={16} />
              </Button>
            )}
          </div>

          <div className="status-list flex gap-2 mb-3">
            {mantenedor.executing?.length > 0 && (
              <div
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-50 text-success border border-success/20"
                style={{ cursor: 'pointer', fontSize: '0.7rem' }}
                onClick={() => handleStatusClick(mantenedor.executing!)}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: getStatusColor('executing'),
                  }}
                />
                {mantenedor.executing.length} Ex.
              </div>
            )}
            {mantenedor.pending?.length > 0 && (
              <div
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-50 text-warning border border-warning/20"
                style={{ cursor: 'pointer', fontSize: '0.7rem' }}
                onClick={() => handleStatusClick(mantenedor.pending!)}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: getStatusColor('pending'),
                  }}
                />
                {mantenedor.pending.length} Pend.
              </div>
            )}
          </div>

          {showBusyStatus && (
            <div className="mt-auto pt-2 border-t border-surface-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: getStatusColor(mantenedor._busy ? 'busy' : 'available'),
                      boxShadow: mantenedor._busy ? '0 0 4px #ef4444' : 'none',
                    }}
                  />
                  <span
                    className="font-semibold"
                    style={{
                      fontSize: '0.8rem',
                      color: mantenedor._busy ? '#ef4444' : '#10b981',
                    }}
                  >
                    {mantenedor._busy
                      ? `Ocupado (OS-${mantenedor.osId})`
                      : 'Disponível'}
                  </span>
                </div>
                {mantenedor._busy && viewDetailsCallback && (
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-brand-primary"
                    onClick={() => viewDetailsCallback({ ...mantenedor, index })}
                  >
                    <FaArrowRightToBracket size={14} />
                  </Button>
                )}
              </div>
            </div>
          )}

          {onRemoveCallback && (
            <div className="mt-2 text-right">
              <span
                onClick={() => onRemoveCallback({ ...mantenedor, index })}
                className="text-error underline"
                style={{ fontSize: '0.7rem', cursor: 'pointer' }}
              >
                remover
              </span>
            </div>
          )}
        </CardBody>

        {hasMetrics && (
          <CardFooter className="bg-neutral-50 border-0 p-2">
            <MetricasDisplay
              metricas={mantenedor.metricas.horas || '-'}
              wrenchTime={mantenedor.metricas.wrenchTime || '-'}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default ManutentorCard
