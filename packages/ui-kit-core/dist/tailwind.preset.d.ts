type TailwindThemeExtend = Record<string, unknown>;
type TailwindPreset = {
    theme: {
        screens: Record<string, string>;
        extend: TailwindThemeExtend;
    };
    [key: string]: unknown;
};
declare const tailwindColors: {
    brand: {
        DEFAULT: "#2563eb";
        primary: "#2563eb";
        'primary-hover': "#1d4ed8";
        'primary-active': "#1e40af";
        'primary-muted': "#dbeafe";
        'primary-foreground': "#ffffff";
        accent: "#3b82f6";
    };
    success: {
        DEFAULT: "#22c55e";
        muted: "#dcfce7";
        foreground: "#14532d";
    };
    warning: {
        DEFAULT: "#f97316";
        muted: "#ffedd5";
        foreground: "#7c2d12";
    };
    error: {
        DEFAULT: "#ef4444";
        hover: "#dc2626";
        muted: "#fee2e2";
        foreground: "#7f1d1d";
    };
    info: {
        DEFAULT: "#3b82f6";
        muted: "#dbeafe";
        foreground: "#1e3a8a";
    };
    neutral: {
        0: "#ffffff";
        50: "#f8fafc";
        100: "#f1f5f9";
        200: "#e2e8f0";
        300: "#cbd5e1";
        400: "#94a3b8";
        500: "#64748b";
        600: "#475569";
        700: "#334155";
        800: "#1e293b";
        900: "#0f172a";
        950: "#020617";
        1000: "#000000";
    };
    surface: {
        DEFAULT: "#ffffff";
        background: "#ffffff";
        foreground: "#0f172a";
        muted: "#f8fafc";
        'muted-foreground': "#64748b";
        subtle: "#f1f5f9";
        border: "#e2e8f0";
        'border-strong': "#cbd5e1";
        ring: "#3b82f6";
        overlay: "rgba(15, 23, 42, 0.6)";
    };
};
declare const tailwindFontFamily: Record<string, string[]>;
declare const tailwindFontSize: Record<string, [string, {
    lineHeight: string;
}]>;
declare const tailwindFontWeight: Record<string, string>;
declare const tailwindSpacing: Record<string, string>;
declare const tailwindBorderRadius: Record<string, string>;
declare const tailwindBoxShadow: Record<string, string>;
declare const preset: TailwindPreset;

export { type TailwindPreset, preset as default, tailwindBorderRadius, tailwindBoxShadow, tailwindColors, tailwindFontFamily, tailwindFontSize, tailwindFontWeight, tailwindSpacing };
