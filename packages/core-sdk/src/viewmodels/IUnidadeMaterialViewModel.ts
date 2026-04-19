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
}
