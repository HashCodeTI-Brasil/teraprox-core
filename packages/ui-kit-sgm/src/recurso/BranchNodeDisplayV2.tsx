// @ts-nocheck
// @hashcodeti/ui-kit-sgm/recurso/BranchNodeDisplayV2
//
// Card moderno de nó de Branch (Árvore Estrutural SGM). View-puro/props-driven:
// caller injeta toda a lógica (Redux/hooks/permissions) via callbacks.
//
// Promovido de teraprox-app-SGM-UTILS/src/Components/Recurso/BranchNodeDisplayV2.js
// na Wave G.1 (2026-05-15). Mantém comportamento drag&drop original via
// `react-dnd` (peerDep do MF caller) — não há mais Redux acoplado.
//
// Caller responsabilidades (via props):
//   - openBranches(branchNode)
//   - editRecurso(level, branchNode)
//   - setRecursoToPick(recursoId)
//   - moveNode(dragPos, hoverPos)
//   - getBorderColor(branchNode) — opcional
//   - permissionWrapper({ children }) — opcional (HOC de permissão p/ botão editar)
//   - registerRefresher({ recursoId, refresher }) — opcional (subscriber Firebase)
//
// CSS: caller deve importar `branch-node-display-v2.css` (publicado no MF
// SGM-UTILS) ou prover seu próprio Tailwind. Por ora preservamos className-API.

import * as React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { FaCheck } from 'react-icons/fa'
import { MdAccountTree, MdBusiness, MdEdit, MdSettings } from 'react-icons/md'
import { GrHistory } from 'react-icons/gr'

export interface BranchNodeRecurso {
  id: string | number
  nome: string
  descricao?: string
  branchId?: string | number
  branch?: unknown
  active?: boolean
}

export interface BranchNodeData {
  id: string | number
  position: number
  recurso: BranchNodeRecurso
  branchNodesCount?: number
}

export interface BranchData {
  id: string | number
  branchLevelId?: string | number
  branchLevel: { level: number; nome?: string; color?: string }
  parentBranchNode?: { branchId?: string | number }
}

export interface BranchNodeDisplayV2Props {
  branchNode: BranchNodeData
  branch: BranchData
  level: number
  index: number
  bMapIndex?: number
  fontColor?: string

  /** Estado externo (vindo dos hooks/Redux do caller) */
  isPicker?: boolean
  isLoading?: boolean
  isCheckedRecurso?: (recursoId: string | number) => boolean
  isFocused?: boolean

  /** Callbacks */
  onOpenBranches?: (branchNode: BranchNodeData) => void
  onEditRecurso?: (level: number, branchNode: BranchNodeData) => void
  onPickRecurso?: (recursoId: string | number) => void
  onMoveNode?: (dragPos: number, hoverPos: number) => void
  onViewHistory?: (recurso: BranchNodeRecurso) => void

  /** Wrappers opcionais para permissão (renderProp) */
  renderEditWrapper?: (children: React.ReactNode) => React.ReactNode

  /** Tema por nível (override) */
  getLevelTheme?: (level: number) => { primary: string; secondary: string }
}

const DEFAULT_THEMES: Record<number, { primary: string; secondary: string }> = {
  1: { primary: '#0455BF', secondary: '#0869A6' },
  2: { primary: '#0869A6', secondary: 'rgba(8, 105, 166, 0.8)' },
  3: { primary: '#F2AE2E', secondary: '#F2BB13' },
  4: { primary: '#F2BB13', secondary: 'rgba(242, 187, 19, 0.9)' },
}

export const BranchNodeDisplayV2: React.FC<BranchNodeDisplayV2Props> = ({
  branchNode,
  branch,
  level,
  index,
  isPicker = false,
  isLoading = false,
  isCheckedRecurso,
  isFocused = false,
  onOpenBranches,
  onEditRecurso,
  onPickRecurso,
  onMoveNode,
  onViewHistory,
  renderEditWrapper,
  getLevelTheme,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const themeFor = (l: number) =>
    (getLevelTheme && getLevelTheme(l)) ||
    DEFAULT_THEMES[l] || { primary: '#0869A6', secondary: '#0455BF' }

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'BRANCH_NODE',
      item: {
        branchNodeId: branchNode?.id,
        recursoBranchId: branchNode?.recurso?.branchId,
        targetBranchLevel: branch?.branchLevelId,
        branchNodeLevel: branch?.branchLevel?.level,
        fromBranchId: branch?.id,
        parentBranchNode: branch?.parentBranchNode?.branchId,
        position: branchNode?.position,
        previewData: {
          nome: branchNode?.recurso?.nome,
          descricao: branchNode?.recurso?.descricao,
          position: branchNode?.position,
        },
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      options: { dropEffect: 'move' },
    }),
    [branchNode, branch],
  )

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'BRANCH_NODE',
    canDrop: (item: any) =>
      item.fromBranchId === branch.id &&
      item.branchNodeLevel === branch.branchLevel.level,
    hover(item: any, monitor) {
      if (!ref.current || !monitor.canDrop() || !onMoveNode) return
      const dragPos = item.position
      const hoverPos = branchNode.position
      if (dragPos === hoverPos) return
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top
      if (dragPos < hoverPos && hoverClientY < hoverMiddleY) return
      if (dragPos > hoverPos && hoverClientY > hoverMiddleY) return
      onMoveNode(dragPos, hoverPos)
      item.position = hoverPos
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isValidDropTarget = isOver && canDrop
  const shouldShowDropZone = isValidDropTarget && !isDragging
  const checked = isCheckedRecurso?.(branchNode.recurso.id) ?? false

  const getResourceIcon = () => {
    if (branchNode.recurso.branch) return <MdAccountTree />
    if (level === 1) return <MdBusiness />
    return <MdSettings />
  }

  const cardClasses = [
    'branch-node-card',
    isFocused && 'is-focused-highlight',
    isDragging && 'is-dragging',
    isPicker && 'is-picker',
    checked && 'is-selected',
    shouldShowDropZone && 'is-over',
    isLoading && 'is-loading',
    branchNode.recurso.branch && 'has-branch',
    level === 1 && 'is-root',
  ]
    .filter(Boolean)
    .join(' ')

  const editButton = (
    <span className="edit-btn">
      <MdEdit
        size={20}
        className="hoverable-div"
        onClick={(e) => {
          e.stopPropagation()
          if (!isLoading) onEditRecurso?.(level, branchNode)
        }}
        style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
        title="Editar Recurso"
      />
    </span>
  )

  return (
    <div
      ref={(el) => {
        dragRef(dropRef(el))
        ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      }}
      className={cardClasses}
      data-level={level}
      style={{
        boxShadow: isFocused ? '0 0 0 4px rgba(255, 193, 7, 0.6)' : undefined,
        borderColor: isFocused ? '#ffc107' : undefined,
        zIndex: isFocused ? 10 : undefined,
        transform: isFocused ? 'scale(1.02)' : undefined,
        transition: 'all 0.3s ease',
      }}
      title={`${branchNode.recurso.nome} (Nível ${level}, Posição ${branchNode.position})`}
      onClick={(e) => {
        e.stopPropagation()
        if (!isLoading && !isPicker) onOpenBranches?.(branchNode)
      }}
    >
      <div
        className="node-drag-handle"
        title="Arrastar para reordenar"
        style={{
          background: isDragging
            ? `linear-gradient(180deg, ${themeFor(level).primary}, ${themeFor(level).secondary})`
            : undefined,
        }}
      >
        <div className="drag-dots">
          <div className="drag-dot" />
          <div className="drag-dot" />
          <div className="drag-dot" />
        </div>
      </div>

      {isPicker && (
        <div className="node-checkbox-container">
          <div
            className={`node-checkbox ${checked ? 'checked' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onPickRecurso?.(branchNode.recurso.id)
            }}
          >
            {checked ? <FaCheck size={10} /> : null}
          </div>
        </div>
      )}

      <div
        className={`node-position-badge ${shouldShowDropZone ? 'duplicate' : ''}`}
        style={{
          background: isDragging
            ? `linear-gradient(135deg, ${themeFor(level).primary}, ${themeFor(level).secondary})`
            : undefined,
        }}
      >
        {isDragging ? '↕️' : branchNode.position}
      </div>

      <div className="node-main-content">
        <div className="node-icon-container">
          <div className="node-icon">{getResourceIcon()}</div>
        </div>

        <div className="node-info">
          <h4 className="node-title">{branchNode.recurso.nome}</h4>
          {branchNode.recurso.descricao && (
            <p className="node-subtitle">{branchNode.recurso.descricao}</p>
          )}
        </div>

        <div className="d-flex gap-2 align-items-center">
          {renderEditWrapper ? renderEditWrapper(editButton) : editButton}

          <span className="history-btn">
            <GrHistory
              size={18}
              className="hoverable-div"
              onClick={(e) => {
                e.stopPropagation()
                if (onViewHistory) onViewHistory(branchNode.recurso)
              }}
              style={{ cursor: 'pointer', color: '#6c757d' }}
              title="Ver Histórico de OS"
            />
          </span>
        </div>
      </div>

      <div className="node-card-footer">
        <div className="node-level-indicator">
          <div className="node-level-dot" />
          <span>Nível {level}</span>
        </div>
        {branchNode.branchNodesCount !== undefined && (
          <div
            className="node-children-count"
            title={`${branchNode.branchNodesCount} ${branchNode.branchNodesCount === 1 ? 'galho' : 'galhos'}`}
          >
            <MdAccountTree size={12} />
            <span>{branchNode.branchNodesCount}</span>
          </div>
        )}
      </div>

      {(level > 3 || (branchNode.recurso.descricao?.length ?? 0) > 100) && (
        <div className="node-complexity-indicator" title="Recurso complexo">
          <div className="complexity-dot" />
        </div>
      )}

      {isLoading && (
        <div className="node-loading-overlay">
          <div className="node-loading-spinner" />
        </div>
      )}

      {shouldShowDropZone && (
        <div className="node-drop-indicator">
          <div className="drop-zone-text">📦 Soltar aqui</div>
        </div>
      )}
    </div>
  )
}

export default BranchNodeDisplayV2
