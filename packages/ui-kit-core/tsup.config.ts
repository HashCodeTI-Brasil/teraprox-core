import { defineConfig } from 'tsup'

// Tsup config — múltiplos entrypoints para suportar:
//   - `@hashcodeti/ui-kit-core` (default — primitivos React)
//   - `@hashcodeti/ui-kit-core/tokens` (design tokens TS — Sprint 1 fundação)
//   - `@hashcodeti/ui-kit-core/tailwind-preset` (preset Tailwind consumível)
//
// Mantemos `entry` como objeto (chave = path do output em dist/). Isso garante
// `dist/tokens/index.{js,mjs,d.ts}` e `dist/tailwind.preset.{js,mjs,d.ts}`.
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tokens/index': 'src/tokens/index.ts',
    'tailwind.preset': 'src/tailwind.preset.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: false,
  // Side-effect CSS (estilos locais dos componentes) é tratado pelo entry
  // `index.ts` que faz import dos `.css` — tsup respeita `sideEffects` do
  // package.json e copia os CSS para `dist/`.
})
