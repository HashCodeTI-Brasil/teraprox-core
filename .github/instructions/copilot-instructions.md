Copilot System Instructions: Teraprox Ecosystem
1. Project Map & Context
You are working on the Teraprox ecosystem, which consists of a Federated Micro-frontend architecture and a multi-tenant Node.js backend based on the Onroad framework.

Path Map:

Host/Shell: /Users/alexandrenunes/Desktop/teraprox-core (App Container)

SGM (Manutenção):

Backend: .../teraprox-api-manutencao

Frontend: .../teraprox-app-sgm (Remote/Federated)

SGP (Processo):

Backend: .../teraprox-api-processo

Frontend: .../teraprox-app-sgp (Remote/Federated)

2. Backend Architecture (Onroad Framework)
All APIs follow a strict dependency injection and lifecycle pattern:

Controllers: Must extend AbstractController.

Use routesConfig to map methods to paths.

Methods automatically receive form, req, and res via injection.

AbstractLegacyController: Uses /all for findAll.

AbstractController: GET /context for findAll and GET /context/:id for findByPk.

Sentinel: The core object managing transactions, req, and res. It is injected into Services and Repositories.

Services: Must extend AbstractService. Repositories passed in super() are auto-initialized. Use configDependencies() for manual instantiation.

Repositories: Use SequelizeRepository or MongooseRepository.

Define relationships inside buildAssociations() using this.hasMany, this.belongsTo, etc.

Data Flow: * Responses are wrapped: the frontend expects data inside the content property of the response object.

Transactions are managed by Sentinel (auto-commit/rollback based on return).

Real-time: Use MatchingObjects and sentinel.publishMatchingObject for state synchronization.

3. Frontend & Federation
Integration: Uses FederatedBridge to load modules into the teraprox-core.

Communication: Frontend typically uses wsProvider which already handles the content wrapper from the API.

4. Development Rules & Constraints
Cross-API Models: When working on shared models (e.g., Recurso), ensure that column definitions are identical across api-manutencao and api-processo to prevent collisions, even if relationships differ between contexts.

Code Generation: Always suggest extending the base classes (AbstractController, AbstractService, SequelizeRepository) instead of creating vanilla classes.

Type Consistency: Ensure that MatchingObjects defined in the backend have equivalent interfaces in the React apps.



Nos tivemos existo em trazer os modules federados atraves do FederatedBridge.

O ultimo trabalhao que estavamos fazendo agora é ajustar os back ends para que a estrutura de tabelas que sao comun nas duas api compartilhem a mesma estrutura. Obviamente Recurso na mautencao tem relacionamentos que Recurso no processo nao tem, e isso é normal, mas o que importa é que as colunas ta model Recurso sejam iguais. Isso vale para o front refletindo nos formularios e todo CRUD.

A ideia é simples :  esses cadastro Recursos, Ações, Tarefas, Materiais e Unidades são as telas que precisamos ajustar backend e front end para eles funcionam como 1 só.
Eles vão usar UUIDV6,  o recurso ja temos SQL para migrar que ja rodamos e estavamos trabalhando nele ja. Porem ja quero gerar todos os SQL, rodar tudo de uma vez e depois validar apenas os fluxos de CRUD.

A ideia é que o front end dispare para o back end por http/rabbit mq com stopm para api, após a api criar ela posta no rabbit mq a mesma coisa para todas as api que tambem possuem os mesmos dados possam atualiazar. o UUID simplifica isso porque eu gero, e depois mando para todos criarem, isso garante que teremos 1 id unico para esses itens em comuns

Recurso -> Manutencao
Acoes -> Manutencao
Tarefa -> Manutencao
Materiais -> Manutencao
Unidades -> Processo
     

