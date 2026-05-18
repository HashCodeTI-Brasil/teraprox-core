// @ts-nocheck
// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/FluxoNode.js
// Wave G.1 (2026-05-15) — PRIMITIVO. Apresentacional puro: nó visual usado dentro
// do canvas @xyflow/react. Recebe `data` e `selected` (contrato React Flow).
// react-bootstrap zero. Estilos especificos do desenho de fluxograma permanecem
// inline (clip-path/diamante/conector circular) — semantica visual-domain do BPMN.
import * as React from 'react'
import { Handle, Position } from '@xyflow/react'

export type FluxoTipoConfigKey =
  | 'inicio_fim'
  | 'decisao'
  | 'processo'
  | 'subprocesso'
  | 'operacao_manual'
  | 'conector'
  | 'documento'

export interface FluxoTipoConfig {
  label: string
  cor: string
  textColor: string
  borderRadius?: string
  style: React.CSSProperties
}

/** Map tipo → visual config compartilhado por FluxoNode/FluxoLegend/FluxoToolbar. */
export const TIPO_CONFIG: Record<FluxoTipoConfigKey, FluxoTipoConfig> = {
  inicio_fim: {
    label: 'Início/Fim',
    cor: '#4A90D9',
    textColor: '#fff',
    borderRadius: '50%',
    style: { borderRadius: '50px', background: '#4A90D9', color: '#fff' },
  },
  decisao: {
    label: 'Decisão',
    cor: '#F5A623',
    textColor: '#333',
    style: {
      background: '#F5A623',
      color: '#333',
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      width: 120,
      height: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  processo: {
    label: 'Processo',
    cor: '#E8E8E8',
    textColor: '#333',
    style: { background: '#E8E8E8', color: '#333', borderRadius: '4px' },
  },
  subprocesso: {
    label: 'Subprocesso',
    cor: '#C8C8C8',
    textColor: '#333',
    style: {
      background: '#C8C8C8',
      color: '#333',
      border: '3px double #888',
      borderRadius: '4px',
    },
  },
  operacao_manual: {
    label: 'Op. Manual',
    cor: '#b8e0b8',
    textColor: '#333',
    style: { background: '#b8e0b8', color: '#333', borderRadius: '0 0 4px 4px' },
  },
  conector: {
    label: 'Conector',
    cor: '#fff',
    textColor: '#333',
    style: { background: '#fff', color: '#333', borderRadius: '50%', width: 60, height: 60 },
  },
  documento: {
    label: 'Documento',
    cor: '#ADD8E6',
    textColor: '#333',
    style: { background: '#ADD8E6', color: '#333', borderRadius: '4px 4px 0 0' },
  },
}

export interface FluxoNodeData {
  tipo?: FluxoTipoConfigKey | string
  label?: string
  operacao?: { descricao?: string }
  [key: string]: any
}

export interface FluxoNodeProps {
  data: FluxoNodeData
  selected?: boolean
}

export const FluxoNode: React.FC<FluxoNodeProps> = ({ data, selected }) => {
  const tipoKey = (data?.tipo ?? 'processo') as FluxoTipoConfigKey
  const config = TIPO_CONFIG[tipoKey] ?? TIPO_CONFIG.processo

  const baseStyle: React.CSSProperties = {
    padding: '10px 14px',
    border: selected ? '2px solid #0d6efd' : '1px solid #aaa',
    minWidth: 120,
    textAlign: 'center',
    fontSize: '0.82rem',
    cursor: 'grab',
    ...config.style,
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={baseStyle}>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>{data?.label || tipoKey}</div>
        {data?.operacao && (
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{data.operacao.descricao}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export default FluxoNode
