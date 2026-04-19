// @ts-nocheck
import React, { useState } from 'react'
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  ListGroup,
} from 'react-bootstrap'
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
  const [actualState, setActualState] = useState(tarefa.sequencia)

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
        <InputGroup>
          <InputGroup.Text>Nº</InputGroup.Text>
          <FormControl
            disabled={onlyView}
            type="number"
            min={1}
            style={{ maxWidth: '10%', textAlign: 'center' }}
            value={actualState}
            onBlur={(event: any) => onSequenciaChange(event.target.value)}
            onChangeCapture={(event: any) =>
              setActualState(event.target.value)
            }
          />

          {!onlyView && conditionalActionButton()}
        </InputGroup>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>
            <strong>A realizar:</strong>{' '}
            {`${
              tarefa?.modelIdentifier
                ? tarefa?.modelIdentifier
                : tarefa?.acao?.nome
            } - ${tarefa?.acao?.descricao}`}
          </ListGroup.Item>
          {tarefa.unidadesMateriais && (
            <ListGroup.Item>
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
                <ListGroup as="ol" numbered>
                  {tarefa.unidadesMateriais &&
                    tarefa.unidadesMateriais.map((uM: any, idx: number) => (
                      <ListGroup.Item key={idx}>
                        {materialDisplay(uM.nomeMaterial)}
                        {uM.quantidade}
                        {unidadeDisplay(uM.labelUnidade)}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          )}
          {tarefa.inspecoes && (
            <ListGroup.Item>
              <strong>Inspeções:</strong>
              <ListGroup as="ol" numbered>
                {tarefa.inspecoes && renderInspecoes
                  ? renderInspecoes(tarefa.inspecoes)
                  : null}
              </ListGroup>
            </ListGroup.Item>
          )}
          {tarefa?.tarefaJustificativas?.length > 0 && (
            <ListGroup.Item>
              <FaRegCommentDots size={20} />{' '}
              {
                tarefa.tarefaJustificativas[
                  tarefa.tarefaJustificativas.length - 1
                ].descricao
              }
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default TarefaCard
