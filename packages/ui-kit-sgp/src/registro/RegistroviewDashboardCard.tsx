// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/RegistroviewDashboardCard.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Tabela paginada de registros com badge
// de fora-de-especificacao + acesso ao histograma. react-bootstrap zero.
// Helpers fmtNum/formattedTime e formatDateTime injetavel via prop (default dayjs).
import * as React from 'react'
import { useMemo } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  cn,
} from '@hashcodeti/ui-kit-core'

const fmtNum = (v: unknown, dec = 2): string =>
  Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : '-'

const formattedTime = (ms: number | undefined | null): string => {
  if (!ms || !Number.isFinite(Number(ms))) return '-'
  const totalSeconds = Math.floor(Number(ms) / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

const defaultFormatDateTime = (iso: string): string => {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export interface RegistroviewLimite {
  nome?: string
  boundRule?: string
  valor?: number | string
}

export interface RegistroviewControle {
  operacao?: string
  nomeParametro?: string
  labelUnidade?: string
  especificacao?: { limitesDeControle?: RegistroviewLimite[] }
}

export interface RegistroviewRegistro {
  id: string | number
  data: string
  valor: number | string
  frequenciaRealizada?: number
  foraDeEspecificacao?: boolean
  regrasQueFalharam?: Array<{ boundRule: string; valor: number | string }>
}

export interface RegistroviewDashboardCardProps {
  controle: RegistroviewControle
  registros?: RegistroviewRegistro[]
  setShowHist: (show: boolean) => void
  setRegistroModal: (
    registro: RegistroviewRegistro & { unidade?: string },
  ) => void
  /** Default: formata como `DD/MM/YYYY HH:mm` sem dayjs. */
  formatDateTime?: (iso: string) => string
  className?: string
}

export const RegistroviewDashboardCard: React.FC<
  RegistroviewDashboardCardProps
> = ({
  controle,
  registros = [],
  setShowHist,
  setRegistroModal,
  formatDateTime = defaultFormatDateTime,
  className,
}) => {
  const { minSpec, maxSpec } = useMemo(() => {
    let min: number | null = null
    let max: number | null = null
    let minIsSpec = false
    let maxIsSpec = false
    const limits = controle?.especificacao?.limitesDeControle || []

    limits.forEach((l) => {
      const val = Number(l.valor)
      if (Number.isNaN(val)) return
      const isSpec = !!l.nome && l.nome.toLowerCase().includes('especificado')
      if (l.boundRule && ['>', '>='].includes(l.boundRule)) {
        if (isSpec) {
          min = val
          minIsSpec = true
        } else if (!minIsSpec) {
          min = val
        }
      } else if (l.boundRule && ['<', '<='].includes(l.boundRule)) {
        if (isSpec) {
          max = val
          maxIsSpec = true
        } else if (!maxIsSpec) {
          max = val
        }
      }
    })
    return { minSpec: min, maxSpec: max }
  }, [controle])

  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-between">
        <div>
          <div>
            {`${controle?.operacao ?? ''} - ${controle?.nomeParametro ?? ''} - ${controle?.labelUnidade ?? ''}`}
          </div>
          <div className="text-neutral-500 text-xs flex gap-3 items-center flex-wrap">
            {(minSpec !== null || maxSpec !== null) && (
              <span>
                <strong>Faixa Específicada:</strong>{' '}
                {minSpec !== null && maxSpec !== null
                  ? `${fmtNum(minSpec)} - ${fmtNum(maxSpec)}`
                  : minSpec !== null
                    ? `>= ${fmtNum(minSpec)}`
                    : `<= ${fmtNum(maxSpec)}`}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowHist(true)}
            title="Ver histograma"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="10" width="3" height="11" rx="1" />
              <rect x="10" y="6" width="3" height="15" rx="1" />
              <rect x="17" y="2" width="3" height="19" rx="1" />
            </svg>{' '}
            Histograma
          </Button>
        </div>
      </CardHeader>

      <CardBody className="p-0" style={{ maxHeight: 450, overflowY: 'auto' }}>
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr>
              <th className="px-3 py-2" style={{ width: 110 }}>
                ID
              </th>
              <th className="px-3 py-2" style={{ width: 180 }}>
                Data
              </th>
              <th className="px-3 py-2">Valor</th>
              <th className="px-3 py-2">Frequencia</th>
              <th className="px-3 py-2" style={{ width: 160 }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r) => {
              const alerta = !!r.foraDeEspecificacao
              return (
                <tr
                  key={r.id}
                  onClick={() =>
                    setRegistroModal({
                      ...r,
                      unidade: controle?.labelUnidade,
                    })
                  }
                  className={cn(
                    'cursor-pointer border-t border-neutral-200 hover:bg-neutral-50',
                    alerta && 'bg-warning-muted',
                  )}
                  title={
                    alerta
                      ? `Fora de especificação (${(r.regrasQueFalharam || [])
                          .map((f) => `${f.boundRule} ${f.valor}`)
                          .join(', ')})`
                      : 'Clique para detalhes'
                  }
                >
                  <td className="px-3 py-2">{r.id}</td>
                  <td className="px-3 py-2" title={r.data}>
                    {formatDateTime(r.data)}
                  </td>
                  <td className="px-3 py-2">
                    {fmtNum(Number(String(r.valor).replace(',', '.')), 2)}
                    {controle?.labelUnidade ? (
                      <span className="text-neutral-500"> {controle.labelUnidade}</span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2">{formattedTime(r.frequenciaRealizada || 0)}</td>
                  <td className="px-3 py-2">
                    <Badge tone={alerta ? 'danger' : 'success'}>
                      {alerta ? 'Fora de especificação' : 'OK'}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}

export default RegistroviewDashboardCard
