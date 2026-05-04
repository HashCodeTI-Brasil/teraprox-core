import React, { useMemo, useState } from 'react'
import type { Setor } from '../types'

export interface SetorTableProps {
  setores: Setor[]
  isLoading?: boolean
  onEdit?: (setor: Setor) => void
  onDelete?: (setor: Setor) => void
  onCreate?: () => void
  /** Quantos usuários cada setor possui (lookup por id). Opcional. */
  userCountBySetorId?: Record<string | number, number>
  className?: string
}

/** Tabela de setores — mesma linguagem visual que UserTable. */
export const SetorTable: React.FC<SetorTableProps> = ({
  setores,
  isLoading = false,
  onEdit,
  onDelete,
  onCreate,
  userCountBySetorId,
  className = '',
}) => {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return setores
    return setores.filter((s) =>
      (s.nome ?? '').toLowerCase().includes(term) ||
      ((s as any).descricao ?? '').toLowerCase().includes(term)
    )
  }, [setores, search])

  return (
    <section
      className={`bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`}
    >
      <header className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Setores</h1>
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium"
          >
            <span aria-hidden>+</span> Novo setor
          </button>
        )}
      </header>

      <div className="px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar setor..."
          className="w-full h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
      </div>

      {isLoading ? (
        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {[1, 2, 3].map((i) => (
            <li key={i} className="px-6 py-3 space-y-2">
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-1/4" />
              <div className="h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded animate-pulse w-2/3" />
            </li>
          ))}
        </ul>
      ) : filtered.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
            {setores.length === 0 ? 'Nenhum setor cadastrado' : 'Nenhum setor corresponde à busca'}
          </p>
          {setores.length === 0 && onCreate && (
            <button
              type="button"
              onClick={onCreate}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium"
            >
              <span aria-hidden>+</span> Criar primeiro setor
            </button>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {filtered.map((s) => {
            const count = userCountBySetorId?.[s.id]
            return (
              <li
                key={s.id}
                className="group px-6 py-3 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-neutral-900 dark:text-neutral-50 truncate">
                    {s.nome}
                  </div>
                  {(s as any).descricao && (
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {(s as any).descricao}
                    </div>
                  )}
                </div>
                {typeof count === 'number' && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {count} {count === 1 ? 'usuário' : 'usuários'}
                  </span>
                )}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(s)}
                      aria-label={`Editar ${s.nome}`}
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
                      onClick={() => onDelete(s)}
                      aria-label={`Excluir ${s.nome}`}
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
          })}
        </ul>
      )}

      {!isLoading && filtered.length > 0 && (
        <footer className="px-6 py-2.5 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
          {filtered.length} de {setores.length} {setores.length === 1 ? 'setor' : 'setores'}
        </footer>
      )}
    </section>
  )
}
