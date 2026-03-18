# Module Federation — Resumo das Alterações

## Arquitetura

```
teraprox-core  (host, :3000)  ←  remoteEntry.js  ←  teraprox-app-sgp (:3002)
                               ←  remoteEntry.js  ←  teraprox-app-sgm (:3003)
```

O host (core) consome componentes dos dois remotes via Webpack 5 Module Federation. Cada remote expõe telas, um `ReducersBundle` e um `FederatedBridge`. O core orquestra tudo: routing, Redux store, contexto do WebProvider e renderização.

---

## O Que Mudou em Cada App

### 1. teraprox-core (Host)

| Arquivo | Alteração |
|---|---|
| `webpack.config.js` | `ModuleFederationPlugin` como `teraprox_core`. Declara remotes sgp/sgm, expõe `useInjectReducer` e `useWebInterface`, e configura 12 packages como singletons shared. |
| `src/index.js` | Mudou para `import('./bootstrap')` (async bootstrap) para evitar "eager consumption" de shared modules. |
| `src/store.js` | Adicionados `store.asyncReducers`, `store.injectReducer(key, reducer)` e `store.unmountReducer(key)` para injeção dinâmica de reducers dos remotes. |
| `src/factories/FederatedComponentHOC.js` | Novo. Contém o `componentRegistry` (mapa estático de ~70 `lazy(() => import(...))`) e o `FederatedComponentHost` que: carrega ReducersBundle + FederatedBridge do remote correto, injeta reducers no store, e renderiza o componente remoto envolto no bridge. |
| `src/Components/error-handling/FederatedErrorBoundary.js` | Novo. Error boundary que captura falhas de fetch de chunks remotos. |
| `src/models/federatedProcessoScreens.js` | Novo. Define rotas e `menuSections` das telas SGP (Engenharia, Controle de Processo). |
| `src/models/federatedManutencaoScreens.js` | Novo. Define rotas e `menuSections` das telas SGM (Operação, Ativos, Indicadores). |
| `src/models/federatedCadastroScreens.js` | Novo. Telas de cadastro compartilhadas (Ações, Materiais, Unidades, etc.) numa aba unificada. Usa SGM como remote fonte (exceto Recursos que vem do SGP). |
| `src/App.js` | Unifica todas as rotas (`sgpRoutes + sgmRoutes + cadastroRoutes`) e mapeia cada uma a um `<FederatedComponentHost>` com `key={screen.modulePath}`. |
| `src/Components/Menu/MenuBar.js` | Três dropdowns no navbar: "Processo", "Manutenção" e "Cadastros", cada um lendo os `menuSections` do respectivo arquivo de config. |

### 2. teraprox-app-sgp (Remote)

| Arquivo | Alteração |
|---|---|
| `config-overrides.js` | `ModuleFederationPlugin` como `teraprox_app_sgp`. Auto-descobre telas em `src/Screens/screens-processo/` e expõe cada uma. Também expõe `ReducersBundle`, `FederatedBridge`, e 3 factories (`CadernosFactory`, `RecursoFormFactory`, `UnidadeFormFactory`). Shared idêntico ao core. |
| `src/index.js` | Async bootstrap: `import('./bootstrap')`. |
| `src/federation/FederatedBridge.js` | Novo. Recebe `webProviderValue` do core e o injeta no `WebProvider.Provider` do SGP, resolvendo o problema de contextos `createContext` distintos entre apps. |
| `src/federation/reducersBundle.js` | Novo. Importa ~40 reducers com `webpackMode: "eager"`. Exporta `getReducersForModule({ context })` (carrega só os reducers que a tela precisa) e `loadAllReducers()` (fallback). |
| `src/store.js` | Adicionados `injectReducer`/`unmountReducer` (mesma interface do core, usado apenas no modo standalone). |

### 3. teraprox-app-sgm (Remote)

| Arquivo | Alteração |
|---|---|
| `config-overrides.js` | `ModuleFederationPlugin` como `teraprox_app_sgm`. Auto-descobre telas em `src/Screens/screens-manutencao/` (excluindo helpers). Expõe `ReducersBundle`, `FederatedBridge`, e telas commons/gestão/suprimentos adicionais. Shared idêntico. |
| `src/index.js` | Async bootstrap: `import('./bootstrap')`. |
| `src/federation/FederatedBridge.js` | Novo. Mesma lógica do SGP — injeta contexto do core no `WebProvider` local. |
| `src/federation/reducersBundle.js` | Novo. Importa ~45 reducers com `webpackMode: "eager"`. Exporta `getReducersForModule({ context })` e `loadAllReducers()`. |

---

## Padrões-Chave

| Padrão | Descrição |
|---|---|
| **Async Bootstrap** | Todos os `index.js` fazem `import('./bootstrap')` para que shared modules negociem versões antes do mount. |
| **ReducersBundle** | Cada remote exporta seus reducers com `eager` mode. O core chama `getReducersForModule({ context })` e injeta no store central via `store.injectReducer()`. |
| **FederatedBridge** | Resolve o problema de `createContext` de apps diferentes. O core lê seu `WebProvider` e passa o valor via prop para o bridge do remote, que re-provê no contexto local. |
| **componentRegistry** | Mapa estático obrigatório porque o Webpack exige strings literais em `import()`. Cada tela remota tem uma entrada `lazy(() => import('teraprox_app_sgX/Tela'))`. |
| **Context-based Reducer Loading** | Cada rota declara um `context` (ex: `'acao'`, `'ordemDeServico'`). O `ReducersBundle` sabe quais reducer keys cada context precisa, evitando carregar todos. |
| **Bridge Guard** | `FederatedComponentHost` rastreia `expectedRemote` vs `bridgeRemote` para impedir renderizar com bridge stale ao navegar entre SGP e SGM. |
| **Factory DI** (SGP only) | 3 telas do SGP usam factories que injetam `useWebInterface` como `controller`. O SGM não usa esse padrão — todas as telas usam `useWebProvider()` direto. |

---

## Shared Libraries (12 singletons)

`react`, `react-dom`, `react-redux`, `react-router-dom`, `@reduxjs/toolkit`, `react-icons`, `react-bootstrap`, `react-toast-notifications`, `react-dnd`, `react-dnd-html5-backend`, `redux-persist`, `axios`

Todas com `singleton: true` e `requiredVersion: false` nos três apps.
