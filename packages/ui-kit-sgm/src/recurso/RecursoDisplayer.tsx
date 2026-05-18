// @ts-nocheck
import { useEffect, useState } from 'react'
import { Button } from '@hashcodeti/ui-kit-core'
import {
  useRecursoDisplayerViewModel,
  useFindRecursoByTagViewModel,
} from 'teraprox-core-sdk'
import type {
  IRecursoDisplayerViewModel,
  IFindRecursoByTagViewModel,
} from 'teraprox-core-sdk'
import BranchDropDisplay from './BranchDropDisplay'
import { FindRecursoByTagField } from './FindRecursoByTagField'

/**
 * RecursoDisplayer — apresentacional puro. Wave 2A.
 *
 * Toda logica de IO (useDispatch / useHttpController / setLevels / fetch de
 * branches) vive no Adapter do core-sdk (ReduxRecursoDisplayerAdapter).
 * Este componente apenas consome a Port `IRecursoDisplayerViewModel`.
 *
 * Se `vm` nao for fornecido, o componente resolve via
 * `useRecursoDisplayerViewModel()` default (DI via CoreService).
 *
 * Wave F.1.A: react-bootstrap Button -> ui-kit-core Button.
 */

export interface RecursoDisplayerProps {
  selectedList?: any[]
  onSaveRecurso: (recursos: any[], checked?: boolean) => void
  singleReturn?: boolean
  /** Port opcional — se nao fornecido, cria via hook interno. */
  vm?: IRecursoDisplayerViewModel
  /** Port opcional para busca por TAG. */
  findVm?: IFindRecursoByTagViewModel
}

export const RecursoDisplayer = ({
  selectedList = [],
  onSaveRecurso,
  singleReturn = false,
  vm: vmProp,
  findVm: findVmProp,
}: RecursoDisplayerProps) => {
  void selectedList

  // Hooks sempre chamados (regras do React). Se caller passou vm,
  // ignoramos o default. Isso mantem o custo do default pequeno (apenas
  // referencias a controllers) e preserva ordem de hooks entre renders.
  const defaultVm = useRecursoDisplayerViewModel()
  const defaultFindVm = useFindRecursoByTagViewModel()

  const vm = vmProp ?? defaultVm
  const findVm = findVmProp ?? defaultFindVm

  const [selectorDisplay, setSelectorDisplay] = useState('')
  const [multiMode, setMultiMode] = useState(false)

  useEffect(() => {
    vm.loadInitialBranches().catch((err) =>
      console.warn('[RecursoDisplayer] loadInitialBranches failed:', err)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ width: '100%', padding: 0 }} className="recurso-displayer-generic">
      <div className="flex justify-between items-center mb-3">
        <div>
          <label className="mr-2">Selecionar Recurso Por:</label>
          <Button
            size="sm"
            onClick={() => setSelectorDisplay('branch')}
            variant={selectorDisplay === 'branch' ? 'primary' : 'outline-primary'}
            className="mr-1"
          >
            Arvore
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectorDisplay('TAG')}
            variant={selectorDisplay === 'TAG' ? 'primary' : 'outline-primary'}
          >
            TAG
          </Button>
        </div>
      </div>

      {selectorDisplay === 'branch' &&
        vm.branches.map((branch, i) => (
          <BranchDropDisplay
            key={branch.id || i}
            branch={branch as any}
            addBranch={(bn) => {
              vm.advanceBranch(bn).catch((err) =>
                console.warn('[RecursoDisplayer] advanceBranch failed:', err)
              )
            }}
            multiMode={multiMode}
            setMultiMode={setMultiMode}
            onSaveRecurso={(rs: any[]) => onSaveRecurso(rs)}
            backOnBranch={(b) => vm.backToBranch(b as any)}
            branches={vm.branches as any}
            singleReturn={singleReturn}
          />
        ))}

      {selectorDisplay === 'TAG' && (
        <FindRecursoByTagField
          vm={findVm}
          callback={(rec, checked) => {
            onSaveRecurso([rec], checked)
          }}
        />
      )}
    </div>
  )
}

export default RecursoDisplayer
