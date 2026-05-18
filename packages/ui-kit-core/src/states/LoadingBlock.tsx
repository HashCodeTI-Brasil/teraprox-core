// @hashcodeti/ui-kit-core/states/LoadingBlock
//
// Wave G.1 (2026-05-15) — promovido de teraprox-SGM-OS/Components/manutencao/Consumo/LoadingBlock.js.
// Skeleton placeholder genérico Tailwind (3 barras cinza com pulse animation).
// Apresentacional puro; aria-busy/aria-live para a11y. Substitui o legado CSS
// `.loading-block / .skeleton` (não migra estilos extras — usa pure Tailwind).

import * as React from 'react'
import { cn } from '../lib/cn'

export interface LoadingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Quantidade de linhas-skeleton renderizadas (default 3). */
  lines?: number
  /** className adicional aplicado ao wrapper. */
  className?: string
}

/**
 * LoadingBlock — bloco skeleton com várias linhas pulsantes.
 *
 * @example
 * <LoadingBlock />
 *
 * @example
 * <LoadingBlock lines={5} className="max-w-md" />
 */
export const LoadingBlock = React.forwardRef<HTMLDivElement, LoadingBlockProps>(
  ({ lines = 3, className, ...props }, ref) => {
    const sizes = ['w-3/4', 'w-full', 'w-5/6', 'w-2/3', 'w-11/12']
    return (
      <div
        ref={ref}
        aria-busy="true"
        aria-live="polite"
        className={cn('flex flex-col gap-2 w-full', className)}
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-3 rounded bg-neutral-200 animate-pulse',
              sizes[i % sizes.length],
            )}
          />
        ))}
      </div>
    )
  },
)
LoadingBlock.displayName = 'LoadingBlock'
