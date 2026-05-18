// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/EstatisticasFrequenciaDashboard.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Barra de progresso compacta de
// realizado/planejado + linha de frequencia (planejada vs realizada). Pure VM.
import * as React from 'react'
import { Progress } from '@hashcodeti/ui-kit-core'

const fmtNum = (v: unknown, dec = 2): string =>
  Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : '-'

const formattedTime = (ms: number | undefined | null): string => {
  if (!ms || !Number.isFinite(Number(ms))) return '-'
  const totalSeconds = Math.floor(Number(ms) / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

export interface EstatisticasFrequenciaVM {
  totalControles?: number
  realizado?: number
  planejado?: number
  realizadoPct?: number
  frequenciaPlanejada?: number
  frequenciaRealizada?: number
  frequenciaPct?: number
}

export interface EstatisticasFrequenciaDashboardProps {
  titulo?: string
  estatisticas?: EstatisticasFrequenciaVM
  className?: string
}

export const EstatisticasFrequenciaDashboard: React.FC<
  EstatisticasFrequenciaDashboardProps
> = ({ titulo, estatisticas, className }) => {
  const totalControles = estatisticas?.totalControles ?? 0
  const realizado = estatisticas?.realizado ?? 0
  const planejado = estatisticas?.planejado ?? 0
  const frequenciaPlanejada = estatisticas?.frequenciaPlanejada ?? 0
  const frequenciaRealizada = estatisticas?.frequenciaRealizada ?? 0
  const frequenciaPct = estatisticas?.frequenciaPct
  const realizadoPctRaw = (estatisticas?.realizadoPct ?? 0) * 100
  const realizadoPct = Number.isFinite(realizadoPctRaw)
    ? realizadoPctRaw.toFixed(2)
    : '0.00'

  return (
    <div className={className}>
      <div className="text-xs text-neutral-500">{titulo || 'Frequência'}</div>
      <div className="flex items-center gap-2">
        <Progress value={Number(realizadoPct)} max={100} className="flex-1" />
        <div className="min-w-[50px] text-right text-sm">{realizadoPct}%</div>
      </div>
      <div className="text-xs text-neutral-500">
        {totalControles > 0 ? `Controles: ${totalControles} • ` : ''}
        Realizado: {fmtNum(realizado, 0)} • Planejado: {fmtNum(planejado, 0)}
      </div>
      {(frequenciaPlanejada > 0 ||
        frequenciaRealizada > 0 ||
        frequenciaPct !== undefined) && (
        <div className="text-xs text-neutral-500">
          {totalControles > 0 ? `Controles: ${totalControles} • ` : ''}
          {frequenciaPlanejada > 0 &&
            `Frequência 1 vez a cada: ${formattedTime(frequenciaPlanejada)} • `}
          {frequenciaRealizada > 0 &&
            `Realizada 1 a cada: ${formattedTime(frequenciaRealizada)} `}
          {frequenciaPct !== undefined &&
            `•Proximidade da frequência: ${fmtNum(frequenciaPct, 1)}%`}
        </div>
      )}
    </div>
  )
}

export default EstatisticasFrequenciaDashboard
