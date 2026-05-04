/**
 * IUserViewModel — Port para gestão de usuários da Company (SGU).
 *
 * NB: NÃO trata auth do usuário logado. Auth é separada (Sprint 5 —
 * cookie httpOnly + refresh rotation). Aqui é apenas CRUD de
 * colaboradores de uma empresa.
 *
 * Origem dos contratos:
 *  - `web-client/src/services/userService.js`     (registerUser, userUpdate, ...)
 *  - `web-client/src/services/companyService.js`  (colaborators, inviteToCompany)
 *  - `web-client/src/lib/userSlice.js`            (selectedUser*, listas)
 *
 * Endpoints subjacentes (api-user):
 *  - GET    /colaborators              → list()
 *  - GET    /user/byUserName/:userName → getByUsername()
 *  - PUT    /user/:id                  → update()
 *  - POST   /registerUser              → create()
 *  - POST   /inviteToCompany           → invite()
 */

import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  InvitationToken,
} from '../domain/sgu/User'

export interface UserListFilters {
  /** Filtra por id de companhia (default = current). */
  companyId?: number | string
  /** Filtra por nome de companhia (rota `/colaborators/:companyName`). */
  companyName?: string
  /** Substring sobre firstName/lastName/email — aplicado client-side. */
  search?: string
  /** Apenas usuários ativos */
  active?: boolean
}

export interface IUserViewModel {
  readonly list: User[]
  readonly selected: User | null
  readonly isLoading: boolean
  readonly error?: string | null

  /** Carrega lista de colaboradores da companhia atual ou filtrada. */
  load(filters?: UserListFilters): Promise<User[]>

  /** Lista síncrona já em memória (snapshot). */
  getAll(): User[]

  /** Busca usuário por id (do estado já carregado). */
  getById(id: number | string): User | undefined

  /** Busca usuário por username (HTTP — `GET /user/byUserName/:userName`). */
  getByUsername(userName: string): Promise<User | null>

  /** Cria usuário (POST /registerUser). */
  create(input: CreateUserInput): Promise<User>

  /** Atualiza usuário (PUT /user/:id). */
  update(id: number | string, patch: UpdateUserInput): Promise<User>

  /**
   * Hard-delete não exposto pela api-user atual; usa update({ active: false }).
   * Implementado no Adapter via update — assinatura preservada para futuro
   * endpoint dedicado.
   */
  delete(id: number | string): Promise<void>

  /** Convida usuário (POST /inviteToCompany). */
  invite(email: string, roleId: number | string): Promise<InvitationToken>

  /** Atribui Role ao usuário (proxy para update). */
  assignRole(userId: number | string, roleId: number | string): Promise<User>

  /** Atribui Setor ao usuário (proxy para update). */
  assignSetor(userId: number | string, setorId: number | string): Promise<User>

  /** Marca usuário como selecionado para edição. */
  select(user: User | null): void
}
