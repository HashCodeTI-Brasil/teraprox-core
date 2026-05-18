// @hashcodeti/ui-kit-core/layout/GridContainer
//
// Wave G.1 (2026-05-15) — promovido de teraprox-SGM-OS/Components/default-components/containers/GridContainer.js.
// Container apresentacional puro (zero Redux/router). Renderiza children inline OU lista
// de items (cada item recebe slot `component`). Tailwind grid responsivo por default;
// caller pode customizar via `className` / `style`.

import * as React from 'react'
import { cn } from '../lib/cn'

export interface GridContainerItem {
  component: React.ReactNode
  key?: React.Key
}

export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array de items renderizados como células do grid (cada item.component em sua célula). */
  items?: GridContainerItem[]
  /** Filhos renderizados quando `items` não é fornecido. */
  children?: React.ReactNode
  /** Estilo inline (compat com legado). Prefira `className` Tailwind. */
  containerStyle?: React.CSSProperties
  /** className adicional. */
  className?: string
}

/**
 * GridContainer — wrapper grid responsivo.
 *
 * @example
 * <GridContainer items={[{ component: <Card /> }, { component: <Card /> }]} />
 *
 * @example
 * <GridContainer className="grid-cols-3 gap-4"><div>A</div><div>B</div></GridContainer>
 */
export const GridContainer = React.forwardRef<HTMLDivElement, GridContainerProps>(
  ({ items, children, containerStyle, className, style, ...props }, ref) => {
    const baseClass = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
    const merged = cn(baseClass, className)
    const mergedStyle = { ...containerStyle, ...style }

    if (items?.length) {
      return (
        <div ref={ref} className={merged} style={mergedStyle} {...props}>
          {items.map((item, i) => (
            <div key={item.key ?? i}>{item.component}</div>
          ))}
        </div>
      )
    }
    return (
      <div ref={ref} className={merged} style={mergedStyle} {...props}>
        {children}
      </div>
    )
  },
)
GridContainer.displayName = 'GridContainer'
