// @ts-nocheck
import React from 'react'
import { Card } from 'react-bootstrap'

/**
 * ManutentorCardCompact (ui-kit-sgm)
 * 
 * Versão simplificada e moderna do card de mantenedor, focada em 
 * nome e disponibilidade para uso em modais de seleção rápida.
 */

export interface ManutentorCardCompactProps {
  mantenedor: any
  onClick?: () => void
}

export const ManutentorCardCompact: React.FC<ManutentorCardCompactProps> = ({
  mantenedor,
  onClick,
}) => {
  const isBusy = mantenedor._busy
  const statusColor = isBusy ? '#ef4444' : '#10b981'

  return (
    <Card 
      className="border rounded-3 h-100 transition-all shadow-sm-hover" 
      onClick={onClick}
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        borderColor: '#e2e8f0',
        backgroundColor: '#ffffff',
        transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
           <h6 className="mb-0 fw-bold text-dark text-truncate" style={{ fontSize: '0.9rem' }}>
              {mantenedor?.nomeUsuario}
           </h6>
           <span className="text-muted" style={{ fontSize: '0.7rem' }}>
              ID: {mantenedor.id}
           </span>
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <div 
            style={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              background: statusColor,
              boxShadow: isBusy ? `0 0 4px ${statusColor}` : 'none'
            }} 
          />
          <span className="fw-medium" style={{ fontSize: '0.75rem', color: isBusy ? '#ef4444' : '#10b981' }}>
            {isBusy ? `Ocupado (OS-${mantenedor.osId || '?'})` : 'Disponível'}
          </span>
        </div>

        {mantenedor.setor && (
          <div className="mt-2 pt-2 border-top text-muted" style={{ fontSize: '0.7rem', opacity: 0.8 }}>
            {mantenedor.setor}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default ManutentorCardCompact
