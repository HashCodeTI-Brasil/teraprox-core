import React, { useState } from "react"
import { Card, Form, Button, Row, Col } from "react-bootstrap"
import { FaCalendarAlt, FaChevronUp, FaHistory } from "react-icons/fa"
import dayjs from "dayjs"
import "../styles/PeriodSelector.css"

export type PeriodPreset = "today" | "week" | "fortnight" | "month" | "year"

export interface PeriodSelectorProps {
  /** Data inicial formatada (YYYY-MM-DDTHH:mm) */
  startDate: string
  /** Data final formatada (YYYY-MM-DDTHH:mm) */
  endDate: string
  /** Callback quando a data inicial muda */
  onStartDateChange: (date: string) => void
  /** Callback quando a data final muda */
  onEndDateChange: (date: string) => void
  /** Callback opcional quando um atalho é selecionado */
  onPresetSelect?: (preset: PeriodPreset) => void
  /** Título do componente */
  label?: string
  /** Se permite selecionar datas futuras (padrão: false) */
  allowFuture?: boolean
  /** Classe CSS adicional */
  className?: string
}

/**
 * Seletor de período (datas) com visão compacta e atalhos rápidos.
 */
export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onPresetSelect,
  label = "Período",
  allowFuture = false,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDisplayRange = (start: string, end: string) => {
    const s = dayjs(start).format("DD/MM/YY HH:mm")
    const e = dayjs(end).format("DD/MM/YY HH:mm")
    return `${s} até ${e}`
  }

  const maxDate = allowFuture ? undefined : dayjs().format("YYYY-MM-DDTHH:mm")

  const presets: { key: PeriodPreset; label: string }[] = [
    { key: "today", label: "Hoje" },
    { key: "week", label: "Última Semana" },
    { key: "fortnight", label: "Quinzena" },
    { key: "month", label: "Último Mês" },
    { key: "year", label: "Último Ano" },
  ]

  return (
    <Card className={`period-selector-card ${isExpanded ? "expanded" : ""} ${className}`}>
      <div className="compact-row" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="d-flex align-items-center">
          <FaCalendarAlt className="me-2 text-primary" />
          <span className="date-range-text">
            {isExpanded ? label : formatDisplayRange(startDate, endDate)}
          </span>
        </div>
        <div className="period-icon-btn">
          {isExpanded ? <FaChevronUp /> : <span className="small text-muted">Editar</span>}
        </div>
      </div>

      {isExpanded && (
        <div className="expanded-content">
          {onPresetSelect && (
            <div className="presets-container">
              <div className="d-flex align-items-center mb-1 w-100">
                <FaHistory size={12} className="me-1 text-muted" />
                <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>Atalhos</small>
              </div>
              {presets.map((p) => (
                <Button
                  key={p.key}
                  variant="outline-primary"
                  className="preset-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPresetSelect(p.key)
                  }}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          )}

          <div className="date-inputs-grid">
            <Form.Group>
              <Form.Label className="small text-muted">Início</Form.Label>
              <Form.Control
                type="datetime-local"
                size="sm"
                value={startDate}
                max={maxDate}
                onChange={(e) => onStartDateChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="small text-muted">Fim</Form.Label>
              <Form.Control
                type="datetime-local"
                size="sm"
                value={endDate}
                min={startDate}
                max={maxDate}
                onChange={(e) => onEndDateChange(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="mt-3 d-flex justify-content-end">
            <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setIsExpanded(false)}
            >
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default PeriodSelector
