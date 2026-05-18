// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/SheetOrdenationCard.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Refactor:
// - react-bootstrap Card/Button/Form -> @hashcodeti/ui-kit-core Button/Card + nativo.
// - PermissionContainer (HOC SGP local) substituido por prop opcional `renderRemoveButton`
//   (caller injeta wrapper de permissao). Default: botao trash sempre visivel.
// - id `removerFolhaButton` continua exposto via prop opcional.
import { useCallback, useEffect, useState, ReactNode } from 'react'
import { FaTrashCan } from 'react-icons/fa6'
import { Button, Card, CardBody } from '@hashcodeti/ui-kit-core'

export interface SheetVM {
  id: any
  numeroDaPagina: any
  data: string | Date
  [key: string]: any
}

export interface SheetMoveInfo {
  from: any
  to: any
}

export interface SheetOrdenationCardProps {
  sheet: SheetVM
  moveInfo?: SheetMoveInfo | null
  onNumeroDaPaginaChange: (sheetId: any, novoNumero: any) => string | undefined
  onUndoMove: (sheetId: any) => void
  onRemove: (sheet: SheetVM) => void
  /** Wrapper opcional de permissao (ex.: gating SGP). Recebe o botao trash. */
  renderRemoveButton?: (trashEl: ReactNode) => ReactNode
  /** id DOM opcional para o container do botao trash (default: removerFolhaButton). */
  removeButtonId?: string
}

export const SheetOrdenationCard = ({
  sheet,
  moveInfo,
  onNumeroDaPaginaChange,
  onUndoMove,
  onRemove,
  renderRemoveButton,
  removeButtonId = 'removerFolhaButton',
}: SheetOrdenationCardProps) => {
  const [editedValue, setEditedValue] = useState<any>(sheet.numeroDaPagina)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setEditedValue(sheet.numeroDaPagina)
  }, [sheet.numeroDaPagina])

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        const error = onNumeroDaPaginaChange(sheet.id, editedValue)
        setErrorMessage(error || '')
      }
    },
    [editedValue, onNumeroDaPaginaChange, sheet.id],
  )

  const trashButton = (
    <div id={removeButtonId} className="absolute top-2 right-2 cursor-pointer">
      <FaTrashCan onClick={() => onRemove(sheet)} className="text-danger" />
    </div>
  )

  return (
    <Card className="h-full relative p-2">
      {renderRemoveButton ? renderRemoveButton(trashButton) : trashButton}

      <CardBody className="flex flex-col">
        <div className="font-semibold mb-1">Folha ID: {sheet.id}</div>
        <div className="text-sm">
          <strong>Data:</strong>{' '}
          {new Date(sheet.data).toLocaleDateString()}
          <br />
          <strong>Numero da Pagina:</strong> {sheet.numeroDaPagina}
        </div>
        <div className="mt-auto pt-2">
          <label htmlFor={`input-${sheet.id}`} className="block text-sm mb-1">
            Alterar Numero da Pagina
          </label>
          <input
            id={`input-${sheet.id}`}
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        {errorMessage && (
          <div className="mt-2 p-2 border rounded bg-light text-danger">
            <small>{errorMessage}</small>
          </div>
        )}
        {moveInfo && (
          <div className="mt-2 p-2 border rounded bg-light flex justify-between items-center">
            <small className="text-muted">
              Movida de {moveInfo.from} para {moveInfo.to}
            </small>
            <Button variant="link" size="sm" onClick={() => onUndoMove(sheet.id)}>
              Desfazer
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default SheetOrdenationCard
