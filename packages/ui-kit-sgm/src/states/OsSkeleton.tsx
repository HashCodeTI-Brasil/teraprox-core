// @hashcodeti/ui-kit-sgm/states/OsSkeleton
//
// Wave G.1 (2026-05-15) — promovido de teraprox-SGM-OS/Components/manutencao/OrdemDeServico/OsPlanejada/OsSkeleton.js.
// Skeleton específico do card de OS planejada (sentinela usado em listas virtuais
// enquanto fetch está em flight). Inclui também `OsEmpty` para o estado vazio
// canônico da tela de planejamento.
//
// Tailwind puro (zero react-bootstrap, zero CSS extra).

import * as React from 'react'

export interface OsSkeletonProps {
  className?: string
}

export const OsSkeleton: React.FC<OsSkeletonProps> = ({ className }) => (
  <div
    className={[
      'mb-2 rounded border border-l-4 border-surface-border border-l-neutral-200',
      'bg-white p-3 shadow-sm',
      className ?? '',
    ].join(' ')}
    aria-busy="true"
    aria-live="polite"
  >
    <div className="mb-2 h-3 w-1/2 rounded bg-neutral-200 animate-pulse" />
    <div className="mb-3 h-3 w-3/4 rounded bg-neutral-200 animate-pulse" />
    <div className="flex gap-2">
      <span className="h-3 w-12 rounded bg-neutral-200 animate-pulse" />
      <span className="h-3 w-12 rounded bg-neutral-200 animate-pulse" />
      <span className="h-3 w-16 rounded bg-neutral-200 animate-pulse" />
    </div>
  </div>
)

export interface OsEmptyProps {
  message?: string
}

export const OsEmpty: React.FC<OsEmptyProps> = ({
  message = 'Nenhuma OS para o período selecionado.',
}) => (
  <div className="text-center text-neutral-500 py-12">
    <div className="text-5xl" aria-hidden="true">
      🗓️
    </div>
    <div className="mt-2 text-sm">{message}</div>
  </div>
)
