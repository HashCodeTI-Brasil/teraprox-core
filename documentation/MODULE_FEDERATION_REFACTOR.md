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

---

## Revisão de Paridade por Branches

Comparativo entre:

- `master` (produção com apps separados)
- `feature/module-federation-setup` (setup inicial de MF)
- `gcp-migration` (estado atual)

### Resumo Executivo

O estado atual em `gcp-migration` está alinhado com as funcionalidades da `master`, com a adição esperada de:

- Federation host-only no core
- Firebase Hosting para deploy
- Firebase RTDB para matching objects/notificações
- Isolamento de persistência Redux por app

Não foi identificado gap estrutural de rotas/telas no `remoteRegistry` do core para os módulos SGP/SGM.

### Evolução Técnica

| Tema | master | module-federation | gcp-migration |
|---|---|---|---|
| Arquitetura de frontend | SGP/SGM standalone | setup inicial em remotes | core host-only + remotes federados |
| Real-time (matching objects) | Socket.IO + Rabbit Agent | mantido | Firebase RTDB |
| Notificações | socket dedicado | mantido | Firebase RTDB |
| Persistência Redux | `persist:root` | `persist:root` | chaves isoladas por app |
| Resiliência de chunks | baixa | parcial | `lazyWithRetry` / chunk reload |
| Deploy | Cloud Run | híbrido | Firebase Hosting |

### Itens Confirmados como Alinhados

- Rotas de processo e manutenção carregadas pelo host via `remoteRegistry`.
- Contrato de shared singletons compatível entre host e remotes.
- Padrão de DI via `FederatedBridge` preservando contexto `WebProvider`.
- Interface de store simétrica (`injectReducer`/`unmountReducer`) nos três apps.
- Fluxo de negócio principal mantido (CRUDs e consumo dos serviços REST por contexto).

### Pontos de Atenção

1. `teraprox-app-sgp`: revisão sugerida no fluxo de login standalone para manter tolerância a falhas de chamadas auxiliares (setores/unidades/timers) sem quebrar autenticação.
2. `teraprox-app-sgp`: validar remoção de `TimeDurationInput.js` contra eventuais imports residuais.
3. Dependências legadas de Socket.IO podem ser removidas em hardening posterior, após validação final dos fluxos Firebase.

---

## Checklist de Validação de Paridade

Executar após deploy dos três apps:

1. Login/logout via core com navegação para rotas SGP e SGM.
2. CRUD completo de cadastros compartilhados (Recursos, Ações, Tarefas, Materiais, Unidades) via telas federadas.
3. Propagação de MatchingObjects em tempo real via Firebase RTDB entre contextos.
4. Atualização de notificações no sino sem logout indevido por `401` transitório.
5. Reload de rota federada após novo deploy sem erro persistente de chunk.
6. Persistência isolada no browser (sem colisão entre `persist:teraprox-core-root`, `persist:teraprox-sgp-root`, `persist:teraprox-sgm-root`).

---

## Status

Situação atual recomendada para `gcp-migration`:

- **Apto para homologação funcional completa** com foco nos itens do checklist acima.
- **Sem bloqueios arquiteturais** para manter o core como shell puro.
