// @hashcodeti/ui-kit-core/primitives/Tooltip
//
// Wrapper sobre @radix-ui/react-tooltip. Substitui usos de `OverlayTrigger`
// + `Tooltip` (react-bootstrap) e tooltips ad-hoc baseados em `title="..."`.
//
// Stack Radix entrega de graça:
//   - role="tooltip" + aria-describedby automático no Trigger
//   - Posicionamento via Popper (collision detection, flip, side/align)
//   - Hover + focus open, escape/blur close
//   - Portal (escapa de stacking contexts / overflow:hidden)
//   - Delay coordenado entre múltiplos tooltips (skipDelayDuration)
//
// Eixos:
//   variant: default (dark) | light
//   size:    sm | md (default) | lg
//
// API:
//   - <Tooltip content="..."> {trigger} </Tooltip>  → wrapper conveniente
//     (Provider local + Root + Trigger asChild + Portal + Content). Zero-config.
//   - Composição manual: `TooltipProvider` + `TooltipRoot` + `TooltipTrigger` +
//     `TooltipContent` (nomes alinhados ao Radix). Use quando precisar de
//     controle fino (multi-Trigger, Arrow customizado, anchor distinto).
//
// Provider strategy:
//   - O wrapper conveniente sempre monta um Provider local (`<TooltipPrimitive.Provider>`)
//     para garantir que `<Tooltip>` funcione em qualquer árvore sem setup global.
//   - É seguro aninhar Providers — Radix não quebra. Se o app definir um
//     Provider externo (ex.: `delayDuration` global), o Provider local apenas
//     reaplica defaults locais à subárvore — sem conflito.

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

export const tooltipContentVariants = cva(
  [
    'z-50 overflow-hidden rounded-md shadow-md',
    'select-none pointer-events-none',
    'font-medium leading-tight',
    'origin-[var(--radix-tooltip-content-transform-origin)]',
    // Radix data-state animations (tooltip usa "delayed-open" / "instant-open")
    'data-[state=delayed-open]:animate-in data-[state=instant-open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:fade-in-0',
    'data-[state=closed]:fade-out-0',
    'data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:zoom-in-95',
    'data-[state=closed]:zoom-out-95',
    // Slide direcional baseado em data-side
    'data-[side=top]:slide-in-from-bottom-1',
    'data-[side=bottom]:slide-in-from-top-1',
    'data-[side=left]:slide-in-from-right-1',
    'data-[side=right]:slide-in-from-left-1',
  ],
  {
    variants: {
      variant: {
        default: 'bg-surface-foreground text-surface-background',
        light: 'bg-surface-background text-surface-foreground border border-surface-border',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type TooltipVariant = NonNullable<VariantProps<typeof tooltipContentVariants>['variant']>
export type TooltipSize = NonNullable<VariantProps<typeof tooltipContentVariants>['size']>
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
export type TooltipAlign = 'start' | 'center' | 'end'

// ─── Re-exports granulares (composição manual) ───

/**
 * TooltipProvider — re-export do Radix `Tooltip.Provider`.
 *
 * Em geral o wrapper `<Tooltip>` já injeta um Provider local. Use este export
 * quando quiser configurar `delayDuration` / `skipDelayDuration` globais na
 * raiz da app, ou quando estiver compondo manualmente com `TooltipRoot`.
 */
export const TooltipProvider = TooltipPrimitive.Provider

/**
 * TooltipRoot — alias de `Tooltip.Root` (Radix). Use em composição manual
 * (sem o wrapper conveniente). Dentro deve haver `TooltipTrigger` +
 * `TooltipContent` (envoltos por um Provider acima na árvore).
 */
export const TooltipRoot = TooltipPrimitive.Root

/**
 * TooltipTrigger — alias de `Tooltip.Trigger` (Radix). Por padrão renderiza
 * `<button>`; passe `asChild` para projetar props no filho (recomendado p/
 * primitivos como `<Button>`).
 */
export const TooltipTrigger = TooltipPrimitive.Trigger

// ─── TooltipContent (forwardRef + variants) ───

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

/**
 * TooltipContent — painel posicionado pelo Popper do Radix com tema/sizing
 * via cva. Use em composição manual.
 *
 * @example
 * <TooltipProvider>
 *   <TooltipRoot>
 *     <TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
 *     <TooltipPrimitive.Portal>
 *       <TooltipContent variant="light" side="right">Ajuda</TooltipContent>
 *     </TooltipPrimitive.Portal>
 *   </TooltipRoot>
 * </TooltipProvider>
 */
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, size, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant, size }), className)}
    {...props}
  />
))
TooltipContent.displayName = 'TooltipContent'

// ─── Wrapper conveniente <Tooltip> ───

export interface TooltipProps {
  /** Conteúdo do tooltip. ReactNode (string, ícone, JSX leve). Obrigatório. */
  content: React.ReactNode
  /** Trigger — qualquer elemento focável. Renderizado via `asChild`. */
  children: React.ReactNode
  /** Lado relativo ao trigger. Default `top`. */
  side?: TooltipSide
  /** Alinhamento ao longo do `side`. Default `center`. */
  align?: TooltipAlign
  /** Distância (px) entre trigger e tooltip. Default 4. */
  sideOffset?: number
  /** Delay (ms) até abrir on hover. Default 200. */
  delayDuration?: number
  /** Desabilita hover persistente sobre o conteúdo (útil p/ tooltips não-interativos). */
  disableHoverableContent?: boolean
  /** Estado inicial (uncontrolled). */
  defaultOpen?: boolean
  /** Estado controlado. */
  open?: boolean
  /** Callback de mudança de estado. */
  onOpenChange?: (open: boolean) => void
  /** Tema visual. Default `default` (dark). */
  variant?: TooltipVariant
  /** Tamanho do padding/typography. Default `md`. */
  size?: TooltipSize
  /** className aplicado ao Content. */
  className?: string
}

/**
 * Tooltip — wrapper conveniente sobre Radix Tooltip.
 *
 * Monta Provider local + Root + Trigger (asChild) + Portal + Content em um único
 * componente. Zero-config — funciona em qualquer árvore sem precisar de Provider
 * externo. Para customizar `delayDuration` global, wrappear com `<TooltipProvider>`
 * externo (Providers aninhados são seguros; o local apenas re-aplica defaults
 * à subárvore).
 *
 * Para composição manual (multi-Trigger, anchor custom, Arrow), use os exports
 * granulares: `TooltipProvider`, `TooltipRoot`, `TooltipTrigger`, `TooltipContent`.
 *
 * @example
 * // Uso básico — string content
 * <Tooltip content="Salvar (Ctrl+S)"><Button>Salvar</Button></Tooltip>
 *
 * @example
 * // ReactNode content + tema light + side
 * <Tooltip variant="light" side="right" content={<><b>Ctrl</b> + <b>K</b></>}>
 *   <IconButton aria-label="Buscar"><SearchIcon /></IconButton>
 * </Tooltip>
 *
 * @example
 * // Controlled + delay custom
 * <Tooltip
 *   open={open}
 *   onOpenChange={setOpen}
 *   delayDuration={0}
 *   content="Aparece imediatamente"
 * >
 *   <Button>Hover</Button>
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 4,
  delayDuration = 200,
  disableHoverableContent,
  defaultOpen,
  open,
  onOpenChange,
  variant,
  size,
  className,
}) => (
  <TooltipPrimitive.Provider
    delayDuration={delayDuration}
    disableHoverableContent={disableHoverableContent}
  >
    <TooltipPrimitive.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          variant={variant}
          size={size}
          className={className}
        >
          {content}
        </TooltipContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)
Tooltip.displayName = 'Tooltip'
