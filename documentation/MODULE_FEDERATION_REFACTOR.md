# Module Federation — Refactoring (Março 2026)

Reestruturação da arquitetura Module Federation para seguir best practices e consolidar o **core como shell puro** que injeta dependências nos remotes.

---

## Arquitetura

```
teraprox-core  (host, :3000)
  ├─ remoteEntry.js ← teraprox-app-sgp (:3002)
  └─ remoteEntry.js ← teraprox-app-sgm (:3003)
```

O core é **exclusivamente host** — não expõe módulos (`exposes` removido). Toda dependência que o remote precisa é injetada via props ou via shared modules.

---

## O Que Mudou

### teraprox-core (Host)

| Arquivo | Alteração |
|---|---|
| `webpack.config.js` | Removido `exposes` e `filename: 'remoteEntry.js'` — core não é mais um remote. `eager: true` nos shared (host inicializa primeiro). Adicionado `dayjs` aos singletons. |
| `src/federation/remoteRegistry.js` | **Novo** — registry de ~70 componentes lazy extraído do HOC. Organizado por remote (SGP/SGM) e tipo (list/form/factory). Exporta `componentRegistry` e `resolveRemoteName()`. |
| `src/hooks/useRemoteInfra.js` | **Novo** — hook que encapsula o carregamento de ReducersBundle + FederatedBridge + injeção de reducers no store. |
| `src/factories/FederatedComponentHOC.js` | Refatorado de ~300 → ~80 linhas. Removido: `formData`, `save`, `cancelar`, `onDataChange`, `actionEndPoint`. Agora delega ao `useRemoteInfra` e ao `remoteRegistry`. |
| `src/store.js` | Guard em `injectReducer` — previne `replaceReducer` duplicado quando o reducer já existe. |

### teraprox-app-sgm (Remote)

| Arquivo | Alteração |
|---|---|
| `src/store.js` | Adicionado `createReducer()`, `asyncReducers`, `injectReducer()`, `unmountReducer()` — mesma interface do core e SGP para suportar modo standalone. |
| `src/federation/FederatedBridge.js` | Adicionado flag `window.__TERAPROX_HOSTED_BY_CORE__` (paridade com SGP). |
| `config-overrides.js` | Adicionado `dayjs` aos shared singletons. |

### teraprox-app-sgp (Remote)

| Arquivo | Alteração |
|---|---|
| `src/store.js` | Removido `persistDebugMiddleware` e `console.log` de debug. Simplificado persistor (removido `getGlobal()`/`__REDUX_PERSISTOR__`). |
| `config-overrides.js` | Adicionado `dayjs` aos shared singletons. |

---

## Padrões Adotados

| Padrão | Descrição |
|---|---|
| **Host-only shell** | Core não expõe módulos. É puramente a casca que carrega e orquestra os remotes. |
| **Eager host / Lazy remotes** | Host usa `eager: true` nos shared (inicializa primeiro). Remotes mantêm `eager: false`. |
| **Single Responsibility Hook** | `useRemoteInfra` concentra bootstrap do remote (ReducersBundle + Bridge + store injection). |
| **Registry isolado** | `remoteRegistry.js` é a única fonte de verdade para lazy components federados. |
| **Store simétrico** | Os 3 apps têm a mesma interface: `store.injectReducer(key, reducer)` e `store.unmountReducer(key)`, com guard de duplicatas. |
| **DI via props** | Host injeta `webProvider` como prop. Bridge injeta contexto `WebProvider`. Remotes não importam do host. |

---

## Shared Singletons (13)

```
react, react-dom, react-redux, react-router-dom, @reduxjs/toolkit,
react-icons, react-bootstrap, react-toast-notifications,
react-dnd, react-dnd-html5-backend, redux-persist, axios, dayjs
```

Todos com `singleton: true` e `requiredVersion: false`.
Host usa `eager: true`, remotes usam `eager: false`.

---

## Estrutura de Arquivos (Core)

```
src/
├── federation/
│   └── remoteRegistry.js      ← Registry de componentes lazy (SGP + SGM)
├── hooks/
│   ├── useRemoteInfra.js       ← Hook de bootstrap da infraestrutura remota
│   ├── useWebProvider.js       ← Context consumer do WebProvider
│   └── useInjectReducer.js     ← Hook para injeção dinâmica de reducers
├── factories/
│   └── FederatedComponentHOC.js ← HOC host (resolve + bridge + render)
├── models/
│   ├── federatedProcessoScreens.js  ← Rotas SGP
│   ├── federatedManutencaoScreens.js ← Rotas SGM
│   └── federatedCadastroScreens.js   ← Rotas Cadastros
└── Components/
    ├── error-handling/
    │   └── FederatedErrorBoundary.js
    └── loading/
        └── FederatedLoadingPlaceholder.js
```
