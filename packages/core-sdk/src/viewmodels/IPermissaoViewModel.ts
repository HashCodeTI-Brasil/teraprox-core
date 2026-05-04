/**
 * IPermissaoViewModel — Port para o catálogo de permissões (paths +
 * componentes UI) e atualização de flags blocked.
 *
 * Origem:
 *  - `web-client/src/services/permissaoService.js`  (PUT /permissao/:id)
 *  - `web-client/src/services/tokenService.js`      (GET frontEndPerms.txt)
 *  - `web-client/src/utils/permissionUtils.js`      (PermissionFilter)
 *  - `web-client/src/utils/cryptoUtils.js`          (decrypt AES-256-CBC)
 *
 * Endpoints:
 *  - GET   /frontEndPerms.txt    (encriptado AES-256-CBC) → loadCatalog()
 *  - PUT   /permissao/:id        → updatePermission()
 *
 * Decisão de migração: o decrypt do `frontEndPerms.txt` historicamente
 * usa chave em variável pública — risco conhecido (ver
 * `web-client-baseline.md` §6). O Adapter ainda chama o endpoint atual
 * para compat; sprint dedicada substituirá por endpoint server-side ou
 * Web Crypto API. O Port em si é agnóstico.
 */

import type {
  PermissionPath,
  PermissionComponent,
  BlockedPermissionItem,
  UpdatePermissionInput,
} from '../domain/sgu/Permission'

export interface IPermissaoViewModel {
  readonly catalog: PermissionPath[]
  readonly isLoading: boolean
  readonly error?: string | null

  /** Carrega catálogo de paths/components (decifra frontEndPerms.txt). */
  loadCatalog(): Promise<PermissionPath[]>

  /** Lista paths do catálogo (snapshot). */
  listPaths(): PermissionPath[]

  /** Lista componentes UI agregados de todos os paths (snapshot). */
  listComponents(): PermissionComponent[]

  /**
   * Aplica filtro `PermissionFilter` legado: retorna apenas itens com
   * locationBloqueado true ou componentes blocked.
   */
  listBlocked(): BlockedPermissionItem[]

  /** Atualiza permissão (PUT /permissao/:permissaoId). */
  updatePermission(
    permissaoId: number | string,
    payload: UpdatePermissionInput
  ): Promise<void>
}
