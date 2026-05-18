// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/indicador-de-analise/ChartWithStats.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Refactor:
// - react-bootstrap Button/Row -> @hashcodeti/ui-kit-core Button + Tailwind.
// - GenericREchart vem de teraprox-ui-kit (peerDep — bridge enquanto wrapper
//   nao migra para Recharts puro em ui-kit-core).
import { Button } from '@hashcodeti/ui-kit-core'
import { GenericREchart as GenericRechartsChart } from 'teraprox-ui-kit'
import { ChartStats, type ChartStatsProps } from './ChartStats'

export interface ChartWithStatsProps {
  data: any[]
  lines: any[]
  xAxisKey: string
  stats: ChartStatsProps
  hideZero?: boolean
  hideYAxis?: boolean
  hideZeroHandler?: (next: boolean) => void
  unit?: string
  enableHideZeroButton?: boolean
  yAxisRange?: any
}

export const ChartWithStats = ({
  data,
  lines,
  xAxisKey,
  stats,
  hideZero,
  hideYAxis,
  hideZeroHandler,
  unit,
  enableHideZeroButton = true,
  yAxisRange,
}: ChartWithStatsProps) => {
  return (
    <div>
      {enableHideZeroButton && hideZeroHandler && (
        <Button className="mb-3" onClick={() => hideZeroHandler(!hideZero)}>
          {hideZero ? 'Mostrar Zeros' : 'Ocultar Zeros'}
        </Button>
      )}

      <GenericRechartsChart
        YAxisRange={yAxisRange}
        data={data}
        lines={lines}
        xAxisKey={xAxisKey}
        showGrid
        showLegend
        showTooltip
        width="100%"
        height={400}
        hideYAxis={hideYAxis}
        unit={unit}
      />

      <div className="mt-4">
        <ChartStats {...stats} />
      </div>
    </div>
  )
}

export default ChartWithStats
