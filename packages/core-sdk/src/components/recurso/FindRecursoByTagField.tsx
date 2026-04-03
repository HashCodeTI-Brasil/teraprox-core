import { useState } from 'react'
import { GrCheckmark } from 'react-icons/gr'
import { useHttpController } from '../../hooks/useHttpController'
import AutoComplete from './AutoComplete'
import QrCodeScanButton from './QrCodeScanButton'

interface FindRecursoByTagFieldProps {
  callback: (recurso: any, checked?: boolean) => void
}

const FindRecursoByTagField = ({ callback }: FindRecursoByTagFieldProps) => {
  const recursoController = useHttpController('recurso')
  const [selectedTag, setSelectedTag] = useState<any>(null)
  const [reachedRecurso, setReachedRecurso] = useState<any>(null)

  const findRecursoByTagIdHandler = async (tagId: string | number) => {
    const r = await recursoController.read('findRecursoByTagId', tagId)
    setReachedRecurso(r)
  }

  const findRecursoByTagDescriptionHandler = async (description: string) => {
    const recurso = await recursoController.read(
      'recurso/findByTagDescription',
      description.replace(' ', '')
    )
    if (!callback) {
      console.log(recurso)
    } else {
      callback(recurso, true)
    }
  }

  const confirmRecursoSelectionButton = () => (
    <div
      className="hoverable-div"
      style={{
        border: 'solid',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px',
        padding: '8px',
        borderLeft: 'none',
        borderColor: '#ccc',
        borderWidth: '1px',
      }}
    >
      <GrCheckmark size={25} onClick={() => callback(reachedRecurso, true)} />
    </div>
  )

  return (
    <div>
      <AutoComplete
        sortKey="id"
        loadCondition={true}
        loadFunc={() => recursoController.get('findActiveRecursosTags')}
        displayKey="descricao"
        title="Selecione ou Digite a TAG"
        isBold={true}
        actionButton={confirmRecursoSelectionButton}
        actionButton2={() => (
          <QrCodeScanButton
            callback={(description) => findRecursoByTagDescriptionHandler(description)}
          />
        )}
        onSelectedClick={(v) => {
          setSelectedTag(v)
          findRecursoByTagIdHandler(v.id)
        }}
        value={selectedTag?.descricao}
      />
    </div>
  )
}

export default FindRecursoByTagField
