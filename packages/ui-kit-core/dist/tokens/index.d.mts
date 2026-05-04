declare const colors: {
    readonly brand: {
        readonly primary: "#2563eb";
        readonly primaryHover: "#1d4ed8";
        readonly primaryActive: "#1e40af";
        readonly primaryMuted: "#dbeafe";
        readonly primaryForeground: "#ffffff";
        readonly accent: "#3b82f6";
    };
    readonly semantic: {
        readonly success: "#22c55e";
        readonly successMuted: "#dcfce7";
        readonly successForeground: "#14532d";
        readonly warning: "#f97316";
        readonly warningMuted: "#ffedd5";
        readonly warningForeground: "#7c2d12";
        readonly error: "#ef4444";
        readonly errorHover: "#dc2626";
        readonly errorMuted: "#fee2e2";
        readonly errorForeground: "#7f1d1d";
        readonly info: "#3b82f6";
        readonly infoMuted: "#dbeafe";
        readonly infoForeground: "#1e3a8a";
    };
    readonly neutral: {
        readonly 0: "#ffffff";
        readonly 50: "#f8fafc";
        readonly 100: "#f1f5f9";
        readonly 200: "#e2e8f0";
        readonly 300: "#cbd5e1";
        readonly 400: "#94a3b8";
        readonly 500: "#64748b";
        readonly 600: "#475569";
        readonly 700: "#334155";
        readonly 800: "#1e293b";
        readonly 900: "#0f172a";
        readonly 950: "#020617";
        readonly 1000: "#000000";
    };
    readonly surface: {
        readonly background: "#ffffff";
        readonly foreground: "#0f172a";
        readonly muted: "#f8fafc";
        readonly mutedForeground: "#64748b";
        readonly subtle: "#f1f5f9";
        readonly border: "#e2e8f0";
        readonly borderStrong: "#cbd5e1";
        readonly ring: "#3b82f6";
        readonly overlay: "rgba(15, 23, 42, 0.6)";
    };
};
type ColorTokens = typeof colors;

declare const fontFamily: {
    readonly sans: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
    readonly display: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
    readonly serif: "Georgia, Cambria, \"Times New Roman\", Times, serif";
    readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";
};
declare const fontSize: {
    readonly '2xs': readonly ["0.625rem", "0.875rem"];
    readonly xs: readonly ["0.75rem", "1rem"];
    readonly sm: readonly ["0.875rem", "1.25rem"];
    readonly base: readonly ["1rem", "1.5rem"];
    readonly md: readonly ["1rem", "1.5rem"];
    readonly lg: readonly ["1.125rem", "1.75rem"];
    readonly xl: readonly ["1.25rem", "1.75rem"];
    readonly '2xl': readonly ["1.5rem", "2rem"];
    readonly '3xl': readonly ["1.875rem", "2.25rem"];
    readonly '4xl': readonly ["2.25rem", "2.5rem"];
    readonly '5xl': readonly ["3rem", "1"];
    readonly '6xl': readonly ["3.75rem", "1"];
    readonly '7xl': readonly ["4.5rem", "1"];
};
declare const fontWeight: {
    readonly thin: "100";
    readonly extralight: "200";
    readonly light: "300";
    readonly normal: "400";
    readonly medium: "500";
    readonly semibold: "600";
    readonly bold: "700";
    readonly extrabold: "800";
    readonly black: "900";
};
declare const lineHeight: {
    readonly none: "1";
    readonly tight: "1.15";
    readonly snug: "1.25";
    readonly normal: "1.5";
    readonly relaxed: "1.625";
    readonly loose: "2";
};
declare const letterSpacing: {
    readonly tighter: "-0.05em";
    readonly tight: "-0.025em";
    readonly normal: "0";
    readonly wide: "0.025em";
    readonly wider: "0.05em";
    readonly widest: "0.1em";
};
declare const textStyles: {
    readonly display: {
        readonly fontSize: readonly ["3.75rem", "1"];
        readonly weight: "700";
        readonly leading: "1.15";
        readonly tracking: "-0.025em";
    };
    readonly h1: {
        readonly fontSize: readonly ["3rem", "1"];
        readonly weight: "700";
        readonly leading: "1.15";
        readonly tracking: "-0.025em";
    };
    readonly h2: {
        readonly fontSize: readonly ["2.25rem", "2.5rem"];
        readonly weight: "700";
        readonly leading: "1.25";
        readonly tracking: "-0.025em";
    };
    readonly h3: {
        readonly fontSize: readonly ["1.875rem", "2.25rem"];
        readonly weight: "600";
        readonly leading: "1.25";
        readonly tracking: "0";
    };
    readonly h4: {
        readonly fontSize: readonly ["1.5rem", "2rem"];
        readonly weight: "600";
        readonly leading: "1.25";
        readonly tracking: "0";
    };
    readonly h5: {
        readonly fontSize: readonly ["1.25rem", "1.75rem"];
        readonly weight: "600";
        readonly leading: "1.5";
        readonly tracking: "0";
    };
    readonly h6: {
        readonly fontSize: readonly ["1.125rem", "1.75rem"];
        readonly weight: "600";
        readonly leading: "1.5";
        readonly tracking: "0";
    };
    readonly body: {
        readonly fontSize: readonly ["1rem", "1.5rem"];
        readonly weight: "400";
        readonly leading: "1.5";
        readonly tracking: "0";
    };
    readonly bodySmall: {
        readonly fontSize: readonly ["0.875rem", "1.25rem"];
        readonly weight: "400";
        readonly leading: "1.5";
        readonly tracking: "0";
    };
    readonly caption: {
        readonly fontSize: readonly ["0.75rem", "1rem"];
        readonly weight: "400";
        readonly leading: "1.25";
        readonly tracking: "0.025em";
    };
    readonly mono: {
        readonly fontSize: readonly ["0.875rem", "1.25rem"];
        readonly weight: "400";
        readonly leading: "1.5";
        readonly tracking: "0";
        readonly family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";
    };
};
declare const typography: {
    readonly fontFamily: {
        readonly sans: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
        readonly display: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
        readonly serif: "Georgia, Cambria, \"Times New Roman\", Times, serif";
        readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";
    };
    readonly fontSize: {
        readonly '2xs': readonly ["0.625rem", "0.875rem"];
        readonly xs: readonly ["0.75rem", "1rem"];
        readonly sm: readonly ["0.875rem", "1.25rem"];
        readonly base: readonly ["1rem", "1.5rem"];
        readonly md: readonly ["1rem", "1.5rem"];
        readonly lg: readonly ["1.125rem", "1.75rem"];
        readonly xl: readonly ["1.25rem", "1.75rem"];
        readonly '2xl': readonly ["1.5rem", "2rem"];
        readonly '3xl': readonly ["1.875rem", "2.25rem"];
        readonly '4xl': readonly ["2.25rem", "2.5rem"];
        readonly '5xl': readonly ["3rem", "1"];
        readonly '6xl': readonly ["3.75rem", "1"];
        readonly '7xl': readonly ["4.5rem", "1"];
    };
    readonly fontWeight: {
        readonly thin: "100";
        readonly extralight: "200";
        readonly light: "300";
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
        readonly extrabold: "800";
        readonly black: "900";
    };
    readonly lineHeight: {
        readonly none: "1";
        readonly tight: "1.15";
        readonly snug: "1.25";
        readonly normal: "1.5";
        readonly relaxed: "1.625";
        readonly loose: "2";
    };
    readonly letterSpacing: {
        readonly tighter: "-0.05em";
        readonly tight: "-0.025em";
        readonly normal: "0";
        readonly wide: "0.025em";
        readonly wider: "0.05em";
        readonly widest: "0.1em";
    };
    readonly textStyles: {
        readonly display: {
            readonly fontSize: readonly ["3.75rem", "1"];
            readonly weight: "700";
            readonly leading: "1.15";
            readonly tracking: "-0.025em";
        };
        readonly h1: {
            readonly fontSize: readonly ["3rem", "1"];
            readonly weight: "700";
            readonly leading: "1.15";
            readonly tracking: "-0.025em";
        };
        readonly h2: {
            readonly fontSize: readonly ["2.25rem", "2.5rem"];
            readonly weight: "700";
            readonly leading: "1.25";
            readonly tracking: "-0.025em";
        };
        readonly h3: {
            readonly fontSize: readonly ["1.875rem", "2.25rem"];
            readonly weight: "600";
            readonly leading: "1.25";
            readonly tracking: "0";
        };
        readonly h4: {
            readonly fontSize: readonly ["1.5rem", "2rem"];
            readonly weight: "600";
            readonly leading: "1.25";
            readonly tracking: "0";
        };
        readonly h5: {
            readonly fontSize: readonly ["1.25rem", "1.75rem"];
            readonly weight: "600";
            readonly leading: "1.5";
            readonly tracking: "0";
        };
        readonly h6: {
            readonly fontSize: readonly ["1.125rem", "1.75rem"];
            readonly weight: "600";
            readonly leading: "1.5";
            readonly tracking: "0";
        };
        readonly body: {
            readonly fontSize: readonly ["1rem", "1.5rem"];
            readonly weight: "400";
            readonly leading: "1.5";
            readonly tracking: "0";
        };
        readonly bodySmall: {
            readonly fontSize: readonly ["0.875rem", "1.25rem"];
            readonly weight: "400";
            readonly leading: "1.5";
            readonly tracking: "0";
        };
        readonly caption: {
            readonly fontSize: readonly ["0.75rem", "1rem"];
            readonly weight: "400";
            readonly leading: "1.25";
            readonly tracking: "0.025em";
        };
        readonly mono: {
            readonly fontSize: readonly ["0.875rem", "1.25rem"];
            readonly weight: "400";
            readonly leading: "1.5";
            readonly tracking: "0";
            readonly family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";
        };
    };
};
type TypographyTokens = typeof typography;

declare const spacing: {
    readonly 0: {
        px: string;
        rem: string;
    };
    readonly px: {
        readonly px: "1px";
        readonly rem: "1px";
    };
    readonly 0.5: {
        px: string;
        rem: string;
    };
    readonly 1: {
        px: string;
        rem: string;
    };
    readonly 1.5: {
        px: string;
        rem: string;
    };
    readonly 2: {
        px: string;
        rem: string;
    };
    readonly 3: {
        px: string;
        rem: string;
    };
    readonly 4: {
        px: string;
        rem: string;
    };
    readonly 5: {
        px: string;
        rem: string;
    };
    readonly 6: {
        px: string;
        rem: string;
    };
    readonly 8: {
        px: string;
        rem: string;
    };
    readonly 10: {
        px: string;
        rem: string;
    };
    readonly 12: {
        px: string;
        rem: string;
    };
    readonly 16: {
        px: string;
        rem: string;
    };
    readonly 20: {
        px: string;
        rem: string;
    };
    readonly 24: {
        px: string;
        rem: string;
    };
    readonly 32: {
        px: string;
        rem: string;
    };
    readonly 40: {
        px: string;
        rem: string;
    };
    readonly 48: {
        px: string;
        rem: string;
    };
    readonly 64: {
        px: string;
        rem: string;
    };
    readonly 80: {
        px: string;
        rem: string;
    };
    readonly 96: {
        px: string;
        rem: string;
    };
};
type SpacingTokens = typeof spacing;
type SpacingKey = keyof typeof spacing;
declare const spacingRem: Record<SpacingKey, string>;

declare const radii: {
    readonly none: "0px";
    readonly xs: "2px";
    readonly sm: "4px";
    readonly md: "6px";
    readonly lg: "8px";
    readonly xl: "12px";
    readonly '2xl': "16px";
    readonly '3xl': "24px";
    readonly full: "9999px";
};
type RadiiTokens = typeof radii;
type RadiiKey = keyof typeof radii;

declare const shadows: {
    readonly none: "none";
    readonly sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
    readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    readonly '2xl': "0 25px 50px -12px rgb(0 0 0 / 0.25)";
    readonly inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)";
};
type ShadowTokens = typeof shadows;
type ShadowKey = keyof typeof shadows;

declare const breakpoints: {
    readonly sm: 640;
    readonly md: 768;
    readonly lg: 1024;
    readonly xl: 1280;
    readonly '2xl': 1536;
};
type BreakpointTokens = typeof breakpoints;
type BreakpointKey = keyof typeof breakpoints;
declare const breakpointsPx: Record<BreakpointKey, string>;

declare const tokens: {
    readonly colors: {
        readonly brand: {
            readonly primary: "#2563eb";
            readonly primaryHover: "#1d4ed8";
            readonly primaryActive: "#1e40af";
            readonly primaryMuted: "#dbeafe";
            readonly primaryForeground: "#ffffff";
            readonly accent: "#3b82f6";
        };
        readonly semantic: {
            readonly success: "#22c55e";
            readonly successMuted: "#dcfce7";
            readonly successForeground: "#14532d";
            readonly warning: "#f97316";
            readonly warningMuted: "#ffedd5";
            readonly warningForeground: "#7c2d12";
            readonly error: "#ef4444";
            readonly errorHover: "#dc2626";
            readonly errorMuted: "#fee2e2";
            readonly errorForeground: "#7f1d1d";
            readonly info: "#3b82f6";
            readonly infoMuted: "#dbeafe";
            readonly infoForeground: "#1e3a8a";
        };
        readonly neutral: {
            readonly 0: "#ffffff";
            readonly 50: "#f8fafc";
            readonly 100: "#f1f5f9";
            readonly 200: "#e2e8f0";
            readonly 300: "#cbd5e1";
            readonly 400: "#94a3b8";
            readonly 500: "#64748b";
            readonly 600: "#475569";
            readonly 700: "#334155";
            readonly 800: "#1e293b";
            readonly 900: "#0f172a";
            readonly 950: "#020617";
            readonly 1000: "#000000";
        };
        readonly surface: {
            readonly background: "#ffffff";
            readonly foreground: "#0f172a";
            readonly muted: "#f8fafc";
            readonly mutedForeground: "#64748b";
            readonly subtle: "#f1f5f9";
            readonly border: "#e2e8f0";
            readonly borderStrong: "#cbd5e1";
            readonly ring: "#3b82f6";
            readonly overlay: "rgba(15, 23, 42, 0.6)";
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
            readonly display: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
            readonly serif: "Georgia, Cambria, \"Times New Roman\", Times, serif";
            readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";
        };
        readonly fontSize: {
            readonly '2xs': readonly ["0.625rem", "0.875rem"];
            readonly xs: readonly ["0.75rem", "1rem"];
            readonly sm: readonly ["0.875rem", "1.25rem"];
            readonly base: readonly ["1rem", "1.5rem"];
            readonly md: readonly ["1rem", "1.5rem"];
            readonly lg: readonly ["1.125rem", "1.75rem"];
            readonly xl: readonly ["1.25rem", "1.75rem"];
            readonly '2xl': readonly ["1.5rem", "2rem"];
            readonly '3xl': readonly ["1.875rem", "2.25rem"];
            readonly '4xl': readonly ["2.25rem", "2.5rem"];
            readonly '5xl': readonly ["3rem", "1"];
            readonly '6xl': readonly ["3.75rem", "1"];
            readonly '7xl': readonly ["4.5rem", "1"];
        };
        readonly fontWeight: {
            readonly thin: "100";
            readonly extralight: "200";
            readonly light: "300";
            readonly normal: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
            readonly extrabold: "800";
            readonly black: "900";
        };
        readonly lineHeight: {
            readonly none: "1";
            readonly tight: "1.15";
            readonly snug: "1.25";
            readonly normal: "1.5";
            readonly relaxed: "1.625";
            readonly loose: "2";
        };
        readonly letterSpacing: {
            readonly tighter: "-0.05em";
            readonly tight: "-0.025em";
            readonly normal: "0";
            readonly wide: "0.025em";
            readonly wider: "0.05em";
            readonly widest: "0.1em";
        };
        readonly textStyles: {
            readonly display: {
                readonly fontSize: readonly ["3.75rem", "1"];
                readonly weight: "700";
                readonly leading: "1.15";
                readonly tracking: "-0.025em";
            };
            readonly h1: {
                readonly fontSize: readonly ["3rem", "1"];
                readonly weight: "700";
                readonly leading: "1.15";
                readonly tracking: "-0.025em";
            };
            readonly h2: {
                readonly fontSize: readonly ["2.25rem", "2.5rem"];
                readonly weight: "700";
                readonly leading: "1.25";
                readonly tracking: "-0.025em";
            };
            readonly h3: {
                readonly fontSize: readonly ["1.875rem", "2.25rem"];
                readonly weight: "600";
                readonly leading: "1.25";
                readonly tracking: "0";
            };
            readonly h4: {
                readonly fontSize: readonly ["1.5rem", "2rem"];
                readonly weight: "600";
                readonly leading: "1.25";
                readonly tracking: "0";
            };
            readonly h5: {
                readonly fontSize: readonly ["1.25rem", "1.75rem"];
                readonly weight: "600";
                readonly leading: "1.5";
                readonly tracking: "0";
            };
            readonly h6: {
                readonly fontSize: readonly ["1.125rem", "1.75rem"];
                readonly weight: "600";
                readonly leading: "1.5";
                readonly tracking: "0";
            };
            readonly body: {
                readonly fontSize: readonly ["1rem", "1.5rem"];
                readonly weight: "400";
                readonly leading: "1.5";
                readonly tracking: "0";
            };
            readonly bodySmall: {
                readonly fontSize: readonly ["0.875rem", "1.25rem"];
                readonly weight: "400";
                readonly leading: "1.5";
                readonly tracking: "0";
            };
            readonly caption: {
                readonly fontSize: readonly ["0.75rem", "1rem"];
                readonly weight: "400";
                readonly leading: "1.25";
                readonly tracking: "0.025em";
            };
            readonly mono: {
                readonly fontSize: readonly ["0.875rem", "1.25rem"];
                readonly weight: "400";
                readonly leading: "1.5";
                readonly tracking: "0";
                readonly family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";
            };
        };
    };
    readonly spacing: {
        readonly 0: {
            px: string;
            rem: string;
        };
        readonly px: {
            readonly px: "1px";
            readonly rem: "1px";
        };
        readonly 0.5: {
            px: string;
            rem: string;
        };
        readonly 1: {
            px: string;
            rem: string;
        };
        readonly 1.5: {
            px: string;
            rem: string;
        };
        readonly 2: {
            px: string;
            rem: string;
        };
        readonly 3: {
            px: string;
            rem: string;
        };
        readonly 4: {
            px: string;
            rem: string;
        };
        readonly 5: {
            px: string;
            rem: string;
        };
        readonly 6: {
            px: string;
            rem: string;
        };
        readonly 8: {
            px: string;
            rem: string;
        };
        readonly 10: {
            px: string;
            rem: string;
        };
        readonly 12: {
            px: string;
            rem: string;
        };
        readonly 16: {
            px: string;
            rem: string;
        };
        readonly 20: {
            px: string;
            rem: string;
        };
        readonly 24: {
            px: string;
            rem: string;
        };
        readonly 32: {
            px: string;
            rem: string;
        };
        readonly 40: {
            px: string;
            rem: string;
        };
        readonly 48: {
            px: string;
            rem: string;
        };
        readonly 64: {
            px: string;
            rem: string;
        };
        readonly 80: {
            px: string;
            rem: string;
        };
        readonly 96: {
            px: string;
            rem: string;
        };
    };
    readonly spacingRem: Record<0 | 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96 | "px" | 0.5 | 1 | 1.5 | 3 | 5 | 10, string>;
    readonly radii: {
        readonly none: "0px";
        readonly xs: "2px";
        readonly sm: "4px";
        readonly md: "6px";
        readonly lg: "8px";
        readonly xl: "12px";
        readonly '2xl': "16px";
        readonly '3xl': "24px";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly none: "none";
        readonly sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
        readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
        readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
        readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
        readonly '2xl': "0 25px 50px -12px rgb(0 0 0 / 0.25)";
        readonly inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)";
    };
    readonly breakpoints: {
        readonly sm: 640;
        readonly md: 768;
        readonly lg: 1024;
        readonly xl: 1280;
        readonly '2xl': 1536;
    };
    readonly breakpointsPx: Record<"2xl" | "sm" | "md" | "lg" | "xl", string>;
};
type Tokens = typeof tokens;

export { type BreakpointKey, type BreakpointTokens, type ColorTokens, type RadiiKey, type RadiiTokens, type ShadowKey, type ShadowTokens, type SpacingKey, type SpacingTokens, type Tokens, type TypographyTokens, breakpoints, breakpointsPx, colors, fontFamily, fontSize, fontWeight, letterSpacing, lineHeight, radii, shadows, spacing, spacingRem, textStyles, tokens, typography };
