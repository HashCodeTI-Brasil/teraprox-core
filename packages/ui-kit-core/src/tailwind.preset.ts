// @hashcodeti/ui-kit-core/tailwind-preset
//
// Preset Tailwind consumível por qualquer MF/site Teraprox.
//
// Uso (web-client, ui-kit-sgu, etc.):
//   // tailwind.config.ts
//   import preset from '@hashcodeti/ui-kit-core/tailwind-preset'
//   export default { presets: [preset], content: [...] }
//
// Mantenha este arquivo como ÚNICO ponto que mapeia design tokens (TS) → Tailwind.
// Sites e MFs NÃO devem duplicar paleta, spacing ou breakpoints.

import { colors } from './tokens/colors'
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from './tokens/typography'
import { spacingRem } from './tokens/spacing'
import { radii } from './tokens/radii'
import { shadows } from './tokens/shadows'
import { breakpointsPx } from './tokens/breakpoints'

// Tipagem estrutural mínima — não dependemos de `tailwindcss` em runtime; o
// consumidor faz cast para `Config` do tailwindcss se quiser tipagem completa.
type TailwindThemeExtend = Record<string, unknown>
type TailwindPreset = {
  theme: {
    screens: Record<string, string>
    extend: TailwindThemeExtend
  }
  [key: string]: unknown
}

// --- Color flattening ----------------------------------------------------
// Tailwind aceita objetos aninhados: `theme.colors.brand.primary` => `bg-brand-primary`.
// Mapeamos os tokens diretamente, com aliases extras para ergonomia.

const tailwindColors = {
  // Brand
  brand: {
    DEFAULT: colors.brand.primary,
    primary: colors.brand.primary,
    'primary-hover': colors.brand.primaryHover,
    'primary-active': colors.brand.primaryActive,
    'primary-muted': colors.brand.primaryMuted,
    'primary-foreground': colors.brand.primaryForeground,
    accent: colors.brand.accent,
  },
  // Semantic — flat keys para ergonomia (`bg-success`, `text-error`, etc.)
  success: {
    DEFAULT: colors.semantic.success,
    muted: colors.semantic.successMuted,
    foreground: colors.semantic.successForeground,
  },
  warning: {
    DEFAULT: colors.semantic.warning,
    muted: colors.semantic.warningMuted,
    foreground: colors.semantic.warningForeground,
  },
  error: {
    DEFAULT: colors.semantic.error,
    hover: colors.semantic.errorHover,
    muted: colors.semantic.errorMuted,
    foreground: colors.semantic.errorForeground,
  },
  info: {
    DEFAULT: colors.semantic.info,
    muted: colors.semantic.infoMuted,
    foreground: colors.semantic.infoForeground,
  },
  // Neutral scale (Tailwind-style 50..950)
  neutral: {
    0: colors.neutral[0],
    50: colors.neutral[50],
    100: colors.neutral[100],
    200: colors.neutral[200],
    300: colors.neutral[300],
    400: colors.neutral[400],
    500: colors.neutral[500],
    600: colors.neutral[600],
    700: colors.neutral[700],
    800: colors.neutral[800],
    900: colors.neutral[900],
    950: colors.neutral[950],
    1000: colors.neutral[1000],
  },
  // Surface roles
  surface: {
    DEFAULT: colors.surface.background,
    background: colors.surface.background,
    foreground: colors.surface.foreground,
    muted: colors.surface.muted,
    'muted-foreground': colors.surface.mutedForeground,
    subtle: colors.surface.subtle,
    border: colors.surface.border,
    'border-strong': colors.surface.borderStrong,
    ring: colors.surface.ring,
    overlay: colors.surface.overlay,
  },
}

// --- Typography mapping --------------------------------------------------

const tailwindFontFamily: Record<string, string[]> = {
  sans: fontFamily.sans.split(',').map((s) => s.trim()),
  display: fontFamily.display.split(',').map((s) => s.trim()),
  serif: fontFamily.serif.split(',').map((s) => s.trim()),
  mono: fontFamily.mono.split(',').map((s) => s.trim()),
}

const tailwindFontSize: Record<string, [string, { lineHeight: string }]> =
  Object.fromEntries(
    Object.entries(fontSize).map(([k, [size, lh]]) => [k, [size, { lineHeight: lh }]])
  )

const tailwindFontWeight: Record<string, string> = { ...fontWeight }
const tailwindLineHeight: Record<string, string> = { ...lineHeight }
const tailwindLetterSpacing: Record<string, string> = { ...letterSpacing }

// --- Spacing -------------------------------------------------------------
// Já em rem (string); Tailwind aceita direto.
const tailwindSpacing: Record<string, string> = { ...spacingRem }

// --- BorderRadius / Shadows ---------------------------------------------
const tailwindBorderRadius: Record<string, string> = { ...radii }
const tailwindBoxShadow: Record<string, string> = { ...shadows }

// --- Preset --------------------------------------------------------------

const preset: TailwindPreset = {
  theme: {
    screens: { ...breakpointsPx },
    extend: {
      colors: tailwindColors,
      spacing: tailwindSpacing,
      borderRadius: tailwindBorderRadius,
      boxShadow: tailwindBoxShadow,
      fontFamily: tailwindFontFamily,
      fontSize: tailwindFontSize,
      fontWeight: tailwindFontWeight,
      lineHeight: tailwindLineHeight,
      letterSpacing: tailwindLetterSpacing,
    },
  },
}

export default preset
export {
  tailwindColors,
  tailwindFontFamily,
  tailwindFontSize,
  tailwindFontWeight,
  tailwindSpacing,
  tailwindBorderRadius,
  tailwindBoxShadow,
}
export type { TailwindPreset }
