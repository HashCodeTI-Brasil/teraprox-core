// @ts-nocheck
import React, { useMemo, useState } from 'react'
import { Card, Spinner, Table } from 'react-bootstrap'
import {
  FaClipboardList,
  FaComments,
  FaCubes,
  FaRegEdit,
  FaWrench,
} from 'react-icons/fa'
import {
  ExpandableCard,
  FormField,
  GenericDisplay as IconGenericDisplay,
  ResponsiveContainer,
  StatusBadge,
  SwitchOnClick,
  TextWithMore,
} from 'teraprox-ui-kit'

/**
 * TarefaItem — widget apresentacional migrado de SGM-OS
 * (Wave 2B da sprint 2026-04-21-ui-kit-domain-split-wave0).
 *
 * Fluxos removidos vs. original:
 *   - `useDispatch`, `useCoreService` (subscribe/unsubscribe + controller),
 *     `useTarefaService`, `useUnidadeMaterialViewModel` saem da UI.
 *   - `endPointManutencao`, `ObjectUtils`, reducers SGM-OS e Screens
 *     (`InspecaoForm`, `ObservacaoModal`, `InspecoesList`,
 *     `GenericContextForm`, `GenericImageAttachment`,
 *     `InnerEditableTextField`, `IconWithBadge`) passam a ser injetados
 *     via props/slots pelo caller (SGM-OS).
 *
 * O widget foca apenas em composição visual + interações locais
 * (showObs / showInsp / showMat / edição inline de quantidade).
 * O caller orquestra: fetch, dispatch Redux, subscribes MatchingObject,
 * ciclo de ViewModel (Port `IUnidadeMaterialViewModel` do core-sdk).
 */
export interface TarefaItemProps {
  tarefa: any
  readOnly?: boolean
  index: number
  fatherId?: number | null
  isMobile?: boolean
  saving?: boolean

  /** Chamado quando o status switch muda (argumento: evento). */
  onToggleStatus: (e: any) => void
  /** Chamado com a nova descrição após edição inline. */
  onDescricaoUpdate: (descricao: string) => void
  /** Chamado quando o usuário edita a quantidade utilizada de uma TUM. */
  onQuantidadeUnidadeMaterialChange: (
    quantidade: any,
    indexUnidadeMaterial: number,
  ) => void
  /** Chamado no blur da quantidade (persiste no backend). */
  onQuantidadeUnidadeMaterialBlur: (
    tarefaUnidadeMaterialId: any,
    formToUpdate: any,
  ) => void
  /** Chamado ao abrir o modal de observações (fetch + open). */
  onOpenObservacoes: () => void
  /** Chamado ao salvar observação no modal. */
  onSaveObservacao: (obs: any) => void
  /** Chamado ao enviar um anexo (file). */
  onUploadAnexo: (anexo: any) => void
  /** Chamado ao deletar um anexo. */
  onDeleteAnexo: (id: any, anexoKey: any) => void
  /** Chamado ao salvar uma nova inspeção a partir do form. */
  onSaveNovaInspecao: (inspecao: any) => void
  /** Chamado ao adicionar uma unidade-material no modal de materiais. */
  onAddUnidadeMaterial: (form: any, closeForm: () => void) => void
  /** Chamado para atualizar inspeção (usado no slot de inspeções). */
  onUpdateInspecaoField: (
    id: any,
    valor: any,
    field: string,
    indexInspecao: number,
  ) => void

  /** Estado do formulário unidade-material (do ViewModel do core-sdk). */
  unidadeMaterialFormValue?: any
  unidadeMaterialFormHandlers?: {
    onMaterialSelected?: (m: any) => void
    onQuantidadeUpdate?: (q: any) => void
    onUnidadeSelected?: (u: any) => void
    loadMaterialsFunc?: (...a: any[]) => any
    loadUnidadesFunc?: (...a: any[]) => any
  }

  /** Slot: anexos (GenericImageAttachment) controlado pelo caller. */
  renderAnexos: (ctx: {
    onUpload: (anexo: any) => void
    onDelete: (id: any, anexoKey: any) => void
    filesData: any[]
  }) => React.ReactNode
  /** Slot: componente de contador com badge (IconWithBadge). */
  renderIconWithBadge: (ctx: {
    icon: React.ReactNode
    content: number
  }) => React.ReactNode
  /** Slot: campo editável inline (InnerEditableTextField). */
  renderEditableDescricao: (ctx: {
    initialValue: string
    onHide: (desc: string) => void
    renderFallback: (
      setActive: (v: boolean) => void,
      setOldValue: (v: any) => void,
    ) => React.ReactNode
  }) => React.ReactNode
  /** Slot: modal de observações (ObservacaoModal). */
  renderObservacaoModal: (ctx: {
    readOnly?: boolean
    show: boolean
    close: () => void
    saveCallback: (obs: any) => void
  }) => React.ReactNode
  /** Slot: lista de inspeções (InspecoesList). */
  renderInspecoesList: (ctx: {
    readOnly?: boolean
    inspecoes: any[]
    isMobile?: boolean
    updateInspecaoCallback: (
      id: any,
      valor: any,
      field: string,
      indexInspecao: number,
    ) => void
  }) => React.ReactNode
  /** Slot: form de nova inspeção (GenericContextForm + InspecaoForm). */
  renderNovaInspecaoForm: (ctx: {
    onSaveClick: (inspecao: any) => void
    handleClose: () => void
  }) => React.ReactNode
  /** Slot: form de nova unidade-material no container de Materiais. */
  renderNovaUnidadeMaterialForm: (ctx: {
    onSaveClick: (form: any) => void
    handleClose: () => void
    value?: any
    handlers?: TarefaItemProps['unidadeMaterialFormHandlers']
  }) => React.ReactNode
}

export const TarefaItem: React.FC<TarefaItemProps> = (props) => {
  const {
    tarefa: tarefaForm,
    readOnly,
    index,
    fatherId = null,
    isMobile = false,
    saving: savingProp,
    onToggleStatus,
    onDescricaoUpdate,
    onQuantidadeUnidadeMaterialChange,
    onQuantidadeUnidadeMaterialBlur,
    onOpenObservacoes,
    onSaveObservacao,
    onUploadAnexo,
    onDeleteAnexo,
    onSaveNovaInspecao,
    onAddUnidadeMaterial,
    onUpdateInspecaoField,
    unidadeMaterialFormValue,
    unidadeMaterialFormHandlers,
    renderAnexos,
    renderIconWithBadge,
    renderEditableDescricao,
    renderObservacaoModal,
    renderInspecoesList,
    renderNovaInspecaoForm,
    renderNovaUnidadeMaterialForm,
  } = props

  const anexos = tarefaForm?.anexos || []
  const [showObs, setShowObs] = useState(false)
  const [showInsp, setShowInsp] = useState(false)
  const [showMat, setShowMat] = useState(false)
  const [quantidadeUnidadeMaterialIsChanged, setQuantidadeUnidadeMaterialIsChanged] =
    useState(false)

  const saving = savingProp ?? false
  const checked = useMemo(
    () => tarefaForm.status === 'ENCERRADO',
    [tarefaForm],
  )

  const handleQuantidadeChange = (quantidade: any, indexUM: number) => {
    if (!quantidadeUnidadeMaterialIsChanged)
      setQuantidadeUnidadeMaterialIsChanged(true)
    onQuantidadeUnidadeMaterialChange(quantidade, indexUM)
  }

  const handleQuantidadeBlur = (tumId: any, form: any) => {
    if (quantidadeUnidadeMaterialIsChanged) {
      onQuantidadeUnidadeMaterialBlur(tumId, form)
      setQuantidadeUnidadeMaterialIsChanged(false)
    }
  }

  const handleOpenObsClick = async () => {
    await onOpenObservacoes()
    setShowObs(true)
  }

  const conditionalMaterialUtilizadoFieldRender = (tUM: any, i: number) => {
    if (saving) {
      return (
        <div className="w-100">
          <Spinner animation="border" />
        </div>
      )
    }
    return (
      <FormField
        styleObj={{ fontSize: '1.2rem' }}
        ty={'number'}
        className={'w-100'}
        val={tUM.quantidade}
        onValueUpdate={(v: any) => handleQuantidadeChange(v, i)}
        onBlur={() =>
          handleQuantidadeBlur(tUM.id, {
            quantidade: tUM.quantidade,
            tarefaId: tarefaForm.id,
          })
        }
      />
    )
  }

  return (
    <>
      <Card className="shadow-sm">
        <div className="tarefa-grid">
          {/* ----- descrição + ação ----- */}
          <div>
            <div className="tarefa-title-line">
              <strong>{tarefaForm.sequencia}.</strong>

              {renderEditableDescricao({
                initialValue: tarefaForm.descricao,
                onHide: (descricao: string) => onDescricaoUpdate(descricao),
                renderFallback: (setActive, setOldValue) => (
                  <div className="editable-text-container">
                    <TextWithMore
                      text={tarefaForm.descricao}
                      maxLength={25}
                    />
                    <IconGenericDisplay>
                      {!readOnly && (
                        <FaRegEdit
                          onClick={() => {
                            setActive(true)
                            setOldValue(tarefaForm.descricao)
                          }}
                          className="editable-text-icon zoom-container ms-2"
                        />
                      )}
                    </IconGenericDisplay>
                  </div>
                ),
              })}
            </div>

            {tarefaForm.acao?.nome && (
              <div className="tarefa-acao-line">
                <FaWrench /> {tarefaForm.acao.nome}
              </div>
            )}
          </div>

          {/* ----- ícones de ação ----- */}
          <div className="d-flex gap-3 align-items-center">
            <FaComments
              title="Observações"
              size={25}
              className="hoverable-div"
              onClick={handleOpenObsClick}
            />

            {renderIconWithBadge({
              icon: (
                <FaClipboardList
                  title="Inspeções"
                  size={25}
                  className="hoverable-div"
                  onClick={() => setShowInsp(true)}
                />
              ),
              content: tarefaForm?.inspecoes?.length ?? 0,
            })}

            {renderIconWithBadge({
              icon: (
                <FaCubes
                  title="Materiais"
                  size={25}
                  className="hoverable-div"
                  onClick={() => setShowMat(true)}
                />
              ),
              content: tarefaForm?.tarefaUnidadesMateriais?.length ?? 0,
            })}

            {renderAnexos({
              onUpload: (anexo: any) => onUploadAnexo(anexo),
              onDelete: (id: any, anexoKey: any) =>
                onDeleteAnexo(id, anexoKey),
              filesData: anexos,
            })}
          </div>

          {/* ----- status ----- */}
          <div className="d-flex align-items-start">
            <StatusBadge
              status={tarefaForm.status}
              showCheckbox={!readOnly}
              checked={checked}
              onToggle={onToggleStatus}
              loading={saving}
            />
          </div>
        </div>
        {tarefaForm.tarefaUnidadesMateriais?.length > 0 && (
          <Card.Footer>
            {tarefaForm.tarefaUnidadesMateriais?.map((tum: any, i: number) => (
              <div
                key={i}
                style={{
                  gap: '8px',
                  display: 'flex',
                  padding: '4px 0',
                  borderBottom: '1px solid #ddd',
                  opacity: 0.7,
                }}
              >
                <div style={{ textAlign: 'center' }}>{i + 1}</div>
                <div>{tum.unidadeMaterial?.nomeMaterial || '-'}</div>
                <div>
                  {tum.quantidade} {tum.unidadeMaterial?.labelUnidade}
                </div>
              </div>
            ))}
          </Card.Footer>
        )}
      </Card>

      {/* ----- modais e containers ----- */}
      {renderObservacaoModal({
        readOnly,
        show: showObs,
        close: () => setShowObs(false),
        saveCallback: onSaveObservacao,
      })}

      <ResponsiveContainer
        title="Inspeções"
        show={showInsp}
        setShow={setShowInsp}
      >
        {renderInspecoesList({
          readOnly,
          inspecoes: tarefaForm.inspecoes,
          isMobile,
          updateInspecaoCallback: onUpdateInspecaoField,
        })}
        {!readOnly && (
          <div className="mt-3">
            <SwitchOnClick>
              {({ handleClose }: any) => (
                <ResponsiveContainer
                  setShow={handleClose}
                  title="Nova inspeção"
                  show
                >
                  {renderNovaInspecaoForm({
                    onSaveClick: (inspecao: any) =>
                      onSaveNovaInspecao(inspecao),
                    handleClose,
                  })}
                </ResponsiveContainer>
              )}
            </SwitchOnClick>
          </div>
        )}
      </ResponsiveContainer>

      <ResponsiveContainer
        title="Materiais"
        show={showMat}
        setShow={setShowMat}
      >
        {!isMobile ? (
          <Table bordered size="sm" className="mt-3">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>N˚</th>
                <th>Material</th>
                <th>Planejada</th>
                <th>Utilizada</th>
              </tr>
            </thead>
            <tbody
              style={{
                verticalAlign: 'middle',
                textAlign: 'center',
                fontSize: '1.2rem',
              }}
            >
              {tarefaForm.tarefaUnidadesMateriais?.map((tum: any, i: number) => (
                <tr key={tum.id}>
                  <td>{i + 1}</td>
                  <td>{tum.unidadeMaterial?.nomeMaterial || '-'}</td>
                  <td>
                    {tum.unidadeMaterial?.quantidade}{' '}
                    {tum.unidadeMaterial?.labelUnidade}
                  </td>
                  <td>{conditionalMaterialUtilizadoFieldRender(tum, i)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          tarefaForm.tarefaUnidadesMateriais?.map((tum: any, i: number) => (
            <div className="mb-3" key={tum.id ?? i}>
              <ExpandableCard
                items={[
                  {
                    content: tum.unidadeMaterial?.nomeMaterial || '-',
                    label: 'Nome',
                  },
                  {
                    content:
                      tum.unidadeMaterial?.quantidade +
                      ' ' +
                      tum.unidadeMaterial?.labelUnidade,
                    label: 'Qtd planejada',
                  },
                  {
                    content: conditionalMaterialUtilizadoFieldRender(tum, i),
                    label: 'Utilizado',
                  },
                ]}
              />
            </div>
          ))
        )}
        {!readOnly && (
          <SwitchOnClick>
            {({ handleClose }: any) =>
              renderNovaUnidadeMaterialForm({
                onSaveClick: (form: any) =>
                  onAddUnidadeMaterial(form, handleClose),
                handleClose,
                value: unidadeMaterialFormValue,
                handlers: unidadeMaterialFormHandlers,
              })
            }
          </SwitchOnClick>
        )}
      </ResponsiveContainer>
    </>
  )
}

export default TarefaItem
