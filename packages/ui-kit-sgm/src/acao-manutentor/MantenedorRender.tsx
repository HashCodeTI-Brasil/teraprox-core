// @ts-nocheck
import React from 'react'
import { ManutentoresDisplay, ManutentorEntry } from './ManutentoresDisplay'

/**
 * MantenedorRender (ui-kit-sgm) — Wave 2C migration.
 *
 * Widget composto que alterna entre:
 *   - modo display: `ManutentoresDisplay` (lista executores ativos)
 *   - modo picker : render prop `renderPicker()` injetado pelo consumidor
 *
 * Sem Redux/CoreService. As ações de atribuir/desatribuir e o próprio
 * MantenedorPicker (dependência SGM-OS) ficam responsabilidade do caller
 * via `renderPicker`.
 */

export interface MantenedorRenderProps {
  readOnly?: boolean
  osId?: string | number
  isModalOpen?: boolean
  setMantenedoresView?: (v: boolean) => void
  setTargetOs?: (id: string | number) => void
  maintainers?: ManutentorEntry[]
  /** Render prop para o MantenedorPicker (SGM-OS interno). Recebido do consumer. */
  renderPicker?: () => React.ReactNode
}

export const MantenedorRender: React.FC<MantenedorRenderProps> = ({
  readOnly,
  osId,
  setMantenedoresView,
  isModalOpen,
  setTargetOs,
  maintainers,
  renderPicker,
}) => {
  const viewMantenedores = () => {
    if (!readOnly) {
      setTargetOs && osId !== undefined && setTargetOs(osId)
      setMantenedoresView && setMantenedoresView(true)
    }
  }

  return (
    <>
      {isModalOpen && renderPicker && renderPicker()}
      <div hidden={isModalOpen}>
        <ManutentoresDisplay
          onIconClick={viewMantenedores}
          label=""
          manutentores={maintainers?.map((m: any) => ({
            ...m,
            nomeUsuario:
              m.mantenedor?.nomeUsuario || m.mantenedor?._fullName,
          }))}
        />
      </div>
    </>
  )
}

export default MantenedorRender
