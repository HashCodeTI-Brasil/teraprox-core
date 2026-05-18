// @ts-nocheck
// Promovido de teraprox-SGP-ordemDeCorrecao/src/Components/processo/AutorizacaoCard.tsx
// Wave E.2.1 — DOMAIN_PURO: zero Redux, zero useCoreService.
// Wave F.2.A — react-bootstrap removido. Migrado para ui-kit-core (Card/Button/Badge/Spinner) + Tailwind.
import React, { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  Spinner,
  type BadgeTone,
} from '@hashcodeti/ui-kit-core'

const statusTone: Record<string, BadgeTone> = {
  AGUARDANDO: 'warning',
  APROVADA: 'success',
  REJEITADA: 'danger',
}

const fmt = (val: any) => (val != null ? Number(val).toFixed(3) : '—')

export interface AutorizacaoVM {
  id: string | number
  ordemDeCorrecaoId?: string | number
  status?: 'AGUARDANDO' | 'APROVADA' | 'REJEITADA' | string
  valorMedido?: number | string
  valorCorrigido?: number | string
  valorMinimoAutonomo?: number | string
  valorMaximoAutonomo?: number | string
  motivo?: string
}

export interface AutorizacaoCardProps {
  autorizacao: AutorizacaoVM
  onAprovar: (id: string | number) => Promise<void> | void
  onRejeitar: (id: string | number, motivo: string) => Promise<void> | void
  /** Render prop opcional para o modal de rejeicao (caller controla). */
  renderRejeicaoModal?: (args: {
    show: boolean
    onHide: () => void
    onConfirm: (motivo: string) => Promise<void> | void
    loading: boolean
  }) => React.ReactNode
}

export const AutorizacaoCard = ({
  autorizacao,
  onAprovar,
  onRejeitar,
  renderRejeicaoModal,
}: AutorizacaoCardProps) => {
  const [showRejeicaoModal, setShowRejeicaoModal] = useState<boolean>(false)
  const [loadingAprovar, setLoadingAprovar] = useState<boolean>(false)
  const [loadingRejeitar, setLoadingRejeitar] = useState<boolean>(false)

  const isAguardando = autorizacao?.status === 'AGUARDANDO'
  const tone: BadgeTone =
    statusTone[autorizacao?.status as string] || 'secondary'

  const handleAprovar = async () => {
    setLoadingAprovar(true)
    try {
      await onAprovar(autorizacao.id)
    } finally {
      setLoadingAprovar(false)
    }
  }

  const handleConfirmRejeitar = async (motivo: string) => {
    setLoadingRejeitar(true)
    try {
      await onRejeitar(autorizacao.id, motivo)
      setShowRejeicaoModal(false)
    } finally {
      setLoadingRejeitar(false)
    }
  }

  return (
    <>
      <Card className="shadow-sm border-0 mb-3">
        <CardBody>
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-neutral-500 text-xs">
                Ordem #{autorizacao?.ordemDeCorrecaoId}
              </span>
              {' · '}
              <Badge tone={tone}>{autorizacao?.status || '—'}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-6 md:col-span-3">
              <div className="text-neutral-500 text-xs font-bold">Valor Medido</div>
              <div>{fmt(autorizacao?.valorMedido)}</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-neutral-500 text-xs font-bold">Valor Corrigido</div>
              <div>{fmt(autorizacao?.valorCorrigido)}</div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="text-neutral-500 text-xs font-bold">Faixa de Autonomia</div>
              <div>
                {fmt(autorizacao?.valorMinimoAutonomo)} – {fmt(autorizacao?.valorMaximoAutonomo)}
              </div>
            </div>
          </div>

          {autorizacao?.motivo && (
            <div className="mb-2">
              <span className="text-neutral-500 text-xs font-bold">
                Motivo da rejeição:{' '}
              </span>
              <span className="text-xs">{autorizacao.motivo}</span>
            </div>
          )}

          {isAguardando && (
            <div className="flex gap-2 mt-3">
              <Button
                variant="success"
                size="sm"
                onClick={handleAprovar}
                disabled={loadingAprovar || loadingRejeitar}
                leftIcon={loadingAprovar ? <Spinner size="sm" /> : null}
              >
                {loadingAprovar ? 'Aprovando...' : '✓ Aprovar'}
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => setShowRejeicaoModal(true)}
                disabled={loadingAprovar || loadingRejeitar}
              >
                ✗ Rejeitar
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {renderRejeicaoModal?.({
        show: showRejeicaoModal,
        onHide: () => setShowRejeicaoModal(false),
        onConfirm: handleConfirmRejeitar,
        loading: loadingRejeitar,
      })}
    </>
  )
}

export default AutorizacaoCard
