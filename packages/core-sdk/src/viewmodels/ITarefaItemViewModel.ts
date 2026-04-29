/**
 * Port umbrella para o componente `TarefaItem` (ui-kit-sgm).
 *
 * Composicao de cinco VMs ja existentes/novos no core-sdk:
 *  - status            → `ITarefaStatusViewModel`        (PENDENTE↔ENCERRADO + persist)
 *  - observacoes       → `IObservacoesTarefaViewModel`   (load/add justificativas)
 *  - inspecao          → `IInspecaoModalViewModel`       (form de nova inspecao)
 *  - unidadeMaterial   → `IUnidadeMaterialViewModel`     (composicao mat+un+qtd)
 *  - anexos            → `IAnexoManagerViewModel`        (signed-URL, intent/confirm)
 *
 * Mais duas operacoes de nivel da tarefa:
 *  - `updateDescricao(texto)` → `PUT /ordemDeServico/tarefa/:id` `{ descricao }`
 *  - `subscribeLive()`         → ativa/desativa subscriptions RTDB (apenas em
 *    `mode='execute'`); em outros modos retorna no-op (`() => {}`).
 *
 * Sobre `subscribeLive`:
 *  - O caller (UI) chama dentro de `useEffect` para manter o ciclo de vida
 *    em si — o Adapter NAO usa o hook `useMatchingObject` internamente
 *    (regra das hooks: nao chamavel dentro de funcoes). Em vez disso,
 *    delega a `useCoreService().subscribe/unsubscribe` (nao-hook).
 *  - Em `mode='execute'` registra as MOs do legacy TarefaItem.js linhas
 *    136-158: `tarefa{id}` e `tarefaJus{id}` com location `*`. O refresher
 *    chama `observacoes.load()` (e `anexos.loadAnexos()` quando aplicavel).
 *
 * Consumo:
 *   const vm = useTarefaItemViewModel({ tarefaId, mode: 'execute', fatherId })
 *   useEffect(() => vm.subscribeLive(), [vm])
 *   <TarefaItem vm={vm} mode="execute" tarefa={...} />
 */

import type { IUnidadeMaterialViewModel } from './IUnidadeMaterialViewModel'
import type { IInspecaoModalViewModel } from './IInspecaoModalViewModel'
import type { IAnexoManagerViewModel } from './IAnexoManagerViewModel'
import type { ITarefaStatusViewModel } from './ITarefaStatusViewModel'
import type { IObservacoesTarefaViewModel } from './IObservacoesTarefaViewModel'

export type TarefaItemMode = 'edit' | 'execute' | 'readOnly'

export interface ITarefaItemViewModel {
  /** Status da tarefa (PENDENTE↔ENCERRADO). Ativo em modo 'execute'. */
  status: ITarefaStatusViewModel

  /** Lista de observacoes/justificativas da tarefa */
  observacoes: IObservacoesTarefaViewModel

  /** Form de nova inspecao (delegado ao IInspecaoModalViewModel existente) */
  inspecao: IInspecaoModalViewModel

  /** Composicao Material+Unidade+Quantidade (delegado ao IUnidadeMaterialViewModel) */
  unidadeMaterial: IUnidadeMaterialViewModel

  /**
   * Anexos via fluxo signed-URL (delegado ao IAnexoManagerViewModel — mesmo
   * fluxo de `context: 'tarefa'`, `entityId: tarefaId`).
   */
  anexos: IAnexoManagerViewModel

  /**
   * Persiste descricao via `PUT /ordemDeServico/tarefa/:tarefaId`
   * com payload `{ descricao: texto }`.
   */
  updateDescricao(texto: string): Promise<void>

  /**
   * Ativa subscription RTDB (apenas em `mode='execute'`).
   * Retorna funcao de unsubscribe. Em outros modos retorna `() => {}`.
   *
   * O caller deve invocar dentro de `useEffect`:
   *   useEffect(() => vm.subscribeLive(), [vm])
   */
  subscribeLive(): () => void
}

export interface UseTarefaItemViewModelOptions {
  /** Id da tarefa alvo */
  tarefaId: string | number

  /**
   * Modo de operacao do componente:
   *  - 'edit'     → edicao (TarefasTab no FormV2). Sem subscription RTDB.
   *  - 'execute'  → execucao (OrdemDeServico tela). Subscription RTDB ativa.
   *  - 'readOnly' → apenas leitura. Sem subscription, sem mutacao.
   */
  mode: TarefaItemMode

  /**
   * Id da estrutura pai (ex: ordemDeServicoId). Repassado para
   * `useTarefaStatusViewModel` ao alternar status.
   */
  fatherId?: number | null

  /** Status inicial da tarefa, repassado para `useTarefaStatusViewModel`. */
  initialStatus?: ITarefaStatusViewModel['current']
}
