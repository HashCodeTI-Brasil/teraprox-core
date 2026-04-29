/**
 * Port para o status de uma Tarefa (TarefaItem em modo execucao).
 *
 * Implementado por `ReduxTarefaStatusAdapter`. A UI apresentacional
 * (`TarefaItem` em ui-kit-sgm) consome o contrato exclusivamente via
 * `useTarefaStatusViewModel({ tarefaId, fatherId })`, sem importar
 * Redux/useCoreService.
 *
 * Semantica:
 *  - `current` reflete o status atual da tarefa (PENDENTE | EXECUTANDO | ENCERRADO)
 *  - `toggle()` alterna entre PENDENTE e ENCERRADO. O Adapter aplica o flip
 *    localmente (otimista), persiste via `PUT /ordemDeServico/tarefa/:id`
 *    com payload `{ status, fatherId? }`. Em erro, reverte e dispara
 *    `useToast().warning(...)`.
 *  - `saving` indica operacao em curso.
 */

export type TarefaStatus = 'PENDENTE' | 'EXECUTANDO' | 'ENCERRADO'

export interface ITarefaStatusViewModel {
  /** Status atual da tarefa */
  current: TarefaStatus

  /**
   * Alterna PENDENTE ↔ ENCERRADO. Persiste via
   * `PUT /ordemDeServico/tarefa/:id` `{ status, fatherId? }`.
   * Em erro, reverte estado local e dispara toast warning.
   */
  toggle(): Promise<void>

  /** True enquanto a chamada de persistencia esta em curso */
  saving: boolean
}

export interface UseTarefaStatusOptions {
  /** Id da tarefa alvo */
  tarefaId: string | number

  /**
   * Id da estrutura pai (ex: ordemDeServicoId). Quando definido, o Adapter
   * inclui no body do PUT (`{ status, fatherId }`). Mantem semantica do
   * legacy `TarefaItem.js#handleToggleStatus`.
   */
  fatherId?: number | null

  /**
   * Status inicial. Default `'PENDENTE'`. O caller normalmente passa o
   * status atual da tarefa carregada (ex: `tarefa.status`).
   */
  initialStatus?: TarefaStatus
}
