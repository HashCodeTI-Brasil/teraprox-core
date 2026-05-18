// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/indicador-de-analise/ChartStats.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. CSS legado substituido por Tailwind.
export interface ChartStatsProps {
  media?: number | string
  minimo?: number | string
  maximo?: number | string
  cpk?: number | string
  atendimentoFrequencia?: number | string
  frequenciaMedia?: number | string
}

export const ChartStats = ({
  media,
  minimo,
  maximo,
  cpk,
  atendimentoFrequencia,
  frequenciaMedia,
}: ChartStatsProps) => (
  <div className="flex flex-wrap gap-4 justify-center text-sm">
    <div>
      <strong>Minimo:</strong> {minimo}
    </div>
    <div>
      <strong>Maximo:</strong> {maximo}
    </div>
    <div>
      <strong>Media:</strong> {media}
    </div>
    <div>
      <strong>Cpk:</strong> {cpk}
    </div>
    <div>
      <strong>Frequencia Media:</strong> {frequenciaMedia || ''}
    </div>
    {atendimentoFrequencia !== undefined && (
      <div>
        <strong>Atendimento Frequencia:</strong> {atendimentoFrequencia}
      </div>
    )}
  </div>
)

export default ChartStats
