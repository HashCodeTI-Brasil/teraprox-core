// @ts-nocheck
// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/FluxoLegend.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Painel de legenda dos simbolos do
// fluxograma. Apresentacional puro; consome TIPO_CONFIG de FluxoNode.
import * as React from 'react'
import { TIPO_CONFIG } from './FluxoNode'

export interface FluxoLegendProps {
  className?: string
}

export const FluxoLegend: React.FC<FluxoLegendProps> = ({ className }) => (
  <div
    className={className}
    style={{
      padding: '8px 12px',
      background: '#fff',
      borderTop: '1px solid #dee2e6',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      fontSize: '0.75rem',
    }}
  >
    <span style={{ color: '#6c757d', fontWeight: 600, width: '100%' }}>LEGENDA:</span>
    {Object.entries(TIPO_CONFIG).map(([tipo, config]) => (
      <span
        key={tipo}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            background: config.cor,
            border: '1px solid #999',
            display: 'inline-block',
            borderRadius:
              (config.style?.borderRadius as string | undefined) ?? '2px',
          }}
        />
        {config.label}
      </span>
    ))}
  </div>
)

export default FluxoLegend
