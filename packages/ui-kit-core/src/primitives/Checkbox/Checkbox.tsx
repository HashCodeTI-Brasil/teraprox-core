// @hashcodeti/ui-kit-core/primitives/Checkbox
//
// Wrapper sobre @radix-ui/react-checkbox. Substitui o `<FormCheck>` (variant
// `checkbox`) do react-bootstrap. Stack idêntica ao Modal (Radix wrap) +
// Badge (cva) + TextField (composite com label/description e useId).
//
// Radix entrega de graça:
//   - keyboard (space toggles)
//   - state tri (checked | unchecked | indeterminate)
//   - <input type="checkbox" hidden> sincronizado para forms nativos
//   - ARIA role="checkbox" + aria-checked
//
// Slots opcionais (label/description) renderizam dentro de um `<label>` wrapper
// para que click em qualquer parte ative o controle (Radix Checkbox aceita
// estar aninhado em <label> via htmlFor → id).

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const checkboxVariants = cva(
  [
    'peer shrink-0 inline-flex items-center justify-center',
    'rounded-sm border bg-surface-background',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-accent',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100',
    'data-[state=checked]:text-brand-primary-foreground',
    'data-[state=indeterminate]:text-brand-primary-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 [&_svg]:h-3 [&_svg]:w-3',
        md: 'h-5 w-5 [&_svg]:h-3.5 [&_svg]:w-3.5',
        lg: 'h-6 w-6 [&_svg]:h-4 [&_svg]:w-4',
      },
      tone: {
        brand: [
          'border-neutral-300 hover:border-brand-primary',
          'data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary',
          'data-[state=indeterminate]:bg-brand-primary data-[state=indeterminate]:border-brand-primary',
        ],
        success: [
          'border-neutral-300 hover:border-success',
          'data-[state=checked]:bg-success data-[state=checked]:border-success',
          'data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success',
        ],
        error: [
          'border-error hover:border-error',
          'focus-visible:ring-error/40',
          'data-[state=checked]:bg-error data-[state=checked]:border-error',
          'data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      tone: 'brand',
    },
  },
)

export type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>['size']>
export type CheckboxTone = NonNullable<VariantProps<typeof checkboxVariants>['tone']>

export interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      'asChild'
    >,
    Omit<VariantProps<typeof checkboxVariants>, 'size' | 'tone'> {
  size?: CheckboxSize
  tone?: CheckboxTone
  /** Label inline à direita do controle. */
  label?: React.ReactNode
  /** Descrição menor abaixo do label. Linkada via aria-describedby. */
  description?: React.ReactNode
  /** className do wrapper `<label>` (quando há label). */
  wrapperClassName?: string
  /** className do span do label. */
  labelClassName?: string
}

// SVG check (state=checked)
const CheckIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
)

// SVG minus (state=indeterminate)
const MinusIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M3.5 8h9" />
  </svg>
)

/**
 * Checkbox — primitivo Radix + Tailwind.
 *
 * Substitui `<FormCheck>` (variant checkbox) do react-bootstrap. Suporta
 * estado tri (checked | unchecked | indeterminate), 3 sizes, 3 tones e slots
 * opcionais label/description.
 *
 * @example
 * // Simples
 * <Checkbox label="Aceito os termos" />
 *
 * @example
 * // Controlado
 * <Checkbox checked={value} onCheckedChange={setValue} label="Notificar" />
 *
 * @example
 * // Tri-state
 * <Checkbox checked="indeterminate" label="Selecionar todos" />
 *
 * @example
 * // Validation tone
 * <Checkbox tone="error" label="Obrigatório" required />
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      id: idProp,
      className,
      wrapperClassName,
      labelClassName,
      size,
      tone,
      label,
      description,
      disabled,
      checked,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId()
    const id = idProp ?? `cb-${reactId}`
    const descriptionId = description ? `${id}-description` : undefined

    const root = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        disabled={disabled}
        checked={checked}
        aria-describedby={descriptionId}
        className={cn(checkboxVariants({ size, tone }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          {checked === 'indeterminate' ? <MinusIcon /> : <CheckIcon />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )

    // Sem label → retorna só o Root
    if (!label && !description) {
      return root
    }

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-start gap-2 cursor-pointer select-none',
          disabled && 'cursor-not-allowed opacity-70',
          wrapperClassName,
        )}
      >
        {root}
        <span className="flex flex-col">
          {label && (
            <span
              className={cn(
                'text-sm font-medium text-neutral-800 leading-tight',
                size === 'sm' && 'text-xs',
                size === 'lg' && 'text-base',
                labelClassName,
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              id={descriptionId}
              className={cn(
                'text-xs text-neutral-500 mt-0.5',
                size === 'lg' && 'text-sm',
              )}
            >
              {description}
            </span>
          )}
        </span>
      </label>
    )
  },
)
Checkbox.displayName = 'Checkbox'

export { checkboxVariants }
