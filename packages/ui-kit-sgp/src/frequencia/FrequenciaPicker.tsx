// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/FrequenciaPicker.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO (TRIVIAL). Wrapper "picker" minimo
// que delega ao FrequenciaForm injetado pelo caller. O `withGenericPicker`
// HOC do MF original (modal + estado) NAO foi promovido — quem precisar de
// modal embrulha externamente com Modal do ui-kit-core (parity facil).
import * as React from 'react'

export interface FrequenciaPickerProps {
  /** Componente FrequenciaForm injetado (MF resolve). Recebe `...props` adiante. */
  FrequenciaForm: React.ComponentType<any>
  [key: string]: any
}

export const FrequenciaPicker: React.FC<FrequenciaPickerProps> = ({
  FrequenciaForm,
  ...rest
}) => {
  return <FrequenciaForm {...rest} />
}

export default FrequenciaPicker
