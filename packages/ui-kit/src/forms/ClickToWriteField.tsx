import React, { useState, useEffect, useRef } from "react"
import { Button, ButtonProps } from "react-bootstrap"
import { FormField } from "./FormField"

export interface ClickToWriteFieldProps {
  /** Valor exibido no botão inicial */
  buttonDisplay: React.ReactNode | (() => React.ReactNode)
  /** Tipo do campo de input (default: 'text') */
  fieldType?: string
  /** Texto/Label para o FormField */
  fieldLabel?: string
  /** Props para o botão inicial */
  buttonProps?: ButtonProps
  /** Props extras para o FormField */
  fieldProps?: any
  /** Callback chamado ao digitar no campo */
  onFieldValueUpdate: (val: string) => void
  /** Habilita botão de ação extra no campo de input */
  enableFieldActionButton?: boolean
  /** Ícone para o botão extra */
  fieldActionButtonIcon?: () => React.ReactNode
  /** Props para o botão extra */
  fieldActionButtonProps?: ButtonProps
  /** Callback para o botão extra */
  fieldActionButtonCallback?: (ref: React.RefObject<HTMLInputElement>) => void
  /** Callback ao pressionar Enter */
  onEnterPress?: (ref: React.RefObject<HTMLInputElement>) => void
  /** Callback para limpar o input ao abrir */
  cleanRef?: (ref: React.RefObject<HTMLInputElement>) => void
}

/**
 * Componente que exibe um botão e, ao ser clicado, alterna para um campo de input.
 * Ideal para edições rápidas in-place.
 */
export const ClickToWriteField: React.FC<ClickToWriteFieldProps> = ({
  buttonDisplay,
  fieldType = "text",
  fieldLabel = "",
  buttonProps,
  fieldProps,
  onFieldValueUpdate,
  enableFieldActionButton = false,
  fieldActionButtonIcon,
  fieldActionButtonProps,
  fieldActionButtonCallback = () => {},
  onEnterPress,
  cleanRef,
}) => {
  const [showClick, setShowClick] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showClick) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          cleanRef && cleanRef(inputRef)
        }
      }, 100)
    }
  }, [showClick, cleanRef])

  const handleShowClick = () => {
    setShowClick(!showClick)
  }

  const resolveButtonDisplay = () => {
    if (typeof buttonDisplay === "function") return buttonDisplay()
    return buttonDisplay
  }

  const renderFieldActionButtonIcon = () => {
    if (fieldActionButtonIcon) return fieldActionButtonIcon()
    return "OK"
  }

  const closeOnEscape = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Escape") {
      setShowClick(false)
    }
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress(inputRef)
    }
  }

  return (
    <div style={{ display: "flex", width: "100%", margin: 0, padding: 0 }}>
      {!showClick && (
        <Button
          style={{ flexGrow: 1 }}
          onClick={handleShowClick}
          {...buttonProps}
        >
          {resolveButtonDisplay()}
        </Button>
      )}

      {showClick && (
        <FormField
          reference={inputRef}
          others={{ ...fieldProps, onKeyUp: closeOnEscape }}
          hide={!showClick}
          ty={fieldType}
          label={fieldLabel}
          onValueUpdate={onFieldValueUpdate}
          onBlur={() => setShowClick(false)}
          actionClick={() =>
            enableFieldActionButton ? (
              <Button
                {...fieldActionButtonProps}
                onClick={() => fieldActionButtonCallback(inputRef)}
              >
                {renderFieldActionButtonIcon()}
              </Button>
            ) : null
          }
        />
      )}
    </div>
  )
}

export default ClickToWriteField
