/**
 * Permission — modelo do contrato `frontEndPerms.txt` decifrado pelo
 * web-client/utils/cryptoUtils + permissionUtils. Cada item representa
 * um Path da aplicação com lista de Componentes e flags de bloqueio.
 *
 * Shape inferido de `web-client/src/utils/permissionUtils.js` +
 * `permissaoService.js` (PUT /permissao/:id).
 */

export interface PermissionComponent {
  /** Identificador único do componente UI dentro do path */
  label: string
  /** Se true, componente está bloqueado para a role ativa */
  blocked: boolean
  /** Metadados livres (icone, descricao, etc.) — manter passthrough */
  [key: string]: unknown
}

export interface PermissionPath {
  /** Caminho da rota — ex.: '/companie/usuarios' */
  path: string
  /** Se true, location inteira está bloqueada */
  locationBloqueado?: boolean
  /** Componentes contidos neste path */
  components: PermissionComponent[]
  /** Metadados livres */
  [key: string]: unknown
}

/** Forma compactada usada por `PermissionFilter.filter()` no web-client. */
export interface BlockedPermissionItem {
  /** path quando location inteira bloqueada */
  locationBloqueado?: string
  componentesBloqueados: string[]
}

/** Payload PUT /permissao/:id — preserva backend shape opaco. */
export interface UpdatePermissionInput {
  /** Conteúdo serializado de PermissionPath ou estrutura específica do backend */
  [key: string]: unknown
}
