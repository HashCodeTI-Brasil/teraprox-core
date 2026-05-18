// @hashcodeti/ui-kit-core/primitives/Card
//
// Card slot-based. Substitui `<Card>` + `<Card.Header>` + `<Card.Body>` + `<Card.Footer>`
// do react-bootstrap por exports separados (Tailwind puro, sem compound component
// ginástica). Mantém atalho `Card.Header = CardHeader` etc. para callers legados.

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const cardVariants = cva(
  'bg-surface-background text-surface-foreground rounded-lg overflow-hidden',
  {
    variants: {
      variant: {
        elevated: 'shadow-md',
        outlined: 'border border-surface-border',
        flat: '',
        interactive:
          'border border-surface-border shadow-sm transition-shadow hover:shadow-md cursor-pointer',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'none',
    },
  },
)

export type CardVariant = NonNullable<VariantProps<typeof cardVariants>['variant']>
export type CardPadding = NonNullable<VariantProps<typeof cardVariants>['padding']>

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  ),
)
CardRoot.displayName = 'Card'

export interface CardSlotProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardSlotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-4 py-3 border-b border-surface-border flex items-center justify-between',
        'font-semibold text-base',
        className,
      )}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

export const CardBody = React.forwardRef<HTMLDivElement, CardSlotProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-4 py-4', className)} {...props} />
  ),
)
CardBody.displayName = 'CardBody'

export const CardFooter = React.forwardRef<HTMLDivElement, CardSlotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-4 py-3 border-t border-surface-border flex items-center justify-end gap-2',
        className,
      )}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'

// Atalho compound (`Card.Header = CardHeader`) — conveniência para callers que
// preferem o estilo bootstrap. Não é a forma canônica (que é importar separado).
type CardComponent = typeof CardRoot & {
  Header: typeof CardHeader
  Body: typeof CardBody
  Footer: typeof CardFooter
}

export const Card = CardRoot as CardComponent
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { cardVariants }
