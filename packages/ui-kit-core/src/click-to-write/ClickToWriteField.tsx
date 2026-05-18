import React from 'react'
import { TextField } from '../primitives/TextField'

/**
 * ClickToWriteField — campo de texto props-driven para edicao inline.
 *
 * Promovido de teraprox-SGM-OS `InnerEditableTextField` na Wave 5C da sprint
 * 2026-04-21-ui-kit-domain-split-wave0. Zero Redux, zero dominio — apenas
 * state local + callbacks explicitos. Caller controla `isActive` (quando
 * exibir) e `onHide` (quando o blur ocorre).
 *
 * API retrocompativel com `InnerEditableTextField`:
 *  - `value`, `onChange(value)`
 *  - `label`, `placeholder`, `disabled`
 *  - `onEnterPress(value)` — opcional, disparado no Enter
 *  - `onHide(value)` — opcional, disparado no blur (usado para fechar modo edicao)
 *
 * Props `isActive`, `initialValue`, `fallBack` sao absorvidas (compat com
 * callers legados) mas nao vazam para o DOM — evitam React warnings.
 *
 * Refator Tailwind (sprint 2026-05-08 ui-kit Tailwind migration, D3):
 *  - Substitui `Form.Group` + `Form.Label` + `Form.Control` (react-bootstrap)
 *    pelo composite `TextField` (ui-kit-core L1, Tailwind+Radix).
 *  - API externa preservada 100%.
 */
export interface ClickToWriteFieldProps {
  value?: string | number | null
  onChange?: (value: string) => void
  label?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  onEnterPress?: (value: string) => void
  onHide?: (value: string) => void
  // Legacy/compat (nao vazam p/ DOM)
  isActive?: boolean
  initialValue?: string
  fallBack?: unknown
  // Qualquer prop extra (size, type, autoFocus, ...). `size` aqui eh o size
  // do TextField (sm | md | lg). Default 'sm' para preservar densidade do
  // bootstrap `size="sm"` original.
  [key: string]: unknown
}

export const ClickToWriteField: React.FC<ClickToWriteFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  isActive,
  onHide,
  initialValue,
  fallBack,
  onEnterPress,
  ...props
}) => {
  // Defaults — mantem densidade compacta do legado (Form.Control size="sm").
  const { size = 'sm', ...rest } = props as Record<string, unknown>

  return (
    <TextField
      wrapperClassName="mb-2"
      label={label}
      size={size as 'sm' | 'md' | 'lg'}
      value={(value as string) ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && typeof onEnterPress === 'function') {
          onEnterPress((e.target as HTMLInputElement).value)
        }
      }}
      onBlur={(e) => {
        if (typeof onHide === 'function') {
          onHide(e.target.value)
        }
      }}
      placeholder={placeholder}
      disabled={disabled}
      {...(rest as Record<string, unknown>)}
    />
  )
}

export default ClickToWriteField
