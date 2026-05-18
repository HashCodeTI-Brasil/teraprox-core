// DataTable stories — composite Wave C.
// FIXME(tech-lead): trocar imports relativos por '@hashcodeti/ui-kit-core'
// quando o barrel raiz (src/index.ts) consolidar exports do DataTable.
import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import { Button, Badge } from '@hashcodeti/ui-kit-core'
import {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
  type DataTableColumn,
  type DataTableSort,
} from '@hashcodeti/ui-kit-core'

// ─── Dados fake ────────────────────────────────────────────────────────────

interface User extends Record<string, unknown> {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'invited' | 'disabled'
  createdAt: string
}

const ROLES: User['role'][] = ['admin', 'editor', 'viewer']
const STATUSES: User['status'][] = ['active', 'invited', 'disabled']

function makeUsers(n: number, seed = 1): User[] {
  const out: User[] = []
  let s = seed
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = 0; i < n; i++) {
    const r = ROLES[Math.floor(rnd() * ROLES.length)]
    const st = STATUSES[Math.floor(rnd() * STATUSES.length)]
    const day = 1 + Math.floor(rnd() * 27)
    out.push({
      id: `u_${i + 1}`,
      name: `Usuário ${String(i + 1).padStart(4, '0')}`,
      email: `user${i + 1}@teraprox.com`,
      role: r,
      status: st,
      createdAt: `2026-${String(1 + (i % 5)).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    })
  }
  return out
}

const USERS_20 = makeUsers(20)
const USERS_1000 = makeUsers(1000, 7)

// ─── Colunas base ─────────────────────────────────────────────────────────

const StatusBadge = ({ s }: { s: User['status'] }) => {
  const tone =
    s === 'active' ? 'success' : s === 'invited' ? 'warning' : 'neutral'
  return (
    <Badge tone={tone as 'success' | 'warning' | 'neutral'} size="sm">
      {s}
    </Badge>
  )
}

const baseColumns: DataTableColumn<User>[] = [
  { id: 'name', header: 'Nome', accessor: 'name', sortable: true, minWidth: 180 },
  { id: 'email', header: 'Email', accessor: 'email', sortable: true, minWidth: 220 },
  {
    id: 'role',
    header: 'Papel',
    accessor: 'role',
    sortable: true,
    width: 120,
    cell: (r) => <span className="capitalize">{r.role}</span>,
  },
  {
    id: 'status',
    header: 'Status',
    width: 110,
    align: 'center',
    cell: (r) => <StatusBadge s={r.status} />,
  },
  {
    id: 'createdAt',
    header: 'Criado em',
    accessor: 'createdAt',
    sortable: true,
    width: 130,
    align: 'right',
  },
]

// ─── Helpers de sort/page (apenas storybook — simulam back-end) ───────────

function applySort(rows: User[], sort: DataTableSort | null): User[] {
  if (!sort) return rows
  const { columnId, direction } = sort
  const sorted = [...rows].sort((a, b) => {
    const av = a[columnId as keyof User] as string
    const bv = b[columnId as keyof User] as string
    if (av < bv) return direction === 'asc' ? -1 : 1
    if (av > bv) return direction === 'asc' ? 1 : -1
    return 0
  })
  return sorted
}

// ─── Meta ─────────────────────────────────────────────────────────────────

const meta: Meta<typeof DataTable> = {
  title: 'primitives/DataTable',
  component: DataTable as unknown as React.ComponentType,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'padded',
  },
}
export default meta

type Story = StoryObj

// ─── Stories ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <DataTable<User>
      data={USERS_20.slice(0, 8)}
      columns={baseColumns}
      getRowId={(u) => u.id}
      ariaLabel="Tabela de usuários"
      asCard
    />
  ),
}

export const Sortable: Story = {
  render: () => {
    const [sort, setSort] = useState<DataTableSort | null>(null)
    const data = useMemo(() => applySort(USERS_20.slice(0, 10), sort), [sort])
    return (
      <DataTable<User>
        data={data}
        columns={baseColumns}
        getRowId={(u) => u.id}
        sortBy={sort}
        onSortChange={setSort}
        asCard
        caption="Click nos cabeçalhos para ordenar (3-state: asc → desc → none)."
      />
    )
  },
}

export const PaginatedRemote: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const total = USERS_1000.length
    const pageData = useMemo(
      () => USERS_1000.slice((page - 1) * pageSize, page * pageSize),
      [page, pageSize],
    )
    return (
      <DataTable<User>
        data={pageData}
        columns={baseColumns}
        getRowId={(u) => u.id}
        totalRows={total}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={[10, 20, 50]}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
        asCard
      />
    )
  },
}

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set())
    return (
      <div className="space-y-2">
        <div className="text-sm text-neutral-600">
          Selecionados: <strong>{selected.size}</strong>
        </div>
        <DataTable<User>
          data={USERS_20.slice(0, 8)}
          columns={baseColumns}
          getRowId={(u) => u.id}
          selectable="multiple"
          selectedRowIds={selected}
          onSelectionChange={setSelected}
          asCard
        />
      </div>
    )
  },
}

export const SelectableSingle: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set())
    return (
      <DataTable<User>
        data={USERS_20.slice(0, 6)}
        columns={baseColumns}
        getRowId={(u) => u.id}
        selectable="single"
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        onRowClick={(r) => setSelected(new Set([r.id]))}
        asCard
      />
    )
  },
}

export const RowActions: Story = {
  render: () => (
    <DataTable<User>
      data={USERS_20.slice(0, 6)}
      columns={baseColumns}
      getRowId={(u) => u.id}
      rowActions={(row) => [
        { label: 'Editar', onClick: (r) => alert(`Editar ${r.email}`) },
        {
          label: 'Reenviar convite',
          onClick: (r) => alert(`Convite ${r.email}`),
          disabled: row.status === 'active',
        },
        { label: 'Excluir', destructive: true, onClick: (r) => alert(`Excluir ${r.id}`) },
      ]}
      asCard
    />
  ),
}

export const SearchAndToolbar: Story = {
  render: () => {
    const [q, setQ] = useState('')
    const filtered = useMemo(
      () =>
        USERS_20.filter(
          (u) =>
            u.name.toLowerCase().includes(q.toLowerCase()) ||
            u.email.toLowerCase().includes(q.toLowerCase()),
        ),
      [q],
    )
    return (
      <DataTable<User>
        data={filtered}
        columns={baseColumns}
        getRowId={(u) => u.id}
        searchable
        searchValue={q}
        onSearchChange={setQ}
        searchPlaceholder="Buscar nome ou email..."
        toolbar={<Button size="sm">Exportar CSV</Button>}
        asCard
      />
    )
  },
}

export const LoadingState: Story = {
  render: () => (
    <DataTable<User>
      data={USERS_20.slice(0, 5)}
      columns={baseColumns}
      getRowId={(u) => u.id}
      loading
      asCard
    />
  ),
}

export const ErrorState: Story = {
  render: () => (
    <DataTable<User>
      data={[]}
      columns={baseColumns}
      getRowId={(u) => u.id}
      error="Falha ao carregar usuários — tente novamente."
      asCard
    />
  ),
}

export const EmptyState: Story = {
  render: () => (
    <DataTable<User>
      data={[]}
      columns={baseColumns}
      getRowId={(u) => u.id}
      emptyState={{
        title: 'Nenhum usuário ainda',
        description: 'Convide o primeiro membro da equipe para começar.',
        action: <Button size="sm">Convidar usuário</Button>,
      }}
      asCard
    />
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['default', 'bordered', 'minimal'] as const).map((v) => (
        <div key={v}>
          <h4 className="text-sm font-semibold mb-2 capitalize">{v}</h4>
          <DataTable<User>
            data={USERS_20.slice(0, 4)}
            columns={baseColumns}
            getRowId={(u) => u.id}
            variant={v}
            asCard
          />
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s}>
          <h4 className="text-sm font-semibold mb-2">Size = {s}</h4>
          <DataTable<User>
            data={USERS_20.slice(0, 4)}
            columns={baseColumns}
            getRowId={(u) => u.id}
            size={s}
            asCard
          />
        </div>
      ))}
    </div>
  ),
}

export const StickyHeaderTallTable: Story = {
  render: () => (
    <DataTable<User>
      data={USERS_20}
      columns={baseColumns}
      getRowId={(u) => u.id}
      stickyHeader
      maxHeight="300px"
      asCard
      caption="Role para baixo — header permanece sticky no topo."
    />
  ),
}

export const Performance1000Rows: Story = {
  render: () => {
    const [sort, setSort] = useState<DataTableSort | null>(null)
    const data = useMemo(() => {
      // console.time mensura no dev — útil pra calibrar perf.
      const t = performance.now()
      const sorted = applySort(USERS_1000, sort)
      // eslint-disable-next-line no-console
      console.log(`[DataTable Story1000] sort+slice: ${(performance.now() - t).toFixed(1)}ms`)
      return sorted
    }, [sort])
    return (
      <DataTable<User>
        data={data}
        columns={baseColumns}
        getRowId={(u) => u.id}
        sortBy={sort}
        onSortChange={setSort}
        stickyHeader
        maxHeight="500px"
        asCard
        size="sm"
      />
    )
  },
}

export const FullExample: Story = {
  render: () => {
    const [q, setQ] = useState('')
    const [sort, setSort] = useState<DataTableSort | null>({
      columnId: 'createdAt',
      direction: 'desc',
    })
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [selected, setSelected] = useState<Set<string>>(new Set())

    const filtered = useMemo(
      () =>
        USERS_1000.filter(
          (u) =>
            !q ||
            u.name.toLowerCase().includes(q.toLowerCase()) ||
            u.email.toLowerCase().includes(q.toLowerCase()),
        ),
      [q],
    )
    const sorted = useMemo(() => applySort(filtered, sort), [filtered, sort])
    const total = sorted.length
    const pageData = useMemo(
      () => sorted.slice((page - 1) * pageSize, page * pageSize),
      [sorted, page, pageSize],
    )

    return (
      <DataTable<User>
        data={pageData}
        columns={baseColumns}
        getRowId={(u) => u.id}
        searchable
        searchValue={q}
        onSearchChange={(v) => {
          setQ(v)
          setPage(1)
        }}
        searchPlaceholder="Buscar nome ou email..."
        toolbar={
          <>
            <Button variant="outline-secondary" size="sm">
              Exportar
            </Button>
            <Button size="sm">Novo usuário</Button>
          </>
        }
        sortBy={sort}
        onSortChange={setSort}
        totalRows={total}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={[10, 20, 50, 100]}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
        selectable="multiple"
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        rowActions={[
          { label: 'Editar', onClick: (r) => alert(`Editar ${r.email}`) },
          { label: 'Excluir', destructive: true, onClick: (r) => alert(`Excluir ${r.id}`) },
        ]}
        stickyHeader
        maxHeight="500px"
        asCard
        caption={`Total filtrado: ${total} • Selecionados: ${selected.size}`}
      />
    )
  },
}

export const PaginationStandalone: Story = {
  render: () => {
    const [page, setPage] = useState(3)
    const [pageSize, setPageSize] = useState(20)
    return (
      <div className="border border-surface-border rounded-lg overflow-hidden max-w-2xl">
        <DataTablePagination
          page={page}
          pageSize={pageSize}
          totalRows={357}
          pageSizeOptions={[10, 20, 50]}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    )
  },
}

export const ToolbarStandalone: Story = {
  render: () => (
    <div className="border border-surface-border rounded-lg overflow-hidden">
      <DataTableToolbar
        start={<span className="text-sm text-neutral-700">SearchBar aqui</span>}
        end={<Button size="sm">Ação</Button>}
      />
    </div>
  ),
}
