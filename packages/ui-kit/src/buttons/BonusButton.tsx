import React from "react"
import "../styles/BonusButton.css"

export interface BonusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Condição para renderizar o botão */
  renderCondition?: boolean
  /** Callback chamando ao clicar */
  onClickCallback: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Texto do botão */
  label: string
}

/**
 * Botão chamativo com animação de 'glow'. usado para ações de destaque.
 */
export const BonusButton: React.FC<BonusButtonProps> = ({
  renderCondition = true,
  onClickCallback,
  label,
  className = "",
  ...props
}) => {
  if (!renderCondition) return null

  return (
    <button
      className={`bonus-button ${className}`}
      onClick={onClickCallback}
      {...props}
    >
      {label}
    </button>
  )
}

export default BonusButton
