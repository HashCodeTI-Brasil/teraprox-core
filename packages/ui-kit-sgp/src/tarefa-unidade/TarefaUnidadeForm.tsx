// @ts-nocheck
// Migrado de teraprox-SGP-ordemDeCorrecao/src/Components/processo/TarefaUnidadeForm.tsx
// Wave 3B — props-driven.
//
// Mudancas em relacao ao original:
//  - Redux removido. O caller (SGP-*) continua dono do estado do sub-form
//    de UnidadeMaterial e injeta:
//      - `unidadeMaterial` (valor atual),
//      - `onClearUnidadeMaterial()`,
//      - `onLoadTumForEdit(tum)`   -> pre-popula o sub-form,
//      - `renderUnidadeMaterialForm()` -> slot para o `<UnidadeMaterialForm />`
//        real (seja do teraprox-ui-kit legado ou um proprio).
//  - `useCoreService` removido. O caller injeta `loadAcoes()` — uma funcao
//    assincrona que retorna a lista de acoes disponiveis para o AutoComplete.
//  - `UnidadeMaterialCard` segue vindo do proprio ui-kit-sgp.
//  - Zero spread `{...props}` em DOM.

import { ReactNode, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { AutoComplete } from 'teraprox-ui-kit'
import { UnidadeMaterialCard, TarefaUnidadeMaterialVM } from './UnidadeMaterialCard'

export interface UnidadeMaterialFormValue {
  material?: { id?: any; nome?: string }
  unidade?: { id?: any; nome?: string; label?: string; fatorSi?: number; unidadeBaseSi?: string }
  quantidade?: number
}

export interface AcaoOption {
  id?: any
  nome?: string
  descricao?: string
}

export interface TarefaFormVM {
  acaoId?: any
  descricao?: string
  status?: string
  acao?: AcaoOption | null
  tarefasUnidadeMaterial?: TarefaUnidadeMaterialVM[]
  [key: string]: any
}

export interface TarefaUnidadeFormProps {
  tarefaForm?: TarefaFormVM
  onSaveForm?: (form: TarefaFormVM) => void
  onCancelEdit?: () => void
  /** Valor corrente do sub-form de unidade material (controlado pelo caller). */
  unidadeMaterial?: UnidadeMaterialFormValue
  /** Limpa o sub-form (normalmente dispatch do reducer externo). */
  onClearUnidadeMaterial?: () => void
  /** Pre-popula o sub-form com base no TarefaUnidadeMaterial que vai ser editado. */
  onLoadTumForEdit?: (tum: TarefaUnidadeMaterialVM) => void
  /** Slot render do sub-form real de UnidadeMaterial (ex.: UnidadeMaterialForm do teraprox-ui-kit). */
  renderUnidadeMaterialForm?: () => ReactNode
  /** Carrega as opcoes de Acao para o AutoComplete (ex.: `() => controller('acao', endPointCaderno).get('acao')`). */
  loadAcoes: () => Promise<AcaoOption[]>
}

const emptyForm = (): TarefaFormVM => ({
  acaoId: '',
  descricao: '',
  status: 'PENDENTE',
  acao: null,
  tarefasUnidadeMaterial: [],
})

export const TarefaUnidadeForm = ({
  tarefaForm: initialTarefaForm,
  onSaveForm,
  onCancelEdit,
  unidadeMaterial,
  onClearUnidadeMaterial,
  onLoadTumForEdit,
  renderUnidadeMaterialForm,
  loadAcoes,
}: TarefaUnidadeFormProps) => {
  const [tarefaForm, setTarefaForm] = useState<TarefaFormVM>(
    initialTarefaForm || emptyForm(),
  )
  const [showTumForm, setShowTumForm] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  useEffect(() => {
    if (initialTarefaForm) setTarefaForm(initialTarefaForm)
  }, [initialTarefaForm])

  const handleSave = () => {
    onSaveForm?.(tarefaForm)
    setTarefaForm(emptyForm())
    onClearUnidadeMaterial?.()
    setShowTumForm(false)
    setEditIndex(null)
  }

  const handleCancelEdit = () => {
    setTarefaForm(initialTarefaForm || emptyForm())
    onClearUnidadeMaterial?.()
    setShowTumForm(false)
    setEditIndex(null)
    onCancelEdit?.()
  }

  const handleAddUnidade = () => {
    if (editIndex !== null) {
      // Modo edicao — mantem tudo que ja existia e sobrescreve campos do form.
      setTarefaForm((prev) => {
        const tarefas = Array.isArray(prev.tarefasUnidadeMaterial)
          ? prev.tarefasUnidadeMaterial
          : []
        const updatedTarefas = [...tarefas]
        const existingTum = updatedTarefas[editIndex] || {}

        updatedTarefas[editIndex] = {
          ...existingTum,
          unidadeMaterial: {
            ...(existingTum.unidadeMaterial || {}),
            nomeMaterial:
              unidadeMaterial?.material?.nome ||
              existingTum.unidadeMaterial?.nomeMaterial ||
              '',
            unidadeLabel:
              unidadeMaterial?.unidade?.label ||
              unidadeMaterial?.unidade?.nome ||
              existingTum.unidadeMaterial?.unidadeLabel ||
              '',
            quantidade:
              unidadeMaterial?.quantidade ||
              existingTum.unidadeMaterial?.quantidade ||
              0,
            materialId:
              unidadeMaterial?.material?.id ||
              existingTum.unidadeMaterial?.materialId ||
              null,
            unidadeId:
              unidadeMaterial?.unidade?.id ||
              existingTum.unidadeMaterial?.unidadeId ||
              null,
            nomeUnidade:
              unidadeMaterial?.unidade?.nome ||
              existingTum.unidadeMaterial?.nomeUnidade ||
              '',
            fatorSiUnidade:
              unidadeMaterial?.unidade?.fatorSi ||
              existingTum.unidadeMaterial?.fatorSiUnidade ||
              1,
            unidadeBaseSi:
              unidadeMaterial?.unidade?.unidadeBaseSi ||
              existingTum.unidadeMaterial?.unidadeBaseSi ||
              '',
          },
        }
        return { ...prev, tarefasUnidadeMaterial: updatedTarefas }
      })
      setEditIndex(null)
    } else {
      const novoTarefaUnidadeMaterial: TarefaUnidadeMaterialVM = {
        unidadeMaterial: {
          nomeMaterial: unidadeMaterial?.material?.nome || '',
          unidadeLabel:
            unidadeMaterial?.unidade?.label ||
            unidadeMaterial?.unidade?.nome ||
            '',
          quantidade: unidadeMaterial?.quantidade || 0,
          materialId: unidadeMaterial?.material?.id || null,
          unidadeId: unidadeMaterial?.unidade?.id,
          nomeUnidade: unidadeMaterial?.unidade?.nome,
          fatorSiUnidade: unidadeMaterial?.unidade?.fatorSi || 1,
          unidadeBaseSi: unidadeMaterial?.unidade?.unidadeBaseSi,
        },
      }
      setTarefaForm((prev) => ({
        ...prev,
        tarefasUnidadeMaterial: [
          ...(Array.isArray(prev.tarefasUnidadeMaterial)
            ? prev.tarefasUnidadeMaterial
            : []),
          novoTarefaUnidadeMaterial,
        ],
      }))
    }

    onClearUnidadeMaterial?.()
    setShowTumForm(false)
  }

  const handleRemoveUnidade = (index: number) => {
    setTarefaForm((prev) => ({
      ...prev,
      tarefasUnidadeMaterial:
        prev.tarefasUnidadeMaterial?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleTumEdit = (tum: TarefaUnidadeMaterialVM, index: number) => {
    onLoadTumForEdit?.(tum)
    setEditIndex(index)
    setShowTumForm(true)
  }

  return (
    <Card className="mb-3 border-0 shadow-sm">
      <Card.Header>
        <h5 className="mb-0">
          {editIndex !== null ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          <Col xs={12}>
            <AutoComplete
              title="Ação"
              displayKey="descricao"
              value={tarefaForm?.descricao}
              onSelectedClick={(acao: AcaoOption) =>
                setTarefaForm((prev) => ({
                  ...prev,
                  acaoId: acao?.id,
                  descricao: acao?.descricao || acao?.nome || '',
                  acao,
                }))
              }
              loadCondition={true}
              loadFunc={loadAcoes}
              placeholder="Selecione uma ação"
            />
          </Col>
        </Row>
        <hr />
        <div className="mt-3">
          {!showTumForm ? (
            <Button
              variant="outline-primary"
              onClick={() => setShowTumForm(true)}
            >
              {editIndex !== null ? 'Editar Material' : 'Adicionar Material'}
            </Button>
          ) : (
            <div className="p-3 border rounded bg-light">
              {renderUnidadeMaterialForm?.()}
              <div className="mt-3 d-flex justify-content-end">
                <Button variant="success" onClick={handleAddUnidade}>
                  {editIndex !== null ? 'Atualizar' : 'Confirmar'}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="ms-2"
                  onClick={() => {
                    onClearUnidadeMaterial?.()
                    setShowTumForm(false)
                    setEditIndex(null)
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4">
          {tarefaForm.tarefasUnidadeMaterial
            ?.filter((tum) => !tum.removed)
            .map((tum, index) => (
              <UnidadeMaterialCard
                key={index}
                tarefaUnidadeMaterial={tum}
                onRemoveClick={() => handleRemoveUnidade(index)}
                onEditClick={() => handleTumEdit(tum, index)}
                header={
                  <div
                    className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                    style={{ width: 32, height: 32, fontWeight: 600 }}
                  >
                    {index + 1}
                  </div>
                }
              />
            ))}
        </div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="outline-danger" onClick={handleCancelEdit}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salvar
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default TarefaUnidadeForm
