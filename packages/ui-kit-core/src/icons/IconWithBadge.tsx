import React from 'react'
import { Badge } from 'react-bootstrap'

/**
 * IconWithBadge — ícone com badge numérico opcional (ex.: contagem de itens).
 *
 * Promovido de `teraprox-SGM-OS/Components/default-components/icons/IconWithBadge.tsx`
 * para `@teraprox/ui-kit-core` na sprint 2026-04-29 (tarefa-item-unified, Phase 2).
 * Cross-domain (SGM/SGP) e apresentacional puro — zero Redux, zero IO.
 *
 * Modos:
 *  - `overlay` (default): badge sobreposto no canto superior direito do ícone
 *  - `inline`: ícone + badge lado-a-lado, com gap
 */
export type IconWithBadgeMode = 'overlay' | 'inline'
export type IconWithBadgeBg =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

export interface IconWithBadgeProps {
  /** Conteúdo do ícone (tipicamente um <FaXxx /> de react-icons) */
  icon: React.ReactNode
  /** Conteúdo do badge. Se for falsy/0, o badge não é renderizado. */
  content?: React.ReactNode
  /** `overlay` (default) ou `inline` */
  mode?: IconWithBadgeMode
  /** Variant Bootstrap (default `danger`) */
  bg?: IconWithBadgeBg
}

export const IconWithBadge: React.FC<IconWithBadgeProps> = ({
  icon,
  content,
  mode = 'overlay',
  bg = 'danger',
}) => {
  const showBadge = content !== null && content !== undefined && content !== 0 && content !== ''

  if (mode === 'inline') {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {icon}
        {showBadge ? (
          <Badge
            bg={bg}
            pill
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '2px 6px',
              minWidth: '18px',
              lineHeight: 1.2,
              opacity: 0.9,
            }}
          >
            {content}
          </Badge>
        ) : null}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {icon}
      <Badge
        bg={bg}
        style={{
          position: 'absolute',
          top: '-5px',
          right: '-10px',
          padding: '5px',
          borderRadius: '50%',
          minWidth: '20px',
          minHeight: '20px',
          fontSize: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          display: showBadge ? 'flex' : 'none',
        }}
      >
        {content}
      </Badge>
    </div>
  )
}

export default IconWithBadge
