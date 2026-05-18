import { defineConfig } from 'tsup'

// Tailwind preset — TS puro consumido por tailwind.config.{js,ts} de apps e MFs.
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: false,
  // design-tokens é resolvido como file: no monorepo; mantém como dep externa
  // no bundle final (consumidor já tem o pacote linkado).
  external: ['@hashcodeti/design-tokens'],
})
