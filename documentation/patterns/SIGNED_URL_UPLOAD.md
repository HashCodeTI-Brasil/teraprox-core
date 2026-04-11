# Migração de Upload de Anexos — Signed URL (Abordagem B)

> **Objetivo:** Substituir o upload via multipart/form-data (que passa pelo Cloud Run)
> por upload direto ao GCS via Signed URL, reduzindo uso de memória/CPU e suportando arquivos maiores.

---

## 1. Problema Atual

```
Browser ──multipart──▶ Gateway ──proxy──▶ API (Cloud Run) ──buffer──▶ GCS
                                             ▲
                                        multer.memoryStorage()
                                        (arquivo inteiro em RAM)
```

| Problema | Impacto |
|----------|---------|
| Buffer inteiro na memória do Cloud Run | Timeout/OOM para arquivos > 32MB |
| Upload bloqueante | UX travada durante transmissão |
| Tráfego desnecessário pelo Gateway/API | Custo de egress + latência |
| Sem barra de progresso real | Usuário não sabe se está funcionando |

---

## 2. Solução: Upload via Signed URL

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FLUXO SIGNED URL                            │
│                                                                     │
│  1. Salva entidade ──────▶ API ──▶ DB (retorna ID)                 │
│                                                                     │
│  2. Pede signed URL ─────▶ API ──▶ GCSStorageProvider.buildKey()   │
│                                    GCSStorageProvider               │
│                                      .getSignedUploadUrl()          │
│                                  ◀── { key, uploadUrl }             │
│                                                                     │
│  3. Upload direto ───────▶ GCS (PUT com signed URL)                │
│     (browser → bucket)      ↑ sem passar pela API                  │
│     (barra de progresso)                                            │
│                                                                     │
│  4. Confirma metadado ───▶ API ──▶ DB (salva registro na           │
│                                        tabela "anexo")              │
│                                  ──▶ MatchingObject (sync)          │
└─────────────────────────────────────────────────────────────────────┘
```

### Resumo dos passos

| Passo | Quem | O que faz |
|-------|------|-----------|
| 1 | Frontend | Salva a entidade principal (OS, SS, Tarefa, Inspeção) — recebe o ID |
| 2 | Frontend → API | `POST /anexo/requestUpload` com `{ dataContext, dataId, fileName, contentType }` |
| 3 | API | Gera `key` via `GCSStorageProvider.buildKey()` e `uploadUrl` via `getSignedUploadUrl()` |
| 4 | Frontend → GCS | `PUT uploadUrl` com o arquivo binário (direto browser → bucket) |
| 5 | Frontend → API | `POST /anexo/confirmUpload` com `{ key, dataContext, dataId, originalName, contentType, size }` |
| 6 | API | Valida que o arquivo existe no GCS (`storage.exists(key)`) e salva metadado no banco |

---

## 3. O que já existe (pronto para uso)

| Componente | Local | Status |
|------------|-------|--------|
| `GCSStorageProvider.buildKey()` | `onRoad/src/inner_configs/gcsStorageProvider.js` | ✅ Pronto |
| `GCSStorageProvider.getSignedUploadUrl()` | `onRoad/src/inner_configs/gcsStorageProvider.js` | ✅ Pronto |
| `GCSStorageProvider.exists()` | `onRoad/src/inner_configs/gcsStorageProvider.js` | ✅ Pronto |
| `GCSStorageProvider.getSignedUrl()` (leitura) | `onRoad/src/inner_configs/gcsStorageProvider.js` | ✅ Pronto |
| Bucket Terraform com lifecycle + IAM | `teraprox-terraform/environments/production/storage.tf` | ✅ Pronto |
| `AnexoRepository` (schema DB) | `teraprox-api-manutencao/repository/AnexoRepository.js` | ✅ Pronto |
| `AnexoService.create()` | `teraprox-api-manutencao/service/AnexoService.js` | ✅ Pronto |
| `useAnexo` hook (compressão de imagem) | `teraprox-app-sgm/src/hooks/defaults/useAnexo.js` | ✅ Pronto |
| `GenericImageAttachment` (UI) | `teraprox-app-sgm/src/Components/default-components/buttons/GenericImageAttachment.js` | ✅ Pronto |

---

## 4. O que precisa ser implementado

### 4.1 CORS do Bucket (Terraform) — Adicionar PUT

O CORS atual do bucket só permite `GET` e `HEAD`. Para upload via signed URL do browser, o `PUT` precisa ser adicionado.

**Arquivo:** `teraprox-terraform/environments/production/storage.tf`

```diff
  cors {
    origin          = ["*"]
-   method          = ["GET", "HEAD"]
-   response_header = ["Content-Type", "Content-Disposition"]
+   method          = ["GET", "HEAD", "PUT"]
+   response_header = ["Content-Type", "Content-Disposition", "Content-Length"]
    max_age_seconds = 3600
  }
```

### 4.2 Backend — Novas rotas no `AnexoController`

**Arquivo:** `teraprox-api-manutencao/controller/AnexoController.js`

Duas novas rotas:

| Rota | Método | Payload | Retorno |
|------|--------|---------|---------|
| `/anexo/requestUpload` | POST | `{ dataContext, dataId, fileName, contentType }` | `{ key, uploadUrl }` |
| `/anexo/confirmUpload` | POST | `{ key, dataContext, dataId, originalName, contentType, size }` | `{ success, anexo }` |

### 4.3 Backend — Novos métodos no `AnexoService`

**Arquivo:** `teraprox-api-manutencao/service/AnexoService.js`

```
requestUpload(dataContext, dataId, fileName, contentType)
  → GCSStorageProvider.buildKey(tenant, dataContext, fileName)
  → GCSStorageProvider.getSignedUploadUrl(key, contentType)
  → retorna { key, uploadUrl }

confirmUpload(key, dataContext, dataId, originalName, contentType, size)
  → GCSStorageProvider.exists(key)  // validação de segurança
  → this.create({ key, dataContext, dataId, originalName, contentType, size, ... })
  → retorna anexo criado
```

### 4.4 Frontend — Novo hook `useSignedUpload`

**Arquivo:** `teraprox-app-sgm/src/hooks/defaults/useSignedUpload.js`

Hook centralizado que:
1. Pede signed URL ao backend
2. Faz `PUT` direto ao GCS via `XMLHttpRequest` (para progresso)
3. Confirma o upload no backend
4. Expõe `{ progress, uploading, error, uploadFile }`

### 4.5 Frontend — Adaptar `GenericImageAttachment` e `useAnexo`

Os componentes e hooks existentes chamam `onUpload(file)` que dispara o fluxo antigo via `toFormData` + multipart. A mudança será:

- `useAnexo.adicionarAnexo()` → em vez de só armazenar o `File`, dispara `useSignedUpload.uploadFile()`
- `GenericImageAttachment` → recebe `{ dataContext, dataId }` como props para saber a que entidade associar
- O callback `onUpload` dos componentes (`TarefaItem`, `InspecoesList`, etc.) passa a receber `{ dataContext, dataId }` em vez de montar `FormData`

### 4.6 Frontend — Eliminar fluxo antigo (multipart)

Funções que serão substituídas pelo novo fluxo:

| Arquivo | Função | Substituição |
|---------|--------|-------------|
| `ordemDeServicoService.js` | `putAnexos(osId, anexos)` | `useSignedUpload` |
| `tarefaService.js` | `putAnexoTarefa(id, anexoData)` | `useSignedUpload` |
| `inspecaoService.js` | `putAnexoInspecao(id, anexoData)` | `useSignedUpload` |
| `useOrdemDeServico.js` | `inserirAnexoOS(id, anexos)` | `useSignedUpload` |

### 4.7 Download/Visualização — Migrar de WhaleTamer para Signed URL

O download/visualização atual usa `endPointWhaleTamer` (serviço legado S3). Agora usaremos `signedUrl` do GCS, que o `AnexoService.read()` já devolve no campo `signedUrl`.

**Impacto:**
- `GenericImageAttachment` → parar de usar `endPointWhaleTamer` e usar `signedUrl` do objeto
- `ImageViewModal` → mesmo ajuste

---

## 5. Tratamento de Arquivos Órfãos

Se o upload ao GCS (passo 4) ocorrer mas o `confirmUpload` (passo 5) falhar:
- O arquivo fica no bucket sem registro no banco
- **Solução:** O bucket já tem lifecycle rules (Terraform) que deletam após 5 anos
- **Otimização futura:** Cloud Function com trigger `finalize` que verifica se o metadado existe no banco após X minutos e deleta se órfão

---

## 6. Escopo por API

| API | Entidades com anexo | Impacto |
|-----|---------------------|---------|
| `api-manutencao` | OrdemDeServico, Tarefa, Inspeção, SolicitaçãoDeServiço | Principal |
| `api-processo` | Caderno, Etapa | Mesma estrutura — herda `AnexoService` |

Ambas as APIs já importam `GCSStorageProvider` do onRoad e têm `AnexoService/AnexoRepository` com schema idêntico.

---

## 7. Ordem de Execução

```
Passo 1 │ Terraform — CORS: adicionar PUT            │ infra
Passo 2 │ AnexoService — requestUpload + confirmUpload│ api-manutencao + api-processo
Passo 3 │ AnexoController — novas rotas               │ api-manutencao + api-processo
Passo 4 │ useSignedUpload — hook do frontend           │ teraprox-app-sgm
Passo 5 │ GenericImageAttachment — adapter             │ teraprox-app-sgm
Passo 6 │ Substituir putAnexos/putAnexoTarefa etc.     │ teraprox-app-sgm
Passo 7 │ Migrar download de WhaleTamer → signedUrl    │ teraprox-app-sgm
Passo 8 │ Replicar passos 4-7 no app-solicitacao-de-servico (se aplicável)
```

---

## 8. Pré-requisitos para funcionar

| Requisito | Como verificar |
|-----------|---------------|
| Tabela `anexo` existe no banco de cada tenant | `syncDb()` com `alter: true` roda no boot do onRoad |
| `GCS_BUCKET` configurado como env var no Cloud Run | `echo $GCS_BUCKET` no container |
| IAM `objectAdmin` no bucket | Já no Terraform (`cloudrun_object_admin`) |
| IAM `serviceAccountTokenCreator` | Já no Terraform (`cloudrun_sign_blob`) |
| CORS com `PUT` no bucket | **Pendente — passo 1** |
