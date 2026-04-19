/**
 * Port for RecursoDisplayer (ui-kit-sgm).
 *
 * Implementado por ReduxRecursoDisplayerAdapter. A UI (RecursoDisplayer)
 * nao deve chamar useDispatch / useSelector / useHttpController /
 * useCoreService — consome exclusivamente este contrato via
 * useRecursoDisplayerViewModel().
 *
 * Wave 2A da sprint 2026-04-21-ui-kit-domain-split-wave0 — elimina a
 * violacao P0 apontada em wiki/troubleshooting/2026-04-19-ui-kit-hexagonal-audit.md.
 */

export interface BranchLevelRef {
  level: number
  color?: string
  nome?: string
  [k: string]: any
}

export interface BranchNodeRef {
  recurso: {
    id: string | number
    nome: string
    branchId?: string | number
    branch?: { id: string | number; [k: string]: any }
    [k: string]: any
  }
  [k: string]: any
}

export interface Branch {
  id: string | number
  branchId?: string | number
  nomeRecurso?: string
  branchLevel?: BranchLevelRef
  branchNodes?: BranchNodeRef[]
  [k: string]: any
}

export interface IRecursoDisplayerViewModel {
  /** Trilha atual (nivel raiz -> folha) do seletor arvore. */
  branches: Branch[]

  /** Flag transiente enquanto loadInitialBranches / advanceBranch estao pendentes. */
  isLoading: boolean

  /**
   * Carrega a raiz da arvore:
   *   - arvoreEstrutural.get('branchByBranchLevel/1')  -> seta `branches[0]`
   *   - branchLevel.readAll()                          -> dispatch(setLevels(...))
   */
  loadInitialBranches(): Promise<void>

  /**
   * "branchSetter" do componente original (displays/RecursoDisplayer.tsx L69-94).
   * Avanca a trilha — ao selecionar um branchNode no dropdown atual, carrega
   * o proximo nivel via arvoreEstrutural.read('branch', nextBranchId).
   */
  advanceBranch(bn: BranchNodeRef): Promise<void>

  /**
   * "backOnBranch" do componente original (L96-101). Recolhe a trilha para
   * o nivel clicado, descartando niveis mais profundos.
   */
  backToBranch(branch: Branch): void

  /** Reinicia a trilha para vazio (util em cancel/cleanup). */
  reset(): void
}
