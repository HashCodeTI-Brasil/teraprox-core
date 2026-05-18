// @ts-nocheck
// Migrado de teraprox-SGP-ordemDeCorrecao/src/Components/processo/UnidadeMaterialCard.tsx
// Wave 3B — puramente apresentacional (sem Redux / sem IO).
// Wave F.2.A — react-bootstrap removido. Migrado para ui-kit-core (Card/Button) + Tailwind.
import { ReactNode } from 'react'
import { Button, Card, CardBody } from '@hashcodeti/ui-kit-core'

export interface UnidadeMaterialVM {
  nomeMaterial?: string
  unidadeLabel?: string
  quantidade?: number | string
  materialId?: string | number | null
  unidadeId?: string | number | null
  nomeUnidade?: string
  fatorSiUnidade?: number
  unidadeBaseSi?: string
}

export interface TarefaUnidadeMaterialVM {
  unidadeMaterial?: UnidadeMaterialVM
  [key: string]: any
}

export interface UnidadeMaterialCardProps {
  tarefaUnidadeMaterial: TarefaUnidadeMaterialVM
  onRemoveClick?: (tum: TarefaUnidadeMaterialVM) => void
  onEditClick?: (tum: TarefaUnidadeMaterialVM) => void
  header?: ReactNode
  materialContent?: ReactNode
  unidadeContent?: ReactNode
  quantidadeContent?: ReactNode
  actions?: ReactNode
  indexLabel?: ReactNode
}

export const UnidadeMaterialCard = ({
  onRemoveClick,
  onEditClick,
  tarefaUnidadeMaterial,
  header,
  materialContent,
  unidadeContent,
  quantidadeContent,
  actions,
  indexLabel,
}: UnidadeMaterialCardProps) => {
  const materialLabel = tarefaUnidadeMaterial?.unidadeMaterial?.nomeMaterial ?? '-'
  const unidadeLabel = tarefaUnidadeMaterial?.unidadeMaterial?.unidadeLabel ?? '-'
  const quantidadeLabel = tarefaUnidadeMaterial?.unidadeMaterial?.quantidade ?? '-'

  return (
    <div className="w-full">
      <Card
        className="border-0 shadow-sm bg-white overflow-hidden"
        style={{ borderRadius: '14px' }}
      >
        <CardBody style={{ padding: '14px 16px' }}>
          <div className="flex justify-between items-start gap-3">
            <div className="flex-grow">
              {header ? <div className="mb-2">{header}</div> : null}
              <div className="text-neutral-500 uppercase text-xs mb-1">
                {indexLabel ?? 'Unidade material'}
              </div>
              <div className="font-semibold leading-tight text-base">
                {materialContent ?? materialLabel}
              </div>
            </div>
            <div
              className="flex items-center justify-center font-bold text-sm"
              style={{
                minWidth: 38,
                height: 38,
                borderRadius: 10,
                background: '#0d6efd14',
                color: '#0d6efd',
              }}
            >
              UM
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <div
              className="px-3 py-2 rounded flex-1"
              style={{ background: '#f6f8fb', minWidth: 150 }}
            >
              <div className="text-neutral-500 uppercase text-xs">Unidade</div>
              <div className="font-semibold mt-1">
                {unidadeContent ?? unidadeLabel}
              </div>
            </div>
            <div
              className="px-3 py-2 rounded flex-1"
              style={{ background: '#f6f8fb', minWidth: 150 }}
            >
              <div className="text-neutral-500 uppercase text-xs">Planejado</div>
              <div className="font-semibold mt-1">
                {quantidadeContent ?? quantidadeLabel}
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end flex-wrap mt-3">
            {actions ?? (
              <>
                {onEditClick && (
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => onEditClick(tarefaUnidadeMaterial)}
                  >
                    Editar
                  </Button>
                )}
                {onRemoveClick && (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onRemoveClick(tarefaUnidadeMaterial)}
                  >
                    Remover
                  </Button>
                )}
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default UnidadeMaterialCard
