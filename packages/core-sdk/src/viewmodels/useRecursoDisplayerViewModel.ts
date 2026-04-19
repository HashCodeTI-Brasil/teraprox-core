/**
 * Hook publico — reexporta o adapter Redux como implementacao default do Port.
 *
 * Uso:
 *   const vm = useRecursoDisplayerViewModel() // default controllers
 *   // ou em federados que precisam de gatewayBase custom:
 *   const { arvoreEstruturalController, branchLevelController } = useArvoreControllers()
 *   const vm = useRecursoDisplayerViewModel({
 *     arvoreEstruturalController,
 *     branchLevelController,
 *   })
 */
export {
  useRecursoDisplayerViewModel,
  type RecursoDisplayerAdapterOverrides,
} from './ReduxRecursoDisplayerAdapter'
