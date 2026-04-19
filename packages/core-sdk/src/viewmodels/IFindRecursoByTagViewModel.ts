/**
 * Port for FindRecursoByTagField (ui-kit-sgm).
 *
 * Implementado por ReduxFindRecursoByTagAdapter. A UI nao chama
 * useHttpController — consome exclusivamente este contrato.
 *
 * Wave 2A da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */

export interface RecursoTagRef {
  id: string | number
  descricao?: string
  [k: string]: any
}

export interface IFindRecursoByTagViewModel {
  /** Flag transiente enquanto searchByTag / loadActiveTags estao pendentes. */
  isSearching: boolean

  /**
   * Carrega a lista de tags ativas (feed do AutoComplete).
   * Equivalente a recurso.get('findActiveRecursosTags').
   */
  loadActiveTags(): Promise<RecursoTagRef[]>

  /**
   * Busca um recurso pelo ID da tag selecionada no AutoComplete.
   * Equivalente a recurso.read('findRecursoByTagId', tagId).
   */
  searchByTagId(tagId: string | number): Promise<any | null>

  /**
   * Busca um recurso pela descricao lida via QR (sem espacos).
   * Equivalente a recurso.read('recurso/findByTagDescription', description).
   */
  searchByTag(description: string): Promise<any | null>
}
