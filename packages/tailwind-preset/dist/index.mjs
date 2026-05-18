// src/index.ts
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacingRem,
  radii,
  shadows,
  breakpointsPx
} from "@hashcodeti/design-tokens";
var tailwindColors = {
  // Brand
  brand: {
    DEFAULT: colors.brand.primary,
    primary: colors.brand.primary,
    "primary-hover": colors.brand.primaryHover,
    "primary-active": colors.brand.primaryActive,
    "primary-muted": colors.brand.primaryMuted,
    "primary-foreground": colors.brand.primaryForeground,
    accent: colors.brand.accent
  },
  // Semantic — flat keys para ergonomia (`bg-success`, `text-error`, etc.)
  success: {
    DEFAULT: colors.semantic.success,
    muted: colors.semantic.successMuted,
    foreground: colors.semantic.successForeground
  },
  warning: {
    DEFAULT: colors.semantic.warning,
    muted: colors.semantic.warningMuted,
    foreground: colors.semantic.warningForeground
  },
  error: {
    DEFAULT: colors.semantic.error,
    hover: colors.semantic.errorHover,
    muted: colors.semantic.errorMuted,
    foreground: colors.semantic.errorForeground
  },
  info: {
    DEFAULT: colors.semantic.info,
    muted: colors.semantic.infoMuted,
    foreground: colors.semantic.infoForeground
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
    1e3: colors.neutral[1e3]
  },
  // Surface roles
  surface: {
    DEFAULT: colors.surface.background,
    background: colors.surface.background,
    foreground: colors.surface.foreground,
    muted: colors.surface.muted,
    "muted-foreground": colors.surface.mutedForeground,
    subtle: colors.surface.subtle,
    border: colors.surface.border,
    "border-strong": colors.surface.borderStrong,
    ring: colors.surface.ring,
    overlay: colors.surface.overlay
  }
};
var tailwindFontFamily = {
  sans: fontFamily.sans.split(",").map((s) => s.trim()),
  display: fontFamily.display.split(",").map((s) => s.trim()),
  serif: fontFamily.serif.split(",").map((s) => s.trim()),
  mono: fontFamily.mono.split(",").map((s) => s.trim())
};
var tailwindFontSize = Object.fromEntries(
  Object.entries(fontSize).map(([k, [size, lh]]) => [k, [size, { lineHeight: lh }]])
);
var tailwindFontWeight = { ...fontWeight };
var tailwindLineHeight = { ...lineHeight };
var tailwindLetterSpacing = { ...letterSpacing };
var tailwindSpacing = { ...spacingRem };
var tailwindBorderRadius = { ...radii };
var tailwindBoxShadow = { ...shadows };
var preset = {
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
      letterSpacing: tailwindLetterSpacing
    }
  }
};
var src_default = preset;
export {
  src_default as default,
  tailwindBorderRadius,
  tailwindBoxShadow,
  tailwindColors,
  tailwindFontFamily,
  tailwindFontSize,
  tailwindFontWeight,
  tailwindSpacing
};
