// @ts-nocheck
// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/FluxoEdge.js
// Wave G.1 (2026-05-15) — PRIMITIVO. Edge custom para canvas @xyflow/react com
// label badge opcional ("Sim" / "Não"). Apresentacional puro.
import * as React from 'react'
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react'

export interface FluxoEdgeData {
  label?: string
  [key: string]: any
}

export interface FluxoEdgeProps {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: any
  targetPosition: any
  data?: FluxoEdgeData
  markerEnd?: string
  style?: React.CSSProperties
}

export const FluxoEdge: React.FC<FluxoEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data = {},
  markerEnd,
  style = {},
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#fff',
              border: '1px solid #adb5bd',
              borderRadius: 4,
              padding: '1px 6px',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#495057',
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export default FluxoEdge
