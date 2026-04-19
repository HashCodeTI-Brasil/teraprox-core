import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHttpController } from '../hooks/useHttpController'
import type { HttpController } from '../types/HttpController'
import { setLevels } from '../reducers/branchLevelReducer'
import type {
  Branch,
  BranchNodeRef,
  IRecursoDisplayerViewModel,
} from './IRecursoDisplayerViewModel'

/**
 * Overrides opcionais de controllers — usado por callers que precisam de
 * `gatewayBase` custom (ex. teraprox-SGM-OS/src/hooks/useArvoreControllers.js)
 * para evitar que `useHttpController('')` caia em endpoint relativo.
 *
 * Regra de memoria (Federation endpoint bake-in): nunca passar
 * `endPointManutencao` / `endPointUser` como baseEndPoint. O Adapter
 * usa apenas o que for injetado OU o default de `useHttpController()`.
 */
export interface RecursoDisplayerAdapterOverrides {
  arvoreEstruturalController?: HttpController
  branchLevelController?: HttpController
}

/**
 * Adapter Redux que implementa IRecursoDisplayerViewModel.
 *
 * Porta para o Redux a logica antes inline em
 * `teraprox-core/packages/ui-kit/src/displays/RecursoDisplayer.tsx`
 * (useEffect de init + branchSetter + backOnBranch, L42-101).
 *
 * - `branches` vive em useState local (estado de navegacao do componente)
 * - `levels` (branchLevel.readAll) continua em Redux via slice existente
 *   (`branchLevelReducer.setLevels`) porque outros componentes do dominio
 *   consomem essa lista.
 */
export function useRecursoDisplayerViewModel(
  overrides: RecursoDisplayerAdapterOverrides = {}
): IRecursoDisplayerViewModel {
  const dispatch = useDispatch()

  // Fallback controllers — se override nao fornecido, resolve via DI default.
  const defaultArvore = useHttpController('')
  const defaultBranchLevel = useHttpController('branchLevel')

  const arvoreCtrl = overrides.arvoreEstruturalController ?? defaultArvore
  const branchLevelCtrl = overrides.branchLevelController ?? defaultBranchLevel

  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Ref para leitura sincrona dentro de advanceBranch — evita stale closure
  // sem re-memoizar o callback a cada atualizacao de `branches`.
  const branchesRef = useRef<Branch[]>(branches)
  useEffect(() => {
    branchesRef.current = branches
  }, [branches])

  const loadInitialBranches = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    try {
      try {
        const b = await arvoreCtrl.get('branchByBranchLevel/1')
        setBranches(Array.isArray(b) ? (b as Branch[]) : [])
      } catch (err) {
        console.warn('[RecursoDisplayerVM] branchByBranchLevel/1 failed:', err)
        setBranches([])
      }
      try {
        const lv = await branchLevelCtrl.readAll()
        dispatch(setLevels(Array.isArray(lv) ? lv : []))
      } catch (err) {
        console.warn('[RecursoDisplayerVM] branchLevel.readAll failed:', err)
      }
    } finally {
      setIsLoading(false)
    }
  }, [arvoreCtrl, branchLevelCtrl, dispatch])

  const advanceBranch = useCallback(
    async (bn: BranchNodeRef): Promise<void> => {
      setIsLoading(true)
      try {
        const current = branchesRef.current
        const parentBranch = current.find((b) => b.id === (bn as any).branchId)
        const currentLevel = parentBranch?.branchLevel?.level ?? 1

        const branchsToStay = current
          .filter((b) => (b.branchLevel?.level ?? 0) <= currentLevel)
          .map((b) =>
            b.branchLevel?.level === currentLevel
              ? { ...b, nomeRecurso: bn.recurso.nome }
              : b
          )

        const nextBranchId =
          (bn.recurso as any).branchId ?? bn.recurso.branch?.id
        if (nextBranchId) {
          try {
            const nextBranch = await arvoreCtrl.read('branch', nextBranchId)
            if (nextBranch && (nextBranch as any).branchLevel) {
              branchsToStay.push(nextBranch as Branch)
            }
          } catch (e) {
            console.warn(
              '[RecursoDisplayerVM] Failed to fetch child branch:',
              e
            )
          }
        }

        setBranches([...branchsToStay])
      } finally {
        setIsLoading(false)
      }
    },
    [arvoreCtrl]
  )

  const backToBranch = useCallback((branch: Branch): void => {
    setBranches((prev) =>
      prev.filter(
        (b) => (b.branchLevel?.level ?? 0) <= (branch.branchLevel?.level ?? 0)
      )
    )
  }, [])

  const reset = useCallback((): void => {
    setBranches([])
  }, [])

  return useMemo<IRecursoDisplayerViewModel>(
    () => ({
      branches,
      isLoading,
      loadInitialBranches,
      advanceBranch,
      backToBranch,
      reset,
    }),
    [branches, isLoading, loadInitialBranches, advanceBranch, backToBranch, reset]
  )
}
