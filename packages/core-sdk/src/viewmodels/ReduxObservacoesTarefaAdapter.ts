/**
 * Adapter default do Port `IObservacoesTarefaViewModel`.
 *
 * Embora nomeado "Redux*Adapter" pela convencao do core-sdk, NAO usa Redux —
 * apenas `useState` local + `useCoreService().createController('tarefa')`
 * para chamar:
 *   - `GET /tarefa/readObservacoesTarefa/:id`  → `load()`
 *   - `POST /tarefa/addObservacaoTarefa/:id`   → `add({ texto })`
 *
 * Backend: TarefaController em api-manutencao agora montado em `@Controller("/")`
 * + prefix `tarefa` (sprint 2026-04-29-tarefa-item-unified — anteriormente
 * `@Controller("/ordemDeServico")`).
 *
 * Em erro de persistencia, dispara `useToast().warning(...)` e mantem o
 * estado local consistente.
 */

import { useCallback, useMemo, useState } from 'react'
import { useCoreService } from '../hooks/useCoreService'
import { useToast } from '../hooks/useToast'
import type {
  IObservacoesTarefaViewModel,
  ObservacaoTarefaPayload,
  UseObservacoesTarefaOptions,
} from './IObservacoesTarefaViewModel'

export function useObservacoesTarefaViewModel(
  opts: UseObservacoesTarefaOptions
): IObservacoesTarefaViewModel {
  const { tarefaId } = opts
  const { createController } = useCoreService()
  const toast = useToast()

  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const tarefaCtrl = useMemo(
    () => createController('tarefa'),
    [createController]
  )

  const load = useCallback(async (): Promise<void> => {
    setLoading(true)
    try {
      const res = await tarefaCtrl.get(
        `readObservacoesTarefa/${tarefaId}`
      )
      setList(Array.isArray(res) ? res : res?.data ?? [])
    } catch (err: any) {
      setList([])
      const msg =
        err?.message || 'Nao foi possivel carregar as observacoes.'
      try {
        toast.warning(msg)
      } catch {
        // toast indisponivel — silencia
      }
    } finally {
      setLoading(false)
    }
  }, [tarefaCtrl, tarefaId, toast])

  const add = useCallback(
    async (obs: ObservacaoTarefaPayload): Promise<void> => {
      setLoading(true)
      try {
        await tarefaCtrl.post(
          `addObservacaoTarefa/${tarefaId}`,
          obs
        )
        await load()
      } catch (err: any) {
        const msg =
          err?.message || 'Nao foi possivel adicionar a observacao.'
        try {
          toast.warning(msg)
        } catch {
          // toast indisponivel — silencia
        }
      } finally {
        setLoading(false)
      }
    },
    [tarefaCtrl, tarefaId, load, toast]
  )

  return useMemo<IObservacoesTarefaViewModel>(
    () => ({ list, loading, load, add }),
    [list, loading, load, add]
  )
}
