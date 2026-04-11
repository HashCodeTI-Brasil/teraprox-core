import React from "react"

export interface StatusLightProps {
  /** Se a luz deve estar ativa (verde) ou inativa (cinza) */
  active?: boolean
  /** Cor customizada para o estado ativo (padrão: green) */
  activeLightColor?: string
  /** Cor customizada para o estado inativo (padrão: gray) */
  inactiveLightColor?: string
  /** Tamanho do círculo (padrão: 20px) */
  size?: number | string
  /** Classe CSS adicional */
  className?: string
  /** Estilo CSS customizado */
  style?: React.CSSProperties
}

/**
 * Componente de luz indicativa para status binários (Ativo/Inativo, Online/Offline, etc).
 */
export const StatusLight: React.FC<StatusLightProps> = ({
  active = false,
  activeLightColor = "green",
  inactiveLightColor = "gray",
  size = "20px",
  className = "",
  style,
}) => {
  const color = active ? activeLightColor : inactiveLightColor

  return (
    <div
      className={className}
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        width: size,
        height: size,
        display: "inline-block",
        transition: "background-color 0.3s ease",
        ...style,
      }}
    />
  )
}

export default StatusLight
