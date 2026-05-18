// @hashcodeti/ui-kit-core/forms/YearMonthsSelector
//
// Seletor combinado de ano + meses com suporte a multi-seleção (click,
// shift+click range, ctrl/cmd+click toggle). Emite `{ dataInicio, dataFim,
// ranges[] }` ISO no callback `onSelect`. Tailwind-only — sem react-bootstrap.
//
// Promovido de teraprox-app-SGM-UTILS/src/Components/default-components/forms/YearMonthsSelector.js
// na Wave G.1 (2026-05-15). Apresentacional puro — zero Redux.
//
// API:
//   - dataInicio: ISO string opcional (preenche estado inicial)
//   - dataFim: ISO string opcional
//   - onSelect: ({ dataInicio, dataFim, ranges }) => void
//   - className: classes extras no container Card

import * as React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { cn } from '../lib/cn'

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const

export interface YearMonthRange {
  dataInicio: string
  dataFim: string
}

export interface YearMonthSelection {
  dataInicio: string | null
  dataFim: string | null
  ranges: YearMonthRange[]
}

export interface YearMonthsSelectorProps {
  dataInicio?: string | null
  dataFim?: string | null
  onSelect: (selection: YearMonthSelection) => void
  className?: string
}

const pad2 = (n: number) => String(n).padStart(2, '0')

const startOfMonthISO = (year: number, monthIdx: number) =>
  `${year}-${pad2(monthIdx + 1)}-01T00:00:00`

const endOfMonthISO = (year: number, monthIdx: number) => {
  const lastDay = new Date(year, monthIdx + 1, 0).getDate()
  return `${year}-${pad2(monthIdx + 1)}-${pad2(lastDay)}T23:59:59`
}

const parseDate = (v?: string | null): Date | null => {
  if (!v) return null
  const d = new Date(v)
  return isNaN(d.getTime()) ? null : d
}

export const YearMonthsSelector: React.FC<YearMonthsSelectorProps> = ({
  dataInicio,
  dataFim,
  onSelect,
  className,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [lastClickedIndex, setLastClickedIndex] = React.useState<number | null>(null)
  const [selectedMonths, setSelectedMonths] = React.useState<Set<number>>(new Set())

  const [selectedYear, setSelectedYear] = React.useState<number>(() => {
    const d = parseDate(dataInicio)
    return d ? d.getFullYear() : new Date().getFullYear()
  })

  React.useEffect(() => {
    const d = parseDate(dataInicio)
    if (d && d.getFullYear() !== selectedYear) {
      setSelectedYear(d.getFullYear())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInicio])

  const anoRef = selectedYear

  React.useEffect(() => {
    const next = new Set<number>()
    const i = parseDate(dataInicio)
    const f = parseDate(dataFim)
    if (i && f) {
      if (i.getFullYear() === anoRef || f.getFullYear() === anoRef) {
        if (i.getFullYear() === f.getFullYear()) {
          const start = i.getMonth()
          const end = f.getMonth()
          for (let m = start; m <= end; m++) next.add(m)
        } else {
          const start = i.getFullYear() === anoRef ? i.getMonth() : 0
          const end = f.getFullYear() === anoRef ? f.getMonth() : 11
          for (let m = start; m <= end; m++) next.add(m)
        }
        setSelectedMonths(next)
      }
    } else {
      setSelectedMonths(next)
    }
  }, [dataInicio, dataFim, anoRef])

  const isMonthSelected = (index: number) => selectedMonths.has(index)

  const buildRanges = (monthsSet: Set<number>, yearToUse = anoRef) => {
    const arr = Array.from(monthsSet).sort((a, b) => a - b)
    const ranges: Array<{ dataInicio: string; dataFim: string; startIdx: number; endIdx: number }> = []
    let start: number | null = null
    let prev: number | null = null

    for (const m of arr) {
      if (start === null) {
        start = m
        prev = m
        continue
      }
      if (m === (prev as number) + 1) {
        prev = m
        continue
      }
      ranges.push({
        dataInicio: startOfMonthISO(yearToUse, start),
        dataFim: endOfMonthISO(yearToUse, prev as number),
        startIdx: start,
        endIdx: prev as number,
      })
      start = m
      prev = m
    }
    if (start !== null) {
      ranges.push({
        dataInicio: startOfMonthISO(yearToUse, start),
        dataFim: endOfMonthISO(yearToUse, prev as number),
        startIdx: start,
        endIdx: prev as number,
      })
    }

    return ranges
  }

  const emitSelection = (monthsSet: Set<number>, yearToUse = anoRef) => {
    const ranges = buildRanges(monthsSet, yearToUse)
    if (ranges.length === 0) {
      onSelect({ dataInicio: null, dataFim: null, ranges: [] })
      return
    }
    const first = ranges[0]
    const last = ranges[ranges.length - 1]
    onSelect({
      dataInicio: first.dataInicio,
      dataFim: last.dataFim,
      ranges: ranges.map((r) => ({ dataInicio: r.dataInicio, dataFim: r.dataFim })),
    })
  }

  const handleClick = (index: number, event: React.MouseEvent) => {
    const ctrl = event.ctrlKey || event.metaKey
    const shift = event.shiftKey

    setSelectedMonths((prev) => {
      let next = new Set(prev)
      if (shift && lastClickedIndex !== null) {
        next = new Set()
        const start = Math.min(index, lastClickedIndex)
        const end = Math.max(index, lastClickedIndex)
        for (let m = start; m <= end; m++) next.add(m)
      } else if (ctrl) {
        if (next.has(index)) next.delete(index)
        else next.add(index)
      } else {
        next = new Set([index])
      }
      emitSelection(next)
      return next
    })
    setLastClickedIndex(index)
  }

  const handleClearAll = () => {
    setSelectedMonths(new Set())
    onSelect({ dataInicio: null, dataFim: null, ranges: [] })
    setLastClickedIndex(null)
  }

  const handleYearChange = (increment: number) => {
    const newYear = selectedYear + increment
    setSelectedYear(newYear)
    if (selectedMonths.size > 0) emitSelection(selectedMonths, newYear)
  }

  const selectedLabel = React.useMemo(() => {
    if (selectedMonths.size === 0) return '-'
    const ranges = buildRanges(selectedMonths)
    if (ranges.length === 1) {
      const r = ranges[0]
      const nomeInicio = MESES[r.startIdx]
      const nomeFim = MESES[r.endIdx]
      return r.startIdx === r.endIdx
        ? `${nomeInicio} ${anoRef}`
        : `${nomeInicio} a ${nomeFim} ${anoRef}`
    }
    const nomes = Array.from(selectedMonths)
      .sort((a, b) => a - b)
      .map((i) => MESES[i])
    const head = nomes.slice(0, 4).join(', ')
    const rest = nomes.length - 4
    return rest > 0 ? `${head} +${rest}` : head
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonths, anoRef])

  const btnBase =
    'inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        className
      )}
    >
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1 min-w-[180px] text-sm">
            <strong className="text-gray-700">Meses selecionados:</strong>{' '}
            <span className="text-gray-600">{selectedLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={btnBase}
              onClick={() => handleYearChange(-1)}
              title="Ano anterior"
            >
              <FaChevronLeft />
            </button>
            <span className="text-lg font-bold tabular-nums">{anoRef}</span>
            <button
              type="button"
              className={btnBase}
              onClick={() => handleYearChange(1)}
              title="Próximo ano"
            >
              <FaChevronRight />
            </button>
          </div>
          <button
            type="button"
            className={btnBase}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'Fechar' : 'Selecionar meses'}
          </button>
          <button
            type="button"
            className={cn(
              btnBase,
              'border-red-300 text-red-700 hover:bg-red-50 focus-visible:ring-red-500'
            )}
            onClick={handleClearAll}
          >
            Limpar
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {MESES.map((mes, index) => {
              const selected = isMonthSelected(index)
              return (
                <button
                  type="button"
                  key={mes}
                  onClick={(e) => handleClick(index, e)}
                  title="Clique: selecionar único | Shift+clique: range | Ctrl/Cmd+clique: (des)selecionar mês"
                  className={cn(
                    'w-full rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
                    selected
                      ? 'border-primary-600 bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500'
                      : 'border-primary-300 bg-white text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500'
                  )}
                >
                  {mes}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default YearMonthsSelector
