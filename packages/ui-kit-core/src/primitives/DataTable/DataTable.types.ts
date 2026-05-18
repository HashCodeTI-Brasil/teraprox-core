// @hashcodeti/ui-kit-core/primitives/DataTable — tipos
//
// Tipos genéricos centralizados. Mantidos isolados do `.tsx` para permitir que
// callers (storybook, MFs federados) importem só os tipos sem trazer o módulo
// de runtime.

import type * as React from 'react'

// ─── Direção / sort ───────────────────────────────────────────────────────

export type DataTableSortDirection = 'asc' | 'desc'

export interface DataTableSort {
  columnId: string
  direction: DataTableSortDirection
}

// ─── Variants / sizes ─────────────────────────────────────────────────────

export type DataTableVariant = 'default' | 'bordered' | 'minimal'
export type DataTableSize = 'sm' | 'md' | 'lg'

// ─── Column ───────────────────────────────────────────────────────────────

export interface DataTableCellContext<TRow> {
  rowIndex: number
  rowId: string
  isSelected: boolean
  row: TRow
}

export interface DataTableColumn<TRow> {
  /** Identificador único (obrigatório). */
  id: string
  /** Conteúdo do `<th>`. Aceita ReactNode ou função (útil p/ traduções lazy). */
  header: React.ReactNode | (() => React.ReactNode)
  /** Caminho para extrair valor da row. Fallback quando `cell` não definido. */
  accessor?: keyof TRow | ((row: TRow) => unknown)
  /** Render customizado da célula — `row` + contexto. */
  cell?: (row: TRow, ctx: DataTableCellContext<TRow>) => React.ReactNode
  /** Largura — string (px/% ou className) ou number (px). */
  width?: string | number
  /** Largura mínima — string (px/% ou className) ou number (px). */
  minWidth?: string | number
  /** Alinhamento horizontal. Default `left`. */
  align?: 'left' | 'center' | 'right'
  /** Habilita header clicável para ordenar. Default `false`. */
  sortable?: boolean
  /** Override do `id` quando emitir o evento de sort. Default `= id`. */
  sortKey?: string
  /** Sticky horizontal — fixa coluna à esquerda ou direita ao rolar. */
  sticky?: 'left' | 'right'
  /** className adicional do `<th>`. */
  headerClassName?: string
  /** className adicional da `<td>` — string ou função p/ classe condicional. */
  cellClassName?: string | ((row: TRow) => string)
  /** Oculta a coluna (toggle externo de visibilidade). */
  hidden?: boolean
}

// ─── Row actions ──────────────────────────────────────────────────────────

export interface DataTableRowAction<TRow = Record<string, unknown>> {
  label: React.ReactNode
  icon?: React.ReactNode
  onClick: (row: TRow) => void
  disabled?: boolean
  /** Renderiza item em tom de erro (vermelho) — para "Excluir" etc. */
  destructive?: boolean
}

// ─── EmptyState slot ──────────────────────────────────────────────────────

export interface DataTableEmptyState {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
}

// ─── Selection ────────────────────────────────────────────────────────────

export type DataTableSelectionMode = 'single' | 'multiple'

// ─── Props ────────────────────────────────────────────────────────────────

export interface DataTablePaginationProps {
  /** Página atual (1-based). */
  page: number
  pageSize: number
  totalRows: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  size?: DataTableSize
  className?: string
}

export interface DataTableProps<TRow extends Record<string, unknown>> {
  // ── Data ──
  data: TRow[]
  columns: DataTableColumn<TRow>[]
  getRowId: (row: TRow, index: number) => string

  // ── Estados ──
  loading?: boolean
  error?: React.ReactNode
  emptyState?: DataTableEmptyState

  // ── A11y / chrome ──
  caption?: React.ReactNode
  ariaLabel?: string

  // ── Sort (controlled OU uncontrolled) ──
  sortBy?: DataTableSort | null
  defaultSortBy?: DataTableSort | null
  onSortChange?: (sort: DataTableSort | null) => void

  // ── Pagination (controlled OU uncontrolled) ──
  page?: number
  defaultPage?: number
  pageSize?: number
  defaultPageSize?: number
  totalRows?: number
  pageSizeOptions?: number[]
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void

  // ── Selection (controlled OU uncontrolled) ──
  selectable?: boolean | DataTableSelectionMode
  selectedRowIds?: Set<string> | string[]
  defaultSelectedRowIds?: Set<string> | string[]
  onSelectionChange?: (ids: Set<string>) => void
  onRowClick?: (row: TRow, index: number) => void

  // ── Search / toolbar ──
  searchable?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  toolbar?: React.ReactNode

  // ── Row actions ──
  rowActions?: DataTableRowAction<TRow>[] | ((row: TRow) => DataTableRowAction<TRow>[])

  // ── Layout / variants ──
  stickyHeader?: boolean
  maxHeight?: string
  variant?: DataTableVariant
  size?: DataTableSize
  asCard?: boolean
  className?: string
  tableClassName?: string

  // ── Perf ──
  equalityFn?: (a: TRow, b: TRow) => boolean
}
