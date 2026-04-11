# Planejamento: WebSocket, Firebase RTDB e Mensageria RabbitMQ

> Data: 2026-03-28  
> Escopo: teraprox-core (host MF), teraprox-app-sgm, teraprox-app-sgp, teraprox-mbudy

---

## 1. Estado atual do wsProvider no Core

O `teraprox-core` é o **host do Module Federation** — ele carrega os remotes SGM e SGP.  
Cada módulo detecta se está sendo hospedado via `window.__TERAPROX_HOSTED_BY_CORE__`, definido
nos respectivos `FederatedBridge.js`.

### Fluxo de mensagens em tempo real (pós-migração)

```
Backend (onRoad)
  └─► firebasePublisher.js
        └─► Firebase RTDB: {tenant}/matchingObjects/{timestamp}
              └─► Core (moFirebaseClient.js)    ─► onMessageReceive ─► subscribers
              └─► SGM  (firebaseClient.js)      ─► onMessageReceive ─► subscribers
              └─► SGP  (firebaseMatchingObjects) ─► onMessageReceive ─► subscribers

notification-api
  └─► FirebaseRTDBProvider.js
        └─► Firebase RTDB: {tenant}/notifications/{userId}/{timestamp}
              └─► Core (notificationFirebaseClient.js)
              └─► SGM  (clients/notificationFirebaseClient.js)
              └─► SGP  (notificationFirebaseClient.js)
```

### O que foi feito (já concluído)

| Cliente         | Receber MOs       | Receber Notificações | STOMP/WebStomp    |
|-----------------|-------------------|----------------------|-------------------|
| **core**        | Firebase RTDB ✅  | Firebase RTDB ✅     | removido (`null`) |
| **sgm**         | Firebase RTDB ✅  | Firebase RTDB ✅     | mantido só p/ ENVIO (sendViaAMQP) |
| **sgp**         | Firebase RTDB ✅  | Firebase RTDB ✅     | import morto (legado) |
| **mbudy**       | STOMP WebSocket ⚠️ | Socket.IO ⚠️        | ainda ativo e com exchange errado |

### Diagnósticos/Pendências no Core

1. **`stompClient: null` no value do context** — correto, é um stub de retrocompatibilidade.
   Nada precisa ser feito; submodulos que leram `stompClient` do context recebem `null`
   e devem cair no fallback HTTP ou Firebase.

2. **`sendMessage`, `connectSocket`, `connectNotificationSocket` são stubs vazios** —
   correto no core. As conexões Firebase são iniciadas diretamente nos `useEffect`s do core,
   não por esses métodos (que eram legado do Socket.IO).

3. **SGP ainda importa `@stomp/stompjs`** — import morto; não afeta comportamento mas
   adiciona bundle desnecessário. Ver seção de ações.

4. **Mbudy `WebSocketService` usa `/exchange/sgp/${company}MO`** — exchange errado.
   Após a migração para `teraprox.global`, o exchange de MOs também deve ser 
   `/exchange/teraprox/${company}MO`. **Isto é um bug ativo.**

---

## 2. Firebase RTDB vs Firestore — Instant Refresh no Frontend

### Resposta curta: **Sim, o RTDB também entrega instant refresh igual ao Firestore.**

### Como funciona no RTDB (como já usamos)

```js
// Firebase RTDB SDK — cliente React/Flutter
onChildAdded(ref(db, `${company}/matchingObjects`), (snapshot) => {
    // disparado imediatamente quando um novo filho é escrito no backend
    onMessage(snapshot.val())
})
```

O Firebase RTDB mantém uma conexão persistente WebSocket com os servidores do Firebase.
Quando o backend escreve via `firebase-admin`, o SDK do cliente recebe em ~100–300ms.

### Comparativo RTDB vs Firestore para nosso padrão de eventos

| Critério                        | **RTDB** (atual)             | **Firestore**               |
|---------------------------------|------------------------------|-----------------------------|
| Latência de push                | ~100–300ms ✅                | ~300–600ms                  |
| Custo por operação              | Baixo (por volume de dados)  | Maior (por leitura/escrita) |
| Estrutura de dados              | JSON tree simples            | Documentos/coleções         |
| Listeners em tempo real         | `onChildAdded`, `onValue` ✅ | `onSnapshot` ✅             |
| Offline persistence automática  | Limitada                     | Nativa (melhor)             |
| Queries ricas (where, orderBy)  | Limitadas                    | Completas                   |
| TTL/cleanup automático          | Não nativo (usamos CF)       | Não nativo (TTL manual)     |
| Adequado para streaming eventos | ✅ Ideal                     | Funciona, mas mais caro     |

### Conclusão

Para o padrão de **push de eventos (MOs, notificações)** — write no backend, read no cliente —
o **RTDB é mais adequado e mais barato** do que o Firestore.  
O "instant refresh" do Firestore (que você experimentou) funciona exatamente igual no RTDB
via `onChildAdded`. **Não há motivo para migrar para Firestore** para este caso de uso.

A diferença que pode ter parecido mais "mágica" no Firestore é que ele persiste dados e permite
queries. O RTDB em nosso padrão faz delete após consumo (`remove(snapshot.ref)`), o que é
intencional (event stream, não persistência de estado).

---

## 3. Envio de Mensagens ao RabbitMQ sem STOMP — Core e Mbudy

### Contexto

Atualmente, o **envio** de mensagens ao RabbitMQ (ex: mutações via AMQP em vez de HTTP)
está implementado no SGM via STOMP WebSocket (`sendViaAMQP.js`, `requestViaAMQP.js`).  
O core e o mbudy **não têm** esse mecanismo hoje.

### Por que retirar o STOMP para envio?

- **Exposição de credenciais**: a senha do RabbitMQ WebStomp fica no bundle JS do frontend.
- **Gerenciamento de conexão**: cada cliente mantém uma conexão WebSocket persistente com o RabbitMQ — custoso em escala.
- **Inconsistência de plataforma**: mbudy (Flutter/mobile) usa STOMP via `stomp_dart_client`, mas o padrão de autenticação do backend usa JWT, não as credenciais do RabbitMQ.
- **Sem autenticação JWT por fila**: o STOMP autentica no boker RabbitMQ com usuário/senha fixos, não validando o JWT do usuário por operação.

### Abordagem Proposta: Endpoint HTTP de Publicação no Gateway

Em vez de conectar o frontend/mobile diretamente ao RabbitMQ, criar um endpoint dedicado
no `teraprox-gateway` que recebe a mensagem com JWT e publica internamente via AMQP.

```
Core (React) ──HTTP POST + JWT──► Gateway /publish ──AMQP──► RabbitMQ
Mbudy (Flutter) ──HTTP POST + JWT──► Gateway /publish ──AMQP──► RabbitMQ
```

#### Vantagens

- Credenciais RabbitMQ ficam **apenas no backend** (já é o padrão atual).
- A validação JWT do usuário acontece no gateway (mesmo middleware já existente).
- Funciona em **qualquer cliente HTTP** — browser, mobile, outros backends.
- O gateway já está na malha de comunicação; não abre nova superfície de ataque.
- Fallback natural: se o RabbitMQ estiver indisponível, retorna 503 (não silencia o erro como o STOMP WebSocket faz).

#### Contrato proposto

```http
POST /amqp/publish
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "exchange": "teraprox",
  "routingKey": "manutencao.ordemDeServicopost",
  "payload": {
    "method": "POST",
    "path": "/ordemDeServico",
    "body": { ... },
    "headers": { "Contexto": "ordemDeServico" },
    "query": {}
  }
}
```

Resposta:
- `202 Accepted` — mensagem enfileirada com sucesso
- `401 Unauthorized` — JWT inválido
- `503 Service Unavailable` — RabbitMQ indisponível

#### Implementação no Gateway (onRoad)

```js
// teraprox-gateway — novo listener/rota
router.post('/amqp/publish', authMiddleware, async (req, res) => {
  const { exchange, routingKey, payload } = req.body
  // Usar o canal AMQP já aberto pelo onRoad (acesso interno via buildServer)
  await amqpChannel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)), {
    persistent: false,
    headers: { authorization: req.headers.authorization }
  })
  res.status(202).json({ message: 'Accepted' })
})
```

#### No Core (React)

Substituir `webStompClient.publish(...)` por:

```js
// src/websocket/amqp/publishViaGateway.js
export async function publishViaGateway({ exchange, routingKey, payload, store }) {
  const token = store.getState().global.token
  const response = await fetch(`${GATEWAY_URL}/amqp/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ exchange, routingKey, payload }),
  })
  if (!response.ok) throw new Error(`[AMQP-Gateway] ${response.status}`)
  return response.json()
}
```

#### No Mbudy (Flutter)

Usar o `ApiClient` (Dio) já existente:

```dart
// lib/core/network/amqp_gateway_service.dart
Future<void> publishToRabbitMQ({
  required String exchange,
  required String routingKey,
  required Map<String, dynamic> payload,
}) async {
  await _dio.post('/amqp/publish', data: {
    'exchange': exchange,
    'routingKey': routingKey,
    'payload': payload,
  });
}
```

---

## 4. Correção Urgente — Mbudy Exchange Errado

O `WebSocketService.dart` assina:
```dart
final queueName = '/exchange/sgp/${company}MO';  // ❌ ERRADO
```

Após a migração global para `teraprox.global`, deve ser:
```dart
final queueName = '/exchange/teraprox/${company}MO';  // ✅
```

**Mas atenção**: esta correção só faz sentido se o mbudy continuar usando STOMP para receber
MOs. A **decisão arquitetural** a ser tomada é se o mbudy também migra para Firebase RTDB
(como os frontends web fizeram) ou mantém o STOMP.

### Opções para Mbudy — Recepção de MOs

| Opção | Implementação | Esforço | Consistência com Web |
|-------|---------------|---------|----------------------|
| **A) Manter STOMP** | Corrigir exchange para `teraprox` | Baixo | ❌ Diverge do padrão web |
| **B) Migrar para Firebase RTDB** | Usar `firebase_database` SDK (já tem `firebase_core`) | Médio | ✅ Igual ao Core/SGM/SGP |
| **C) Firebase FCM (push notifications)** | Para MOs de notificação apenas | Alto | Parcialmente |

**Recomendação**: Opção B — migrar para Firebase RTDB, usando `firebase_database` do Flutter.
O package já está disponível no ecossistema e a lógica é simétrica ao que os web frontends fazem.

```dart
// Equivalente do moFirebaseClient.js no Flutter
final dbRef = FirebaseDatabase.instance.ref('${company}/matchingObjects');
dbRef.onChildAdded.listen((event) {
  final data = event.snapshot.value;
  // processar MO ...
});
```

---

## 5. Plano de Execução (Priorizado)

### Sprint A — Correções imediatas (baixo risco)

- [ ] **SGP**: remover import morto de `@stomp/stompjs` do `wsProvider.js`
- [ ] **Mbudy**: corrigir exchange de `/exchange/sgp/` para `/exchange/teraprox/` no `WebSocketService.dart`
- [ ] **Core**: validar que `stompClient: null` no context não quebra nenhum consumer nos módulos SGM/SGP

### Sprint B — Endpoint Gateway para publicação AMQP

- [ ] **Gateway**: criar rota `POST /amqp/publish` com validação JWT e publicação AMQP
- [ ] **Core**: criar `publishViaGateway.js` como utilitário de envio
- [ ] **SGM**: deprecar `sendViaAMQP.js` e `requestViaAMQP.js` (fallback HTTP já existe)
- [ ] **Testes**: validar que o fallback HTTP do httpApiFactory ainda funciona se gateway estiver fora

### Sprint C — Mbudy Firebase RTDB para MOs

- [ ] **Mbudy**: adicionar `firebase_database` ao `pubspec.yaml`
- [ ] **Mbudy**: criar `firebase_rtdb_service.dart` equivalente ao `moFirebaseClient.js`
- [ ] **Mbudy**: desativar `WebSocketService` STOMP para MOs (manter só para envio até Sprint B)
- [ ] **Mbudy**: criar `amqp_gateway_service.dart` (após Sprint B)
- [ ] **Mbudy**: remover `stomp_dart_client` dependency

### Sprint D — Mbudy Firebase para Notificações

- [ ] **Mbudy**: criar `firebase_notification_service.dart` equivalente ao `notificationFirebaseClient.js`
- [ ] **Mbudy**: desativar `NotificationWebSocketService` Socket.IO
- [ ] **Mbudy**: remover `socket_io_client` dependency

---

## 6. Diagrama Final da Arquitetura Alvo

```
                         RTDB Write (firebase-admin)
onRoad APIs ──────────────────────────────────────────►  Firebase RTDB
notification-api ──────────────────────────────────────►  {tenant}/matchingObjects
                                                           {tenant}/notifications/{userId}
                                                                │
                               ┌────────────────────────────────┤ firebase SDK listeners
                               │                                │
                    ┌──────────▼──────────┐          ┌─────────▼──────────┐
                    │  teraprox-core      │          │  teraprox-mbudy    │
                    │  (moFirebase +      │          │  (firebase_database │
                    │   notifFirebase)    │          │   + notif listener) │
                    └──────────┬──────────┘          └─────────┬──────────┘
                               │ MF Host                       │ Flutter
                    ┌──────────▼──────────┐                    │
                    │  SGM / SGP          │                     │
                    │  (firebaseClient)   │                     │
                    └────────────────────┘                      │
                                                                │
     HTTP POST /amqp/publish + JWT                             │
Core / SGM ──────────────────────────────►  Gateway  ──────────┘ (também via HTTP)
Mbudy ────────────────────────────────────►  /amqp/publish
                                               │
                                               └─► RabbitMQ AMQP (interno) ─► onRoad worker
```

---

## Referências de Código

| Arquivo | Propósito |
|---------|-----------|
| `teraprox-core/src/websocket/wsProvider.js` | Host MF — Firebase MOs + Notificações |
| `teraprox-core/src/websocket/moFirebaseClient.js` | Listener RTDB de MOs |
| `teraprox-core/src/websocket/notificationFirebaseClient.js` | Listener RTDB de notificações |
| `teraprox-app-sgm/src/websocket/clients/firebaseClient.js` | Listener RTDB de MOs (SGM) |
| `teraprox-app-sgm/src/websocket/amqp/sendViaAMQP.js` | Envio via STOMP (deprecar na Sprint B) |
| `teraprox-app-sgp/src/websocket/firebaseMatchingObjects.js` | Listener RTDB de MOs (SGP) |
| `teraprox-mbudy/lib/core/network/websocket_service.dart` | STOMP cliente (migrar na Sprint C) |
| `onRoad/src/inner_configs/firebasePublisher.js` | Publicação de MOs no RTDB |
| `teraprox-notification-api/server/providers/impl/FirebaseRTDBProvider.js` | Publicação de notificações no RTDB |
