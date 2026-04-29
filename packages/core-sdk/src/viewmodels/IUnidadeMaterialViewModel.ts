/**
 * Port for UnidadeMaterialForm (ui-kit).
 *
 * Implementado por ReduxUnidadeMaterialAdapter. A UI (UnidadeMaterialForm)
 * nao deve chamar useCoreService / useSelector / useDispatch — consome
 * exclusivamente este contrato via useUnidadeMaterialViewModel().
 */

export interface UnidadeMaterialRef {
  id: string | number
  nome: string
  [key: string]: any
}

export interface UnidadeMaterialValue {
  material?: UnidadeMaterialRef | null
  quantidade?: number | string
  unidade?: UnidadeMaterialRef | null
}

export interface ValidationResult {
  ok: boolean
  errors: Record<string, string>
}

export interface IUnidadeMaterialViewModel {
  /** Estado atual da composição Unidade-Material (Redux) */
  value: UnidadeMaterialValue

  /** Flag derivada: material+unidade+quantidade numerica > 0 */
  isValid: boolean

  /** Flag transiente — true enquanto submit() esta pendente */
  isSubmitting: boolean

  /** Atualiza material selecionado */
  onMaterialSelected(material: UnidadeMaterialRef): void

  /** Atualiza quantidade */
  onQuantidadeUpdate(qtd: string): void

  /** Atualiza unidade de medida */
  onUnidadeSelected(unidade: UnidadeMaterialRef): void

  /** Carrega lista de materiais (via useCoreService('material')) */
  loadMaterials(): Promise<any[]>

  /** Carrega lista de unidades (via useCoreService('unidade')) */
  loadUnidades(): Promise<any[]>

  /** Limpa o estado da composicao */
  clear(): void

  /** Popula a composicao para edicao */
  populate(value: UnidadeMaterialValue): void

  /** Validacao sincrona — mesma regra do SGM-OS Services/default/validations.js */
  validate(): ValidationResult

  /**
   * Retorna o DTO consolidado pronto para o caller persistir.
   * Nao dispatcha side effects adicionais — apenas valida e devolve.
   * Lanca Error se validate() falhar.
   */
  submit(): Promise<UnidadeMaterialValue>

  /** Alias semantico de clear() para modal composto */
  reset(): void

  /**
   * Persiste edicao inline da quantidade utilizada de uma TarefaUnidadeMaterial.
   *
   * Em modo `edit` a UI consumidora pode interceptar via callback opcional
   * (`TarefaItemProps.onAddUnidadeMaterial` etc); em `execute` o adapter
   * persiste direto via `PUT /tarefaUnidadeMaterial/:id`.
   *
   * O adapter recebe `tarefaId` na construcao do hook
   * (`useUnidadeMaterialViewModel(tarefaId)`) e o adiciona ao body.
   *
   * Em caso de erro, dispara `useToast().warning(...)` e relan ca o erro
   * para que o caller possa reverter estado otimista se desejar.
   */
  updateQuantidade(tumId: string | number, quantidade: number): Promise<void>
}
