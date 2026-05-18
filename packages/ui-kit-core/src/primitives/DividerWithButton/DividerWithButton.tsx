// @hashcodeti/ui-kit-core/primitives/DividerWithButton
//
// Composite primitivo Tailwind: linha horizontal `border-t` com Button
// centralizado entre dois segmentos. Substitui o padrão repetido em SGM-OS,
// SGP-OC e SGP-caderno (`<div className="d-flex"><hr/><button>+</button><hr/></div>`).
//
// API:
//   - `label`: texto do botão. Quando ausente, renderiza apenas ícone (default `+`).
//   - `icon`: ReactNode opcional substitui o ícone default.
//   - `onClick`: callback do botão.
//   - `variant`: passa pelo Button do ui-kit-core. Default `outline-secondary`.
//   - `size`: 'sm' | 'md'. Default 'sm'.
//   - `disabled`: desabilita o botão (mantém divisores).
//
// Promovido de `teraprox-SGM-OS/Components/default-components/buttons/DividerWithButton.tsx`
// na Wave E.1.1 (2026-05-13). Apresentacional puro — zero Redux.

import * as React from 'react'
import { Button, type ButtonVariant, type ButtonSize } from '../Button'
import { cn } from '../../lib/cn'

export interface DividerWithButtonProps {
  /** Texto do botão central. Quando ausente, renderiza apenas o ícone. */
  label?: React.ReactNode
  /** Ícone (opcional). Default: símbolo `+` SVG inline. */
  icon?: React.ReactNode
  /** Callback de clique do botão. */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /** Variante do Button. Default `outline-secondary`. */
  variant?: ButtonVariant
  /** Tamanho do Button. Default `sm`. */
  size?: ButtonSize
  /** Desabilita o botão (mantém divisores visíveis). */
  disabled?: boolean
  /** className do wrapper externo. */
  className?: string
  /** Children opcional renderizado entre os segmentos (substitui Button quando presente). */
  children?: React.ReactNode
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M8 3v10M3 8h10" />
  </svg>
)

/**
 * DividerWithButton — divisor horizontal com botão (ou children) centralizado.
 *
 * @example
 * <DividerWithButton label="Adicionar item" onClick={handleAdd} />
 *
 * @example
 * // Apenas ícone
 * <DividerWithButton onClick={handleAdd} />
 *
 * @example
 * // Conteúdo custom no centro
 * <DividerWithButton><MyMenu /></DividerWithButton>
 */
export const DividerWithButton: React.FC<DividerWithButtonProps> = ({
  label,
  icon,
  onClick,
  variant = 'outline-secondary',
  size = 'sm',
  disabled,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 my-2',
        className,
      )}
    >
      <hr className="flex-grow border-0 border-t border-neutral-300 m-0" />
      {children ?? (
        <Button
          type="button"
          variant={variant}
          size={size}
          onClick={onClick}
          disabled={disabled}
          leftIcon={icon ?? <PlusIcon className="h-3.5 w-3.5" />}
        >
          {label}
        </Button>
      )}
      <hr className="flex-grow border-0 border-t border-neutral-300 m-0" />
    </div>
  )
}
DividerWithButton.displayName = 'DividerWithButton'
