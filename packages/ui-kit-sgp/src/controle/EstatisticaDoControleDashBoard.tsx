// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/EstatisticaDoControleDashBoard.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Card resumo do controle selecionado +
// modal histograma de incidencias por hora (recharts). react-bootstrap zero.
import * as React from 'react'
import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  type BadgeTone,
} from '@hashcodeti/ui-kit-core'
import {
  EstatisticasFrequenciaDashboard,
  type EstatisticasFrequenciaVM,
} from './EstatisticasFrequenciaDashboard'

const fmtNum = (v: unknown, dec = 2): string =>
  Number.isFinite(Number(v)) ? Number(v).toFixed(dec) : '-'

const cpkBadgeTone = (cpk: unknown): BadgeTone => {
  const n = Number(cpk)
  if (!Number.isFinite(n)) return 'secondary'
  if (n >= 1.33) return 'success'
  if (n >= 1.0) return 'warning'
  return 'danger'
}

const formattedTime = (ms: number | undefined | null): string => {
  if (!ms || !Number.isFinite(Number(ms))) return '-'
  const totalSeconds = Math.floor(Number(ms) / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

type HistogramHist =
  | Map<number | string, number>
  | Record<string | number, number>
  | undefined

interface HistogramData {
  hora: number
  incidencias: number
}

const toData24 = (hist: HistogramHist): HistogramData[] => {
  const base: HistogramData[] = Array.from({ length: 24 }, (_, h) => ({
    hora: h,
    incidencias: 0,
  }))
  if (!hist) return base
  if (hist instanceof Map) {
    for (const [k, v] of hist) {
      const h = Number(k)
      if (Number.isInteger(h) && h >= 0 && h <= 23) {
        base[h].incidencias += Number(v) || 0
      }
    }
    return base
  }
  if (typeof hist === 'object') {
    for (const [k, v] of Object.entries(hist)) {
      const h = Number(k)
      if (Number.isInteger(h) && h >= 0 && h <= 23) {
        base[h].incidencias += Number(v) || 0
      }
    }
  }
  return base
}

export interface EstatisticaControleVM {
  cpk?: number | null
  media?: number | null
  menorValor?: number | null
  maiorValor?: number | null
  foraDeEspecificacaoTotal?: number
}

export interface EstatisticaDoControleCurrent {
  controleId?: string | number
  controle?: { operacao?: string; nomeParametro?: string }
  estatisticas?: EstatisticaControleVM
  analiseFrequencia?: EstatisticasFrequenciaVM & {
    frequenciaPlanejada?: number
  }
  histograma?: HistogramHist
}

export interface EstatisticaDoControleDashBoardProps {
  current: EstatisticaDoControleCurrent
  /** Slot opcional p/ render do histograma (recharts injetado pelo caller). */
  renderHistogram?: (data: HistogramData[]) => React.ReactNode
  className?: string
}

export const EstatisticaDoControleDashBoard: React.FC<
  EstatisticaDoControleDashBoardProps
> = ({ current, renderHistogram, className }) => {
  const [show, setShow] = useState(false)
  const data24 = useMemo(() => toData24(current?.histograma), [current])
  const freqPlan = current?.analiseFrequencia?.frequenciaPlanejada ?? 0
  const desvioTotal = current?.estatisticas?.foraDeEspecificacaoTotal ?? 0

  return (
    <>
      <Card className={className} style={{ marginBottom: '1rem' }}>
        <CardHeader>
          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-xs uppercase font-bold">
                {current.controle?.operacao || 'Operação Geral'}
              </span>
              <span className="text-lg font-bold">
                {current.controle?.nomeParametro || 'Parâmetro'}
                <span className="text-neutral-500 font-normal text-base ml-2">
                  (ID: {current.controleId})
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" onClick={() => setShow(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="10" width="3" height="11" rx="1" />
                  <rect x="10" y="6" width="3" height="15" rx="1" />
                  <rect x="17" y="2" width="3" height="19" rx="1" />
                </svg>{' '}
                Frequencia
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-12 md:col-span-4">
              <div className="text-neutral-500 text-xs">Performance Processo</div>
              <h5 className="m-0 mb-1">
                <Badge tone={cpkBadgeTone(current.estatisticas?.cpk)}>
                  Cpk {fmtNum(current.estatisticas?.cpk, 3)}
                </Badge>
              </h5>
              <div className="text-xs text-neutral-500 flex gap-2 flex-wrap">
                <span>
                  Méd: <b>{fmtNum(current.estatisticas?.media, 2)}</b>
                </span>
                <span>
                  Min: <b>{fmtNum(current.estatisticas?.menorValor, 2)}</b>
                </span>
                <span>
                  Max: <b>{fmtNum(current.estatisticas?.maiorValor, 2)}</b>
                </span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="text-neutral-500 text-xs">Desvios de Especificação</div>
              <h5 className="m-0 mb-1">
                <Badge
                  tone={desvioTotal > 0 ? 'danger' : 'success'}
                  title="Registros fora de especificação"
                >
                  {desvioTotal} Reg.
                </Badge>
              </h5>
              <div className="text-xs text-neutral-500">
                Registros fora dos limites
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <EstatisticasFrequenciaDashboard
                estatisticas={current.analiseFrequencia}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal open={show} onOpenChange={setShow} size="lg">
        <ModalHeader>
          <div className="flex items-center gap-3">
            <span>Histograma de incidências (0–23h)</span>
            {freqPlan > 0 && (
              <Badge tone="info">Planejado: {formattedTime(freqPlan)}</Badge>
            )}
          </div>
        </ModalHeader>
        <ModalBody>
          <div style={{ width: '100%', height: 340 }}>
            {renderHistogram ? (
              renderHistogram(data24)
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-500 text-sm">
                Forneça `renderHistogram` para visualizar o gráfico (recharts).
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default EstatisticaDoControleDashBoard
