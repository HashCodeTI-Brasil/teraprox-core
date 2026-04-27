/**
 * ColorPicker — @teraprox/ui-kit-core
 *
 * Seletor de cor props-driven (zero Redux, zero useCoreService).
 * Cross-domain: utilizado por SGP-planoDeControle (LimiteDeControle)
 * e qualquer módulo que precise capturar um valor de cor hex.
 *
 * Props:
 *   defaultColor — cor inicial em formato hex (ex: '#e74c3c')
 *   setCor       — callback chamado com o novo hex ao mudar
 *   disabled     — desabilita o input (opcional)
 *   label        — texto do label (opcional, default: 'Cor')
 *
 * Migrado de uso local em teraprox-SGP-planoDeControle/LimiteDeControleForm
 * para ui-kit-core por decisão arquitetural 2026-04-27.
 * @see teraprox-agent-works/work/decisions-log/2026-04-27-color-picker-to-ui-kit.md
 */
import React from 'react'

export interface ColorPickerProps {
  defaultColor?: string
  setCor: (hex: string) => void
  disabled?: boolean
  label?: string
}

const PRESET_COLORS = [
  '#e74c3c', // vermelho
  '#e67e22', // laranja
  '#f1c40f', // amarelo
  '#2ecc71', // verde
  '#1abc9c', // turquesa
  '#3498db', // azul
  '#9b59b6', // roxo
  '#34495e', // cinza escuro
  '#ecf0f1', // cinza claro
  '#ffffff', // branco
]

export function ColorPicker({ defaultColor = '#3498db', setCor, disabled = false, label = 'Cor' }: ColorPickerProps) {
  const [value, setValue] = React.useState(defaultColor)

  const handleChange = (hex: string) => {
    setValue(hex)
    setCor(hex)
  }

  return (
    <div className="color-picker-container mb-3">
      {label && (
        <label className="form-label fw-semibold">{label}</label>
      )}
      <div className="d-flex align-items-center gap-2 flex-wrap">
        {/* Input nativo de cor */}
        <input
          type="color"
          className="form-control form-control-color"
          style={{ width: '48px', height: '38px', padding: '2px', cursor: disabled ? 'not-allowed' : 'pointer' }}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          title="Escolher cor personalizada"
        />
        {/* Presets */}
        <div className="d-flex gap-1 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              disabled={disabled}
              onClick={() => handleChange(color)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: color,
                border: value === color ? '3px solid #333' : '2px solid #ccc',
                cursor: disabled ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'border 0.15s',
              }}
            />
          ))}
        </div>
        {/* Hex display */}
        <span
          className="badge rounded-pill text-dark border"
          style={{ background: value, minWidth: '80px', fontSize: '0.75rem', letterSpacing: '0.05em' }}
        >
          {value.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default ColorPicker
