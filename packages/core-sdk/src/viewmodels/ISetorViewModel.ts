/**
 * ISetorViewModel — Port para gestão de Setores dentro da Company.
 *
 * Origem:
 *  - `web-client/src/services/setorService.js`
 *  - `web-client/src/services/companyService.js#setoresByCompanieId`
 *  - `web-client/src/lib/setorSlice.js`
 *
 * Endpoints (api-user):
 *  - GET   /findSetoresByCompanyId/:companieId → load()
 *  - POST  /setor                              → create()
 *  - PUT   /setor/:setorId                     → update()
 *
 * NB: assignUser/removeUser são executados via PUT /user/:id alterando
 * `userSetor.setorId`. O Adapter delega ao IUserViewModel.assignSetor.
 */

import type {
  Setor,
  CreateSetorInput,
  UpdateSetorInput,
} from '../domain/sgu/Setor'

export interface ISetorViewModel {
  readonly list: Setor[]
  readonly selected: Setor | null
  readonly isLoading: boolean
  readonly error?: string | null

  load(companyId?: number | string): Promise<Setor[]>

  getAll(): Setor[]

  getById(id: number | string): Setor | undefined

  create(input: CreateSetorInput): Promise<Setor>

  update(id: number | string, patch: UpdateSetorInput): Promise<Setor>

  /** Hard-delete: stub (api-user atual não expõe DELETE /setor/:id). */
  delete(id: number | string): Promise<void>

  /** Atribui usuário ao setor (proxy via PUT /user/:id no Adapter). */
  assignUser(setorId: number | string, userId: number | string): Promise<void>

  /** Remove usuário do setor (proxy via PUT /user/:id userSetor=null). */
  removeUser(setorId: number | string, userId: number | string): Promise<void>

  select(setor: Setor | null): void
}
