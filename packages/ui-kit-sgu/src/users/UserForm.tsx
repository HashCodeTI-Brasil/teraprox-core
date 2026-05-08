import React, { useEffect, useMemo, useState } from 'react'
import { ROLE_VALUES, type RoleValue } from '../shared/RolePill'
import type { Setor, User } from '../types'

export interface UserFormValues {
  firstName: string
  lastName: string
  email: string
  contact?: string
  role?: RoleValue | null
  setorId?: number | string | null
  active?: boolean
}

export interface UserFormProps {
  initialUser?: User | null
  setores?: Setor[]
  mode?: 'create' | 'edit' | 'auto'
  onSubmit: (values: UserFormValues) => void
  onCancel?: () => void
  onDelete?: (user: User) => void
  errorMessage?: string | null
  disabled?: boolean
  /** Quando false, o select de role fica somente-leitura (default true). */
  canEditRole?: boolean
  className?: string
}

const ROLE_LABEL: Record<RoleValue, string> = {
  OWNER: 'Owner — proprietário da empresa',
  DEV: 'Dev — superadmin (suporte/billing)',
  ADMIN: 'Admin — administrador',
  USER: 'User — acesso padrão',
  PLANNER: 'Planner — planejamento',
  EXECUTIONER: 'Executioner — execução em campo',
}

const extractRole = (u?: User | null): RoleValue | null => {
  const raw =
    (u as any)?.role ??
    (u as any)?.userRoles?.[0]?.role ??
    (u as any)?.userRole?.role ??
    null
  if (typeof raw !== 'string') return null
  const upper = raw.toUpperCase() as RoleValue
  return (ROLE_VALUES as readonly string[]).includes(upper) ? upper : null
}

const inputCls =
  'h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10 disabled:opacity-50'

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({
  label,
  required,
  children,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
)

/** Form de usuário — role é enum string fixo (5 valores), setor é select. */
export const UserForm: React.FC<UserFormProps> = ({
  initialUser,
  setores = [],
  mode = 'auto',
  onSubmit,
  onCancel,
  onDelete,
  errorMessage,
  disabled = false,
  canEditRole = true,
  className = '',
}) => {
  const isEdit = mode === 'edit' || (mode === 'auto' && !!initialUser)

  const [values, setValues] = useState<UserFormValues>(() => ({
    firstName: initialUser?.firstName ?? '',
    lastName: initialUser?.lastName ?? '',
    email: initialUser?.email ?? '',
    contact: initialUser?.contact ?? '',
    role: extractRole(initialUser),
    setorId: initialUser?.userSetor?.setorId ?? null,
    active: initialUser?.active ?? true,
  }))

  useEffect(() => {
    if (!initialUser) return
    setValues({
      firstName: initialUser.firstName ?? '',
      lastName: initialUser.lastName ?? '',
      email: initialUser.email ?? '',
      contact: initialUser.contact ?? '',
      role: extractRole(initialUser),
      setorId: initialUser.userSetor?.setorId ?? null,
      active: initialUser.active ?? true,
    })
  }, [initialUser])

  const isValid = useMemo(
    () =>
      values.firstName.trim().length > 0 &&
      values.lastName.trim().length > 0 &&
      /\S+@\S+\.\S+/.test(values.email),
    [values]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || disabled) return
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Nome" required>
          <input
            type="text"
            value={values.firstName}
            disabled={disabled}
            onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Sobrenome" required>
          <input
            type="text"
            value={values.lastName}
            disabled={disabled}
            onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            value={values.email}
            disabled={disabled || isEdit}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Contato">
          <input
            type="text"
            value={values.contact ?? ''}
            disabled={disabled}
            onChange={(e) => setValues((v) => ({ ...v, contact: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Role">
          <select
            value={values.role ?? ''}
            disabled={disabled || !canEditRole}
            title={!canEditRole ? 'Apenas Owner, Dev e Admin podem alterar role.' : undefined}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                role: e.target.value === '' ? null : (e.target.value as RoleValue),
              }))
            }
            className={inputCls}
          >
            <option value="">— sem role —</option>
            {ROLE_VALUES.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABEL[r]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Setor">
          <select
            value={values.setorId ?? ''}
            disabled={disabled}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                setorId: e.target.value === '' ? null : e.target.value,
              }))
            }
            className={inputCls}
          >
            <option value="">— sem setor —</option>
            {setores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!values.active}
          disabled={disabled}
          onChange={(e) => setValues((v) => ({ ...v, active: e.target.checked }))}
        />
        <span className="text-neutral-700 dark:text-neutral-300">Usuário ativo</span>
      </label>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <div className="flex justify-between items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <div>
          {isEdit && onDelete && initialUser && (
            <button
              type="button"
              onClick={() => onDelete(initialUser)}
              disabled={disabled}
              className="px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              Desativar usuário
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={disabled}
              className="px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={!isValid || disabled}
            className="px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium disabled:opacity-50"
          >
            {isEdit ? 'Salvar' : 'Criar usuário'}
          </button>
        </div>
      </div>
    </form>
  )
}
