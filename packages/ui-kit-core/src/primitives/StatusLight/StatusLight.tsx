// @hashcodeti/ui-kit-core/primitives/StatusLight
//
// StatusLight primitivo Tailwind+cva. Substitui `StatusLight` do
// `teraprox-ui-kit` legado (~8 callers cross-MF: SGP-caderno, SGP-PC,
// ui-kit-sgp/registro, ui-kit-sgp/caderno/HistoryModal).
//
// Eixos:
//   tone:   primary | success | danger | warning | info | dark | neutral
//   size:   xs | sm | md (default) | lg | xl
//   active: boolean — quando `false`, força visual `neutral` (preserva API
//           legada: active=false → cinza, independente do tone declarado)
//
// Extras:
//   - pulse: animate-pulse (útil para "live status")
//
// Renderiza <span> (inline) por design — coexiste com texto em headings/labels
// sem quebrar layout. Legacy era <div> (block), o que limitava colocações.

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const statusLightVariants = cva(
  [
    'inline-block rounded-full align-middle',
    'transition-colors duration-150',
  ],
  {
    variants: {
      tone: {
        primary: 'bg-brand-primary',
        success: 'bg-success',
        danger: 'bg-error',
        warning: 'bg-warning',
        info: 'bg-info',
        dark: 'bg-neutral-900',
        neutral: 'bg-neutral-400',
      },
      size: {
        xs: 'h-2 w-2',
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
        xl: 'h-6 w-6',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'success',
      size: 'md',
      pulse: false,
    },
  },
)

export type StatusLightTone = NonNullable<VariantProps<typeof statusLightVariants>['tone']>
export type StatusLightSize = NonNullable<VariantProps<typeof statusLightVariants>['size']>

export interface StatusLightProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Estado binário. Quando `false`, força visual `neutral` (cinza) — parity API legada. Default `false`. */
  active?: boolean
  /** Tom semântico quando `active=true`. Default `success`. Ignorado quando `active=false`. */
  tone?: StatusLightTone
  /** Tamanho. Default `md` (16px). */
  size?: StatusLightSize
  /** Pulse animation. Default `false`. */
  pulse?: boolean
  /**
   * @deprecated Use `tone` instead. Parity-shim de `teraprox-ui-kit` — emite warn em dev.
   * @hidden
   */
  activeLightColor?: string
  /**
   * @deprecated Use `tone="neutral"` (default quando `active=false`) instead. Parity-shim.
   * @hidden
   */
  inactiveLightColor?: string
  /**
   * @deprecated Use `size` variant (xs/sm/md/lg/xl) instead. Aceita number (px) ou string ("20px")
   * e mapeia para variant mais próxima com warn em dev.
   * @hidden
   */
  legacySize?: number | string
  /** aria-label opcional. Default derivado de `active` ("Ativo" / "Inativo"). */
  'aria-label'?: string
}

const isDev =
  typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production'

function mapLegacySize(s: number | string): StatusLightSize {
  const px = typeof s === 'number' ? s : parseFloat(String(s).replace(/px$/, ''))
  if (!Number.isFinite(px)) return 'md'
  if (px <= 10) return 'xs'
  if (px <= 13) return 'sm'
  if (px <= 18) return 'md'
  if (px <= 22) return 'lg'
  return 'xl'
}

/**
 * StatusLight — bolinha colorida para estados binários (Ativo/Inativo, Online/Offline, etc.).
 *
 * Renderiza `<span>` (inline) — pode aparecer dentro de parágrafos, labels e headings.
 *
 * @example
 * // Simples
 * <StatusLight active />
 *
 * @example
 * // Tom semântico (active=true)
 * <StatusLight active tone="warning" size="lg" />
 *
 * @example
 * // Com pulse (live status)
 * <StatusLight active tone="success" pulse aria-label="Conectado" />
 */
export const StatusLight = React.forwardRef<HTMLSpanElement, StatusLightProps>(
  (
    {
      className,
      active = false,
      tone,
      size,
      pulse,
      activeLightColor,
      inactiveLightColor,
      legacySize,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    // ---- parity-shims (com warn em dev) ----
    if (isDev && typeof console !== 'undefined') {
      if (activeLightColor !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          '[ui-kit-core/StatusLight] prop `activeLightColor` is deprecated — use `tone` instead.',
        )
      }
      if (inactiveLightColor !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          '[ui-kit-core/StatusLight] prop `inactiveLightColor` is deprecated — `active=false` already renders neutral.',
        )
      }
      if (legacySize !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          '[ui-kit-core/StatusLight] prop `legacySize` (px) is deprecated — use `size` variant (xs/sm/md/lg/xl) instead.',
        )
      }
    }

    const resolvedSize: StatusLightSize =
      size ?? (legacySize !== undefined ? mapLegacySize(legacySize) : 'md')

    // active=false força visual neutral, independente de tone declarado.
    const resolvedTone: StatusLightTone = active ? (tone ?? 'success') : 'neutral'

    const resolvedAriaLabel = ariaLabel ?? (active ? 'Ativo' : 'Inativo')

    return (
      <span
        ref={ref}
        role="status"
        aria-label={resolvedAriaLabel}
        className={cn(
          statusLightVariants({ tone: resolvedTone, size: resolvedSize, pulse }),
          className,
        )}
        {...props}
      />
    )
  },
)
StatusLight.displayName = 'StatusLight'

export { statusLightVariants }
