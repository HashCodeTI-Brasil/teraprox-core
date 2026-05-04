/**
 * Empresa (Company) — entidade de domínio que representa o tenant
 * contratante. Sub-domínios SGM/SGP/SGU operam sob escopo de Empresa.
 *
 * Shape extraído de `web-client/src/lib/empresaSlice.js` +
 * `web-client/src/services/companyService.js` (GET company/:id,
 * POST criarEmpresa, GET companiesByUser/:userId).
 */

export interface Empresa {
  id: number | string
  nome: string
  /** CNPJ (somente dígitos) */
  cnpj?: string
  /** Razão social formal — usada para emissão fiscal */
  razaoSocial?: string
  /** Email principal de contato */
  email?: string
  /** Status do tenant (ativo, suspenso, cancelado) */
  status?: 'ativo' | 'suspenso' | 'cancelado' | string
}

export interface UpdateEmpresaInput {
  nome?: string
  cnpj?: string
  razaoSocial?: string
  email?: string
  status?: Empresa['status']
}
