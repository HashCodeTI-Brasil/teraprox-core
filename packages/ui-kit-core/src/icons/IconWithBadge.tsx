import React from 'react'

import { Badge, type BadgeTone } from '../primitives/Badge'

/**
 * IconWithBadge — ícone com badge numérico opcional (ex.: contagem de itens).
 *
 * Promovido de `teraprox-SGM-OS/Components/default-components/icons/IconWithBadge.tsx`
 * para `@hashcodeti/ui-kit-core` na sprint 2026-04-29 (tarefa-item-unified, Phase 2).
 * Cross-domain (SGM/SGP) e apresentacional puro — zero Redux, zero IO.
 *
 * Modos:
 *  - `overlay` (default): badge sobreposto no canto superior direito do ícone
 *  - `inline`: ícone + badge lado-a-lado, com gap
 *
 * Refatorado 2026-05-13: migrado de react-bootstrap `<Badge>` para o primitivo
 * `Badge` Tailwind+cva do próprio ui-kit-core. API pública intacta — `bg`
 * mantido (mapeia 1:1 para `tone` do Badge novo, com shim deprecation interno).
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
  /** Tom do badge (compat react-bootstrap, default `danger`) */
  bg?: IconWithBadgeBg
}

export const IconWithBadge: React.FC<IconWithBadgeProps> = ({
  icon,
  content,
  mode = 'overlay',
  bg = 'danger',
}) => {
  const showBadge = content !== null && content !== undefined && content !== 0 && content !== ''
  const tone = bg as BadgeTone

  if (mode === 'inline') {
    return (
      <div className="inline-flex items-center gap-1.5">
        {icon}
        {showBadge ? (
          <Badge
            tone={tone}
            pill
            size="sm"
            className="opacity-90 font-semibold"
          >
            {content}
          </Badge>
        ) : null}
      </div>
    )
  }

  return (
    <div className="relative inline-block">
      {icon}
      <Badge
        tone={tone}
        pill
        size="sm"
        className="absolute -top-1.5 -right-2.5 min-w-[20px] min-h-[20px] px-1"
        style={{ display: showBadge ? 'inline-flex' : 'none' }}
      >
        {content}
      </Badge>
    </div>
  )
}

export default IconWithBadge
