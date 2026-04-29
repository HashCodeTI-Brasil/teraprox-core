/**
 * Adapter default do Port `ITarefaStatusViewModel`.
 *
 * Embora nomeado "Redux*Adapter" pela convencao do core-sdk, NAO usa Redux —
 * apenas `useState` local + `useCoreService().createController('tarefa')`
 * para persistir via `PUT /tarefa/:id`.
 *
 * Backend: TarefaController montado em `@Controller("/")` + prefix `tarefa`
 * → `/tarefa/:id` (root, sem prefixo /ordemDeServico). Tarefas com id UUID
 * (recorrencia) tambem sao aceitas porque o service trata generico.
 *
 * Em caso de erro de persistencia, reverte o estado e dispara
 * `useToast().warning(...)` informando o usuario.
 */

import { useCallback, useMemo, useState } from 'react'
import { useCoreService } from '../hooks/useCoreService'
import { useToast } from '../hooks/useToast'
import type {
  ITarefaStatusViewModel,
  TarefaStatus,
  UseTarefaStatusOptions,
} from './ITarefaStatusViewModel'

export function useTarefaStatusViewModel(
  opts: UseTarefaStatusOptions
): ITarefaStatusViewModel {
  const { tarefaId, fatherId, initialStatus = 'PENDENTE' } = opts
  const { createController } = useCoreService()
  const toast = useToast()

  const [current, setCurrent] = useState<TarefaStatus>(initialStatus)
  const [saving, setSaving] = useState<boolean>(false)

  const tarefaCtrl = useMemo(
    () => createController('tarefa'),
    [createController]
  )

  const toggle = useCallback(async (): Promise<void> => {
    if (saving) return
    const previous = current
    const next: TarefaStatus = previous === 'ENCERRADO' ? 'PENDENTE' : 'ENCERRADO'

    // Atualizacao otimista
    setCurrent(next)
    setSaving(true)
    try {
      const body: { status: TarefaStatus; fatherId?: number | null } = {
        status: next,
      }
      if (fatherId !== undefined && fatherId !== null) {
        body.fatherId = fatherId
      }
      await tarefaCtrl.put(String(tarefaId), body)
    } catch (err: any) {
      // Reverte e avisa
      setCurrent(previous)
      const msg =
        err?.message || 'Nao foi possivel atualizar o status da tarefa.'
      try {
        toast.warning(msg)
      } catch {
        // toast indisponivel — silencia
      }
    } finally {
      setSaving(false)
    }
  }, [saving, current, tarefaCtrl, tarefaId, fatherId, toast])

  return useMemo<ITarefaStatusViewModel>(
    () => ({ current, toggle, saving }),
    [current, toggle, saving]
  )
}
