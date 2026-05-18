import type { Config } from 'tailwindcss'
import teraproxPreset from '@hashcodeti/tailwind-preset'

const config: Config = {
  presets: [teraproxPreset as Partial<Config>],
  content: [
    './.storybook/**/*.{ts,tsx,js,jsx,mdx}',
    './src/**/*.{ts,tsx,js,jsx,mdx}',
    // JIT precisa scannear o JS compilado do ui-kit-core para gerar as classes
    // usadas dentro dos componentes (Wave 1 — Tailwind ainda não cobre 100% dos
    // primitivos; é uma rede de segurança até Fase 2).
    '../ui-kit-core/dist/**/*.{js,mjs}',
  ],
  darkMode: 'class',
}

export default config
