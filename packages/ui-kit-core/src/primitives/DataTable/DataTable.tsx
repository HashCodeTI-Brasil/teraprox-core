// @hashcodeti/ui-kit-core/primitives/DataTable
//
// Composite Wave C — view-puro, props-driven, generic<TRow>. Substitui 17+
// implementações ad-hoc de tabelas no ecossistema Teraprox.
//
// Decisões críticas:
//
//  1. **Controlled/uncontrolled merge** — pattern Radix puro: cada slot (sort,
//     page, pageSize, selection) tem `prop` + `defaultProp`. Hook interno
//     `useControllable` resolve qual usa. Quando controlled, o setter chama
//     apenas o callback; quando uncontrolled, atualiza state interno + callback.
//
//  2. **Sticky header** — `stickyHeader` + `maxHeight` formam combo: o wrapper
//     fica com `overflow-y-auto`, `<thead>` recebe `sticky top-0 z-10`. Sticky
//     funcional só quando wrapper rola — sem `maxHeight`, sticky é no-op (mas
//     classes não atrapalham).
//
//  3. **SelectAll indeterminate** — calculado da union das rows visíveis (do
//     `data` atual, NÃO da página inteira — paginação remota não conhece o
//     universo). `count === 0 → unchecked; count === data.length → checked;
//     senão → indeterminate`.
//
//  4. **Generic ergonomia** — `<TRow extends Record<string, unknown>>`. Helper
//     `as <T,>(p) => ...` no export preserva inferência ao usar `<DataTable<MyRow>
//     data={…} />`. `forwardRef` raiz aponta para `<div>`.
//
//  5. **Row actions wiring** — coluna virtual rightmost (sticky right). Cada
//     row monta `<DropdownMenu>` via primitivo já existente.
//
//  6. **Loading overlay** — não recria estrutura: `<tbody>` renderiza rows
//     normais com `opacity-50 pointer-events-none` quando loading; overlay
//     absoluto com `<Spinner>` centralizado é sobreposto via wrapper `relative`.
//     Header e pagination permanecem interativos (search/page-jump enquanto
//     loading).

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { Checkbox } from '../Checkbox/Checkbox'
import { Spinner } from '../Spinner/Spinner'
import { EmptyState } from '../EmptyState/EmptyState'
import { SearchBar } from '../SearchBar/SearchBar'
import { DataTableRow } from './DataTableRow'
import { DataTablePagination } from './DataTablePagination'
import type {
  DataTableProps,
  DataTableSort,
  DataTableColumn,
  DataTableRowAction,
  DataTableSize,
  DataTableVariant,
} from './DataTable.types'

// ─── Variants ─────────────────────────────────────────────────────────────

export const dataTableVariants = cva(
  ['w-full border-collapse text-surface-foreground'],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-surface-border',
        minimal: '',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

export type DataTableVariantsProps = VariantProps<typeof dataTableVariants>

// ─── Hook: useControllable ────────────────────────────────────────────────
// Pattern Radix-ish — resolve prop vs defaultProp. Caller pode ser:
//  - controlled: `prop` definido (e geralmente `onChange` para receber updates)
//  - uncontrolled: `defaultProp` semeia state interno
//  - misto: passa `defaultProp` + `onChange` (state interno + notificação)

function useControllable<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (v: T) => void,
): [T, (next: T) => void] {
  const isControlled = controlledValue !== undefined
  const [internal, setInternal] = React.useState<T>(defaultValue)
  const value = isControlled ? (controlledValue as T) : internal
  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      if (onChange) onChange(next)
    },
    [isControlled, onChange],
  )
  return [value, setValue]
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function toIdSet(input?: Set<string> | string[]): Set<string> {
  if (!input) return new Set()
  if (input instanceof Set) return new Set(input)
  return new Set(input)
}

const HEADER_PAD: Record<DataTableSize, string> = {
  sm: 'py-1.5 px-2',
  md: 'py-2 px-3',
  lg: 'py-3 px-4',
}

function headerAlignClass(align?: 'left' | 'center' | 'right'): string {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

function headerStickyClass(sticky?: 'left' | 'right'): string {
  if (sticky === 'left') return 'sticky left-0 z-20 bg-surface-background'
  if (sticky === 'right') return 'sticky right-0 z-20 bg-surface-background'
  return ''
}

function widthStyle<T>(col: DataTableColumn<T>): React.CSSProperties {
  const s: React.CSSProperties = {}
  if (col.width !== undefined)
    s.width = typeof col.width === 'number' ? `${col.width}px` : col.width
  if (col.minWidth !== undefined)
    s.minWidth = typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
  return s
}

// ─── Sort icon ────────────────────────────────────────────────────────────

const SortIcon: React.FC<{ direction: 'asc' | 'desc' | null }> = ({ direction }) => {
  if (direction === 'asc') {
    return (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        className="h-3.5 w-3.5 ml-1 inline-block text-brand-primary">
        <path d="M4 10l4-4 4 4" />
      </svg>
    )
  }
  if (direction === 'desc') {
    return (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        className="h-3.5 w-3.5 ml-1 inline-block text-brand-primary">
        <path d="M4 6l4 4 4-4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className="h-3.5 w-3.5 ml-1 inline-block text-neutral-400">
      <path d="M5 7l3-3 3 3M5 9l3 3 3-3" />
    </svg>
  )
}

// ─── DataTable componente principal ───────────────────────────────────────

/**
 * DataTable — composite cross-domain de tabela de dados.
 *
 * **Filosofia view-puro:** DataTable NÃO ordena, NÃO pagina e NÃO filtra os
 * dados — apenas emite eventos. O caller é responsável por:
 *
 *  - Ordenar `data` quando `onSortChange` for chamado.
 *  - Enviar `data` já paginado quando `totalRows` estiver presente.
 *  - Filtrar `data` baseado em `searchValue` (busca controlada).
 *
 * Isso permite que callers façam paginação/sort remoto (API + Firebase) sem
 * hack interno. Para paginação local, o caller faz o slice antes de passar `data`.
 *
 * Suporta **controlled OU uncontrolled** em cada slot (sort/page/selection),
 * seguindo o pattern Radix. Misto também é válido (defaultProp + onChange).
 *
 * @example
 * // Basic — sem sort, sem pagination, sem selection
 * <DataTable
 *   data={users}
 *   getRowId={(u) => u.id}
 *   columns={[
 *     { id: 'name', header: 'Nome', accessor: 'name' },
 *     { id: 'email', header: 'Email', accessor: 'email' },
 *   ]}
 * />
 *
 * @example
 * // Sortable controlled — caller faz o sort do `data`
 * const [sort, setSort] = useState<DataTableSort | null>(null)
 * const sortedData = useMemo(() => applySort(data, sort), [data, sort])
 * <DataTable
 *   data={sortedData}
 *   getRowId={(u) => u.id}
 *   columns={[
 *     { id: 'name', header: 'Nome', accessor: 'name', sortable: true },
 *     { id: 'created', header: 'Criado em', accessor: 'createdAt', sortable: true },
 *   ]}
 *   sortBy={sort}
 *   onSortChange={setSort}
 * />
 *
 * @example
 * // Paginated remote — caller faz fetch da página
 * <DataTable
 *   data={pageRows}
 *   totalRows={total}
 *   page={page}
 *   pageSize={20}
 *   onPageChange={setPage}
 *   pageSizeOptions={[10, 20, 50]}
 *   onPageSizeChange={setPageSize}
 *   getRowId={(r) => r.id}
 *   columns={columns}
 *   loading={isFetching}
 * />
 *
 * @example
 * // Selection multiple + row actions
 * <DataTable
 *   data={rows}
 *   getRowId={(r) => r.id}
 *   columns={columns}
 *   selectable="multiple"
 *   onSelectionChange={(ids) => console.log([...ids])}
 *   rowActions={[
 *     { label: 'Editar', onClick: (r) => openEdit(r) },
 *     { label: 'Excluir', destructive: true, onClick: (r) => del(r.id) },
 *   ]}
 * />
 */
function DataTableInner<TRow extends Record<string, unknown>>(
  props: DataTableProps<TRow>,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement {
  const {
    data,
    columns,
    getRowId,
    loading = false,
    error,
    emptyState,
    caption,
    ariaLabel = 'Tabela de dados',
    sortBy,
    defaultSortBy = null,
    onSortChange,
    page,
    defaultPage = 1,
    pageSize,
    defaultPageSize = 10,
    totalRows,
    pageSizeOptions,
    onPageChange,
    onPageSizeChange,
    selectable = false,
    selectedRowIds,
    defaultSelectedRowIds,
    onSelectionChange,
    onRowClick,
    searchable = false,
    searchValue,
    onSearchChange,
    searchPlaceholder,
    toolbar,
    rowActions,
    stickyHeader = true,
    maxHeight,
    variant = 'default',
    size = 'md',
    asCard = false,
    className,
    tableClassName,
  } = props

  const resolvedVariant: DataTableVariant = variant
  const resolvedSize: DataTableSize = size

  // ── Sort (controlled OU uncontrolled) ───
  const [sortState, setSortState] = useControllable<DataTableSort | null>(
    sortBy as DataTableSort | null | undefined,
    defaultSortBy ?? null,
    onSortChange,
  )

  // ── Pagination (controlled OU uncontrolled) ───
  const [pageState, setPageState] = useControllable<number>(
    page,
    defaultPage,
    onPageChange,
  )
  const [pageSizeState, setPageSizeState] = useControllable<number>(
    pageSize,
    defaultPageSize,
    onPageSizeChange,
  )

  // ── Selection (controlled OU uncontrolled) ───
  const selectionMode: false | 'single' | 'multiple' =
    selectable === true ? 'multiple' : selectable === false ? false : selectable

  const [selectionState, setSelectionState] = useControllable<Set<string>>(
    selectedRowIds !== undefined ? toIdSet(selectedRowIds) : undefined,
    toIdSet(defaultSelectedRowIds),
    onSelectionChange,
  )

  // ── Colunas visíveis (cached) ───
  const visibleColumns = React.useMemo(
    () => columns.filter((c) => !c.hidden),
    [columns],
  )

  // ── Row IDs (memo) — usado para selectAll indeterminate ───
  const rowIds = React.useMemo(
    () => data.map((row, i) => getRowId(row, i)),
    [data, getRowId],
  )

  // ── Header sort handler ───
  const handleSortClick = React.useCallback(
    (col: DataTableColumn<TRow>) => {
      if (!col.sortable) return
      const key = col.sortKey ?? col.id
      // 3-state toggle: null → asc → desc → null
      let next: DataTableSort | null
      if (!sortState || sortState.columnId !== key) {
        next = { columnId: key, direction: 'asc' }
      } else if (sortState.direction === 'asc') {
        next = { columnId: key, direction: 'desc' }
      } else {
        next = null
      }
      setSortState(next)
    },
    [sortState, setSortState],
  )

  // ── Selection helpers ───
  const handleToggleRow = React.useCallback(
    (rowId: string) => {
      if (!selectionMode) return
      if (selectionMode === 'single') {
        const next = new Set<string>()
        if (!selectionState.has(rowId)) next.add(rowId)
        setSelectionState(next)
        return
      }
      const next = new Set(selectionState)
      if (next.has(rowId)) next.delete(rowId)
      else next.add(rowId)
      setSelectionState(next)
    },
    [selectionMode, selectionState, setSelectionState],
  )

  // SelectAll: union das rows visíveis (data atual)
  const selectAllState = React.useMemo<true | false | 'indeterminate'>(() => {
    if (selectionMode !== 'multiple' || data.length === 0) return false
    let count = 0
    for (const id of rowIds) if (selectionState.has(id)) count++
    if (count === 0) return false
    if (count === data.length) return true
    return 'indeterminate'
  }, [selectionMode, data.length, rowIds, selectionState])

  const handleToggleAll = React.useCallback(() => {
    if (selectionMode !== 'multiple') return
    const next = new Set(selectionState)
    if (selectAllState === true) {
      // remove visíveis
      for (const id of rowIds) next.delete(id)
    } else {
      // add todas visíveis (preserva seleções de outras páginas)
      for (const id of rowIds) next.add(id)
    }
    setSelectionState(next)
  }, [selectionMode, selectionState, selectAllState, rowIds, setSelectionState])

  // ── Row actions resolver (estático ou função) ───
  const resolveActions = React.useCallback(
    (row: TRow): DataTableRowAction<TRow>[] | undefined => {
      if (!rowActions) return undefined
      if (typeof rowActions === 'function') return rowActions(row)
      return rowActions
    },
    [rowActions],
  )

  // ── Estados ───
  const hasData = data.length > 0
  const showEmpty = !loading && !error && !hasData
  const showError = !loading && !!error
  const showPagination = totalRows !== undefined

  // Container styling
  const containerClasses = cn(
    'relative bg-surface-background',
    asCard && 'border border-surface-border rounded-lg shadow-sm overflow-hidden',
    className,
  )

  // Wrapper rolável (host do sticky header)
  const scrollWrapperStyle: React.CSSProperties = maxHeight ? { maxHeight } : {}
  const scrollWrapperClasses = cn(
    'relative w-full',
    maxHeight && 'overflow-y-auto',
    'overflow-x-auto',
  )

  // colSpan total (incluindo cols virtuais)
  const totalColSpan =
    visibleColumns.length +
    (selectionMode ? 1 : 0) +
    (rowActions ? 1 : 0)

  return (
    <div
      ref={ref}
      role="region"
      aria-label={ariaLabel}
      className={containerClasses}
    >
      {/* Toolbar (search + slot) */}
      {(searchable || toolbar) && (
        <div className="flex items-center gap-3 px-3 py-2 border-b border-surface-border flex-wrap">
          {searchable && (
            <div className="flex-1 min-w-[200px] max-w-md">
              <SearchBar
                value={searchValue ?? ''}
                onChange={(v) => onSearchChange?.(v)}
                placeholder={searchPlaceholder}
                size={resolvedSize === 'lg' ? 'lg' : 'sm'}
              />
            </div>
          )}
          {toolbar && <div className="flex items-center gap-2 ml-auto">{toolbar}</div>}
        </div>
      )}

      <div className={scrollWrapperClasses} style={scrollWrapperStyle}>
        <table
          aria-busy={loading || undefined}
          className={cn(
            dataTableVariants({ variant: resolvedVariant, size: resolvedSize }),
            tableClassName,
          )}
        >
          {caption && <caption className="p-2 text-xs text-neutral-500">{caption}</caption>}

          <thead
            className={cn(
              'bg-surface-background text-neutral-700',
              'border-b border-surface-border',
              stickyHeader && 'sticky top-0 z-10',
            )}
          >
            <tr>
              {selectionMode && (
                <th
                  scope="col"
                  className={cn(
                    HEADER_PAD[resolvedSize],
                    'w-10',
                    headerStickyClass('left'),
                  )}
                >
                  {selectionMode === 'multiple' ? (
                    <Checkbox
                      size={resolvedSize === 'lg' ? 'md' : 'sm'}
                      checked={selectAllState}
                      onCheckedChange={handleToggleAll}
                      aria-label="Selecionar todas as linhas visíveis"
                    />
                  ) : null}
                </th>
              )}

              {visibleColumns.map((col) => {
                const headerContent =
                  typeof col.header === 'function' ? col.header() : col.header
                const sortKey = col.sortKey ?? col.id
                const isSorted = sortState?.columnId === sortKey
                const direction: 'asc' | 'desc' | null = isSorted
                  ? sortState!.direction
                  : null
                const ariaSort: 'ascending' | 'descending' | 'none' = isSorted
                  ? direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'

                return (
                  <th
                    key={col.id}
                    scope="col"
                    aria-sort={col.sortable ? ariaSort : undefined}
                    className={cn(
                      HEADER_PAD[resolvedSize],
                      'font-semibold whitespace-nowrap',
                      headerAlignClass(col.align),
                      headerStickyClass(col.sticky),
                      col.headerClassName,
                    )}
                    style={widthStyle(col)}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSortClick(col)}
                        aria-label={`Ordenar por ${
                          typeof headerContent === 'string' ? headerContent : col.id
                        }`}
                        className={cn(
                          'inline-flex items-center gap-0 hover:text-brand-primary transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm',
                          isSorted && 'text-brand-primary',
                        )}
                      >
                        <span>{headerContent}</span>
                        <SortIcon direction={direction} />
                      </button>
                    ) : (
                      <span>{headerContent}</span>
                    )}
                  </th>
                )
              })}

              {rowActions && (
                <th
                  scope="col"
                  className={cn(
                    HEADER_PAD[resolvedSize],
                    'w-10',
                    headerStickyClass('right'),
                  )}
                  aria-label="Ações"
                />
              )}
            </tr>
          </thead>

          <tbody className={cn(loading && 'opacity-50 pointer-events-none')}>
            {showError && (
              <tr>
                <td
                  colSpan={totalColSpan}
                  className="px-4 py-10 text-center text-error"
                >
                  {error}
                </td>
              </tr>
            )}

            {showEmpty && (
              <tr>
                <td colSpan={totalColSpan} className="p-0">
                  <EmptyState
                    title={emptyState?.title ?? 'Nenhum resultado'}
                    description={emptyState?.description}
                    icon={emptyState?.icon}
                    action={emptyState?.action}
                  />
                </td>
              </tr>
            )}

            {!showError &&
              !showEmpty &&
              data.map((row, i) => {
                const rowId = rowIds[i]
                return (
                  <DataTableRow
                    key={rowId}
                    row={row}
                    rowId={rowId}
                    rowIndex={i}
                    columns={visibleColumns}
                    size={resolvedSize}
                    variant={resolvedVariant}
                    isSelected={selectionState.has(rowId)}
                    selectable={selectionMode}
                    onToggleSelect={handleToggleRow}
                    rowActions={resolveActions(row)}
                    onRowClick={onRowClick as DataTableProps<TRow>['onRowClick']}
                  />
                )
              })}
          </tbody>
        </table>

        {/* Loading overlay — absolutamente posicionado sobre rows */}
        {loading && hasData && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <Spinner size="lg" tone="brand" srLabel="Carregando dados da tabela" />
          </div>
        )}
        {loading && !hasData && (
          <div
            className="flex items-center justify-center py-16"
            aria-hidden="true"
          >
            <Spinner size="lg" tone="brand" srLabel="Carregando dados da tabela" />
          </div>
        )}
      </div>

      {showPagination && (
        <DataTablePagination
          page={pageState}
          pageSize={pageSizeState}
          totalRows={totalRows!}
          pageSizeOptions={pageSizeOptions}
          onPageChange={setPageState}
          onPageSizeChange={setPageSizeState}
          size={resolvedSize}
        />
      )}
    </div>
  )
}

// forwardRef + generics: cast preservando inferência <TRow>.
const DataTableForwarded = React.forwardRef(DataTableInner as never) as <
  TRow extends Record<string, unknown>,
>(
  props: DataTableProps<TRow> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement

;(DataTableForwarded as unknown as { displayName: string }).displayName = 'DataTable'

export const DataTable = DataTableForwarded
