/**
 * Hook publico — reexporta o adapter Redux como implementacao default do Port.
 *
 * Uso:
 *   const vm = useUnidadeMaterialViewModel(tarefaId?)
 *   <UnidadeMaterialForm
 *      value={vm.value}
 *      onMaterialSelected={vm.onMaterialSelected}
 *      onQuantidadeUpdate={vm.onQuantidadeUpdate}
 *      onUnidadeSelected={vm.onUnidadeSelected}
 *      loadMaterialsFunc={vm.loadMaterials}
 *      loadUnidadesFunc={vm.loadUnidades}
 *   />
 */
export { useUnidadeMaterialViewModel } from './ReduxUnidadeMaterialAdapter'
