// @hashcodeti/ui-kit-core/primitives/Sheet
//
// Wrapper sobre @radix-ui/react-dialog (mesmo pacote do Modal — sem dep nova).
// Substitui Offcanvas/Drawer (react-bootstrap) e ad-hoc drawers css.
//
// Diferença vs Modal: posiciona em uma das bordas (left/right/top/bottom) e
// anima com slide direcional em vez de zoom centralizado. Foco/escape/overlay
// click/scroll lock/portal/aria-modal vêm de graça pelo Radix Dialog (igual Modal).
//
// API espelha Modal: wrapper conveniente <Sheet open onOpenChange side size>
// + slots SheetHeader/SheetTitle/SheetDescription/SheetBody/SheetFooter/SheetClose.
// Re-exports granulares (SheetTrigger/SheetPortal/SheetOverlay/SheetContent) para
// composição manual.
//
// Eixos:
//   side: 'left' | 'right' (default) | 'top' | 'bottom'
//   size: 'sm' | 'md' (default) | 'lg' | 'xl' | 'full'
//
// Tamanho default:
//   - left/right → controla WIDTH (altura sempre 100vh)
//   - top/bottom → controla HEIGHT (largura sempre 100vw)
//   compoundVariants resolvem cada combinação side×size.

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ─── Re-exports granulares (composição manual) ───

export const SheetRoot = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetPortal = DialogPrimitive.Portal
export const SheetClose = DialogPrimitive.Close

// ─── Overlay ───

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-40 bg-surface-overlay backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className,
    )}
    {...props}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

// ─── Content variants (cva) ───

export const sheetContentVariants = cva(
  [
    'fixed z-50 flex flex-col bg-surface-background shadow-xl',
    'focus:outline-none',
    // Animations: enter/exit + slide direcional via data-side
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'duration-300',
    'data-[side=right]:data-[state=open]:slide-in-from-right',
    'data-[side=right]:data-[state=closed]:slide-out-to-right',
    'data-[side=left]:data-[state=open]:slide-in-from-left',
    'data-[side=left]:data-[state=closed]:slide-out-to-left',
    'data-[side=top]:data-[state=open]:slide-in-from-top',
    'data-[side=top]:data-[state=closed]:slide-out-to-top',
    'data-[side=bottom]:data-[state=open]:slide-in-from-bottom',
    'data-[side=bottom]:data-[state=closed]:slide-out-to-bottom',
  ],
  {
    variants: {
      side: {
        left: 'inset-y-0 left-0 h-full border-r border-surface-border',
        right: 'inset-y-0 right-0 h-full border-l border-surface-border',
        top: 'inset-x-0 top-0 w-full border-b border-surface-border',
        bottom: 'inset-x-0 bottom-0 w-full border-t border-surface-border',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      // Lateral (left/right) → controla WIDTH
      { side: 'left', size: 'sm', class: 'w-[320px] max-w-full' },
      { side: 'left', size: 'md', class: 'w-[480px] max-w-full' },
      { side: 'left', size: 'lg', class: 'w-[640px] max-w-full' },
      { side: 'left', size: 'xl', class: 'w-[768px] max-w-full' },
      { side: 'left', size: 'full', class: 'w-screen' },
      { side: 'right', size: 'sm', class: 'w-[320px] max-w-full' },
      { side: 'right', size: 'md', class: 'w-[480px] max-w-full' },
      { side: 'right', size: 'lg', class: 'w-[640px] max-w-full' },
      { side: 'right', size: 'xl', class: 'w-[768px] max-w-full' },
      { side: 'right', size: 'full', class: 'w-screen' },
      // Top/bottom → controla HEIGHT
      { side: 'top', size: 'sm', class: 'h-[320px] max-h-full' },
      { side: 'top', size: 'md', class: 'h-[480px] max-h-full' },
      { side: 'top', size: 'lg', class: 'h-[640px] max-h-full' },
      { side: 'top', size: 'xl', class: 'h-[768px] max-h-full' },
      { side: 'top', size: 'full', class: 'h-screen' },
      { side: 'bottom', size: 'sm', class: 'h-[320px] max-h-full' },
      { side: 'bottom', size: 'md', class: 'h-[480px] max-h-full' },
      { side: 'bottom', size: 'lg', class: 'h-[640px] max-h-full' },
      { side: 'bottom', size: 'xl', class: 'h-[768px] max-h-full' },
      { side: 'bottom', size: 'full', class: 'h-screen' },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  },
)

export type SheetSide = NonNullable<VariantProps<typeof sheetContentVariants>['side']>
export type SheetSize = NonNullable<VariantProps<typeof sheetContentVariants>['size']>

// ─── SheetContent ───

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {}

/**
 * SheetContent — painel lateral/edge posicionado pelo CSS (sem Popper).
 * Renderiza data-side="..." para que o cva slide direcional funcione.
 * Use em composição manual envolto por `SheetPortal` + `SheetOverlay` acima.
 */
export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, side = 'right', size, children, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    data-side={side}
    className={cn(sheetContentVariants({ side, size }), className)}
    {...props}
  >
    {children}
  </DialogPrimitive.Content>
))
SheetContent.displayName = 'SheetContent'

// ─── Wrapper conveniente <Sheet> ───

export interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Borda em que o Sheet aparece. Default `right`. */
  side?: SheetSide
  /** Tamanho. Lateral controla width; top/bottom controla height. Default `md`. */
  size?: SheetSize
  /** Bloqueia fechamento por click no overlay e ESC. Use para fluxos não-canceláveis. */
  modal?: boolean
  /** Conteúdo do sheet. Tipicamente `<SheetHeader>` + `<SheetBody>` + `<SheetFooter>`. */
  children: React.ReactNode
  /** className aplicado ao SheetContent (não ao overlay). */
  className?: string
  /** Esconde o botão X do header. */
  hideCloseButton?: boolean
}

/**
 * Sheet — Drawer/Offcanvas Radix Dialog com slots e slide direcional.
 *
 * @example
 * <Sheet open={open} onOpenChange={setOpen} side="right" size="md">
 *   <SheetHeader><SheetTitle>Filtros</SheetTitle></SheetHeader>
 *   <SheetBody>...form...</SheetBody>
 *   <SheetFooter>
 *     <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
 *     <Button variant="primary" onClick={apply}>Aplicar</Button>
 *   </SheetFooter>
 * </Sheet>
 */
export const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  side = 'right',
  size,
  modal = true,
  hideCloseButton = false,
  className,
  children,
}) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal={modal}>
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <SheetContent side={side} size={size} className={className}>
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 rounded-md p-1',
              'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
            )}
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </DialogPrimitive.Close>
        )}
      </SheetContent>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)
Sheet.displayName = 'Sheet'

// ─── Slots ───

export interface SheetSlotProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SheetHeader = React.forwardRef<HTMLDivElement, SheetSlotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-shrink-0 px-6 py-4 border-b border-surface-border pr-12',
        className,
      )}
      {...props}
    />
  ),
)
SheetHeader.displayName = 'SheetHeader'

export const SheetBody = React.forwardRef<HTMLDivElement, SheetSlotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto px-6 py-4', className)}
      {...props}
    />
  ),
)
SheetBody.displayName = 'SheetBody'

export const SheetFooter = React.forwardRef<HTMLDivElement, SheetSlotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-shrink-0 px-6 py-4 border-t border-surface-border',
        'flex items-center justify-end gap-2',
        className,
      )}
      {...props}
    />
  ),
)
SheetFooter.displayName = 'SheetFooter'

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-surface-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-neutral-600', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'
