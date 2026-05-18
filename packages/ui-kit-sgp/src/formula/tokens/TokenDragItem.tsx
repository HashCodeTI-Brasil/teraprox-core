// @ts-nocheck
// Wave H.6 (2026-05-15) — sub-componente do FormulaEditor.
// Chip visual de um segmento da formula (token | operador | numero).
// Suporta drag interno (reordenacao) e botao de delete on-hover.
import { useState, ReactNode } from 'react'
import { FiX } from 'react-icons/fi'
import { getTokenStyle } from './tokenStyles'

export type FormulaSegmentType = 'token' | 'operator' | 'number'

export interface FormulaSegment {
  type: FormulaSegmentType
  value: string
  /** populado apenas quando type === 'token'. */
  token?: { name?: string; label?: string; value?: any }
  start?: number
  end?: number
}

export interface TokenDragItemProps {
  seg: FormulaSegment
  idx: number
  onDragStart: (e: React.DragEvent<HTMLDivElement>, idx: number) => void
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void
  onDelete: (idx: number) => void
}

export const TokenDragItem = ({ seg, idx, onDragStart, onDragEnd, onDelete }: TokenDragItemProps) => {
  const [hovered, setHovered] = useState(false)
  const style = seg.type === 'token' ? getTokenStyle(seg.token?.label) : null
  const bg =
    seg.type === 'token'
      ? style!.bg
      : seg.type === 'operator'
      ? '#f3f4f6'
      : '#1f2937'
  const color = seg.type === 'token' || seg.type === 'number' ? '#fff' : '#374151'
  const border =
    seg.type === 'token'
      ? style!.border
      : seg.type === 'operator'
      ? '#d1d5db'
      : '#111'

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, idx)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center relative select-none"
      style={{
        cursor: 'grab',
        borderRadius: 6,
        margin: '2px 1px',
        height: 30,
        padding: '0 10px',
        fontSize: '0.82rem',
        fontWeight: 600,
        background: bg,
        color,
        border: `1.5px solid ${border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,.12)',
        transition: 'opacity .1s',
      }}
    >
      {seg.type === 'token' && (
        <span style={{ marginRight: 5, opacity: 0.85 }} className="flex items-center">
          {style!.icon}
        </span>
      )}
      <span className="truncate" style={{ maxWidth: 100 }}>
        {seg.type === 'token' ? seg.token?.name ?? seg.value : seg.value}
      </span>
      {hovered && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            onDelete(idx)
          }}
          className="flex items-center justify-center cursor-pointer"
          style={{
            position: 'absolute',
            top: -7,
            right: -7,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#ef4444',
            color: '#fff',
            fontSize: 9,
            border: '2px solid #fff',
            boxShadow: '0 1px 4px rgba(0,0,0,.25)',
            zIndex: 10,
          }}
        >
          <FiX size={9} />
        </div>
      )}
    </div>
  )
}

export default TokenDragItem
