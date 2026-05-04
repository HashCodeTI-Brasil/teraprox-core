// @hashcodeti/ui-kit-core/brand — paths para os assets de marca Teraprox.
//
// Para uso em <img src> ou <link rel="icon">, importe via subpath:
//   import logoHorizontal from '@hashcodeti/ui-kit-core/brand/logo-horizontal.svg'
//
// O objeto abaixo expõe os mesmos paths como string para uso programático
// (ex.: gerar manifest.json, OG meta tags). Estes paths assumem que o consumer
// resolve o subpath `./brand/*` direto contra `src/brand/*` (ver `package.json`
// `exports`). Bundlers modernos (Webpack 5 / Next.js / Vite) fazem isto out-of-
// the-box para SVG via asset modules.
//
// IMPORTANTE: os SVGs atuais são PLACEHOLDERS. Ver `README.md` neste diretório
// para o procedimento de substituição quando o user fornecer brand assets.

export const BRAND_ASSET_PATHS = {
  logoHorizontal: 'logo-horizontal.svg',
  logoMark: 'logo-mark.svg',
  logoMonoLight: 'logo-mono-light.svg',
  logoMonoDark: 'logo-mono-dark.svg',
  favicon: 'favicon.svg',
  ogImage: 'og-image.svg',
} as const

export type BrandAssetKey = keyof typeof BRAND_ASSET_PATHS
