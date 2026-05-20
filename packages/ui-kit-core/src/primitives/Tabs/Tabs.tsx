// @hashcodeti/ui-kit-core/primitives/Tabs
// @agent-touched: 2026-05-19
//
// Wrapper sobre @radix-ui/react-tabs. Substitui usos de `Tabs` (react-bootstrap)
// e estruturas ad-hoc com botões + estado controlado para troca de painéis.
//
// Stack Radix entrega de graça:
//   - role="tablist" / "tab" / "tabpanel" + aria-selected + aria-controls
//   - Navegação por teclado (Arrow keys, Home/End) com loop opcional
//   - Orientation horizontal / vertical (afeta navegação por teclado)
//   - Controlled/uncontrolled (value / defaultValue / onValueChange)
//   - Activation mode automática (focus = ativa) ou manual
//
// Eixos:
//   variant: default (underline) | pills | solid
//   size:    sm | md (default) | lg   (controla padding + fontSize do Trigger)
//
// Sub-componentes:
//   - Tabs       → alias de Radix Tabs.Root
//   - TabsList   → tablist com variantes visuais
//   - TabsTrigger→ tab (botão) com active states por variant
//   - TabsContent→ tabpanel com focus ring acessível

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ─── Variants ───

export const tabsListVariants = cva(
  // base: layout + reset
  ['inline-flex items-stretch'],
  {
    variants: {
      variant: {
        // underline: linha-base separadora; o trigger desenha o sublinhado ativo
        default: [
          'gap-1 border-b border-surface-border',
          'data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-b-0',
          'data-[orientation=vertical]:border-r data-[orientation=vertical]:border-surface-border',
          'data-[orientation=vertical]:items-stretch',
        ],
        // pills: tabs como pílulas independentes
        pills: [
          'gap-1 p-1 rounded-md',
          'data-[orientation=vertical]:flex-col',
        ],
        // solid: container preenchido (toggle group look)
        solid: [
          'gap-1 p-1 rounded-md bg-surface-muted',
          'data-[orientation=vertical]:flex-col',
        ],
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
  },
)

export const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'font-medium leading-none select-none',
    'transition-all duration-150',
    // border base transparente — neutraliza border UA-default do <button> em
    // consumidores com preflight: false (vide nota no Button).
    'border border-transparent appearance-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-1',
    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
    'text-neutral-600 hover:text-surface-foreground',
  ],
  {
    variants: {
      variant: {
        // underline: borda inferior ativa via box-shadow inset (não desloca layout);
        // -mb-px alinha o sublinhado com a borda da TabsList.
        default: [
          'rounded-none border-b-2 border-transparent -mb-px bg-transparent',
          'data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary',
          'data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2',
          'data-[orientation=vertical]:-mb-0 data-[orientation=vertical]:-mr-px',
        ],
        pills: [
          'rounded-md bg-transparent',
          'hover:bg-surface-muted',
          // Active: fundo brand-muted + texto brand-primary + bold — destaque
          // inequívoco em fundo branco (surface-muted sozinho era invisível).
          'data-[state=active]:bg-brand-primary-muted data-[state=active]:text-brand-primary data-[state=active]:font-semibold',
        ],
        solid: [
          'rounded-[5px] bg-transparent',
          'data-[state=active]:bg-surface-background data-[state=active]:text-surface-foreground data-[state=active]:shadow-sm',
        ],
      },
      size: {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>['variant']>
export type TabsSize = NonNullable<VariantProps<typeof tabsListVariants>['size']>

// ─── Variant context (TabsList → TabsTrigger styling) ───

interface TabsVariantContextValue {
  variant: TabsVariant
  size: TabsSize
}

const TabsVariantContext = React.createContext<TabsVariantContextValue>({
  variant: 'default',
  size: 'md',
})

// ─── Tabs (Root) ───

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

/**
 * Tabs — alias de Radix `Tabs.Root`. Aceita `value`/`defaultValue`/`onValueChange`,
 * `orientation` (`horizontal` default | `vertical`), `activationMode`
 * (`automatic` default | `manual`), `dir`.
 *
 * @example
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Visão geral</TabsTrigger>
 *     <TabsTrigger value="config">Config</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">…</TabsContent>
 *   <TabsContent value="config">…</TabsContent>
 * </Tabs>
 */
export const Tabs = TabsPrimitive.Root

// ─── TabsList ───

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

/**
 * TabsList — container `role="tablist"`. Controla a aparência via `variant`
 * (`default` underline | `pills` | `solid`) e propaga variant+size para os
 * `TabsTrigger` filhos via Context.
 */
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, ...props }, ref) => {
  const resolvedVariant: TabsVariant = variant ?? 'default'
  const resolvedSize: TabsSize = size ?? 'md'
  const ctxValue = React.useMemo(
    () => ({ variant: resolvedVariant, size: resolvedSize }),
    [resolvedVariant, resolvedSize],
  )
  return (
    <TabsVariantContext.Provider value={ctxValue}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant: resolvedVariant, size: resolvedSize }), className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
})
TabsList.displayName = 'TabsList'

// ─── TabsTrigger ───

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    Partial<VariantProps<typeof tabsTriggerVariants>> {}

/**
 * TabsTrigger — botão `role="tab"`. Lê `variant`/`size` do Context da TabsList
 * por padrão; pode sobrescrever via props quando aninhado fora de uma List
 * customizada.
 */
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, ...props }, ref) => {
  const ctx = React.useContext(TabsVariantContext)
  const resolvedVariant = (variant ?? ctx.variant) as TabsVariant
  const resolvedSize = (size ?? ctx.size) as TabsSize
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        tabsTriggerVariants({ variant: resolvedVariant, size: resolvedSize }),
        className,
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = 'TabsTrigger'

// ─── TabsContent ───

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

/**
 * TabsContent — `role="tabpanel"`. Foco visível via ring brand-accent quando
 * navegado por teclado (Tab a partir do tab ativo).
 */
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'
