import React from "react"
import "../styles/StatusPills.css"

export interface StatusMeta {
  label: string
  color: string
  count?: number
}

export interface StatusPillsProps {
  /** Objeto contendo os metadados de cada status (Chave -> Meta) */
  statuses: Record<string, StatusMeta>
  /** Chaves dos status atualmente ativos/selecionados */
  activeKeys: string[]
  /** Callback chamado quando a seleção muda */
  onSelectionChange: (keys: string[]) => void
  /** Se deve permitir seleção de múltiplos status (padrão: true) */
  multiSelect?: boolean
  /** Classe CSS adicional */
  className?: string
}

/**
 * Filtro rápido de status usando 'Pills' clicáveis.
 * Altamente performático por ser puramente visual e controlado via props.
 */
export const StatusPills: React.FC<StatusPillsProps> = ({
  statuses,
  activeKeys,
  onSelectionChange,
  multiSelect = true,
  className = "",
}) => {
  const toggleKey = (key: string) => {
    const isActive = activeKeys.includes(key)

    if (multiSelect) {
      if (isActive) {
        onSelectionChange(activeKeys.filter((k) => k !== key))
      } else {
        onSelectionChange([...activeKeys, key])
      }
    } else {
      onSelectionChange(isActive ? [] : [key])
    }
  }

  return (
    <div className={`status-pills-container ${className}`}>
      {Object.entries(statuses).map(([key, meta]) => {
        const isActive = activeKeys.includes(key)
        return (
          <button
            key={key}
            type="button"
            className={`status-pill ${isActive ? "active" : ""}`}
            style={{ "--status-color": meta.color } as React.CSSProperties}
            onClick={() => toggleKey(key)}
            aria-pressed={isActive}
          >
            <span className="status-pill__swatch" />
            <span className="status-pill__label">{meta.label}</span>
            {meta.count !== undefined && (
              <span className="status-pill__count">{meta.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default StatusPills
