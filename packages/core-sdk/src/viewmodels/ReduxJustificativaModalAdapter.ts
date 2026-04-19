import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  IJustificativaModalViewModel,
  Justificativa,
  JustificativaValidationResult,
} from './IJustificativaModalViewModel'
import type { JustificativaUserRef } from './IJustificativaModalViewModel'

/**
 * Gera um id local curto. Nao eh criptograficamente seguro nem RFC-4122;
 * serve apenas para identificar itens novos ate o backend devolver o id real.
 *
 * NB: evitamos `uuid` como dep porque (1) nao eh peerDep do core-sdk e
 * (2) memory rule: o pacote `uuidv4` (nao `uuid`) causa stack overflow no
 * browser — preferimos nao introduzir ambiguidade.
 */
function localId(): string {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export interface JustificativaAdapterOptions {
  /** Lista inicial (tipicamente vinda do backend via hook consumer) */
  initialJustificativas?: Justificativa[]

  /** Usuario corrente — usado para setar `user` ao criar novas */
  currentUser: JustificativaUserRef

  /**
   * Callback chamado apos qualquer mutacao. Recebe a lista completa
   * (inclui soft-deleted). O consumer tipicamente faz dispatch Redux
   * para persistir a alteracao.
   *
   * Retorno pode ser `void`, `Promise<void>`, ou `Promise<Justificativa[]>`
   * (caso o consumer normalize a lista). Quando Promise<Justificativa[]>
   * for retornada, usamos ela como novo estado.
   */
  onUpdate?: (
    justificativas: Justificativa[]
  ) => void | Promise<void> | Promise<Justificativa[]>
}

function runValidate(draft: string): JustificativaValidationResult {
  const errors: Record<string, string> = {}
  if (!draft || !draft.trim()) {
    errors.draft = 'Descreva o motivo antes de adicionar.'
  }
  return { ok: Object.keys(errors).length === 0, errors }
}

/**
 * Adapter default — gerencia estado local (useState) e delega persistencia
 * ao consumer via `onUpdate`. Nao fala com Redux diretamente porque
 * nao existe slice global de justificativas; consumers tipicamente
 * persistem como parte de uma tarefa/OS/OM.
 *
 * Caso um consumer queira slice proprio, basta implementar um Adapter
 * alternativo respeitando `IJustificativaModalViewModel`.
 */
export function useJustificativaModalViewModel(
  opts: JustificativaAdapterOptions
): IJustificativaModalViewModel {
  const { initialJustificativas = [], currentUser, onUpdate } = opts

  const [justificativas, setJustificativas] = useState<Justificativa[]>(
    initialJustificativas
  )
  const [draft, setDraft] = useState<string>('')
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const initialRef = useRef<Justificativa[]>(initialJustificativas)

  // Mantem sincronizado quando o consumer muda a lista inicial (ex: fetch remoto).
  useEffect(() => {
    initialRef.current = initialJustificativas
    setJustificativas(initialJustificativas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialJustificativas])

  const commit = useCallback(
    async (next: Justificativa[]): Promise<Justificativa[]> => {
      setJustificativas(next)
      if (!onUpdate) return next
      try {
        const maybe = await Promise.resolve(onUpdate(next))
        if (Array.isArray(maybe)) {
          setJustificativas(maybe)
          return maybe
        }
      } catch {
        // erros de persistencia ficam a cargo do consumer exibir
      }
      return next
    },
    [onUpdate]
  )

  const startEdit = useCallback(
    (id: string | number) => {
      const target = justificativas.find((j) => j.id === id)
      if (!target || target.removed) return
      setEditingId(id)
      setDraft(target.descricao ?? '')
    },
    [justificativas]
  )

  const cancelEdit = useCallback(() => {
    setEditingId(null)
    setDraft('')
  }, [])

  const addOrEdit = useCallback(async (): Promise<Justificativa[]> => {
    const result = runValidate(draft)
    if (!result.ok) return justificativas
    setIsSubmitting(true)
    try {
      let next: Justificativa[]
      if (editingId != null) {
        next = justificativas.map((j) =>
          j.id === editingId ? { ...j, descricao: draft } : j
        )
      } else {
        const nova: Justificativa = {
          id: localId(),
          descricao: draft,
          user: currentUser,
          createdAt: new Date().toISOString(),
          isNew: true,
        }
        next = [...justificativas, nova]
      }
      const committed = await commit(next)
      setDraft('')
      setEditingId(null)
      return committed
    } finally {
      setIsSubmitting(false)
    }
  }, [draft, editingId, justificativas, currentUser, commit])

  const remove = useCallback(
    async (id: string | number): Promise<Justificativa[]> => {
      const next = justificativas.map((j) =>
        j.id === id ? { ...j, removed: true } : j
      )
      return commit(next)
    },
    [justificativas, commit]
  )

  const undoRemove = useCallback(
    async (id: string | number): Promise<Justificativa[]> => {
      const next = justificativas.map((j) =>
        j.id === id ? { ...j, removed: false } : j
      )
      return commit(next)
    },
    [justificativas, commit]
  )

  const validate = useCallback(
    (): JustificativaValidationResult => runValidate(draft),
    [draft]
  )

  const reset = useCallback(() => {
    setJustificativas(initialRef.current)
    setDraft('')
    setEditingId(null)
  }, [])

  const populateFromExisting = useCallback((list: Justificativa[]) => {
    initialRef.current = list
    setJustificativas(list)
    setDraft('')
    setEditingId(null)
  }, [])

  return useMemo<IJustificativaModalViewModel>(
    () => ({
      justificativas,
      draft,
      editingId,
      isSubmitting,
      setDraft,
      startEdit,
      cancelEdit,
      addOrEdit,
      remove,
      undoRemove,
      validate,
      reset,
      populateFromExisting,
    }),
    [
      justificativas,
      draft,
      editingId,
      isSubmitting,
      startEdit,
      cancelEdit,
      addOrEdit,
      remove,
      undoRemove,
      validate,
      reset,
      populateFromExisting,
    ]
  )
}
