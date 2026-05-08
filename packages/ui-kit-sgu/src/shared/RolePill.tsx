import React from 'react'

export type RoleValue = 'OWNER' | 'DEV' | 'ADMIN' | 'USER' | 'PLANNER' | 'EXECUTIONER'

export const ROLE_VALUES: ReadonlyArray<RoleValue> = ['OWNER', 'DEV', 'ADMIN', 'PLANNER', 'EXECUTIONER', 'USER']

const STYLE: Record<RoleValue, string> = {
  OWNER: 'bg-amber-100 text-amber-900 ring-amber-200',
  DEV: 'bg-rose-100 text-rose-900 ring-rose-200',
  ADMIN: 'bg-violet-100 text-violet-900 ring-violet-200',
  USER: 'bg-neutral-100 text-neutral-700 ring-neutral-200',
  PLANNER: 'bg-sky-100 text-sky-900 ring-sky-200',
  EXECUTIONER: 'bg-emerald-100 text-emerald-900 ring-emerald-200',
}

const LABEL: Record<RoleValue, string> = {
  OWNER: 'Owner',
  DEV: 'Dev',
  ADMIN: 'Admin',
  USER: 'User',
  PLANNER: 'Planner',
  EXECUTIONER: 'Executioner',
}

export interface RolePillProps {
  role: string | null | undefined
  size?: 'xs' | 'sm'
}

const SIZE = {
  xs: 'text-[10px] px-1.5 py-0.5',
  sm: 'text-xs px-2 py-0.5',
} as const

export const RolePill: React.FC<RolePillProps> = ({ role, size = 'sm' }) => {
  const raw = (role ?? '').trim()
  if (!raw) {
    return (
      <span className={`inline-flex items-center rounded-md ring-1 ring-inset ring-neutral-200 bg-neutral-50 text-neutral-500 font-medium ${SIZE[size]}`}>
        —
      </span>
    )
  }
  const upper = raw.toUpperCase() as RoleValue
  const isKnown = (ROLE_VALUES as readonly string[]).includes(upper)
  if (!isKnown) {
    return (
      <span className={`inline-flex items-center rounded-md ring-1 ring-inset ring-neutral-200 bg-neutral-100 text-neutral-700 font-medium ${SIZE[size]}`}>
        {raw}
      </span>
    )
  }
  return (
    <span className={`inline-flex items-center rounded-md ring-1 ring-inset font-medium ${STYLE[upper]} ${SIZE[size]}`}>
      {LABEL[upper]}
    </span>
  )
}
