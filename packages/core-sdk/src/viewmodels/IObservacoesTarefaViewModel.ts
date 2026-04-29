/**
 * Port para a lista de Observacoes (Justificativas) de uma Tarefa.
 *
 * Implementado por `ReduxObservacoesTarefaAdapter`. A UI apresentacional
 * (`ObservacaoModal` em ui-kit-sgm) consome o contrato exclusivamente via
 * `useObservacoesTarefaViewModel({ tarefaId })`, sem importar
 * Redux/useCoreService.
 *
 * Endpoints (api-manutencao):
 *  - `GET /ordemDeServico/tarefa/readObservacoesTarefa/:id`
 *  - `POST /ordemDeServico/tarefa/addObservacaoTarefa/:tarefaId`
 *
 * `add(...)` dispara `load()` ao concluir, garantindo lista atualizada.
 */

export interface ObservacaoTarefaPayload {
  /** Texto livre da observacao/justificativa */
  texto: string
  [k: string]: unknown
}

export interface IObservacoesTarefaViewModel {
  /** Lista atual de observacoes carregadas (any[] preserva shape backend) */
  list: any[]

  /** True durante operacoes assincronas (load/add) */
  loading: boolean

  /** Carrega lista do servidor */
  load(): Promise<void>

  /**
   * Adiciona observacao no servidor e dispara `load()` ao concluir.
   * Nao mantem estado otimista — fluxo simples post-then-fetch.
   */
  add(obs: ObservacaoTarefaPayload): Promise<void>
}

export interface UseObservacoesTarefaOptions {
  /** Id da tarefa alvo */
  tarefaId: string | number
}
