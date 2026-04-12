# teraprox-core-sdk

> Contrato tipado Core ↔ Federados — interfaces, context, hooks e componentes compartilhados.

---

## Índice

1. [Visão geral](#visão-geral)
2. [Instalação](#instalação)
3. [Modo Standalone (`StandaloneProvider`)](#modo-standalone-standaloneprovider)
   - [Setup mínimo](#setup-mínimo)
   - [Toast: `toast` vs `addToast`](#toast-toast-vs-addtoast)
   - [RTDB em tempo real](#rtdb-em-tempo-real)
   - [Resolução automática do tenant](#resolução-automática-do-tenant)
   - [Emulador vs Firebase Cloud](#emulador-vs-firebase-cloud)
   - [Fallback controllers (dev)](#fallback-controllers-dev)
4. [Modo Hospedado (`FederatedBridge`)](#modo-hospedado-federatedbridge)
5. [CoreServiceBuilder (programático)](#coreservicebuilder-programático)
6. [Hooks](#hooks)
   - [`useCoreService`](#usecoreservice)
   - [`useMatchingObject`](#usematchingobject)
   - [`useHttpController` / `useFetchData` / `usePostData`](#usehttpcontroller--usefetchdata--usepostdata)
   - [`useAnexoManager`](#useanexomanager)
   - [`useToast`](#usetoast)
7. [DevAutoLogin](#devautologin)
8. [Fluxo RTDB ponta a ponta](#fluxo-rtdb-ponta-a-ponta)
9. [Variáveis de ambiente](#variáveis-de-ambiente)
10. [Tipos exportados](#tipos-exportados)
11. [CHANGELOG](#changelog)

---

## Visão geral

O `teraprox-core-sdk` é o contrato compartilhado entre o **shell Core** e os **microfrontends federados** (SGM-SS, SGM-OM, SGP etc.).

Ele provê:

| Camada | O que entrega |
|--------|--------------|
| **Contexto** | `CoreServiceContext` — acesso a `createController`, `toast`, `subscribe`/`unsubscribe` |
| **Standalone** | `StandaloneProvider` — modo dev/autônomo com Firebase RTDB integrado |
| **Hospedado** | `FederatedBridge` — ponte que injeta o `CoreService` provido pelo shell |
| **Hooks** | `useMatchingObject`, `useAnexoManager`, `useFetchData`, `usePostData`, `useToast`… |
| **Builder** | `CoreServiceBuilder` — construção programática do `CoreService` |
| **Tipos** | Interfaces para `CoreService`, `HttpController`, `ToastService`, `IAnexoPort`… |

---

## Instalação

```bash
npm install teraprox-core-sdk
# ou, a partir do monorepo local:
npm install file:../../packages/core-sdk
```

---

## Modo Standalone (`StandaloneProvider`)

Use quando o microfrontend roda de forma **autônoma** (`npm start`) fora do shell Core.

### Setup mínimo

```tsx
// App.tsx
import { StandaloneProvider } from 'teraprox-core-sdk/federation'
import { FetchHttpAdapter }    from 'teraprox-core-sdk'
import { useSelector }         from 'react-redux'

const API = process.env.REACT_APP_API_URL || 'http://localhost:4021'

function makeController(context: string, baseEndPoint?: string) {
  const ep = baseEndPoint ?? (context ? `${API}/${context}` : API)
  return new FetchHttpAdapter(ep, { 'x-teraprox-host': 'manutencao' })
}

// Wrapper dentro do Redux Provider
function StandaloneWrapper({ children }: { children: React.ReactNode }) {
  const tenant = useSelector((s: any) => s.global?.companyId)

  return (
    <StandaloneProvider
      createController={makeController}
      toast={myToastService}
      tenant={tenant}
    >
      {children}
    </StandaloneProvider>
  )
}
```

> **Importante:** `StandaloneWrapper` deve ser renderizado **dentro** do `Redux Provider`
> para que `useSelector` funcione. Coloque-o acima do `RouterProvider`.

---

### Toast: `toast` vs `addToast`

O provider aceita dois formatos — **prefira `toast`**:

```tsx
// ✅ Preferido — passa ToastService diretamente (sem bridge)
<StandaloneProvider toast={minhaImplementacaoDeToast} ...>

// ✅ Compatibilidade — react-toast-notifications
<StandaloneProvider addToast={addToast} ...>

// Se nenhum for passado, chamadas de toast vão para console.warn em dev.
```

**Implementando `ToastService`:**

```ts
import type { ToastService } from 'teraprox-core-sdk'

class DomToastAdapter implements ToastService {
  success(msg: string) { /* renderiza toast verde */ }
  warning(msg: string) { /* renderiza toast amarelo */ }
  error(msg: string)   { /* renderiza toast vermelho */ }
  info(msg: string)    { /* renderiza toast azul */ }
}
```

---

### RTDB em tempo real

Quando `tenant` está resolvido, o `StandaloneProvider` conecta ao Firebase RTDB e
despacha eventos para os listeners registrados via `useMatchingObject`.

```tsx
// Escuta mudanças em tempo real de uma entidade específica
import { useMatchingObject } from 'teraprox-core-sdk'

useMatchingObject('solicitacaoDeServico', '*', (payload) => {
  // payload = id da entidade que mudou
  fetchById(payload).then(dispatch)
})
```

O listener recebe apenas o `id` afetado e faz um `GET` pontual —
**atualização granular**, sem refetch da lista inteira.

---

### Resolução automática do tenant

O tenant identifica o caminho no RTDB: `{tenant}/matchingObjects`.

**Ordem de prioridade (primeira que tiver valor):**

| # | Fonte | Quando usar |
|---|-------|-------------|
| 1 | `tenant` prop | Dinâmico — vem do Redux após login (`state.global.companyId`) |
| 2 | `REACT_APP_RTDB_TENANT` no `.env` | Estático — garante conexão imediata no boot, antes do Redux |
| 3 | `'dev-local'` (automático) | Último recurso em `NODE_ENV=development`, zero configuração |

**Configuração recomendada para dev:**

```dotenv
# .env do microfrontend
REACT_APP_RTDB_TENANT=1   # deve bater com o companyId do DevAutoLogin / API local
```

> Em produção o tenant **sempre** vem do Redux (login real). Os fallbacks 2 e 3
> são ignorados quando `NODE_ENV=production`.

Se o tenant não resolver em 5 s, um `console.warn` explica o problema e como corrigir.

---

### Emulador vs Firebase Cloud

**Resolução do emulador (mesma lógica de prioridade):**

| # | Fonte | Exemplo |
|---|-------|---------|
| 1 | `emulator` prop | `{ host: 'localhost', port: 9000, namespace: 'teraprox-default-rtdb' }` |
| 2 | `REACT_APP_RTDB_EMULATOR_HOST` env var | `localhost:9000` |
| 3 | Auto-probe `localhost:9000` | Detecta se o emulador está rodando |
| 4 | `firebaseConfig` prop | Objeto de config do Firebase Cloud |
| — | Nenhum encontrado | Popup de aviso em dev |

**Emulador Docker (recomendado para dev):**

```tsx
// App.tsx — configuração explícita via prop (mais confiável que env var em node_modules)
<StandaloneProvider
  createController={makeController}
  toast={domToast}
  tenant={tenant}
  emulator={{ host: 'localhost', port: 9000, namespace: 'teraprox-default-rtdb' }}
>
```

```dotenv
# .env — alternativa via variável (lida pelo bundler na app, não no node_modules)
REACT_APP_RTDB_EMULATOR_HOST=localhost:9000
REACT_APP_RTDB_EMULATOR_NS=teraprox-default-rtdb
```

> **Nota sobre `process.env.*` em `node_modules`:** webpack's `DefinePlugin` pode não
> substituir variáveis dentro de dependências. Prefira sempre o **prop explícito** para
> garantir funcionamento (tanto para `emulator` quanto para `tenant`).

---

### Fallback controllers (dev)

Use para simular endpoints que não existem localmente:

```tsx
import { NullHttpController } from 'teraprox-core-sdk'

class ArvoreEstruturalFallback extends NullHttpController {
  get(path?: string) {
    if (path?.includes('branchByBranchLevel')) {
      return Promise.resolve([
        { id: 1, branchLevel: { level: 1, nome: 'Empresa' }, branchNodes: [] }
      ])
    }
    return super.get(path)
  }
}

function makeController(context: string, baseEndPoint?: string) {
  // Intercepta contextos específicos antes de chegar ao HTTP
  if (process.env.NODE_ENV !== 'production') {
    if (context === '')            return new ArvoreEstruturalFallback()
    if (context === 'branchLevel') return new BranchLevelFallback()
  }
  const ep = baseEndPoint ?? `${API}/${context}`
  return new FetchHttpAdapter(ep, { 'x-teraprox-host': 'manutencao' })
}
```

---

## Modo Hospedado (`FederatedBridge`)

Quando o microfrontend é carregado pelo **shell Core**, ele recebe o `CoreService` via
Module Federation. Use o `FederatedBridge` para injetar esse serviço no contexto:

```tsx
// O shell Core passa o CoreService por prop ou window
import { FederatedBridge } from 'teraprox-core-sdk/federation'

function RemoteRoot({ coreService }: { coreService: CoreService }) {
  return (
    <FederatedBridge coreService={coreService}>
      <App />
    </FederatedBridge>
  )
}
```

> `FederatedBridge` é o oposto do `StandaloneProvider` — não conecta ao RTDB
> (o shell já faz isso), apenas injeta o `CoreService` no contexto.

---

## CoreServiceBuilder (programático)

Útil para **testes** ou quando um componente React não é viável:

```ts
import { CoreServiceBuilder, FetchHttpAdapter } from 'teraprox-core-sdk'

const service = new CoreServiceBuilder()
  .withHttpEndpoint('http://localhost:4021')
  .withGatewayHost('manutencao')
  .withToast(myToast)
  .withTracing(true)          // adiciona header traceparent W3C
  .withFallbackController('', new ArvoreFallback())
  .build()
```

O `.build()` retorna um `CoreService` com `subscribe`/`unsubscribe` **funcionais**
(armazenam as subscriptions numa lista interna), prontos para serem consumidos por
`useMatchingObject`. **Não conecta ao RTDB por si só** — para RTDB em standalone,
use `StandaloneProvider`.

---

## Hooks

### `useCoreService`

Acessa o `CoreService` do contexto. Deve estar dentro de `StandaloneProvider` ou `FederatedBridge`.

```ts
const { createController, toast, subscribe, unsubscribe } = useCoreService()
```

---

### `useMatchingObject`

Registra um listener de tempo real com cleanup automático.

```ts
import { useMatchingObject } from 'teraprox-core-sdk'

// Dentro de um componente:
useMatchingObject(
  'solicitacaoDeServico',  // context — deve bater com o model do MatchingObject no backend
  '*',                     // location — '*' captura qualquer target
  (payload) => {
    // payload = data do MatchingObject (geralmente o id da entidade)
    fetchSolicitacao(payload).then(dispatch)
  },
  [dispatch]               // deps extras para o useEffect interno
)
```

**Por que `useMatchingObject` e não `subscribe` manual?**

- Registra e **remove** automaticamente no unmount (evita leak de memória)
- É seguro com React StrictMode (dupla montagem não duplica listeners)
- Expressivo: deixa explícito o contexto que o componente observa

---

### `useHttpController` / `useFetchData` / `usePostData`

```ts
// Acesso direto ao controller
const controller = useHttpController('solicitacaoDeServico')

// GET com loading state
const { data, loading, error, refetch } = useFetchData('solicitacaoDeServico')

// POST com loading state
const { post, loading } = usePostData('solicitacaoDeServico')
```

---

### `useAnexoManager`

Gerencia o ciclo completo de anexos com upload direto ao GCS via signed URLs.

```ts
const anexo = useAnexoManager({
  entityId: form?.id,               // id da entidade dona dos anexos
  context:  'solicitacaoDeServico', // context para o path no GCS
  port:     'anexo',                // controller que expõe /intent, /confirm, etc.
})

// Uso:
anexo.addLocal(files)               // adiciona arquivos locais (sem upload ainda)
await anexo.uploadAll(entityId)     // faz intent → upload GCS → confirm para cada arquivo
anexo.locais                        // AnexoLocal[] — arquivos ainda não enviados
anexo.persistidos                   // AnexoPersistido[] — já salvos na API
```

**Fluxo de upload:**

```
addLocal(File[])
    ↓
uploadAll(entityId)
    ├─ POST /anexo/intent      → { uploadUrl, key, fileName, contentType }
    ├─ PUT uploadUrl (GCS)     → upload direto (sem passar pela API)
    └─ POST /anexo/confirm     → registra o anexo no banco
```

---

### `useToast`

```ts
const toast = useToast()

toast.success('Salvo com sucesso!')
toast.warning('Verifique os campos obrigatórios.')
toast.error('Erro ao salvar.')
toast.info('Processando...')
```

---

## DevAutoLogin

Popula automaticamente o Redux com um usuário de dev em `NODE_ENV=development`.
Não faz nada em produção nem quando o microfrontend está hospedado pelo shell Core.

```tsx
import { DevAutoLogin } from 'teraprox-core-sdk/federation'
import { logIn, setCompany } from './Reducers/globalConfigReducer'

<DevAutoLogin actions={{ logIn, setCompany }}>
  <App />
</DevAutoLogin>
```

**Usuário padrão injetado:**

```ts
{
  id: '1', companyId: '1', role: 'admin',
  firstName: 'Dev', lastName: 'User',
  setor: 'Desenvolvimento', ...
}
```

Para sobrescrever campos específicos:

```tsx
<DevAutoLogin
  actions={{ logIn, setCompany }}
  devUser={{ companyId: 'minha-empresa', role: 'operator' }}
>
```

---

## Fluxo RTDB ponta a ponta

```
Backend (API)
  sentinel.appendMo(new MatchingObject('solicitacaoDeServico', '*', id))
        ↓  (buffer durante a request)
  afterCommit → publishMatchingObjects(tenant, mos)
        ↓
Firebase RTDB push em: {tenant}/matchingObjects
        ↓
Frontend (StandaloneProvider)
  onChildAdded('{tenant}/matchingObjects')
        ↓
  Encontra subscribers com context='solicitacaoDeServico' e location='*'
        ↓
  refresher(payload=id)
        ↓
  GET /solicitacaoDeServico/:id  →  dispatch(updateSingleSsRow(ss))
        ↓
  Apenas a linha afetada é atualizada na UI — sem refetch da lista completa
```

---

## Variáveis de ambiente

Coloque no `.env` de cada microfrontend:

```dotenv
# Endpoint da API principal
REACT_APP_API_URL=http://localhost:4021

# Gateway host (header x-teraprox-host)
REACT_APP_TERAPROX_GATEWAY_HOST=manutencao

# ── RTDB ─────────────────────────────────────────────────────────────────────

# Tenant padrão para dev — deve bater com o companyId da API local.
# Garante que o RTDB conecta no boot, antes do Redux ser populado.
# Em produção é ignorado (tenant vem do Redux após login real).
REACT_APP_RTDB_TENANT=1

# Emulador Firebase RTDB (Docker / firebase-tools)
REACT_APP_RTDB_EMULATOR_HOST=localhost:9000
REACT_APP_RTDB_EMULATOR_NS=teraprox-default-rtdb
```

> **Nota:** variáveis `REACT_APP_RTDB_*` são substituídas pelo webpack `DefinePlugin`
> **no código da app**, mas podem não ser resolvidas dentro de `node_modules`.
> Para garantir, passe os valores como **props explícitas** ao `StandaloneProvider`:
>
> ```tsx
> <StandaloneProvider
>   emulator={{ host: 'localhost', port: 9000, namespace: 'teraprox-default-rtdb' }}
>   tenant={tenant ?? process.env.REACT_APP_RTDB_TENANT}
>   ...
> >
> ```

---

## Tipos exportados

```ts
import type {
  CoreService,                  // interface principal do serviço
  HttpController,               // interface de controllers HTTP
  ToastService,                 // interface de toast
  MatchingObjectSubscription,   // { context, location, refresher }
  IAnexoPort,                   // interface para gerenciamento de anexos
  AnexoPersistido,              // anexo já salvo na API
  AnexoLocal,                   // arquivo local ainda não enviado
  UploadIntent,                 // resposta do /anexo/intent
  IObservabilityPort,           // interface de observabilidade
} from 'teraprox-core-sdk'
```

---

## CHANGELOG

### 0.3.12
- **`StandaloneProvider`**: aceita `toast?: ToastService` diretamente (sem necessidade de bridge `addToast`)
- **`StandaloneProvider`**: resolução automática do tenant em 3 camadas (`tenant` prop → `REACT_APP_RTDB_TENANT` → `'dev-local'`)
- **`StandaloneProvider`**: aviso de `console.warn` após 5 s quando tenant não resolve
- **`CoreServiceBuilder`**: `subscribe`/`unsubscribe` armazenam subscriptions corretamente (não são mais stubs)

### 0.3.x
- `useAnexoManager`: suporte a `overrideEntityId` em `uploadAll(entityId?)` para entidades recém-criadas
- `FetchHttpAdapter`: tratamento correto de `FormData` vs JSON no body
- `TracingHttpAdapter`: injeção automática do header `traceparent` W3C
- `StandaloneProvider`: auto-detecção do emulador RTDB com probe em `localhost:9000`
- `DevAutoLogin`: suporte a `devUser` parcial para sobrescrever campos do usuário dev
- Hooks: `useFetchData`, `usePostData`, `useFormStorage`, `useSmartSearch`, `useValidation`
