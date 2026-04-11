# TeraproX Core

Shell/host da arquitetura Micro-Frontend (MFE) do TeraproX. Orquestra os módulos federados (SGP, SGM, Solicitações) via Webpack Module Federation e fornece SDKs e pacotes compartilhados.

## Estrutura do Monorepo

```
teraprox-core/
├── src/                      # Aplicação host (shell)
├── packages/
│   ├── core-sdk/             # SDK principal para módulos federados
│   └── ui-kit/               # Componentes visuais compartilhados
├── documentation/            # Documentação técnica da arquitetura
└── webpack.config.js         # Configuração do host com Module Federation
```

## Módulos Federados

| Módulo | Federation Name | Porta Dev | Produção |
|--------|----------------|-----------|----------|
| Core (host) | `teraprox_core` | 3000 | teraprox-core.web.app |
| SGP (Processo) | `teraprox_app_sgp` | 3002 | teraprox-sgp.web.app |
| SGM (Manutenção) | `teraprox_app_sgm` | 3003 | teraprox-sgm.web.app |
| Solicitações | `teraprox_app_solicitacao` | 3004 | teraprox-solicitacoes.web.app |

---

## Pacotes (`packages/`)

### `teraprox-core-sdk` (v0.3.0)

Contrato tipado entre o Core host e os módulos federados. Fornece interfaces, contextos, hooks, componentes e utilitários compartilhados.

#### Entry Points

O SDK expõe **3 entry points** para diferentes cenários:

```js
// Entry point principal — tudo
import { useCoreService, useHttpController, useToast } from 'teraprox-core-sdk';

// Apenas Federation runtime
import { FederatedBridge, createReducersBundle } from 'teraprox-core-sdk/federation';

// Ferramentas de desenvolvimento
import { DevShell, extractDevRoutes } from 'teraprox-core-sdk/dev';
```

#### `teraprox-core-sdk` (principal)

**Tipos/Interfaces:**
- `CoreService` — contrato principal host ↔ remoto (controller factory, toast, matching objects, logout)
- `HttpController` — CRUD completo (`get`, `post`, `put`, `patch`, `delete`, `save`, `read`, `readAll`, etc.)
- `ToastService` / `ToastOptions` — notificações toast
- `MatchingObjectSubscription` — assinatura real-time via Firebase RTDB
- `Notification` / `NotificationState` — estado de notificações
- `NavigateFn` / `NavigationConfig` — navegação entre módulos

**Contexto:**
- `CoreServiceContext` — `React.createContext<CoreService | null>` fornecido pelo host via `FederatedBridge`

**Hooks:**
| Hook | Descrição |
|------|-----------|
| `useCoreService()` | Acessa o `CoreService` do contexto |
| `useHttpController(context, baseEndPoint?)` | Cria um `HttpController` para CRUD |
| `useToast()` | Atalho para `toast.success/warning/error/info` |
| `useMatchingObject(subscription)` | Assinatura real-time de Matching Objects |
| `useNotifications()` | Estado de notificações |
| `useNavigator()` | Navegação programática |
| `useFetchData(config)` | GET genérico com loading/error state |
| `usePostData(config)` | POST genérico com loading/error state |
| `useAnexoUpload(config)` | Upload de arquivos/anexos |
| `useFormStorage(key)` | Persistência de estado de formulário |
| `useSmartSearch(config)` | Busca com debounce |
| `useValidation(rules)` | Validação de campos |

**Reducers:**
- `branchLevelReducer` — estado de branch/level em formulários
- `pickerReducer` — estado genérico de pickers/seletores

**Utilitários:**
- `colorUtils` — cálculo de contraste de cor (`pickTextColorBasedOnBgColorAdvanced`)
- `dateUtils` — wrappers dayjs (`formatDate`, `daysBetween`, etc.)
- `stringUtils` — manipulação de strings (`capitalize`, `truncate`, `slugify`, etc.)

**Componentes:**
- `RecursoDisplayer` — exibição de recursos compartilhada

#### `teraprox-core-sdk/federation`

Runtime de federação — usado pelos remotes para integrar com o host:

| Export | Descrição |
|--------|-----------|
| `FederatedBridge` | Provider que injeta o `CoreService` do host e seta `window.__TERAPROX_HOSTED_BY_CORE__` |
| `createReducersBundle(config)` | Factory para lazy-loading de reducers com seleção de contexto |
| `StandaloneProvider` | Provider para modo standalone (`npm start` isolado do host) |
| `DevAutoLogin` | Auto-dispatch de login com usuário mock em modo dev |

**Tipos:**
- `RemoteManifest` — manifesto declarando rotas, menus e módulos do remote
- `RemoteMenuSection` / `RemoteMenuItem` — estrutura de menu
- `ReducersBundle` / `ReducersBundleConfig` — configuração de reducers federados

#### `teraprox-core-sdk/dev`

Ferramentas para desenvolvimento local dos remotes:

| Export | Descrição |
|--------|-----------|
| `DevShell` | Painel flutuante com sidebar de navegação (só renderiza fora do host) |
| `extractDevRoutes(routesConfig)` | Converte `routesConfig[]` em `DevRoute[]` para o DevShell |

---

### `@teraprox/ui-kit` (v0.1.0)

Componentes visuais compartilhados entre módulos.

```js
import { AddButton } from '@teraprox/ui-kit';
import { UuidPill } from '@teraprox/ui-kit';
import '@teraprox/ui-kit/styles'; // CSS
```

---

## Instalação do SDK nos Módulos Federados

O SDK deve ser instalado via **npm** nos módulos federados. Enquanto a versão v0.3.0 não estiver publicada no registry, usar `npm pack` + tarball:

```bash
# 1. No diretório do SDK, gerar o tarball
cd teraprox-core/packages/core-sdk
npm run build
npm pack
# Gera: teraprox-core-sdk-0.3.0.tgz

# 2. No módulo federado, instalar a partir do tarball
cd teraprox-app-sgp
npm install /caminho/para/teraprox-core-sdk-0.3.0.tgz --legacy-peer-deps

# 3. Ajustar o package.json para a versão semver (para quando publicar no npm)
# "teraprox-core-sdk": "^0.3.0"
```

> **Não usar `file:` ou `npm link`** — essas abordagens criam symlinks que causam conflitos de resolução de módulos (React duplicado, ModuleScopePlugin, etc.).

---

## Configuração do Module Federation

### No Host (`webpack.config.js`)

O host declara os remotes e compartilha as dependências como `eager: true`:

```js
new ModuleFederationPlugin({
  name: 'teraprox_core',
  remotes: { /* SGP, SGM, Solicitações */ },
  shared: {
    'teraprox-core-sdk': { singleton: true, eager: true },
    react: { singleton: true, eager: true },
    // ... demais deps
  },
})
```

### Nos Remotes (`config-overrides.js`)

Cada remote expõe suas telas, reducers, bridge e manifesto, e compartilha deps como `eager: false`:

```js
new ModuleFederationPlugin({
  name: 'teraprox_app_sgp', // ou teraprox_app_sgm
  filename: 'remoteEntry.js',
  exposes: {
    './ProcessoDashboard': './src/Screens/screens-processo/ProcessoDashboard',
    './ReducersBundle': './src/federation/reducersBundle',
    './FederatedBridge': './src/federation/FederatedBridge',
    './Manifest': './src/federation/manifest',
    // ...
  },
  shared: {
    'teraprox-core-sdk': { singleton: true, eager: false },
    react: { singleton: true, eager: false },
    // ... demais deps
  },
})
```

### Dependências Compartilhadas (Shared)

Todas declaradas como `singleton: true` para evitar duplicatas:

`react`, `react-dom`, `react-redux`, `react-router-dom`, `@reduxjs/toolkit`, `react-icons`, `react-bootstrap`, `react-toast-notifications`, `react-dnd`, `react-dnd-html5-backend`, `redux-persist`, `axios`, `dayjs`, `teraprox-core-sdk`

---

## Arquitetura de Integração

```
┌─────────────────────────────────────────────────┐
│                 teraprox-core (host)             │
│  ┌────────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ CoreService│  │  Router  │  │ Redux Store │  │
│  │  (toast,   │  │  (rotas  │  │  (reducers  │  │
│  │  http,     │  │   dos    │  │   do host + │  │
│  │  matching  │  │  remotes)│  │   federados)│  │
│  │  objects)  │  │          │  │             │  │
│  └─────┬──────┘  └────┬─────┘  └──────┬──────┘  │
│        │              │               │          │
│        └──────┬───────┴───────┬───────┘          │
│               │               │                  │
│     ┌─────────▼──┐    ┌──────▼───────┐           │
│     │FederatedBridge   │FederatedBridge           │
│     └─────────┬──┘    └──────┬───────┘           │
└───────────────┼──────────────┼───────────────────┘
                │              │
    ┌───────────▼──┐   ┌──────▼───────────┐
    │  SGP Remote  │   │   SGM Remote     │
    │  (Processo)  │   │  (Manutenção)    │
    │              │   │                  │
    │ useCoreService() │ useCoreService() │
    │ useHttpController│ useHttpController│
    └──────────────┘   └──────────────────┘
```

**Fluxo:**
1. O host carrega o `remoteEntry.js` de cada remote
2. Importa o `Manifest` para registrar rotas e menus
3. Importa o `ReducersBundle` para injetar reducers no store
4. Envolve cada tela remote com `FederatedBridge`, injetando o `CoreService`
5. O remote acessa tudo via hooks do SDK (`useCoreService`, `useHttpController`, etc.)

---

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar o host
npm start

# Build do SDK (após alterações)
cd packages/core-sdk
npm run build

# Watch mode do SDK
npm run dev
```

### Publicação do SDK

```bash
cd packages/core-sdk
npm run build
npm version patch  # ou minor/major
npm publish
```

Após publicar, atualizar os módulos federados:
```bash
npm install teraprox-core-sdk@latest
```
