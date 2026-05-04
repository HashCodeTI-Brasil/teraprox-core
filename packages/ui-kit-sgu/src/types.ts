/**
 * Tipos do dominio SGU consumidos pelos componentes deste pacote.
 *
 * Sprint 3 fase B (EX5 sgu-screens) — EX3 ja re-exportou os tipos
 * `User/Role/Setor/Permission/Empresa` do barrel raiz do core-sdk
 * (`packages/core-sdk/src/index.ts`), entao trocamos o mirror local
 * pela re-exportacao oficial. Isso elimina o risco de drift entre os
 * shapes apresentacionais e os shapes consumidos pelos Adapters Redux.
 *
 * Notas pos-rebase:
 *  - Adicionamos `_fullName?: string` em `User` como aumento opcional
 *    apresentacional (nao ha equivalente no domain — campo derivado
 *    usado por `UserCard`/`UserList` para highlight de busca).
 *  - `PermissionComponent` ganha `key?` e `_fatherKey?` opcionais como
 *    extensao apresentacional (injetadas pelo hook `usePermissionLogic`
 *    deste pacote). O domain do core-sdk tipa via `[key: string]: unknown`,
 *    entao a augmentation e safe.
 */

import type {
  User as DomainUser,
  Role as DomainRole,
  Setor as DomainSetor,
} from 'teraprox-core-sdk'

export type Role = DomainRole
export type Setor = DomainSetor

/** Augmentation apresentacional — campo `_fullName` derivado para UI. */
export interface User extends DomainUser {
  /** Campo derivado usado pela UI atual (firstName + lastName). */
  _fullName?: string
}

/**
 * PermissionComponent / PermissionPath — definidos localmente porque o
 * `usePermissionLogic` (apresentacional) injeta keys narrow-typed (`key`,
 * `_fatherKey`) incompativeis com a index-signature `[key: string]: unknown`
 * do shape do core-sdk (que mantem extensibilidade backend). As shapes
 * sao estruturalmente compativeis — qualquer `PermissionComponent` deste
 * pacote satisfaz o do core-sdk e vice-versa em assignments concretos.
 */

export interface PermissionComponent {
  /** Identificador unico do componente UI dentro do path. */
  label: string
  /** Se true, o componente esta bloqueado para a role ativa. */
  blocked: boolean
  /** Chave estavel injetada pelo `usePermissionLogic`. */
  key?: string
  /** Chave do path-pai (rastrea bilidade reversa). */
  _fatherKey?: string
  /** Metadados livres — passthrough. */
  [key: string]: unknown
}

export interface PermissionPath {
  /** Caminho da rota — ex.: '/companie/usuarios'. */
  path: string
  /** Se true, location inteira esta bloqueada. */
  locationBloqueado?: boolean
  /** Componentes contidos neste path. */
  components: PermissionComponent[]
  /** Chave estavel injetada pelo `usePermissionLogic`. */
  key?: string
  /** Metadados livres. */
  [key: string]: unknown
}

/**
 * Shape bruto de uma entrada de `frontEndPerms` antes do merge.
 * O JSON real e algo como `{ "<key>": { path, components, ... } }`.
 */
export type FrontEndPermEntry = Record<
  string,
  {
    path: string
    components?: Array<Record<string, unknown>>
    menuBar?: boolean
    [key: string]: unknown
  }
>

/** Entrada de menu bloqueavel (forma `{ "<label>": "<id>" }`). */
export type MenuBarEntry = Record<string, string>
