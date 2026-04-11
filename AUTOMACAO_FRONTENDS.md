# 🔄 Automação de Atualização de Frontends

## 📋 Resumo

Este documento descreve como os frontends **SGM** e **SGP** são automaticamente atualizados quando o **teraprox-core** sofre alterações.

---

## 🚀 Como Funciona

### 1️⃣ **Automação Local** (Manual)

Execute quando precisar atualizar manualmente:

```bash
# Atualizar todos os frontends com a última versão do core
/Users/alexandrenunes/Desktop/update-frontends.sh

# Especificar versão (opcional)
/Users/alexandrenunes/Desktop/update-frontends.sh "0.3.4"
```

**O script faz:**
- ✅ Build do core-sdk e ui-kit
- ✅ Atualiza package.json dos frontends
- ✅ Remove node_modules e lock files
- ✅ Reinstala dependências
- ✅ Verifica tipos TypeScript

---

### 2️⃣ **Automação GitHub Actions** (Automática)

Quando você faz `git push` no `teraprox-core` (branch `gcp-migration`):

1. **Detecção**: GitHub Actions detecta mudanças em:
   - `packages/core-sdk/**`
   - `packages/ui-kit/**`
   - `package.json`

2. **Build**: Faz build do novo core-sdk

3. **Atualização**: Para cada frontend (SGM, SGP):
   - Atualiza `package.json`
   - Instala novas dependências
   - Verifica tipos

4. **PR Automático**: Cria um Pull Request com as mudanças
   - Título: `🔄 chore: update to core-sdk@X.X.X`
   - Descrição com detalhes
   - Checklist de validação

5. **Review**: Você revisa e aprova o PR

---

## 📊 Status Atual

| App | Core-SDK | UI-Kit | Status |
|-----|----------|--------|--------|
| SGM | 0.3.3 | 0.1.8 | ✅ Pronto |
| SGP | 0.3.3 | 0.1.8 | ✅ Pronto |
| MBUDY | N/A (Flutter) | N/A | 🔵 Diferente |

---

## 🔧 Próximos Passos

### Hoje
- [x] Commit no teraprox-core
- [ ] Testar script local: `/Users/alexandrenunes/Desktop/update-frontends.sh`
- [ ] Testar SGM e SGP após atualização

### Semana que vem
- [ ] Validar GitHub Actions com primeira mudança
- [ ] Aprovar PRs automáticos
- [ ] Mergear para dev/prod

### Futuro
- [ ] Integrar MBUDY (Flutter) com automação similar
- [ ] Adicionar integração com deploy automático
- [ ] Adicionar notification no Slack

---

## 🚨 Troubleshooting

| Problema | Solução |
|----------|---------|
| Dependências conflitantes | Use `npm install --legacy-peer-deps` |
| Build falha no SGM/SGP | Verifique `node_modules` e `package-lock.json` |
| TypeScript errors | Rode `npx tsc --noEmit` localmente |
| PR não criado | Verifique `GITHUB_TOKEN` nos Actions secrets |

---

## 📝 Versioning

Quando você commita no core:

```
Versão anterior: 0.3.3
Seu commit altera: core-sdk
Nova versão: 0.3.4 (ou patch/minor/major conforme semântica)

Frontends atualizados para: ^0.3.4
```

---

## 🔗 Links Importantes

- [Script Local](/Users/alexandrenunes/Desktop/update-frontends.sh)
- [GitHub Actions](https://github.com/HashCodeTI-Brasil/teraprox-api-manutencao/blob/gcp-migration/.github/workflows/auto-update-frontends.yml)
- [teraprox-app-sgm](https://github.com/HashCodeTI-Brasil/teraprox-app-sgm)
- [teraprox-app-sgp](https://github.com/HashCodeTI-Brasil/teraprox-app-sgp)

---

**Last Updated:** 2026-04-11
