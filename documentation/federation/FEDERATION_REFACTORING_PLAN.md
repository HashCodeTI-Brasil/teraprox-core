# Plano de Refatoração — Arquitetura de Federação Limpa

> **Objetivo:** Módulos federados (SGP, SGM, SS) são componentes puros de UI + reducers.  
> Todo acesso a backend, providers, e serviços transversais vem exclusivamente do Core.

---

## Princípios

| # | Princípio | Implicação |
|---|-----------|------------|
| 1 | **Federados não conhecem backend** | Zero axios, zero interceptors, zero HTTP factories nos remotes |
| 2 | **Federados exportam apenas reducers** | FederatedBridge injeta contexto; ReducersBundle expõe slices |
| 3 | **Providers vêm do Core** | Toast, Validation, DnD, Redux, WebProvider — tudo do Core |
| 4 | **Contrato tipado via `@hashcodeti/core-sdk`** | Pacote npm TypeScript que define a interface Core↔Federado |

---

## 1. Pacote `@hashcodeti/core-sdk` (npm TypeScript)

### 1.1 Criar o pacote

```
packages/
  core-sdk/
    package.json        # @hashcodeti/core-sdk
    tsconfig.json
    src/
      index.ts          # re-export tudo
      types/
        CoreService.ts  # interface principal
        HttpController.ts
        MatchingObject.ts
        Toast.ts
        Navigation.ts
      hooks/
        useCoreService.ts   # React hook que consome CoreServiceContext
        useHttpController.ts
        useMatchingObject.ts
        useToast.ts
      context/
        CoreServiceContext.ts  # createContext<CoreService>
```

### 1.2 Interface `CoreService` (contrato principal)

```typescript
// types/CoreService.ts

export interface HttpController {
  get(path: string, query?: string): Promise<any>
  post(path: string, data: any, extraHeaders?: Record<string, string>): Promise<any>
  put(path: string, data: any, extraHeaders?: Record<string, string>): Promise<any>
  patch(path: string, data: any, extraHeaders?: Record<string, string>): Promise<any>
  delete(path: string, id: string | number): Promise<any>
  deleteSimple(path: string): Promise<any>
  save(path: string, data: any): Promise<any>
  read(path: string, id: string | number): Promise<any>
  readAll(path: string): Promise<any>
  readAllwithPage(path: string, page: number, size: number): Promise<any>
  bulkDelete(path: string, ids: (string | number)[]): Promise<any>
}

export interface ToastService {
  success(message: string, options?: ToastOptions): void
  warning(message: string, options?: ToastOptions): void
  error(message: string, options?: ToastOptions): void
  info(message: string, options?: ToastOptions): void
}

export interface MatchingObjectSubscription {
  context: string
  location: string
  refresher: (payload: any) => void
  persist?: boolean
}

export interface NavigationService {
  navigate(path: string, state?: any, label?: string): void
  goBack(): void
}

export interface CoreService {
  // HTTP
  createController(context: string, baseEndPoint?: string): HttpController

  // Toast / Notificações
  toast: ToastService

  // Real-time (MatchingObjects)
  subscribe(mo: MatchingObjectSubscription): void
  unsubscribe(mo: MatchingObjectSubscription): void
  subscribeEvent(context: string, location: string, handler: EventListener): void
  unsubscribeEvent(context: string, location: string, handler: EventListener): void

  // Sessão
  handleLogout(): void

  // Metadata
  hostedByCore: boolean
}
```

### 1.3 Hooks do SDK

```typescript
// hooks/useCoreService.ts
import { useContext } from 'react'
import { CoreServiceContext } from '../context/CoreServiceContext'
import type { CoreService } from '../types/CoreService'

export function useCoreService(): CoreService {
  const ctx = useContext(CoreServiceContext)
  if (!ctx) throw new Error('useCoreService must be used within CoreServiceProvider')
  return ctx
}

// hooks/useHttpController.ts
export function useHttpController(context: string, baseEndPoint?: string): HttpController {
  const { createController } = useCoreService()
  return useMemo(() => createController(context, baseEndPoint), [context, baseEndPoint])
}

// hooks/useToast.ts
export function useToast(): ToastService {
  return useCoreService().toast
}

// hooks/useMatchingObject.ts
export function useMatchingObject(
  context: string,
  location: string,
  refresher: (payload: any) => void,
  deps: any[] = []
) {
  const { subscribe, unsubscribe } = useCoreService()
  useEffect(() => {
    const mo = { context, location, refresher }
    subscribe(mo)
    return () => unsubscribe(mo)
  }, [context, location, ...deps])
}
```

### 1.4 Ações de implementação

| # | Ação | Detalhes |
|---|------|----------|
| 1.4.1 | Criar repo ou pasta `packages/core-sdk` | monorepo ou npm separado |
| 1.4.2 | Definir as interfaces TypeScript | `CoreService`, `HttpController`, `ToastService`, `MatchingObjectSubscription` |
| 1.4.3 | Implementar `CoreServiceContext` | `createContext<CoreService \| null>(null)` |
| 1.4.4 | Implementar hooks | `useCoreService`, `useHttpController`, `useToast`, `useMatchingObject` |
| 1.4.5 | Configurar build (tsup/tsc) | Output ESM + CJS para compatibilidade |
| 1.4.6 | Publicar no registry npm | Privado ou GitHub Packages |
| 1.4.7 | Adicionar como shared singleton no Module Federation | Todos os remotes compartilham a mesma instância |

---

## 2. Refatoração do Core

### 2.1 Implementar `CoreServiceProvider`

O Core precisa prover a implementação concreta da interface `CoreService`.

| # | Ação | Arquivo | Detalhes |
|---|------|---------|----------|
| 2.1.1 | Criar `CoreServiceProvider.js` | `src/providers/CoreServiceProvider.js` | Wrapper que pega `useWebProvider()` + `useToasts()` e monta o objeto `CoreService` |
| 2.1.2 | Montar na árvore de providers | `src/bootstrap.js` | Abaixo do `<WebProviderComponent>`, acima do `<App />` |
| 2.1.3 | Expor como shared singleton | `webpack.config.js` | `@hashcodeti/core-sdk: { singleton: true, eager: true }` |

**Implementação:**
```jsx
// src/providers/CoreServiceProvider.js
import { CoreServiceContext } from '@hashcodeti/core-sdk'

export default function CoreServiceProvider({ children }) {
  const wp = useWebProvider()
  const toast = useToasts()

  const value = useMemo(() => ({
    createController: (context, baseEndPoint) => wp.controller(context, baseEndPoint),
    toast: {
      success: (msg, opts) => toast.addToast(msg, { appearance: 'success', autoDismiss: true, ...opts }),
      warning: (msg, opts) => toast.addToast(msg, { appearance: 'warning', autoDismiss: true, ...opts }),
      error:   (msg, opts) => toast.addToast(msg, { appearance: 'error', autoDismiss: true, ...opts }),
      info:    (msg, opts) => toast.addToast(msg, { appearance: 'info', autoDismiss: true, ...opts }),
    },
    subscribe: wp.subscribe,
    unsubscribe: wp.unsubscribe,
    subscribeEvent: wp.subscribeEvent,
    unsubscribeEvent: wp.unsubscribeEvent,
    handleLogout: wp.handleLogout,
    hostedByCore: true,
  }), [wp, toast])

  return (
    <CoreServiceContext.Provider value={value}>
      {children}
    </CoreServiceContext.Provider>
  )
}
```

### 2.2 Simplificar `FederatedComponentHOC`

| # | Ação | Arquivo | Detalhes |
|---|------|---------|----------|
| 2.2.1 | Remover prop `webProvider` | `src/factories/FederatedComponentHOC.js` | Remotes não recebem mais via prop — usam `useCoreService()` |
| 2.2.2 | Manter `BridgeComponent` apenas para reducers | Mesmo arquivo | Bridge só injeta reducers, não contexto HTTP/toast |

### 2.3 Atualizar árvore de providers

```
<Provider store={store}>
  <PersistGate>
    <ToastProvider>
      <ValidateProvider>
        <DndProvider>
          <BrowserRouter>
            <WebProviderComponent>
              <CoreServiceProvider>      ← NOVO
                <App />
              </CoreServiceProvider>
            </WebProviderComponent>
          </BrowserRouter>
        </DndProvider>
      </ValidateProvider>
    </ToastProvider>
  </PersistGate>
</Provider>
```

### 2.4 Atualizar Module Federation shared

| # | Ação | Arquivo |
|---|------|---------|
| 2.4.1 | Adicionar `@hashcodeti/core-sdk` ao `shared` | `webpack.config.js` |

```js
shared: {
  '@hashcodeti/core-sdk': { singleton: true, eager: true, requiredVersion: false },
  // ... demais deps existentes
}
```

---

## 3. Refatoração do SGP (`teraprox-app-sgp`)

### 3.1 Eliminar camadas HTTP próprias

| # | Arquivo a remover/refatorar | Motivo | Ação |
|---|----------------------------|--------|------|
| 3.1.1 | `src/Http/SgpApi.js` | HTTP factory própria com `import { store }` estático | **Deletar** (usado apenas por `basicController.js`) |
| 3.1.2 | `src/Http/basicController.js` | Wrapper sobre `SgpApi.js` | **Deletar** (usado apenas por `useLogin.js`, que é standalone-only) |
| 3.1.3 | `src/Services/http/webInterface.js` | HTTP factory hook com axios.create | **Refatorar**: substituir corpo por wrapper sobre `useCoreService().createController()` |
| 3.1.4 | Instância axios em `wsProvider.js` (`setRestApi`) | HTTP factory dentro do provider | **Remover** — quando hostedByCore, `useCoreService()` substitui |
| 3.1.5 | Instância axios em `Fluxos.js` (L3) | Import direto de axios numa Screen | **Remover** — usar `useHttpController()` |

### 3.2 Eliminar imports estáticos do store

| # | Arquivo | Linha | Ação |
|---|---------|-------|------|
| 3.2.1 | `src/Http/SgpApi.js` | L4 | Deletado (3.1.1) |
| 3.2.2 | `src/websocket/wsProvider.js` | L33 | Mover para React hooks (`useStore()`) ou remover se hosedByCore skipa |
| 3.2.3 | `src/Services/socket/notificationListener.js` | L1 | Mover lógica de notificação para Core |
| 3.2.4 | `src/Services/default/NotificationSGPService.js` | L12 | Mover lógica de notificação para Core |
| 3.2.5 | `src/providers/ReduxPersistProvider.js` | L4 | Standalone-only: guardar com `if (!hostedByCore)` |

### 3.3 Substituir `useToasts()` por `useToast()` do SDK

**42+ arquivos** importam `useToasts` de `react-toast-notifications`.

| # | Categoria | Arquivos | Ação |
|---|-----------|----------|------|
| 3.3.1 | Factories (20) | `CadernosFactory`, `ProcessoFormFactory`, etc. | Remover `import { useToasts }` → Screens internas usam `useToast()` do SDK |
| 3.3.2 | Screens (12) | `OperacaoForm`, `ProcessoForm`, `FluxoDeProcessoForm`, etc. | `import { useToast } from '@hashcodeti/core-sdk'` |
| 3.3.3 | Hooks (6) | `useValidationHook`, `useAnexo`, `useLogin`, etc. | Idem |
| 3.3.4 | Components (7) | `RegistroDeCampoCard`, `FormulaEditor`, etc. | Idem |
| 3.3.5 | HOCs (3) | `withWebContext`, `withGenericPicker`, `withMenuBar` | Idem |

**Migração mecânica:**
```diff
- import { useToasts } from 'react-toast-notifications'
+ import { useToast } from '@hashcodeti/core-sdk'

- const { addToast } = useToasts()
- addToast("Sucesso", { appearance: "success", autoDismiss: true })
+ const toast = useToast()
+ toast.success("Sucesso")
```

### 3.4 Substituir `useWebProvider()` por hooks do SDK

| # | Consumer | Ação |
|---|----------|------|
| 3.4.1 | Screens usando `useWebProvider().controller` | `import { useHttpController } from '@hashcodeti/core-sdk'` |
| 3.4.2 | MatchingObject consumers (10 arquivos) | `import { useMatchingObject } from '@hashcodeti/core-sdk'` |
| 3.4.3 | `useWebProvider().handleLogout` | `import { useCoreService } from '@hashcodeti/core-sdk'` |
| 3.4.4 | `useWebProvider().subscribeEvent/unsubscribeEvent` | SDK hooks |

### 3.5 Simplificar `FederatedBridge.js`

```diff
  export default function FederatedBridge({ webProviderValue, children }) {
      useEffect(() => {
          window.__TERAPROX_HOSTED_BY_CORE__ = true
          return () => { window.__TERAPROX_HOSTED_BY_CORE__ = false }
      }, [])

-     return (
-         <WebProvider.Provider value={webProviderValue}>
-             {children}
-         </WebProvider.Provider>
-     )
+     return <>{children}</>
  }
```

> O `FederatedBridge` mantém apenas o flag `__TERAPROX_HOSTED_BY_CORE__`.  
> Não precisa mais re-prover `WebProvider` — o `CoreServiceContext` já vem do Core.

### 3.6 Mover lógica de notificação para Core

| # | Arquivo SGP | Ação |
|---|-------------|------|
| 3.6.1 | `src/Services/default/NotificationSGPService.js` | **Deletar** — socket.io para notificação é responsabilidade do Core |
| 3.6.2 | `src/Services/socket/notificationListener.js` | **Deletar** — idem |

### 3.7 Simplificar `wsProvider.js` (standalone-only)

| # | Ação |
|---|------|
| 3.7.1 | Quando `hostedByCore === true`: render apenas `<>{children}</>` (sem lógica) |
| 3.7.2 | Manter lógica HTTP e MOs apenas para modo standalone (dev local) |
| 3.7.3 | Remover `import { store }` — usar `useStore()` nos pontos necessários |

### 3.8 Providers standalone condicionais

| # | Provider | Ação |
|---|----------|------|
| 3.8.1 | `ToastProvider` em `bootstrap.js` | `if (!window.__TERAPROX_HOSTED_BY_CORE__) wrap(ToastProvider)` |
| 3.8.2 | `ValidateProvider` em `bootstrap.js` | Idem |
| 3.8.3 | `Redux Provider` em `bootstrap.js` | Idem |
| 3.8.4 | `DndProvider` em `bootstrap.js` | Idem |

### 3.9 Module Federation exposes (limpar)

| # | Ação |
|---|------|
| 3.9.1 | Manter exposes de Screens + `ReducersBundle` + `FederatedBridge` |
| 3.9.2 | Remover exposes de Factories (`CadernosFactory`, `RecursoFormFactory`, `UnidadeFormFactory`) — factories usam `useWebInterface` que será removido; Screens usam `useHttpController()` diretamente |

---

## 4. Refatoração do SGM (`teraprox-app-sgm`)

### 4.1 Eliminar camadas HTTP próprias

| # | Arquivo | Ação |
|---|---------|------|
| 4.1.1 | `src/Http/SgpApi.js` | **Deletar** (legacy, usado só por `basicController.js`) |
| 4.1.2 | `src/Http/basicController.js` | **Deletar** (legacy, usado só por `useLogin.js` standalone) |
| 4.1.3 | `src/websocket/api/httpApiFactory.js` | **Remover** — quando hostedByCore, SDK substitui |
| 4.1.4 | `src/websocket/controllers/basicController.js` | **Remover** — idem |

### 4.2 Eliminar imports estáticos do store

| # | Arquivo | Ação |
|---|---------|------|
| 4.2.1 | `src/Http/SgpApi.js` | Deletado (4.1.1) |
| 4.2.2 | `src/websocket/wsProvider.js` (L30) | Mover para hooks ou remover |
| 4.2.3 | `src/Services/socket/notificationListener.js` | Mover para Core |
| 4.2.4 | `src/Services/default/NotificationSGPService.js` | Mover para Core |

### 4.3 Substituir `useToasts()` por SDK

**15+ arquivos** — mesma migração mecânica do SGP.

| # | Categoria | Arquivos | Ação |
|---|-----------|----------|------|
| 4.3.1 | HOCs (4) | `withWebContext`, `withGenericPicker`, `branchContainer`, `withMenuBar` | `useToast()` do SDK |
| 4.3.2 | Hooks (3) | `useValidationHook`, `useAnexo`, `useLogin` | Idem |
| 4.3.3 | Screens (5) | `OrdensDeServico`, `SolicitacoesDeServico`, `TipoDeOrdemForm`, `FrequenciaForm`, `ExecutarOrdemDeManutencao.backup` | Idem |
| 4.3.4 | Services (1) | `notificationListener` | Mover para Core |

### 4.4 Substituir `useWebProvider()` por hooks do SDK

| # | Consumer | Qtd | Ação |
|---|----------|-----|------|
| 4.4.1 | Services via `useBasicService` | 10 | `useBasicService` internamente chama `useHttpController()` |
| 4.4.2 | Services via `useWebProvider()` direto | 3 | `useHttpController()` |
| 4.4.3 | MatchingObject consumers | 5+ | `useMatchingObject()` do SDK |
| 4.4.4 | HOCs (`branchContainer`, `BranchContainerV2`) | 2 | SDK hooks |

### 4.5 Simplificar `FederatedBridge.js`

Mesmo tratamento do SGP (seção 3.5).

### 4.6 Mover notificação para Core

| # | Arquivo | Ação |
|---|---------|------|
| 4.6.1 | `src/Services/default/NotificationSGPService.js` | **Deletar** |
| 4.6.2 | `src/Services/socket/notificationListener.js` | **Deletar** |

### 4.7 Simplificar `wsProvider.js`

Mesmo tratamento do SGP (seção 3.7).

### 4.8 `useBasicService` → wrapper sobre SDK

O SGM tem um hook `useBasicService` que 10 services usam. Refatorar para usar o SDK:

```diff
// hooks/defaults/useBasicService.js
- import { useWebProvider } from './useWebProvider'
+ import { useHttpController } from '@hashcodeti/core-sdk'

  export function useBasicService(context, baseEndPoint) {
-   const { controller } = useWebProvider()
-   return useMemo(() => controller(context, baseEndPoint), [context, baseEndPoint])
+   return useHttpController(context, baseEndPoint)
  }
```

### 4.9 Providers standalone condicionais

Mesmo tratamento do SGP (seção 3.8).

---

## 5. Refatoração do Solicitação de Serviço (`teraprox-app-solicitacao-de-servico`)

### 5.1 Estado atual

O SS já é o mais limpo — axios é standalone-only, sem imports estáticos do store problemáticos.

### 5.2 Ações necessárias

| # | Ação | Detalhes |
|---|------|----------|
| 5.2.1 | Substituir `useToasts()` (3 arquivos) | `withWebContext.js`, `SolicitacaoDeServicoForm.js`, `SolicitacoesDeServico.js` → `useToast()` do SDK |
| 5.2.2 | Substituir `useWebProvider()` | Para `useCoreService()` / `useHttpController()` do SDK |
| 5.2.3 | Simplificar `FederatedBridge.js` | Manter apenas flag (seção 3.5) |
| 5.2.4 | Providers condicionais em `bootstrap.js` | `ToastProvider` etc. |
| 5.2.5 | Adicionar `@hashcodeti/core-sdk` ao shared | `webpack.config.js` |

---

## 6. Ordem de Execução

### Fase 1 — Fundação (sem breaking changes)
| Step | Ação | Risco |
|------|------|-------|
| 1 | Criar pacote `@hashcodeti/core-sdk` com interfaces + hooks + contexto | Zero — aditivo |
| 2 | Implementar `CoreServiceProvider` no Core | Zero — aditivo |
| 3 | Adicionar `@hashcodeti/core-sdk` ao shared do webpack (Core + remotes) | Zero — aditivo |
| 4 | Publicar v0.1.0 do SDK | Zero |

### Fase 2 — Migração gradual (um remote por vez)
| Step | Ação | Risco |
|------|------|-------|
| 5 | **SS** — migrar 3 telas (menor superfície, valida o pattern) | Baixo |
| 6 | **SGM** — migrar `useBasicService` (10 services migram automaticamente) | Médio |
| 7 | **SGM** — migrar toasts e MOs restantes | Médio |
| 8 | **SGP** — migrar `useWebInterface` → SDK | Médio |
| 9 | **SGP** — migrar toasts, MOs, factories | Médio-Alto |

### Fase 3 — Cleanup
| Step | Ação | Risco |
|------|------|-------|
| 10 | Deletar `SgpApi.js`, `basicController.js`, `httpApiFactory.js` dos remotes | Baixo (já não usados) |
| 11 | Simplificar `wsProvider.js` dos remotes (standalone-only) | Baixo |
| 12 | Deletar `NotificationSGPService.js` e `notificationListener.js` dos remotes | Baixo |
| 13 | Simplificar `FederatedBridge.js` | Baixo |
| 14 | Remover `WebProvider` re-providing do Bridge | Baixo |

### Fase 4 — Validação
| Step | Ação |
|------|------|
| 15 | Testar todas as telas federadas em produção |
| 16 | Testar modo standalone de cada remote (dev local) |
| 17 | Verificar token refresh, 401 retry, MOs em tempo real |

---

## 7. Inventário de arquivos afetados

### Core (5 arquivos novos/modificados)
| Arquivo | Ação |
|---------|------|
| `src/providers/CoreServiceProvider.js` | **CRIAR** |
| `src/bootstrap.js` | Adicionar `<CoreServiceProvider>` |
| `src/factories/FederatedComponentHOC.js` | Remover prop `webProvider` |
| `webpack.config.js` | Adicionar `@hashcodeti/core-sdk` ao shared |
| `package.json` | Adicionar `@hashcodeti/core-sdk` como dependência |

### SGP (70+ arquivos modificados)
| Categoria | Qtd | Ação principal |
|-----------|-----|----------------|
| HTTP factories (deletar) | 3 | `SgpApi.js`, `basicController.js`, `webInterface.js` (refatorar) |
| Notification (deletar) | 2 | `NotificationSGPService.js`, `notificationListener.js` |
| Toast migration | 42 | `useToasts` → `useToast()` |
| WebProvider migration | 50+ | `useWebProvider()` → hooks do SDK |
| MatchingObject migration | 10 | `useMatchingObject` → SDK |
| Providers | 2 | `bootstrap.js`, `ReduxPersistProvider.js` |
| FederatedBridge | 1 | Simplificar |
| wsProvider | 1 | Standalone-only |
| Config | 2 | `config-overrides.js`, `package.json` |

### SGM (40+ arquivos modificados)
| Categoria | Qtd | Ação principal |
|-----------|-----|----------------|
| HTTP factories (deletar) | 4 | `SgpApi.js`, `basicController.js`, `httpApiFactory.js`, `controllers/basicController.js` |
| Notification (deletar) | 2 | `NotificationSGPService.js`, `notificationListener.js` |
| Toast migration | 15 | `useToasts` → `useToast()` |
| Service layer | 10 | Via `useBasicService` refactor (1 arquivo, 10 consumers migram) |
| WebProvider migration | 15+ | `useWebProvider()` → SDK hooks |
| MatchingObject migration | 5 | SDK hooks |
| Providers | 1 | `bootstrap.js` |
| FederatedBridge | 1 | Simplificar |
| wsProvider | 1 | Standalone-only |
| Config | 2 | `config-overrides.js`, `package.json` |

### SS (8 arquivos modificados)
| Categoria | Qtd | Ação |
|-----------|-----|------|
| Toast | 3 | `useToasts` → `useToast()` |
| WebProvider | 2 | → SDK hooks |
| FederatedBridge | 1 | Simplificar |
| Config | 2 | `webpack.config.js`, `package.json` |

---

## 8. Resultado final esperado

### Um módulo federado ideal:

```
remote-app/
  src/
    federation/
      FederatedBridge.js      # Apenas window.__TERAPROX_HOSTED_BY_CORE__ flag
      reducersBundle.js       # Exporta reducers para Core injetar
    Reducers/                 # Slices Redux (state local do módulo)
    Screens/                  # Componentes de UI puros
    Components/               # Componentes reutilizáveis
    hooks/                    # Hooks de UI (useForm, useFilter, etc.)
    models/                   # Constantes, tipos, IDs de rotas
    Hocs/                     # HOCs de UI (withPermission, etc.)
    bootstrap.js              # Standalone-only: monta providers locais
    store.js                  # Standalone-only: Redux store local
```

### O que NÃO existe mais no remote:
- ❌ `Http/SgpApi.js`
- ❌ `Http/basicController.js`
- ❌ `Services/http/webInterface.js` (ou é wrapper fino sobre SDK)
- ❌ `websocket/api/httpApiFactory.js`
- ❌ `Services/socket/notificationListener.js`
- ❌ `Services/default/NotificationSGPService.js`
- ❌ Import direto de `axios`
- ❌ Import estático de `store`
- ❌ Import de `react-toast-notifications`
- ❌ Interceptors HTTP (token, retry, toast, MO)
- ❌ Lógica de socket.io

### O que o remote usa:
- ✅ `import { useHttpController, useToast, useMatchingObject, useCoreService } from '@hashcodeti/core-sdk'`
- ✅ Redux reducers próprios (exportados via `ReducersBundle`)
- ✅ Componentes de UI puros
- ✅ Hooks de UI locais
