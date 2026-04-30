/**
 * IPickMantenedorTipoViewModel — Port para o fluxo "configurar OS antes
 * de iniciar" (atribuir mantenedor + tipo de ordem).
 *
 * Promove o legacy SGM-OS PickMantenedorModal — usado tanto pelo
 * Planejamento quanto pela tela Executar Ordem de Manutenção (statusBindChange).
 *
 * Design:
 *  - Carrega `mantenedores` via GET mantenedor/mantenedorDashboard
 *  - Carrega `tiposDeOrdem` via GET tipoDeOrdem
 *  - Atribui mantenedor via POST ordemDeServico/atribuirMantenedor/:osId
 *  - Atribui tipo via PUT  ordemDeServico/updateTipoDeOrdem/:osId
 *  - Estado fica num slice flat (singleton — modal só aparece um por vez)
 */

export interface PickMantenedorOption {
  id: number | string
  userId?: number | string
  nomeUsuario?: string
  nome?: string
  [key: string]: unknown
}

export interface PickTipoDeOrdemOption {
  id: number | string
  tipo: string
  [key: string]: unknown
}

export interface IPickMantenedorTipoViewModel {
  readonly mantenedores: PickMantenedorOption[]
  readonly tiposDeOrdem: PickTipoDeOrdemOption[]
  readonly loading: boolean
  readonly assigning: boolean
  readonly error: string | null

  /** Carrega mantenedores + tipos em paralelo */
  loadOptions(): Promise<void>

  /** POST ordemDeServico/atribuirMantenedor/:osId para cada item */
  assignMantenedores(
    osId: number | string,
    mantenedores: PickMantenedorOption[]
  ): Promise<void>

  /** PUT ordemDeServico/updateTipoDeOrdem/:osId */
  assignTipo(
    osId: number | string,
    tipoId: number | string
  ): Promise<void>

  /** Reseta estado (limpa cache de options) */
  reset(): void
}
