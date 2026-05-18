// @hashcodeti/ui-kit-core/primitives/Button
//
// Botão primitivo Tailwind+cva. API parity com react-bootstrap `<Button>` para
// que a migração futura dos MFs seja codemod (s/react-bootstrap/@hashcodeti\/ui-kit-core/),
// não rewrite.
//
// Variantes idênticas ao bootstrap: primary, secondary, success, danger, warning,
// info, light, dark, link, outline-*.
// Sizes: sm, md (default), lg.
// Extras: loading (spinner inline), asChild (Radix Slot — para <Link>, <a>, etc.),
// leftIcon, rightIcon.

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  // base classes — sempre aplicadas
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium leading-none',
    'rounded-md',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-accent',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        // Solid
        primary:
          'bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary-hover active:bg-brand-primary-active',
        secondary:
          'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 active:bg-neutral-400',
        success:
          'bg-success text-success-foreground hover:opacity-90 active:opacity-80',
        danger:
          'bg-error text-error-foreground hover:bg-error-hover active:opacity-80',
        warning:
          'bg-warning text-warning-foreground hover:opacity-90 active:opacity-80',
        info: 'bg-info text-info-foreground hover:opacity-90 active:opacity-80',
        light:
          'bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-neutral-100 active:bg-neutral-200',
        dark: 'bg-neutral-900 text-neutral-0 hover:bg-neutral-800 active:bg-neutral-700',
        link: 'text-brand-primary underline-offset-4 hover:underline bg-transparent',

        // Outline
        'outline-primary':
          'border border-brand-primary text-brand-primary hover:bg-brand-primary-muted active:bg-brand-primary-muted',
        'outline-secondary':
          'border border-neutral-400 text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
        'outline-success':
          'border border-success text-success hover:bg-success-muted active:bg-success-muted',
        'outline-danger':
          'border border-error text-error hover:bg-error-muted active:bg-error-muted',
        'outline-warning':
          'border border-warning text-warning hover:bg-warning-muted active:bg-warning-muted',
        'outline-info':
          'border border-info text-info hover:bg-info-muted active:bg-info-muted',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o filho como o botão (via Radix Slot). Útil para `<Link>`/`<a>`. */
  asChild?: boolean
  /** Mostra spinner inline e desabilita interação. */
  loading?: boolean
  /** Ícone antes do conteúdo (lucide, react-icons, etc.). */
  leftIcon?: React.ReactNode
  /** Ícone após o conteúdo. */
  rightIcon?: React.ReactNode
}

const Spinner = ({ size }: { size: ButtonSize }) => {
  const dim = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
  return (
    <svg
      className={cn('animate-spin', dim)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}

/**
 * Button — primitivo cross-domain.
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleSave}>Salvar</Button>
 * <Button variant="outline-danger" loading={deleting}>Excluir</Button>
 * <Button asChild><Link to="/foo">Voltar</Link></Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const resolvedSize = (size ?? 'md') as ButtonSize
    const isDisabled = disabled || loading

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? 'button')}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={asChild ? undefined : isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...props}
      >
        {loading ? <Spinner size={resolvedSize} /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
