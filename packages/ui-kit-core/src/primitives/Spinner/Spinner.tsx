// @hashcodeti/ui-kit-core/primitives/Spinner
//
// Spinner primitivo Tailwind+cva. Substitui `<Spinner>` do react-bootstrap
// (~32 callers cross-MF). API parity agressiva — aceita `animation`
// ('border'|'grow') como alias deprecated de `variant` para facilitar codemod.
//
// Eixos:
//   variant: border (default, ring com border-2 + border-t-transparent)
//          | grow   (pulse de opacidade)
//   tone:    current (default = currentColor) | brand | success | warning | error | info | neutral
//   size:    xs | sm | md (default) | lg | xl
//
// a11y: <span role="status" aria-live="polite"> com label sr-only obrigatório
// (default "Carregando..."). Renderiza <span> (inline) — pode aparecer dentro
// de botões, parágrafos, células de tabela sem quebrar layout.

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const spinnerVariants = cva(
  // base — sempre aplicada
  ['inline-block align-[-0.125em]'],
  {
    variants: {
      variant: {
        // Ring style: borda com top transparente girando (mesma técnica visual
        // de bootstrap `spinner-border`). Usa border-current para herdar tom.
        border:
          'animate-spin rounded-full border-2 border-current border-t-transparent',
        // Grow style: bolha sólida com pulse de opacidade (bootstrap `spinner-grow`).
        grow: 'animate-pulse rounded-full bg-current opacity-75',
      },
      tone: {
        current: 'text-current',
        brand: 'text-brand-primary',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
        neutral: 'text-neutral-500',
      },
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'border',
      tone: 'current',
      size: 'md',
    },
  },
)

export type SpinnerVariant = NonNullable<VariantProps<typeof spinnerVariants>['variant']>
export type SpinnerTone = NonNullable<VariantProps<typeof spinnerVariants>['tone']>
export type SpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>['size']>

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Alias deprecated de `variant` — mantido para parity com react-bootstrap
   * `animation`. Use `variant` em código novo. Emite `console.warn` em dev.
   * @deprecated Use `variant` instead.
   */
  animation?: SpinnerVariant
  /**
   * Texto sr-only anunciado a leitores de tela. Default `"Carregando..."`.
   * Passe string vazia explícita apenas se houver outro elemento aria-live
   * descrevendo o estado de loading na mesma região.
   */
  srLabel?: string
}

const isDev =
  typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production'

/**
 * Spinner — primitivo cross-domain.
 *
 * Substitui `Spinner` do react-bootstrap. Renderiza `<span role="status">`
 * com label sr-only para a11y. Por default usa `currentColor` (tom `current`),
 * herdando a cor do contexto pai (útil dentro de Button/Badge/links).
 *
 * @example
 * // Default (border, md, currentColor)
 * <Spinner />
 *
 * @example
 * // Inline em botão danger — herda a cor do texto
 * <button className="text-error">
 *   <Spinner size="sm" /> Excluindo...
 * </button>
 *
 * @example
 * // Tom semântico explícito + label customizado
 * <Spinner tone="brand" size="lg" srLabel="Carregando dados do paciente" />
 *
 * @example
 * // Variante grow (pulse) com tom de sucesso
 * <Spinner variant="grow" tone="success" />
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      variant,
      tone,
      size,
      animation,
      srLabel = 'Carregando...',
      ...props
    },
    ref,
  ) => {
    // animation → variant (deprecated alias para parity com react-bootstrap)
    if (animation && isDev && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(
        '[ui-kit-core/Spinner] prop `animation` is deprecated — use `variant` instead. (parity-shim de react-bootstrap)',
      )
    }
    const resolvedVariant: SpinnerVariant = variant ?? animation ?? 'border'

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        {...props}
        className={cn(
          spinnerVariants({ variant: resolvedVariant, tone, size }),
          className,
        )}
      >
        <span className="sr-only">{srLabel}</span>
      </span>
    )
  },
)
Spinner.displayName = 'Spinner'

export { spinnerVariants }
