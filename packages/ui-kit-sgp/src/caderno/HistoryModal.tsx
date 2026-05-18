// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/HistoryModal.tsx
// Wave E.2.1 — DOMAIN_PURO. Helpers e StatusLight injetados via props
// para preservar API parity sem trazer dependencias do MF.
// Wave F.2.B (2026-05-13) — react-bootstrap removido; migrado para
// @hashcodeti/ui-kit-core. Tabela interna substituida por DataTable<HistoryRecord>
// (composite Wave C). Row/Col Bootstrap → Tailwind grid.
import React, { useMemo, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  TextField,
  DataTable,
  type DataTableColumn,
} from '@hashcodeti/ui-kit-core'
import dayjs from 'dayjs'

export interface HistoryRecord {
  id: any
  data: any
  valor: any
  intervalo?: number | null
  nomeUsuario?: string
  usuario?: { nome?: string }
}

export interface FrequencyVM {
  valor?: number | string
  escala?: string
}

export interface HistoryModalProps {
  show: boolean
  onClose: () => void
  historyData: HistoryRecord[] | null | undefined
  isLoading?: boolean
  title?: string
  unit?: string
  frequency?: FrequencyVM | null
  canShowChart?: boolean
  onOpenChart?: () => void
  onRefresh?: (range: { startDate: string; endDate: string }) => void
  /** Helpers/components injetados pelo caller para preservar parity. */
  formatDateTime?: (date: any) => string
  convertToScale?: (valor: number, escala: string) => number | null
  renderStatusLight?: (active: boolean) => React.ReactNode
}

const defaultFormatDateTime = (date: any) => new Date(date).toLocaleString()

export const HistoryModal = ({
  show,
  onClose,
  historyData,
  isLoading,
  title,
  unit,
  frequency,
  onOpenChart,
  canShowChart,
  onRefresh,
  formatDateTime = defaultFormatDateTime,
  convertToScale,
  renderStatusLight,
}: HistoryModalProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))

  const handleRefresh = () => {
    onRefresh?.({
      startDate: dayjs(startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
      endDate: dayjs(endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    })
  }

  const isWithinFrequency = (intervalo: any, freq?: FrequencyVM | null) => {
    if (!intervalo || !freq || !freq.valor) return true
    return intervalo <= Number(freq.valor)
  }

  const getPlannedFrequencyText = () => {
    if (!frequency || !frequency.valor) return 'Não definida'
    if (!convertToScale) return `${frequency.valor} ${frequency.escala}`
    const val = convertToScale(Number(frequency.valor), frequency.escala || '')
    return `${val} ${frequency.escala}`
  }

  const getCalculatedFrequencyText = () => {
    if (!historyData || historyData.length < 2) return 'Insuficiente para cálculo'
    const sorted = [...historyData].sort((a, b) => +new Date(a.data) - +new Date(b.data))
    let totalDiff = 0
    let count = 0
    for (let i = 1; i < sorted.length; i++) {
      const diff = dayjs(sorted[i].data).diff(dayjs(sorted[i - 1].data))
      totalDiff += diff
      count++
    }
    const avgMs = totalDiff / count
    if (avgMs < 60000) return `${(avgMs / 1000).toFixed(1)} segundos`
    if (avgMs < 3600000) return `${(avgMs / 60000).toFixed(1)} minutos`
    if (avgMs < 86400000) return `${(avgMs / 3600000).toFixed(1)} horas`
    return `${(avgMs / 86400000).toFixed(1)} dias`
  }

  const setQuickRange = (days: number) => {
    const end = dayjs()
    const start = dayjs().subtract(days, 'day')
    setStartDate(start.format('YYYY-MM-DD'))
    setEndDate(end.format('YYYY-MM-DD'))
    onRefresh?.({
      startDate: start.startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
      endDate: end.endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    })
  }

  const filteredData = (historyData || []).filter((record) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    const userName = record.nomeUsuario || (record.usuario ? record.usuario.nome : '')
    return (
      record.id.toString().includes(term) ||
      (record.valor && record.valor.toString().toLowerCase().includes(term)) ||
      (userName && userName.toLowerCase().includes(term))
    )
  })

  // ─── DataTable columns (typed por HistoryRecord) ───
  const columns = useMemo<DataTableColumn<HistoryRecord>[]>(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessor: (row) => row.id,
      },
      {
        id: 'status',
        header: 'Status',
        align: 'center',
        cell: (row) => {
          if (!row.intervalo) return '-'
          const onTime = isWithinFrequency(row.intervalo, frequency)
          if (renderStatusLight) return renderStatusLight(onTime)
          return onTime ? '🟢' : '🔴'
        },
      },
      {
        id: 'data',
        header: 'Data',
        cell: (row) => formatDateTime(row.data),
      },
      {
        id: 'valor',
        header: 'Valor',
        accessor: (row) => row.valor,
      },
      {
        id: 'unidade',
        header: 'Unidade',
        cell: () => unit || '-',
      },
      {
        id: 'usuario',
        header: 'Usuário',
        cell: (row) => row.nomeUsuario || (row.usuario ? row.usuario.nome : '-'),
      },
      {
        id: 'intervalo',
        header: 'Intervalo',
        cell: (row) => {
          if (!row.intervalo || !frequency) return '-'
          if (!convertToScale) return `${row.intervalo} ${frequency.escala}`
          const conv = convertToScale(Number(row.intervalo), frequency.escala || '')
          return conv != null ? `${conv.toFixed(2)} ${frequency.escala}` : '-'
        },
      },
    ],
    [frequency, unit, convertToScale, renderStatusLight, formatDateTime],
  )

  return (
    <Modal open={show} onOpenChange={(open) => { if (!open) onClose() }} size="lg">
      <ModalHeader>{title || 'Histórico de Registros'}</ModalHeader>
      <ModalBody>
        <div className="mb-3 p-3 bg-neutral-50 rounded border border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <strong>Freq. Planejada: </strong> <br />
              <span className="text-brand-primary">{getPlannedFrequencyText()}</span>
            </div>
            <div>
              <strong>Freq. Média Real: </strong> <br />
              <span className="text-success">{getCalculatedFrequencyText()}</span>
            </div>
          </div>
        </div>

        <div className="mb-3 flex justify-end gap-2">
          <Button variant="outline-secondary" size="sm" onClick={() => setQuickRange(15)}>15 Dias</Button>
          <Button variant="outline-secondary" size="sm" onClick={() => setQuickRange(30)}>30 Dias</Button>
          <Button variant="outline-secondary" size="sm" onClick={() => setQuickRange(90)}>90 Dias</Button>
        </div>

        <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div>
            <TextField
              label="De:"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Até:"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant="primary"
              onClick={handleRefresh}
              disabled={isLoading}
              fullWidth
              loading={isLoading}
            >
              Atualizar
            </Button>
          </div>
        </div>

        <div className="mb-3">
          <TextField
            type="text"
            placeholder="Filtrar por ID, Valor ou Usuário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center"><Spinner /></div>
        ) : (
          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <DataTable<HistoryRecord>
              data={filteredData}
              columns={columns}
              getRowId={(row) => String(row.id)}
              variant="bordered"
              size="sm"
              stickyHeader
              emptyState={{ title: 'Nenhum registro encontrado no histórico.' }}
              ariaLabel="Histórico de Registros"
            />
          </div>
        )}
      </ModalBody>
      <ModalFooter className="justify-between">
        <div>
          {canShowChart && (
            <Button variant="info" onClick={onOpenChart}>Ver Gráfico</Button>
          )}
        </div>
        <Button variant="secondary" onClick={onClose}>Fechar</Button>
      </ModalFooter>
    </Modal>
  )
}

export default HistoryModal
