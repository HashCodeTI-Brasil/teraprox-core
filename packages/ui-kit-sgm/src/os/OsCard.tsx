// @ts-nocheck
import React, { memo, useState } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import { FaExclamationTriangle, FaUser, FaClock, FaPlay } from 'react-icons/fa'
import { FaArrowRight, FaArrowsRotate, FaClipboardList, FaPlus, FaPaperPlane } from 'react-icons/fa6'
import dayjs from 'dayjs'
import './OsCard.css'
import { getOsStatusMeta } from './statusPalette'

/**
 * OsCard — promovido do teraprox-SGM-OS/Components/.../OsPlanejada/OsCard.js.
 *
 * Componente puramente apresentacional, props-driven. Usado por:
 *  - SGM-OS Planejamento (com features de virtual/recorrencia/agregador)
 *  - SGM-OM Executar Ordem (sem features extras — passa undefined nos handlers)
 *
 * As features planejamento-only (OS virtual, recorrência, agregador, edição
 * de model) são acionadas por **callbacks opcionais**: se `onCardAction`,
 * `onViewAgregador`, `onViewRecorrencia`, `onEditModel`, `onEdit` não forem
 * fornecidos, os botões/chips correspondentes não aparecem ou ficam mudos.
 *
 * O modal de OS virtual (OsVirtualActionModal) NÃO é mais embutido aqui —
 * o consumer deve renderizá-lo externamente quando `onCardAction` é chamado.
 */

export interface OsCardOrdem {
  id?: number | string
  status?: string
  isLate?: boolean
  isVirtual?: boolean
  modelId?: number | string | null
  recorrenciaId?: number | string | null
  agregadorId?: number | string | null
  /** Id da solicitação de serviço que originou esta OS, quando aplicável.
   *  Quando ausente, considera-se que a OS foi criada manualmente. */
  solicitacaoOrigemId?: number | string | null
  recurso?: { nome?: string } | null
  father?: string | null
  descricaoDoProblema?: string | null
  osMantenedor?: Array<{ mantenedor?: { nomeUsuario?: string; nome?: string }; nome?: string }>
  osTipos?: Array<{ tipoDeOrdem?: { tipo?: string } }>
  dataPlanejada?: string | Date | null
  dataDeEncerramento?: string | Date | null
  setor?: string | null
  setorDestino?: string | null
  tarefas?: Array<unknown>
  realizado?: number
  valorPlanejado?: number
  warn?: number
  eficienciaDoAgregador?: number | null
}

export interface OsCardProps {
  ordem: OsCardOrdem
  onView?: (id: number | string) => void
  onEdit?: (ordem: OsCardOrdem) => void
  onEditModel?: (modelId: number | string | null | undefined) => void
  onCardAction?: (ordem: OsCardOrdem) => void
  onViewAgregador?: (agregadorId: number | string) => void
  onViewRecorrencia?: (recorrenciaId: number | string) => void
  /** Navega para a SS de origem (chip "Origem: SS #X"). Se omitido, o chip vira label não-clicável. */
  onViewSolicitacao?: (solicitacaoId: number | string) => void
  onIniciar?: (ordem: OsCardOrdem) => void | Promise<void>
  onContinuar?: (ordem: OsCardOrdem) => void
  isSelectable?: boolean
  isSelected?: boolean
  onToggleSelect?: (ordem: OsCardOrdem) => void
  disableStatusIndicator?: boolean
  loading?: boolean
}

const IconButton: React.FC<{
  icon: React.ReactNode
  label: string
  onClick: (e: React.MouseEvent) => void
}> = ({ icon, label, onClick }) => (
  <button
    type="button"
    className="os-cta"
    aria-label={label}
    title={label}
    onClick={onClick}
  >
    {icon}
  </button>
)

const OsCardImpl: React.FC<OsCardProps> = ({
  ordem,
  onView,
  onEdit,
  onEditModel,
  onCardAction,
  onViewAgregador,
  onViewRecorrencia,
  onViewSolicitacao,
  onIniciar,
  onContinuar,
  isSelectable,
  isSelected,
  onToggleSelect,
  disableStatusIndicator = false,
  loading = false,
}) => {
  const [iniciando, setIniciando] = useState(false)

  const meta = getOsStatusMeta(ordem.isLate ? 'ATRASADO' : ordem.status)
  const statusUpper = (ordem.status ?? '').toUpperCase()
  const isPendente = statusUpper === 'PENDENTE'
  const isExecutando = statusUpper === 'EXECUTANDO'
  const isRec = Boolean(ordem.recorrenciaId)
  const isAgg = Boolean(ordem.agregadorId)
  const inAlert = isAgg && (ordem.realizado ?? 0) >= (ordem.warn ?? Infinity) && (ordem.realizado ?? 0) < (ordem.valorPlanejado ?? Infinity)
  const isCritical = isAgg && (ordem.realizado ?? 0) >= (ordem.valorPlanejado ?? Infinity)
  const isVirtual = Boolean(ordem.isVirtual)
  const ssOrigemId = ordem.solicitacaoOrigemId
  const hasSsOrigem = ssOrigemId !== undefined && ssOrigemId !== null && ssOrigemId !== ''
  // OS é "direta" quando não vem de SS, recorrência, agregador, nem é modelo virtual.
  const isDireta = !hasSsOrigem && !isRec && !isAgg && !isVirtual && Boolean(ordem.id)
  const canIniciar = !isVirtual && isPendente && Boolean(ordem.id) && Boolean(onIniciar)
  const canContinuar = !isVirtual && isExecutando && Boolean(ordem.id) && Boolean(onContinuar)

  const handleIniciar = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!onIniciar || iniciando) return
    setIniciando(true)
    try {
      await onIniciar(ordem)
    } finally {
      setIniciando(false)
    }
  }

  const handleContinuar = (e: React.MouseEvent) => {
    e.stopPropagation()
    onContinuar?.(ordem)
  }

  const borderColor = !disableStatusIndicator && isCritical
    ? '#ef4444'
    : !disableStatusIndicator && inAlert
    ? '#f59e0b'
    : meta.color

  const cardClass = [
    'mb-2 os-card',
    isSelected ? 'os-card--selected' : '',
    isSelectable ? 'os-card--selectable' : '',
    !disableStatusIndicator && isCritical ? 'os-card--critical' : '',
    !disableStatusIndicator && inAlert ? 'os-card--warn' : '',
  ].filter(Boolean).join(' ')

  const mantenedores = (ordem.osMantenedor || [])
    .map((m: any) => m?.mantenedor?.nomeUsuario || m?.mantenedor?.nome || m?.nome || '')
    .filter(Boolean)

  const counterPercent = isAgg && (ordem.valorPlanejado ?? 0) > 0
    ? Math.min(100, Math.round(((ordem.realizado ?? 0) / (ordem.valorPlanejado as number)) * 100))
    : 0

  return (
    <Card className={cardClass} style={{ borderLeftColor: borderColor }}>
      <Card.Body
        className="p-2 d-flex flex-column gap-1"
        onClick={isSelectable ? () => onToggleSelect?.(ordem) : undefined}
      >
        <div className="d-flex align-items-start justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ minWidth: 0 }}>
            {isVirtual ? (
              <IconButton
                icon={<FaClipboardList />}
                label="Ações para OS virtual"
                onClick={(e) => { e.stopPropagation(); onCardAction?.(ordem) }}
              />
            ) : (
              <IconButton
                icon={<FaArrowRight />}
                label="Ver OS"
                onClick={(e) => { e.stopPropagation(); onView?.(ordem.id as number) }}
              />
            )}
            <div style={{ minWidth: 0, flex: 1 }}>
              {ordem.id && (
                <div style={{ fontSize: '0.72rem', color: '#9ca3af', lineHeight: 1.2 }}>
                  #{ordem.id}
                </div>
              )}
              <div className="os-card__title text-truncate">
                {[ordem.father, ordem.recurso?.nome].filter(Boolean).join(' › ') || 'Recurso'}
              </div>
            </div>
          </div>
          <span
            className="badge flex-shrink-0"
            style={{ backgroundColor: meta.color, color: '#fff', alignSelf: 'flex-start', marginTop: '2px' }}
          >
            {meta.label}
          </span>
        </div>

        {ordem.descricaoDoProblema && (
          <div className="os-card__muted os-card__desc">{ordem.descricaoDoProblema}</div>
        )}

        {(isRec || isAgg || isVirtual || hasSsOrigem || isDireta) && (
          <div className="d-flex flex-wrap gap-1">
            {hasSsOrigem && (
              <button
                type="button"
                className="os-chip"
                onClick={(e) => {
                  e.stopPropagation()
                  if (!isSelectable && onViewSolicitacao) {
                    onViewSolicitacao(ssOrigemId as number)
                  }
                }}
                title={`Originada da Solicitação #${ssOrigemId}`}
                style={{
                  background: '#fef3c7',
                  borderColor: '#fcd34d',
                  color: '#92400e',
                  cursor: onViewSolicitacao && !isSelectable ? 'pointer' : 'default',
                }}
              >
                <FaPaperPlane size={10} /> SS #{ssOrigemId}
              </button>
            )}
            {isDireta && (
              <span
                className="os-chip"
                title="OS criada diretamente, sem solicitação de origem"
                style={{ background: '#f1f5f9', borderColor: '#cbd5e1', color: '#475569' }}
              >
                <FaClipboardList size={10} /> Direta
              </span>
            )}
            {isRec && (
              <button
                type="button"
                className="os-chip"
                onClick={(e) => { e.stopPropagation(); !isSelectable && onViewRecorrencia?.(ordem.recorrenciaId as number) }}
                title="Ver histórico de recorrência"
                style={{ background: '#ede9fe', borderColor: '#c4b5fd', color: '#6d28d9', cursor: onViewRecorrencia ? 'pointer' : 'default' }}
              >
                <FaArrowsRotate size={10} /> Recorrente
              </button>
            )}
            {isAgg && (
              <button
                type="button"
                className="os-chip"
                onClick={(e) => { e.stopPropagation(); !isSelectable && onViewAgregador?.(ordem.agregadorId as number) }}
                title="Ver histórico do contador"
                style={{ background: '#d1fae5', borderColor: '#6ee7b7', color: '#065f46', cursor: onViewAgregador ? 'pointer' : 'default' }}
              >
                <FaPlus size={10} /> Contador
              </button>
            )}
            {isVirtual && (
              <span className="os-chip" style={{ background: '#e0e7ff', borderColor: '#a5b4fc', color: '#3730a3' }}>
                <FaClipboardList size={10} /> OS Virtual
              </span>
            )}
          </div>
        )}

        {isAgg && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small className="os-card__muted">
                {ordem.realizado ?? 0} / {ordem.valorPlanejado ?? '-'}
                {ordem.eficienciaDoAgregador != null && (
                  <span className="ms-1">
                    ({Number(ordem.eficienciaDoAgregador).toFixed(1)}%)
                  </span>
                )}
              </small>
              {isCritical && (
                <span className="os-card__alert-badge">
                  <FaExclamationTriangle size={9} /> LIMITE ATINGIDO
                </span>
              )}
              {inAlert && !isCritical && (
                <span className="os-card__alert-badge">
                  <FaExclamationTriangle size={9} /> PRÓX. LIMITE
                </span>
              )}
            </div>
            <div style={{ height: '4px', borderRadius: '2px', background: '#e9ecef', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${counterPercent}%`,
                background: isCritical ? '#ef4444' : inAlert ? '#f59e0b' : meta.color,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        )}

        {mantenedores.length > 0 && (
          <div className="os-card__muted d-flex align-items-center gap-1 text-truncate">
            <FaUser size={10} className="flex-shrink-0" />
            <span className="text-truncate">{mantenedores.join(', ')}</span>
          </div>
        )}

        {!isSelectable && (canIniciar || canContinuar) && (
          <div className="d-flex justify-content-end">
            {canIniciar && (
              <Button
                size="sm"
                variant="primary"
                onClick={handleIniciar}
                disabled={iniciando || loading}
                className="d-flex align-items-center gap-1"
              >
                {iniciando ? (
                  <Spinner size="sm" animation="border" role="status" />
                ) : (
                  <FaPlay size={10} />
                )}
                Iniciar
              </Button>
            )}
            {canContinuar && (
              <Button
                size="sm"
                variant="warning"
                onClick={handleContinuar}
                disabled={loading}
                className="d-flex align-items-center gap-1"
              >
                <FaPlay size={10} />
                Continuar
              </Button>
            )}
          </div>
        )}

        <div
          className="d-flex align-items-center gap-2 os-card__muted"
          style={{ borderTop: '1px solid #f3f4f6', paddingTop: '4px', fontSize: '0.78rem' }}
        >
          <span className="d-flex align-items-center gap-1 flex-grow-1 text-truncate">
            <FaClock size={9} className="flex-shrink-0" />
            {ordem.dataPlanejada ? dayjs(ordem.dataPlanejada).format('DD/MM [às] HH:mm') : '—'}
            {ordem.status === 'CONCLUIDO' && ordem.dataDeEncerramento && (
              <span className="text-success ms-1">
                · enc. {dayjs(ordem.dataDeEncerramento).format('DD/MM')}
              </span>
            )}
          </span>
          {(ordem.setorDestino || ordem.setor) && (
            <span className="text-truncate flex-shrink-0" style={{ maxWidth: '110px' }}>
              {ordem.setorDestino || ordem.setor}
            </span>
          )}
          {Array.isArray(ordem.tarefas) && ordem.tarefas.length > 0 && (
            <span className="badge bg-secondary d-flex align-items-center gap-1 flex-shrink-0" style={{ fontSize: '0.72rem' }}>
              <FaClipboardList size={9} />
              {ordem.tarefas.length}
            </span>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export const OsCard = memo(OsCardImpl)
OsCard.displayName = 'OsCard'

export default OsCard
