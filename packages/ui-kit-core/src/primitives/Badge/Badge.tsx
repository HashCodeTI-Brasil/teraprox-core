// @hashcodeti/ui-kit-core/primitives/Badge
//
// Badge primitivo Tailwind+cva. Substitui `<Badge>` do react-bootstrap (~52
// callers cross-MF). API parity agressiva — aceita `bg` como alias deprecated
// de `tone` para facilitar codemod, e `pill` default true (Badge bootstrap é
// pill por padrão desde v5).
//
// Eixos:
//   variant: solid | outline | subtle
//   tone:    primary | secondary | success | danger | warning | info | light | dark | neutral
//   size:    sm | md (default) | lg
//
// Extras:
//   - removable: renderiza botão close (×) com aria-label="Remover" e onRemove
//   - dot: variante minúscula (apenas ponto colorido + label opcional)
//   - pill: default true (rounded-full); false → rounded-md
//
// Renderiza <span> (inline) — Badge não pode ser <div> porque costuma ficar
// dentro de parágrafos/labels/headings.

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const badgeVariants = cva(
  // base
  [
    'inline-flex items-center justify-center gap-1',
    'font-medium leading-none whitespace-nowrap',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-accent',
  ],
  {
    variants: {
      variant: {
        solid: 'border border-transparent',
        outline: 'bg-transparent border',
        subtle: 'border border-transparent',
      },
      tone: {
        primary: '',
        secondary: '',
        success: '',
        danger: '',
        warning: '',
        info: '',
        light: '',
        dark: '',
        neutral: '',
      },
      size: {
        sm: 'h-5 px-2 text-[11px]',
        md: 'h-6 px-2.5 text-xs',
        lg: 'h-7 px-3 text-sm',
      },
      pill: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
    },
    compoundVariants: [
      // ---------- SOLID ----------
      { variant: 'solid', tone: 'primary', class: 'bg-brand-primary text-brand-primary-foreground' },
      { variant: 'solid', tone: 'secondary', class: 'bg-neutral-200 text-neutral-900' },
      { variant: 'solid', tone: 'success', class: 'bg-success text-success-foreground' },
      { variant: 'solid', tone: 'danger', class: 'bg-error text-error-foreground' },
      { variant: 'solid', tone: 'warning', class: 'bg-warning text-warning-foreground' },
      { variant: 'solid', tone: 'info', class: 'bg-info text-info-foreground' },
      { variant: 'solid', tone: 'light', class: 'bg-neutral-50 text-neutral-900 border-neutral-200' },
      { variant: 'solid', tone: 'dark', class: 'bg-neutral-900 text-neutral-0' },
      { variant: 'solid', tone: 'neutral', class: 'bg-neutral-500 text-neutral-0' },

      // ---------- OUTLINE ----------
      { variant: 'outline', tone: 'primary', class: 'border-brand-primary text-brand-primary' },
      { variant: 'outline', tone: 'secondary', class: 'border-neutral-400 text-neutral-700' },
      { variant: 'outline', tone: 'success', class: 'border-success text-success' },
      { variant: 'outline', tone: 'danger', class: 'border-error text-error' },
      { variant: 'outline', tone: 'warning', class: 'border-warning text-warning' },
      { variant: 'outline', tone: 'info', class: 'border-info text-info' },
      { variant: 'outline', tone: 'light', class: 'border-neutral-200 text-neutral-700' },
      { variant: 'outline', tone: 'dark', class: 'border-neutral-900 text-neutral-900' },
      { variant: 'outline', tone: 'neutral', class: 'border-neutral-400 text-neutral-600' },

      // ---------- SUBTLE ----------
      { variant: 'subtle', tone: 'primary', class: 'bg-brand-primary-muted text-brand-primary' },
      { variant: 'subtle', tone: 'secondary', class: 'bg-neutral-100 text-neutral-800' },
      { variant: 'subtle', tone: 'success', class: 'bg-success-muted text-success' },
      { variant: 'subtle', tone: 'danger', class: 'bg-error-muted text-error' },
      { variant: 'subtle', tone: 'warning', class: 'bg-warning-muted text-warning' },
      { variant: 'subtle', tone: 'info', class: 'bg-info-muted text-info' },
      { variant: 'subtle', tone: 'light', class: 'bg-neutral-50 text-neutral-700' },
      { variant: 'subtle', tone: 'dark', class: 'bg-neutral-200 text-neutral-900' },
      { variant: 'subtle', tone: 'neutral', class: 'bg-neutral-100 text-neutral-700' },
    ],
    defaultVariants: {
      variant: 'solid',
      tone: 'neutral',
      size: 'md',
      pill: true,
    },
  },
)

const dotToneClass: Record<NonNullable<BadgeTone>, string> = {
  primary: 'bg-brand-primary',
  secondary: 'bg-neutral-500',
  success: 'bg-success',
  danger: 'bg-error',
  warning: 'bg-warning',
  info: 'bg-info',
  light: 'bg-neutral-200',
  dark: 'bg-neutral-900',
  neutral: 'bg-neutral-500',
}

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>
export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    Omit<VariantProps<typeof badgeVariants>, 'tone'> {
  /** Tom semântico (cor). Default `neutral`. */
  tone?: BadgeTone
  /**
   * Alias deprecated de `tone` — mantido para parity com react-bootstrap `bg`.
   * Use `tone` em código novo. Emite `console.warn` em dev.
   * @deprecated Use `tone` instead.
   */
  bg?: BadgeTone
  /** Habilita botão close (×). Chama `onRemove` no click. */
  removable?: boolean
  /** Callback do botão close. Só dispara quando `removable`. */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /** Renderiza apenas um ponto colorido + label opcional (variante "status dot"). */
  dot?: boolean
  /** aria-label opcional — obrigatório se `dot` sem children visível. */
  'aria-label'?: string
}

const isDev =
  typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production'

/**
 * Badge — primitivo cross-domain.
 *
 * Substitui `Badge` do react-bootstrap. Renderiza `<span>` (inline) por
 * design — pode aparecer dentro de parágrafos, labels, headings sem quebrar
 * layout.
 *
 * @example
 * // Simples
 * <Badge tone="success">Ativo</Badge>
 *
 * @example
 * // Outline
 * <Badge variant="outline" tone="danger">Crítico</Badge>
 *
 * @example
 * // Removível (chip)
 * <Badge tone="info" removable onRemove={() => removeFilter('foo')}>
 *   Filtro: foo
 * </Badge>
 *
 * @example
 * // Status dot
 * <Badge dot tone="success" aria-label="Online">Online</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      tone,
      bg,
      size,
      pill,
      removable = false,
      onRemove,
      dot = false,
      children,
      ...props
    },
    ref,
  ) => {
    // bg → tone (deprecated alias)
    if (bg && isDev && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(
        '[ui-kit-core/Badge] prop `bg` is deprecated — use `tone` instead. (parity-shim de react-bootstrap)',
      )
    }
    const resolvedTone: BadgeTone = tone ?? bg ?? 'neutral'
    const resolvedSize = (size ?? 'md') as BadgeSize

    // ---- Variante DOT ----
    if (dot) {
      const dotDim =
        resolvedSize === 'sm' ? 'h-1.5 w-1.5' : resolvedSize === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2'
      const wrapperPad =
        resolvedSize === 'sm' ? 'gap-1.5 text-[11px]' : resolvedSize === 'lg' ? 'gap-2 text-sm' : 'gap-1.5 text-xs'

      return (
        <span
          ref={ref}
          className={cn('inline-flex items-center font-medium text-neutral-700', wrapperPad, className)}
          {...props}
        >
          <span
            aria-hidden={children ? 'true' : undefined}
            aria-label={children ? undefined : props['aria-label']}
            role={children ? undefined : 'status'}
            className={cn('inline-block rounded-full', dotDim, dotToneClass[resolvedTone])}
          />
          {children}
        </span>
      )
    }

    // ---- Variante REGULAR ----
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, tone: resolvedTone, size: resolvedSize, pill }),
          className,
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remover"
            className={cn(
              'inline-flex items-center justify-center rounded-full',
              'opacity-70 hover:opacity-100 focus-visible:opacity-100',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
              resolvedSize === 'lg' ? '-mr-1 ml-1 h-4 w-4' : '-mr-0.5 ml-0.5 h-3.5 w-3.5',
            )}
          >
            <svg
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-full w-full"
            >
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        )}
      </span>
    )
  },
)
Badge.displayName = 'Badge'

export { badgeVariants }
