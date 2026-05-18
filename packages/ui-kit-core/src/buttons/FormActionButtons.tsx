/**
 * FormActionButtons — @hashcodeti/ui-kit-core
 *
 * Agrupamento padrão de botões de ação para formulários (Cancelar, Excluir, Salvar
 * + opcionais Voltar e Copiar). Props-driven (zero Redux, zero useCoreService).
 *
 * Cada botão renderiza apenas se seu callback for fornecido E sua flag `show*`
 * não estiver explicitamente em `false` — permitindo esconder botões pontualmente
 * sem remover o callback (útil para alternar visibilidade por permissão/estado).
 *
 * Inclui:
 *   - Confirmação modal de exclusão (DeleteConfirm)
 *   - Variante "hold-to-delete" (manter pressionado por N ms) para ações destrutivas
 *   - Wrapper opcional de permissão para o botão Excluir
 *
 * Promovido de teraprox-ui-kit/buttons/ActionButtons para ui-kit-core em 2026-04-30
 * para virar padrão de todo formulário do ecossistema.
 *
 * Refatorado 2026-05-13: migrado de react-bootstrap para primitivos
 * Tailwind+Radix (Button, Progress) do próprio ui-kit-core. API pública intacta.
 */
import React, { useRef, useState } from 'react'
import { FiChevronLeft, FiCopy, FiRotateCcw, FiSave, FiTrash2 } from 'react-icons/fi'

import { Button, type ButtonVariant } from '../primitives/Button'
import { Progress } from '../primitives/Progress'
import { cn } from '../lib/cn'
import { DeleteConfirm } from './DeleteConfirm'

export interface FormActionButtonsProps {
  /** Callback Salvar — botão renderiza se callback presente e showSave !== false. */
  onSave?: () => void
  saveLabel?: string
  saveVariant?: string
  showSave?: boolean

  /** Callback Excluir — botão só renderiza em modo edição (isEditing). */
  onDelete?: (details?: string) => void
  deleteLabel?: string
  deleteConfirmMsg?: string
  needExclusionDetails?: boolean
  showDelete?: boolean

  /** Callback Voltar (chevron). */
  onBack?: () => void
  backLabel?: string
  showBack?: boolean

  /** Callback Cancelar Edição (rotate-icon, variant warning). */
  onCancelEdit?: () => void
  cancelEditLabel?: string
  showCancelEdit?: boolean

  /** Callback Copiar Formulário (só em modo edição). */
  onCopy?: () => void
  copyLabel?: string
  showCopy?: boolean

  /** Estado meta — habilita Excluir/Cancelar/Copiar. */
  isEditing?: boolean

  /** Desabilita todos os botões. */
  disabled?: boolean

  /** Hold-to-delete (segurar N ms) ao invés de modal de confirmação. */
  useDelayedDelete?: boolean
  delayedDeleteTimeout?: number

  /** Wrapper opcional de permissão envolvendo o botão Excluir. */
  PermissionWrapper?: React.ComponentType<{ children: React.ReactNode; id?: string }>

  /** Classe adicional no container. */
  className?: string
}

const visible = (callback: unknown, flag: boolean | undefined): boolean =>
  Boolean(callback) && flag !== false

export const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  onSave,
  saveLabel = 'Salvar',
  saveVariant = 'primary',
  showSave,

  onDelete,
  deleteLabel = 'Excluir',
  deleteConfirmMsg,
  needExclusionDetails = false,
  showDelete,

  onBack,
  backLabel = 'Voltar',
  showBack,

  onCancelEdit,
  cancelEditLabel = 'Cancelar',
  showCancelEdit,

  onCopy,
  copyLabel = 'Copiar Formulário',
  showCopy,

  isEditing = false,
  disabled = false,

  useDelayedDelete = false,
  delayedDeleteTimeout = 3000,

  PermissionWrapper,
  className,
}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopHold = () => {
    setHolding(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setProgress(0)
  }

  const startHold = () => {
    if (disabled || !onDelete) return
    setHolding(true)
    setProgress(0)
    const step = 2
    const tickTime = delayedDeleteTimeout / (100 / step)
    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + step))
    }, tickTime)
    timeoutRef.current = setTimeout(() => {
      stopHold()
      onDelete()
    }, delayedDeleteTimeout)
  }

  const renderDeleteButton = () => {
    if (!isEditing || !visible(onDelete, showDelete)) return null

    if (useDelayedDelete) {
      return (
        <div className="relative inline-block m-0.5">
          <Button
            variant="outline-danger"
            onMouseDown={startHold}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={startHold}
            onTouchEnd={stopHold}
            disabled={disabled}
            leftIcon={<FiTrash2 />}
            className="min-w-[120px]"
          >
            {holding ? 'Segure...' : deleteLabel}
          </Button>
          {holding && (
            <Progress
              value={progress}
              tone="error"
              size="sm"
              className="absolute bottom-0 left-0 right-0 rounded-none rounded-b-md"
            />
          )}
        </div>
      )
    }

    return (
      <Button
        variant="danger"
        onClick={() => setShowConfirm(true)}
        disabled={disabled}
        leftIcon={<FiTrash2 />}
        className="m-0.5"
      >
        {deleteLabel}
      </Button>
    )
  }

  const deleteButton = renderDeleteButton()
  const wrappedDelete =
    deleteButton && PermissionWrapper ? <PermissionWrapper>{deleteButton}</PermissionWrapper> : deleteButton

  return (
    <>
      <DeleteConfirm
        show={showConfirm}
        onHide={setShowConfirm}
        onConfirm={(details) => onDelete?.(details)}
        dialogText={deleteConfirmMsg}
        needExclusionDetails={needExclusionDetails}
      />

      <div className={cn('flex flex-wrap items-center mt-3 gap-1', className)}>
        {visible(onBack, showBack) && (
          <Button
            variant="outline-secondary"
            onClick={onBack}
            disabled={disabled}
            leftIcon={<FiChevronLeft />}
            className="m-0.5"
          >
            {backLabel}
          </Button>
        )}

        {isEditing && visible(onCancelEdit, showCancelEdit) && (
          <Button
            variant="warning"
            onClick={onCancelEdit}
            disabled={disabled}
            leftIcon={<FiRotateCcw />}
            className="m-0.5"
          >
            {cancelEditLabel}
          </Button>
        )}

        {wrappedDelete}

        {visible(onSave, showSave) && (
          <Button
            variant={saveVariant as ButtonVariant}
            onClick={onSave}
            disabled={disabled}
            leftIcon={<FiSave />}
            className="m-0.5"
          >
            {saveLabel}
          </Button>
        )}

        {isEditing && visible(onCopy, showCopy) && (
          <Button
            variant="outline-primary"
            onClick={onCopy}
            disabled={disabled}
            leftIcon={<FiCopy />}
            className="m-0.5"
          >
            {copyLabel}
          </Button>
        )}
      </div>
    </>
  )
}
