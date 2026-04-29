import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { FaRegComments } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'

/**
 * ObservacaoModal — modal apresentacional de chat de observacoes/justificativas.
 *
 * Promovido de `teraprox-SGM-OS/Components/manutencao/ObservacaoModal.js` para
 * `@teraprox/ui-kit-sgm` na sprint 2026-04-29 (tarefa-item-unified, Phase 2),
 * sem dependencia de Redux ou ChatComponent legacy. Apresentacao + state local
 * apenas; IO via callbacks (`onSend`, `onUpdate`, `onRemove`).
 *
 * Uso tipico (consumido por TarefaItem em ui-kit-sgm):
 *   <ObservacaoModal
 *     show={showObs}
 *     onClose={() => setShowObs(false)}
 *     observacoes={vm.observacoes.list}
 *     currentUserId={userId}
 *     currentUserName={fullName}
 *     readOnly={mode === 'readOnly'}
 *     onSend={(texto) => vm.observacoes.add({ texto })}
 *   />
 */

export interface ObservacaoMessage {
  id?: string | number
  descricao?: string
  nomeUsuario?: string
  userId?: string | number
  createdAt?: string | Date
  [k: string]: unknown
}

export interface ObservacaoModalProps {
  /** Controla a visibilidade do modal */
  show: boolean
  /** Fecha o modal (clicar X / ESC / overlay) */
  onClose: () => void
  /** Mensagens existentes (carregadas pelo caller via vm.observacoes.load()) */
  observacoes?: ObservacaoMessage[] | null
  /** Id do usuario atual — destaca bubbles "sent" vs "received" */
  currentUserId?: string | number
  /** Nome do usuario atual — incluido no payload de envio */
  currentUserName?: string
  /** Modo somente-leitura: sem campo de envio nem edicao */
  readOnly?: boolean
  /** Callback de envio. Recebe o texto digitado. */
  onSend?: (texto: string) => void | Promise<void>
  /** Callback opcional de edicao de mensagem existente. */
  onUpdate?: (msg: { id?: string | number; descricao: string; index: number }) => void
  /** Callback opcional de remocao de mensagem existente. */
  onRemove?: (msg: ObservacaoMessage) => void
  /** Titulo do modal (default: "Chat de Observacoes") */
  title?: string
}

export const ObservacaoModal: React.FC<ObservacaoModalProps> = ({
  show,
  onClose,
  observacoes,
  currentUserId,
  currentUserName,
  readOnly = false,
  onSend,
  onUpdate,
  onRemove,
  title,
}) => {
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const sortedMessages = useMemo<ObservacaoMessage[]>(() => {
    const list = Array.isArray(observacoes) ? observacoes.slice() : []
    return list.sort((a, b) => {
      const ta = a?.createdAt ? new Date(a.createdAt as any).getTime() : 0
      const tb = b?.createdAt ? new Date(b.createdAt as any).getTime() : 0
      return ta - tb
    })
  }, [observacoes])

  useEffect(() => {
    if (!show) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [sortedMessages, show])

  const handleSendMessage = async () => {
    const trimmed = newMessage.trim()
    if (!trimmed || !onSend) return
    try {
      setSending(true)
      await onSend(trimmed)
      setNewMessage('')
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void handleSendMessage()
    }
  }

  return (
    <Modal show={show} size="lg" onHide={onClose}>
      <ModalHeader closeButton>
        <h5>{title ?? 'Chat de Observações'}</h5>
      </ModalHeader>
      <ModalBody>
        <div className="chat-container">
          <div className="chat-messages">
            {sortedMessages.length === 0 ? (
              <div className="no-messages">
                <FaRegComments size={40} className="no-messages-icon" />
                <p className="no-messages-text">
                  {!readOnly ? (
                    <>
                      Nenhuma mensagem ainda. <br />
                      Seja o(a) primeiro(a) a dizer algo!
                    </>
                  ) : (
                    'Não há nada para ler.'
                  )}
                </p>
              </div>
            ) : (
              sortedMessages.map((msg, index) => {
                const isCurrentUser =
                  currentUserId !== undefined && msg.userId === currentUserId
                const ts = msg.createdAt
                  ? new Date(msg.createdAt as any).toLocaleTimeString()
                  : ''
                return (
                  <div
                    key={(msg.id as any) ?? `obs-${index}`}
                    className={`message-bubble ${
                      isCurrentUser ? 'sent' : 'received'
                    }`}
                  >
                    <div className="message-header">
                      <strong>{msg.nomeUsuario ?? '-'}</strong>
                      <span className="message-time">{ts}</span>
                    </div>
                    <div className="message-content">
                      {!readOnly && onUpdate ? (
                        <span
                          role="textbox"
                          tabIndex={0}
                          onClick={() =>
                            onUpdate({
                              id: msg.id,
                              descricao: String(msg.descricao ?? ''),
                              index,
                            })
                          }
                          style={{ cursor: 'text' }}
                        >
                          {msg.descricao}
                        </span>
                      ) : (
                        <span>{msg.descricao}</span>
                      )}
                      {!readOnly && onRemove && (
                        <Button
                          variant="link"
                          size="sm"
                          className="ms-2 p-0"
                          onClick={() => onRemove(msg)}
                          aria-label="Remover observação"
                        >
                          remover
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={`send-field ${readOnly ? 'locked-chat' : ''}`}>
            {!readOnly ? (
              <>
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentUserName
                      ? `Digite uma mensagem como ${currentUserName}...`
                      : 'Digite uma mensagem...'
                  }
                  className="send-input"
                  disabled={sending}
                />
                <Button
                  variant="primary"
                  onClick={() => void handleSendMessage()}
                  className="send-button"
                  disabled={sending || !newMessage.trim()}
                >
                  <GrSend />
                </Button>
              </>
            ) : (
              <Form.Control
                style={{ cursor: 'not-allowed' }}
                disabled
                value={'Indisponível'}
              />
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ObservacaoModal
