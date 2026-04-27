// @teraprox/ui-kit-core — primitivos cross-cutting.
// Populado em Waves 1-3 da sprint ui-kit-domain-split a partir de teraprox-ui-kit.

export { FormModal, type FormModalProps } from './containers/FormModal'

// Frequencia — cross-domain (SGM + SGP). Migrado de @teraprox/ui-kit-sgp
// em Track C.1 da sprint 2026-04-20-code-split-fix-e-ports-faltantes.
export {
  FrequenciaFormV2,
  type FrequenciaFormV2Props,
  type RecorrenciaValue,
  type RecorrenciaEscala,
} from './frequencia/FrequenciaFormV2'

// Contador — cross-domain (SGM + SGP). Port vive em @teraprox/core-sdk
// (IContadorViewModel). Track C.2 da sprint 2026-04-20-code-split-fix-e-ports-faltantes.
export { ContadorPicker } from './contador/ContadorPicker'
export type {
  ContadorPickerProps,
  ContadorPickerValue,
  ContadorLimite,
  ContadorBoundRule,
} from './contador/ContadorPicker'

// Anexo — cross-domain (qualquer dominio). Port IAnexoManagerViewModel vive
// em @teraprox/core-sdk; o componente abaixo eh props-driven (zero Redux,
// zero useCoreService) e espera que o caller injete callbacks do ViewModel.
// Migrado do meta `teraprox-ui-kit/forms/AnexoManager` em Track C.3 da sprint
// 2026-04-20-code-split-fix-e-ports-faltantes.
export { AnexoManager } from './anexo/AnexoManager'
export type {
  AnexoManagerProps,
  AnexoPersistedItem,
  AnexoLocalItem,
} from './anexo/AnexoManager'

// ClickToWriteField — campo de texto inline editavel, promovido de
// teraprox-SGM-OS `InnerEditableTextField` na Wave 5C da sprint
// 2026-04-21-ui-kit-domain-split-wave0. Props-driven (zero Redux).
export { ClickToWriteField } from './click-to-write/ClickToWriteField'
export type { ClickToWriteFieldProps } from './click-to-write/ClickToWriteField'

// CombineModeToggle — toggle visual com icones de Venn para modos de combinacao
// de filtros multi-select. Usado em conjunto com `useFilterCombineMode` do
// teraprox-core-sdk. Props-driven (zero Redux).
export { CombineModeToggle } from './combine-mode/CombineModeToggle'
export type {
  CombineMode,
  CombineModeToggleProps,
} from './combine-mode/CombineModeToggle'

// ColorPicker — seletor de cor hex com presets visuais, props-driven (zero Redux).
// Cross-domain: usado por qualquer módulo que precise capturar valores de cor.
// Promovido de uso local em SGP-planoDeControle/LimiteDeControleForm para
// ui-kit-core em 2026-04-27.
export { ColorPicker } from './color-picker/ColorPicker'
export type { ColorPickerProps } from './color-picker/ColorPicker'

