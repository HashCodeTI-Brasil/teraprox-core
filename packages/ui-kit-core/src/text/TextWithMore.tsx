// @hashcodeti/ui-kit-core/text/TextWithMore
//
// Componente apresentacional puro que trunca textos longos exibindo um botão
// inline para alternar entre versão truncada e expandida. Tailwind-only (sem
// react-bootstrap). Promovido de:
//   - teraprox-app-SGM-UTILS/src/Components/default-components/text/TextWithMore.js
//   - teraprox-ui-kit/src/text/TextWithMore.tsx (versão antiga react-bootstrap)
// na Wave G.1 (2026-05-15).
//
// API:
//   - text: texto exibido (default 'Carregando...')
//   - maxLength: tamanho máximo antes de truncar
//   - moreLabel / lessLabel: labels do botão (default 'ver mais' / 'ver menos')
//   - className: classes Tailwind extras no <span> de conteúdo
//
// Zero Redux. View-puro.

import * as React from 'react'
import { cn } from '../lib/cn'

export interface TextWithMoreProps {
  /** Texto a ser exibido */
  text?: string
  /** Comprimento máximo antes de truncar */
  maxLength: number
  /** Label para 'ver mais' (default: ver mais) */
  moreLabel?: string
  /** Label para 'ver menos' (default: ver menos) */
  lessLabel?: string
  /** Classes extras no span de conteúdo */
  className?: string
}

export const TextWithMore: React.FC<TextWithMoreProps> = ({
  text = 'Carregando...',
  maxLength,
  moreLabel = 'ver mais',
  lessLabel = 'ver menos',
  className,
}) => {
  const [expanded, setExpanded] = React.useState(false)

  const isTruncated = (text?.length ?? 0) > maxLength
  const displayText =
    isTruncated && !expanded ? `${text.slice(0, maxLength)}…` : text

  return (
    <>
      <span className={cn('text-with-more-content', className)}>{displayText}</span>
      {isTruncated && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            'ml-2 inline-flex items-center p-0 text-sm font-medium',
            'text-primary-600 hover:text-primary-700 hover:underline',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
            'bg-transparent border-0 cursor-pointer'
          )}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </>
  )
}

export default TextWithMore
