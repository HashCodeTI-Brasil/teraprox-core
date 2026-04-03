import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHttpController } from '../../hooks/useHttpController'
import { setLevels } from '../../reducers/branchLevelReducer'
import BranchDropDisplay from './BranchDropDisplay'
import FindRecursoByTagField from './FindRecursoByTagField'

interface RecursoDisplayerProps {
  selectedList?: any[]
  onSaveRecurso: (recursos: any[], checked?: boolean) => void
  singleReturn?: boolean
}

const RecursoDisplayer = ({
  selectedList = [],
  onSaveRecurso,
  singleReturn = false,
}: RecursoDisplayerProps) => {
  const arvoreEstruturalController = useHttpController('arvoreEstrutural')
  const branchLevelController = useHttpController('branchLevel')
  const [branches, setBranches] = useState<any[]>([])
  const dispatch = useDispatch()

  const [localSelected, setLocalSelected] = useState<any[]>(selectedList)
  const [selectorDisplay, setSelectorDisplay] = useState('')
  const [multiMode, setMultiMode] = useState(false)

  useEffect(() => {
    const init = async () => {
      const b = await arvoreEstruturalController.get('branchByBranchLevel/1')
      setBranches(b)
      const lv = await branchLevelController.readAll()
      dispatch(setLevels(lv))
    }
    init()
  }, [])

  const branchSetter = async (bn: any) => {
    const copy = [...branches]
    const branch = await arvoreEstruturalController.read('branch', bn.recurso.branch.id)
    copy[bn.recurso.branch.branchLevel.level - 1] = {
      ...branch,
      nomeRecurso: bn.recurso.nome,
    }
    setBranches(copy)
  }

  const backOnBranch = (branch: any) => {
    const branchsToStay = branches.filter(
      (bArray) => bArray.branchLevel.level <= branch.branchLevel.level
    )
    setBranches(branchsToStay)
  }

  return (
    <div style={{ width: '100%', padding: 0 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label className="me-2">Selecionar Recurso Por:</label>
          <Button
            size="sm"
            onClick={() => setSelectorDisplay('branch')}
            variant={selectorDisplay === 'branch' ? 'primary' : 'outline-primary'}
            className="me-1"
          >
            Árvore
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
        branches.map((branch, i) => (
          <BranchDropDisplay
            key={branch.id || i}
            branch={branch}
            addBranch={branchSetter}
            multiMode={multiMode}
            setMultiMode={setMultiMode}
            onSaveRecurso={onSaveRecurso}
            backOnBranch={backOnBranch}
            branches={branches}
            singleReturn={singleReturn}
          />
        ))}

      {selectorDisplay === 'TAG' && (
        <FindRecursoByTagField
          callback={(rec, checked) => {
            setLocalSelected([rec])
            onSaveRecurso([rec], checked)
          }}
        />
      )}
    </div>
  )
}

export default RecursoDisplayer
