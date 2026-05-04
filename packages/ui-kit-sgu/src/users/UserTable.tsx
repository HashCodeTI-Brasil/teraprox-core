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
  /** Show breadcrumb/subtitle next to title */
  subtitle?: string
  className?: string
}

type RoleFilter = RoleValue | 'ALL'

const fullName = (u: User): string => {
  const derived = u._fullName ?? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()
  return derived || u.email || '—'
}

const userRole = (u: User): RoleValue | null => {
  // o backend pode armazenar role como string em u.role OU como objeto via userRole.roleId
  const raw = (u as any).role ?? (u as any).userRole?.role ?? null
  if (typeof raw !== 'string') return null
  const upper = raw.toUpperCase() as RoleValue
  return (ROLE_VALUES as readonly string[]).includes(upper) ? upper : null
}

const userSetorName = (u: User): string => {
  return (u as any).setor ?? (u as any).userSetor?.setor ?? '—'
}

/** Tabela densa estilo Linear/Notion — toolbar embedded + empty state + role filter pills. */
export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading = false,
  onEditUser,
  onDeleteUser,
  onCreateUser,
  onInviteByEmail,
  subtitle,
  className = '',
}) => {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return users.filter((u) => {
      if (roleFilter !== 'ALL' && userRole(u) !== roleFilter) return false
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
}> = ({ user, onEdit, onDelete }) => {
  const name = fullName(user)
  const role = userRole(user)
  const setor = userSetorName(user)
  const active = (user as any).active ?? true

  return (
    <li className="group px-6 py-3 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
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
      <div className="hidden sm:block min-w-[110px]">
        <RolePill role={role} />
      </div>
      <div className="hidden md:block min-w-[120px] text-sm text-neutral-600 dark:text-neutral-400 truncate">
        {setor}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(user)}
            aria-label={`Editar ${name}`}
            className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 1.5L14.5 5l-9 9H2v-3.5l9-9z" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(user)}
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
