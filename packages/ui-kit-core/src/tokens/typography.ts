// Teraprox Design Tokens — Typography
//
// Escala tipográfica centralizada. Font families usam system stack até o user
// fornecer fontes oficiais (Inter / Geist / outra). Placeholders comentados
// abaixo indicam onde injetar quando disponíveis.

const SYSTEM_SANS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
const SYSTEM_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

export const fontFamily = {
  // TODO(brand): substituir por ['Inter', ...SYSTEM_SANS] ou ['Geist', ...SYSTEM_SANS]
  // quando user fornecer fonte oficial Teraprox.
  sans: SYSTEM_SANS,
  // TODO(brand): substituir por ['Geist', ...SYSTEM_SANS] para títulos display.
  display: SYSTEM_SANS,
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: SYSTEM_MONO,
} as const

// Escala em rem (assume base 16px). Cada entrada é [fontSize, lineHeight].
export const fontSize = {
  '2xs': ['0.625rem', '0.875rem'], // 10/14
  xs: ['0.75rem', '1rem'], // 12/16
  sm: ['0.875rem', '1.25rem'], // 14/20
  base: ['1rem', '1.5rem'], // 16/24
  md: ['1rem', '1.5rem'], // alias de base
  lg: ['1.125rem', '1.75rem'], // 18/28
  xl: ['1.25rem', '1.75rem'], // 20/28
  '2xl': ['1.5rem', '2rem'], // 24/32
  '3xl': ['1.875rem', '2.25rem'], // 30/36
  '4xl': ['2.25rem', '2.5rem'], // 36/40
  '5xl': ['3rem', '1'], // 48/—
  '6xl': ['3.75rem', '1'], // 60/—
  '7xl': ['4.5rem', '1'], // 72/—
} as const

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const

export const lineHeight = {
  none: '1',
  tight: '1.15',
  snug: '1.25',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// Escala semântica (tokens "Display / H1-H6 / Body / Caption / Mono") — reusa
// fontSize acima. Útil para componentes de site que pedem semântica direta.
export const textStyles = {
  display: { fontSize: fontSize['6xl'], weight: fontWeight.bold, leading: lineHeight.tight, tracking: letterSpacing.tight },
  h1: { fontSize: fontSize['5xl'], weight: fontWeight.bold, leading: lineHeight.tight, tracking: letterSpacing.tight },
  h2: { fontSize: fontSize['4xl'], weight: fontWeight.bold, leading: lineHeight.snug, tracking: letterSpacing.tight },
  h3: { fontSize: fontSize['3xl'], weight: fontWeight.semibold, leading: lineHeight.snug, tracking: letterSpacing.normal },
  h4: { fontSize: fontSize['2xl'], weight: fontWeight.semibold, leading: lineHeight.snug, tracking: letterSpacing.normal },
  h5: { fontSize: fontSize.xl, weight: fontWeight.semibold, leading: lineHeight.normal, tracking: letterSpacing.normal },
  h6: { fontSize: fontSize.lg, weight: fontWeight.semibold, leading: lineHeight.normal, tracking: letterSpacing.normal },
  body: { fontSize: fontSize.base, weight: fontWeight.normal, leading: lineHeight.normal, tracking: letterSpacing.normal },
  bodySmall: { fontSize: fontSize.sm, weight: fontWeight.normal, leading: lineHeight.normal, tracking: letterSpacing.normal },
  caption: { fontSize: fontSize.xs, weight: fontWeight.normal, leading: lineHeight.snug, tracking: letterSpacing.wide },
  mono: { fontSize: fontSize.sm, weight: fontWeight.normal, leading: lineHeight.normal, tracking: letterSpacing.normal, family: fontFamily.mono },
} as const

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
} as const

export type TypographyTokens = typeof typography
