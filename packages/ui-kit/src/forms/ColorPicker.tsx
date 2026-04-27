import React from "react"
import { Card, Form, Row, Col } from "react-bootstrap"
import { FaPalette } from "react-icons/fa"

export interface ColorPickerProps {
  /** Cor selecionada atualmente */
  selectedColor?: string
  /** Callback para quando a cor muda */
  onColorChange?: (color: string) => void
  /** Retrocompat legado */
  defaultColor?: string
  /** Retrocompat legado */
  setCor?: (color: string) => void
  /** Lista de cores sugeridas para a paleta rápida */
  presetColors?: string[]
  /** Título do componente (padrão: 'Cor de Identificação') */
  title?: string
}

/**
 * Seletor de cores com preview e paleta de cores pré-definidas.
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  defaultColor,
  setCor,
  presetColors = ["#ff0000", "#ffd700", "#008000", "#0000ff", "#800080"],
  title = "Cor de Identificação"
}) => {
  const safeSelectedColor =
    selectedColor ??
    defaultColor ??
    presetColors[0] ??
    "#000000"

  const handleColorChange = (color: string) => {
    onColorChange?.(color)
    setCor?.(color)
  }

  return (
    <Card
      className="shadow-sm border-primary-hover mb-3"
      style={{ maxWidth: "320px", transition: "0.3s" }}
    >
      <Card.Header className="bg-light d-flex align-items-center">
        <FaPalette className="me-2 text-primary" />
        <span className="fw-medium">{title}</span>
      </Card.Header>

      <Card.Body>
        {/* Seletor principal */}
        <Row className="g-3 align-items-center mb-3">
          <Col xs="auto">
            <div
              className="rounded-circle shadow-sm border"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: safeSelectedColor,
                cursor: "pointer",
                border: "2px solid #dee2e6",
              }}
              onClick={() => {
                const el = document.getElementById("color-input-hidden")
                if (el) el.click()
              }}
              title="Clique para abrir o seletor"
            />
          </Col>

          <Col>
            <Form.Control
              type="color"
              id="color-input-hidden"
              value={safeSelectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="form-control-color-lg"
              style={{ width: "100%", height: "40px", cursor: 'pointer' }}
            />
          </Col>
        </Row>

        {/* Paleta rápida */}
        <Row className="g-2 justify-content-start">
          {presetColors.map((cor) => (
            <Col xs="auto" key={cor}>
              <div
                className="rounded-1 shadow-sm"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: cor,
                  cursor: "pointer",
                  border:
                    cor.toLowerCase() === safeSelectedColor.toLowerCase()
                      ? "2px solid #0d6efd"
                      : "1px solid #dee2e6",
                }}
                onClick={() => handleColorChange(cor)}
              />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ColorPicker
