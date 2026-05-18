// @hashcodeti/ui-kit-core/primitives/List
//
// Primitivo composto List. Substitui `<ListGroup>` + `<ListGroup.Item>` do
// react-bootstrap (~14× cross-MF).
//
// Slot-based (mesmo modelo do Card):
//   - List              → raiz <ul>
//   - ListItem          → <li>; quando interactive (onClick/href), renderiza
//                          <button>/<a> INTERNO ao <li> (preserva semântica de
//                          lista; <li> nunca polimórfico)
//   - ListItemContent   → wrapper para texto / título+subtítulo (left, flex-1)
//   - ListItemAction    → slot para ações à direita (botões, badges, ícones)
//
// Compound atalho: List.Item, List.Item.Content, List.Item.Action.
//
// Eixos do List:
//   variant: default (border + dividers) | flush (sem borders externas) |
//            bordered (border-y entre items, sem border externa)
//   size:    sm | md (default) | lg — propaga padding p/ items via Context
//
// ListItem props:
//   active       — highlight (bg-brand-primary-muted + text-brand-primary)
//   disabled     — muted + cursor-not-allowed (em interactive vira aria-disabled)
//   interactive  — força hover state (auto-true se onClick||href)
//   onClick      — vira <button type="button"> interno
//   href         — vira <a> interno (toma precedência sobre onClick)
//
// Decisões:
//   - <li> SEMPRE como wrapper externo (semântica preservada). Quando
//     interactive, <button>/<a> interno absorve o foco/click. Isso evita
//     <li role="button"> (a11y patético) e mantém leitores de tela contentes.
//   - Size é propagado via Context interno (ListSizeContext). Caller pode
//     sobrescrever passando size diretamente no ListItem (override raro).

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ───────────────────────── Context (size) ─────────────────────────

type ListSize = 'sm' | 'md' | 'lg'
type ListVariantInternal = 'default' | 'flush' | 'bordered'

interface ListContextValue {
  size: ListSize
  variant: ListVariantInternal
}

const ListContext = React.createContext<ListContextValue>({
  size: 'md',
  variant: 'default',
})

// ───────────────────────── List (raiz <ul>) ───────────────────────

const listVariants = cva(['flex flex-col list-none m-0 p-0'], {
  variants: {
    variant: {
      default: 'border border-surface-border rounded-lg overflow-hidden divide-y divide-surface-border',
      flush: '',
      bordered: 'border-y border-surface-border divide-y divide-surface-border',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type ListVariant = NonNullable<VariantProps<typeof listVariants>['variant']>
export type { ListSize }

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'size'>,
    VariantProps<typeof listVariants> {}

const ListRoot = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const resolvedVariant = (variant ?? 'default') as ListVariantInternal
    const resolvedSize = (size ?? 'md') as ListSize
    const ctx = React.useMemo(
      () => ({ size: resolvedSize, variant: resolvedVariant }),
      [resolvedSize, resolvedVariant],
    )
    return (
      <ListContext.Provider value={ctx}>
        <ul
          ref={ref}
          className={cn(listVariants({ variant: resolvedVariant, size: resolvedSize }), className)}
          {...props}
        >
          {children}
        </ul>
      </ListContext.Provider>
    )
  },
)
ListRoot.displayName = 'List'

// ───────────────────────── ListItem (<li>) ────────────────────────

const itemSizeClass: Record<ListSize, string> = {
  sm: 'px-3 py-2 text-sm gap-2',
  md: 'px-4 py-3 text-sm gap-3',
  lg: 'px-5 py-4 text-base gap-3',
}

// Classes do "innerInteractive" (button/a) — herdam padding e flex
const interactiveBase = [
  'w-full text-left flex items-center',
  'transition-colors duration-150 outline-none',
  'focus-visible:bg-brand-primary-muted/40 focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset',
  'hover:bg-neutral-50',
  'no-underline text-inherit',
]

const staticBase = ['flex items-center text-surface-foreground']

export interface ListItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onClick'> {
  active?: boolean
  disabled?: boolean
  interactive?: boolean
  /** Override raro do size herdado do List. */
  size?: ListSize
  /** Quando presente, renderiza <button> interno. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  /** Quando presente, renderiza <a> interno (toma precedência sobre onClick). */
  href?: string
  /** Target/rel para <a>. */
  target?: string
  rel?: string
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      active = false,
      disabled = false,
      interactive,
      size,
      onClick,
      href,
      target,
      rel,
      children,
      ...props
    },
    ref,
  ) => {
    const ctx = React.useContext(ListContext)
    const resolvedSize: ListSize = size ?? ctx.size
    const isInteractive = Boolean(interactive ?? (onClick || href))

    const padCls = itemSizeClass[resolvedSize]

    const stateCls = cn(
      active && 'bg-brand-primary-muted text-brand-primary font-medium',
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    )

    // Wrapper <li> nunca tem padding/click — só estado visual (active/disabled)
    // quando NÃO interactive (caso interactive, padding vai no inner).
    if (isInteractive) {
      const innerCls = cn(
        interactiveBase,
        padCls,
        active && 'bg-brand-primary-muted text-brand-primary font-medium hover:bg-brand-primary-muted',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none hover:bg-transparent',
      )

      const inner =
        href && !disabled ? (
          <a
            href={href}
            target={target}
            rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
            className={innerCls}
            aria-disabled={disabled || undefined}
            aria-current={active ? 'true' : undefined}
            onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          >
            {children}
          </a>
        ) : (
          <button
            type="button"
            className={innerCls}
            disabled={disabled}
            aria-disabled={disabled || undefined}
            aria-current={active ? 'true' : undefined}
            onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
          >
            {children}
          </button>
        )

      return (
        <li
          ref={ref}
          className={cn('block', className)}
          {...props}
        >
          {inner}
        </li>
      )
    }

    return (
      <li
        ref={ref}
        className={cn(staticBase, padCls, stateCls, className)}
        aria-current={active ? 'true' : undefined}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

// ───────────────── ListItemContent / ListItemAction ───────────────

export interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 min-w-0 flex flex-col gap-0.5', className)}
      {...props}
    />
  ),
)
ListItemContent.displayName = 'ListItemContent'

export interface ListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ListItemAction = React.forwardRef<HTMLDivElement, ListItemActionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 ml-auto shrink-0', className)}
      // Quando ListItem é interactive, o action vira filho do <button>/<a>;
      // stopPropagation deve ser feito pelo caller no botão interno se preciso.
      {...props}
    />
  ),
)
ListItemAction.displayName = 'ListItemAction'

// ───────────────── Compound atalho ────────────────────────────────

type ListItemComponent = typeof ListItem & {
  Content: typeof ListItemContent
  Action: typeof ListItemAction
}

const ListItemWithSlots = ListItem as ListItemComponent
ListItemWithSlots.Content = ListItemContent
ListItemWithSlots.Action = ListItemAction

type ListComponent = typeof ListRoot & {
  Item: ListItemComponent
}

export const List = ListRoot as ListComponent
List.Item = ListItemWithSlots

export { ListItem, listVariants }
