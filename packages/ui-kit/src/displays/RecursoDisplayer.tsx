import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHttpController } from 'teraprox-core-sdk'
import type { HttpController } from 'teraprox-core-sdk'
import { setLevels } from 'teraprox-core-sdk'
import BranchDropDisplay from './BranchDropDisplay'
import { FindRecursoByTagField } from '../forms/FindRecursoByTagField'
import '../styles/RecursoDisplayer.css'

export interface RecursoDisplayerProps {
  selectedList?: any[]
  onSaveRecurso: (recursos: any[], checked?: boolean) => void
  singleReturn?: boolean
  arvoreEstruturalController?: HttpController
  branchLevelController?: HttpController
  recursoController?: HttpController
}

export const RecursoDisplayer = ({
  selectedList = [],
  onSaveRecurso,
  singleReturn = false,
  arvoreEstruturalController: injectedArvore,
  branchLevelController: injectedBranchLevel,
  recursoController: injectedRecurso,
}: RecursoDisplayerProps) => {
  void selectedList

  const defaultArvore = useHttpController('')
  const defaultBranchLevel = useHttpController('branchLevel')

  const arvoreEstruturalController = injectedArvore || defaultArvore
  const branchLevelController = injectedBranchLevel || defaultBranchLevel

  const [branches, setBranches] = useState<any[]>([])
  const dispatch = useDispatch()

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
    const parentBranch = branches.find((b) => b.id === bn.branchId)
    const currentLevel = parentBranch?.branchLevel?.level ?? 1

    const branchsToStay = branches
      .filter((b) => b.branchLevel.level <= currentLevel)
      .map((b) =>
        b.branchLevel.level === currentLevel
          ? { ...b, nomeRecurso: bn.recurso.nome }
          : b
      )

    const nextBranchId = bn.recurso.branchId ?? bn.recurso.branch?.id
    if (nextBranchId) {
      try {
        const nextBranch = await arvoreEstruturalController.read('branch', nextBranchId)
        if (nextBranch && nextBranch.branchLevel) {
          branchsToStay.push(nextBranch)
        }
      } catch (e) {
        console.warn('[RecursoDisplayer] Failed to fetch child branch:', e)
      }
    }

    setBranches([...branchsToStay])
  }

  const backOnBranch = (branch: any) => {
    const branchsToStay = branches.filter(
      (bArray) => bArray.branchLevel.level <= branch.branchLevel.level
    )
    setBranches(branchsToStay)
  }

  return (
    <div style={{ width: '100%', padding: 0 }} className="recurso-displayer-generic">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label className="me-2">Selecionar Recurso Por:</label>
          <Button
            size="sm"
            onClick={() => setSelectorDisplay('branch')}
            variant={selectorDisplay === 'branch' ? 'primary' : 'outline-primary'}
            className="me-1"
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
          recursoController={injectedRecurso}
          callback={(rec, checked) => {
            onSaveRecurso([rec], checked)
          }}
        />
      )}
    </div>
  )
}

export default RecursoDisplayer
