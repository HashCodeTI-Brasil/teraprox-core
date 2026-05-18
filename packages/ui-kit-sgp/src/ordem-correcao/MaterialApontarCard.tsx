// Promovido de teraprox-SGP-ordemDeCorrecao/src/Components/processo/MaterialApontarCard.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. react-bootstrap removido; inline styles
// migrados para Tailwind. FormField (teraprox-ui-kit) substituído por
// TextField do @hashcodeti/ui-kit-core.
import * as React from 'react'
import { Card, CardBody, TextField } from '@hashcodeti/ui-kit-core'

export interface MaterialApontarUnidadeMaterialVM {
  nomeMaterial: string
  unidadeLabel: string
  quantidade: number | string
}

export interface MaterialApontarTumVM {
  unidadeMaterial: MaterialApontarUnidadeMaterialVM
  quantidade?: number | string
}

export interface MaterialApontarCardProps {
  tum: MaterialApontarTumVM
  tarefaIdx: number
  tumIdx: number
  onInputChange: (tarefaIdx: number, tumIdx: number, valor: string) => void
}

export const MaterialApontarCard: React.FC<MaterialApontarCardProps> = ({
  tum,
  tarefaIdx,
  tumIdx,
  onInputChange,
}) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
      <Card className="h-full border border-neutral-200 rounded-lg bg-neutral-50/50 shadow-sm">
        <CardBody className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-info text-base" aria-hidden>
              🏷️
            </span>
            <h5 className="m-0 text-base text-neutral-800 font-medium">
              {tum.unidadeMaterial.nomeMaterial}
            </h5>
          </div>

          <div className="flex flex-col gap-1 mb-3 p-2 rounded-md bg-neutral-100">
            <div className="flex items-center gap-2">
              <span className="text-success" aria-hidden>📏</span>
              <small className="text-neutral-500 font-bold uppercase text-[0.7rem]">
                Unidade:
              </small>
              <span className="text-neutral-800 font-semibold text-sm">
                {tum.unidadeMaterial.unidadeLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-warning" aria-hidden>📊</span>
              <small className="text-neutral-500 font-bold uppercase text-[0.7rem]">
                Qtd. Planejada:
              </small>
              <span className="text-neutral-800 font-semibold text-sm">
                {tum.unidadeMaterial.quantidade}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <TextField
              label="✏️ Quantidade Apontada"
              placeholder="Digite a quantidade apontada"
              value={tum.quantidade ?? ''}
              onChange={(event) =>
                onInputChange(tarefaIdx, tumIdx, event.target.value)
              }
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default MaterialApontarCard
