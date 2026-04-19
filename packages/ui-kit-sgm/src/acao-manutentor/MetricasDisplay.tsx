// @ts-nocheck
import React from 'react'
import { BsWrenchAdjustableCircleFill, BsFillStopwatchFill } from 'react-icons/bs'

/**
 * MetricasDisplay (ui-kit-sgm) — Wave 2C internal.
 *
 * Subcomponente presentacional usado pelo ManutentorCard para exibir
 * métricas (tempo médio de execução e wrench time). Sem IO.
 */

export interface MetricasDisplayProps {
  metricas?: {
    tempoProdutivo?: string | number
    tempoOcioso?: string | number
    tempoMedioExecucao?: string | number
  } | string
  wrenchTime?: string | number
}

export const MetricasDisplay: React.FC<MetricasDisplayProps> = ({
  metricas,
  wrenchTime,
}) => {
  const safe = typeof metricas === 'object' && metricas !== null ? metricas : {}
  const { tempoMedioExecucao = '-' } = safe as any
  return (
    <div className="w-100 d-flex justify-content-center gap-4 align-items-center text-center">
      <span className="d-flex align-items-center gap-2">
        <BsWrenchAdjustableCircleFill />
        {wrenchTime}
      </span>
      <span className="d-flex align-items-center gap-2">
        <BsFillStopwatchFill />
        {tempoMedioExecucao}
      </span>
    </div>
  )
}

export default MetricasDisplay
