// @hashcodeti/ui-kit-core/primitives/DataTable — barrel local
//
// O barrel raiz (src/index.ts) é consolidado pelo Tech Lead; este barrel local
// apenas expõe os tipos/componentes do composite Wave C.

export { DataTable, dataTableVariants } from './DataTable'
export { DataTablePagination } from './DataTablePagination'
export { DataTableToolbar } from './DataTableToolbar'
export { DataTableRow } from './DataTableRow'
export type {
  DataTableProps,
  DataTableColumn,
  DataTableCellContext,
  DataTableSort,
  DataTableSortDirection,
  DataTableRowAction,
  DataTableEmptyState,
  DataTableSelectionMode,
  DataTableVariant,
  DataTableSize,
  DataTablePaginationProps,
} from './DataTable.types'
export type { DataTableToolbarProps } from './DataTableToolbar'
export type { DataTableRowProps } from './DataTableRow'
