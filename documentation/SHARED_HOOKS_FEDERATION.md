# Shared Hooks — Module Federation Bidirecional

## Resumo

O core agora **expõe hooks compartilhados** via Module Federation (`./SharedHooks`).
Os apps federados (SGP, SGM) importam esses hooks do core em vez de manter cópias locais,
garantindo uma **única fonte de verdade** e eliminando bugs por divergência de implementação.

## Arquitetura

```
┌───────────────────────────────────────────────────┐
│  teraprox_core (host)                             │
│  webpack: exposes ./SharedHooks                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ src/hooks/SharedHooks.js (barrel)           │  │
│  │  ├── useNavigator                           │  │
│  │  ├── useWebProvider                         │  │
│  │  ├── useBasicService                        │  │
│  │  ├── useFetchData                           │  │
│  │  └── usePostData                            │  │
│  └─────────────────────────────────────────────┘  │
│         ▲ exposes                ▼ consumes       │
└─────────┼────────────────────────┼────────────────┘
          │                        │
    ┌─────┴──────┐          ┌──────┴─────┐
    │ SGP remote │          │ SGM remote │
    │ remotes:   │          │ remotes:   │
    │ teraprox_  │          │ teraprox_  │
    │   core     │          │   core     │
    └────────────┘          └────────────┘
```

## Como funciona

### Modo federado (produção e dev com core rodando)

1. O core carrega o `remoteEntry.js` do SGP/SGM para obter as telas
2. As telas do SGP/SGM importam `teraprox_core/SharedHooks` → webpack resolve do host
3. Os hooks rodam no contexto do core (store, router, WebProvider são singletons compartilhados)

### Modo standalone (dev sem core)

1. O SGP/SGM tenta carregar `teraprox_core/remoteEntry.js` via `promise new Promise(...)`
2. Se o core não estiver disponível, o fallback retorna um módulo vazio
3. Os proxies em `hooks/defaults/` detectam `undefined` e usam a cópia local (`_local/`)

## Estrutura de arquivos

### Core (`teraprox-core/src/hooks/`)
```
hooks/
  SharedHooks.js          ← Barrel exportado via MF
  useWebProvider.js       ← API completa com noop fallbacks
  useBasicService.js      ← Canônico
  useFetchData.js         ← Canônico (novo)
  usePostData.js          ← Canônico (novo)
  defaults/
    useNavigator.js       ← Canônico
```

### SGP/SGM (`src/hooks/defaults/`)
```
defaults/
  useNavigator.js         ← Proxy → teraprox_core/SharedHooks
  useWebProvider.js       ← Proxy → teraprox_core/SharedHooks
  useBasicService.js      ← Proxy → teraprox_core/SharedHooks
  useFetchData.js         ← Proxy → teraprox_core/SharedHooks
  usePostData.js          ← Proxy → teraprox_core/SharedHooks
  _local/
    useNavigator.js       ← Cópia local (fallback standalone)
    useWebProvider.js      ← Cópia local (fallback standalone)
    useBasicService.js     ← Cópia local (fallback standalone)
    useFetchData.js        ← Cópia local (fallback standalone)
    usePostData.js         ← Cópia local (fallback standalone)
```

## Como adicionar um novo hook compartilhado

1. Implemente o hook em `teraprox-core/src/hooks/`
2. Exporte-o no barrel `SharedHooks.js`
3. Em SGP/SGM, crie o proxy em `hooks/defaults/`:
   ```js
   import { useMyHook as coreUseMyHook } from 'teraprox_core/SharedHooks';
   import { useMyHook as localUseMyHook } from './_local/useMyHook';
   export const useMyHook = coreUseMyHook || localUseMyHook;
   ```
4. Copie a implementação para `_local/useMyHook.js` (ajustando imports relativos)

## Hooks ainda NÃO migrados (Fase 2)

Estes hooks existem apenas nos remotes e podem ser migrados futuramente:

- `useAnexo`, `useContextUpdateHandler`, `useFormStorage`, `useHashSection`
- `useIsMobile`, `useLogin`, `useMenuNavForm`, `usePersistedState`
- `useSidebar`, `useSmartSearch`, `useTickets`, `useTimerSocket`
- `useUnidade`, `useValidate`, `useValidationHook`, `userFilterHook`
- `useNotifications` (imports de serviço divergem entre core e remotes)

## Variáveis de ambiente

| Variável | Onde | Default |
|---|---|---|
| `REMOTE_CORE_URL` | SGP/SGM config-overrides.js | `http://localhost:3000` (dev) / `https://teraprox-core.web.app` (prod) |
| `REMOTE_SGP_URL` | Core webpack.config.js | `http://localhost:3002` (dev) |
| `REMOTE_SGM_URL` | Core webpack.config.js | `http://localhost:3003` (dev) |
