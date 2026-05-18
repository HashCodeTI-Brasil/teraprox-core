// @ts-nocheck
// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/FluxoToolbar.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Toolbar lateral com tiles draggable que
// criam novos nós quando soltos no FluxoCanvas. Apresentacional puro.
import * as React from 'react'
import { TIPO_CONFIG, type FluxoTipoConfigKey } from './FluxoNode'

const TIPOS = Object.keys(TIPO_CONFIG) as FluxoTipoConfigKey[]

export interface FluxoToolbarProps {
  className?: string
}

export const FluxoToolbar: React.FC<FluxoToolbarProps> = ({ className }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, tipo: string) => {
    event.dataTransfer.setData('application/reactflow-tipo', tipo)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px 8px',
        background: '#f8f9fa',
        borderRight: '1px solid #dee2e6',
        minWidth: '110px',
        overflowY: 'auto',
      }}
    >
      <div
        style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '4px', fontWeight: 600 }}
      >
        FORMAS
      </div>
      {TIPOS.map((tipo) => {
        const config = TIPO_CONFIG[tipo]
        return (
          <div
            key={tipo}
            draggable
            onDragStart={(e) => onDragStart(e, tipo)}
            title={`Arrastar: ${config.label}`}
            style={{
              padding: '6px 8px',
              background: config.cor,
              color: config.textColor,
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'grab',
              fontSize: '0.75rem',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            {config.label}
          </div>
        )
      })}
    </div>
  )
}

export default FluxoToolbar
