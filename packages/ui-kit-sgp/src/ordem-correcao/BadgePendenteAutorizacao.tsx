// Promovido de teraprox-SGP-ordemDeCorrecao/src/Components/processo/BadgePendenteAutorizacao.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Tom violeta/locked específico SGP-OC
// (cor `#6f42c1` fora dos tokens semânticos do ui-kit-core), portanto
// promovido como componente de domínio em vez de novo `tone` do Badge.
import * as React from 'react'
import { cn } from '@hashcodeti/ui-kit-core'

export interface BadgePendenteAutorizacaoProps {
  status?: string
  className?: string
}

export const BadgePendenteAutorizacao: React.FC<BadgePendenteAutorizacaoProps> = ({
  status,
  className,
}) => {
  if (status !== 'PENDENTE_AUTORIZACAO') return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full',
        'px-2.5 py-1 font-semibold uppercase tracking-wider',
        'text-[0.72rem] text-white',
        'bg-[#6f42c1]',
        className,
      )}
    >
      <span aria-hidden>🔒</span>
      Ag. Autorização
    </span>
  )
}

export default BadgePendenteAutorizacao
