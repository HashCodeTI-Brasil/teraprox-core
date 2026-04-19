/**
 * Hook publico — reexporta o adapter default (local-state) como
 * implementacao do Port `IJustificativaModalViewModel`.
 *
 * Uso:
 *   const vm = useJustificativaModalViewModel({
 *     initialJustificativas: tarefa.tarefaJustificativas,
 *     currentUser: { userId, userName, firstName },
 *     onUpdate: (list) => dispatch(updateJustificativas({ tarefaId, list })),
 *   })
 *
 *   <JustificativaModal
 *     show={open}
 *     onClose={onClose}
 *     justificativas={vm.justificativas}
 *     currentUserId={currentUser.userId}
 *     currentUserName={currentUser.firstName ?? ''}
 *     onUpdateJustificativas={vm.populateFromExisting}
 *   />
 */
export { useJustificativaModalViewModel } from './ReduxJustificativaModalAdapter'
export type { JustificativaAdapterOptions } from './ReduxJustificativaModalAdapter'
