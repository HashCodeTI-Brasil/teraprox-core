// @ts-nocheck
import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import { FaPlus, FaTimes, FaUser } from 'react-icons/fa'
import { SwitchOnClick } from 'teraprox-ui-kit'

/**
 * MantenedorRenderCompact (ui-kit-sgm) — Wave 2C migration.
 *
 * Versão compacta do MantenedorRender: badges clicáveis por executor
 * ativo + botão com popover para atribuir novo. Sem Redux/CoreService
 * — todas as ações são callbacks injetados pelo consumer. O formulário
 * de autocomplete (SGM-OS interno GenericAutoCompleteForm) chega via
 * render prop `renderAtribuirForm`.
 */

export interface MaintainerAssignment {
  mantenedorId?: string | number
  active?: boolean
  mantenedor?: {
    nomeUsuario?: string
    _fullName?: string
    [k: string]: any
  }
  [k: string]: any
}

export interface MantenedorRenderCompactProps {
  readOnly?: boolean
  maintainers?: MaintainerAssignment[]
  /** Chamado ao clicar no X de um badge (desatribuir) */
  onDesatribuir?: (assignment: MaintainerAssignment) => void
  /**
   * Render prop para formulário de atribuição (normalmente um
   * GenericAutoCompleteForm vindo do SGM-OS). Recebe `handleClose`
   * do SwitchOnClick para fechar o popover após submit.
   */
  renderAtribuirForm?: (args: { handleClose: () => void }) => React.ReactNode
}

export const MantenedorRenderCompact: React.FC<MantenedorRenderCompactProps> = ({
  readOnly = false,
  maintainers = [],
  onDesatribuir,
  renderAtribuirForm,
}) => {
  const executoresAtivos = maintainers?.filter((m) => m.active) || []

  if (readOnly) {
    return (
      <div className="d-flex align-items-center gap-2">
        <FaUser size={16} className="text-muted" />
        <span className="text-muted">
          {executoresAtivos.length > 0
            ? executoresAtivos
                .map(
                  (m) =>
                    m.mantenedor?.nomeUsuario || m.mantenedor?._fullName,
                )
                .join(', ')
            : 'Não atribuído'}
        </span>
      </div>
    )
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <FaUser size={16} />

      {executoresAtivos.length > 0 && (
        <div className="d-flex gap-1">
          {executoresAtivos.map((m, index) => (
            <Badge
              key={m.mantenedorId || index}
              bg="primary"
              className="d-flex align-items-center gap-1"
              style={{ fontSize: '0.75rem' }}
            >
              {m.mantenedor?.nomeUsuario ||
                m.mantenedor?._fullName ||
                'Nome não disponível'}
              <FaTimes
                size={10}
                style={{ cursor: 'pointer' }}
                onClick={() => onDesatribuir && onDesatribuir(m)}
              />
            </Badge>
          ))}
        </div>
      )}

      {renderAtribuirForm && (
        <SwitchOnClick
          placeHolder={
            <Button
              variant="outline-primary"
              size="sm"
              className="d-flex align-items-center gap-1"
            >
              <FaPlus size={12} />
              {executoresAtivos.length === 0 ? 'Atribuir' : 'Adicionar'}
            </Button>
          }
        >
          {({ handleClose }: { handleClose: () => void }) =>
            renderAtribuirForm({ handleClose })
          }
        </SwitchOnClick>
      )}
    </div>
  )
}

export default MantenedorRenderCompact
