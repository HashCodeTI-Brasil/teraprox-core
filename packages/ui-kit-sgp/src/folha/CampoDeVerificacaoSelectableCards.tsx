// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/indicador-de-analise/
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Refactor:
// - useFilterHook (SGP local) extraido para fora — caller passa
//   `camposDeVerificacao` ja filtrados + slot `filterSlot` com a UI de filtro.
// - buildCampoDeVerificacaoFilterPattern extraido — caller pre-processa.
// - react-bootstrap Button/ListGroup -> @hashcodeti/ui-kit-core Button + Tailwind.
import { useRef, useState, ReactNode } from 'react'
import { Button } from '@hashcodeti/ui-kit-core'

export interface SelectableCampoVM {
  id?: any
  label?: string
  descricao?: string
  controleRefId?: any
  controle?: { nomeParametro?: string }
  [key: string]: any
}

export interface CampoDeVerificacaoSelectableCardsProps<T extends SelectableCampoVM = SelectableCampoVM> {
  /** Lista de campos (filtrados pelo caller). */
  camposDeVerificacao: T[]
  /** Callback chamado a cada mudanca de selecao. */
  onSelectionChange?: (selecionados: T[]) => void
  /** Slot opcional para o painel de filtro (renderizado acima dos cards). */
  filterSlot?: ReactNode
  /** Botao opcional de toggle de filtro (renderizado no topo). */
  filterToggle?: ReactNode
  /** Mostrar botoes "Selecionar todos" / "Desfazer selecao". Default true. */
  showBulkActions?: boolean
}

export const CampoDeVerificacaoSelectableCards = <T extends SelectableCampoVM = SelectableCampoVM>({
  camposDeVerificacao,
  onSelectionChange = () => {},
  filterSlot,
  filterToggle,
  showBulkActions = true,
}: CampoDeVerificacaoSelectableCardsProps<T>) => {
  const itemsRef = useRef<any[]>([])
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const handleSelection = (item: T) => {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(item)
      const newSelected = isSelected ? prev.filter((i) => i !== item) : [...prev, item]
      onSelectionChange(newSelected)
      return newSelected
    })
  }

  const handleSelectAllFiltered = () => {
    const newSelected = Array.from(new Set([...selectedItems, ...camposDeVerificacao]))
    setSelectedItems(newSelected)
    onSelectionChange(newSelected)
  }

  const handleUnselectAll = () => {
    setSelectedItems([])
    onSelectionChange([])
  }

  return (
    <>
      {filterToggle && <div className="mb-3">{filterToggle}</div>}
      {filterSlot}

      {showBulkActions && camposDeVerificacao.length > 0 && (
        <div className="mb-3 mt-3 flex flex-col gap-2">
          <Button variant="secondary" className="w-full" onClick={handleSelectAllFiltered}>
            Selecionar todos
          </Button>
          <Button variant="secondary" className="w-full" onClick={handleUnselectAll}>
            Desfazer selecao
          </Button>
        </div>
      )}

      <div className="selectable-cards-container">
        <div className="selectable-cards-grid flex flex-col gap-2">
          {camposDeVerificacao
            .filter((c) => c.controleRefId)
            .map((campo, idx) => {
              const isSelected = selectedItems.includes(campo)
              return (
                <div
                  ref={(el) => (itemsRef.current[idx] = el)}
                  key={campo.id ?? idx}
                  className={`selectable-card cursor-pointer p-3 border rounded ${
                    isSelected ? 'selected border-primary bg-primary-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleSelection(campo)}
                >
                  <strong>
                    {campo.label} {campo.controle?.nomeParametro || campo.descricao}
                  </strong>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default CampoDeVerificacaoSelectableCards
