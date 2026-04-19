/**
 * Port for JustificativaModal (ui-kit).
 *
 * O componente ui-kit `JustificativaModal` eh puramente apresentacional
 * (controlled via props/callbacks). Esta Port formaliza o ViewModel
 * reutilizavel para que consumers nao precisem re-implementar a logica
 * de adicionar/editar/remover/desfazer-remocao em cada tela.
 *
 * Implementado pelo `ReduxJustificativaModalAdapter` (default) — que vive
 * 100% em useState local (nao ha slice global). Consumers que quiserem
 * persistir em Redux podem implementar um Adapter proprio respeitando a
 * mesma interface.
 */

export interface JustificativaUserRef {
  userId: string | number
  userName?: string
  firstName?: string
}

export interface Justificativa {
  id: string | number
  descricao: string
  user?: JustificativaUserRef
  createdAt: string | number | Date
  removed?: boolean
  isNew?: boolean
  [k: string]: unknown
}

export interface JustificativaValidationResult {
  ok: boolean
  errors: Record<string, string>
}

export interface IJustificativaModalViewModel {
  /** Lista atual (inclui soft-deleted com `removed=true`) */
  justificativas: Justificativa[]

  /** Texto do input de nova justificativa / edicao em andamento */
  draft: string

  /** Id sendo editado; null quando for criacao nova */
  editingId: string | number | null

  /** True enquanto submit() estiver pendente */
  isSubmitting: boolean

  /** Atualiza o draft */
  setDraft(value: string): void

  /** Coloca uma justificativa em modo edicao (copia descricao pro draft) */
  startEdit(id: string | number): void

  /** Cancela edicao e limpa draft */
  cancelEdit(): void

  /**
   * Adiciona (ou salva edicao) a justificativa usando o draft atual.
   * Gera id local com `uuid` v4 quando em criacao.
   * Retorna a lista atualizada apos persistir (quando onUpdate foi fornecido).
   */
  addOrEdit(): Promise<Justificativa[]>

  /** Soft-delete: marca `removed=true` */
  remove(id: string | number): Promise<Justificativa[]>

  /** Desfaz soft-delete: volta `removed=false` */
  undoRemove(id: string | number): Promise<Justificativa[]>

  /** Valida estado atual (draft nao-vazio quando editando) */
  validate(): JustificativaValidationResult

  /** Reseta para a lista inicial (descarta edicoes locais) */
  reset(): void

  /** Popula a lista para visualizacao/edicao */
  populateFromExisting(justificativas: Justificativa[]): void
}
