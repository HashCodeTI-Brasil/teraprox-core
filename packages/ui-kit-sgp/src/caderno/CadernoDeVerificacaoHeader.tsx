// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/CadernoDeVerificacaoHeader.tsx
// Wave E.2.1 — Refator Redux fraco -> prop (onDataChange).
// Wave F.2.B (2026-05-13) — react-bootstrap removido; migrado para
// @hashcodeti/ui-kit-core (Card, Button, Tooltip, Collapsible Radix, InputGroup, TextField).
// Row/Col Bootstrap → Tailwind grid.
import React, { useCallback, memo, useState } from 'react'
import {
  Button,
  Card,
  Tooltip,
  Collapsible,
  CollapsibleContent,
  InputGroup,
  InputGroupAddon,
  TextField,
} from '@hashcodeti/ui-kit-core'
import { FiSearch, FiRefreshCcw, FiChevronUp, FiChevronDown, FiSave } from 'react-icons/fi'

export interface CadernoDeVerificacaoHeaderProps {
  isSaving?: boolean
  saveCustomFolhas?: () => void
  canSave?: boolean
  getFolhaData: () => any
  markRegistros?: () => void
  deleteMarkedRegistros?: () => void
  hasMarkedRecords?: boolean
  searchTerm: string
  setSearchTerm: (v: string) => void
  navigationComponent?: () => React.ReactNode
  onRefresh?: () => void
  isMobile?: boolean
  /** Callback dispatch->Redux setData. */
  onDataChange?: (isoDate: string) => void
  /** Slot para o picker de data (FormField do MF). */
  renderDateField?: (args: { value: any; onChange: (v: any) => void }) => React.ReactNode
  /** Slot para o painel de acoes deletar / selecionar (ActionButtons + PermissionContainer). */
  renderDeleteActions?: () => React.ReactNode
}

export const CadernoDeVerificacaoHeader = memo(({
  isSaving,
  saveCustomFolhas,
  canSave,
  getFolhaData,
  searchTerm,
  setSearchTerm,
  navigationComponent,
  onRefresh,
  isMobile = false,
  onDataChange,
  renderDateField,
  renderDeleteActions,
}: CadernoDeVerificacaoHeaderProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleSearchChange = useCallback((e: any) => {
    setSearchTerm(e.target.value)
  }, [setSearchTerm])

  const handleDateUpdate = useCallback((date: any) => {
    onDataChange?.(new Date(date).toISOString())
  }, [onDataChange])

  const handleSave = useCallback(() => {
    saveCustomFolhas?.()
  }, [saveCustomFolhas])

  const inputSize = isMobile ? 'sm' : 'lg'

  return (
    <Card variant="elevated" padding="md" className="mb-3 bg-white relative">
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
        <Button
          variant="link"
          size="sm"
          className="text-neutral-500 p-0 h-auto"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Minimizar cabeçalho' : 'Expandir cabeçalho'}
        >
          {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </Button>
      </div>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-center mb-3">
              <div className="order-2 lg:order-1 flex items-center gap-2">
                <div style={{ maxWidth: '100%', flex: 1 }}>
                  {renderDateField?.({ value: getFolhaData(), onChange: handleDateUpdate })}
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center items-center gap-2">
                <div className="w-full" style={{ maxWidth: '400px' }}>
                  {navigationComponent && navigationComponent()}
                </div>
                {canSave && (
                  <Tooltip side="bottom" content="Alterações detectadas, deseja salvar agora?">
                    <Button
                      variant="light"
                      className="text-warning border-0 relative rounded-full"
                      onClick={handleSave}
                      disabled={isSaving}
                      style={{ width: '40px', height: '40px', padding: 0, animation: 'pulse 2s infinite' }}
                    >
                      <FiSave size={20} />
                      <span
                        className="absolute -top-0 -right-0 inline-flex items-center justify-center rounded-full bg-warning text-neutral-0"
                        style={{ fontSize: '8px', padding: '2px 4px' }}
                      >
                        !
                      </span>
                    </Button>
                  </Tooltip>
                )}
                {onRefresh && (
                  <Button
                    variant="light"
                    className="text-neutral-500 border-0 rounded-full"
                    onClick={onRefresh}
                    title="Atualizar dados da página"
                    style={{ width: '40px', height: '40px', padding: 0 }}
                  >
                    <FiRefreshCcw size={20} />
                  </Button>
                )}
              </div>
              <div className="order-3 flex justify-end items-center">
                {renderDeleteActions?.()}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 items-end">
              <div>
                <InputGroup size={inputSize}>
                  <InputGroupAddon>
                    <FiSearch size={isMobile ? 16 : 20} />
                  </InputGroupAddon>
                  <TextField
                    placeholder={isMobile ? 'Buscar...' : 'Buscar por parâmetro, valor ou usuário...'}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size={inputSize}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {!isExpanded && (
        <div className="flex justify-between items-center" style={{ height: '40px' }}>
          <div className="flex items-center gap-3">
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>
              {navigationComponent && navigationComponent()}
            </div>
          </div>
          <span className="text-neutral-500 text-sm" style={{ marginRight: '40px' }}>
            Cabeçalho minimizado
          </span>
        </div>
      )}
    </Card>
  )
})

CadernoDeVerificacaoHeader.displayName = 'CadernoDeVerificacaoHeader'
export default CadernoDeVerificacaoHeader
