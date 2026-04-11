import React, { useState } from "react"
import { Button } from "react-bootstrap"

export interface TextWithMoreProps {
  /** Texto a ser exibido */
  text?: string
  /** Comprimento máximo antes de truncar */
  maxLength: number
  /** Label para 'ver mais' (padrão: ver mais) */
  moreLabel?: string
  /** Label para 'ver menos' (padrão: ver menos) */
  lessLabel?: string
}

/**
 * Componente que trunca textos longos com opção de expansão in-place.
 */
export const TextWithMore: React.FC<TextWithMoreProps> = ({
  text = "Carregando...",
  maxLength,
  moreLabel = "ver mais",
  lessLabel = "ver menos",
}) => {
  const [expanded, setExpanded] = useState(false)

  const handleToggleExpand = () => {
    setExpanded(!expanded)
  }

  const isTruncated = text.length > maxLength
  const displayText = isTruncated && !expanded ? text.slice(0, maxLength) + "…" : text

  return (
    <>
      <span className="text-with-more-content">{displayText}</span>
      {isTruncated && (
        <Button
          variant="link"
          className="p-0 ms-2"
          style={{ fontSize: "0.85rem", textDecoration: "none" }}
          onClick={handleToggleExpand}
        >
          {expanded ? lessLabel : moreLabel}
        </Button>
      )}
    </>
  )
}

export default TextWithMore
