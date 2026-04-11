# Migracao do backend para os modulos trabalharem de forma mais harmonica

- A tela recursos nao precisa existir mais no Processo, porque na manutencao eu vejo eles de uma forma mais completa na arvore estrutural.

- O que preciamos fazer agora é o seguinte, adicionei as pastas teraprox-api-processo e teraprox-api-manutencao para voce ter as API aqui no contexto

# Fazer o Recurso na api processo e manutencao serem iguais.

## Entao precisamos primeiramente de 1 SQL para igualar os dois.
- Mudar o id hoje que seria INTEGER para UUIDV6 , de forma que o recurso na manutencao e o recurso no processo teham a mesma primary key. 
Importantissimo que a onde tenho recursoId em ambos bancos de processo manutencao reflitam a mudanca para a nova chave.

---

## Status da Migração UUID

### Ficheiros criados / alterados

#### SQL Migrations (executar nesta ordem):
1. **`teraprox-api-manutencao/infra/migration_recurso_uuid.sql`** — Executar PRIMEIRO
   - Adiciona coluna UUID ao `recurso`, gera valores, cria tabela de mapeamento `recurso_uuid_mapping`
   - Migra `recursoId` (INTEGER → UUID) nas tabelas: `branchNode`, `dimensao`, `unidadeComponente`, `recursoClasses`, `ordemDeServico`, `solicitacaoDeServico`
   - Recria PK e FK constraints

2. **`teraprox-api-processo/infra/store/migration_recurso_uuid.sql`** — Executar DEPOIS
   - Usa FDW para ler `recurso_uuid_mapping` do banco manutencao
   - Garante que os mesmos UUIDs do manutencao são usados no processo
   - Migra `recursoId` em `ordemDeCorrecao` (INTEGER → UUID)
   - Atualiza valores em `linhaDePlanoDeControle.recursoId` (STRING — de integer-string para uuid-string)

#### Modelos Sequelize alterados:
- **`teraprox-api-manutencao/repository/RecursoRepository.js`** — Adicionado `id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true }`
- **`teraprox-api-processo/schemes/RecursoScheme.js`** — Adicionado `id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true }`
- **`teraprox-api-processo/repository/OrdemDeCorrecaoRepository.js`** — `recursoId: DataTypes.INTEGER` → `DataTypes.UUID`

### Tabelas impactadas

| Banco | Tabela | Coluna | Antes | Depois |
|---|---|---|---|---|
| manutencao | `recurso` | `id` (PK) | INTEGER | UUID |
| manutencao | `branchNode` | `recursoId` (FK) | INTEGER | UUID |
| manutencao | `dimensao` | `recursoId` (FK) | INTEGER | UUID |
| manutencao | `unidadeComponente` | `recursoId` (FK) | INTEGER | UUID |
| manutencao | `recursoClasses` | `recursoId` (FK) | INTEGER | UUID |
| manutencao | `ordemDeServico` | `recursoId` (FK) | INTEGER | UUID |
| manutencao | `solicitacaoDeServico` | `recursoId` (FK) | INTEGER | UUID |
| processo | `recurso` | `id` (PK) | INTEGER | UUID |
| processo | `ordemDeCorrecao` | `recursoId` (FK) | INTEGER | UUID |
| processo | `linhaDePlanoDeControle` | `recursoId` (valor) | STRING (int) | STRING (uuid) |

### Queries SQL raw — sem alteração necessária
As queries raw em `OrdemDeServicoService.js`, `SolicitacaoDeServicoService.js`, `AgregadorService.js`, `RecorrenciaService.js`, `MonitoramentoUtils.js` e `ControleService.js` usam JOINs por referência de coluna (`os."recursoId" = r.id`) que funcionam independentemente do tipo de dados.

### Próximos passos
- [ ] Backup dos bancos de dados
- [ ] Executar migration no banco manutencao
- [ ] Executar migration no banco processo
- [ ] Deploy das APIs com os modelos Sequelize atualizados
- [ ] Verificar que o sync do Sequelize não cria colunas duplicadas
- [ ] Remover tabela `recurso_uuid_mapping` do banco manutencao após confirmação
