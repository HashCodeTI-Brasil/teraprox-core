// @hashcodeti/ui-kit-core/tailwind-preset — SHIM (Fase 1 — 2026-05-11)
//
// @deprecated — Use `@hashcodeti/tailwind-preset` direto.
// Este shim será removido em ui-kit-core@3.0.0.
//
// Migração:
//   // tailwind.config.ts
//   - import preset from '@hashcodeti/ui-kit-core/tailwind-preset'  ❌ deprecated
//   + import preset from '@hashcodeti/tailwind-preset'                ✅
//
// Histórico:
//   - 2026-05-02: criado em ui-kit-core/src/tailwind.preset.ts
//   - 2026-05-11: extraído para @hashcodeti/tailwind-preset; substituído por shim

export { default } from '@hashcodeti/tailwind-preset'
export {
  tailwindColors,
  tailwindFontFamily,
  tailwindFontSize,
  tailwindFontWeight,
  tailwindSpacing,
  tailwindBorderRadius,
  tailwindBoxShadow,
} from '@hashcodeti/tailwind-preset'
export type { TailwindPreset } from '@hashcodeti/tailwind-preset'
