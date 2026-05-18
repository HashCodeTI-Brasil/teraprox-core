// @hashcodeti/design-tokens — Spacing
//
// Escala base 4px. Chaves seguem convenção Tailwind para facilitar a bridge
// (ex.: `p-4` = 16px = `spacing[4]`). Cada entrada exporta tanto px quanto rem
// (assumindo base 16px = 1rem) para permitir uso direto em CSS-in-JS, inline
// styles e Tailwind preset.

const toRem = (px: number): string => `${px / 16}rem`
const entry = (px: number) => ({ px: `${px}px`, rem: toRem(px) })

export const spacing = {
  0: entry(0),
  px: { px: '1px', rem: '1px' },
  0.5: entry(2),
  1: entry(4),
  1.5: entry(6),
  2: entry(8),
  3: entry(12),
  4: entry(16),
  5: entry(20),
  6: entry(24),
  8: entry(32),
  10: entry(40),
  12: entry(48),
  16: entry(64),
  20: entry(80),
  24: entry(96),
  32: entry(128),
  40: entry(160),
  48: entry(192),
  64: entry(256),
  80: entry(320),
  96: entry(384),
} as const

export type SpacingTokens = typeof spacing
export type SpacingKey = keyof typeof spacing

// Helper: extrair só os valores rem (formato consumido pelo Tailwind preset).
export const spacingRem = Object.fromEntries(
  Object.entries(spacing).map(([k, v]) => [k, v.rem])
) as Record<SpacingKey, string>
