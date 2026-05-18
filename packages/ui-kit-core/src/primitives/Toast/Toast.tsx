// @hashcodeti/ui-kit-core/primitives/Toast
//
// Wrapper sobre @radix-ui/react-toast. Substitui usos de `react-toastify`,
// `react-bootstrap/Toast` e padrões ad-hoc baseados em `alert()`/banners
// rolantes. Este arquivo entrega os sub-componentes baixo nível (Provider,
// Viewport, Root, Title, Description, Action, Close) com estilo cva. O wrapper
// alto-nível (`<Toaster />`, `useToast()`) vive em `./Toaster.tsx`.
//
// Stack Radix entrega de graça:
//   - role="status"/"alert" + aria-live coordenado
//   - swipe-to-dismiss com `data-swipe-direction` no Viewport
//   - keyboard nav (F8 → focar viewport)
//   - Portal/Viewport singleton (escapa stacking contexts)
//   - Open/close state machine + animações via data-state
//
// Eixos:
//   tone: info (default) | success | warning | error | neutral
//          (replica tokens de cor do Alert primitivo)
//   size: sm | md (default) | lg
//
// Provider strategy:
//   - O usuário monta `<ToastProvider>` (este re-export do Radix) UMA VEZ na
//     raiz do app, com `<ToastViewport />` ao lado. O wrapper conveniente
//     `<Toaster />` (Toaster.tsx) já faz isso.
//   - Múltiplos Providers aninhados são suportados pelo Radix mas geram
//     viewports duplicados — preferir 1 Provider singleton no shell.

import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ─── cva — Root ───────────────────────────────────────────────────────────

export const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-start gap-3',
    'rounded-md border shadow-lg',
    'overflow-hidden',
    'transition-all',
    // open/close animations (Radix data-state)
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80',
    'data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full',
    'data-[state=closed]:slide-out-to-right-full',
    // swipe-to-dismiss (right swipe by default; viewport pode override)
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=move]:transition-none',
  ],
  {
    variants: {
      tone: {
        info: 'bg-info-muted border-info/30 text-info',
        success: 'bg-success-muted border-success/30 text-success',
        warning: 'bg-warning-muted border-warning/30 text-warning',
        error: 'bg-error-muted border-error/30 text-error',
        neutral: 'bg-white border-neutral-300 text-neutral-800',
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

export type ToastTone = NonNullable<VariantProps<typeof toastVariants>['tone']>
export type ToastSize = NonNullable<VariantProps<typeof toastVariants>['size']>

// ─── Provider (re-export Radix) ───────────────────────────────────────────

export interface ToastProviderProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider> {}

/**
 * ToastProvider — re-export direto de `Toast.Provider` (Radix). Monte UMA VEZ
 * na raiz da app, junto com `<ToastViewport />`. Em geral prefira o wrapper
 * `<Toaster />` que já faz Provider+Viewport+rendering automático.
 *
 * Props relevantes: `swipeDirection` (default `right`), `swipeThreshold`,
 * `duration` (default global, override por Root), `label` (a11y).
 */
export const ToastProvider = ToastPrimitive.Provider

// ─── Viewport (singleton; configurável) ───────────────────────────────────

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {}

/**
 * ToastViewport — região fixa onde toasts são empilhados. Singleton
 * recomendado: monte UM por Provider. Position default `fixed bottom-0
 * right-0`. Override via `className`.
 *
 * @example
 * <ToastViewport className="fixed top-0 right-0 ..." />
 */
export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-50 flex max-h-screen w-full max-w-md flex-col gap-2 p-4',
      'outline-none',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = 'ToastViewport'

// ─── Root ──────────────────────────────────────────────────────────────────

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

/**
 * ToastRoot — container individual. Cada toast é um Root dentro do Viewport.
 * Use `tone` para semântica visual; `size` para densidade. Radix mapeia
 * `tone="error"|"warning"` em role=alert + aria-live=assertive
 * automaticamente quando `type="foreground"` — definido no wrapper Toaster.
 */
export const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, tone, size, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ tone, size }), className)}
    {...props}
  />
))
ToastRoot.displayName = 'ToastRoot'

// ─── Title / Description ──────────────────────────────────────────────────

export interface ToastTitleProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {}

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('font-semibold leading-tight', className)}
    {...props}
  />
))
ToastTitle.displayName = 'ToastTitle'

export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {}

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('leading-snug opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = 'ToastDescription'

// ─── Action ───────────────────────────────────────────────────────────────

export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {}

/**
 * ToastAction — botão de ação (ex.: "Desfazer", "Recarregar"). Requer
 * `altText` (acessibilidade — texto lido por SR quando o toast aparece em
 * background mode).
 */
export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md',
      'border border-current/30 bg-transparent px-3 text-sm font-medium',
      'hover:bg-current/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-current',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = 'ToastAction'

// ─── Close (botão X) ──────────────────────────────────────────────────────

export interface ToastCloseProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {}

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    aria-label="Fechar"
    className={cn(
      'flex-shrink-0 inline-flex h-5 w-5 items-center justify-center rounded',
      'opacity-70 hover:opacity-100 focus-visible:opacity-100',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
      className,
    )}
    {...props}
  >
    <svg
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-3 w-3"
    >
      <path d="M3 3l8 8M11 3l-8 8" />
    </svg>
  </ToastPrimitive.Close>
))
ToastClose.displayName = 'ToastClose'
