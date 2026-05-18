// @hashcodeti/ui-kit-core/primitives/Accordion
//
// Wrapper sobre @radix-ui/react-accordion. Substitui `<Accordion>` do
// react-bootstrap e implementações ad-hoc de seções colapsáveis.
//
// Stack Radix entrega de graça:
//   - role="region" + aria-labelledby/controls/expanded automáticos
//   - Single (com `collapsible`) ou multiple
//   - Controlled / uncontrolled (value/defaultValue)
//   - Suporte a teclado (Arrow up/down, Home/End, Space/Enter)
//   - data-state=open|closed nos itens, triggers e contents
//
// Eixos (Root):
//   variant: default (separadores border-b) | bordered (cada item com border completa + rounded) | flush (separadores sutis, sem padding lateral)
//
// Animação Content:
//   - Usa keyframes accordion-down/accordion-up (medida automática do height
//     via --radix-accordion-content-height fornecido pelo Radix).
//   - Como `tailwind.preset.ts` é um SHIM somente-reexport (não pode ser tocado),
//     as keyframes são INJETADAS inline via <style> no Root (técnica Progress).
//
// Trigger:
//   - Inclui chevron-down inline (sem react-icons), rotacionado quando aberto via
//     `[&[data-state=open]>svg]:rotate-180`.

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ─── Variants ───

const accordionRootVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      bordered: 'space-y-2',
      flush: '',
    },
  },
  defaultVariants: { variant: 'default' },
})

const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default: 'border-b border-surface-border last:border-b-0',
      bordered: 'rounded-md border border-surface-border overflow-hidden bg-surface-background',
      flush: 'border-b border-neutral-100 last:border-b-0',
    },
  },
  defaultVariants: { variant: 'default' },
})

const accordionTriggerVariants = cva(
  [
    'group flex flex-1 items-center justify-between w-full',
    'py-3 text-sm font-medium text-left text-surface-foreground',
    'transition-colors',
    'hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[&[data-state=open]>svg]:rotate-180',
  ],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'px-3',
        flush: '',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

const accordionContentVariants = cva(
  [
    'overflow-hidden text-sm text-surface-foreground',
    'data-[state=open]:animate-accordion-down',
    'data-[state=closed]:animate-accordion-up',
  ],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'px-3',
        flush: '',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export type AccordionVariant = NonNullable<
  VariantProps<typeof accordionRootVariants>['variant']
>

// ─── Variant context (propaga variant para Item/Trigger/Content sem prop drilling) ───

const AccordionVariantContext = React.createContext<AccordionVariant>('default')

// ─── Keyframes (injetadas inline — preset é shim somente-reexport) ───

const accordionKeyframes = `
@keyframes accordion-down {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}
.animate-accordion-down { animation: accordion-down 200ms ease-out; }
.animate-accordion-up   { animation: accordion-up 200ms ease-out; }
`

// ─── Accordion (Root) ───

type AccordionRootSingleProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> & { type: 'single' }
type AccordionRootMultipleProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> & { type: 'multiple' }

export type AccordionProps = (
  | AccordionRootSingleProps
  | AccordionRootMultipleProps
) & {
  /** Estilo visual aplicado aos itens. Default `default`. */
  variant?: AccordionVariant
}

/**
 * Accordion — primitivo Radix (alias de `Accordion.Root`).
 *
 * Para `type="single"`, passe `collapsible` se quiser permitir fechar o item
 * ativo (sem ele, o item permanece sempre aberto após o primeiro clique).
 *
 * @example
 * // Single, collapsível
 * <Accordion type="single" collapsible defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Pergunta</AccordionTrigger>
 *     <AccordionContent>Resposta</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * @example
 * // Multiple
 * <Accordion type="multiple" defaultValue={['a', 'b']}>...</Accordion>
 */
export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = 'default', children, ...props }, ref) => (
  <AccordionVariantContext.Provider value={variant}>
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(accordionRootVariants({ variant }), className)}
      {...(props as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
    >
      {children}
      <style>{accordionKeyframes}</style>
    </AccordionPrimitive.Root>
  </AccordionVariantContext.Provider>
))
Accordion.displayName = 'Accordion'

// ─── AccordionItem ───

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
})
AccordionItem.displayName = 'AccordionItem'

// ─── AccordionHeader (re-export) ───

export const AccordionHeader = AccordionPrimitive.Header

// ─── AccordionTrigger ───

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0 text-neutral-500 transition-transform duration-200"
    {...props}
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
)

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ variant }), className)}
        {...props}
      >
        {children}
        <ChevronDownIcon />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = 'AccordionTrigger'

// ─── AccordionContent ───

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(accordionContentVariants({ variant }), className)}
      {...props}
    >
      <div className="pb-3 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = 'AccordionContent'

export {
  accordionRootVariants as accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
}
