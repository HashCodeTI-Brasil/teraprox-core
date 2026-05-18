// @hashcodeti/ui-kit-core/primitives/SearchBar
//
// Composite primitivo Tailwind+cva. Substitui o padrão repetido em ~5+ MFs:
//   <InputGroup>
//     <InputGroup.Text><FaSearch /></InputGroup.Text>
//     <Form.Control placeholder="Buscar..." value={q} onChange={...} />
//     {q && <Button onClick={clear}>×</Button>}
//   </InputGroup>
//
// Reusa TextField por dentro (NÃO modifica TextField). Ícone search + clear
// button são absolutamente posicionados sobre o input via wrapper relativo.
//
// Variants:    default
// Sizes:       sm | md (default) | lg
// Extras:      clearable, icon (slot), loading (spinner inline), debounceMs
//
// Arquitetura: UI puro. Caller controla state. `debounceMs` apenas atrasa o
// `onChange` emitido — não faz busca. Sem libs externas (debounce via
// setTimeout/clearTimeout).
//
// a11y:
//   - input recebe aria-label (default "Buscar")
//   - clear button: aria-label="Limpar busca"
//   - search icon decorativo (aria-hidden)
//
// forwardRef alvo: <input> interno. Usamos `inputRef` no TextField via
// forwardRef do TextField (TextField já encaminha ref para <input>). O
// SearchBar repassa seu próprio ref direto para o TextField.

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { TextField, type TextFieldSize } from '../TextField/TextField'

// ─── Variants ─────────────────────────────────────────────────────────────

export const searchBarVariants = cva('relative w-full', {
  variants: {
    variant: {
      default: '',
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

export type SearchBarVariant = NonNullable<VariantProps<typeof searchBarVariants>['variant']>
export type SearchBarSize = NonNullable<VariantProps<typeof searchBarVariants>['size']>

// ─── Tabela de medidas por size ───────────────────────────────────────────
// Mantém em um só lugar: padding-left (espaço para ícone search), padding-right
// (espaço para botão clear quando aplicável), tamanho do ícone, posição dos
// adornos. Mapeia 1:1 às alturas do TextField (h-8/10/12).

interface SizeMetrics {
  /** Tamanho (h-W w-W) do ícone search à esquerda (Tailwind classes). */
  iconBox: string
  /** Padding-left aplicado ao input (compensa ícone à esquerda). */
  padLeft: string
  /** Padding-right aplicado ao input (compensa botão clear à direita). */
  padRight: string
  /** Posicionamento absoluto da área do ícone (left + altura total). */
  leftSlot: string
  /** Posicionamento absoluto do botão clear. */
  rightSlot: string
  /** Tamanho do botão clear. */
  clearBox: string
  /** TextField size correspondente. */
  tfSize: TextFieldSize
}

const SIZE_METRICS: Record<SearchBarSize, SizeMetrics> = {
  sm: {
    iconBox: 'h-3.5 w-3.5',
    padLeft: 'pl-8',
    padRight: 'pr-8',
    leftSlot: 'left-2 top-0 h-8',
    rightSlot: 'right-1 top-0 h-8',
    clearBox: 'h-6 w-6',
    tfSize: 'sm',
  },
  md: {
    iconBox: 'h-4 w-4',
    padLeft: 'pl-9',
    padRight: 'pr-9',
    leftSlot: 'left-2.5 top-0 h-10',
    rightSlot: 'right-1.5 top-0 h-10',
    clearBox: 'h-7 w-7',
    tfSize: 'md',
  },
  lg: {
    iconBox: 'h-5 w-5',
    padLeft: 'pl-11',
    padRight: 'pr-11',
    leftSlot: 'left-3 top-0 h-12',
    rightSlot: 'right-2 top-0 h-12',
    clearBox: 'h-8 w-8',
    tfSize: 'lg',
  },
}

// ─── Ícones SVG inline (sem react-icons) ──────────────────────────────────

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <circle cx="7" cy="7" r="5" />
    <path d="M11 11l3 3" />
  </svg>
)

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
)

const InlineSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <span
    role="status"
    aria-live="polite"
    className={cn(
      'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
      className,
    )}
  >
    <span className="sr-only">Buscando...</span>
  </span>
)

// ─── Props ────────────────────────────────────────────────────────────────

export interface SearchBarProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'onChange' | 'children'
  > {
  /** Valor controlado da busca. */
  value: string
  /** Callback emitido com o valor (após debounce, se aplicável). */
  onChange: (value: string) => void
  /** Callback do clear (X). Recebe controle do reset. Default: emite `onChange('')`. */
  onClear?: () => void
  /** Placeholder do input. Default `"Buscar..."`. */
  placeholder?: string
  /** Atraso (ms) para emitir `onChange` após digitação. Default 0 (sem debounce). */
  debounceMs?: number
  /** Estado de loading — substitui ícone search por spinner. */
  loading?: boolean
  /** Habilita botão X quando `value` não vazio. Default `true`. */
  clearable?: boolean
  /** Slot opcional para ícone customizado à esquerda (substitui o search SVG). */
  icon?: React.ReactNode
  /** Tamanho — propaga ao TextField interno. */
  size?: SearchBarSize
  /** Variant — atualmente só `default`. */
  variant?: SearchBarVariant
  /** aria-label do input. Default `"Buscar"`. */
  'aria-label'?: string
  /** Wrapper className (div externo `relative`). */
  wrapperClassName?: string
}

// ─── Componente ──────────────────────────────────────────────────────────

/**
 * SearchBar — composite cross-domain.
 *
 * Substitui o padrão `InputGroup + FormControl + FaSearch + clear button`.
 * Reusa `TextField` por dentro; ícones absolutamente posicionados via wrapper
 * relativo (TextField não suporta leftAdornment).
 *
 * @example
 * // Controlado simples
 * const [q, setQ] = useState('')
 * <SearchBar value={q} onChange={setQ} />
 *
 * @example
 * // Com debounce de 300ms
 * <SearchBar value={q} onChange={setQ} debounceMs={300} />
 *
 * @example
 * // Loading state
 * <SearchBar value={q} onChange={setQ} loading={isFetching} />
 */
export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = 'Buscar...',
      debounceMs = 0,
      loading = false,
      clearable = true,
      icon,
      size,
      variant,
      disabled,
      className,
      wrapperClassName,
      'aria-label': ariaLabel = 'Buscar',
      name,
      id,
      ...props
    },
    ref,
  ) => {
    const resolvedSize: SearchBarSize = (size ?? 'md') as SearchBarSize
    const metrics = SIZE_METRICS[resolvedSize]

    // ── Debounce interno (sem libs) ─────────────────────────────────────
    // Mantém um valor "draft" controlado localmente quando há debounce. Se
    // `debounceMs === 0`, faz pass-through direto. Quando o `value` externo
    // muda (caller resetou, ex.: filtro removido), sincroniza o draft.
    const [draft, setDraft] = React.useState(value)
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastEmittedRef = React.useRef(value)

    React.useEffect(() => {
      // Sincroniza draft quando value externo diverge do último emitido
      if (value !== lastEmittedRef.current) {
        setDraft(value)
        lastEmittedRef.current = value
      }
    }, [value])

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      if (debounceMs > 0) {
        setDraft(next)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          lastEmittedRef.current = next
          onChange(next)
        }, debounceMs)
      } else {
        lastEmittedRef.current = next
        onChange(next)
      }
    }

    const handleClear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      setDraft('')
      lastEmittedRef.current = ''
      if (onClear) onClear()
      else onChange('')
    }

    const displayValue = debounceMs > 0 ? draft : value
    const showClear = clearable && !disabled && displayValue.length > 0

    return (
      <div className={cn(searchBarVariants({ variant, size: resolvedSize }), wrapperClassName)}>
        {/* Ícone search (ou spinner em loading) — absolutamente posicionado à esquerda */}
        <div
          className={cn(
            'pointer-events-none absolute z-10 flex items-center justify-center text-neutral-400',
            metrics.leftSlot,
          )}
          aria-hidden={!loading}
        >
          {loading ? (
            <InlineSpinner className={metrics.iconBox} />
          ) : icon ? (
            <span className={cn('inline-flex items-center justify-center', metrics.iconBox)}>
              {icon}
            </span>
          ) : (
            <SearchIcon className={metrics.iconBox} />
          )}
        </div>

        {/* TextField como base — passa size + paddings extras via className */}
        <TextField
          ref={ref}
          type="search"
          role="searchbox"
          name={name}
          id={id}
          value={displayValue}
          onChange={handleInput}
          placeholder={placeholder}
          disabled={disabled}
          size={metrics.tfSize}
          aria-label={ariaLabel}
          className={cn(
            metrics.padLeft,
            showClear ? metrics.padRight : '',
            // Remove o "x" nativo do <input type="search"> em WebKit
            '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none',
            className,
          )}
          {...props}
        />

        {/* Botão clear — absoluto à direita, só quando há valor */}
        {showClear && (
          <div
            className={cn(
              'absolute z-10 flex items-center justify-center',
              metrics.rightSlot,
            )}
          >
            <button
              type="button"
              onClick={handleClear}
              aria-label="Limpar busca"
              className={cn(
                'inline-flex items-center justify-center rounded-full',
                'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
                'transition-colors duration-150',
                metrics.clearBox,
              )}
            >
              <CloseIcon className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    )
  },
)
SearchBar.displayName = 'SearchBar'
