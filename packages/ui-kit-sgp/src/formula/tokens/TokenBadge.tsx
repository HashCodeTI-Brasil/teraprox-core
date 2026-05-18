// @ts-nocheck
// Wave H.6 (2026-05-15) — sub-componente do FormulaEditor.
// Badge visual de um token (chip colorido + icone). Usado na paleta e tambem
// como base do SegmentChip / TokenDragItem.
import { ReactNode } from 'react'
import { getTokenStyle } from './tokenStyles'

export interface TokenBadgeProps {
  /** chave do estilo (campoDeVerificacao, controle, ...). */
  styleKey?: string
  /** rotulo curto exibido. */
  text: string
  /** Substitui o icone padrao do estilo. */
  iconOverride?: ReactNode
  /** Eventos drag/click sao injetados pelo wrapper externo. */
  draggable?: boolean
  onDragStart?: (e: React.DragEvent<HTMLButtonElement>) => void
  onDragEnd?: (e: React.DragEvent<HTMLButtonElement>) => void
  onClick?: () => void
  /** Estilo de cursor: 'grab' (paleta) | 'pointer'. */
  cursor?: 'grab' | 'pointer'
}

export const TokenBadge = ({
  styleKey,
  text,
  iconOverride,
  draggable,
  onDragStart,
  onDragEnd,
  onClick,
  cursor = 'grab',
}: TokenBadgeProps) => {
  const s = getTokenStyle(styleKey)
  return (
    <button
      type="button"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 6,
        color: '#fff',
        fontSize: '0.78rem',
        fontWeight: 600,
        cursor,
        padding: '4px 12px',
      }}
      className="inline-flex items-center gap-1.5"
    >
      {iconOverride ?? s.icon} {text}
    </button>
  )
}

export default TokenBadge
