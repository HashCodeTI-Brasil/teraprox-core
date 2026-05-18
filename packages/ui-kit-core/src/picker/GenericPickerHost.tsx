/**
 * GenericPickerHost — @hashcodeti/ui-kit-core/picker
 *
 * View pura props-driven que substitui o HOC factory `withGenericPicker`
 * (522 LOC) duplicado em SGM-OS + SGM-UTILS. Consome a Port
 * `IGenericPickerViewModel` (core-sdk) + render-props para `renderForm`
 * e `renderDisplay`.
 *
 * Responsabilidades cobertas (espelha o HOC legado):
 *  - Toggle entre modo "display" (lista de itens picked + botao add) e
 *    modo "form" (renderForm chamado com `onPick`).
 *  - Edicao inline: clicar em um item chama `onItemEdit` opcional do caller
 *    e marca o ViewModel como editing — botao "Salvar Edicao" dispara commit.
 *  - Remocao com confirmacao (DeleteConfirm) opcional.
 *  - Suporte a `singlePick`, `readOnlyMode`, `hideOptions`.
 *
 * NAO conhece Redux. NAO conhece HTTP. Recebe ViewModel pronto.
 *
 * Sprint Wave H.5 — 2026-05-13.
 */

import React, { useState } from 'react'
import {
  IGenericPickerViewModel,
  GenericPickerItem,
} from 'teraprox-core-sdk'
import { Button } from '../primitives/Button'
import { List, ListItem, ListItemContent, ListItemAction } from '../primitives/List'
import { DividerWithButton } from '../primitives/DividerWithButton'
import { DeleteConfirm } from '../buttons/DeleteConfirm'
import { cn } from '../lib/cn'

export type GenericPickerRenderFormProps<T extends GenericPickerItem> = {
  /** Funcao a ser chamada pelo form quando um novo item for selecionado/criado. */
  onPick: (item: T) => void
  /** Item em edicao (null se add). */
  editingItem: T | null
  /** Indice em edicao (null se add). */
  editingIndex: number | null
  /** Fecha o painel sem salvar. */
  onCancel: () => void
}

export type GenericPickerRenderItemProps<T extends GenericPickerItem> = {
  item: T
  index: number
  onEdit: () => void
  onDelete: () => void
  readOnly: boolean
}

export interface GenericPickerHostProps<T extends GenericPickerItem = GenericPickerItem> {
  /** ViewModel hexagonal — fonte unica de verdade do estado. */
  viewModel: IGenericPickerViewModel<T>

  /** Render-prop do form de selecao/criacao. */
  renderForm: (props: GenericPickerRenderFormProps<T>) => React.ReactNode

  /**
   * Render-prop opcional de item — quando ausente cai num display textual
   * default usando `displayKey` ou `formatItem`.
   */
  renderItem?: (props: GenericPickerRenderItemProps<T>) => React.ReactNode

  // ─── Apresentacionais (espelha props do HOC legado) ────────────────
  /** Texto do botao que abre o picker quando vazio. */
  displayButtonName?: string
  /** Titulo exibido sobre a lista de itens picked. */
  optionDisplayName?: string
  /** Titulo do painel quando aberto. */
  displayName?: string
  /** Chave do objeto a ser usada para rotular itens (default: id). */
  optionDisplayKey?: string
  /** Formatador customizado (substitui `optionDisplayKey`). */
  formatItem?: (item: T, index: number) => React.ReactNode
  /** Texto da caixa de confirmacao de delete (string ou fn(payload)). */
  deleteDialogText?: string | ((payload: { item: T; index: number }) => string)
  /** Titulo da caixa de confirmacao de delete. */
  deleteTitle?: string

  // ─── Flags ─────────────────────────────────────────────────────────
  /** Quando true, esconde a lista de items picked. */
  hideOptions?: boolean
  /** Quando true, picker em modo somente leitura (sem add/remove/edit). */
  readOnlyMode?: boolean
  /** Quando true, mostra a lista de picked dentro do painel mesmo em edit. */
  showOptionsWhenEdit?: boolean
  /** Estilos opcionais do container do painel aberto. */
  containerClassName?: string
  /** Cor de fundo do painel (legacy compat). */
  parentColor?: string

  // ─── Hooks de comportamento ────────────────────────────────────────
  /** Disparado quando o painel abre (UX hook). */
  onPickerOpen?: () => void
  /** Disparado quando o painel fecha (UX hook). */
  onPickerClose?: () => void
  /** Permite ao caller transformar o item recem escolhido antes do commit. */
  onSelectedOption?: (item: T) => T
}

const defaultFormatItem = <T extends GenericPickerItem>(
  item: T,
  index: number,
  key?: string
): React.ReactNode => {
  if (key && item[key] != null) return String(item[key])
  if (item.id != null) return String(item.id)
  return String(index)
}

export function GenericPickerHost<T extends GenericPickerItem = GenericPickerItem>(
  props: GenericPickerHostProps<T>
): React.ReactElement {
  const {
    viewModel,
    renderForm,
    renderItem,
    displayButtonName = 'Adicionar',
    optionDisplayName,
    displayName,
    optionDisplayKey,
    formatItem,
    deleteDialogText,
    deleteTitle = 'Confirmação de remoção',
    hideOptions = false,
    readOnlyMode = false,
    showOptionsWhenEdit = true,
    containerClassName,
    parentColor,
    onPickerOpen,
    onPickerClose,
    onSelectedOption,
  } = props

  const { picked, isOpen, editingItem, editingIndex } = viewModel

  const [pendingDelete, setPendingDelete] = useState<{ item: T; index: number } | null>(null)

  const open = () => {
    onPickerOpen?.()
    viewModel.open()
  }
  const close = () => {
    onPickerClose?.()
    viewModel.close()
  }

  const handlePick = (raw: T) => {
    const transformed = onSelectedOption ? onSelectedOption(raw) : raw
    if (editingIndex != null) {
      viewModel.update(transformed)
    } else {
      viewModel.add(transformed)
    }
    viewModel.commit()
  }

  const handleEditClick = (item: T, index: number) => {
    if (readOnlyMode) return
    viewModel.edit(item, index)
  }

  const handleDeleteRequest = (item: T, index: number) => {
    setPendingDelete({ item, index })
  }

  const handleDeleteConfirm = () => {
    if (!pendingDelete) return
    viewModel.remove(pendingDelete.index)
    setPendingDelete(null)
  }

  const renderList = () => (
    <div>
      {optionDisplayName && (
        <h4 className="text-base font-semibold mb-2">{optionDisplayName}</h4>
      )}
      <List variant="bordered">
        {picked.map((pi, index) => {
          const isRemoved = !!pi.removed
          if (renderItem) {
            return (
              <div
                key={pi.id ?? index}
                aria-disabled={isRemoved}
                className={cn(
                  'flex items-center',
                  isRemoved && 'opacity-30 line-through'
                )}
              >
                {renderItem({
                  item: pi as T,
                  index,
                  onEdit: () => handleEditClick(pi as T, index),
                  onDelete: () => handleDeleteRequest(pi as T, index),
                  readOnly: readOnlyMode,
                })}
              </div>
            )
          }
          return (
            <ListItem
              key={pi.id ?? index}
              className={cn(isRemoved && 'opacity-50 line-through')}
            >
              <ListItemContent
                onClick={() => handleEditClick(pi as T, index)}
                className="cursor-pointer"
              >
                {formatItem
                  ? formatItem(pi as T, index)
                  : defaultFormatItem(pi as T, index, optionDisplayKey)}
              </ListItemContent>
              {!readOnlyMode && (
                <ListItemAction>
                  <button
                    type="button"
                    aria-label="Remover"
                    onClick={() => handleDeleteRequest(pi as T, index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    ×
                  </button>
                </ListItemAction>
              )}
            </ListItem>
          )
        })}
      </List>
      {!readOnlyMode && (
        <DividerWithButton onClick={open} />
      )}
    </div>
  )

  const renderClosedDisplay = () => {
    if (hideOptions || picked.length === 0) {
      return (
        <Button
          disabled={readOnlyMode}
          variant="primary"
          onClick={open}
          className="w-full"
        >
          {displayButtonName}
        </Button>
      )
    }
    return renderList()
  }

  return (
    <>
      <DeleteConfirm
        show={pendingDelete != null}
        onHide={() => setPendingDelete(null)}
        onConfirm={handleDeleteConfirm}
        title={deleteTitle}
        dialogText={
          typeof deleteDialogText === 'function' && pendingDelete
            ? () => (deleteDialogText as (p: { item: T; index: number }) => string)(pendingDelete)
            : (deleteDialogText as string | undefined)
        }
        payload={pendingDelete ?? undefined}
      />

      {!isOpen ? (
        renderClosedDisplay()
      ) : (
        <div
          className={cn(
            'border border-gray-300 rounded-md mt-2 mb-2 p-3',
            containerClassName
          )}
          style={parentColor ? { backgroundColor: parentColor } : undefined}
        >
          <div className="flex justify-between items-start mb-2">
            {displayName && <h3 className="text-lg font-semibold">{displayName}</h3>}
            <button
              type="button"
              aria-label="Fechar"
              onClick={close}
              className="ml-auto text-gray-500 hover:text-gray-800 px-2"
            >
              ×
            </button>
          </div>

          {renderForm({
            onPick: handlePick,
            editingItem,
            editingIndex,
            onCancel: close,
          })}

          {editingIndex == null && showOptionsWhenEdit && !hideOptions && picked.length > 0 && (
            <div className="mt-3">{renderList()}</div>
          )}

          {editingIndex != null && (
            <div className="text-center mt-3">
              <Button
                variant="warning"
                disabled={readOnlyMode}
                onClick={() => viewModel.commit()}
              >
                Salvar Edição
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default GenericPickerHost
