// @ts-nocheck
import React from 'react'
import { List, ListItem } from '@hashcodeti/ui-kit-core'
import { GrCheckmark } from 'react-icons/gr'
import { ApproveAndReproveButtons, FormField } from 'teraprox-ui-kit'
import type {
  MantenedorOption,
  IMantenedorPickerViewModel,
} from 'teraprox-core-sdk'

/**
 * MantenedorPicker (Wave 5B — hexagonal; Wave F.1.C — Tailwind/Radix migration).
 *
 * Widget props-driven: consome IMantenedorPickerViewModel (Port do
 * core-sdk). Zero Redux/useDispatch/useSelector/useCoreService direto.
 *
 * Substitui MantenedoresDisplay.js local do SGM-OS. CSS continua em
 * teraprox-SGM-OS/src/styles/mantenedoresDisplay.css (débito residual —
 * ui-kit-sgm ainda não importa CSS via tsup).
 *
 * Wave F.1.C (2026-05-13): removido `react-bootstrap` (ListGroup/ListGroup.Item)
 * em favor de `List`/`ListItem` de `@hashcodeti/ui-kit-core@0.7.0`. API
 * pública preservada (zero breaking change). FormField e
 * ApproveAndReproveButtons (teraprox-ui-kit) permanecem — não são bootstrap
 * e estão fora do escopo desta wave.
 */

export interface MantenedorPickerProps {
  viewModel: IMantenedorPickerViewModel
  currentOsId?: number | string | null
  onSelected: (item: MantenedorOption) => void
  label?: string
  disabled?: boolean
  className?: string
}

export const MantenedorPicker: React.FC<MantenedorPickerProps> = ({
  viewModel,
  currentOsId,
  onSelected,
  label = 'Manutentores',
  disabled,
  className,
}) => {
  const [hideOps, setHideOps] = React.useState(true)

  const handleClick = (m: MantenedorOption) => {
    const kind = viewModel.requestSelect(m, currentOsId)
    if (kind === 'immediate') {
      onSelected(m)
      viewModel.search(m.nomeUsuario)
      setHideOps(true)
    } else {
      setHideOps(true)
    }
  }

  const handleConfirm = () => {
    const item = viewModel.confirmSelect()
    if (item) {
      onSelected(item)
      viewModel.search(item.nomeUsuario)
    }
  }

  return (
    <div onMouseLeave={() => setHideOps(true)} className={className}>
      <FormField
        label={label}
        labelPosition="top"
        val={viewModel.isLoading ? 'Carregando...' : viewModel.searchTerm}
        onValueUpdate={(v: string) => {
          // qualquer input do user reabre a lista (típico autocomplete)
          if (hideOps) setHideOps(false)
          viewModel.search(v)
        }}
        onFocus={() => {
          setHideOps(false)
          viewModel.cancelConfirm()
        }}
        locked={disabled || viewModel.isLoading}
        className="mantenedores-label"
        others={{
          autoComplete: 'off',
          className: 'mantenedores-select',
        }}
      />

      {!hideOps && viewModel.pendingConfirm === null && (
        <List className="list-mantenedor-container">
          {viewModel.filteredOptions.length === 0 ? (
            <ListItem>Nenhum manutentor encontrado.</ListItem>
          ) : (
            viewModel.filteredOptions.map((m) => {
              const isBusyOther = m._busy && m.osId !== currentOsId
              const isBusyHere = m._busy && m.osId === currentOsId
              return (
                <ListItem
                  key={m.id}
                  onClick={() => handleClick(m)}
                  className={`mantenedor-option ${
                    isBusyOther ? 'busy' : ''
                  } ${isBusyHere ? 'current-os' : ''}`}
                >
                  <span className="flex items-center w-full">
                    <span>{m.nomeUsuario}</span>
                    {isBusyHere && (
                      <span className="current-os-indicator">
                        <GrCheckmark size={18} /> Trabalhando nesta OS
                      </span>
                    )}
                    {isBusyOther && (
                      <span className="busy-os-indicator">
                        {`Alocado OS-${m.osId}`}
                      </span>
                    )}
                  </span>
                </ListItem>
              )
            })
          )}
        </List>
      )}

      {viewModel.pendingConfirm && (
        <div className="confirm-desaloc-container">
          <ApproveAndReproveButtons
            headerText={`Deseja desalocar ${viewModel.pendingConfirm.nomeUsuario} da OS-${viewModel.pendingConfirm.osId} para uma nova alocação?`}
            approveCallback={handleConfirm}
            reproveCallback={() => {
              viewModel.cancelConfirm()
              setHideOps(false)
            }}
            cancelCallback={() => {
              viewModel.cancelConfirm()
              setHideOps(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default MantenedorPicker
