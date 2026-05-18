// @hashcodeti/design-tokens — barrel
//
// Importar de:
//   import { tokens } from '@hashcodeti/design-tokens'
//   import { colors, spacing } from '@hashcodeti/design-tokens'
//
// Ver também: @hashcodeti/tailwind-preset (mapeia estes tokens para Tailwind theme).

export { colors } from './colors'
export type { ColorTokens } from './colors'

export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  typography,
} from './typography'
export type { TypographyTokens } from './typography'

export { spacing, spacingRem } from './spacing'
export type { SpacingTokens, SpacingKey } from './spacing'

export { radii } from './radii'
export type { RadiiTokens, RadiiKey } from './radii'

export { shadows } from './shadows'
export type { ShadowTokens, ShadowKey } from './shadows'

export { breakpoints, breakpointsPx } from './breakpoints'
export type { BreakpointTokens, BreakpointKey } from './breakpoints'

import { colors } from './colors'
import { typography } from './typography'
import { spacing, spacingRem } from './spacing'
import { radii } from './radii'
import { shadows } from './shadows'
import { breakpoints, breakpointsPx } from './breakpoints'

// Aggregator — facilita consumo único: `import { tokens } from '...'`
export const tokens = {
  colors,
  typography,
  spacing,
  spacingRem,
  radii,
  shadows,
  breakpoints,
  breakpointsPx,
} as const

export type Tokens = typeof tokens
