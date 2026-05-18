// @hashcodeti/ui-kit-core/primitives/DataTable/DataTablePagination
//
// Subcomponente de paginação. Pode ser usado isolado (caller já tem outra
// tabela ad-hoc e quer só a paginação consistente), ou injetado pelo `DataTable`
// raiz quando `totalRows` está presente.

import * as React from 'react'
import { cn } from '../../lib/cn'
import { Button } from '../Button/Button'
import type { DataTablePaginationProps, DataTableSize } from './DataTable.types'

// Icons inline (chevron-left/right + double-chevrons)
const Chev = ({ d, className }: { d: string; className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn('h-4 w-4', className)}
  >
    <path d={d} />
  </svg>
)

const FirstIcon = () => <Chev d="M11 4l-4 4 4 4M7 4l-4 4 4 4" />
const PrevIcon = () => <Chev d="M10 4l-4 4 4 4" />
const NextIcon = () => <Chev d="M6 4l4 4-4 4" />
const LastIcon = () => <Chev d="M5 4l4 4-4 4M9 4l4 4-4 4" />

const SIZE_BUTTON: Record<DataTableSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
}

const SIZE_TEXT: Record<DataTableSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
}

/**
 * DataTablePagination — footer de paginação controlado.
 *
 * **Importante:** NÃO faz slice dos dados. O caller é responsável por enviar
 * `data` já paginado quando `totalRows` está presente (paginação remota).
 *
 * @example
 * <DataTablePagination
 *   page={page}
 *   pageSize={20}
 *   totalRows={total}
 *   onPageChange={setPage}
 *   pageSizeOptions={[10, 20, 50]}
 *   onPageSizeChange={setPageSize}
 * />
 */
export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  page,
  pageSize,
  totalRows,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  size = 'md',
  className,
}) => {
  const safePageSize = Math.max(1, pageSize)
  const totalPages = Math.max(1, Math.ceil(totalRows / safePageSize))
  const clampedPage = Math.min(Math.max(1, page), totalPages)

  const startRow = totalRows === 0 ? 0 : (clampedPage - 1) * safePageSize + 1
  const endRow = Math.min(clampedPage * safePageSize, totalRows)

  const isFirst = clampedPage <= 1
  const isLast = clampedPage >= totalPages

  const btnSize = SIZE_BUTTON[size]

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 px-3 py-2 border-t border-surface-border bg-surface-background',
        SIZE_TEXT[size],
        'flex-wrap',
        className,
      )}
    >
      <div className="text-neutral-600">
        {totalRows === 0 ? (
          <span>Nenhum resultado</span>
        ) : (
          <span>
            Mostrando <span className="font-medium">{startRow}</span>–
            <span className="font-medium">{endRow}</span> de{' '}
            <span className="font-medium">{totalRows}</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {pageSizeOptions && onPageSizeChange && (
          <label className="inline-flex items-center gap-1.5 text-neutral-600">
            <span>Por página:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={cn(
                'rounded-md border border-surface-border bg-surface-background px-2 py-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
                SIZE_TEXT[size],
              )}
              aria-label="Linhas por página"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="text-neutral-600 whitespace-nowrap">
          Página <span className="font-medium">{clampedPage}</span> de{' '}
          <span className="font-medium">{totalPages}</span>
        </div>

        <div className="inline-flex items-center gap-1">
          <Button
            variant="outline-secondary"
            size={btnSize}
            disabled={isFirst}
            onClick={() => onPageChange(1)}
            aria-label="Primeira página"
            className="!px-2"
          >
            <FirstIcon />
          </Button>
          <Button
            variant="outline-secondary"
            size={btnSize}
            disabled={isFirst}
            onClick={() => onPageChange(clampedPage - 1)}
            aria-label="Página anterior"
            className="!px-2"
          >
            <PrevIcon />
          </Button>
          <Button
            variant="outline-secondary"
            size={btnSize}
            disabled={isLast}
            onClick={() => onPageChange(clampedPage + 1)}
            aria-label="Próxima página"
            className="!px-2"
          >
            <NextIcon />
          </Button>
          <Button
            variant="outline-secondary"
            size={btnSize}
            disabled={isLast}
            onClick={() => onPageChange(totalPages)}
            aria-label="Última página"
            className="!px-2"
          >
            <LastIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
DataTablePagination.displayName = 'DataTablePagination'
