// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/FormulaEditor.tsx
// Wave H.6 (2026-05-15) — paleta visual compartilhada por TokenBadge/TokenDragItem/SegmentChip
// e pelo FormulaEditor canonico. Mantido fora do export publico — uso interno do dominio formula.
import {
  FiActivity,
  FiBookOpen,
  FiEdit2,
  FiGrid,
  FiTarget,
} from 'react-icons/fi'
import { MdSensors } from 'react-icons/md'

export type TokenLabelKind =
  | 'valorCorrigido'
  | 'valorReal'
  | 'controle'
  | 'campoVirtual'
  | 'campoDeVerificacao'
  | string

export interface TokenStyle {
  bg: string
  border: string
  label: string
  icon: JSX.Element
}

export const TOKEN_STYLES: Record<string, TokenStyle> = {
  valorCorrigido: { bg: '#1a56db', border: '#1e40af', label: 'Valor Alvo', icon: <FiTarget size={11} /> },
  valorReal: { bg: '#0e9f6e', border: '#065f46', label: 'Valor Atual', icon: <FiActivity size={11} /> },
  controle: { bg: '#7e3af2', border: '#4c1d95', label: 'Controle', icon: <MdSensors size={12} /> },
  campoVirtual: { bg: '#d97706', border: '#92400e', label: 'Campo Manual', icon: <FiEdit2 size={11} /> },
  campoDeVerificacao: { bg: '#0694a2', border: '#164e63', label: 'Campo Ref.', icon: <FiBookOpen size={11} /> },
  _default: { bg: '#374151', border: '#111827', label: 'Variavel', icon: <FiGrid size={11} /> },
}

export const getTokenStyle = (label?: string): TokenStyle =>
  TOKEN_STYLES[label as string] ?? TOKEN_STYLES._default
