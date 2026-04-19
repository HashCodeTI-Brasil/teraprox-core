// @ts-nocheck
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { GrUserWorker } from 'react-icons/gr'

/**
 * ManutentoresDisplay (ui-kit-sgm) — Wave 2C migration.
 *
 * Componente 100% presentacional. Lista executores ativos (mantenedores
 * atribuídos a uma OS) com tooltip para os adicionais. Migrado 1:1 do
 * SGM-OS. Sem dependências de Redux/CoreService.
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

  const renderTooltip = (props: any) => (
    <Tooltip {...props}>
      {restantes.map((m) => (
        <div key={m.mantenedorId}>{m.nomeUsuario}</div>
      ))}
    </Tooltip>
  )

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <strong>{label}</strong> {primeiro ?? '-'}{' '}
      <GrUserWorker onClick={onIconClick} />
      {restantes.length > 0 && (
        <OverlayTrigger
          placement="top"
          overlay={renderTooltip}
          delay={{ show: 150, hide: 200 }}
        >
          <span
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <small>+{restantes.length}</small>
          </span>
        </OverlayTrigger>
      )}
    </span>
  )
}

export default ManutentoresDisplay
