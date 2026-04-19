/**
 * Port for InspecaoModal (ui-kit-sgm).
 *
 * Implementado por ReduxInspecaoModalAdapter. A UI (InspecaoModal) nao
 * deve acessar Redux diretamente — consome o contrato via
 * useInspecaoModalViewModel().
 */

export interface LimiteDeControle {
  nome?: string
  boundRule?: string
  valor?: number | string
  removed?: boolean
  [k: string]: unknown
}

export interface InspecaoValue {
  tipo?: string
  nomeParametro?: string
  unidadeParametro?: string
  parametroId?: string
  limitesDeControle: LimiteDeControle[]
  [k: string]: unknown
}

export interface InspecaoValidationResult {
  ok: boolean
  errors: Record<string, string>
}

export interface IInspecaoModalViewModel {
  /** Estado atual do form de inspecao (Redux) */
  value: InspecaoValue

  /** Flag derivada — ver regra em validate() */
  isValid: boolean

  /** Flag transiente — true enquanto submit() esta pendente */
  isSubmitting: boolean

  /** Define o tipo de dado (Numerico | Verdadeiro ou Falso | ...) */
  onTipoDeDado(tipo: string): void

  /** Atualiza o nome do parametro avulso */
  onNomeParametro(nome: string): void

  /** Usuario selecionou um parametro pre-cadastrado (copia id/unidade/nome) */
  onParametroSelected(parametro: any): void

  /** Atualiza a unidade de medida do parametro */
  onUnidadeParametro(unidade: string): void

  /** Substitui toda a lista de limites de controle */
  onLimitesChange(limites: LimiteDeControle[]): void

  /** Marca o limite no indice idx como removed=true (soft-delete) */
  removeLimite(idx: number): void

  /**
   * Coloca um limite em modo de edicao. Implementacao default faz
   * noop no Redux — a UI pode manter o item em state local — mas
   * a Port existe para que a UI nao precise conhecer esse detalhe.
   */
  editLimite(limite: LimiteDeControle): void

  /**
   * Validacao sincrona:
   *  - tipo obrigatorio
   *  - tipo === 'Numerico' exige >= 1 limite de controle nao-removed
   *  - tipo === 'Verdadeiro ou Falso' nao exige limites
   */
  validate(): InspecaoValidationResult

  /** Valida + retorna DTO. Nao persiste em API. */
  submit(): Promise<InspecaoValue>

  /** Limpa para initialState */
  reset(): void

  /** Popula para edicao */
  populateFromExisting(inspecao: InspecaoValue): void
}
