// @ts-nocheck
import React, { useState } from 'react'
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@hashcodeti/ui-kit-core'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaBolt, FaCheckCircle, FaPlay } from 'react-icons/fa'
import { OSQuickEndModal, type OSQuickEndModalOS } from './OSQuickEndModal'

/**
 * OSQuickActionsMenu — Wave G.1 promotion (de teraprox-SGM-OM/Components/OSQuickActionsMenu.js).
 *
 * Menu dropdown de ações rápidas para uma OS sem navegar para a tela
 * de execução. Componente apresentacional, props-driven:
 *  - `onStartOS` — abrir flow de início (caller renderiza modal próprio);
 *  - `onEndOS(os, parecer)` — encerrar OS (consumido pelo OSQuickEndModal);
 *  - `onQuickCheckOS(os)` — finalizar sem iniciar (QuickCheck);
 *  - `onUpdateOS(id, patch)` — patch de status (EXECUTANDO ↔ AGUARDANDO_RECURSO).
 *
 * O modal de "Iniciar OS" (OSQuickStartModal) NÃO é mais embutido aqui:
 * ele é DEDICADO (Port refactor pendente) e fica no caller. Quando o
 * usuário clica em "Iniciar OS", chamamos `onStartOS(os)` e o caller é
 * responsável por renderizar/abrir seu fluxo.
 *
 * O modal de encerramento (OSQuickEndModal) continua embutido aqui pois
 * já foi promovido nesta mesma wave (puramente apresentacional).
 */

export interface OSQuickActionsMenuOS extends OSQuickEndModalOS {
  id?: number | string
  status?: string
}

export interface OSQuickActionsMenuProps {
  os: OSQuickActionsMenuOS
  onStartOS?: (os: OSQuickActionsMenuOS) => void
  onEndOS?: (os: OSQuickActionsMenuOS, parecer: string) => void | Promise<void>
  onQuickCheckOS?: (os: OSQuickActionsMenuOS) => void
  onUpdateOS?: (id: number | string | undefined, patch: { status: string }) => void
  disabled?: boolean
  quickCheckEnabled?: boolean
  loading?: boolean
}

export const OSQuickActionsMenu: React.FC<OSQuickActionsMenuProps> = ({
  os,
  onStartOS,
  onEndOS,
  onQuickCheckOS,
  onUpdateOS,
  disabled = false,
  quickCheckEnabled = false,
  loading: _loading = false,
}) => {
  const [showEndModal, setShowEndModal] = useState(false)

  const isPendente = os.status === 'PENDENTE'
  const isExecutando = os.status === 'EXECUTANDO'
  const isAguardandoRecurso = os.status === 'AGUARDANDO_RECURSO'
  const isConcluido = os.status === 'CONCLUIDO'
  const isCanceled = os.status === 'CANCELED'

  if (isConcluido || isCanceled) return null

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              size="sm"
              disabled={disabled}
              aria-label={`Ações rápidas OS #${os.id}`}
              className="p-0 text-neutral-600 shadow-none"
            >
              <BsThreeDotsVertical size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {isPendente && (
              <>
                <DropdownMenuItem onSelect={() => onStartOS?.(os)}>
                  <FaPlay className="mr-2 inline-block" />
                  Iniciar OS
                </DropdownMenuItem>

                {quickCheckEnabled && (
                  <DropdownMenuItem onSelect={() => onQuickCheckOS?.(os)}>
                    <FaBolt className="mr-2 inline-block text-state-warning" />
                    Finalizar (Quick Check)
                  </DropdownMenuItem>
                )}
              </>
            )}

            {isExecutando && (
              <>
                <DropdownMenuItem onSelect={() => setShowEndModal(true)}>
                  <FaCheckCircle className="mr-2 inline-block text-brand-primary" />
                  Encerrar OS
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onUpdateOS?.(os.id, { status: 'AGUARDANDO_RECURSO' })}
                >
                  <FaBolt className="mr-2 inline-block text-state-warning" />
                  Aguardando Recurso
                </DropdownMenuItem>
              </>
            )}

            {isAguardandoRecurso && (
              <DropdownMenuItem
                onSelect={() => onUpdateOS?.(os.id, { status: 'EXECUTANDO' })}
              >
                <FaPlay className="mr-2 inline-block text-state-success" />
                Retomar OS
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <OSQuickEndModal
        show={showEndModal}
        onHide={() => setShowEndModal(false)}
        os={os}
        onEndOS={onEndOS}
      />
    </>
  )
}

export default OSQuickActionsMenu
