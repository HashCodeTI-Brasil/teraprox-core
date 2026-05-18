// @ts-nocheck
import React from 'react'
import { Button, Spinner } from '@hashcodeti/ui-kit-core'
import { BsPlay, BsCheckCircle } from 'react-icons/bs'

/**
 * OrdemStatusActions — Wave G.1 promotion (de teraprox-SGM-OM/Components/OrdemStatusActions.js).
 *
 * Botões de ação adaptativos ao status de uma Ordem de Manutenção
 * (PENDENTE → Iniciar OM, EXECUTANDO → Concluir OM, CONCLUIDO →
 * meta de quem encerrou). Apresentacional puro, props-driven.
 */

export interface OrdemStatusActionsOrdem {
  encerradoPor?: string | null
  [k: string]: unknown
}

export interface OrdemStatusActionsProps {
  status: string
  ordem?: OrdemStatusActionsOrdem
  onIniciar?: () => void
  onConcluir?: () => void
  iniciando?: boolean
  concluindo?: boolean
  className?: string
}

export const OrdemStatusActions: React.FC<OrdemStatusActionsProps> = ({
  status,
  ordem,
  onIniciar,
  onConcluir,
  iniciando = false,
  concluindo = false,
  className,
}) => {
  if (status === 'PENDENTE') {
    return (
      <div className={className ?? 'mt-4'}>
        <small className="mb-3 block text-neutral-500">Aguardando início</small>
        <Button
          variant="success"
          size="lg"
          onClick={onIniciar}
          disabled={iniciando}
          className="px-4 font-bold"
        >
          {iniciando ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Iniciando...
            </>
          ) : (
            <>
              <BsPlay className="mr-2 inline-block" />
              Iniciar OM
            </>
          )}
        </Button>
      </div>
    )
  }

  if (status === 'EXECUTANDO') {
    return (
      <div className={className ?? 'mt-4'}>
        <Button
          variant="primary"
          size="lg"
          onClick={onConcluir}
          disabled={concluindo}
          className="px-4 font-bold"
        >
          {concluindo ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Concluindo...
            </>
          ) : (
            <>
              <BsCheckCircle className="mr-2 inline-block" />
              Concluir OM
            </>
          )}
        </Button>
      </div>
    )
  }

  if (status === 'CONCLUIDO' && ordem?.encerradoPor) {
    return (
      <div className={className ?? 'mt-4'}>
        <small className="block text-neutral-500">Concluída por</small>
        <strong className="text-state-success">{ordem.encerradoPor}</strong>
      </div>
    )
  }

  return null
}

export default OrdemStatusActions
