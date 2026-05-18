// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/PlanoBadgeSelector.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Selector visual de planos com badges
// de alerta (desvios em vermelho, alertas estatisticos em amarelo) e busca.
// react-bootstrap removido; CSS local migrado para Tailwind.
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Badge, cn } from '@hashcodeti/ui-kit-core'
import { FiChevronDown, FiX } from 'react-icons/fi'

export interface PlanoBadgeOption {
  value: string | number
  label: string
  totalRegistrosForaGlobal?: number
  itensAlertaEstatistica?: number
}

export interface PlanoBadgeSelectorProps {
  selectedPlanoId?: string | number | null
  setSelectedPlanoId: (value: string | number) => void
  planoOptions?: PlanoBadgeOption[]
  disabled?: boolean
  className?: string
}

export const PlanoBadgeSelector: React.FC<PlanoBadgeSelectorProps> = ({
  selectedPlanoId,
  setSelectedPlanoId,
  planoOptions = [],
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = searchTerm
    ? planoOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : planoOptions

  const selectedOption = planoOptions.find(
    (o) => String(o.value) === String(selectedPlanoId),
  )

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  const handleSelectPlano = (value: string | number) => {
    setSelectedPlanoId(value)
    setSearchTerm('')
    setIsOpen(false)
  }

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      <button
        type="button"
        className={cn(
          'w-full flex items-center justify-between gap-2',
          'px-3 py-2 rounded-md border border-neutral-300 bg-white',
          'text-left text-sm hover:border-neutral-400 transition-colors',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          isOpen && 'border-primary-500 ring-2 ring-primary-100',
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="truncate text-neutral-800">
            {selectedOption ? selectedOption.label : 'Selecione um plano'}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {(selectedOption?.totalRegistrosForaGlobal ?? 0) > 0 && (
              <Badge
                tone="danger"
                title={`${selectedOption?.totalRegistrosForaGlobal} registros fora de especificação`}
              >
                {selectedOption?.totalRegistrosForaGlobal} Fora
              </Badge>
            )}
            {(selectedOption?.itensAlertaEstatistica ?? 0) > 0 && (
              <Badge
                tone="warning"
                title={`${selectedOption?.itensAlertaEstatistica} controles com alertas`}
              >
                {selectedOption?.itensAlertaEstatistica} Alertas
              </Badge>
            )}
          </div>
        </div>
        <FiChevronDown
          className={cn(
            'flex-shrink-0 transition-transform text-neutral-500',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-1 w-full rounded-md border border-neutral-200',
            'bg-white shadow-lg overflow-hidden',
          )}
        >
          <div className="relative p-2 border-b border-neutral-200">
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite para filtrar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                'w-full px-3 py-1.5 pr-8 rounded border border-neutral-200',
                'text-sm focus:outline-none focus:border-primary-500',
              )}
              aria-label="Buscar plano"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="text-center py-4 text-sm text-neutral-500">
                {searchTerm ? 'Nenhum plano encontrado' : 'Nenhum plano disponível'}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const selected = String(option.value) === String(selectedPlanoId)
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleSelectPlano(option.value)}
                    className={cn(
                      'w-full flex items-center justify-between gap-2 px-3 py-2',
                      'text-left text-sm hover:bg-neutral-100 transition-colors',
                      selected && 'bg-primary-50 text-primary-900 font-medium',
                    )}
                  >
                    <span className="truncate flex-1">{option.label}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {(option.totalRegistrosForaGlobal ?? 0) > 0 && (
                        <Badge
                          tone="danger"
                          title={`${option.totalRegistrosForaGlobal} registros fora`}
                        >
                          {option.totalRegistrosForaGlobal}
                        </Badge>
                      )}
                      {(option.itensAlertaEstatistica ?? 0) > 0 && (
                        <Badge
                          tone="warning"
                          title={`${option.itensAlertaEstatistica} alertas`}
                        >
                          {option.itensAlertaEstatistica}
                        </Badge>
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanoBadgeSelector
