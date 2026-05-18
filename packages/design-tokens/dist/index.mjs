// src/colors.ts
var colors = {
  brand: {
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryActive: "#1e40af",
    primaryMuted: "#dbeafe",
    primaryForeground: "#ffffff",
    accent: "#3b82f6"
  },
  semantic: {
    success: "#22c55e",
    successMuted: "#dcfce7",
    successForeground: "#14532d",
    warning: "#f97316",
    warningMuted: "#ffedd5",
    warningForeground: "#7c2d12",
    error: "#ef4444",
    errorHover: "#dc2626",
    errorMuted: "#fee2e2",
    errorForeground: "#7f1d1d",
    info: "#3b82f6",
    infoMuted: "#dbeafe",
    infoForeground: "#1e3a8a"
  },
  // Escala neutra — slate Tailwind. Cobre todos os hex avulsos encontrados nos
  // componentes legacy (#0f172a..#f8fafc).
  neutral: {
    0: "#ffffff",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
    1e3: "#000000"
  },
  // Tokens semânticos de superfície — referem-se a roles, não a cores cruas.
  // O dark mode (segunda onda) sobrescreverá estes valores via CSS vars.
  surface: {
    background: "#ffffff",
    foreground: "#0f172a",
    muted: "#f8fafc",
    mutedForeground: "#64748b",
    subtle: "#f1f5f9",
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    ring: "#3b82f6",
    overlay: "rgba(15, 23, 42, 0.6)"
  }
};

// src/typography.ts
var SYSTEM_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
var SYSTEM_MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
var fontFamily = {
  // TODO(brand): substituir por ['Inter', ...SYSTEM_SANS] ou ['Geist', ...SYSTEM_SANS]
  // quando user fornecer fonte oficial Teraprox.
  sans: SYSTEM_SANS,
  // TODO(brand): substituir por ['Geist', ...SYSTEM_SANS] para títulos display.
  display: SYSTEM_SANS,
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: SYSTEM_MONO
};
var fontSize = {
  "2xs": ["0.625rem", "0.875rem"],
  // 10/14
  xs: ["0.75rem", "1rem"],
  // 12/16
  sm: ["0.875rem", "1.25rem"],
  // 14/20
  base: ["1rem", "1.5rem"],
  // 16/24
  md: ["1rem", "1.5rem"],
  // alias de base
  lg: ["1.125rem", "1.75rem"],
  // 18/28
  xl: ["1.25rem", "1.75rem"],
  // 20/28
  "2xl": ["1.5rem", "2rem"],
  // 24/32
  "3xl": ["1.875rem", "2.25rem"],
  // 30/36
  "4xl": ["2.25rem", "2.5rem"],
  // 36/40
  "5xl": ["3rem", "1"],
  // 48/—
  "6xl": ["3.75rem", "1"],
  // 60/—
  "7xl": ["4.5rem", "1"]
  // 72/—
};
var fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
};
var lineHeight = {
  none: "1",
  tight: "1.15",
  snug: "1.25",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
var letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};
var textStyles = {
  display: { fontSize: fontSize["6xl"], weight: fontWeight.bold, leading: lineHeight.tight, tracking: letterSpacing.tight },
  h1: { fontSize: fontSize["5xl"], weight: fontWeight.bold, leading: lineHeight.tight, tracking: letterSpacing.tight },
  h2: { fontSize: fontSize["4xl"], weight: fontWeight.bold, leading: lineHeight.snug, tracking: letterSpacing.tight },
  h3: { fontSize: fontSize["3xl"], weight: fontWeight.semibold, leading: lineHeight.snug, tracking: letterSpacing.normal },
  h4: { fontSize: fontSize["2xl"], weight: fontWeight.semibold, leading: lineHeight.snug, tracking: letterSpacing.normal },
  h5: { fontSize: fontSize.xl, weight: fontWeight.semibold, leading: lineHeight.normal, tracking: letterSpacing.normal },
  h6: { fontSize: fontSize.lg, weight: fontWeight.semibold, leading: lineHeight.normal, tracking: letterSpacing.normal },
  body: { fontSize: fontSize.base, weight: fontWeight.normal, leading: lineHeight.normal, tracking: letterSpacing.normal },
  bodySmall: { fontSize: fontSize.sm, weight: fontWeight.normal, leading: lineHeight.normal, tracking: letterSpacing.normal },
  caption: { fontSize: fontSize.xs, weight: fontWeight.normal, leading: lineHeight.snug, tracking: letterSpacing.wide },
  mono: { fontSize: fontSize.sm, weight: fontWeight.normal, leading: lineHeight.normal, tracking: letterSpacing.normal, family: fontFamily.mono }
};
var typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles
};

// src/spacing.ts
var toRem = (px) => `${px / 16}rem`;
var entry = (px) => ({ px: `${px}px`, rem: toRem(px) });
var spacing = {
  0: entry(0),
  px: { px: "1px", rem: "1px" },
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
  96: entry(384)
};
var spacingRem = Object.fromEntries(
  Object.entries(spacing).map(([k, v]) => [k, v.rem])
);

// src/radii.ts
var radii = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px"
};

// src/shadows.ts
var shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
};

// src/breakpoints.ts
var breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};
var breakpointsPx = Object.fromEntries(
  Object.entries(breakpoints).map(([k, v]) => [k, `${v}px`])
);

// src/index.ts
var tokens = {
  colors,
  typography,
  spacing,
  spacingRem,
  radii,
  shadows,
  breakpoints,
  breakpointsPx
};
export {
  breakpoints,
  breakpointsPx,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  radii,
  shadows,
  spacing,
  spacingRem,
  textStyles,
  tokens,
  typography
};
