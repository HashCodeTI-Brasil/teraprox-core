// @hashcodeti/ui-kit-sgp/justificativa/JustificativaModal
//
// Migração do `JustificativaModal` de `teraprox-ui-kit` legado.
// Stack-puro: zero react-bootstrap. Usa Modal/Button/TextField/Badge/Tooltip
// de @hashcodeti/ui-kit-core + Tailwind direto para bubble layout.
//
// View-pure: zero Redux, zero useCoreService. Estado interno limitado a
// rascunho da nova mensagem + id em edição. I/O via onUpdateJustificativas.
//
// Domínio SGP: vocabulário "comentário em registro de campo" (SGP-caderno + SGP-PC).

import * as React from 'react'
import dayjs from 'dayjs'
import { FaTrashAlt, FaUndo } from 'react-icons/fa'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TextField,
  Badge,
  Tooltip,
  TooltipProvider,
} from '@hashcodeti/ui-kit-core'

export interface Justificativa {
  id: string | number
  descricao: string
  user?: {
    userId: string | number
    userName?: string
    firstName?: string
  }
  createdAt: string | number | Date
  removed?: boolean
  isNew?: boolean
}

export interface JustificativaModalProps {
  /** Visibilidade do modal. */
  show: boolean
  /** Callback de fechamento (overlay/ESC/X). */
  onClose: () => void
  /** Lista atual de justificativas. */
  justificativas: Justificativa[]
  /** ID do usuário corrente (para identificar autoria). */
  currentUserId: string | number
  /** Nome/Primeiro nome do usuário corrente. */
  currentUserName: string
  /** Callback chamado a cada add/edit/remove/undo. Pode ser async. */
  onUpdateJustificativas: (justificativas: Justificativa[]) => Promise<void> | void
}

function localId() {
  return Math.random().toString(36).slice(2, 11)
}

/**
 * JustificativaModal — modal estilo chat para comentários sobre um registro
 * de campo. Mensagens próprias à esquerda, alheias à direita. Edição inline
 * apenas das próprias. Soft-delete + undo (mensagens removidas ficam riscadas).
 *
 * @example
 * <JustificativaModal
 *   show={open}
 *   onClose={() => setOpen(false)}
 *   justificativas={list}
 *   currentUserId={user.id}
 *   currentUserName={user.firstName}
 *   onUpdateJustificativas={async (next) => savePort.update(registroId, next)}
 * />
 *
 * @example
 * // Lista vazia — apenas formulário de "novo registro"
 * <JustificativaModal
 *   show={open}
 *   onClose={close}
 *   justificativas={[]}
 *   currentUserId={42}
 *   currentUserName="Maria"
 *   onUpdateJustificativas={persist}
 * />
 */
export const JustificativaModal: React.FC<JustificativaModalProps> = ({
  show,
  onClose,
  justificativas: initial = [],
  currentUserId,
  currentUserName,
  onUpdateJustificativas,
}) => {
  const [local, setLocal] = React.useState<Justificativa[]>(initial)
  const [draft, setDraft] = React.useState('')
  const [editingId, setEditingId] = React.useState<string | number | null>(null)

  React.useEffect(() => {
    setLocal(initial)
  }, [initial])

  const handleSubmit = async () => {
    if (!draft.trim()) return

    let next: Justificativa[]
    if (editingId) {
      next = local.map((j) =>
        j.id === editingId ? { ...j, descricao: draft } : j,
      )
      setEditingId(null)
    } else {
      const nova: Justificativa = {
        id: localId(),
        descricao: draft,
        user: { userId: currentUserId, firstName: currentUserName },
        createdAt: new Date().toISOString(),
        isNew: true,
      }
      next = [...local, nova]
    }

    setDraft('')
    await onUpdateJustificativas(next)
    setLocal(next)
  }

  const handleRemove = async (id: string | number) => {
    const next = local.map((j) => (j.id === id ? { ...j, removed: true } : j))
    await onUpdateJustificativas(next)
    setLocal(next)
  }

  const handleUndo = async (id: string | number) => {
    const next = local.map((j) => (j.id === id ? { ...j, removed: false } : j))
    await onUpdateJustificativas(next)
    setLocal(next)
  }

  const startEdit = (j: Justificativa) => {
    if (j.removed) return
    setDraft(j.descricao)
    setEditingId(j.id)
  }

  return (
    <Modal open={show} onOpenChange={(o) => !o && onClose()} size="lg">
      <ModalHeader>Justificativas / Comentários</ModalHeader>
      <ModalBody>
        <TooltipProvider>
          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void handleSubmit()
            }}
            className="mb-4"
          >
            <TextField
              label="Novo registro"
              multiline
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Descreva o motivo ou informação adicional..."
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" variant="primary" size="sm" disabled={!draft.trim()}>
                {editingId ? 'Salvar edição' : 'Adicionar justificativa'}
              </Button>
            </div>
          </form>

          {/* Lista de mensagens */}
          {local.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-6">
              Nenhuma justificativa registrada ainda.
            </p>
          ) : (
            <ul role="list" className="flex flex-col gap-3">
              {local.map((j) => {
                const isMe = j.user?.userId === currentUserId
                const authorName = isMe
                  ? 'Você'
                  : j.user?.userName || j.user?.firstName || 'Usuário'
                const timestamp = dayjs(j.createdAt).format('DD/MM [às] HH:mm')

                return (
                  <li
                    key={j.id}
                    role="listitem"
                    aria-label={`Justificativa de ${authorName} em ${timestamp}`}
                    className={[
                      'flex flex-col',
                      isMe ? 'items-start' : 'items-end',
                      j.removed ? 'opacity-50' : '',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'flex items-center gap-2 mb-1 w-full',
                        isMe ? 'justify-start' : 'justify-end',
                      ].join(' ')}
                    >
                      <span className="text-xs font-semibold text-neutral-700">{authorName}</span>
                      <Badge variant="solid" tone="secondary" size="sm" pill={false}>
                        {timestamp}
                      </Badge>
                    </div>

                    <button
                      type="button"
                      onClick={() => isMe && startEdit(j)}
                      disabled={!isMe || j.removed}
                      aria-label={isMe && !j.removed ? 'Editar justificativa' : undefined}
                      className={[
                        'max-w-[85%] text-left px-4 py-3 rounded-xl text-sm',
                        'border shadow-sm transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
                        j.removed
                          ? 'bg-error-muted text-neutral-700 line-through cursor-default border-error/30'
                          : isMe
                          ? 'bg-info-muted text-neutral-900 border-info/30 hover:bg-info-muted/80 cursor-pointer'
                          : 'bg-neutral-50 text-neutral-900 border-neutral-200 cursor-default',
                      ].join(' ')}
                    >
                      {j.descricao}
                    </button>

                    {isMe && (
                      <div className="mt-1.5 flex gap-2">
                        {j.removed ? (
                          <Tooltip content="Desfazer remoção">
                            <button
                              type="button"
                              onClick={() => void handleUndo(j.id)}
                              aria-label="Desfazer remoção"
                              className="inline-flex items-center justify-center h-6 w-6 rounded-md text-success hover:bg-success-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                            >
                              <FaUndo size={12} />
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip content="Remover">
                            <button
                              type="button"
                              onClick={() => void handleRemove(j.id)}
                              aria-label="Remover justificativa"
                              className="inline-flex items-center justify-center h-6 w-6 rounded-md text-error hover:bg-error-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                            >
                              <FaTrashAlt size={12} />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </TooltipProvider>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default JustificativaModal
