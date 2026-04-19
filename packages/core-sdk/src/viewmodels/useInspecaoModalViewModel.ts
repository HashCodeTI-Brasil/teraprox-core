/**
 * Hook publico — reexporta o adapter Redux como implementacao default do Port.
 *
 * Uso:
 *   const vm = useInspecaoModalViewModel(tarefaId?)
 *   <InspecaoModal
 *      value={vm.value}
 *      isValid={vm.isValid}
 *      isSubmitting={vm.isSubmitting}
 *      onTipoDeDado={vm.onTipoDeDado}
 *      onLimitesChange={vm.onLimitesChange}
 *      onSubmit={vm.submit}
 *      onReset={vm.reset}
 *   />
 */
export { useInspecaoModalViewModel } from './ReduxInspecaoModalAdapter'
