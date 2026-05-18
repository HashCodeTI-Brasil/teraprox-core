// @hashcodeti/ui-kit-core/primitives/Progress
//
// Wrapper sobre @radix-ui/react-progress. Substitui `<ProgressBar>` do
// react-bootstrap (~4× cross-MF).
//
// Eixos:
//   variant: default | striped | indeterminate
//   tone:    brand (default) | success | warning | error
//   size:    sm (h-1) | md (h-2, default) | lg (h-3)
//
// Props:
//   - value: 0..max (number) — null/undefined força modo indeterminate
//   - max:   default 100
//   - label: opcional. Se passado, renderiza <span> acima e usa como aria-label
//
// a11y: nativo via Radix (aria-valuenow/min/max). Em modo indeterminate o
// Radix omite aria-valuenow automaticamente quando `value === null`.
//
// Stack Radix entrega de graça:
//   - role="progressbar"
//   - aria-valuemin / aria-valuemax / aria-valuenow
//   - data-state (loading | indeterminate | complete)
//   - data-value / data-max nos elementos para hooks CSS
//
// Animações:
//   - "striped": background com listras Tailwind (linear-gradient inline) +
//     animação `progress-stripes` (keyframes injetados via classe que usa
//     `animate-[...]` arbitrária — não depende de extensão no preset).
//   - "indeterminate": Indicator com width 40% deslizando left↔right via
//     `animate-[...]` arbitrária Tailwind (keyframes inline em arbitrary value).

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const rootVariants = cva(
  [
    'relative w-full overflow-hidden rounded-full',
    'bg-neutral-200',
  ],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const indicatorToneClass: Record<ProgressTone, string> = {
  brand: 'bg-brand-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
}

// Listras diagonais via linear-gradient inline (sem necessidade de extensão no
// preset). Animação CSS arbitrária Tailwind: keyframes definidas via plugin do
// preset (`animate-progress-stripes`) com fallback para `bg-[length:1rem_1rem]`
// + transform animado caso o preset não exponha.
const stripedBgStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(45deg, rgba(255,255,255,0.18) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.18) 75%, transparent 75%, transparent)',
  backgroundSize: '1rem 1rem',
}

export type ProgressVariant = 'default' | 'striped' | 'indeterminate'
export type ProgressTone = 'brand' | 'success' | 'warning' | 'error'
export type ProgressSize = NonNullable<VariantProps<typeof rootVariants>['size']>

export interface ProgressProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    'value' | 'max'
  > {
  /** Valor 0..max. Use `null`/`undefined` para forçar modo indeterminate. */
  value?: number | null
  /** Valor máximo. Default 100. */
  max?: number
  /** Tom semântico do indicador. Default `brand`. */
  tone?: ProgressTone
  /** Altura. Default `md`. */
  size?: ProgressSize
  /** Variante visual. Default `default`. */
  variant?: ProgressVariant
  /**
   * Label opcional. Se passado:
   *   - renderiza `<span>` acima da barra (texto curto p/ leitura visual)
   *   - aplica `aria-label` no Root como fallback de a11y
   */
  label?: React.ReactNode
}

/**
 * Progress — primitivo Radix.
 *
 * @example
 * // Determinístico
 * <Progress value={42} />
 *
 * @example
 * // Tom de erro + tamanho lg + label visível
 * <Progress value={87} tone="error" size="lg" label="Upload" />
 *
 * @example
 * // Indeterminate (carregamento sem progresso conhecido)
 * <Progress value={null} variant="indeterminate" tone="brand" />
 *
 * @example
 * // Striped animado (clássico bootstrap)
 * <Progress value={60} variant="striped" tone="success" />
 */
export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      max = 100,
      tone = 'brand',
      size,
      variant = 'default',
      label,
      ...props
    },
    ref,
  ) => {
    const isIndeterminate = variant === 'indeterminate' || value == null
    const isStriped = variant === 'striped'

    // Radix aceita `null` para indeterminate (omite aria-valuenow).
    const safeValue: number | null = isIndeterminate
      ? null
      : Math.min(Math.max(value ?? 0, 0), max)

    // Translate de 0..-100% mapeado pra value/max.
    const translate = isIndeterminate
      ? 0
      : 100 - ((safeValue as number) / max) * 100

    const ariaLabel =
      props['aria-label'] ?? (typeof label === 'string' ? label : undefined)

    const root = (
      <ProgressPrimitive.Root
        ref={ref}
        value={safeValue as number | null}
        max={max}
        aria-label={ariaLabel}
        className={cn(rootVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full w-full transition-transform duration-500 ease-out',
            indicatorToneClass[tone],
            // Striped: animação contínua do background (movimento das listras)
            isStriped &&
              'animate-[progress-stripes_1s_linear_infinite]',
            // Indeterminate: indicador com 40% width deslizando left↔right
            isIndeterminate &&
              '!w-2/5 !translate-x-0 animate-[progress-indeterminate_1.4s_ease-in-out_infinite]',
          )}
          style={{
            ...(isStriped ? stripedBgStyle : null),
            ...(isIndeterminate
              ? {}
              : { transform: `translateX(-${translate}%)` }),
          }}
        />
        {/* Keyframes inline — autossuficiente, não depende de extensão no preset.
            Pequeno trade-off: re-injeta por instância. Aceitável p/ ~4 callers. */}
        <style>{progressKeyframes}</style>
      </ProgressPrimitive.Root>
    )

    if (label) {
      return (
        <div className={cn('flex w-full flex-col gap-1')}>
          <span className="text-xs font-medium text-neutral-700">{label}</span>
          {root}
        </div>
      )
    }

    return root
  },
)
Progress.displayName = 'Progress'

// Keyframes injetadas via <style> embutido no Root.
// `progress-stripes`: desloca background-position das listras (movimento contínuo).
// `progress-indeterminate`: barra (40% width) viaja de -100% a 250% no eixo X.
const progressKeyframes = `
@keyframes progress-stripes {
  from { background-position: 1rem 0; }
  to   { background-position: 0 0; }
}
@keyframes progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}
`

export { rootVariants as progressVariants }
