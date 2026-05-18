// @hashcodeti/ui-kit-core/primitives/InputGroup
//
// InputGroup composto Tailwind+cva. Substitui `<InputGroup>` + `<InputGroup.Text>`
// do react-bootstrap (~25 callers cross-MF). Padrão slot/compound (igual Card),
// com Context para propagar `size` para os addons (e, futuramente, TextField).
//
// Pattern de uso:
//   <InputGroup size="md">
//     <InputGroupAddon><FaSearch/></InputGroupAddon>
//     <TextField placeholder="Buscar..." />
//     <InputGroupButton><Button>Ir</Button></InputGroupButton>
//   </InputGroup>
//
// LAYOUT — bordas conectadas:
//   O root é `inline-flex` e usa selectors Tailwind para zerar o raio das
//   extremidades dos children adjacentes:
//     [&>*:first-child]:rounded-r-none
//     [&>*:last-child]:rounded-l-none
//     [&>*:not(:first-child):not(:last-child)]:rounded-none
//   Isso vale para TextField, Button, addons — qualquer child com border-radius.
//
// PROPAGAÇÃO DE SIZE:
//   Usa React.Context (`InputGroupContext`). Sub-componentes deste arquivo
//   (Addon/Text/Button wrapper) consomem via `useInputGroupContext()`. TextField
//   não é tocado nesta entrega; a Context fica exposta para que ele possa optar
//   por consumir em uma próxima iteração (zero breaking change agora).

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ─── Context ────────────────────────────────────────────────────────────────

export type InputGroupSize = 'sm' | 'md' | 'lg'

interface InputGroupContextValue {
  size: InputGroupSize
}

const InputGroupContext = React.createContext<InputGroupContextValue | null>(null)

/**
 * Hook para consumir o contexto do InputGroup pai. Retorna `null` se chamado
 * fora de um `<InputGroup>` — útil para componentes que querem opt-in ao size
 * propagado sem quebrar quando renderizados standalone (ex.: TextField).
 */
export function useInputGroupContext(): InputGroupContextValue | null {
  return React.useContext(InputGroupContext)
}

// ─── Root variants ──────────────────────────────────────────────────────────

const inputGroupVariants = cva(
  [
    // Layout: inline-flex com bordas conectadas
    'inline-flex items-stretch w-full',
    // Zera raio das extremidades dos children adjacentes (TextField/Button/Addon)
    '[&>*:first-child]:rounded-r-none',
    '[&>*:last-child]:rounded-l-none',
    '[&>*:not(:first-child):not(:last-child)]:rounded-none',
    // Colapsa bordas duplicadas entre elementos adjacentes
    '[&>*:not(:first-child)]:-ml-px',
    // Foco fica acima dos vizinhos para não cortar o ring
    '[&>*:focus-within]:relative [&>*:focus-within]:z-10',
    '[&>*:focus]:relative [&>*:focus]:z-10',
  ],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type InputGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> &
  Omit<VariantProps<typeof inputGroupVariants>, 'size'> & {
    /** Tamanho propagado via Context para sub-componentes. Default `md`. */
    size?: InputGroupSize
  }

/**
 * InputGroup — primitivo composto cross-domain.
 *
 * Agrupa um TextField com addons (ícones, texto, botões) com bordas
 * conectadas. Substitui `react-bootstrap` `InputGroup`.
 *
 * @example
 * // Ícone à esquerda
 * <InputGroup>
 *   <InputGroupAddon><FaSearch /></InputGroupAddon>
 *   <TextField placeholder="Buscar..." />
 * </InputGroup>
 *
 * @example
 * // Texto fixo + botão à direita (URL builder)
 * <InputGroup size="lg">
 *   <InputGroupText>https://</InputGroupText>
 *   <TextField defaultValue="meu-site" />
 *   <InputGroupText>.teraprox.com</InputGroupText>
 *   <InputGroupButton>
 *     <Button variant="primary">Salvar</Button>
 *   </InputGroupButton>
 * </InputGroup>
 *
 * @example
 * // Sub-export compound (parity bootstrap)
 * <InputGroup>
 *   <InputGroup.Text>R$</InputGroup.Text>
 *   <TextField type="number" />
 * </InputGroup>
 */
const InputGroupRoot = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    const ctx = React.useMemo<InputGroupContextValue>(() => ({ size }), [size])
    return (
      <InputGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          role="group"
          className={cn(inputGroupVariants({ size }), className)}
          {...props}
        >
          {children}
        </div>
      </InputGroupContext.Provider>
    )
  },
)
InputGroupRoot.displayName = 'InputGroup'

// ─── Sizing tokens compartilhados pelos addons ──────────────────────────────

const addonSizeClass: Record<InputGroupSize, string> = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base',
}

// ─── InputGroupAddon ────────────────────────────────────────────────────────

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Posição do addon — controla apenas o border-radius residual quando o
   * addon é o primeiro/último child. O cálculo principal acontece via
   * selectors do root, então `position` é em geral dispensável.
   */
  position?: 'left' | 'right'
  /**
   * Marca o addon como decorativo — adiciona `aria-hidden="true"`. Use
   * quando o conteúdo é um ícone puramente visual (ex.: lupa de busca).
   * Default `true` (assume ícone decorativo, padrão react-bootstrap).
   */
  decorative?: boolean
  /** Tamanho explícito (sobrescreve Context). Use só fora de InputGroup. */
  size?: InputGroupSize
}

/**
 * InputGroupAddon — wrapper genérico para ícones / elementos decorativos.
 *
 * @example
 * <InputGroupAddon><FaSearch /></InputGroupAddon>
 */
export const InputGroupAddon = React.forwardRef<HTMLSpanElement, InputGroupAddonProps>(
  ({ className, position, decorative = true, size: sizeProp, children, ...props }, ref) => {
    const ctx = useInputGroupContext()
    const size = sizeProp ?? ctx?.size ?? 'md'
    return (
      <span
        ref={ref}
        aria-hidden={decorative ? 'true' : undefined}
        data-position={position}
        className={cn(
          'inline-flex items-center justify-center shrink-0',
          'border border-surface-border bg-neutral-50 text-neutral-600',
          'rounded-md',
          addonSizeClass[size],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)
InputGroupAddon.displayName = 'InputGroupAddon'

// ─── InputGroupText ─────────────────────────────────────────────────────────

export interface InputGroupTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tamanho explícito (sobrescreve Context). */
  size?: InputGroupSize
}

/**
 * InputGroupText — slot textual fixo (parity com `InputGroup.Text` bootstrap).
 *
 * Renderiza texto não-editável dentro do grupo. Visualmente igual ao addon,
 * mas semanticamente texto (não recebe `aria-hidden`).
 *
 * @example
 * <InputGroup>
 *   <InputGroupText>R$</InputGroupText>
 *   <TextField type="number" />
 *   <InputGroupText>,00</InputGroupText>
 * </InputGroup>
 */
export const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className, size: sizeProp, children, ...props }, ref) => {
    const ctx = useInputGroupContext()
    const size = sizeProp ?? ctx?.size ?? 'md'
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center shrink-0 whitespace-nowrap',
          'border border-surface-border bg-neutral-50 text-neutral-700 font-medium',
          'rounded-md',
          addonSizeClass[size],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)
InputGroupText.displayName = 'InputGroupText'

// ─── InputGroupButton ───────────────────────────────────────────────────────

export interface InputGroupButtonProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tamanho explícito (sobrescreve Context). */
  size?: InputGroupSize
}

/**
 * InputGroupButton — wrapper para um `<Button>` (ou qualquer elemento
 * clicável) dentro do grupo. Não estiliza o filho — apenas garante shrink-0
 * e marca o slot. Use o Button do ui-kit-core como filho.
 *
 * @example
 * <InputGroup>
 *   <TextField placeholder="cupom" />
 *   <InputGroupButton>
 *     <Button variant="primary">Aplicar</Button>
 *   </InputGroupButton>
 * </InputGroup>
 */
export const InputGroupButton = React.forwardRef<HTMLSpanElement, InputGroupButtonProps>(
  ({ className, size: _size, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-stretch shrink-0',
        // Repassa o "rounded-none" para o Button filho via selector
        '[&>*]:rounded-none [&>*]:h-full',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
)
InputGroupButton.displayName = 'InputGroupButton'

// ─── Compound shortcut (parity bootstrap) ───────────────────────────────────

type InputGroupComponent = typeof InputGroupRoot & {
  Text: typeof InputGroupText
  Addon: typeof InputGroupAddon
  Button: typeof InputGroupButton
}

export const InputGroup = InputGroupRoot as InputGroupComponent
InputGroup.Text = InputGroupText
InputGroup.Addon = InputGroupAddon
InputGroup.Button = InputGroupButton

export { inputGroupVariants, InputGroupContext }
