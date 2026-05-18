// @hashcodeti/ui-kit-core/primitives/Alert
//
// Alert primitivo Tailwind+cva. Substitui `<Alert>` do react-bootstrap (~13
// callers cross-MF). API parity moderada — aceita `variant` como alias de
// `tone` (parity bootstrap), e `danger` como alias deprecated de `error`.
//
// Eixo único `tone`: info (default) | success | warning | error | neutral
// — mais simples que Badge (1 eixo só, sem variant×tone). Backgrounds usam
// tokens *-muted, borda usa tom sólido, ícone usa tom sólido.
//
// Sizes: sm | md (default) | lg — controlam padding + tipografia + dim do ícone.
//
// Extras:
//   - dismissible: renderiza botão close (×) com aria-label="Fechar"
//   - icon: slot opcional. Default automático por tom (SVG inline — sem
//     dependência externa, mantém bundle leve e evita race com react-icons).
//   - title: slot opcional renderizado em <strong> acima do children.
//   - children: a description.
//
// DOM: <div role="alert"> raiz; quando dismissible adiciona aria-live="polite"
// porque o usuário pode descartar (alterando o conteúdo da region).

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const alertVariants = cva(
  // base
  [
    'relative flex w-full items-start gap-3',
    'rounded-md border',
    'transition-colors duration-150',
  ],
  {
    variants: {
      tone: {
        info: 'bg-info-muted border-info/30 text-info',
        success: 'bg-success-muted border-success/30 text-success',
        warning: 'bg-warning-muted border-warning/30 text-warning',
        error: 'bg-error-muted border-error/30 text-error',
        neutral: 'bg-neutral-100 border-neutral-300 text-neutral-800',
      },
      size: {
        sm: 'p-2.5 text-xs',
        md: 'p-3.5 text-sm',
        lg: 'p-4 text-base',
      },
    },
    defaultVariants: {
      tone: 'info',
      size: 'md',
    },
  },
)

export type AlertTone = NonNullable<VariantProps<typeof alertVariants>['tone']>
export type AlertSize = NonNullable<VariantProps<typeof alertVariants>['size']>

/**
 * Alias deprecated — react-bootstrap usa `danger`, padronizamos em `error`.
 * Aceitamos ambos via prop, com console.warn em dev quando `danger` é usado.
 */
export type AlertToneAlias = AlertTone | 'danger'

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    Omit<VariantProps<typeof alertVariants>, 'tone'> {
  /** Tom semântico. Default `info`. */
  tone?: AlertToneAlias
  /**
   * Alias deprecated de `tone` — parity com react-bootstrap `<Alert variant>`.
   * Use `tone` em código novo. Emite `console.warn` em dev.
   * @deprecated Use `tone` instead.
   */
  variant?: AlertToneAlias
  /** Habilita botão de fechar (×). Chama `onDismiss` no click. */
  dismissible?: boolean
  /** Callback do botão close. Só dispara quando `dismissible`. */
  onDismiss?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Slot de ícone. Se omitido e `icon !== false`, renderiza um default por
   * tom (SVG inline). Passe `false` para suprimir.
   */
  icon?: React.ReactNode | false
  /** Título opcional renderizado em <strong> acima do children. */
  title?: React.ReactNode
}

const isDev =
  typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production'

// ---- Default icons (SVG inline; currentColor para herdar `text-*` do tom) ----
// Decisão: SVG inline em vez de heurística com react-icons → zero deps extras,
// 0kb adicional, e funciona em qualquer host (mesmo sem react-icons instalado).

const ICON_BOX = 'flex-shrink-0'

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9 9.75A.75.75 0 019.75 9h.5a.75.75 0 01.75.75v3.5h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25V10.5h-.25A.75.75 0 019 9.75z"
      clipRule="evenodd"
    />
  </svg>
)

const SuccessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L9 10.94 7.28 9.22a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z"
      clipRule="evenodd"
    />
  </svg>
)

const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
)

const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
      clipRule="evenodd"
    />
  </svg>
)

const NeutralIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 112 0 1 1 0 01-2 0zm0 3.5a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5z"
      clipRule="evenodd"
    />
  </svg>
)

const defaultIconByTone: Record<AlertTone, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  neutral: NeutralIcon,
}

const iconSizeClass: Record<AlertSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

/**
 * Alert — primitivo cross-domain.
 *
 * Substitui `Alert` do react-bootstrap. Renderiza `<div role="alert">` com
 * ícone semântico (auto por tom), título opcional e botão de dismiss opcional.
 *
 * @example
 * // Simples (info default)
 * <Alert>Sua sessão foi renovada.</Alert>
 *
 * @example
 * // Tom + título
 * <Alert tone="warning" title="Atenção">
 *   Existem alterações não salvas.
 * </Alert>
 *
 * @example
 * // Dismissible com callback
 * <Alert tone="success" dismissible onDismiss={() => setShown(false)}>
 *   Pedido criado com sucesso!
 * </Alert>
 *
 * @example
 * // Ícone customizado
 * <Alert tone="error" icon={<MyIcon />}>Falha ao salvar.</Alert>
 *
 * @example
 * // Parity bootstrap (deprecated — emite warn em dev)
 * <Alert variant="danger">Erro</Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      tone,
      variant,
      size,
      dismissible = false,
      onDismiss,
      icon,
      title,
      children,
      role = 'alert',
      ...props
    },
    ref,
  ) => {
    // ---- parity-shim: variant alias ----
    if (variant !== undefined && isDev && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(
        '[ui-kit-core/Alert] prop `variant` is deprecated — use `tone` instead. (parity-shim de react-bootstrap)',
      )
    }
    let resolvedTone: AlertToneAlias = tone ?? variant ?? 'info'

    // ---- parity-shim: danger → error ----
    if (resolvedTone === 'danger') {
      if (isDev && typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn(
          '[ui-kit-core/Alert] tone `danger` is deprecated — use `error` instead. (parity-shim de react-bootstrap)',
        )
      }
      resolvedTone = 'error'
    }

    const finalTone = resolvedTone as AlertTone
    const resolvedSize = (size ?? 'md') as AlertSize

    // ---- ícone ----
    let iconNode: React.ReactNode = null
    if (icon !== false) {
      if (icon) {
        iconNode = (
          <span className={cn(ICON_BOX, iconSizeClass[resolvedSize], 'inline-flex')}>{icon}</span>
        )
      } else {
        const DefaultIcon = defaultIconByTone[finalTone]
        iconNode = <DefaultIcon className={cn(ICON_BOX, iconSizeClass[resolvedSize])} />
      }
    }

    return (
      <div
        ref={ref}
        role={role}
        aria-live={dismissible ? 'polite' : undefined}
        className={cn(alertVariants({ tone: finalTone, size: resolvedSize }), className)}
        {...props}
      >
        {iconNode}

        <div className="flex-1 min-w-0">
          {title ? (
            <strong className="block font-semibold leading-tight mb-0.5">{title}</strong>
          ) : null}
          {children ? (
            <div className={cn('leading-snug', title && 'text-current/90')}>{children}</div>
          ) : null}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Fechar"
            className={cn(
              'flex-shrink-0 inline-flex items-center justify-center rounded',
              'opacity-70 hover:opacity-100 focus-visible:opacity-100',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
              resolvedSize === 'sm' ? 'h-4 w-4' : resolvedSize === 'lg' ? 'h-6 w-6' : 'h-5 w-5',
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
      </div>
    )
  },
)
Alert.displayName = 'Alert'

export { alertVariants }
