/**
 * IEmpresaViewModel — Port para gestão da Company corrente.
 *
 * Origem:
 *  - `web-client/src/services/companyService.js`
 *  - `web-client/src/lib/empresaSlice.js`
 *
 * Endpoints (api-user):
 *  - GET   /company/:id              → loadCurrent()
 *  - GET   /companiesByUser/:userId  → loadForUser()
 *  - GET   /colaborators[/:name]     → getMembers() (proxy IUserViewModel.list)
 *  - POST  /criarEmpresa             → create() (funil — fica fora do SGU
 *                                      mas exposto para reuso de adapter
 *                                      de onboarding em web-client)
 */

import type { Empresa, UpdateEmpresaInput } from '../domain/sgu/Empresa'
import type { User } from '../domain/sgu/User'

export interface IEmpresaViewModel {
  readonly current: Empresa | null
  readonly companies: Empresa[]
  readonly selected: Empresa | null
  readonly isLoading: boolean
  readonly error?: string | null

  /** Carrega Company por id e marca como current. */
  loadCurrent(companyId: number | string): Promise<Empresa>

  /** Lista companies do usuário logado. */
  loadForUser(userId: number | string): Promise<Empresa[]>

  /** Atualiza dados da company (TODO endpoint dedicado quando criado). */
  update(id: number | string, patch: UpdateEmpresaInput): Promise<Empresa>

  /** Lista membros (proxy para IUserViewModel.load com filtro company). */
  getMembers(companyId?: number | string): Promise<User[]>

  /** Marca company selecionada (cross-tenant switching). */
  select(empresa: Empresa | null): void
}
