// @ts-nocheck
import React, { useState } from 'react'
import { GrCheckmark } from 'react-icons/gr'
import { AutoComplete, QrCodeScanButton } from 'teraprox-ui-kit'
import { useFindRecursoByTagViewModel } from 'teraprox-core-sdk'
import type {
  IFindRecursoByTagViewModel,
  HttpController,
} from 'teraprox-core-sdk'

/**
 * FindRecursoByTagField — apresentacional puro. Wave 2A.
 *
 * NAO usa useHttpController internamente — consome a Port
 * `IFindRecursoByTagViewModel`. Se `vm` nao for fornecido, resolve via
 * `useFindRecursoByTagViewModel()` default. Se `recursoController` for
 * fornecido (retrocompat), cria um Adapter local com ele.
 */

export interface FindRecursoByTagFieldProps {
  /** Callback chamado quando um recurso e selecionado ou lido via QR. */
  callback: (recurso: any, confirmed: boolean) => void
  /** Port opcional. */
  vm?: IFindRecursoByTagViewModel
  /**
   * Retrocompat — se fornecido, o componente cria um Adapter interno com
   * este controller (workaround federation endpoint bake-in).
   */
  recursoController?:
    | HttpController
    | Pick<HttpController, 'read' | 'get'>
}

export const FindRecursoByTagField: React.FC<FindRecursoByTagFieldProps> = ({
  callback,
  vm: vmProp,
  recursoController,
}) => {
  // Sempre chamamos o hook (regras do React). Se o caller passou vm, ele
  // vence — o default apenas mantem estabilidade de ordem de hooks.
  const defaultVm = useFindRecursoByTagViewModel(
    recursoController ? { recursoController } : undefined
  )
  const vm = vmProp ?? defaultVm

  const [selectedTag, setSelectedTag] = useState<any>('')
  const [reachedRecurso, setReachedRecurso] = useState<any>(null)

  const findRecursoByTagIdHandler = async (tagId: string | number) => {
    const r = await vm.searchByTagId(tagId)
    setReachedRecurso(r)
  }

  const findRecursoByTagDescriptionHandler = async (description: string) => {
    const recurso = await vm.searchByTag(description)
    if (!callback) {
      console.log('Recurso encontrado (sem callback):', recurso)
    } else if (recurso) {
      callback(recurso, true)
    }
  }

  const confirmRecursoSelectionButton = () => {
    return (
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
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <GrCheckmark
          size={25}
          onClick={() => reachedRecurso && callback(reachedRecurso, true)}
        />
      </div>
    )
  }

  return (
    <div>
      <AutoComplete
        sortKey={'id'}
        loadCondition={true}
        loadFunc={() => vm.loadActiveTags()}
        displayKey={'descricao'}
        title={'Selecione ou Digite a TAG'}
        actionButton={confirmRecursoSelectionButton}
        actionButton2={() => (
          <QrCodeScanButton
            callback={(description) =>
              findRecursoByTagDescriptionHandler(description)
            }
          />
        )}
        onSelectedClick={(v: any) => {
          setSelectedTag(v)
          findRecursoByTagIdHandler(v.id)
        }}
        value={selectedTag?.descricao || ''}
      />
    </div>
  )
}

export default FindRecursoByTagField
