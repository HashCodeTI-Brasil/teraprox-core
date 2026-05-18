import { defineConfig } from 'tsup'

// Design tokens — TS puro, sem React/DOM. Único entrypoint.
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: false,
})
