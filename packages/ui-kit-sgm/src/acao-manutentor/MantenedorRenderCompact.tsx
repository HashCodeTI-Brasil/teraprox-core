// @ts-nocheck
import React from 'react'
import {
  Badge,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@hashcodeti/ui-kit-core'
import { FaPlus, FaTimes, FaUser } from 'react-icons/fa'

/**
 * MantenedorRenderCompact (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Versão compacta do MantenedorRender: badges clicáveis por executor
 * ativo + botão com popover para atribuir novo. Sem Redux/CoreService
 * — todas as ações são callbacks injetados pelo consumer. O formulário
 * de autocomplete (SGM-OS interno GenericAutoCompleteForm) chega via
 * render prop `renderAtribuirForm`.
 *
 * Wave F.1.A: react-bootstrap Badge/Button + teraprox-ui-kit SwitchOnClick
 * -> ui-kit-core Badge/Button + Popover (Radix). API externa preservada
 * — `renderAtribuirForm({ handleClose })` continua recebendo handleClose
 * para fechar o popover após submit.
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
   * Quando fornecido, o botão Atribuir/Adicionar dispara este callback
   * em vez de abrir o popover SwitchOnClick + renderAtribuirForm.
   * Use para casos em que o caller quer abrir um modal externo
   * (ex.: PickMantenedorTipoModal em /os/execucao).
   */
  onAtribuirClick?: () => void
  /**
   * Render prop para formulário de atribuição (normalmente um
   * GenericAutoCompleteForm vindo do SGM-OS). Recebe `handleClose`
   * do Popover para fechar após submit.
   */
  renderAtribuirForm?: (args: { handleClose: () => void }) => React.ReactNode
}

export const MantenedorRenderCompact: React.FC<MantenedorRenderCompactProps> = ({
  readOnly = false,
  maintainers = [],
  onDesatribuir,
  onAtribuirClick,
  renderAtribuirForm,
}) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const executoresAtivos = maintainers?.filter((m) => m.active) || []

  if (readOnly) {
    return (
      <div className="flex items-center gap-2">
        <FaUser size={16} className="text-neutral-500" />
        <span className="text-neutral-500">
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

  const triggerLabel = executoresAtivos.length === 0 ? 'Atribuir' : 'Adicionar'

  return (
    <div className="flex items-center gap-2">
      <FaUser size={16} />

      {executoresAtivos.length > 0 && (
        <div className="flex gap-1">
          {executoresAtivos.map((m, index) => (
            <Badge
              key={m.mantenedorId || index}
              tone="primary"
              className="inline-flex items-center gap-1"
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

      {onAtribuirClick ? (
        <Button
          variant="outline-primary"
          size="sm"
          leftIcon={<FaPlus size={12} />}
          onClick={onAtribuirClick}
        >
          {triggerLabel}
        </Button>
      ) : renderAtribuirForm ? (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline-primary"
              size="sm"
              leftIcon={<FaPlus size={12} />}
            >
              {triggerLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent size="auto">
            {renderAtribuirForm({ handleClose: () => setPopoverOpen(false) })}
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  )
}

export default MantenedorRenderCompact
