// @agent-touched: 2026-05-20
/**
 * Tailwind config — teraprox-core (host).
 *
 * Adicionado 2026-05-20 para resolver renderização sem estilo dos primitivos
 * @hashcodeti/ui-kit-core/sgp/sgm carregados via Module Federation (Modal,
 * Button, Tabs, PresetSaveModal etc). O comentário no bootstrap.js sempre
 * afirmou que o host aplicava o preset, mas a config nunca existiu — só foi
 * percebido quando o modal Salvar Visualização apareceu sem styles pelo core.
 *
 * IMPORTANTE — preflight DESABILITADO:
 *   - Bootstrap CSS é a baseline visual do host (App.js usa muitos componentes
 *     react-bootstrap). Habilitar preflight zera margens/padding que ele espera.
 *   - Tailwind utilities aplicam-se case-by-case nos primitivos novos. As classes
 *     geradas em runtime pelos cva dos primitivos são detectadas via JIT scan
 *     dos dists em node_modules (ver content abaixo).
 *
 * Tema/paleta vêm do @hashcodeti/tailwind-preset (fonte única, mesmo preset que
 * SGP-caderno + futuros MFs Tailwind-first usam).
 */
const teraproxPreset = require('@hashcodeti/tailwind-preset').default
  ?? require('@hashcodeti/tailwind-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [teraproxPreset],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    // JIT precisa scannear o JS compilado dos primitivos para gerar as classes
    // (Tailwind não infere runtime classes geradas por cva).
    './node_modules/@hashcodeti/ui-kit-core/dist/**/*.{js,mjs}',
    './node_modules/@hashcodeti/ui-kit-sgm/dist/**/*.{js,mjs}',
    './node_modules/@hashcodeti/ui-kit-sgp/dist/**/*.{js,mjs}',
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
};
