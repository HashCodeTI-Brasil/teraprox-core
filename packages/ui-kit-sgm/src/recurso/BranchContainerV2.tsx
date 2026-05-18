// @ts-nocheck
// @hashcodeti/ui-kit-sgm/recurso/BranchContainerV2
//
// Container View-puro do nível de Árvore Estrutural SGM. Wraps lista de
// `BranchNodeDisplayV2` com header (rename, add, filter), zona de drop
// externa e indicadores de posição duplicada / pendência de salvamento.
//
// Promovido de teraprox-app-SGM-UTILS/src/Hocs/BranchContainerV2.js (era HOC
// de fato, mas comportamento é de container) na Wave G.1 (2026-05-15).
//
// Toda a lógica (useBranchContainer / Redux / Firebase subscribers) fica no
// caller, que injeta callbacks/state via props.

import * as React from 'react'
import { useDrop } from 'react-dnd'
import { FaCheck, FaInbox } from 'react-icons/fa'
import { MdAddCircle, MdOutlineFilterAlt } from 'react-icons/md'
import {
  BranchNodeDisplayV2,
  type BranchNodeData,
  type BranchData,
} from './BranchNodeDisplayV2'

export interface BranchContainerV2Props {
  branch: BranchData & {
    branchNodes: BranchNodeData[]
    branchLevel: BranchData['branchLevel'] & { color?: string; nome?: string }
  }
  index: number

  /** Estado externo */
  filterValue?: string
  showFilter?: boolean
  positionsChanged?: boolean
  isLoading?: boolean

  /** Callbacks */
  onSetShowFilter?: (next: boolean | ((prev: boolean) => boolean)) => void
  onFiltraRecurso?: (value: string) => void
  onCreateAtLevel?: () => void
  onMoveNode?: (dragPos: number, hoverPos: number, branch: BranchData) => void
  onSavePositionChanges?: (branch: BranchData) => void
  onUndoPositionChanges?: (branch: BranchData) => void
  onNormalizePositions?: (branch: BranchData) => void
  onSaveBranchLevelName?: (branchLevel: BranchData['branchLevel'], handleClose: () => void) => void
  onUpdateBranchLevelName?: (index: number, nome: string) => void
  onSwitchBranch?: (item: any, branch: BranchData) => void

  /** Filter helper (caller injeta — original era multiTermFilter de hook) */
  multiTermFilter?: (text: string | undefined, term: string | undefined) => boolean

  /** Hooks por-nó (descendem para BranchNodeDisplayV2) */
  isPicker?: boolean
  isCheckedRecurso?: (recursoId: string | number) => boolean
  getFocusedRecursoId?: () => string | number | undefined
  onOpenBranches?: (branchNode: BranchNodeData) => void
  onEditRecurso?: (level: number, branchNode: BranchNodeData) => void
  onPickRecurso?: (recursoId: string | number) => void
  onViewHistory?: (recurso: any) => void
  renderEditWrapper?: (children: React.ReactNode) => React.ReactNode
  renderCreateWrapper?: (children: React.ReactNode) => React.ReactNode

  /** Render-prop para o título editavel — caller injeta seu SwitchOnClick/FormField */
  renderTitle?: (props: {
    nome: string
    onSave: () => void
    onUpdate: (nome: string) => void
  }) => React.ReactNode
}

const defaultMultiTermFilter = (text?: string, term?: string) => {
  if (!term) return true
  if (!text) return false
  const terms = String(term).toLowerCase().split(/\s+/).filter(Boolean)
  const t = text.toLowerCase()
  return terms.every((q) => t.includes(q))
}

export const BranchContainerV2: React.FC<BranchContainerV2Props> = ({
  branch,
  index,
  filterValue = '',
  showFilter = false,
  positionsChanged = false,
  isLoading = false,
  onSetShowFilter,
  onFiltraRecurso,
  onCreateAtLevel,
  onMoveNode,
  onSavePositionChanges,
  onUndoPositionChanges,
  onNormalizePositions,
  onSaveBranchLevelName,
  onUpdateBranchLevelName,
  onSwitchBranch,
  multiTermFilter = defaultMultiTermFilter,
  isPicker,
  isCheckedRecurso,
  getFocusedRecursoId,
  onOpenBranches,
  onEditRecurso,
  onPickRecurso,
  onViewHistory,
  renderEditWrapper,
  renderCreateWrapper,
  renderTitle,
}) => {
  const [hasScroll, setHasScroll] = React.useState(false)
  const [isScrolledBottom, setIsScrolledBottom] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  const level = branch.branchLevel.level

  const hasDuplicatePositions = () => {
    const positions = branch.branchNodes.map((n) => n.position)
    return positions.length !== new Set(positions).size
  }

  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulseDropZone {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const filteredNodes = branch.branchNodes
    .filter((bN) => multiTermFilter(bN.recurso?.nome, filterValue))
    .sort((a, b) => (a.position === b.position ? Number(a.id) - Number(b.id) : a.position - b.position))

  React.useEffect(() => {
    const checkScrollability = () => {
      if (contentRef.current) {
        const el = contentRef.current
        setHasScroll(el.scrollHeight > el.clientHeight)
      }
    }
    const handleScroll = () => {
      if (contentRef.current) {
        const el = contentRef.current
        const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1
        setIsScrolledBottom(isAtBottom)
      }
    }
    checkScrollability()
    const el = contentRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll)
      return () => el.removeEventListener('scroll', handleScroll)
    }
  }, [filteredNodes.length, showFilter])

  const [{ isOver, draggedItem }, dropRef] = useDrop(
    () => ({
      accept: 'BRANCH_NODE',
      drop: (item: any, monitor) => {
        if (monitor.didDrop()) return
        onSwitchBranch?.(item, branch)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        draggedItem: monitor.getItem(),
      }),
    }),
    [branch, onSwitchBranch],
  )

  const isExternalDrop = isOver && draggedItem && draggedItem.fromBranchId !== branch.id

  const focusedId = getFocusedRecursoId?.()

  const containerClasses = [
    'branch-container',
    showFilter && 'filtering',
    positionsChanged && 'has-changes',
    hasDuplicatePositions() && 'has-duplicates',
    filteredNodes.length > 20 && 'many-items',
  ]
    .filter(Boolean)
    .join(' ')

  const createButton = (
    <button
      className="branch-action-btn"
      onClick={onCreateAtLevel}
      title="Adicionar novo recurso"
    >
      <MdAddCircle size={18} />
    </button>
  )

  return (
    <div className={containerClasses} style={{ backgroundColor: branch.branchLevel.color }}>
      <div className="branch-header">
        <div className="branch-item-count">{filteredNodes.length} itens</div>

        <h3>
          {renderTitle ? (
            renderTitle({
              nome: branch.branchLevel.nome ?? '',
              onSave: () => onSaveBranchLevelName?.(branch.branchLevel, () => {}),
              onUpdate: (nome) => onUpdateBranchLevelName?.(index, nome),
            })
          ) : (
            <span>{branch.branchLevel.nome}</span>
          )}
        </h3>

        <div className="branch-actions">
          {renderCreateWrapper ? renderCreateWrapper(createButton) : createButton}
          <button
            className="branch-action-btn"
            onClick={() => onSetShowFilter?.((s) => !s)}
            title={showFilter ? 'Ocultar filtro' : 'Mostrar filtro'}
          >
            <MdOutlineFilterAlt size={18} />
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="branch-filter">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar recursos..."
            value={filterValue}
            onChange={(e) => onFiltraRecurso?.(e.target.value)}
          />
        </div>
      )}

      {(hasDuplicatePositions() || positionsChanged) && (
        <div className="branch-controls">
          {hasDuplicatePositions() && (
            <div className="duplicate-warning">
              <span>⚠️ Posições duplicadas detectadas</span>
              <button
                className="branch-control-btn btn btn-warning btn-sm"
                onClick={() => onNormalizePositions?.(branch)}
              >
                Corrigir automaticamente
              </button>
            </div>
          )}
          {positionsChanged && (
            <div className="branch-controls-row">
              <button
                className="branch-control-btn btn btn-secondary btn-sm"
                onClick={() => onUndoPositionChanges?.(branch)}
              >
                Desfazer
              </button>
              <button
                className="branch-control-btn btn btn-success btn-sm"
                onClick={() => onSavePositionChanges?.(branch)}
              >
                Salvar posições
              </button>
            </div>
          )}
        </div>
      )}

      <div
        className={`branch-content ${hasScroll ? 'has-scroll' : ''} ${isScrolledBottom ? 'scrolled-bottom' : ''}`}
        ref={(el) => {
          dropRef(el)
          contentRef.current = el
        }}
      >
        {isExternalDrop ? (
          <div className="external-drop-zone">
            Solte aqui
            <div className="drop-subtitle">{draggedItem?.previewData?.nome || 'Item selecionado'}</div>
          </div>
        ) : (
          <div className="branch-nodes-list">
            {filteredNodes.length === 0 ? (
              <div className="branch-empty-state">
                <FaInbox className="empty-icon" />
                <span>Nenhum recurso encontrado</span>
                {filterValue && <small>Tente ajustar o filtro ou adicionar novos recursos</small>}
              </div>
            ) : (
              <>
                {filteredNodes.map((node, idx) => (
                  <BranchNodeDisplayV2
                    key={`${node.id}-${node.position}`}
                    branchNode={node}
                    index={idx}
                    level={level}
                    branch={branch}
                    bMapIndex={index}
                    isPicker={isPicker}
                    isLoading={isLoading}
                    isCheckedRecurso={isCheckedRecurso}
                    isFocused={focusedId === node.recurso.id}
                    onOpenBranches={onOpenBranches}
                    onEditRecurso={onEditRecurso}
                    onPickRecurso={onPickRecurso}
                    onMoveNode={(dp, hp) => onMoveNode?.(dp, hp, branch)}
                    onViewHistory={onViewHistory}
                    renderEditWrapper={renderEditWrapper}
                  />
                ))}
                {filteredNodes.length > 20 && (
                  <div className="branch-performance-info">
                    <small>{filteredNodes.length} itens carregados. Use o filtro para melhor performance.</small>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BranchContainerV2
