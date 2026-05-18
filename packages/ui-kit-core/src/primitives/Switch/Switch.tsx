// @hashcodeti/ui-kit-core/primitives/Switch
//
// Wrapper sobre @radix-ui/react-switch. Substitui `FormCheck switch` (react-bootstrap)
// + legado `Switch.tsx` interno (3+ callers cross-MF).
//
// Stack Radix entrega de graça:
//   - role="switch" + aria-checked
//   - Suporte a teclado (Space/Enter)
//   - Controlled / uncontrolled (checked / defaultChecked)
//   - Form integration (name/value/required) via input hidden
//
// Eixos:
//   size: sm | md (default) | lg
//   tone: brand (default) | success
//
// Quando `label` é fornecido renderiza wrapper <label> com Root + texto + descrição
// opcional, com aria-describedby linkando description ao Root via useId().

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const switchVariants = cva(
  // base — track
  [
    'group peer inline-flex shrink-0 cursor-pointer items-center',
    'rounded-full border border-transparent',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-accent',
    'disabled:cursor-not-allowed disabled:opacity-50',
    // off state
    'bg-neutral-300',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
      },
      tone: {
        brand: 'data-[state=checked]:bg-brand-primary',
        success: 'data-[state=checked]:bg-success',
      },
    },
    defaultVariants: {
      size: 'md',
      tone: 'brand',
    },
  },
)

const thumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-white shadow-sm',
    'ring-0 transition-transform duration-150',
    'data-[state=unchecked]:translate-x-0.5',
  ],
  {
    variants: {
      size: {
        // translate = track_w - thumb_w - 2*0.5 (gap)
        // sm: 28 - 12 - 4 = 12px = translate-x-3
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
        // md: 36 - 16 - 4 = 16px = translate-x-4
        md: 'h-4 w-4 data-[state=checked]:translate-x-4',
        // lg: 44 - 20 - 4 = 20px = translate-x-5
        lg: 'h-5 w-5 data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export type SwitchSize = NonNullable<VariantProps<typeof switchVariants>['size']>
export type SwitchTone = NonNullable<VariantProps<typeof switchVariants>['tone']>

export interface SwitchProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
      'asChild' | 'onChange'
    >,
    VariantProps<typeof switchVariants> {
  /** Texto principal renderizado à direita do switch (slot opcional). */
  label?: React.ReactNode
  /** Texto descritivo menor renderizado abaixo do label (slot opcional). */
  description?: React.ReactNode
  /** className aplicado ao Root (track). Para className do wrapper use `wrapperClassName`. */
  className?: string
  /** className do wrapper <label> quando há `label`. Sem efeito sem label. */
  wrapperClassName?: string
}

/**
 * Switch — toggle on/off acessível baseado em Radix.
 *
 * Substitui `<FormCheck type="switch">` do react-bootstrap e o legado interno
 * `Switch.tsx`. Renderiza `<button role="switch">` (Radix) com thumb animada.
 *
 * @example
 * // Standalone, controlled
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * @example
 * // Com label e descrição
 * <Switch
 *   label="Notificações por email"
 *   description="Receba avisos sobre ordens novas"
 *   checked={value}
 *   onCheckedChange={setValue}
 * />
 *
 * @example
 * // Em form (uncontrolled)
 * <Switch name="ativo" defaultChecked value="1" required />
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      wrapperClassName,
      size,
      tone,
      label,
      description,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const rootId = id ?? generatedId
    const descriptionId = description ? `${rootId}-description` : undefined

    const root = (
      <SwitchPrimitive.Root
        ref={ref}
        id={rootId}
        aria-describedby={descriptionId}
        className={cn(switchVariants({ size, tone }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
      </SwitchPrimitive.Root>
    )

    if (!label && !description) {
      return root
    }

    return (
      <label
        htmlFor={rootId}
        className={cn(
          'flex items-start gap-2.5 cursor-pointer select-none',
          'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60',
          wrapperClassName,
        )}
      >
        {root}
        <span className="flex flex-col gap-0.5 leading-tight">
          {label && (
            <span className="text-sm font-medium text-surface-foreground">{label}</span>
          )}
          {description && (
            <span id={descriptionId} className="text-xs text-neutral-500">
              {description}
            </span>
          )}
        </span>
      </label>
    )
  },
)
Switch.displayName = 'Switch'

export { switchVariants }
