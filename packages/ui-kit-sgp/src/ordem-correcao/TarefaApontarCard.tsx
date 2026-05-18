// Promovido de teraprox-SGP-ordemDeCorrecao/src/Components/processo/TarefaApontarCard.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. react-bootstrap removido; inline styles
// e handlers de hover migrados para Tailwind. Form.Check substituído por
// <input type="checkbox"> Tailwind. MaterialApontarCard re-usado do mesmo
// pacote.
import * as React from 'react'
import { Card, CardBody, cn } from '@hashcodeti/ui-kit-core'
import {
  MaterialApontarCard,
  type MaterialApontarTumVM,
} from './MaterialApontarCard'

export interface TarefaApontarVM {
  sequencia: number | string
  descricao: string
  status?: string
  tarefasUnidadeMaterial: MaterialApontarTumVM[]
}

export interface TarefaApontarCardProps {
  tarefa: TarefaApontarVM
  tarefaIdx: number
  onStatusChange: (tarefaIdx: number, checked: boolean) => void
  onInputChange: (tarefaIdx: number, tumIdx: number, valor: string) => void
  /**
   * Style da badge de status (palette inline definida pelo caller para parity
   * visual com OrdemDeCorrecaoCard). Caller pode reutilizar `badgeStyleForStatus`.
   */
  getStatusStyle: (status: string) => React.CSSProperties
}

export const TarefaApontarCard: React.FC<TarefaApontarCardProps> = ({
  tarefa,
  tarefaIdx,
  onStatusChange,
  onInputChange,
  getStatusStyle,
}) => {
  const status = (tarefa.status || 'PENDENTE').toUpperCase()
  const isConcluido = status === 'CONCLUIDO'

  return (
    <Card
      className={cn(
        'border-2 border-neutral-200 rounded-xl bg-white shadow-sm',
        'transition-all duration-300',
        'hover:border-brand-primary hover:shadow-lg hover:-translate-y-px',
      )}
    >
      <CardBody className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center bg-success text-white px-3 py-1 rounded-full font-bold text-xs tracking-wider">
            #{tarefa.sequencia}
          </span>
          <h5 className="m-0 text-lg font-semibold">
            <span aria-hidden>📋 </span>
            {tarefa.descricao}
          </h5>
        </div>

        <div className="flex justify-between items-center mb-3 p-3 rounded-lg bg-neutral-100 border border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden>
              {isConcluido ? '✅' : '⏳'}
            </span>
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase"
              style={getStatusStyle(tarefa.status || 'PENDENTE')}
            >
              {status}
            </span>
          </div>
          <label className="flex items-center gap-2 m-0 text-sm font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-400 text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-accent"
              checked={isConcluido}
              onChange={(event) => onStatusChange(tarefaIdx, event.target.checked)}
            />
            Marcar como Concluída
          </label>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-neutral-500 text-lg" aria-hidden>📦</span>
            <h6 className="m-0 text-neutral-500 uppercase font-bold text-xs tracking-widest">
              Materiais ({tarefa.tarefasUnidadeMaterial.length})
            </h6>
          </div>

          <div className="grid grid-cols-12 gap-2">
            {tarefa.tarefasUnidadeMaterial.map((tum, tumIdx) => (
              <MaterialApontarCard
                key={tumIdx}
                tum={tum}
                tarefaIdx={tarefaIdx}
                tumIdx={tumIdx}
                onInputChange={onInputChange}
              />
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default TarefaApontarCard
