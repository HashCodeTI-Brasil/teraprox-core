// @hashcodeti/ui-kit-core/primitives/EmptyState
//
// EmptyState — primitivo NOVO (gap absoluto, não existe equivalente bootstrap).
// Pattern Tailwind UI / Shadcn empty: estado "nada aqui" centralizado com slots
// opcionais (icon + title + description + action CTA). Cria padrão único para
// 8+ telas que hoje renderizam vazios inconsistentes (lists/tabelas/grids).
//
// Eixos:
//   variant: default (centralizado, padding generoso)
//          | compact (menor, padding reduzido — para inline em cards/tabs)
//          | card    (wrapper visual com border + shadow + bg-surface)
//   size:    sm | md (default) | lg
//
// Slots (props, não compound — paridade com pattern Card "slot-via-prop"):
//   icon         ReactNode (top, decorativo — aria-hidden injetado)
//   title        string | ReactNode (h4 sm | h3 md/lg)
//   description  string | ReactNode opcional (p)
//   action       ReactNode opcional (CTA — wrapper centralizado abaixo)
//
// a11y:
//   role="status" + aria-live="polite" no root (anuncia mudanças de estado vazio
//   para screen readers — ex.: filtro que zera resultado).
//   icon container recebe aria-hidden="true" (decorativo por design — caso o caller
//   precise comunicar semântica, fazer via title/description).
//
// Heading level por size:
//   sm  → <h4>  (uso compact/secundário, hierarquia menor)
//   md  → <h3>  (default, telas-cheia tier 2)
//   lg  → <h3>  (telas dedicadas — mantém h3, h2 fica para page title)
//
// Sem default icon. Caller decide (FaInbox, FaSearch, FaFolderOpen etc.) — evita
// dependency em react-icons no ui-kit-core, mantém peer-free.

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const emptyStateVariants = cva(
  // base — flex column centralizado; role/aria no DOM, não nas classes
  ['flex flex-col items-center justify-center text-center', 'text-surface-foreground'],
  {
    variants: {
      variant: {
        default: 'px-6 py-12',
        compact: 'px-4 py-6',
        card: 'px-6 py-12 bg-surface-background border border-surface-border rounded-lg shadow-sm',
      },
      size: {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      },
    },
    compoundVariants: [
      // compact tightens gap regardless of size
      { variant: 'compact', size: 'sm', class: 'gap-1.5' },
      { variant: 'compact', size: 'md', class: 'gap-2' },
      { variant: 'compact', size: 'lg', class: 'gap-2.5' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type EmptyStateVariant = NonNullable<VariantProps<typeof emptyStateVariants>['variant']>
export type EmptyStateSize = NonNullable<VariantProps<typeof emptyStateVariants>['size']>

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof emptyStateVariants> {
  /** Ícone (ReactNode, decorativo). Renderizado no topo, herda `text-muted-foreground`. */
  icon?: React.ReactNode
  /** Título — string ou node. Heading level depende do `size` (sm→h4, md/lg→h3). */
  title: React.ReactNode
  /** Descrição opcional — string ou node, renderizado como `<p>`. */
  description?: React.ReactNode
  /** Ação CTA opcional (geralmente <Button>). Wrapper centralizado abaixo. */
  action?: React.ReactNode
}

const iconSizeClass: Record<EmptyStateSize, string> = {
  sm: 'text-2xl [&>svg]:h-6 [&>svg]:w-6',
  md: 'text-4xl [&>svg]:h-10 [&>svg]:w-10',
  lg: 'text-5xl [&>svg]:h-14 [&>svg]:w-14',
}

const titleSizeClass: Record<EmptyStateSize, string> = {
  sm: 'text-sm font-semibold',
  md: 'text-base font-semibold',
  lg: 'text-lg font-semibold',
}

const descriptionSizeClass: Record<EmptyStateSize, string> = {
  sm: 'text-xs text-neutral-500 max-w-xs',
  md: 'text-sm text-neutral-500 max-w-sm',
  lg: 'text-base text-neutral-500 max-w-md',
}

/**
 * EmptyState — primitivo cross-domain para estados "nada aqui".
 *
 * Renderiza `<div role="status" aria-live="polite">` com slots opcionais
 * (icon + title + description + action). Usado em lists, tabelas, grids,
 * resultados-de-busca-vazios, abas sem conteúdo etc.
 *
 * @example
 * // Mínimo (apenas título)
 * <EmptyState title="Nenhum resultado" />
 *
 * @example
 * // Completo
 * <EmptyState
 *   icon={<FaInbox />}
 *   title="Nenhuma OS"
 *   description="Crie a primeira ordem de serviço para começar."
 *   action={<Button onClick={onCreate}>Criar OS</Button>}
 * />
 *
 * @example
 * // Wrapper visual (card)
 * <EmptyState variant="card" icon={<FaSearch />} title="Sem resultados" />
 *
 * @example
 * // Inline em tab/card (compact)
 * <EmptyState variant="compact" size="sm" title="Nada por aqui" />
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, size, icon, title, description, action, ...props }, ref) => {
    const resolvedSize = (size ?? 'md') as EmptyStateSize
    const TitleTag = (resolvedSize === 'sm' ? 'h4' : 'h3') as 'h3' | 'h4'

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <div
            aria-hidden="true"
            className={cn(
              'inline-flex items-center justify-center text-neutral-400',
              iconSizeClass[resolvedSize],
            )}
          >
            {icon}
          </div>
        )}

        <TitleTag className={cn('m-0 text-surface-foreground', titleSizeClass[resolvedSize])}>
          {title}
        </TitleTag>

        {description && (
          <p className={cn('m-0', descriptionSizeClass[resolvedSize])}>{description}</p>
        )}

        {action && <div className={cn('mt-2 flex items-center justify-center')}>{action}</div>}
      </div>
    )
  },
)
EmptyState.displayName = 'EmptyState'

export { emptyStateVariants }
