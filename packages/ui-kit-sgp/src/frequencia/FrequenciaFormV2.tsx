// @ts-nocheck
// Re-export compat — Track C.1 UI da sprint 2026-04-20-code-split-fix-e-ports-faltantes.
// O FrequenciaFormV2 virou cross-domain e passou a viver em @teraprox/ui-kit-core.
// Este arquivo preserva o caminho de import para callers SGP (caderno, planoDeControle)
// que ainda nao migraram para o Port (useRecorrenciaViewModel). Nao editar — migrar o
// caller direto para @teraprox/ui-kit-core quando possivel.
export {
  FrequenciaFormV2,
  type FrequenciaFormV2Props,
  type RecorrenciaValue,
  type RecorrenciaEscala,
} from '@teraprox/ui-kit-core'

export { FrequenciaFormV2 as default } from '@teraprox/ui-kit-core'
