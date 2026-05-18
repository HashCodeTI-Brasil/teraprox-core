// @ts-nocheck
import React from 'react'
import { BsCheckCircle, BsClock, BsPlayCircle, BsPerson } from 'react-icons/bs'

/**
 * OrdemStatusIndicator — Wave G.1 promotion (de teraprox-SGM-OM/Components/OrdemStatusIndicator.js).
 *
 * Badge visual + ícone color-aware do status atual de uma Ordem de
 * Manutenção. Componente puramente apresentacional, props-driven.
 *
 * `getStatusColor` deve retornar um hex (ex: #f59e0b) — usamos inline
 * style em vez de classes utilitárias para preservar contraste exato
 * vindo da palette do consumer.
 */

export type OrdemStatus = 'PENDENTE' | 'EXECUTANDO' | 'CONCLUIDO' | 'CANCELADO' | string

export interface OrdemStatusIndicatorProps {
  status: OrdemStatus
  getStatusColor: (status: OrdemStatus) => string
  getStatusText: (status: OrdemStatus) => string
  className?: string
}

export const OrdemStatusIndicator = React.forwardRef<
  HTMLDivElement,
  OrdemStatusIndicatorProps
>(({ status, getStatusColor, getStatusText, className }, ref) => {
  const color = getStatusColor(status)

  const renderIcon = () => {
    const iconStyle = { color, width: 32, height: 32 }
    switch (status) {
      case 'PENDENTE':   return <BsClock style={iconStyle} />
      case 'EXECUTANDO': return <BsPlayCircle style={iconStyle} />
      case 'CONCLUIDO':  return <BsCheckCircle style={iconStyle} />
      case 'CANCELADO':  return <BsPerson style={iconStyle} />
      default:           return null
    }
  }

  return (
    <div ref={ref} className={className}>
      <div className="mb-3">
        <div
          className="mx-auto mb-3 flex items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}1A`, width: 64, height: 64 }}
        >
          {renderIcon()}
        </div>
      </div>

      <h4 className="mb-2 text-surface-foreground text-xl font-semibold">Status Atual</h4>
      <span
        className="inline-block rounded-full px-4 py-2 text-base font-bold uppercase text-white"
        style={{ backgroundColor: color }}
      >
        {getStatusText(status)}
      </span>
    </div>
  )
})

OrdemStatusIndicator.displayName = 'OrdemStatusIndicator'

export default OrdemStatusIndicator
