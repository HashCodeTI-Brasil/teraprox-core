/**
 * User — entidade de domínio de gestão de usuários da Company (SGU).
 *
 * NB: NÃO inclui `token` ou credenciais (auth do user logado é separada,
 * Sprint 5 — cookie httpOnly + refresh rotation). Aqui é apenas CRUD de
 * usuários pertencentes a uma empresa (colaboradores).
 *
 * Shape extraído de `web-client/src/lib/userSlice.js` (selectedUser*) +
 * `web-client/src/services/{userService,companyService}.js` payloads.
 */

export interface UserSetorLink {
  /** Id do setor referenciado */
  setorId: number | string | null
  /** Flag legada usada pela UI atual para sinalizar update otimista */
  updated?: boolean
}

export interface UserRoleLink {
  /** Id da role referenciada */
  roleId: number | string | null
  /** Flag legada usada pela UI atual para sinalizar update otimista */
  updated?: boolean
}

export interface User {
  id: number | string
  email: string
  firstName: string
  lastName: string
  contact?: string | null
  /** Setor texto (denormalizado) — exibição rápida */
  setor?: string | null
  /** Role texto (denormalizado) — exibição rápida */
  role?: string | null
  /** Flag de admin de Company */
  admin?: boolean
  /** Conta ativa/desativada */
  active?: boolean
  /** Estrutura de relacionamento setor — usada por updates parciais */
  userSetor?: UserSetorLink
  /** Estrutura de relacionamento role — usada por updates parciais */
  userRole?: UserRoleLink
  /** Empresa-pai (id) */
  companyId?: number | string
}

/** Payload para POST /registerUser e similares (somente onboarding). */
export interface CreateUserInput {
  email: string
  firstName: string
  lastName: string
  contact?: string | null
  password?: string
  roleId?: number | string | null
  setorId?: number | string | null
}

/** Payload para PUT /user/:id — campos opcionais. */
export type UpdateUserInput = Partial<
  Pick<User, 'firstName' | 'lastName' | 'email' | 'contact' | 'active' | 'admin'>
> & {
  roleId?: number | string | null
  setorId?: number | string | null
}

/** Resposta de POST /inviteToCompany — token a ser repassado por email. */
export interface InvitationToken {
  token: string
  expiresAt?: string
  email: string
  roleId?: number | string | null
}
