// @hashcodeti/ui-kit-core/primitives/DataTable/DataTableRow
//
// Linha da tabela (memoizada). Extraída para evitar re-render de todas as rows
// quando `data` muda mas a maioria das rows é estável (1000-row stories).

import * as React from 'react'
import { cn } from '../../lib/cn'
import { Checkbox } from '../Checkbox/Checkbox'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../DropdownMenu/DropdownMenu'
import type {
  DataTableColumn,
  DataTableRowAction,
  DataTableSize,
} from './DataTable.types'

// Tabela de paddings por size — espelha SIZE_METRICS do SearchBar.
const CELL_PAD_BY_SIZE: Record<DataTableSize, string> = {
  sm: 'py-1 px-2 text-xs',
  md: 'py-2 px-3 text-sm',
  lg: 'py-3 px-4 text-sm',
}

const STICKY_BG = 'bg-surface-background'

function resolveAccessor<TRow>(col: DataTableColumn<TRow>, row: TRow): React.ReactNode {
  if (col.accessor === undefined) return null
  if (typeof col.accessor === 'function') {
    const v = col.accessor(row)
    return v as React.ReactNode
  }
  const v = (row as Record<string, unknown>)[col.accessor as string]
  return v as React.ReactNode
}

function alignClass(align?: 'left' | 'center' | 'right'): string {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

function stickyClass(sticky?: 'left' | 'right'): string {
  if (sticky === 'left') return cn('sticky left-0 z-[1]', STICKY_BG)
  if (sticky === 'right') return cn('sticky right-0 z-[1]', STICKY_BG)
  return ''
}

function widthStyle(col: DataTableColumn<unknown>): React.CSSProperties {
  const s: React.CSSProperties = {}
  if (col.width !== undefined)
    s.width = typeof col.width === 'number' ? `${col.width}px` : col.width
  if (col.minWidth !== undefined)
    s.minWidth = typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
  return s
}

// ─── Icon: kebab vertical (3 dots) ────────────────────────────────────────

const KebabIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    className={cn('h-4 w-4', className)}
  >
    <circle cx="8" cy="3" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="8" cy="13" r="1.5" />
  </svg>
)

// ─── DataTableRow ─────────────────────────────────────────────────────────

export interface DataTableRowProps<TRow extends Record<string, unknown>> {
  row: TRow
  rowId: string
  rowIndex: number
  columns: DataTableColumn<TRow>[]
  size: DataTableSize
  variant: 'default' | 'bordered' | 'minimal'
  isSelected: boolean
  selectable: false | 'single' | 'multiple'
  onToggleSelect?: (rowId: string) => void
  rowActions?: DataTableRowAction<TRow>[]
  onRowClick?: (row: TRow, index: number) => void
}

function DataTableRowInner<TRow extends Record<string, unknown>>(
  props: DataTableRowProps<TRow>,
) {
  const {
    row,
    rowId,
    rowIndex,
    columns,
    size,
    variant,
    isSelected,
    selectable,
    onToggleSelect,
    rowActions,
    onRowClick,
  } = props

  const padClass = CELL_PAD_BY_SIZE[size]
  const borderClass = variant === 'bordered' ? 'border-r border-surface-border last:border-r-0' : ''
  const zebraClass =
    variant === 'default' ? 'even:bg-neutral-50' : ''

  const ctx = { rowIndex, rowId, isSelected, row }

  return (
    <tr
      data-row-id={rowId}
      data-state={isSelected ? 'selected' : undefined}
      onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
      className={cn(
        'border-b border-surface-border last:border-b-0',
        zebraClass,
        'hover:bg-surface-muted/60 transition-colors',
        isSelected && 'bg-brand-primary-muted/40',
        onRowClick && 'cursor-pointer',
      )}
    >
      {selectable && (
        <td
          className={cn(padClass, 'w-10', borderClass, stickyClass('left'))}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            size={size === 'lg' ? 'md' : 'sm'}
            checked={isSelected}
            onCheckedChange={() => onToggleSelect?.(rowId)}
            aria-label={`Selecionar linha ${rowIndex + 1}`}
          />
        </td>
      )}

      {columns.map((col) => {
        if (col.hidden) return null
        const content = col.cell ? col.cell(row, ctx) : resolveAccessor(col, row)
        const extraClass =
          typeof col.cellClassName === 'function'
            ? col.cellClassName(row)
            : col.cellClassName
        return (
          <td
            key={col.id}
            className={cn(
              padClass,
              alignClass(col.align),
              borderClass,
              stickyClass(col.sticky),
              extraClass,
            )}
            style={widthStyle(col as DataTableColumn<unknown>)}
          >
            {content as React.ReactNode}
          </td>
        )
      })}

      {rowActions && rowActions.length > 0 && (
        <td
          className={cn(padClass, 'w-10', borderClass, stickyClass('right'), 'text-right')}
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'inline-flex items-center justify-center rounded-md h-7 w-7',
                'text-neutral-500 hover:bg-surface-muted hover:text-neutral-800',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
              )}
              aria-label={`Ações da linha ${rowIndex + 1}`}
            >
              <KebabIcon />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end" size="md">
                {rowActions.map((action, i) => (
                  <DropdownMenuItem
                    key={i}
                    disabled={action.disabled}
                    onSelect={() => action.onClick(row)}
                    className={cn(
                      action.destructive &&
                        'text-error focus:text-error data-[highlighted]:bg-error-muted',
                    )}
                  >
                    {action.icon && (
                      <span className="inline-flex items-center justify-center">
                        {action.icon}
                      </span>
                    )}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </td>
      )}
    </tr>
  )
}

// Equality comparator default — shallow por chaves de TRow + isSelected.
// Caller pode passar `equalityFn` para deep custom.
function defaultArePropsEqual<TRow extends Record<string, unknown>>(
  a: DataTableRowProps<TRow>,
  b: DataTableRowProps<TRow>,
): boolean {
  if (a.isSelected !== b.isSelected) return false
  if (a.rowId !== b.rowId) return false
  if (a.rowIndex !== b.rowIndex) return false
  if (a.size !== b.size) return false
  if (a.variant !== b.variant) return false
  if (a.selectable !== b.selectable) return false
  if (a.columns !== b.columns) return false
  if (a.rowActions !== b.rowActions) return false
  if (a.onRowClick !== b.onRowClick) return false
  // row: ref-equality (caller mantém referência estável para perf)
  if (a.row !== b.row) return false
  return true
}

export const DataTableRow = React.memo(DataTableRowInner, defaultArePropsEqual) as <
  TRow extends Record<string, unknown>,
>(
  props: DataTableRowProps<TRow>,
) => React.ReactElement | null
