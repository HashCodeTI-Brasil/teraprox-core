import React, { useMemo, useState } from 'react'
import { Avatar } from '../shared/Avatar'
import { RolePill, ROLE_VALUES, type RoleValue } from '../shared/RolePill'
import type { User } from '../types'

export interface UserTableProps {
  users: User[]
  isLoading?: boolean
  onEditUser?: (user: User) => void
  onDeleteUser?: (user: User) => void
  onCreateUser?: () => void
  onInviteByEmail?: () => void
  /** Habilita edição inline de role (dropdown na pill). */
  canEditRole?: boolean
  /** Callback quando role muda inline. Se rejeitar, lista não muda. */
  onChangeRole?: (user: User, role: RoleValue) => void | Promise<void>
  /** Show breadcrumb/subtitle next to title */
  subtitle?: string
  className?: string
}

type RoleFilter = RoleValue | 'OTHER' | 'ALL'

const fullName = (u: User): string => {
  const derived = u._fullName ?? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()
  return derived || u.email || '—'
}

const userRoleRaw = (u: User): string | null => {
  // backend novo expõe `u.role` (flatten); shape cru tem `userRoles[0].role` (array)
  // ou legacy `userRole.role` (objeto). Aceita qualquer um, normalize ao caller.
  const raw =
    (u as any).role ??
    (u as any).userRoles?.[0]?.role ??
    (u as any).userRole?.role ??
    null
  return typeof raw === 'string' && raw.trim() ? raw : null
}

const userRoleFiltro = (u: User): RoleValue | 'OTHER' | null => {
  const raw = userRoleRaw(u)
  if (!raw) return null
  const upper = raw.toUpperCase()
  return (ROLE_VALUES as readonly string[]).includes(upper)
    ? (upper as RoleValue)
    : 'OTHER'
}

const userSetorName = (u: User): string => {
  return (
    (u as any).setor ??
    (u as any).userSetor?.setor?.nome ??
    (u as any).userSetor?.setor ??
    '—'
  )
}

/** Tabela densa estilo Linear/Notion — toolbar embedded + empty state + role filter pills. */
export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading = false,
  onEditUser,
  onDeleteUser,
  onCreateUser,
  onInviteByEmail,
  canEditRole = false,
  onChangeRole,
  subtitle,
  className = '',
}) => {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return users.filter((u) => {
      if (roleFilter !== 'ALL' && userRoleFiltro(u) !== roleFilter) return false
      if (!term) return true
      const hay = `${fullName(u)} ${u.email ?? ''}`.toLowerCase()
      return hay.includes(term)
    })
  }, [users, search, roleFilter])

  return (
    <section
      className={`bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`}
    >
      {/* Header */}
      <header className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Usuários</h1>
          {subtitle && <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          {onInviteByEmail && (
            <button
              type="button"
              onClick={onInviteByEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <span aria-hidden>✉</span> Convidar por email
            </button>
          )}
          {onCreateUser && (
            <button
              type="button"
              onClick={onCreateUser}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium"
            >
              <span aria-hidden>+</span> Novo usuário
            </button>
          )}
        </div>
      </header>

      {/* Toolbar */}
      <div className="px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3 flex-wrap">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou email..."
          className="flex-1 min-w-[220px] h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10"
        />
        <div className="flex gap-1 items-center" role="tablist" aria-label="Filtrar por role">
          {(['ALL', ...ROLE_VALUES] as RoleFilter[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              role="tab"
              aria-selected={roleFilter === r}
              className={
                roleFilter === r
                  ? 'px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900'
                  : 'px-2.5 py-1 text-xs font-medium rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }
            >
              {r === 'ALL' ? 'Todos' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      {isLoading ? (
        <SkeletonRows />
      ) : filtered.length === 0 ? (
        <EmptyState query={search} hasUsers={users.length > 0} onCreateUser={onCreateUser} />
      ) : (
        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {filtered.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEditUser}
              onDelete={onDeleteUser}
              canEditRole={canEditRole}
              onChangeRole={onChangeRole}
            />
          ))}
        </ul>
      )}

      {/* Footer count */}
      {!isLoading && filtered.length > 0 && (
        <footer className="px-6 py-2.5 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
          {filtered.length} de {users.length} {users.length === 1 ? 'usuário' : 'usuários'}
        </footer>
      )}
    </section>
  )
}

const UserRow: React.FC<{
  user: User
  onEdit?: (u: User) => void
  onDelete?: (u: User) => void
  canEditRole?: boolean
  onChangeRole?: (u: User, role: RoleValue) => void | Promise<void>
}> = ({ user, onEdit, onDelete, canEditRole, onChangeRole }) => {
  const name = fullName(user)
  const role = userRoleRaw(user)
  const setor = userSetorName(user)
  const active = (user as any).active ?? true
  const [savingRole, setSavingRole] = useState(false)

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onChangeRole) return
    const next = e.target.value as RoleValue
    if (!next || next === (role ?? '').toUpperCase()) return
    setSavingRole(true)
    try {
      await onChangeRole(user, next)
    } finally {
      setSavingRole(false)
    }
  }

  const handleRowClick = () => onEdit?.(user)
  const handleRowKey = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onEdit?.(user)
    }
  }
  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <li
      className={`group px-6 py-3 flex items-center gap-4 transition-colors ${
        onEdit
          ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
          : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
      }`}
      onClick={onEdit ? handleRowClick : undefined}
      onKeyDown={onEdit ? handleRowKey : undefined}
      role={onEdit ? 'button' : undefined}
      tabIndex={onEdit ? 0 : undefined}
      aria-label={onEdit ? `Editar ${name}` : undefined}
    >
      <Avatar name={name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-neutral-900 dark:text-neutral-50 truncate">
            {name}
          </span>
          {!active && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
              inativo
            </span>
          )}
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
          {user.email || '—'}
        </div>
      </div>
      <div className="hidden sm:block min-w-[110px]" onClick={stop}>
        {canEditRole && onChangeRole ? (
          <RoleEditor
            currentRole={role}
            disabled={savingRole}
            onChange={handleRoleChange}
          />
        ) : (
          <RolePill role={role} />
        )}
      </div>
      <div className="hidden md:block min-w-[120px] text-sm text-neutral-600 dark:text-neutral-400 truncate">
        {setor}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity" onClick={stop}>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(user) }}
            aria-label={`Desativar ${name}`}
            className="p-1.5 rounded-md text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.5 4h11M6 4V2.5h4V4M5 4l.5 9.5h5L11 4M6.5 7v4M9.5 7v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </li>
  )
}

const RoleEditor: React.FC<{
  currentRole: string | null
  disabled: boolean
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({ currentRole, disabled, onChange }) => {
  const upper = (currentRole ?? '').toUpperCase()
  const valueInEnum = (ROLE_VALUES as readonly string[]).includes(upper)
  return (
    <div className="relative inline-block">
      <RolePill role={currentRole} />
      <select
        value={valueInEnum ? upper : ''}
        disabled={disabled}
        onChange={onChange}
        aria-label="Alterar role do usuário"
        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-wait"
      >
        {!valueInEnum && <option value="" disabled>{currentRole ?? '—'}</option>}
        {ROLE_VALUES.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  )
}

const SkeletonRows: React.FC = () => (
  <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
    {[1, 2, 3, 4].map((i) => (
      <li key={i} className="px-6 py-3 flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-1/3" />
          <div className="h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded animate-pulse w-1/2" />
        </div>
        <div className="w-16 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
      </li>
    ))}
  </ul>
)

const EmptyState: React.FC<{
  query: string
  hasUsers: boolean
  onCreateUser?: () => void
}> = ({ query, hasUsers, onCreateUser }) => (
  <div className="px-6 py-16 text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-3">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8" />
      </svg>
    </div>
    {hasUsers && query ? (
      <>
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">Nenhum usuário corresponde à busca</p>
        <p className="text-xs text-neutral-500 mt-1">Tente outro termo ou limpe os filtros.</p>
      </>
    ) : (
      <>
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">Sua equipe está vazia</p>
        <p className="text-xs text-neutral-500 mt-1 mb-4">Crie o primeiro usuário ou convide alguém por email.</p>
        {onCreateUser && (
          <button
            type="button"
            onClick={onCreateUser}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium"
          >
            <span aria-hidden>+</span> Novo usuário
          </button>
        )}
      </>
    )}
  </div>
)
