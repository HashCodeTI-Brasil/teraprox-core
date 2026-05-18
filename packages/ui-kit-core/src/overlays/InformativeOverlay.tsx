// @hashcodeti/ui-kit-core/overlays/InformativeOverlay
//
// Wave G.1 (2026-05-15) — promovido de teraprox-SGM-OS/Components/default-components/overlays/informativeOverlay.js.
// Ícone (ou trigger custom) + tooltip Radix listando bullets de ajuda.
// Substitui OverlayTrigger/Tooltip de react-bootstrap pelo Tooltip Radix existente em ui-kit-core.

import * as React from 'react'
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../primitives/Tooltip'
import { cn } from '../lib/cn'

export interface InformativeOverlayItem {
  icon?: React.ReactNode
  label: React.ReactNode
}

export interface InformativeOverlayProps {
  contentItems?: InformativeOverlayItem[]
  /** Posicionamento do tooltip (default 'top'). */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Trigger custom; se omitido, renderiza ícone "i" padrão. */
  children?: React.ReactNode
  /** className aplicado ao wrapper trigger. */
  className?: string
}

/**
 * InformativeOverlay — ícone (ou nó custom) que ao hover/focus mostra lista de itens informativos.
 *
 * @example
 * <InformativeOverlay contentItems={[
 *   { icon: <FaCheck />, label: 'Concluído quando X' },
 *   { label: 'Revisado por Y' },
 * ]} />
 */
export const InformativeOverlay: React.FC<InformativeOverlayProps> = ({
  contentItems = [],
  placement = 'top',
  children,
  className,
}) => {
  if (!contentItems || contentItems.length === 0) {
    return <>{children ?? null}</>
  }

  const trigger = children ? (
    <span className={cn('inline-flex items-center cursor-pointer', className)}>{children}</span>
  ) : (
    <span
      className={cn('inline-flex items-center cursor-pointer text-info', className)}
      aria-label="Mais informações"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
    </span>
  )

  return (
    <TooltipProvider delayDuration={150}>
      <TooltipRoot>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent side={placement} className="max-w-xs">
          <div className="flex flex-col gap-1 text-left">
            {contentItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export default InformativeOverlay
