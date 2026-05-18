// @hashcodeti/ui-kit-core/qr/QrCodeGeneratorButton
//
// Botão apresentacional que dispara geração/exibição de QR Code para um valor.
// Versão atual mantém comportamento da fonte original (alert nativo); um
// caller pode sobrescrever o handler via `onClick` para integrar com modal /
// gerador real (ex.: lib `qrcode`). Tailwind-only — sem react-bootstrap.
//
// Promovido de teraprox-app-SGM-UTILS/src/Components/default-components/qr/QrCodeGeneratorButton.js
// na Wave G.1 (2026-05-15). View-puro.

import * as React from 'react'
import { FaQrcode } from 'react-icons/fa'
import { Button, type ButtonVariant, type ButtonSize } from '../primitives/Button'

export interface QrCodeGeneratorButtonProps {
  /** Valor a codificar no QR */
  value?: string | null
  /** Label do botão (default 'QR Code') */
  label?: string
  /** Desabilitar */
  disabled?: boolean
  /** Variant do Button (default 'outline-secondary') */
  variant?: ButtonVariant
  /** Tamanho (default 'sm') */
  size?: ButtonSize
  /** Handler customizado — quando ausente, exibe `alert` com o valor */
  onClick?: (value: string) => void
  className?: string
}

export const QrCodeGeneratorButton: React.FC<QrCodeGeneratorButtonProps> = ({
  value,
  label = 'QR Code',
  disabled = false,
  variant = 'outline-secondary' as ButtonVariant,
  size = 'sm' as ButtonSize,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (!value) return
    if (onClick) onClick(value)
    else if (typeof window !== 'undefined') window.alert(`QR Code: ${value}`)
  }
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || !value}
      onClick={handleClick}
      className={className}
      leftIcon={<FaQrcode />}
    >
      {label}
    </Button>
  )
}

export default QrCodeGeneratorButton
