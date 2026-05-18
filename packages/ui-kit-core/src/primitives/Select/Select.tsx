// @hashcodeti/ui-kit-core/primitives/Select
//
// Wrapper sobre @radix-ui/react-select. Substitui usos de `<Form.Select>` /
// `<select>` nativo / react-select (cases simples) — quando precisar de listbox
// rico com keyboard nav, typeahead, scroll buttons, groups e label.
//
// Por que Radix Select:
//   - Listbox totalmente acessível (typeahead, arrow keys, home/end, esc)
//   - Portal + Popper (collision detection, flip)
//   - Scroll lock no body quando aberto
//   - ItemIndicator para "selected" (sem hack visual manual)
//   - <select> hidden sincronizado para forms nativos
//
// Composição (segue padrão Radix; nomes alinhados):
//   <Select value onValueChange>
//     <SelectTrigger><SelectValue placeholder="..." /></SelectTrigger>
//     <SelectContent>
//       <SelectGroup>
//         <SelectLabel>Categoria</SelectLabel>
//         <SelectItem value="a">Opção A</SelectItem>
//         <SelectItem value="b" disabled>Opção B</SelectItem>
//       </SelectGroup>
//       <SelectSeparator />
//       <SelectItem value="c">Opção C</SelectItem>
//     </SelectContent>
//   </Select>
//
// Visual:
//   - SelectTrigger replica TextField (mesma height/padding/border/focus ring)
//     + chevron-down à direita. Variants `default` | `error`. Sizes sm/md/lg.
//   - SelectContent abre em portal com bg-surface-background, animação igual
//     Tooltip (fade + zoom + slide direcional baseado em data-side).
//   - SelectItem mostra check icon à esquerda quando selecionado (via
//     ItemIndicator); hover/focus aplica bg-surface-muted.

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ─── Variants ───

export const selectTriggerVariants = cva(
  [
    'flex w-full items-center justify-between gap-2 rounded-md border bg-surface-background',
    'text-surface-foreground',
    'transition-colors duration-150',
    'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
    'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
    'data-[placeholder]:text-neutral-400',
    '[&>span]:line-clamp-1 [&>span]:text-left',
  ],
  {
    variants: {
      variant: {
        default: 'border-surface-border focus-visible:border-brand-primary',
        error:
          'border-error focus-visible:ring-error/40 focus-visible:border-error',
      },
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export const selectContentVariants = cva(
  [
    'relative z-50 overflow-hidden rounded-md border border-surface-border bg-surface-background shadow-lg',
    'text-surface-foreground',
    'origin-[var(--radix-select-content-transform-origin)]',
    // Animação alinhada ao Tooltip (Wave B benchmark)
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
    'data-[side=top]:slide-in-from-bottom-1',
    'data-[side=bottom]:slide-in-from-top-1',
    'data-[side=left]:slide-in-from-right-1',
    'data-[side=right]:slide-in-from-left-1',
  ],
  {
    variants: {
      size: {
        sm: 'min-w-[8rem] max-h-[12rem] text-sm',
        md: 'min-w-[10rem] max-h-[18rem] text-sm',
        lg: 'min-w-[12rem] max-h-[24rem] text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type SelectVariant = NonNullable<VariantProps<typeof selectTriggerVariants>['variant']>
export type SelectSize = NonNullable<VariantProps<typeof selectTriggerVariants>['size']>

// ─── Re-exports granulares (composição) ───

/**
 * Select — alias de `Select.Root` do Radix. Componente raiz controlado/uncontrolled
 * (`value`/`onValueChange` ou `defaultValue`).
 */
export const Select = SelectPrimitive.Root

/**
 * SelectGroup — agrupa `SelectItem` com um `SelectLabel` opcional. Análogo a
 * `<optgroup>`.
 */
export const SelectGroup = SelectPrimitive.Group

/**
 * SelectValue — renderiza o valor selecionado dentro do `SelectTrigger`.
 * Aceita `placeholder` para o estado vazio.
 */
export const SelectValue = SelectPrimitive.Value

/**
 * SelectPortal — re-export do `Select.Portal` do Radix. O `SelectContent`
 * já monta o Portal internamente; este export está disponível para composição
 * manual.
 */
export const SelectPortal = SelectPrimitive.Portal

// ─── Icons (SVG inline, padrão Checkbox) ───

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
)

const ChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 10l4-4 4 4" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
)

// ─── SelectTrigger ───

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

/**
 * SelectTrigger — botão que abre a listbox. Visualmente idêntico a `TextField`
 * (mesma height, padding, border, rounded, focus ring) + chevron à direita.
 *
 * Variants: `default` | `error`. Sizes: `sm` | `md` (default) | `lg`.
 */
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-neutral-500" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

// ─── Scroll buttons ───

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 bg-surface-background text-neutral-500',
      className,
    )}
    {...props}
  >
    <ChevronUpIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = 'SelectScrollUpButton'

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 bg-surface-background text-neutral-500',
      className,
    )}
    {...props}
  >
    <ChevronDownIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = 'SelectScrollDownButton'

// ─── SelectContent ───

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContentVariants> {}

/**
 * SelectContent — viewport portalizado com scroll buttons e animação direcional.
 *
 * Default `position="popper"` + `sideOffset=4` (recomendado pelo Radix para
 * comportamento similar a Tooltip/Popover, com transform-origin coerente).
 */
export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, size, position = 'popper', sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={sideOffset}
      className={cn(
        selectContentVariants({ size }),
        position === 'popper' &&
          'data-[side=bottom]:translate-y-0 data-[side=top]:translate-y-0',
        className,
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = 'SelectContent'

// ─── SelectLabel ───

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide',
      className,
    )}
    {...props}
  />
))
SelectLabel.displayName = 'SelectLabel'

// ─── SelectItem ───

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

/**
 * SelectItem — opção selecionável. Mostra check icon à esquerda quando
 * selecionado (via `ItemIndicator`); aplica bg-surface-muted em hover/focus.
 */
export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm',
      'py-1.5 pl-7 pr-2 text-sm outline-none',
      'focus:bg-surface-muted hover:bg-surface-muted',
      'data-[state=checked]:font-medium',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center text-brand-primary">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-3.5 w-3.5" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = 'SelectItem'

// ─── SelectSeparator ───

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-surface-border', className)}
    {...props}
  />
))
SelectSeparator.displayName = 'SelectSeparator'
