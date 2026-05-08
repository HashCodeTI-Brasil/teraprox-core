import { defineConfig } from 'tsup'

/**
 * tsup config — entry unico (`src/index.ts`). Sub-paths podem ser
 * adicionados em sprints futuras conforme demanda dos consumidores
 * (teraprox-SGU-useroles + web-client).
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: false,
  sourcemap: true,
  external: [
    'react',
    'react/jsx-runtime',
    'react-icons',
    '@hashcodeti/ui-kit-core',
    'teraprox-core-sdk',
  ],
})
