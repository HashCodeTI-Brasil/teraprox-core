// @ts-nocheck
// Promovido de teraprox-SGP-ordemDeCorrecao/src/Components/processo/TarefaCard.tsx
// Wave E.2.1 — Refator Redux fraco -> props injetadas:
//   - useSelector(state.unidadeMaterial?.form) -> prop `unidadeMaterial`
//   - useDispatch(clearUnidadeMaterial()) -> callback `onClearUnidadeMaterial`
//   - dispatch(removeTarefa) / dispatch(undoRemoveTarefa) -> `onRemove` / `onUndoRemove`
// O modal de adicionar material (ModalBasicTemplate + UnidadeMaterialForm)
// foi movido para render-prop `renderUnidadeMaterialModal` que o caller injeta,
// preservando a UX original sem trazer dependencia de teraprox-ui-kit aqui.
//
// Wave F.2.A — react-bootstrap removido. Migrado para ui-kit-core (Card/Button) + Tailwind.
// O render-prop `renderUnidadeMaterialModal` continua sob controle do caller (sem mudanca de API).
import React, { useState } from 'react'
import { Button, Card, CardBody } from '@hashcodeti/ui-kit-core'
import { UnidadeMaterialCard } from '../tarefa-unidade/UnidadeMaterialCard'

export interface UnidadeMaterialFormVM {
  material?: { id?: any; nome?: string }
  unidade?: { id?: any; nome?: string; label?: string; fatorSi?: number; unidadeBaseSi?: string }
  quantidade?: number | string
  [key: string]: any
}

export interface TarefaCardProps {
  tarefa: any
  tIdx: number
  totalTarefas: number
  onEdit: (tarefa: any) => void
  onMove: (from: number, to: number) => void
  onRemoveMaterial?: (...args: any[]) => void
  onAddMaterial?: (tIdx: number, novoMaterial: any) => void
  onRemove?: (tIdx: number) => void
  onUndoRemove?: (tIdx: number) => void
  /** Estado do form de unidade material (vem do store no caller). */
  unidadeMaterial?: UnidadeMaterialFormVM
  /** Limpar form do unidadeMaterial (dispatch no caller). */
  onClearUnidadeMaterial?: () => void
  /** Render do modal de adicionar material — caller injeta usando seu UnidadeMaterialForm/Modal. */
  renderUnidadeMaterialModal?: (args: {
    show: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
  }) => React.ReactNode
}

const statusBadgeStyle = (status: string) => {
  const palette: Record<string, { backgroundColor: string; color: string }> = {
    PENDENTE: { backgroundColor: '#f2994a', color: '#212529' },
    CONCLUIDO: { backgroundColor: '#27ae60', color: '#fff' },
  }
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.35rem 0.75rem',
    borderRadius: '999px',
    fontWeight: 600,
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    ...(palette[(status || '').toUpperCase()] || { backgroundColor: '#6c757d', color: '#fff' }),
  }
}

export const TarefaCard = ({
  tarefa,
  tIdx,
  totalTarefas,
  onEdit,
  onMove,
  onRemoveMaterial,
  onAddMaterial,
  onRemove,
  onUndoRemove,
  unidadeMaterial,
  onClearUnidadeMaterial,
  renderUnidadeMaterialModal,
}: TarefaCardProps) => {
  const [showUnidadeModal, setShowUnidadeModal] = useState<boolean>(false)

  const handleAddMaterialToTarefa = () => {
    const novoMaterial = {
      unidadeMaterial: {
        nomeMaterial: unidadeMaterial?.material?.nome || '',
        unidadeLabel: unidadeMaterial?.unidade?.nome || unidadeMaterial?.unidade?.label || '',
        quantidade: unidadeMaterial?.quantidade || 0,
        materialId: unidadeMaterial?.material?.id || null,
        unidadeId: unidadeMaterial?.unidade?.id,
        nomeUnidade: unidadeMaterial?.unidade?.nome || unidadeMaterial?.unidade?.label || '',
        fatorSiUnidade: unidadeMaterial?.unidade?.fatorSi || 1,
        unidadeBaseSi: unidadeMaterial?.unidade?.unidadeBaseSi || '',
      },
    }
    if (onAddMaterial) onAddMaterial(tIdx, novoMaterial)
    onClearUnidadeMaterial?.()
    setShowUnidadeModal(false)
  }

  const handleCancelModal = () => {
    onClearUnidadeMaterial?.()
    setShowUnidadeModal(false)
  }

  return (
    <Card
      className="mb-3 shadow-sm"
      style={{
        borderRadius: 12,
        border: '1px solid #e3e6eb',
        background: '#f8f9fb',
        opacity: tarefa.removed ? 0.5 : 1,
      }}
    >
      <CardBody className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-3">
          <div className="flex items-start flex-grow w-full mb-3 md:mb-0">
            <div
              className="mr-3 flex items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground flex-shrink-0"
              style={{ width: 32, height: 32, fontWeight: 600 }}
            >
              {tIdx + 1}
            </div>
            <div className="flex-grow">
              <div className="font-semibold mb-1 break-words">
                {tarefa.descricao || 'Ação não informada'}
              </div>
              {tarefa.acao && (
                <div className="text-neutral-500 text-xs">
                  {tarefa.acao.nome || tarefa.acao.descricao}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end w-full md:w-auto md:pl-3">
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={tIdx === 0}
              onClick={() => onMove(tIdx, tIdx - 1)}
              title="Mover para cima"
            >
              ↑
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={tIdx === totalTarefas - 1}
              onClick={() => onMove(tIdx, tIdx + 1)}
              title="Mover para baixo"
            >
              ↓
            </Button>
            {tarefa.removed ? (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => onUndoRemove?.(tIdx)}
              >
                Desfazer
              </Button>
            ) : (
              <>
                <span className="hidden sm:inline-block text-xs px-2 py-1 rounded bg-neutral-100 text-neutral-800">
                  Materiais: {tarefa.tarefasUnidadeMaterial?.length || 0}
                </span>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => setShowUnidadeModal(true)}
                  title="Adicionar Material"
                  className="flex-grow md:flex-grow-0"
                >
                  <span className="hidden sm:inline">+ Material</span>
                  <span className="inline sm:hidden">+ Mat.</span>
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit({ ...tarefa, tIdx })}
                  className="flex-grow md:flex-grow-0"
                >
                  Editar
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemove?.(tIdx)}
                  className="flex-grow md:flex-grow-0"
                >
                  Remover
                </Button>
              </>
            )}
          </div>
        </div>

        {tarefa?.status && (
          <span style={statusBadgeStyle(tarefa.status)} title="Status da Tarefa">
            {(tarefa.status || '').toUpperCase()}
          </span>
        )}
        <hr className="my-3 border-neutral-200" />
        <div className="flex flex-col gap-3">
          {(tarefa.tarefasUnidadeMaterial || [])
            .filter((tUm: any) => !tUm.removed)
            .map((tUm: any, tumIdx: number) => (
              <UnidadeMaterialCard
                key={`material-${tIdx}-${tumIdx}`}
                tarefaUnidadeMaterial={{ ...tUm, tIdx, tumIdx }}
                onRemoveClick={onRemoveMaterial}
              />
            ))}
        </div>
      </CardBody>

      {renderUnidadeMaterialModal?.({
        show: showUnidadeModal,
        onClose: handleCancelModal,
        onConfirm: handleAddMaterialToTarefa,
        title: `Adicionar Material - Tarefa ${tIdx + 1}`,
      })}
    </Card>
  )
}

export default TarefaCard
