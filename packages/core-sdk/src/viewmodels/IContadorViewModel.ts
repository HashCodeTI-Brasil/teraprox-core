/**
 * Port for Contador / ContadorPicker (cross-domain — SGM + SGP).
 *
 * Implementado por ReduxContadorAdapter. A UI (ContadorPicker em
 * ui-kit-core) nao deve chamar useSelector/useDispatch/useCoreService —
 * consome exclusivamente este contrato via useContadorViewModel().
 *
 * Alinhado ao shape real usado em TarefaFormV2 + LimiteDeControlePicker
 * legacy (SGM-OS): um "contador" eh uma leitura numerica com unidade,
 * parametro e lista de limites de controle (min/max/target com regra
 * de comparacao).
 *
 * Reaproveita o tipo `LimiteDeControle` ja exportado por
 * IInspecaoModalViewModel para manter 1 unica fonte de verdade.
 */

import type { LimiteDeControle } from './IInspecaoModalViewModel'

export type ContadorBoundRule = '>=' | '<=' | '>' | '<' | '==' | '!='

export interface ContadorValue {
  /** Leitura atual do contador (ex.: 23.5). Null quando ainda nao lido. */
  valor: number | null
  /** Unidade de medida (ex.: "°C", "kg", "un"). */
  unidade: string | null
  /** Nome do parametro medido (ex.: "Temperatura"). */
  parametro: string | null
  /** Limites de controle aplicaveis (min/max/target + regra). */
  limitesDeControle: LimiteDeControle[]
}

export interface ContadorValidationResult {
  ok: boolean
  errors: Record<string, string>
}

export interface IContadorViewModel {
  /** Estado atual do contador (Redux). */
  value: ContadorValue

  /** Flag derivada — ver regra em validate(). */
  isValid: boolean

  /** Flag transiente — true enquanto submit() esta pendente. */
  isSubmitting: boolean

  /** Atualiza a leitura numerica. */
  onValorChange(v: number | null): void

  /** Atualiza a unidade de medida. */
  onUnidadeChange(u: string): void

  /** Atualiza o nome do parametro. */
  onParametroChange(p: string): void

  /** Anexa um novo limite de controle ao final da lista. */
  onLimiteAdd(limite: LimiteDeControle): void

  /** Remove o limite no indice informado (hard-delete no array). */
  onLimiteRemove(index: number): void

  /** Substitui o limite no indice informado. */
  onLimiteUpdate(index: number, limite: LimiteDeControle): void

  /**
   * Validacao sincrona:
   *  - valor finito quando presente
   *  - unidade nao-vazia quando ha valor
   *  - cada limite precisa de nome, boundRule e valor numerico finito
   */
  validate(): ContadorValidationResult

  /** Valida + retorna DTO. Nao persiste em API. */
  submit(): Promise<ContadorValue>

  /** Limpa para initialState. */
  reset(): void

  /** Popula para edicao. */
  populateFromExisting(value: ContadorValue): void
}

export type { LimiteDeControle }
