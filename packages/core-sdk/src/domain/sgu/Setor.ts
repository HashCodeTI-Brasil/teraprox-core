/**
 * Setor — entidade de domínio para departamentos/áreas dentro de uma
 * Company. Usado para agrupar usuários em chains de aprovação e
 * filtros de OS/manutenção.
 *
 * Shape extraído de `web-client/src/lib/setorSlice.js` +
 * `web-client/src/services/setorService.js` (POST setor, PUT setor/:id,
 * GET findSetoresByCompanyId/:id).
 */

export interface Setor {
  id: number | string
  nome: string
  /** Empresa-pai */
  companyId?: number | string
  /** Descrição livre */
  descricao?: string | null
}

export interface CreateSetorInput {
  nome: string
  companyId?: number | string
  descricao?: string | null
}

export type UpdateSetorInput = Partial<CreateSetorInput>
