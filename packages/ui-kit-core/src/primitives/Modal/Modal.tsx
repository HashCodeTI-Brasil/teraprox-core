// @hashcodeti/ui-kit-core/primitives/Modal
// @agent-touched: 2026-05-19
//
// Wrapper sobre @radix-ui/react-dialog. Substitui o `<Modal>` + `<Modal.Header>` +
// `<Modal.Body>` + `<Modal.Footer>` do react-bootstrap.
//
// API diverge intencionalmente da bootstrap (`show`/`onHide` → `open`/`onOpenChange`)
// para ficar idiomática Radix. Mapping documentado em CHANGELOG e codemod futuro.
//
// Stack Radix entrega de graça:
//   - Focus trap
//   - Escape key
//   - Overlay click
//   - Scroll lock no body
//   - Portal (renderiza no <body>, escapa de stacking contexts)
//   - ARIA dialog + labelledby + describedby

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const contentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'w-full max-h-[90vh] flex flex-col',
    'bg-surface-background rounded-lg shadow-xl',
    'focus:outline-none',
    // Radix data-state animations
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export type ModalSize = NonNullable<VariantProps<typeof contentVariants>['size']>

export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  size?: ModalSize
  /** Bloqueia fechamento por click no overlay e ESC. Use para fluxos não-canceláveis. */
  modal?: boolean
  /** Conteúdo do dialog. Tipicamente `<ModalHeader>` + `<ModalBody>` + `<ModalFooter>`. */
  children: React.ReactNode
  /** className do <Content> (não do overlay). */
  className?: string
  /** Esconde o botão X do header. Header próprio pode ser fornecido. */
  hideCloseButton?: boolean
}

/**
 * Modal — Dialog Radix com slots.
 *
 * @example
 * <Modal open={open} onOpenChange={setOpen} size="md">
 *   <ModalHeader>Nova ordem de serviço</ModalHeader>
 *   <ModalBody><form>...</form></ModalBody>
 *   <ModalFooter>
 *     <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
 *     <Button variant="primary" onClick={handleSave}>Salvar</Button>
 *   </ModalFooter>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  size,
  modal = true,
  hideCloseButton = false,
  className,
  children,
}) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal={modal}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          'fixed inset-0 z-40 bg-surface-overlay backdrop-blur-sm',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        )}
      />
      <DialogPrimitive.Content className={cn(contentVariants({ size }), className)}>
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 rounded-md p-1',
              // border-0 / appearance-none neutralizam UA-default em consumidores
              // com preflight: false. Mantém aspecto ghost (sem border visível).
              'border-0 appearance-none bg-transparent',
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
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)

// ─── Slots ───

export interface ModalSlotProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalSlotProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-shrink-0 px-6 py-4 border-b border-surface-border pr-12',
        className,
      )}
      {...props}
    >
      <DialogPrimitive.Title className="text-lg font-semibold text-surface-foreground">
        {children}
      </DialogPrimitive.Title>
    </div>
  ),
)
ModalHeader.displayName = 'ModalHeader'

export const ModalBody = React.forwardRef<HTMLDivElement, ModalSlotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto px-6 py-4', className)}
      {...props}
    />
  ),
)
ModalBody.displayName = 'ModalBody'

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalSlotProps>(
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
ModalFooter.displayName = 'ModalFooter'

/**
 * ModalDescription — para conteúdo descritivo curto antes do body.
 * Linka via aria-describedby automaticamente (Radix).
 */
export const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('px-6 pt-2 text-sm text-neutral-600', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

export { contentVariants }
