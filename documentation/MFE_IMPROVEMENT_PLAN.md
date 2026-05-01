# Plano de Melhoria da Arquitetura Micro-Frontend Teraprox

**Data:** Abril 2026  
**Scope:** teraprox-core (host) + teraprox-app-sgm + teraprox-app-sgp + teraprox-app-solicitacao-de-servico  
**Objetivo:** Eliminar replicação de código, padronizar contratos, facilitar desenvolvimento e acoplamento de módulos federados

---

## Diagnóstico: Estado Atual

### Pontos Fortes (manter)
- Module Federation com fallback por promise (Core resiliente se remote offline)
- `teraprox-core-sdk` v0.2.0 com interfaces TypeScript bem definidas (`CoreService`, `HttpController`, `ToastService`, `MatchingObjectSubscription`)
- Padrão FederatedBridge para injeção de contexto
- ReducersBundle com lazy-loading por contexto
- Standalone mode funcional em todos os remotes
- DevShell no SDK para navegação em dev mode

### Problemas Críticos Identificados

| # | Problema | Impacto | Onde |
|---|----------|---------|------|
| 1 | **Duplicação massiva de UI components** — `default-components/` (buttons, forms, tables, modals, charts, ~50 componentes) copiado nos 3 remotes | Cada mudança visual precisa ser replicada em 4 repos | SGM, SGP, Core |
| 2 | **Adoção inconsistente do SDK** — Solicitação usa SDK, SGM parcialmente, SGP não usa | Sem padrão, cada dev inventa a integração | SGP zero imports |
| 3 | **Dual Context Pattern** — `WebProvider` (wsProvider.js) e `CoreServiceContext` (SDK) coexistem com overlap | Confusão: "uso useWebProvider() ou useCoreService()?" | Todos os repos |
| 4 | **basicController duplicado** — Factory HTTP CRUD copiada em 4 repos com variações sutis | Bugs corrigidos num repo não propagam | Todos |
| 5 | **wsProvider duplicado** — ~200 linhas copiadas com lógica Firebase/socket | Manutenção multiplicada por 4 | Todos |
| 6 | **~25 hooks genéricos duplicados** — useNavigator, useFetchData, usePostData, useLogin, useNotifications, useAnexo, etc. | DRY violado severamente | SGM, SGP |
| 7 | **Utilitários duplicados** — auth.js, dateUtils.js, statusService.js, validations.js | Lógica de negócio espalhada | SGM, SGP |
| 8 | **FederatedBridge inconsistente** — SGM/SGP re-injetam WebProvider, Solicitação só marca flag | Comportamento diferente por módulo | Todos |
| 9 | **Menu/rotas hardcoded no Core** — `remoteRegistry.js` com ~70 entradas manuais + `federatedXxxScreens.js` | Adicionar tela = alterar Core + Remote | Core |
| 10 | **Reducers comuns duplicados** — globalError, notification, picker, timer existem em múltiplos repos | Estado inconsistente | SGM, SGP |
| 11 | **Nenhum pacote de UI compartilhado** — Sem `@hashcodeti/ui` ou similar | Impossível reusar componentes sem copiar | — |
| 12 | **Zero type safety nos remotes** — Todo JS puro, sem JSDoc | Integração com SDK é guesswork | SGM, SGP |

---

## Plano de Refatoração

### Visão da Arquitetura Alvo

```
packages/
├── core-sdk/                    ← Contratos e hooks (já existe, expandir)
│   ├── types/                   ← Interfaces CoreService, HttpController, etc.
│   ├── hooks/                   ← useCoreService, useHttpController, useToast, ...
│   ├── context/                 ← CoreServiceContext
│   ├── reducers/                ← branchLevel + reducers comuns (picker, timer, globalError)
│   └── components/              ← RecursoDisplayer, etc.
│
├── ui-kit/                      ← NOVO: Componentes visuais compartilhados
│   ├── buttons/                 ← GenericButton, ActionButton, etc.
│   ├── forms/                   ← InputField, Autocomplete, DatePicker, etc.
│   ├── table/                   ← GenericTable, DataGrid, etc.
│   ├── modals/                  ← ConfirmModal, FormModal, etc.
│   ├── displays/                ← StatusBadge, UuidPill, IconDisplay, etc.
│   ├── containers/              ← Card, Panel, SectionContainer, etc.
│   ├── charts/                  ← ChartWrapper, etc.
│   └── styles/                  ← CSS/SASS base (Bootstrap overrides)
│
└── federation-runtime/          ← NOVO: Boilerplate de integração
    ├── FederatedBridge.tsx       ← Bridge padronizado
    ├── ReducersBundleFactory.ts  ← Factory p/ criar ReducersBundle
    ├── StandaloneProvider.tsx    ← Provider mock para standalone
    ├── DevAutoLogin.tsx          ← Auto-login para dev mode
    └── remoteBootstrap.ts       ← Bootstrap padronizado para remotes
```

---

### FASE 1 — Consolidar o SDK (core-sdk v0.3.0)

**Prioridade:** ALTA  
**Esforço:** 1-2 semanas  
**Objetivo:** Tornar o SDK a ÚNICA fonte de hooks e utilitários compartilhados

#### 1.1 Migrar hooks genéricos para o SDK

Os hooks abaixo existem copiados nos remotes. Mover para `core-sdk/src/hooks/`:

| Hook | Status Atual | Ação |
|------|-------------|------|
| `useCoreService` | ✅ Já no SDK | Manter |
| `useHttpController` | ✅ Já no SDK | Manter |
| `useToast` | ✅ Já no SDK | Manter |
| `useMatchingObject` | ✅ Já no SDK | Manter |
| `useNotifications` | ✅ Já no SDK | Manter |
| `useNavigator` | ✅ Já no SDK | Manter |
| `useFetchData` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |
| `usePostData` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |
| `useBasicService` | ❌ Duplicado em SGM/SGP | **Deprecar** — substituir por `useHttpController` |
| `useAnexoUpload` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |
| `useLogin` | ❌ Duplicado em SGM/SGP | **Mover para SDK** (usado standalone) |
| `useFormStorage` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |
| `useSmartSearch` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |
| `usePersistedState` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |
| `useValidationHook` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |
| `useSidebar` | ❌ Duplicado em SGM/SGP | **Mover para SDK** |

**Implementação:**
```typescript
// core-sdk/src/hooks/useFetchData.ts
export function useFetchData<T = any>(controller: HttpController, path: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // ... implementação genérica usando HttpController (sem axios direto)
}
```

#### 1.2 Adicionar utilitários compartilhados ao SDK

```
core-sdk/src/utils/
├── colorUtils.ts        ← já existe
├── dateUtils.ts         ← MOVER de Services/default/dateUtils.js
├── stringUtils.ts       ← MOVER de Services/default/stringUtils.js
├── statusUtils.ts       ← MOVER de Services/default/statusService.js
└── validationUtils.ts   ← MOVER de Services/default/validations.js
```

#### 1.3 Adicionar reducers comuns ao SDK

Reducers que existem em SGM e SGP idênticos:

```
core-sdk/src/reducers/
├── branchLevelReducer.ts    ← já existe
├── pickerReducer.ts         ← MOVER
├── timerReducer.ts          ← MOVER
├── globalErrorReducer.ts    ← MOVER
├── cachedReducer.ts         ← MOVER
├── statusReducer.ts         ← MOVER
└── notificationReducer.ts   ← MOVER (genérico sem domínio)
```

#### 1.4 Unificar contexto: eliminar o dual WebProvider + CoreServiceContext

**Problema:** Remotes têm `useWebProvider()` (do wsProvider.js local) E `useCoreService()` (do SDK). Ambos provêem `controller()`, `subscribe()`, `toast`. Devs não sabem qual usar.

**Solução:** `CoreServiceContext` (SDK) é o **único contrato público**. `WebProvider` se torna um detalhe interno do Core.

```
ANTES (confuso):
  Remote → useWebProvider() → wsProvider.js local → tem controller, subscribe, etc.
  Remote → useCoreService() → CoreServiceContext → tem createController, subscribe, etc.

DEPOIS (claro):
  Remote → useCoreService() → CoreServiceContext → ÚNICO PONTO DE ACESSO
  Core → WebProvider → interno do Core, nunca exposto a remotes
```

**Migração:**
1. No FederatedBridge, em vez de injetar `WebProvider.Provider`, injetar `CoreServiceContext.Provider` com o valor completo
2. Nos remotes, substituir todos os `useWebProvider()` por `useCoreService()` / `useHttpController()`
3. `wsProvider.js` nos remotes vira apenas fallback standalone (nunca usado quando hospedado)

#### 1.5 Forçar adoção no SGP

SGP tem `@hashcodeti/core-sdk` no shared config do webpack mas **zero imports no código**. 

**Ação:** Criar PR que substitui:
- `useWebProvider()` → `useCoreService()` em todos os hooks/components
- `basicController` via `useWebProvider().controller()` → `useHttpController(context)`
- Toast via `useToasts()` → `useToast()` do SDK

---

### FASE 2 — Criar @hashcodeti/ui-kit (Biblioteca de Componentes)

**Prioridade:** ALTA  
**Esforço:** 2-3 semanas  
**Objetivo:** Eliminar a duplicação de ~50 componentes visuais

#### 2.1 Inventário de Componentes Duplicados

Componentes que existem IDÊNTICOS (ou quase) em SGM e SGP `default-components/`:

| Categoria | Componentes | Ação |
|-----------|-------------|------|
| **buttons/** | GenericButton, ActionButton, SubmitButton, IconButton | → ui-kit |
| **forms/** | InputField, TextArea, SelectField, CheckboxField, RadioGroup | → ui-kit |
| **table/** | GenericTable, PaginatedTable, SortableHeader | → ui-kit |
| **modals/** | ConfirmModal, FormModal, DeleteConfirmation | → ui-kit |
| **displays/** | StatusBadge, UuidPill, IconGenericDisplay, EmptyState | → ui-kit |
| **containers/** | Card, Panel, SectionContainer, FormContainer | → ui-kit |
| **charts/** | ChartWrapper, BarChart, PieChart | → ui-kit |
| **Date/** | DatePicker, DateRangePicker, CalendarView | → ui-kit |
| **Notifications/** | ToastContainer, NotificationBell | → ui-kit |
| **overlays/** | Tooltip, Popover | → ui-kit |
| **icons/** | Custom icon wrappers | → ui-kit |
| **text/** | Typography helpers | → ui-kit |
| **side-bar/** | Sidebar, SidebarItem | → ui-kit |
| **offcanvas/** | OffCanvas, OffCanvasHeader | → ui-kit |
| **progressCount/** | ProgressBar, StepIndicator | → ui-kit |
| **qr/** | QrCodeDisplay | → ui-kit (já no SDK apenas o scanner) |
| **SearchBar** | SearchInput with debounce | → ui-kit |
| **GenericListScreen** | Template para telas de listagem | → ui-kit |
| **Menu/** | MenuBar, MenuNavForm | **NÃO** (cada app tem menu diferente) |

#### 2.2 Estrutura do Pacote

```
packages/ui-kit/
├── package.json          # name: "@hashcodeti/ui-kit", peerDeps: react, react-bootstrap
├── tsconfig.json
├── src/
│   ├── index.ts          # Barrel export
│   ├── buttons/
│   │   ├── GenericButton.tsx
│   │   └── index.ts
│   ├── forms/
│   │   ├── InputField.tsx
│   │   ├── SelectField.tsx
│   │   ├── Autocomplete.tsx      # Mover do core-sdk aqui
│   │   └── index.ts
│   ├── table/
│   │   ├── GenericTable.tsx
│   │   └── index.ts
│   ├── modals/
│   │   ├── ConfirmModal.tsx
│   │   └── index.ts
│   ├── displays/
│   │   ├── StatusBadge.tsx
│   │   ├── UuidPill.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── GenericListScreen.tsx
│   │   ├── SectionContainer.tsx
│   │   └── index.ts
│   └── styles/
│       └── teraprox-base.css     # Estilos base (Bootstrap overrides)
└── dist/
```

**Estratégia de build:** `tsup` (como core-sdk), gera ESM + CJS + types

**Webpack sharing:**
```javascript
// Core webpack.config.js
shared: {
  '@hashcodeti/ui-kit': { singleton: true, eager: true },
  // ...
}
```

#### 2.3 Regra de Migração

1. **NÃO** mover todos de uma vez. Mover 5-8 componentes por sprint.
2. Para cada componente movido:
   - Copiar para ui-kit com TypeScript
   - Adicionar export no barrel
   - No remote: substituir import local por `import { X } from '@hashcodeti/ui-kit'`
   - Deletar o arquivo local
3. **GenericListScreen** é o mais valioso — é o template base de ~30 telas de listagem

---

### FASE 3 — Padronizar o Runtime de Federação

**Prioridade:** MÉDIA  
**Esforço:** 1 semana  
**Objetivo:** Eliminar boilerplate repetido na integração host↔remote

#### 3.1 FederatedBridge padronizado (SDK)

Hoje cada remote implementa seu próprio FederatedBridge com variações:

| Remote | WebProvider inject? | CoreServiceContext inject? | Flag set? |
|--------|--------------------|-----------------------------|-----------|
| SGM | ✅ Sim | ❌ Não | ✅ Sim |
| SGP | ✅ Sim | ❌ Não | ✅ Sim |
| Solicitação | ❌ Não | ❌ Não | ✅ Sim |

**Solução:** Bridge padronizado exportado do SDK:

```typescript
// core-sdk/src/federation/FederatedBridge.tsx
interface FederatedBridgeProps {
  coreService: CoreService;     // Injected by host
  children: React.ReactNode;
}

export function FederatedBridge({ coreService, children }: FederatedBridgeProps) {
  useEffect(() => {
    window.__TERAPROX_HOSTED_BY_CORE__ = true;
    return () => { window.__TERAPROX_HOSTED_BY_CORE__ = false; };
  }, []);

  return (
    <CoreServiceContext.Provider value={coreService}>
      {children}
    </CoreServiceContext.Provider>
  );
}
```

**Cada remote:** Importa e re-exporta:
```typescript
// remote/src/federation/FederatedBridge.ts
export { FederatedBridge as default } from 'teraprox-core-sdk/federation';
```

#### 3.2 StandaloneProvider padronizado (SDK)

Hoje cada remote implementa `StandaloneCoreServiceProvider` com variações. Mover para o SDK:

```typescript
// core-sdk/src/dev/StandaloneProvider.tsx
export function StandaloneProvider({ 
  apiBaseUrl,        // e.g., "http://localhost:4020"
  devUser,           // mock user for auto-login
  children 
}: StandaloneProviderProps) {
  // Creates mock CoreService with:
  // - createController() using axios + apiBaseUrl
  // - toast via react-toast-notifications
  // - noop subscribe/unsubscribe
  // - handleLogout
}
```

**Cada remote em modo standalone:**
```typescript
<StandaloneProvider apiBaseUrl="http://localhost:4020" devUser={DEV_USER}>
  <App />
</StandaloneProvider>
```

#### 3.3 ReducersBundle Factory (SDK)

O padrão de `reducersBundle.js` é idêntico nos 3 remotes. Criar factory:

```typescript
// core-sdk/src/federation/createReducersBundle.ts
interface ReducersBundleConfig {
  reducers: Record<string, () => Promise<any>>;
  contextMap: Record<string, string[]>;
  defaults: string[];
}

export function createReducersBundle(config: ReducersBundleConfig) {
  return {
    getReducerKeysByContext(context: string): string[] { ... },
    getReducersForKeys(keys: string[]): Promise<Record<string, any>> { ... },
    getReducersForModule({ context }: { context: string }): Promise<Record<string, any>> { ... },
    loadAllReducers(): Promise<Record<string, any>> { ... },
  };
}
```

**Cada remote:** Só declara SEUS reducers e contextos:
```typescript
// sgm/src/federation/reducersBundle.ts
import { createReducersBundle } from 'teraprox-core-sdk/federation';

export default createReducersBundle({
  reducers: {
    acao:           () => import('../Reducers/manutencao-reducers/acaoReducer'),
    ordemDeServico: () => import('../Reducers/manutencao-reducers/osReducer'),
    // ... apenas reducers de domínio
  },
  contextMap: {
    visaoGeral:      ['ordemDeServico', 'ordemDeManutencao'],
    ordemDeServico:  ['ordemDeServico', 'executarOrdemDeManutencao'],
    // ...
  },
  defaults: ['picker', 'timer', 'globalError'],  // ← do SDK
});
```

---

### FASE 4 — Auto-Registro de Rotas e Menu

**Prioridade:** MÉDIA  
**Esforço:** 1-2 semanas  
**Objetivo:** Remotes declaram suas rotas; Core descobre automaticamente

#### 4.1 Problema Atual

Core mantém 3 arquivos hardcoded:
- `federatedProcessoScreens.js` (~40 entradas manuais)
- `federatedManutencaoScreens.js` (~30 entradas manuais)
- `federatedSolicitacaoScreens.js` (~5 entradas manuais)
- `remoteRegistry.js` (~70 `lazyWithChunkReload()` manuais)

**Adicionar uma nova tela exige alterar 2 repos: o Remote (criar tela + expor) e o Core (registrar rota + menu).**

#### 4.2 Solução: Manifesto de Rotas no Remote

Cada remote exporta um manifesto:

```typescript
// SGM: exposes { './Manifest': './src/federation/manifest.ts' }

import type { RemoteManifest } from 'teraprox-core-sdk/federation';

export const manifest: RemoteManifest = {
  name: 'teraprox_app_sgm',
  version: '1.0.0',
  menuSections: [
    {
      label: 'Manutenção',
      icon: 'FaTools',
      items: [
        { label: 'Visão Geral', path: '/manutencao/visao-geral', module: './VisaoGeral', context: 'visaoGeral' },
        { label: 'Ordens de Serviço', path: '/manutencao/ordens-de-servico', module: './OrdensDeServico', context: 'ordemDeServico' },
        // ...
      ],
    },
    {
      label: 'Cadastros',
      icon: 'FaClipboardList',
      items: [
        { label: 'Recursos', path: '/cadastros/recursos', module: './RecursoFormV2', context: 'recurso' },
        // ...
      ],
    },
  ],
};
```

#### 4.3 Core consome manifestos dinamicamente

```typescript
// Core: src/federation/remoteLoader.ts
const REMOTES = ['teraprox_app_sgm', 'teraprox_app_sgp', 'teraprox_app_solicitacao'];

async function loadRemoteManifests(): Promise<RemoteManifest[]> {
  const manifests = await Promise.allSettled(
    REMOTES.map(name => 
      import(/* webpackIgnore: true */ `${name}/Manifest`)
        .then(m => m.manifest)
        .catch(() => null)
    )
  );
  return manifests
    .filter(r => r.status === 'fulfilled' && r.value)
    .map(r => r.value);
}
```

**MenuBar** consome manifestos:
```typescript
const manifests = useRemoteManifests(); // hook que carrega manifestos
// Renderiza menu dinâmico baseado em manifests[].menuSections
```

**Benefício:** Adicionar nova tela = apenas alterar o Remote (export + manifest entry). Zero mudanças no Core.

---

### FASE 5 — Eliminar Código Morto e Legado

**Prioridade:** BAIXA (fazer ao longo das outras fases)

#### 5.1 Remover WebSocket Legado
- `@stomp/stompjs` ainda no `package.json` do Core e SGM/SGP
- `socket.io-client`, `sockjs-client`, `stompjs`, `react-stomp` — candidatos a remoção
- Firebase RTDB é o provider real-time. Stomp não é mais usado.

#### 5.2 Remover SharedHooks do Core (bidirectional federation)
- Core expõe `./SharedHooks` via Module Federation, remotes importam via `teraprox_core/SharedHooks`
- Isso cria **dependencia bidirecional** (Core → Remote E Remote → Core)
- Com SDK consolidado, SharedHooks via MF é redundante
- **Manter apenas o SDK (`teraprox-core-sdk`) como veículo de sharing**

#### 5.3 Limpar wsProvider nos Remotes
- Após migrar para `useCoreService()`, `wsProvider.js` nos remotes só serve para standalone
- Reduzir para versão mínima (mock controller + noop subscribe)
- Idealmente substituir pelo `StandaloneProvider` do SDK

#### 5.4 Remover _local/ hook pattern
- SGM tem `hooks/defaults/_local/` com fallbacks
- Com SDK unificado, não é mais necessário
- `_local/` files podem ser deletados após migração

---

## Priorização e Roadmap

```
Semana 1-2:   FASE 1 — SDK v0.3.0 (hooks + utils + reducers comuns + contexto unificado)
              ├── 1.1  Migrar hooks genéricos
              ├── 1.2  Migrar utilitários
              ├── 1.3  Migrar reducers comuns
              └── 1.4  Unificar CoreServiceContext (eliminar WebProvider público)

Semana 2-3:   FASE 1.5 — Adoção SDK no SGP
              └── PR substituindo todos os imports locais por imports do SDK

Semana 3-4:   FASE 3 — Runtime padronizado
              ├── 3.1  FederatedBridge no SDK
              ├── 3.2  StandaloneProvider no SDK
              └── 3.3  ReducersBundle factory

Semana 4-7:   FASE 2 — @hashcodeti/ui-kit
              ├── Sprint 1: buttons, forms, modals (10 componentes)
              ├── Sprint 2: table, displays, containers (10 componentes)
              ├── Sprint 3: charts, Date, overlays (10 componentes)
              └── Sprint 4: GenericListScreen, SearchBar, restantes

Semana 7-9:   FASE 4 — Auto-registro de rotas
              ├── Tipo RemoteManifest no SDK
              ├── Manifest em cada remote
              └── MenuBar dinâmico no Core

Contínuo:     FASE 5 — Limpeza de legado
```

---

## Métricas de Sucesso

| Métrica | Antes | Depois |
|---------|-------|--------|
| Arquivos duplicados entre repos | ~150+ | < 10 |
| Linhas de código duplicadas | ~15.000+ | < 1.000 |
| Alterações no Core para nova tela | 2 arquivos | 0 arquivos |
| Tempo de setup novo módulo federado | ~2 dias | ~2 horas |
| Type safety nos contratos | 0% (JS puro) | 100% (TypeScript SDK) |
| Pacotes compartilhados explícitos | 1 (core-sdk) | 3 (core-sdk, ui-kit, federation-runtime) |
| Hooks duplicados across repos | ~25 | 0 |

---

## Guia de Decisão por Camada

```
Preciso adicionar um componente visual (botão, input, modal)?
  → @hashcodeti/ui-kit

Preciso de um hook para HTTP, toast, subscribe, navigate?
  → teraprox-core-sdk (hooks/)

Preciso de um reducer compartilhado (picker, timer, error)?
  → teraprox-core-sdk (reducers/)

Preciso de uma função utilitária (formatDate, validateCPF)?
  → teraprox-core-sdk (utils/)

Preciso de setup de federação (Bridge, Standalone, ReducersBundle)?
  → teraprox-core-sdk (federation/)

Preciso de um componente de negócio específico (RecursoDisplayer)?
  → teraprox-core-sdk (components/)

Preciso de um reducer de DOMÍNIO (ordemDeServico, processo)?
  → FICA NO REMOTE (nunca no SDK)

Preciso de um hook de DOMÍNIO (useOrdemDeServico, useProcesso)?
  → FICA NO REMOTE (nunca no SDK)

Preciso de uma tela/screen?
  → FICA NO REMOTE (exposta via Module Federation)
```

---

## Regras de Ouro (Adotar imediatamente)

1. **NUNCA copie um hook de outro remote.** Se precisa reusar, mova para o SDK.
2. **NUNCA importe diretamente do Core via Module Federation (`teraprox_core/SharedHooks`).** Use o SDK.
3. **NUNCA crie um novo `basicController.js`.** Use `useHttpController(context)` do SDK.
4. **NUNCA crie um novo `wsProvider.js`.** Use `useCoreService()` para subscribe/unsubscribe.
5. **Componentes visuais genéricos vão para `@hashcodeti/ui-kit`.** Componentes de domínio ficam no remote.
6. **Todo novo hook/componente compartilhado deve ser TypeScript** com docs e exports tipados.
7. **Standalone mode usa `StandaloneProvider` do SDK.** Sem provider customizado por remote.
8. **Cada remote exporta `Manifest` com suas rotas.** Core não hardcoda rotas de remotes.

---

## Apêndice A: Diagrama de Dependência Alvo

```
┌─────────────────────────────────────────────────────────┐
│                    teraprox-core (Host)                  │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Auth/Login     │  │ MenuBar      │  │ Redux Store  │ │
│  │ Permissions    │  │ (dinâmico)   │  │ (inject)     │ │
│  │ Firebase RTDB  │  │              │  │              │ │
│  └───────────────┘  └──────────────┘  └──────────────┘ │
│           │                                     │       │
│    CoreServiceContext                    injectReducer   │
│           │                                     │       │
│  ┌────────▼─────────────────────────────────────▼────┐  │
│  │           FederatedBridge (from SDK)               │  │
│  │  Provides: CoreServiceContext → remote components  │  │
│  └────────────────────────┬──────────────────────────┘  │
└───────────────────────────┼──────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐        ┌────▼────┐        ┌────▼────┐
   │  SGM    │        │  SGP    │        │   SS    │
   │ Remote  │        │ Remote  │        │ Remote  │
   └─────────┘        └─────────┘        └─────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
      ┌───────▼──┐   ┌─────▼────┐  ┌─────▼─────┐
      │ core-sdk │   │ ui-kit   │  │ Remote-   │
      │  hooks   │   │ buttons  │  │ specific  │
      │  types   │   │ forms    │  │ reducers  │
      │  utils   │   │ tables   │  │ hooks     │
      │ reducers │   │ modals   │  │ screens   │
      │federation│   │ styles   │  │           │
      └──────────┘   └──────────┘  └───────────┘
```

---

## Apêndice B: Checklist de Migração por Remote

### SGM (Maior esforço — mais duplicação)
- [ ] Substituir `useWebProvider()` por `useCoreService()` (~23 ocorrências)
- [ ] Substituir `basicController` local por `useHttpController()` do SDK
- [ ] Remover `wsProvider.js` — usar `StandaloneProvider` do SDK
- [ ] Deletar `hooks/defaults/_local/` (fallbacks não mais necessários)
- [ ] Migrar `default-components/` para imports de `@hashcodeti/ui-kit`
- [ ] Remover `FederatedBridge.js` local — importar do SDK
- [ ] Converter `reducersBundle.js` para usar `createReducersBundle()` do SDK
- [ ] Remover `StandaloneCoreServiceProvider.js` — usar do SDK
- [ ] Remover `DevAutoLogin.js` — usar template do SDK
- [ ] Remover pacotes legados: `@stomp/stompjs`, `socket.io-client`, etc.

### SGP (Mesmo esforço — ZERO adoção de SDK hoje)
- [ ] Adicionar imports do `teraprox-core-sdk` (hoje: 0 imports)
- [ ] Substituir `useWebProvider()` por `useCoreService()` (todos os hooks)
- [ ] Mesmo checklist do SGM acima
- [ ] Corrigir shared config: `@hashcodeti/core-sdk` → `teraprox-core-sdk` (nome inconsistente)

### Solicitação de Serviço (Menor esforço — já usa SDK)
- [ ] Atualizar `FederatedBridge` para versão do SDK (hoje só marca flag, não injeta contexto)
- [ ] Remover `StandaloneCoreServiceProvider.js` local — usar do SDK
- [ ] Migrar UI components (poucos) para `@hashcodeti/ui-kit`
- [ ] Exportar `Manifest` com rotas

---

## Apêndice C: Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Quebrar standalone mode durante migração | Manter `StandaloneProvider` no SDK com API idêntica ao atual `StandaloneCoreServiceProvider` |
| Incompatibilidade de versão React entre pacotes | Peer dependencies no SDK (não dependencies). Webpack singleton sharing resolve em runtime |
| Migração grande demais, nunca termina | Fazer por módulo: primeiro Solicitação (menor), depois SGM, depois SGP |
| Performance: carregar SDK + ui-kit + remote | Webpack tree-shaking. Pacotes são singleton shared = carregados uma vez pelo Core |
| Devs resistem à mudança | DevShell + StandaloneProvider tornam DX melhor que hoje |
