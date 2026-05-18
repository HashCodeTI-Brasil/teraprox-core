// @hashcodeti/ui-kit-core/primitives/Collapsible
//
// Wrapper sobre @radix-ui/react-collapsible. Substitui usos de
// `react-bootstrap` `Collapse` e implementações ad-hoc com `useState` + maxHeight.
//
// Stack Radix entrega de graça:
//   - Controlled / uncontrolled (open / defaultOpen)
//   - aria-expanded no Trigger, aria-hidden no Content quando fechado
//   - data-state="open"|"closed" em Root/Trigger/Content
//   - Variável CSS `--radix-collapsible-content-height` no Content (medida real
//     do conteúdo, atualizada em ResizeObserver) — usada para animar height de
//     0 → conteúdo sem precisar de JS.
//
// Animação:
//   O preset `@hashcodeti/tailwind-preset` AINDA NÃO declara as keyframes
//   `collapsible-down` / `collapsible-up`. Para manter este primitivo
//   self-contained (sem exigir ajuste no preset antes de adoção), injetamos
//   as keyframes via tag `<style>` inline (mesma estratégia do `Progress`).
//   Aplicamos via classe utilitária `animate-[name_duration_easing]` arbitrária.
//
//   FOLLOW-UP: promover keyframes ao preset (`accordion-down`/`accordion-up`)
//   quando `Accordion` for entregue — então removemos o `<style>` daqui.
//
// API:
//   - <Collapsible> (alias Root) + <CollapsibleTrigger> + <CollapsibleContent>
//   - Trigger aceita `asChild` (preserva caller `<Button>`)
//   - Content aplica `overflow-hidden` (ESSENCIAL p/ collapse animar)

import * as React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { cn } from '../../lib/cn'

// ─── Keyframes inline (auto-injetadas, idempotentes) ─────────────────────
//
// Usamos um id estável e checamos no document antes de injetar para evitar
// duplicação em SSR/hydration ou múltiplas instâncias.

const COLLAPSIBLE_KEYFRAMES_ID = 'hashcodeti-collapsible-keyframes'
const COLLAPSIBLE_KEYFRAMES_CSS = `
@keyframes hashcodeti-collapsible-down {
  from { height: 0; }
  to { height: var(--radix-collapsible-content-height); }
}
@keyframes hashcodeti-collapsible-up {
  from { height: var(--radix-collapsible-content-height); }
  to { height: 0; }
}
`

const CollapsibleKeyframes: React.FC = () => {
  // Injeta uma única vez no <head>. Em SSR cai num useEffect — render inicial
  // do servidor ainda funciona pois Radix começa com height auto até a primeira
  // medição; animação só dispara após mount no cliente.
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(COLLAPSIBLE_KEYFRAMES_ID)) return
    const style = document.createElement('style')
    style.id = COLLAPSIBLE_KEYFRAMES_ID
    style.textContent = COLLAPSIBLE_KEYFRAMES_CSS
    document.head.appendChild(style)
  }, [])
  return null
}

// ─── Root (alias) ────────────────────────────────────────────────────────

export type CollapsibleProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Root
>

/**
 * Collapsible — alias de `Collapsible.Root` (Radix). Container que coordena
 * Trigger ↔ Content via `data-state`. Pode ser controlled (`open` /
 * `onOpenChange`) ou uncontrolled (`defaultOpen`).
 *
 * @example
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger asChild><Button>Detalhes</Button></CollapsibleTrigger>
 *   <CollapsibleContent>Conteúdo expansível</CollapsibleContent>
 * </Collapsible>
 */
export const Collapsible = CollapsiblePrimitive.Root

// ─── Trigger ─────────────────────────────────────────────────────────────

export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Trigger
>

/**
 * CollapsibleTrigger — botão que alterna `open`. Renderiza `<button>` por
 * padrão; passe `asChild` para projetar props no filho (recomendado p/
 * `<Button>` do ui-kit-core).
 */
export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger ref={ref} className={cn(className)} {...props} />
))
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

// ─── Content ─────────────────────────────────────────────────────────────

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Content
>

/**
 * CollapsibleContent — painel expansível. Animação de altura via keyframes
 * que usam `--radix-collapsible-content-height` (medida real do conteúdo).
 * Aplica `overflow-hidden` para que o clip funcione durante a transição.
 *
 * O caller controla padding/border/background (sem variants — minimalista).
 *
 * @example
 * <CollapsibleContent className="pt-2 pl-4 border-l border-surface-border">
 *   ...
 * </CollapsibleContent>
 */
export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => (
  <>
    <CollapsibleKeyframes />
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden',
        'data-[state=open]:animate-[hashcodeti-collapsible-down_200ms_ease-out]',
        'data-[state=closed]:animate-[hashcodeti-collapsible-up_200ms_ease-out]',
        className,
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  </>
))
CollapsibleContent.displayName = 'CollapsibleContent'
