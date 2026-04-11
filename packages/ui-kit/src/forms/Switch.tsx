import React from "react"
import { Form, FormCheckProps } from "react-bootstrap"

export interface SwitchProps extends Omit<FormCheckProps, 'onChange'> {
  /** Rótulo do switch */
  label?: string
  /** Valor atual (checked) */
  value?: boolean
  /** Callback chamado quando o valor muda */
  onSwitchChange?: (val: boolean) => void
  /** Valor padrão inicial (se não for controlado) */
  defaultChecked?: boolean
}

/**
 * Componente de Switch (Checkbox tipo switch) padronizado.
 */
export const Switch: React.FC<SwitchProps> = ({
  label,
  onSwitchChange,
  value,
  disabled = false,
  defaultChecked,
  ...props
}) => {
  return (
    <Form.Check
      {...props}
      disabled={disabled}
      type="switch"
      label={label}
      checked={value}
      defaultChecked={defaultChecked}
      onChange={(event) => onSwitchChange && onSwitchChange(event.target.checked)}
    />
  )
}

export default Switch
