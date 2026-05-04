# Brand Assets — `@hashcodeti/ui-kit-core/brand`

Assets visuais oficiais do Teraprox. **Hoje contém placeholders.**

## Estado atual (Sprint 1, web-client-site-teraprox, 2026-05-02)

Todos os SVGs neste diretório são **placeholders** criados na tarefa EX1-A. Cada
arquivo tem um cabeçalho `TODO(brand-assets)` indicando que precisa ser
substituído pelo asset oficial quando o user fornecer.

| Arquivo | Uso | ViewBox |
|---|---|---|
| `logo-horizontal.svg` | Logo padrão para navbar / footer | 240x56 |
| `logo-mark.svg` | Símbolo quadrado (app icon, avatar empresa) | 64x64 |
| `logo-mono-light.svg` | Mono para fundos claros (impressos, PDF) | 240x56 |
| `logo-mono-dark.svg` | Mono para fundos escuros (e-mails dark, hero) | 240x56 |
| `favicon.svg` | Favicon (browser tab) | 32x32 |
| `og-image.svg` | Imagem Open Graph (compartilhamento social) | 1200x630 |

## Como consumir

```ts
// via subpath import (Webpack/Next.js/Vite resolvem SVG como asset module)
import logoHorizontal from '@hashcodeti/ui-kit-core/brand/logo-horizontal.svg'

// ou paths programáticos (gera manifest.json, OG meta tags, etc.)
import { BRAND_ASSET_PATHS } from '@hashcodeti/ui-kit-core/brand'
```

## Como substituir os placeholders

1. User fornece pacote oficial (Figma export ou ZIP com SVGs).
2. Substituir cada arquivo `*.svg` neste diretório mantendo o mesmo nome e o
   mesmo `viewBox` (ou ajustar todos os consumidores se mudar proporção).
3. Para `og-image.svg`, gerar também versão PNG/JPEG (1200x630) — vários
   clientes de e-mail e crawlers sociais não renderizam SVG no preview.
4. Atualizar `BRAND_ASSET_PATHS` em `index.ts` se algum nome de arquivo mudar.
5. Bumpar `version` em `package.json` (minor) e publicar.
6. Documentar a entrega em `wiki/arquitetura/ui-kit-core-brand-assets.md` (criar)
   e referenciar o decision-log da sprint que originou o pedido.

## Pendências pós-substituição

- Variantes em PNG `@1x/@2x/@3x` para mobile (Flutter `teraprox-mbudy` ainda
  consome PNG via `lib/widgets/teraprox_logo.dart`).
- Manifest icons (192/512) para PWA do `web-client`.
- Favicon `.ico` legado para browsers antigos.
