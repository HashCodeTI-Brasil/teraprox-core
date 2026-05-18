// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/ControleDashboardCard.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Lista vertical agrupada de controles
// (por operacao) com badges de Cpk/desvios e botao toggle de grafico CEP.
// react-bootstrap zero. Helpers fmtNum/cpkBadgeTone replicados in-line.
import * as React from 'react'
import { Fragment, useMemo } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  cn,
  type BadgeTone,
} from '@hashcodeti/ui-kit-core'
import { FiActivity } from 'react-icons/fi'

const fmtNum = (v: unknown, dec = 2): string =>
  Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : '-'

const cpkBadgeTone = (cpk: unknown): BadgeTone => {
  const n = Number(cpk)
  if (!Number.isFinite(n)) return 'secondary'
  if (n >= 1.33) return 'success'
  if (n >= 1.0) return 'warning'
  return 'danger'
}

export interface ControleOption {
  value: string | number
  label?: string
  nomeParametro?: string
  operacao?: string
  cpk?: number | null
  qtdFora?: number
  statAlert?: boolean
}

export interface ControleDashboardCardProps {
  nomePlanoSelecionado?: string
  controleOptions: ControleOption[]
  selectedControleId?: string | number | null
  setSelectedControleId: (value: string | number) => void
  graficosAtivos?: Set<string>
  onToggleGrafico?: (value: string | number) => void
  className?: string
}

export const ControleDashboardCard: React.FC<ControleDashboardCardProps> = ({
  nomePlanoSelecionado,
  controleOptions,
  selectedControleId,
  setSelectedControleId,
  graficosAtivos = new Set<string>(),
  onToggleGrafico = () => {},
  className,
}) => {
  const groupedOptions = useMemo(() => {
    const groups: Record<string, ControleOption[]> = {}
    controleOptions.forEach((opt) => {
      const op = opt.operacao || 'Geral'
      if (!groups[op]) groups[op] = []
      groups[op].push(opt)
    })
    return groups
  }, [controleOptions])

  return (
    <Card className={cn('h-full flex flex-col shadow-sm', className)}>
      <CardHeader className="bg-white font-bold truncate" title={nomePlanoSelecionado}>
        Controles — {nomePlanoSelecionado}
      </CardHeader>
      <CardBody
        className="p-0 overflow-auto flex-grow"
        style={{ maxHeight: '600px' }}
      >
        <ul className="divide-y divide-neutral-200">
          {controleOptions.length === 0 && (
            <li className="text-neutral-500 text-center py-3">
              Nenhum controle encontrado.
            </li>
          )}
          {Object.entries(groupedOptions).map(([operacao, items]) => (
            <Fragment key={operacao}>
              <li className="bg-neutral-50 font-bold uppercase text-xs text-neutral-500 py-1 px-3">
                {operacao}
              </li>
              {items.map((o) => {
                const isSelected = String(selectedControleId) === String(o.value)
                const isAtivo = graficosAtivos.has(String(o.value))
                return (
                  <li
                    key={o.value}
                    className={cn(
                      'flex justify-between items-center px-3 py-2 cursor-pointer',
                      'hover:bg-neutral-50 transition-colors',
                      isSelected && 'bg-primary-50 text-primary-900',
                    )}
                    onClick={() => setSelectedControleId(o.value)}
                  >
                    <div className="truncate pr-2 flex-1" title={o.label}>
                      <div className="font-semibold truncate">
                        {o.nomeParametro || o.label}
                      </div>
                      <small className="text-neutral-500 text-xs">
                        ID: {o.value}
                      </small>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {((o.qtdFora ?? 0) > 0 || o.statAlert) && (
                        <Badge
                          tone="danger"
                          title={
                            (o.qtdFora ?? 0) > 0
                              ? `${o.qtdFora} registro(s) fora de especificação`
                              : 'Alerta estatística'
                          }
                        >
                          {(o.qtdFora ?? 0) > 0 ? o.qtdFora : '!'}
                        </Badge>
                      )}
                      <Badge
                        tone={cpkBadgeTone(o.cpk)}
                        title={`Cpk: ${fmtNum(o.cpk, 3)}`}
                        style={{ minWidth: '45px', textAlign: 'center' }}
                      >
                        {fmtNum(o.cpk, 2)}
                      </Badge>
                      <Button
                        size="sm"
                        variant={isAtivo ? 'info' : 'outline-secondary'}
                        title={isAtivo ? 'Ocultar grafico' : 'Ver grafico CEP'}
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleGrafico(o.value)
                        }}
                        style={{ padding: '2px 6px', lineHeight: 1 }}
                      >
                        <FiActivity size={13} />
                      </Button>
                    </div>
                  </li>
                )
              })}
            </Fragment>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}

export default ControleDashboardCard
