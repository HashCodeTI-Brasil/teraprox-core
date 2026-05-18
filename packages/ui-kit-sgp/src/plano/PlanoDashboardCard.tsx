// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/PlanoDashboardCard.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Card resumo do Plano selecionado com
// metricas de Cpk medio, desvios e widget de frequencia. react-bootstrap zero.
// Helpers locais (fmtNum/cpkBadgeTone) replicados in-line — pure functions.
import * as React from 'react'
import { Badge, Card, CardBody, type BadgeTone } from '@hashcodeti/ui-kit-core'
import {
  PlanoBadgeSelector,
  type PlanoBadgeOption,
} from './PlanoBadgeSelector'
import {
  EstatisticasFrequenciaDashboard,
  type EstatisticasFrequenciaVM,
} from '../controle/EstatisticasFrequenciaDashboard'

const fmtNum = (v: unknown, dec = 2): string =>
  Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : '-'

const cpkBadgeTone = (cpk: unknown): BadgeTone => {
  const n = Number(cpk)
  if (!Number.isFinite(n)) return 'secondary'
  if (n >= 1.33) return 'success'
  if (n >= 1.0) return 'warning'
  return 'danger'
}

export interface EstatisticasPlanoVM {
  cpkMedio?: number | null
  totalControles?: number
  totalRegistrosForaGlobal?: number
  totalRegistrosForaPct?: number
  itensAlertaEstatistica?: number
}

export interface PlanoDashboardCardProps {
  selectedPlanoId?: string | number | null
  setSelectedPlanoId: (value: string | number) => void
  planoOptions: PlanoBadgeOption[]
  estatisticasPlano?: EstatisticasPlanoVM
  estatisticasFrequencia?: EstatisticasFrequenciaVM
  className?: string
}

export const PlanoDashboardCard: React.FC<PlanoDashboardCardProps> = ({
  selectedPlanoId,
  setSelectedPlanoId,
  planoOptions,
  estatisticasPlano,
  estatisticasFrequencia,
  className,
}) => {
  const totalForaGlobal = estatisticasPlano?.totalRegistrosForaGlobal ?? 0
  const itensAlerta = estatisticasPlano?.itensAlertaEstatistica ?? 0
  return (
    <Card className={className}>
      <CardBody>
        <div className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-12 md:col-span-4">
            <label className="block text-xs font-bold text-neutral-500 mb-1">
              Plano de Controle
            </label>
            <PlanoBadgeSelector
              selectedPlanoId={selectedPlanoId}
              setSelectedPlanoId={setSelectedPlanoId}
              planoOptions={planoOptions}
            />
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-6 md:col-span-4">
                <div className="text-xs text-neutral-500">Cpk (médio do plano)</div>
                <h5 className="m-0 mb-1">
                  <Badge tone={cpkBadgeTone(estatisticasPlano?.cpkMedio)}>
                    {fmtNum(estatisticasPlano?.cpkMedio, 3)}
                  </Badge>
                </h5>
                <div className="text-xs text-neutral-500">
                  Controles: {estatisticasPlano?.totalControles ?? 0}
                </div>
              </div>
              <div className="col-span-6 md:col-span-4">
                <div className="text-xs text-neutral-500">Desvios &amp; Alertas</div>
                <h5 className="m-0 mb-1 flex gap-2 items-center">
                  <Badge
                    tone={totalForaGlobal > 0 ? 'danger' : 'success'}
                    title="Total de registros fora de especificação"
                  >
                    {totalForaGlobal} Reg.
                  </Badge>
                  {itensAlerta > 0 && (
                    <Badge
                      tone="warning"
                      title="Controles com alertas estatísticos"
                      style={{ fontSize: '0.6em' }}
                    >
                      {itensAlerta} Ctrs.
                    </Badge>
                  )}
                </h5>
                <div className="text-xs text-neutral-500">
                  {fmtNum(estatisticasPlano?.totalRegistrosForaPct ?? 0, 2)}% fora
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <EstatisticasFrequenciaDashboard
                  estatisticas={estatisticasFrequencia}
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default PlanoDashboardCard
