/**
 * Port for Recorrencia / FrequenciaFormV2 (cross-domain — SGM + SGP).
 *
 * Shape alinhado ao contrato do backend `api-manutencao/recorrencia`:
 *
 *   { id?, valor: number, escala: 'millisecond'|'second'|'minute'|'hour'|'day'|'week'|'month'|'year', dataInicio: ISO }
 *
 * SEM conversao a milissegundos no client — o backend persiste `valor`+`escala` cru.
 * `dataFim`/`diaExecucao`/`horarioExecucao` nao existem neste contrato.
 *
 * Responsabilidades de orquestracao (isModel, XOR dataPlanejada vs recorrencia,
 * coexistencia com agregador, historico) permanecem no caller — este Port foca
 * apenas na entidade Recorrencia.
 *
 * Reescrito em Track C.1 UI (realinhamento atomico) da sprint
 * 2026-04-20-code-split-fix-e-ports-faltantes.
 */

export type RecorrenciaEscala =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export interface RecorrenciaValue {
  id?: number
  valor: number
  escala: RecorrenciaEscala
  /**
   * ISO 8601. Opcional porque dominios como caderno/planoDeControle nao usam
   * agendamento temporal, apenas intervalo de amostragem (valor+escala). SGM-OS
   * (agendamento real de OS) continua passando dataInicio — o default do
   * FrequenciaFormV2 preserva o campo, entao callers atuais nao precisam mudar.
   */
  dataInicio?: string
}

export interface RecorrenciaValidationResult {
  ok: boolean
  errors: Record<string, string>
}

export interface IRecorrenciaViewModel {
  /**
   * Estado atual. `null` = "sem recorrencia" (estado valido em UI;
   * a validacao so acusa invalido se o usuario comecou a preencher).
   */
  value: RecorrenciaValue | null

  /**
   * Regra:
   *   valid = false se value === null OU valor < 1 OU !escala.
   *   dataInicio NAO entra na validacao (opcional — dominios sem agendamento
   *   temporal nao fornecem). Callers que exigem dataInicio fazem validacao
   *   adicional em cima deste Port.
   *   value === null em contexto "sem recorrencia" e valido na UI mas
   *   isValid reflete apenas validade estrutural da entidade Recorrencia.
   */
  isValid: boolean

  /** Transiente — true enquanto submit() esta pendente. */
  isSubmitting: boolean

  onValorChange(valor: number): void
  onEscalaChange(escala: RecorrenciaEscala): void
  /** Aceita undefined para limpar (dominios sem agendamento temporal). */
  onDataInicioChange(dataInicio: string | undefined): void

  /** Seta value = null (estado "sem recorrencia"). */
  clear(): void

  /** Popula para edicao. Aceita null para limpar. */
  populateFromExisting(value: RecorrenciaValue | null): void

  validate(): RecorrenciaValidationResult

  /** Valida + retorna DTO (ou null se sem recorrencia). Nao persiste em API. */
  submit(): Promise<RecorrenciaValue | null>

  /** Alias semantico para clear(). */
  reset(): void
}
