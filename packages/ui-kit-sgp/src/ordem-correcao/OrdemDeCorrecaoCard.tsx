// @ts-nocheck
// Promovido de teraprox-SGP-ordemDeCorrecao/src/Components/processo/OrdemDeCorrecaoCard.tsx
// Wave E.2.1 — DOMAIN_PURO. Mantem react-bootstrap como peer (consistente com Wave 3B).
// Wave F.2.A — react-bootstrap removido. Migrado para ui-kit-core
// (Card/Button/Spinner/InputGroup) + Tailwind. Badge "tarefa" usa span estilizado
// (custom palette/raio fora dos tokens — mantido inline para parity visual).
import React, { useState, memo } from 'react'
import {
  Button,
  Card,
  CardBody,
  Spinner,
  InputGroup,
  InputGroupText,
} from '@hashcodeti/ui-kit-core'

const badgeStyleForStatus = (status: string) => {
  const palette: Record<string, { backgroundColor: string; color: string }> = {
    PENDENTE: { backgroundColor: '#f2994a', color: '#212529' },
    CONCLUIDO: { backgroundColor: '#27ae60', color: '#fff' },
    CANCELADA: { backgroundColor: '#dc3545', color: '#fff' },
    PENDENTE_AUTORIZACAO: { backgroundColor: '#6f42c1', color: '#fff' },
  }
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.35rem 0.75rem',
    borderRadius: '999px',
    fontWeight: 600,
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    ...(palette[(status || '').toUpperCase()] || {
      backgroundColor: '#6c757d',
      color: '#fff',
    }),
  }
}

export interface OrdemDeCorrecaoCardProps {
  ordem: any
  onEditar?: () => void
  onApontar?: () => void
  onViewRegistro?: (registroDeCampoId: any) => void
  onSaveTarefa?: (ordem: any, tarefa: any) => Promise<void> | void
  onSaveTarefaViaRabbit?: (ordem: any, tarefa: any) => Promise<void> | void
  onCancel?: (ordem: any) => void
}

const OrdemDeCorrecaoCardImpl = ({
  ordem,
  onEditar,
  onApontar,
  onViewRegistro,
  onSaveTarefa,
  onSaveTarefaViaRabbit,
  onCancel,
}: OrdemDeCorrecaoCardProps) => {
  const [expandedTarefaId, setExpandedTarefaId] = useState<any>(null)
  const [editedTarefa, setEditedTarefa] = useState<any>(null)
  const [savingTarefa, setSavingTarefa] = useState<boolean>(false)

  const isCancelled = ordem?.status === 'CANCELADA'
  const isConcluido = ordem?.status === 'CONCLUIDO'

  const handleExpandTarefa = (tarefa) => {
    if (expandedTarefaId === tarefa.id) {
      setExpandedTarefaId(null)
      setEditedTarefa(null)
    } else {
      setExpandedTarefaId(tarefa.id)
      setEditedTarefa(JSON.parse(JSON.stringify(tarefa)))
    }
  }

  const handleQuantityChange = (tumId, value) => {
    if (!editedTarefa) return
    const parsedValue = value.replace(',', '.')
    const updatedTums = editedTarefa.tarefasUnidadeMaterial.map((tum) => {
      if (tum.id === tumId) {
        return { ...tum, quantidade: isNaN(parsedValue) ? value : parsedValue }
      }
      return tum
    })
    setEditedTarefa({ ...editedTarefa, tarefasUnidadeMaterial: updatedTums })
  }

  const fillEmptyWithPlanned = (tums: any[]) =>
    tums?.map((tum) => {
      const currentQtd = tum.quantidade
      if (!currentQtd || currentQtd == 0 || currentQtd === '0' || currentQtd === '') {
        const plannedValue = tum.unidadeMaterial?.quantidade
        if (plannedValue !== undefined && plannedValue !== null) {
          return { ...tum, quantidade: plannedValue }
        }
      }
      return tum
    })

  const handleConcluirClick = async () => {
    if (!onSaveTarefa || !editedTarefa) return
    setSavingTarefa(true)
    const updatedTums = fillEmptyWithPlanned(editedTarefa.tarefasUnidadeMaterial)
    const tarefaConcluida = {
      ...editedTarefa,
      status: 'CONCLUIDO',
      tarefasUnidadeMaterial: updatedTums,
    }
    try {
      await onSaveTarefa(ordem, tarefaConcluida)
      setExpandedTarefaId(null)
      setEditedTarefa(null)
    } catch (error) {
      console.error('Erro ao salvar tarefa', error)
    } finally {
      setSavingTarefa(false)
    }
  }

  const handleConcluirViaRabbitClick = async () => {
    if (!onSaveTarefaViaRabbit || !editedTarefa) return
    setSavingTarefa(true)
    const updatedTums = fillEmptyWithPlanned(editedTarefa.tarefasUnidadeMaterial)
    const tarefaConcluida = {
      ...editedTarefa,
      status: 'CONCLUIDO',
      tarefasUnidadeMaterial: updatedTums,
    }
    try {
      await onSaveTarefaViaRabbit(ordem, tarefaConcluida)
      setExpandedTarefaId(null)
      setEditedTarefa(null)
    } catch (error) {
      console.error('Erro ao salvar tarefa via AMQP', error)
    } finally {
      setSavingTarefa(false)
    }
  }

  const cardStyle: any = {
    transition: 'all 0.3s ease',
    border: '2px solid #dee2e6',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    ...(isCancelled
      ? { opacity: 0.6, backgroundColor: '#f5f5f5', borderColor: '#e0e0e0' }
      : {}),
  }
  const cardHoverStyle: any = !isCancelled
    ? {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        borderColor: '#007bff',
        backgroundColor: '#ffffff',
      }
    : {}

  return (
    <Card
      className="mb-4 ordem-correcao-card h-full"
      style={cardStyle}
      onMouseEnter={(e) => {
        if (!isCancelled)
          Object.assign(e.currentTarget.style, { ...cardStyle, ...cardHoverStyle })
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, cardStyle)
      }}
    >
      <CardBody className="flex flex-col" style={{ padding: '1.5rem' }}>
        <div className="flex flex-col gap-3 flex-grow">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  letterSpacing: '0.5px',
                }}
              >
                OC #{ordem.id}
              </div>
            </div>
            <div className="text-neutral-500 mb-2" style={{ fontSize: '0.9rem' }}>
              <div className="flex items-center gap-2 mb-1">
                <strong>Registro de Campo:</strong>
                <span
                  className="text-info font-bold underline cursor-pointer"
                  onClick={() => onViewRegistro && onViewRegistro(ordem.registroDeCampoId)}
                  title="Ver detalhes do registro"
                >
                  {ordem.registroDeCampoId || '-'}
                </span>
              </div>
              <div
                className="flex items-center gap-3 mt-2 p-2"
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #007bff',
                  borderRadius: '8px',
                }}
              >
                <div className="flex flex-col flex-grow">
                  <span
                    className="text-neutral-500 uppercase"
                    style={{ fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.5px' }}
                  >
                    Agrupamento
                  </span>
                  <span className="text-neutral-900 font-bold" style={{ fontSize: '0.9rem' }}>
                    {ordem.recurso?.agrupamento || '-'}
                  </span>
                </div>
                <div style={{ width: '2px', height: '35px', backgroundColor: '#dee2e6' }} />
                <div className="flex flex-col flex-grow">
                  <span
                    className="text-neutral-500 uppercase"
                    style={{ fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.5px' }}
                  >
                    Recurso
                  </span>
                  <span className="text-neutral-900 font-bold" style={{ fontSize: '0.9rem' }}>
                    {ordem.recursoNome || '-'}
                  </span>
                </div>
              </div>
            </div>
            <div className="additional-info">
              {ordem.ordemDeServicoId && (
                <div
                  className="flex items-center gap-2 mb-1 text-neutral-500"
                  style={{ fontSize: '0.85rem' }}
                >
                  <strong>OS:</strong>{' '}
                  <span className="text-neutral-900">{ordem.ordemDeServicoId}</span>
                </div>
              )}
              {ordem.abertoPor && (
                <div
                  className="flex items-center gap-2 mb-1 text-neutral-500"
                  style={{ fontSize: '0.85rem' }}
                >
                  <strong>Aberto por:</strong>{' '}
                  <span className="text-neutral-900">{ordem.abertoPor}</span>
                </div>
              )}
              {ordem.executadoPor && (
                <div
                  className="flex items-center gap-2 mb-1 text-neutral-500"
                  style={{ fontSize: '0.85rem' }}
                >
                  <strong>Executado por:</strong>{' '}
                  <span className="text-neutral-900">{ordem.executadoPor}</span>
                </div>
              )}
              {ordem.dataDeAbertura && (
                <div
                  className="flex items-center gap-2 mb-1 text-neutral-500"
                  style={{ fontSize: '0.85rem' }}
                >
                  <strong>Abertura:</strong>{' '}
                  <span className="text-neutral-900">
                    {new Date(ordem.dataDeAbertura).toLocaleString()}
                  </span>
                </div>
              )}
              {ordem.dataDeEncerramento && (
                <div
                  className="flex items-center gap-2 mb-1 text-neutral-500"
                  style={{ fontSize: '0.85rem' }}
                >
                  <strong>Encerramento:</strong>{' '}
                  <span className="text-neutral-900">
                    {new Date(ordem.dataDeEncerramento).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            <div
              className="mt-3"
              style={{
                backgroundColor: '#fffbf0',
                border: '1px solid #ffe082',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                maxHeight: '120px',
                overflowY: 'auto',
              }}
            >
              <div className="flex items-start gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: '2px' }}
                >
                  <path
                    d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
                    fill="#f9a825"
                  />
                  <circle cx="8" cy="10" r="1.5" fill="#f9a825" />
                  <circle cx="12" cy="10" r="1.5" fill="#f9a825" />
                  <circle cx="16" cy="10" r="1.5" fill="#f9a825" />
                </svg>
                <span
                  className="text-neutral-900"
                  style={{ fontSize: '0.85rem', lineHeight: '1.4' }}
                >
                  {ordem.observacao || (
                    <span className="text-neutral-500 italic">Sem observações.</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {ordem.tarefas?.length > 0 && (
            <div className="mt-2 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-neutral-500 uppercase font-bold"
                  style={{ fontSize: '0.8rem', letterSpacing: '1px' }}
                >
                  Tarefas ({ordem.tarefas.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ordem.tarefas.map((tarefa, index) => {
                  const isExpanded = expandedTarefaId === tarefa.id
                  const isTarefaConcluida = tarefa.status === 'CONCLUIDO'
                  return (
                    <div key={tarefa.id || index} className="w-full">
                      <span
                        onClick={() => handleExpandTarefa(tarefa)}
                        style={{
                          cursor: 'pointer',
                          padding: '0.5rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          opacity: expandedTarefaId && !isExpanded ? 0.6 : 1,
                          transition: 'all 0.2s',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                          maxWidth: '100%',
                          wordBreak: 'break-word',
                          backgroundColor: isTarefaConcluida ? '#198754' : '#0d6efd',
                          color: '#fff',
                        }}
                      >
                        <span>{tarefa.descricao || 'Sem descrição'}</span>
                        <span
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '10px',
                            fontSize: '0.7em',
                          }}
                        >
                          {tarefa.tarefasUnidadeMaterial?.length || 0} materiais
                        </span>
                        <span>{isExpanded ? '▲' : '▼'}</span>
                      </span>

                      {isExpanded && editedTarefa && (
                        <div
                          className="mt-2 p-3 rounded"
                          style={{ border: '1px solid #dee2e6', background: '#f8f9fa' }}
                        >
                          <h6
                            className="text-neutral-500 mb-3"
                            style={{ fontSize: '0.85rem' }}
                          >
                            Apontamento Rápido
                          </h6>
                          {editedTarefa.tarefasUnidadeMaterial?.map((tum) => (
                            <div
                              key={tum.id}
                              className="mb-3 pb-3 last-no-border"
                              style={{ borderBottom: '1px solid #dee2e6' }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div
                                    className="font-bold text-neutral-900"
                                    style={{ fontSize: '0.9rem' }}
                                  >
                                    {tum.unidadeMaterial?.nomeMaterial}
                                  </div>
                                  <div
                                    className="text-neutral-500"
                                    style={{ fontSize: '0.75rem' }}
                                  >
                                    Recomendado: {tum.unidadeMaterial?.quantidade}{' '}
                                    {tum.unidadeMaterial?.unidadeLabel}
                                  </div>
                                </div>
                              </div>
                              <InputGroup size="sm">
                                <InputGroupText>
                                  Qtd ({tum.unidadeMaterial?.unidadeLabel})
                                </InputGroupText>
                                <input
                                  type="number"
                                  value={tum.quantidade}
                                  onChange={(e) =>
                                    handleQuantityChange(tum.id, e.target.value)
                                  }
                                  className="flex-1 h-8 px-3 text-sm border border-neutral-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                />
                              </InputGroup>
                            </div>
                          ))}
                          <div className="flex items-center justify-end mt-3 gap-2">
                            {onSaveTarefaViaRabbit && (
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handleConcluirViaRabbitClick}
                                disabled={savingTarefa}
                                title="Publicar na fila AMQP para teste"
                                leftIcon={
                                  savingTarefa ? <Spinner size="sm" /> : <span>🐇</span>
                                }
                              >
                                {savingTarefa ? '...' : 'AMQP'}
                              </Button>
                            )}
                            <Button
                              variant="success"
                              size="sm"
                              onClick={handleConcluirClick}
                              disabled={savingTarefa}
                              leftIcon={
                                savingTarefa ? <Spinner size="sm" /> : <span>✅</span>
                              }
                            >
                              {savingTarefa ? 'Salvando...' : 'Concluir'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div
          className="mt-3 pt-3"
          style={{ borderTop: '1px solid #dee2e6' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="w-full md:w-auto text-center md:text-left">
              {ordem.status && (
                <span style={badgeStyleForStatus(ordem.status)}>
                  {(ordem.status || '').toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onEditar}
                className="w-full md:w-auto"
                disabled={isCancelled}
                style={{
                  borderWidth: '2px',
                  fontWeight: '600',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                }}
              >
                Editar
              </Button>
              {!isCancelled && !isConcluido && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onCancel && onCancel(ordem)}
                  className="w-full md:w-auto"
                  style={{
                    borderWidth: '2px',
                    fontWeight: '600',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export const OrdemDeCorrecaoCard = memo(
  OrdemDeCorrecaoCardImpl,
  (prevProps, nextProps) => prevProps.ordem === nextProps.ordem,
)
export default OrdemDeCorrecaoCard
