"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
  tailwindBorderRadius: () => tailwindBorderRadius,
  tailwindBoxShadow: () => tailwindBoxShadow,
  tailwindColors: () => tailwindColors,
  tailwindFontFamily: () => tailwindFontFamily,
  tailwindFontSize: () => tailwindFontSize,
  tailwindFontWeight: () => tailwindFontWeight,
  tailwindSpacing: () => tailwindSpacing
});
module.exports = __toCommonJS(src_exports);
var import_design_tokens = require("@hashcodeti/design-tokens");
var tailwindColors = {
  // Brand
  brand: {
    DEFAULT: import_design_tokens.colors.brand.primary,
    primary: import_design_tokens.colors.brand.primary,
    "primary-hover": import_design_tokens.colors.brand.primaryHover,
    "primary-active": import_design_tokens.colors.brand.primaryActive,
    "primary-muted": import_design_tokens.colors.brand.primaryMuted,
    "primary-foreground": import_design_tokens.colors.brand.primaryForeground,
    accent: import_design_tokens.colors.brand.accent
  },
  // Semantic — flat keys para ergonomia (`bg-success`, `text-error`, etc.)
  success: {
    DEFAULT: import_design_tokens.colors.semantic.success,
    muted: import_design_tokens.colors.semantic.successMuted,
    foreground: import_design_tokens.colors.semantic.successForeground
  },
  warning: {
    DEFAULT: import_design_tokens.colors.semantic.warning,
    muted: import_design_tokens.colors.semantic.warningMuted,
    foreground: import_design_tokens.colors.semantic.warningForeground
  },
  error: {
    DEFAULT: import_design_tokens.colors.semantic.error,
    hover: import_design_tokens.colors.semantic.errorHover,
    muted: import_design_tokens.colors.semantic.errorMuted,
    foreground: import_design_tokens.colors.semantic.errorForeground
  },
  info: {
    DEFAULT: import_design_tokens.colors.semantic.info,
    muted: import_design_tokens.colors.semantic.infoMuted,
    foreground: import_design_tokens.colors.semantic.infoForeground
  },
  // Neutral scale (Tailwind-style 50..950)
  neutral: {
    0: import_design_tokens.colors.neutral[0],
    50: import_design_tokens.colors.neutral[50],
    100: import_design_tokens.colors.neutral[100],
    200: import_design_tokens.colors.neutral[200],
    300: import_design_tokens.colors.neutral[300],
    400: import_design_tokens.colors.neutral[400],
    500: import_design_tokens.colors.neutral[500],
    600: import_design_tokens.colors.neutral[600],
    700: import_design_tokens.colors.neutral[700],
    800: import_design_tokens.colors.neutral[800],
    900: import_design_tokens.colors.neutral[900],
    950: import_design_tokens.colors.neutral[950],
    1e3: import_design_tokens.colors.neutral[1e3]
  },
  // Surface roles
  surface: {
    DEFAULT: import_design_tokens.colors.surface.background,
    background: import_design_tokens.colors.surface.background,
    foreground: import_design_tokens.colors.surface.foreground,
    muted: import_design_tokens.colors.surface.muted,
    "muted-foreground": import_design_tokens.colors.surface.mutedForeground,
    subtle: import_design_tokens.colors.surface.subtle,
    border: import_design_tokens.colors.surface.border,
    "border-strong": import_design_tokens.colors.surface.borderStrong,
    ring: import_design_tokens.colors.surface.ring,
    overlay: import_design_tokens.colors.surface.overlay
  }
};
var tailwindFontFamily = {
  sans: import_design_tokens.fontFamily.sans.split(",").map((s) => s.trim()),
  display: import_design_tokens.fontFamily.display.split(",").map((s) => s.trim()),
  serif: import_design_tokens.fontFamily.serif.split(",").map((s) => s.trim()),
  mono: import_design_tokens.fontFamily.mono.split(",").map((s) => s.trim())
};
var tailwindFontSize = Object.fromEntries(
  Object.entries(import_design_tokens.fontSize).map(([k, [size, lh]]) => [k, [size, { lineHeight: lh }]])
);
var tailwindFontWeight = { ...import_design_tokens.fontWeight };
var tailwindLineHeight = { ...import_design_tokens.lineHeight };
var tailwindLetterSpacing = { ...import_design_tokens.letterSpacing };
var tailwindSpacing = { ...import_design_tokens.spacingRem };
var tailwindBorderRadius = { ...import_design_tokens.radii };
var tailwindBoxShadow = { ...import_design_tokens.shadows };
var preset = {
  theme: {
    screens: { ...import_design_tokens.breakpointsPx },
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tailwindBorderRadius,
  tailwindBoxShadow,
  tailwindColors,
  tailwindFontFamily,
  tailwindFontSize,
  tailwindFontWeight,
  tailwindSpacing
});
