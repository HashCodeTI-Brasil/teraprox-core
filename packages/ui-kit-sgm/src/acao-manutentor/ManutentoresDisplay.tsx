// @ts-nocheck
import React from 'react'
import { Tooltip } from '@hashcodeti/ui-kit-core'
import { GrUserWorker } from 'react-icons/gr'

/**
 * ManutentoresDisplay (ui-kit-sgm) — Wave F.1.A migration.
 *
 * Componente 100% presentacional. Lista executores ativos (mantenedores
 * atribuídos a uma OS) com tooltip para os adicionais. Migrado 1:1 do
 * SGM-OS. Sem dependências de Redux/CoreService.
 *
 * Wave F.1.A: react-bootstrap (OverlayTrigger+Tooltip) -> ui-kit-core
 * Tooltip wrapper Radix.
 */

export interface ManutentorEntry {
  mantenedorId?: string | number
  nomeUsuario?: string
  active?: boolean
  [key: string]: any
}

export interface ManutentoresDisplayProps {
  manutentores?: ManutentorEntry[]
  onIconClick?: () => void
  label?: string
}

export const ManutentoresDisplay: React.FC<ManutentoresDisplayProps> = ({
  manutentores = [],
  onIconClick = () => {},
  label = 'Executor(es):',
}) => {
  const executoresAtivos = manutentores.filter((m) => m.active)
  const primeiro = executoresAtivos[0]?.nomeUsuario
  const restantes = executoresAtivos.slice(1)

  const tooltipContent = (
    <div className="flex flex-col gap-0.5">
      {restantes.map((m) => (
        <div key={m.mantenedorId}>{m.nomeUsuario}</div>
      ))}
    </div>
  )

  return (
    <span className="inline-flex items-center gap-2">
      <strong>{label}</strong> {primeiro ?? '-'}{' '}
      <GrUserWorker onClick={onIconClick} />
      {restantes.length > 0 && (
        <Tooltip content={tooltipContent} side="top" delayDuration={150}>
          <span className="inline-flex items-center gap-1 cursor-pointer">
            <small>+{restantes.length}</small>
          </span>
        </Tooltip>
      )}
    </span>
  )
}

export default ManutentoresDisplay
