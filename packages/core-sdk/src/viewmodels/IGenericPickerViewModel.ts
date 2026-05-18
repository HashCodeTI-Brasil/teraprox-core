/**
 * IGenericPickerViewModel — Port hexagonal do `GenericPickerHost` (Wave H.5).
 *
 * Substitui o HOC factory `withGenericPicker` (522 LOC) duplicado em
 * `teraprox-SGM-OS/src/Hocs/withGenericPicker.js` e
 * `teraprox-app-SGM-UTILS/src/Hocs/withGenericPicker.js`.
 *
 * Responsabilidade: gerenciar a lista de itens "picados" + estado open/edit
 * de um picker generico (TarefaPicker, AcaoPicker, JustificativaPicker, ...).
 * View pura (`<GenericPickerHost />` em ui-kit-core) consome este Port via
 * render-props para o conteudo do form e do display.
 *
 * Adapter Redux de referencia (consumido pelos MFs SGM): pode encapsular o
 * antigo `genericPickerReducer` (slot por `pKey`) ou um slice novo. A view
 * NUNCA conhece Redux — recebe apenas a interface abaixo.
 */

export interface GenericPickerItem {
  id?: number | string
  removed?: boolean
  [key: string]: unknown
}

export interface IGenericPickerViewModel<T extends GenericPickerItem = GenericPickerItem> {
  // ─── State (read-only) ─────────────────────────────────────────────
  /** Itens atualmente selecionados (snapshot imutavel). */
  readonly picked: ReadonlyArray<T>
  /** True quando o painel de selecao/form esta expandido. */
  readonly isOpen: boolean
  /** Item em modo de edicao (null se add/idle). */
  readonly editingItem: T | null
  /** Indice do item em edicao (null se add/idle). */
  readonly editingIndex: number | null

  // ─── Selectors (sugar) ─────────────────────────────────────────────
  getPicked(): ReadonlyArray<T>
  getEditingItem(): T | null
  isEditing(): boolean

  // ─── Actions ───────────────────────────────────────────────────────
  /** Abre o painel (visual: troca display por form). */
  open(): void
  /** Fecha o painel sem salvar (cancelar). */
  close(): void
  /** Adiciona um item novo. Respeita `singlePick` (substitui ao inves de empilhar). */
  add(item: T): void
  /** Remove o item no indice indicado. */
  remove(index: number): void
  /** Coloca o item em modo edicao (abre painel). */
  edit(item: T, index: number): void
  /** Atualiza o item em edicao com o novo payload. */
  update(item: T): void
  /** Confirma a operacao corrente (add/edit) — fecha painel + dispara `onCommit` opcional. */
  commit(): void
  /** Descarta operacao corrente — fecha painel + reverte `editingItem`. */
  discard(): void
  /** Limpa todos os picked. */
  clearAll(): void
  /** Substitui a lista inteira (uso: hidratacao via fetch). */
  setPicked(items: ReadonlyArray<T>): void
}

/**
 * Opcoes de criacao do ViewModel — espelha props "estruturais" do HOC legado
 * (singlePick, key/identifier, callbacks de commit). Props apresentacionais
 * (textos, cores, componentes de display) ficam em `GenericPickerHostProps`.
 */
export interface UseGenericPickerOptions<T extends GenericPickerItem = GenericPickerItem> {
  /** Identificador unico do slot (substitui `pKey` + `Component.name + window.location`). */
  pickerKey: string
  /** Quando true, `add` substitui a lista inteira ao inves de empilhar. */
  singlePick?: boolean
  /** Itens iniciais (hidratacao sincrona). */
  initialPicked?: ReadonlyArray<T>
  /** Fetch async opcional para popular `picked` no mount. */
  fetchPicked?: () => Promise<ReadonlyArray<T>>
  /** Callback disparado quando `commit()` acontece em modo add. */
  onAdd?: (item: T, index: number, all: ReadonlyArray<T>) => void
  /** Callback disparado quando `commit()` acontece em modo edit. */
  onEdit?: (item: T, index: number, all: ReadonlyArray<T>) => void
  /** Callback disparado em `remove`. */
  onRemove?: (item: T, index: number, all: ReadonlyArray<T>) => void
}
