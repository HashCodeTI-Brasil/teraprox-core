// @hashcodeti/ui-kit-core/primitives/DropdownMenu
//
// Wrapper sobre @radix-ui/react-dropdown-menu. Substitui `<Dropdown>` +
// `<Dropdown.Toggle>` + `<Dropdown.Menu>` + `<Dropdown.Item>` (react-bootstrap)
// e menus contextuais ad-hoc baseados em posicionamento manual.
//
// Stack Radix entrega de graça:
//   - role="menu" + role="menuitem" + ARIA states
//   - Suporte a teclado (setas, home/end, type-ahead, escape)
//   - Posicionamento via Popper (collision detection, flip, side/align)
//   - Portal (escapa de stacking contexts / overflow:hidden)
//   - Submenus aninhados com delay configurável
//   - Focus management automático
//
// Composição granular (sem wrapper conveniente — DropdownMenu não tem default
// trivial pois conteúdo é estruturado: items, separators, labels, sub-items).
// Use DropdownMenu (alias Root) + DropdownMenuTrigger + DropdownMenuPortal +
// DropdownMenuContent (+ Items dentro).

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ─── Variants ───

export const dropdownMenuContentVariants = cva(
  [
    'z-50 overflow-hidden rounded-md p-1',
    'bg-surface-background border border-surface-border text-surface-foreground shadow-lg',
    'origin-[var(--radix-dropdown-menu-content-transform-origin)]',
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
        default: '',
      },
      size: {
        sm: 'text-xs min-w-[6rem]',
        md: 'text-sm min-w-[8rem]',
        lg: 'text-sm min-w-[12rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type DropdownMenuVariant = NonNullable<
  VariantProps<typeof dropdownMenuContentVariants>['variant']
>
export type DropdownMenuSize = NonNullable<
  VariantProps<typeof dropdownMenuContentVariants>['size']
>

// Item base — usado em Item / CheckboxItem / RadioItem / SubTrigger
const itemBaseClasses = [
  'relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
  'cursor-default text-surface-foreground',
  'transition-colors duration-100',
  'focus:bg-surface-muted',
  'data-[highlighted]:bg-surface-muted',
  'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
]

// ─── Re-exports granulares (sem styling) ───

/**
 * DropdownMenu — alias de `DropdownMenu.Root` (Radix). Container raiz.
 * Aceita `open`/`onOpenChange`/`defaultOpen`/`modal`/`dir`.
 */
export const DropdownMenu = DropdownMenuPrimitive.Root

/**
 * DropdownMenuTrigger — alias de `DropdownMenu.Trigger` (Radix). Por padrão
 * renderiza `<button>`; use `asChild` para projetar props no filho (recomendado
 * p/ primitivos como `<Button>`).
 */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

/**
 * DropdownMenuPortal — alias de `DropdownMenu.Portal` (Radix). Renderiza
 * Content no `<body>`, escapando de stacking contexts e overflow:hidden.
 */
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

/**
 * DropdownMenuGroup — alias de `DropdownMenu.Group` (Radix). Agrupa items
 * relacionados — útil para a11y (role="group") e separação visual (com Separator).
 */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group

/**
 * DropdownMenuRadioGroup — alias de `DropdownMenu.RadioGroup` (Radix). Container
 * para `DropdownMenuRadioItem`s mutuamente exclusivos. Aceita `value`/`onValueChange`.
 */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/**
 * DropdownMenuSub — alias de `DropdownMenu.Sub` (Radix). Container de submenu
 * aninhado. Wrap `DropdownMenuSubTrigger` + `DropdownMenuPortal` + `DropdownMenuSubContent`.
 */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub

// ─── Ícones inline (replica técnica Checkbox.tsx — evita dep react-icons) ───

const CheckIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
)

const DotIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="h-2 w-2"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="4" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="ml-auto h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 4l4 4-4 4" />
  </svg>
)

// ─── DropdownMenuContent ───

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropdownMenuContentVariants> {}

/**
 * DropdownMenuContent — painel posicionado pelo Popper do Radix com tema/sizing
 * via cva. Deve estar dentro de `DropdownMenuPortal`.
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild><Button>Abrir</Button></DropdownMenuTrigger>
 *   <DropdownMenuPortal>
 *     <DropdownMenuContent size="md" align="start">
 *       <DropdownMenuItem>Editar</DropdownMenuItem>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem>Excluir</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenuPortal>
 * </DropdownMenu>
 */
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, variant, size, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(dropdownMenuContentVariants({ variant, size }), className)}
    {...props}
  />
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

// ─── DropdownMenuItem ───

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Indenta para alinhar com items que possuem ícone à esquerda (CheckboxItem/RadioItem). */
  inset?: boolean
}

/**
 * DropdownMenuItem — opção clicável padrão. Use `inset` para alinhar com items
 * tipo Checkbox/Radio em menus mistos.
 */
export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(itemBaseClasses, inset && 'pl-8', className)}
    {...props}
  />
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

// ─── DropdownMenuCheckboxItem ───

export interface DropdownMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {}

/**
 * DropdownMenuCheckboxItem — item com estado tri (checked | unchecked | indeterminate).
 * Renderiza ícone de check no slot esquerdo quando ativo.
 */
export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(itemBaseClasses, 'pl-8', className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

// ─── DropdownMenuRadioItem ───

export interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {}

/**
 * DropdownMenuRadioItem — item de seleção exclusiva. Deve estar dentro de
 * `DropdownMenuRadioGroup` com `value`/`onValueChange`.
 */
export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(itemBaseClasses, 'pl-8', className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

// ─── DropdownMenuLabel ───

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  /** Indenta para alinhar com items tipo Checkbox/Radio. */
  inset?: boolean
}

/**
 * DropdownMenuLabel — cabeçalho não-interativo (a11y: role="presentation").
 * Use para nomear grupos de items (ex.: "Filtros", "Ações").
 */
export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

// ─── DropdownMenuSeparator ───

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {}

/** DropdownMenuSeparator — divisor horizontal entre grupos de items. */
export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-surface-border', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

// ─── DropdownMenuShortcut (não-Radix) ───

export interface DropdownMenuShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * DropdownMenuShortcut — slot para indicar atalho de teclado à direita do label
 * de um Item (ex.: "⌘K"). Não é interativo — só visual. Não usa Radix.
 *
 * @example
 * <DropdownMenuItem>Buscar <DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
 */
export const DropdownMenuShortcut: React.FC<DropdownMenuShortcutProps> = ({
  className,
  ...props
}) => (
  <span
    className={cn(
      'ml-auto text-xs tracking-widest text-neutral-500',
      className,
    )}
    {...props}
  />
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

// ─── DropdownMenuSubTrigger ───

export interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
  /** Indenta para alinhar com items tipo Checkbox/Radio. */
  inset?: boolean
}

/**
 * DropdownMenuSubTrigger — trigger de submenu aninhado. Renderiza chevron-right
 * inline à direita. Deve estar dentro de `DropdownMenuSub`.
 */
export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      itemBaseClasses,
      'data-[state=open]:bg-surface-muted',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'

// ─── DropdownMenuSubContent ───

export interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>,
    VariantProps<typeof dropdownMenuContentVariants> {}

/**
 * DropdownMenuSubContent — painel do submenu. Mesma técnica de variants do
 * Content principal. Deve estar dentro de `DropdownMenuPortal` + `DropdownMenuSub`.
 */
export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, variant, size, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(dropdownMenuContentVariants({ variant, size }), className)}
    {...props}
  />
))
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent'

// ─── Tipo do Root ───

export type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
>
