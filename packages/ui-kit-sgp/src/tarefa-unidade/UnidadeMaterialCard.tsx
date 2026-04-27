// @ts-nocheck
// Migrado de teraprox-SGP-ordemDeCorrecao/src/Components/processo/UnidadeMaterialCard.tsx
// Wave 3B — puramente apresentacional (sem Redux / sem IO).
import { ReactNode } from 'react'
import { Button, Card, Col } from 'react-bootstrap'

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
    <Col xs={12}>
      <Card
        className="border-0 shadow-sm"
        style={{
          background: '#fff',
          borderRadius: '14px',
          overflow: 'hidden'
        }}
      >
        <Card.Body style={{ padding: '14px 16px' }}>
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div className="flex-grow-1">
              {header ? <div className="mb-2">{header}</div> : null}
              <div className="text-muted text-uppercase small mb-1">{indexLabel ?? 'Unidade material'}</div>
              <div className="fw-semibold" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
                {materialContent ?? materialLabel}
              </div>
            </div>
            <div
              style={{
                minWidth: 38,
                height: 38,
                borderRadius: 10,
                background: '#0d6efd14',
                color: '#0d6efd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              UM
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-3">
            <div className="px-3 py-2 rounded-3 flex-fill" style={{ background: '#f6f8fb', minWidth: 150 }}>
              <div className="text-muted text-uppercase small">Unidade</div>
              <div className="fw-semibold mt-1">
                {unidadeContent ?? unidadeLabel}
              </div>
            </div>
            <div className="px-3 py-2 rounded-3 flex-fill" style={{ background: '#f6f8fb', minWidth: 150 }}>
              <div className="text-muted text-uppercase small">Planejado</div>
              <div className="fw-semibold mt-1">
                {quantidadeContent ?? quantidadeLabel}
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-end flex-wrap mt-3">
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
        </Card.Body>
      </Card>
    </Col>
  )
}

export default UnidadeMaterialCard
