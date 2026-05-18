// @hashcodeti/ui-kit-core/primitives/Popover
//
// Wrapper sobre @radix-ui/react-popover. Primo do Tooltip — mesma estrutura
// (Trigger + Portal + Content + animação direcional) MAS com:
//   - Interação por click (não hover)
//   - Persistência (focus trap, fecha apenas em outside-click / esc / close)
//   - Conteúdo interativo (foco navegável; pointer-events normais)
//
// Stack Radix entrega de graça:
//   - role="dialog" + aria-modal nativo
//   - Focus trap + restauração de foco
//   - Esc / click outside / dismissible coordenado
//   - Posicionamento via Popper (collision detection, flip, side/align)
//   - Portal (escapa de stacking contexts / overflow:hidden)
//
// Eixos:
//   variant: default
//   size:    sm | md (default) | lg | auto
//
// Sub-componentes (composição manual):
//   <Popover>            alias Root — controla open state
//     <PopoverAnchor>    opcional — âncora customizada (separada do trigger)
//     <PopoverTrigger>   asChild — projeta props no filho
//     <PopoverPortal>    portala fora do DOM tree
//       <PopoverContent> painel posicionado pelo Popper, com variants
//         <PopoverArrow> seta opcional apontando ao trigger
//         <PopoverClose> botão fecha-popover (asChild aceito)
//
// Sem wrapper conveniente — popovers são compostos por natureza
// (header / body / actions / forms). Composição manual é o padrão.

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

export const popoverContentVariants = cva(
  [
    'z-50 rounded-md outline-none',
    'origin-[var(--radix-popover-content-transform-origin)]',
    // Radix data-state animations
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
    // Slide direcional baseado em data-side
    'data-[side=top]:slide-in-from-bottom-1',
    'data-[side=bottom]:slide-in-from-top-1',
    'data-[side=left]:slide-in-from-right-1',
    'data-[side=right]:slide-in-from-left-1',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-surface-background border border-surface-border text-surface-foreground shadow-lg',
      },
      size: {
        sm: 'p-2 w-48',
        md: 'p-4 w-72',
        lg: 'p-4 w-96',
        auto: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type PopoverVariant = NonNullable<VariantProps<typeof popoverContentVariants>['variant']>
export type PopoverSize = NonNullable<VariantProps<typeof popoverContentVariants>['size']>
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left'
export type PopoverAlign = 'start' | 'center' | 'end'

// ─── Re-exports granulares (composição) ───

/**
 * Popover — alias de `Popover.Root` (Radix). Container que controla open state.
 * Aceita `defaultOpen`, `open`, `onOpenChange`, `modal`.
 */
export const Popover = PopoverPrimitive.Root

/**
 * PopoverTrigger — alias de `Popover.Trigger` (Radix). Por padrão renderiza
 * `<button>`; passe `asChild` para projetar props no filho (recomendado p/
 * primitivos como `<Button>`). Click toggle o popover.
 */
export const PopoverTrigger = PopoverPrimitive.Trigger

/**
 * PopoverAnchor — alias de `Popover.Anchor` (Radix). Use quando o elemento
 * que ancora o posicionamento for diferente do trigger (ex.: trigger é um
 * ícone num input, mas o popover deve ancorar ao input inteiro).
 */
export const PopoverAnchor = PopoverPrimitive.Anchor

/**
 * PopoverPortal — alias de `Popover.Portal` (Radix). Portala o Content para
 * fora da árvore (escapa de stacking contexts / overflow:hidden).
 */
export const PopoverPortal = PopoverPrimitive.Portal

/**
 * PopoverClose — alias de `Popover.Close` (Radix). Fecha o popover. Aceita
 * `asChild` para projetar props num botão custom.
 */
export const PopoverClose = PopoverPrimitive.Close

// ─── PopoverProps (Root) ───

export interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}

// ─── PopoverContent (forwardRef + variants) ───

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverContentVariants> {}

/**
 * PopoverContent — painel posicionado pelo Popper do Radix com tema/sizing
 * via cva. Auto-portala (envolve em `Popover.Portal`) — não é necessário
 * declarar `PopoverPortal` manualmente. Para opt-out (anchor inline), passe
 * o filho cru via composição manual com `PopoverPrimitive.Content`.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger asChild><Button>Abrir</Button></PopoverTrigger>
 *   <PopoverContent side="bottom" size="md">Conteúdo</PopoverContent>
 * </Popover>
 */
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, variant, size, sideOffset = 4, align = 'center', avoidCollisions = true, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      avoidCollisions={avoidCollisions}
      className={cn(popoverContentVariants({ variant, size }), className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = 'PopoverContent'

// ─── PopoverArrow (forwardRef) ───

export interface PopoverArrowProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow> {}

/**
 * PopoverArrow — seta opcional apontando ao trigger. Renderiza um `<svg>`
 * herdando `fill` do tema (default usa `fill-surface-background` + `stroke`
 * via container; para correspondência exata com a borda, customize via
 * className). Posicionamento automático pelo Popper.
 */
export const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  PopoverArrowProps
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn('fill-surface-background', className)}
    {...props}
  />
))
PopoverArrow.displayName = 'PopoverArrow'
