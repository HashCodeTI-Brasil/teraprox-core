import React from 'react'

/**
 * CombineModeToggle — toggle visual com ícones de Venn para modos de combinação
 * de filtros multi-select. Props-driven (zero Redux, zero dominio).
 *
 * Use em conjunto com `useFilterCombineMode` do `teraprox-core-sdk`:
 *
 * ```tsx
 * const combine = useFilterCombineMode('union')
 * <CombineModeToggle mode={combine.mode} onChange={combine.setMode} />
 * ```
 */

export type CombineMode = 'union' | 'intersection' | 'xor'

export interface CombineModeToggleProps {
  mode: CombineMode
  onChange: (mode: CombineMode) => void
  /** Exibe rótulo junto aos ícones. */
  showLabel?: boolean
  disabled?: boolean
  /** Tamanho do ícone em pixels. Default: 18. */
  size?: number
  className?: string
}

interface VennIconProps {
  variant: CombineMode
  size?: number
}

/**
 * Ícone de Venn 2-círculos. A região preenchida muda conforme o modo:
 *  - union → ambos círculos preenchidos (sobreposição incluída)
 *  - intersection → apenas a lente central
 *  - xor → ambos círculos preenchidos, lente central em branco
 */
const VennIcon: React.FC<VennIconProps> = ({ variant, size = 18 }) => {
  const FILL = 'currentColor'
  const OFF = 'none'
  const STROKE = 'currentColor'
  const strokeWidth = 1.4

  if (variant === 'intersection') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="clipA-intersection">
            <circle cx="9" cy="12" r="6" />
          </clipPath>
        </defs>
        <circle cx="9" cy="12" r="6" fill={OFF} stroke={STROKE} strokeWidth={strokeWidth} />
        <circle cx="15" cy="12" r="6" fill={OFF} stroke={STROKE} strokeWidth={strokeWidth} />
        <circle
          cx="15"
          cy="12"
          r="6"
          fill={FILL}
          clipPath="url(#clipA-intersection)"
          opacity={0.85}
        />
      </svg>
    )
  }

  if (variant === 'xor') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <mask id="mask-xor">
            <rect width="24" height="24" fill="black" />
            <circle cx="9" cy="12" r="6" fill="white" />
            <circle cx="15" cy="12" r="6" fill="white" />
            <circle cx="9" cy="12" r="6" fill="black" mask="url(#inner-xor)" />
            <g>
              <circle cx="9" cy="12" r="6" fill="white" />
              <circle cx="15" cy="12" r="6" fill="white" />
            </g>
          </mask>
        </defs>
        {/* Renderização direta: dois círculos preenchidos + lente central branca por cima */}
        <circle cx="9" cy="12" r="6" fill={FILL} opacity={0.85} />
        <circle cx="15" cy="12" r="6" fill={FILL} opacity={0.85} />
        {/* Lente branca = interseção excluída */}
        <g>
          <defs>
            <clipPath id="clipA-xor">
              <circle cx="9" cy="12" r="6" />
            </clipPath>
          </defs>
          <circle
            cx="15"
            cy="12"
            r="6"
            fill="white"
            clipPath="url(#clipA-xor)"
          />
        </g>
        <circle cx="9" cy="12" r="6" fill={OFF} stroke={STROKE} strokeWidth={strokeWidth} />
        <circle cx="15" cy="12" r="6" fill={OFF} stroke={STROKE} strokeWidth={strokeWidth} />
      </svg>
    )
  }

  // union
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="9" cy="12" r="6" fill={FILL} opacity={0.85} />
      <circle cx="15" cy="12" r="6" fill={FILL} opacity={0.85} />
      <circle cx="9" cy="12" r="6" fill={OFF} stroke={STROKE} strokeWidth={strokeWidth} />
      <circle cx="15" cy="12" r="6" fill={OFF} stroke={STROKE} strokeWidth={strokeWidth} />
    </svg>
  )
}

const MODE_CONFIG: Record<
  CombineMode,
  { label: string; short: string; description: string }
> = {
  union: {
    label: 'União',
    short: 'OU',
    description: 'Exibe itens que batem com qualquer filtro ativo (A ∪ B).',
  },
  intersection: {
    label: 'Intersecção',
    short: 'E',
    description: 'Exibe apenas itens que batem com todos os filtros ativos (A ∩ B).',
  },
  xor: {
    label: 'Exclusivo',
    short: 'XOR',
    description: 'Exibe itens que batem em apenas um dos filtros ativos — exclui a intersecção (A △ B).',
  },
}

const MODES: CombineMode[] = ['union', 'intersection', 'xor']

export const CombineModeToggle: React.FC<CombineModeToggleProps> = ({
  mode,
  onChange,
  showLabel = false,
  disabled = false,
  size = 18,
  className,
}) => {
  return (
    <div
      role="group"
      aria-label="Modo de combinação dos filtros"
      className={`combine-mode-toggle btn-group btn-group-sm ${className ?? ''}`.trim()}
    >
      {MODES.map((m) => {
        const cfg = MODE_CONFIG[m]
        const isActive = m === mode
        return (
          <button
            key={m}
            type="button"
            className={`btn ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onChange(m)}
            disabled={disabled}
            title={cfg.description}
            aria-pressed={isActive}
            aria-label={`${cfg.label}: ${cfg.description}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            <VennIcon variant={m} size={size} />
            {showLabel ? (
              <span style={{ fontSize: '0.75rem' }}>{cfg.short}</span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
