// @hashcodeti/design-tokens — Breakpoints
//
// Mobile-first. Valores idênticos ao default do Tailwind para previsibilidade
// cross-MF e máxima compatibilidade com a comunidade.

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type BreakpointTokens = typeof breakpoints
export type BreakpointKey = keyof typeof breakpoints

// Versão em px (string) consumida pelo Tailwind preset (`theme.screens`).
export const breakpointsPx = Object.fromEntries(
  Object.entries(breakpoints).map(([k, v]) => [k, `${v}px`])
) as Record<BreakpointKey, string>
