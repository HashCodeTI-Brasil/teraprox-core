/**
 * Adapter default do Port `ITarefaItemViewModel`.
 *
 * Compoe os 5 VMs (status, observacoes, inspecao, unidadeMaterial, anexos),
 * adiciona `updateDescricao(...)` (PUT /ordemDeServico/tarefa/:id) e
 * `subscribeLive()` (RTDB em modo execute, no-op nos demais).
 *
 * Sobre `subscribeLive`:
 *  - `useMatchingObject` NAO pode ser invocado dentro de `subscribeLive`
 *    (regra das hooks). Por isso usamos `subscribe`/`unsubscribe` do
 *    `useCoreService()` que sao funcoes regulares.
 *  - O caller (UI) deve chamar dentro de `useEffect`, fazendo do retorno
 *    o cleanup:
 *
 *      useEffect(() => vm.subscribeLive(), [vm])
 *
 *  - Em `mode='execute'` registra MOs:
 *      `{ context: 'tarefa{id}',    location: '*', refresher }`
 *      `{ context: 'tarefaJus{id}', location: '*', refresher }`
 *    O `refresher` dispara `observacoes.load()` (e poderia disparar mais
 *    refreshes — anexos.loadAnexos — se necessario; mantido conservador
 *    aqui para nao causar loops).
 */

import { useCallback, useMemo, useRef } from 'react'
import { useCoreService } from '../hooks/useCoreService'
import { useToast } from '../hooks/useToast'
import { useAnexoManagerViewModel } from './ReduxAnexoManagerAdapter'
import { useInspecaoModalViewModel } from './useInspecaoModalViewModel'
import { useUnidadeMaterialViewModel } from './useUnidadeMaterialViewModel'
import { useObservacoesTarefaViewModel } from './ReduxObservacoesTarefaAdapter'
import { useTarefaStatusViewModel } from './ReduxTarefaStatusAdapter'
import type {
  ITarefaItemViewModel,
  UseTarefaItemViewModelOptions,
} from './ITarefaItemViewModel'
import type { MatchingObjectSubscription } from '../types/MatchingObject'

export function useTarefaItemViewModel(
  opts: UseTarefaItemViewModelOptions
): ITarefaItemViewModel {
  const { tarefaId, mode, fatherId, initialStatus } = opts

  const { createController, subscribe, unsubscribe } = useCoreService()
  const toast = useToast()

  const ordemServicoCtrl = useMemo(
    () => createController('ordemDeServico'),
    [createController]
  )

  // Composicao dos VMs filhos
  const status = useTarefaStatusViewModel({ tarefaId, fatherId, initialStatus })
  const observacoes = useObservacoesTarefaViewModel({ tarefaId })
  const inspecao = useInspecaoModalViewModel(tarefaId)
  const unidadeMaterial = useUnidadeMaterialViewModel(tarefaId)
  const anexos = useAnexoManagerViewModel({
    context: 'tarefa',
    entityId: tarefaId,
  })

  // Refs para refreshers acessarem sempre os VMs mais recentes sem recriar
  // a funcao `subscribeLive` quando dependencias internas mudam.
  const observacoesRef = useRef(observacoes)
  observacoesRef.current = observacoes
  const anexosRef = useRef(anexos)
  anexosRef.current = anexos

  const updateDescricao = useCallback(
    async (texto: string): Promise<void> => {
      try {
        await ordemServicoCtrl.put(`tarefa/${tarefaId}`, { descricao: texto })
      } catch (err: any) {
        const msg =
          err?.message ||
          'Nao foi possivel atualizar a descricao da tarefa.'
        try {
          toast.warning(msg)
        } catch {
          // toast indisponivel — silencia
        }
        throw err
      }
    },
    [ordemServicoCtrl, tarefaId, toast]
  )

  const subscribeLive = useCallback((): (() => void) => {
    if (mode !== 'execute') {
      return () => {}
    }

    // Refresher no-op: observacoes/anexos sao carregados sob demanda
    // pela UI quando o usuario abre o respectivo modal (espelha legacy
    // TarefaItem.js#236-248 que so fazia fetch em handleOpenObservacoesModal).
    // Carregar no subscribe inicial gerava 404 quando tarefaId tinha
    // formato UUID (recorrencias) e poluia console em tarefas com RTDB
    // ativo. Caller (UI consumidora) e responsavel por refresh Redux
    // full-tarefa via useMatchingObject proprio (ver SGM-OS
    // OrdemDeServico.tsx TarefaItemRow#reduxRefresher).
    const refresher = () => {
      // intencionalmente vazio
    }

    const moTarefa: MatchingObjectSubscription = {
      context: `tarefa${tarefaId}`,
      location: '*',
      refresher,
    }
    const moTarefaJus: MatchingObjectSubscription = {
      context: `tarefaJus${tarefaId}`,
      location: '*',
      refresher,
    }

    subscribe(moTarefa)
    subscribe(moTarefaJus)

    return () => {
      unsubscribe(moTarefa)
      unsubscribe(moTarefaJus)
    }
  }, [mode, tarefaId, subscribe, unsubscribe])

  return useMemo<ITarefaItemViewModel>(
    () => ({
      status,
      observacoes,
      inspecao,
      unidadeMaterial,
      anexos,
      updateDescricao,
      subscribeLive,
    }),
    [
      status,
      observacoes,
      inspecao,
      unidadeMaterial,
      anexos,
      updateDescricao,
      subscribeLive,
    ]
  )
}
