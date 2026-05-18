// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
  Button,
  List,
  ListItem,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@hashcodeti/ui-kit-core'
import { MdClose } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TiDeleteOutline } from 'react-icons/ti'
import { DeleteConfirm, UnidadeMaterialForm } from 'teraprox-ui-kit'

/**
 * UnidadeMaterialPicker — widget apresentacional migrado de SGM-OS
 * (Wave 2B da sprint 2026-04-21-ui-kit-domain-split-wave0).
 *
 * Origem: envolvido pelo HOC `withGenericPicker` + form embutido que
 * vivia em `teraprox-SGM-OS`. Aqui o comportamento de picker é local
 * (state próprio em useState) — sem Redux, sem useCoreService,
 * sem useHttpController. O caller injeta:
 *   - `outOption`: valor corrente do form (UnidadeMaterialValue-like,
 *     controlado pelo `useUnidadeMaterialViewModel` do core-sdk).
 *   - handlers do form (onMaterialSelected, onQuantidadeUpdate,
 *     onUnidadeSelected, loadMaterials, loadUnidades) — normalmente
 *     repassados a partir do ViewModel.
 *
 * A API de props exteriores preserva a forma do picker legado (usada
 * por TarefaCard/TarefaForm) para facilitar o swap de import no
 * Wave 2D sem refactor de call site.
 */
export interface UnidadeMaterialPickerProps {
  // Picker shell (legacy `withGenericPicker` API)
  saveOptions?: (pickedItem: any, index: number, allPicked: any[]) => void
  singlePick?: boolean
  displayName?: string
  optionDisplayName?: string
  optionDisplayKey?: string
  hideOptions?: boolean
  displayButtonName?: string
  opsSelected?: any[] | any
  outOption?: any
  onSelectedOption?: (v: any) => any
  formatationFunc?: (pi: any) => string
  onPickerOpen?: () => void
  onPickerClose?: () => void
  clear?: () => void
  clearPickerOptions?: () => void
  optionComponent?: (args: {
    payload: any
    index: number
    onClickOp: (input?: any) => void
    deleteButton: () => React.ReactNode | null
  }) => React.ReactNode
  onOptionEditClick?: (pi: any, index: number, optionsPicked: any[]) => void
  showOpsWhenEdit?: boolean
  onOptionDelete?: (pi: any, index: number, remaining: any[]) => void
  containerStyles?: { bgColor?: string }
  deleteDiaologText?: string
  readOnlyMode?: boolean
  deleteTitle?: string
  onOptionUpdate?: (pi: any, index: number, allPicked: any[]) => void
  fetchOpsSelected?: () => Promise<any[]>
  onBuild?: (setView: (v: boolean) => void, optionsPicked: any[]) => void
  parentColor?: string

  // UnidadeMaterialForm props (inner)
  onMaterialSelected?: (m: any) => void
  onQuantidadeUpdate?: (q: any) => void
  onUnidadeSelected?: (u: any) => void
  loadMaterialsFunc?: (...args: any[]) => any
  loadUnidadesFunc?: (...args: any[]) => any
}

const removeAt = <T,>(arr: T[], idx: number): T[] => {
  if (!Array.isArray(arr)) return []
  const copy = [...arr]
  copy.splice(idx, 1)
  return copy
}

export const UnidadeMaterialPicker: React.FC<UnidadeMaterialPickerProps> = ({
  saveOptions,
  singlePick,
  displayName,
  optionDisplayName,
  optionDisplayKey,
  hideOptions,
  displayButtonName,
  opsSelected,
  outOption,
  onSelectedOption,
  formatationFunc,
  onPickerOpen,
  onPickerClose,
  clear,
  clearPickerOptions,
  optionComponent,
  onOptionEditClick,
  showOpsWhenEdit = true,
  onOptionDelete,
  containerStyles,
  deleteDiaologText,
  readOnlyMode = false,
  deleteTitle,
  onOptionUpdate,
  fetchOpsSelected,
  onBuild,
  parentColor,
  onMaterialSelected,
  onQuantidadeUpdate,
  onUnidadeSelected,
  loadMaterialsFunc,
  loadUnidadesFunc,
}) => {
  const [optionsPicked, setOptionsPicked] = useState<any[]>([])
  const [view, setView] = useState(true)
  const [deleteConfirm, setShowDelete] = useState(false)
  const [optionIndexToDelete, setOptionIndexToDelete] = useState<any>(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetcher = async () => {
      if (fetchOpsSelected) {
        const opsFetched = await fetchOpsSelected()
        setOptionsPicked(opsFetched || [])
      }
    }
    fetcher()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (opsSelected) {
      Array.isArray(opsSelected)
        ? setOptionsPicked(opsSelected)
        : setOptionsPicked([opsSelected])
    }
  }, [opsSelected])

  useEffect(() => {
    if (onBuild) onBuild(setView, optionsPicked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const salvarPicker = (pickedOut: any) => {
    let newPickerItem = pickedOut
    let newOptionsPicked = optionsPicked
    if (newPickerItem) {
      if (onSelectedOption) newPickerItem = onSelectedOption(newPickerItem)
      if (singlePick) {
        newOptionsPicked = [newPickerItem]
        setOptionsPicked(newOptionsPicked)
      } else {
        newOptionsPicked = [...optionsPicked, newPickerItem]
      }
    }
    setOptionsPicked(newOptionsPicked)
    if (saveOptions) {
      saveOptions(
        newPickerItem || optionsPicked[optionsPicked.length - 1],
        newOptionsPicked.length - 1,
        newOptionsPicked,
      )
    }
    if (clear) clear()
    setView(true)
  }

  const getDisplayValueHandler = (pi: any, index: number) => {
    if (formatationFunc) return formatationFunc(pi)
    return `${(optionDisplayKey && pi[optionDisplayKey]) || pi.id || index}`
  }

  const onDeleteConfirmHandler = () => {
    const { pi, index } = optionIndexToDelete
    const removedOptions = removeAt(optionsPicked, index)
    if (onOptionDelete) onOptionDelete(pi, index, removedOptions)
    setOptionsPicked(removedOptions)
  }

  const onDeleteHandler = (pi: any, index: number) => {
    setOptionIndexToDelete({ pi, index })
    setShowDelete(true)
  }

  const onOptionEditClickHandler = (pi: any, index: number) => {
    if (onOptionEditClick) {
      onOptionEditClick(pi, index, optionsPicked)
      setEditingIndex(index)
      setView(false)
    }
  }

  const saveEditOption = () => {
    if (onOptionUpdate && editingIndex != null) {
      onOptionUpdate(optionsPicked[editingIndex], editingIndex, [
        ...optionsPicked,
      ])
    }
    setEditingIndex(null)
    setView(true)
  }

  const renderOps = () => (
    <>
      <h4>
        {optionDisplayName}
        {clearPickerOptions && (
          <TooltipProvider delayDuration={250}>
            <TooltipRoot>
              <TooltipTrigger asChild>
                <Button variant="warning">
                  <RiDeleteBin5Line onClick={() => clearPickerOptions()} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Remover todas as opcoes</TooltipContent>
            </TooltipRoot>
          </TooltipProvider>
        )}
      </h4>
      <List id="pickerOps">
        {optionsPicked.map((pi: any, index: number) => {
          if (optionComponent) {
            return (
              <div
                key={index}
                style={{
                  alignItems: 'center',
                  opacity: pi?.removed ? 0.3 : 1,
                  textDecoration: pi?.removed ? 'line-through' : 'none',
                }}
              >
                {optionComponent({
                  payload: pi,
                  index,
                  onClickOp: (input?: any) =>
                    onOptionEditClickHandler(input || pi, index),
                  deleteButton: () =>
                    onOptionDelete ? (
                      <TiDeleteOutline
                        style={{ marginLeft: 8 }}
                        onClick={() => onDeleteHandler(pi, index)}
                      />
                    ) : null,
                })}
              </div>
            )
          }
          return (
            <ListItem
              disabled={pi?.removed}
              style={{
                opacity: pi?.removed ? 0.5 : 1,
                display: 'flex',
                alignContent: 'center',
                textDecoration: pi?.removed ? 'line-through' : 'none',
              }}
              key={index}
            >
              <div onClick={() => onOptionEditClickHandler(pi, index)}>
                {getDisplayValueHandler(pi, index)}
              </div>
              {onOptionDelete && (
                <TiDeleteOutline
                  style={{
                    marginLeft: 8,
                    display: readOnlyMode ? 'none' : '',
                  }}
                  onClick={() => onDeleteHandler(pi, index)}
                />
              )}
            </ListItem>
          )
        })}
      </List>
      {!singlePick && !readOnlyMode && (
        <div style={{ textAlign: 'center', padding: 8 }}>
          <Button
            className="pickerButton"
            onClick={() => {
              if (onPickerOpen) onPickerOpen()
              setView(false)
            }}
          >
            +
          </Button>
        </div>
      )}
    </>
  )

  const buildCloseDisplay = () => {
    if (!hideOptions) {
      return (optionsPicked?.length ?? 0) === 0 ? (
        <Button
          disabled={readOnlyMode}
          className="pickerButton"
          onClick={() => {
            if (onPickerOpen) onPickerOpen()
            setView(false)
          }}
        >
          {displayButtonName}
        </Button>
      ) : (
        (optionsPicked?.length ?? 0) > 0 && (
          <div
            style={{
              borderWidth: 4,
              borderColor: 'black',
              marginBottom: 8,
            }}
          >
            {renderOps()}
          </div>
        )
      )
    }
    return (
      <Button
        className="pickerButton"
        onClick={() => {
          if (onPickerOpen) onPickerOpen()
          setView(false)
        }}
      >
        {displayButtonName}
      </Button>
    )
  }

  const closePickerHandler = () => {
    if (onPickerClose) onPickerClose()
    setEditingIndex(null)
    setView(true)
  }

  return (
    <>
      <DeleteConfirm
        dialogText={deleteDiaologText}
        onHide={setShowDelete}
        title={deleteTitle || 'Confirmacao de remocao'}
        payload={optionIndexToDelete}
        onConfirm={() => onDeleteConfirmHandler()}
        show={deleteConfirm}
      />
      {view ? (
        buildCloseDisplay()
      ) : (
        <div
          style={{
            backgroundColor: parentColor || containerStyles?.bgColor,
            border: 'solid',
            borderWidth: 1,
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 4,
            borderColor: 'gray',
          }}
        >
          <div style={{ padding: 8 }}>
            <div
              onClick={() => closePickerHandler()}
              style={{ float: 'right' }}
            >
              <MdClose />
            </div>
            <h3>{displayName}</h3>
            <UnidadeMaterialForm
              value={outOption}
              onMaterialSelected={onMaterialSelected}
              onQuantidadeUpdate={onQuantidadeUpdate}
              onUnidadeSelected={onUnidadeSelected}
              loadMaterialsFunc={loadMaterialsFunc}
              loadUnidadesFunc={loadUnidadesFunc}
            />
            {editingIndex == null && showOpsWhenEdit && (
              <div
                style={{
                  borderWidth: 4,
                  borderColor: 'black',
                  marginBottom: 8,
                }}
              >
                {!hideOptions && renderOps()}
              </div>
            )}
            {editingIndex != null && onOptionEditClick ? (
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <Button
                  style={{ display: readOnlyMode ? 'none' : '' }}
                  variant="warning"
                  onClick={saveEditOption}
                >
                  Salvar Edicao
                </Button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <Button
                  style={{ display: readOnlyMode ? 'none' : '' }}
                  onClick={() => salvarPicker(outOption)}
                >
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default UnidadeMaterialPicker
