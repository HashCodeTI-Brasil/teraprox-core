// @ts-nocheck
import React from 'react'
import { Button, Card, List, ListItem } from '@hashcodeti/ui-kit-core'
import { FaRegCommentDots } from 'react-icons/fa6'
import { UnidadeMaterialPicker } from './UnidadeMaterialPicker'

/**
 * TarefaCard — widget apresentacional migrado de SGM-OS
 * (Wave 2B da sprint 2026-04-21-ui-kit-domain-split-wave0).
 *
 * Diferenças vs. original:
 *   - Removido `useSelector(state => state.unidadeMaterial.form)`: o
 *     caller injeta `unidadeMaterial` como prop (tipicamente vindo do
 *     `useUnidadeMaterialViewModel` do core-sdk ou adjacente).
 *   - Removido `useCoreService()` que nunca era usado no render.
 *   - `InspecoesList` passa a ser injetado via prop `renderInspecoes`
 *     (slot), permitindo ao caller usar o componente legado sem que
 *     o widget conheça os imports.
 *   - Props do UnidadeMaterialPicker (handlers do form do ViewModel)
 *     são repassadas via `unidadeMaterialPickerProps`.
 */
export interface TarefaCardProps {
  tarefa: any
  posindex: number | string
  onlyView?: boolean
  removeTarefaClick: (sequencia: number | string) => void
  onSequenciaChange: (value: number | string) => void
  readOnlyMode?: boolean
  onUnidadesMateriaisChange: (tarefaId: any, ops: any[]) => void
  removed?: boolean
  /** Valor corrente do form de unidade-material (do ViewModel do caller). */
  unidadeMaterial?: any
  /** Render slot para a lista de inspeções (ex: `InspecoesList` do app). */
  renderInspecoes?: (inspecoes: any[]) => React.ReactNode
  /** Props extras para o UnidadeMaterialPicker aninhado (handlers do form). */
  unidadeMaterialPickerProps?: Partial<
    React.ComponentProps<typeof UnidadeMaterialPicker>
  >
}

export const TarefaCard: React.FC<TarefaCardProps> = ({
  tarefa,
  posindex,
  onlyView,
  removeTarefaClick,
  onSequenciaChange,
  readOnlyMode,
  onUnidadesMateriaisChange,
  removed,
  unidadeMaterial,
  renderInspecoes,
  unidadeMaterialPickerProps,
}) => {
  const ordem = tarefa?.sequencia ?? posindex

  const remove = () => {
    removeTarefaClick(tarefa.sequencia)
  }

  const materialDisplay = (material: string) => ` ${material} `
  const unidadeDisplay = (unidade: string) => `${unidade} `

  const conditionalActionButton = () => {
    if (tarefa.status !== 'PENDENTE') {
      return (
        <Button disabled variant="secondary">
          Tarefa Concluída
        </Button>
      )
    }
    return (
      <Button variant="danger" onClick={() => remove()}>
        Remover
      </Button>
    )
  }

  return (
    <Card style={{ margin: 12 }} key={`${posindex}${tarefa.sequencia}`}>
      <Card.Header>
        <div className="flex justify-between items-center gap-2 w-full">
          <strong>{`Ordem: ${ordem}`}</strong>
          {!onlyView && conditionalActionButton()}
        </div>
      </Card.Header>
      <Card.Body>
        <List>
          <ListItem>
            <strong>A realizar:</strong>{' '}
            {`${
              tarefa?.modelIdentifier
                ? tarefa?.modelIdentifier
                : tarefa?.acao?.nome
            } - ${tarefa?.acao?.descricao}`}
          </ListItem>
          {tarefa.unidadesMateriais && (
            <ListItem>
              <strong>Material Nescessario:</strong>

              {tarefa.unidadesMateriais && tarefa.status !== 'ENCERRADO' ? (
                !readOnlyMode &&
                !onlyView && (
                  <UnidadeMaterialPicker
                    onBuild={(setView) => setView(true)}
                    displayButtonName={'Adicionar Material'}
                    displayName="Unidade Material"
                    saveOptions={(pi, i, ops) =>
                      onUnidadesMateriaisChange(tarefa.__id, ops)
                    }
                    formatationFunc={(um: any) =>
                      `${um.quantidade} ${
                        um.unidade?.label || um.labelUnidade
                      } de ${
                        um?.material?.nome ||
                        um?.materialNome ||
                        um?.nomeMaterial
                      } `
                    }
                    opsSelected={tarefa?.unidadesMateriais?.filter(
                      (um: any) => !um.removed,
                    )}
                    outOption={unidadeMaterial}
                    hideOptions={false}
                    onOptionDelete={(pi, i, ops) =>
                      onUnidadesMateriaisChange(tarefa.__id, [
                        ...ops,
                        { ...pi, removed: true },
                      ])
                    }
                    {...unidadeMaterialPickerProps}
                  />
                )
              ) : (
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  {tarefa.unidadesMateriais &&
                    tarefa.unidadesMateriais.map((uM: any, idx: number) => (
                      <li key={idx}>
                        {materialDisplay(uM.nomeMaterial)}
                        {uM.quantidade}
                        {unidadeDisplay(uM.labelUnidade)}
                      </li>
                    ))}
                </ol>
              )}
            </ListItem>
          )}
          {tarefa.inspecoes && (
            <ListItem>
              <strong>Inspeções:</strong>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                {tarefa.inspecoes && renderInspecoes
                  ? renderInspecoes(tarefa.inspecoes)
                  : null}
              </ol>
            </ListItem>
          )}
          {tarefa?.tarefaJustificativas?.length > 0 && (
            <ListItem>
              <FaRegCommentDots size={20} />{' '}
              {
                tarefa.tarefaJustificativas[
                  tarefa.tarefaJustificativas.length - 1
                ].descricao
              }
            </ListItem>
          )}
        </List>
      </Card.Body>
    </Card>
  )
}

export default TarefaCard
