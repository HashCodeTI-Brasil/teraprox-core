import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa"
import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import "../styles/UnifiedPeriodSelector.css"

dayjs.extend(isoWeek)

// ─── Types ───────────────────────────────────────────────────────────────────

export type QuickPresetKey = "today" | "week" | "month" | "year"

export interface PeriodRange {
  dataInicio: string
  dataFim: string
}

export interface UnifiedPeriodSelectorProps {
  /** Current start date (ISO string) */
  dataInicio?: string | null
  /** Current end date (ISO string) */
  dataFim?: string | null
  /** Called whenever the period changes */
  onSelect: (range: PeriodRange) => void
  /** Which tab to show by default */
  defaultTab?: "quick" | "month" | "custom"
  /** Allow selecting future dates (default: true) */
  allowFuture?: boolean
  /** Custom quick presets (overrides defaults) */
  quickPresets?: { key: string; label: string; start: () => dayjs.Dayjs; end: () => dayjs.Dayjs }[]
  /** Additional CSS class */
  className?: string
  /** Whether the component is disabled */
  disabled?: boolean
  /** Compact mode — shows only the header until clicked */
  compact?: boolean
}

// ─── Month names ─────────────────────────────────────────────────────────────

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
]

const MONTHS_FULL = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const pad2 = (n: number) => String(n).padStart(2, "0")

const startOfMonthISO = (year: number, m: number) =>
  `${year}-${pad2(m + 1)}-01T00:00:00`

const endOfMonthISO = (year: number, m: number) => {
  const lastDay = new Date(year, m + 1, 0).getDate()
  return `${year}-${pad2(m + 1)}-${pad2(lastDay)}T23:59:59`
}

const parseDate = (v: string | null | undefined): Date | null => {
  if (!v) return null
  const d = new Date(v)
  return isNaN(d.getTime()) ? null : d
}

// ─── Default presets ─────────────────────────────────────────────────────────

const DEFAULT_PRESETS = [
  {
    key: "today",
    label: "Hoje",
    start: () => dayjs().startOf("day"),
    end: () => dayjs().endOf("day"),
  },
  {
    key: "week",
    label: "Esta semana",
    start: () => dayjs().startOf("isoWeek"),
    end: () => dayjs().endOf("isoWeek"),
  },
  {
    key: "month",
    label: "Este mês",
    start: () => dayjs().startOf("month"),
    end: () => dayjs().endOf("month"),
  },
  {
    key: "year",
    label: "Este ano",
    start: () => dayjs().startOf("year"),
    end: () => dayjs().endOf("year"),
  },
]

// ─── Tabs ────────────────────────────────────────────────────────────────────

type TabKey = "quick" | "month" | "custom"

const TABS: { key: TabKey; icon: React.ReactNode; label: string }[] = [
  { key: "quick", icon: <FaClock size={12} />, label: "Rápido" },
  { key: "month", icon: <FaCalendarAlt size={12} />, label: "Meses" },
  { key: "custom", icon: <FaCalendarAlt size={12} />, label: "Período" },
]

// ─── Component ───────────────────────────────────────────────────────────────

export const UnifiedPeriodSelector: React.FC<UnifiedPeriodSelectorProps> = ({
  dataInicio,
  dataFim,
  onSelect,
  defaultTab = "quick",
  allowFuture = true,
  quickPresets,
  className = "",
  disabled = false,
  compact = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab)
  const [isExpanded, setIsExpanded] = useState(!compact)
  const [activePresetKey, setActivePresetKey] = useState<string | null>(null)

  // ── Month tab state ──
  const [selectedYear, setSelectedYear] = useState(() => {
    const d = parseDate(dataInicio)
    return d ? d.getFullYear() : new Date().getFullYear()
  })
  const [selectedMonths, setSelectedMonths] = useState<Set<number>>(new Set())
  const [lastClickedMonth, setLastClickedMonth] = useState<number | null>(null)

  // ── Custom tab state ──
  const [customStart, setCustomStart] = useState("")
  const [customEnd, setCustomEnd] = useState("")

  const presets = quickPresets || DEFAULT_PRESETS

  // ── Sync external dates → month selection ──
  useEffect(() => {
    const start = parseDate(dataInicio)
    const end = parseDate(dataFim)
    if (!start || !end) return

    if (start.getFullYear() === selectedYear || end.getFullYear() === selectedYear) {
      const next = new Set<number>()
      if (start.getFullYear() === end.getFullYear() && start.getFullYear() === selectedYear) {
        for (let m = start.getMonth(); m <= end.getMonth(); m++) next.add(m)
      } else {
        const s = start.getFullYear() === selectedYear ? start.getMonth() : 0
        const e = end.getFullYear() === selectedYear ? end.getMonth() : 11
        for (let m = s; m <= e; m++) next.add(m)
      }
      setSelectedMonths(next)
    }
  }, [dataInicio, dataFim, selectedYear])

  // ── Sync external dates → custom inputs ──
  useEffect(() => {
    if (dataInicio) setCustomStart(dayjs(dataInicio).format("YYYY-MM-DDTHH:mm"))
    if (dataFim) setCustomEnd(dayjs(dataFim).format("YYYY-MM-DDTHH:mm"))
  }, [dataInicio, dataFim])

  // ── Display label ──
  const displayLabel = useMemo(() => {
    const s = parseDate(dataInicio)
    const e = parseDate(dataFim)
    if (!s || !e) return "Selecione um período"

    if (activePresetKey) {
      const p = presets.find((pr) => pr.key === activePresetKey)
      if (p) return p.label
    }

    // Check if it's a single month
    if (
      s.getFullYear() === e.getFullYear() &&
      s.getMonth() === e.getMonth() &&
      s.getDate() === 1
    ) {
      return `${MONTHS_FULL[s.getMonth()]} ${s.getFullYear()}`
    }

    return `${dayjs(s).format("DD/MM/YYYY")} – ${dayjs(e).format("DD/MM/YYYY")}`
  }, [dataInicio, dataFim, activePresetKey, presets])

  // ── Quick preset handler ──
  const handlePreset = useCallback(
    (preset: (typeof presets)[0]) => {
      if (disabled) return
      setActivePresetKey(preset.key)
      onSelect({
        dataInicio: preset.start().toISOString(),
        dataFim: preset.end().toISOString(),
      })
    },
    [disabled, onSelect]
  )

  // ── Month click handler (single, shift, ctrl) ──
  const handleMonthClick = useCallback(
    (index: number, event: React.MouseEvent) => {
      if (disabled) return
      const ctrl = event.ctrlKey || event.metaKey
      const shift = event.shiftKey

      setSelectedMonths((prev) => {
        let next: Set<number>

        if (shift && lastClickedMonth !== null) {
          next = new Set<number>()
          const start = Math.min(index, lastClickedMonth)
          const end = Math.max(index, lastClickedMonth)
          for (let m = start; m <= end; m++) next.add(m)
        } else if (ctrl) {
          next = new Set(prev)
          if (next.has(index)) next.delete(index)
          else next.add(index)
        } else {
          next = new Set([index])
        }

        // Emit selection
        if (next.size === 0) {
          onSelect({ dataInicio: "", dataFim: "" })
        } else {
          const arr = Array.from(next).sort((a, b) => a - b)
          const first = arr[0]
          const last = arr[arr.length - 1]
          onSelect({
            dataInicio: startOfMonthISO(selectedYear, first),
            dataFim: endOfMonthISO(selectedYear, last),
          })
        }

        setActivePresetKey(null)
        return next
      })

      setLastClickedMonth(index)
    },
    [disabled, lastClickedMonth, onSelect, selectedYear]
  )

  const handleYearChange = useCallback(
    (delta: number) => {
      const newYear = selectedYear + delta
      setSelectedYear(newYear)
      if (selectedMonths.size > 0) {
        const arr = Array.from(selectedMonths).sort((a, b) => a - b)
        onSelect({
          dataInicio: startOfMonthISO(newYear, arr[0]),
          dataFim: endOfMonthISO(newYear, arr[arr.length - 1]),
        })
        setActivePresetKey(null)
      }
    },
    [selectedYear, selectedMonths, onSelect]
  )

  // ── Custom range handler ──
  const handleCustomApply = useCallback(() => {
    if (!customStart || !customEnd) return
    setActivePresetKey(null)
    onSelect({
      dataInicio: dayjs(customStart).toISOString(),
      dataFim: dayjs(customEnd).toISOString(),
    })
  }, [customStart, customEnd, onSelect])

  const handleClear = useCallback(() => {
    setSelectedMonths(new Set())
    setActivePresetKey(null)
    setCustomStart("")
    setCustomEnd("")
    onSelect({ dataInicio: "", dataFim: "" })
  }, [onSelect])

  const today = new Date()
  const maxDateStr = allowFuture ? undefined : dayjs().format("YYYY-MM-DDTHH:mm")

  // ── Compact header ──
  if (compact && !isExpanded) {
    return (
      <Card
        className={`ups-card ups-card--compact ${className}`}
        onClick={() => !disabled && setIsExpanded(true)}
        role="button"
        tabIndex={0}
      >
        <div className="ups-compact-row">
          <FaCalendarAlt className="text-primary me-2" />
          <span className="ups-display-label">{displayLabel}</span>
          <span className="ups-edit-hint text-muted small">Editar</span>
        </div>
      </Card>
    )
  }

  // ── Full render ──
  return (
    <Card className={`ups-card ${className}`}>
      <Card.Body className="ups-body">
        {/* ── Header: active range display ── */}
        <div className="ups-header">
          <div className="d-flex align-items-center gap-2 flex-grow-1 min-w-0">
            <FaCalendarAlt className="text-primary flex-shrink-0" />
            <span className="ups-display-label text-truncate">{displayLabel}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            {(dataInicio || dataFim) && (
              <Button
                variant="link"
                size="sm"
                className="p-0 text-muted"
                onClick={handleClear}
                title="Limpar período"
                disabled={disabled}
              >
                <FaTimesCircle size={14} />
              </Button>
            )}
            {compact && (
              <Button
                variant="link"
                size="sm"
                className="p-0 text-muted"
                onClick={() => setIsExpanded(false)}
              >
                Fechar
              </Button>
            )}
          </div>
        </div>

        {/* ── Tab selector ── */}
        <div className="ups-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`ups-tab ${activeTab === tab.key ? "ups-tab--active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
              disabled={disabled}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div className="ups-content">
          {/* ═══ Quick presets ═══ */}
          {activeTab === "quick" && (
            <div className="ups-quick-grid">
              {presets.map((p) => (
                <Button
                  key={p.key}
                  size="sm"
                  variant={activePresetKey === p.key ? "primary" : "outline-secondary"}
                  className="ups-quick-btn"
                  onClick={() => handlePreset(p)}
                  disabled={disabled}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          )}

          {/* ═══ Month selector ═══ */}
          {activeTab === "month" && (
            <div className="ups-month-section">
              {/* Year nav */}
              <div className="ups-year-nav">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ups-year-btn"
                  onClick={() => handleYearChange(-1)}
                  disabled={disabled}
                >
                  <FaChevronLeft size={10} />
                </Button>
                <span className="ups-year-label">{selectedYear}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ups-year-btn"
                  onClick={() => handleYearChange(1)}
                  disabled={disabled}
                >
                  <FaChevronRight size={10} />
                </Button>
              </div>

              {/* Month grid */}
              <div className="ups-month-grid">
                {MONTHS.map((label, idx) => {
                  const isSelected = selectedMonths.has(idx)
                  const isCurrent =
                    today.getFullYear() === selectedYear &&
                    today.getMonth() === idx
                  return (
                    <button
                      key={idx}
                      className={[
                        "ups-month-cell",
                        isSelected && "ups-month-cell--selected",
                        isCurrent && !isSelected && "ups-month-cell--current",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={(e) => handleMonthClick(idx, e)}
                      disabled={disabled}
                      title="Clique: selecionar · Shift: range · Ctrl/Cmd: multi"
                    >
                      {label}
                    </button>
                  )
                })}
              </div>

              <p className="ups-month-hint text-muted">
                Shift+clique para range · Ctrl/Cmd+clique para multi-seleção
              </p>
            </div>
          )}

          {/* ═══ Custom range ═══ */}
          {activeTab === "custom" && (
            <div className="ups-custom-section">
              <Row className="g-2">
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label className="small text-muted mb-1">Início</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      size="sm"
                      value={customStart}
                      max={maxDateStr}
                      onChange={(e) => setCustomStart(e.target.value)}
                      disabled={disabled}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label className="small text-muted mb-1">Fim</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      size="sm"
                      value={customEnd}
                      min={customStart}
                      max={maxDateStr}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      disabled={disabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCustomApply}
                  disabled={disabled || !customStart || !customEnd}
                >
                  Aplicar
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default UnifiedPeriodSelector
