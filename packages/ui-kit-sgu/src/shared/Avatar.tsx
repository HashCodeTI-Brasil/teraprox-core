import React from 'react'

const PALETTE = [
  'bg-amber-200 text-amber-900',
  'bg-violet-200 text-violet-900',
  'bg-sky-200 text-sky-900',
  'bg-emerald-200 text-emerald-900',
  'bg-rose-200 text-rose-900',
  'bg-fuchsia-200 text-fuchsia-900',
  'bg-cyan-200 text-cyan-900',
  'bg-lime-200 text-lime-900',
] as const

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
}

export interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
} as const

/** Avatar com iniciais e cor estável derivada do nome. */
export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md' }) => {
  const color = PALETTE[hash(name) % PALETTE.length]!
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-semibold ${SIZE[size]} ${color}`}
      aria-hidden
    >
      {initials(name)}
    </span>
  )
}
