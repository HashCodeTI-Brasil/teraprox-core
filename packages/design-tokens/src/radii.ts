// @hashcodeti/design-tokens — Border radii
//
// Escala extraída dos usos hardcoded em componentes existentes (4/6/8/10/12 px).
// Convenção Tailwind para facilitar a bridge.

export const radii = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const

export type RadiiTokens = typeof radii
export type RadiiKey = keyof typeof radii
