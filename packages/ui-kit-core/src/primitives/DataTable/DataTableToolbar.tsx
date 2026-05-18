// @hashcodeti/ui-kit-core/primitives/DataTable/DataTableToolbar
//
// Slot helper opcional. Caller pode usar diretamente como `toolbar={<DataTableToolbar>…</DataTableToolbar>}`
// para herdar espaçamento/alinhamento consistente, ou ignorar e passar qualquer ReactNode.

import * as React from 'react'
import { cn } from '../../lib/cn'

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Slot alinhado à esquerda (geralmente SearchBar/filtros). */
  start?: React.ReactNode
  /** Slot alinhado à direita (geralmente botões de ação). */
  end?: React.ReactNode
}

/**
 * DataTableToolbar — slot helper opcional para layouts toolbar acima da tabela.
 *
 * @example
 * <DataTableToolbar
 *   start={<SearchBar value={q} onChange={setQ} />}
 *   end={<Button>Exportar</Button>}
 * />
 */
export const DataTableToolbar = React.forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ className, start, end, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between gap-3 px-3 py-2 flex-wrap',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1 min-w-[200px]">{start}</div>
      {children}
      {end && <div className="flex items-center gap-2">{end}</div>}
    </div>
  ),
)
DataTableToolbar.displayName = 'DataTableToolbar'
