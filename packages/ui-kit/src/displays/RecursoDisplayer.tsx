/**
 * Wave 2A — retrocompat shim.
 *
 * O componente foi promovido para `@hashcodeti/ui-kit-sgm/recurso/` com logica
 * de IO extraida para uma Port no `teraprox-core-sdk`
 * (IRecursoDisplayerViewModel + useRecursoDisplayerViewModel).
 *
 * Este arquivo permanece como re-export para nao quebrar os ~6 call sites
 * existentes (SGM-OS, SGM-SS, app-sgm, SGP-planoDeControle, app-SGM-UTILS,
 * app-sgp) ate que a Wave 2D faca o sweep final.
 *
 * Consumers NOVOS devem importar de `@hashcodeti/ui-kit-sgm`.
 */
export {
  RecursoDisplayer,
  RecursoDisplayer as default,
  type RecursoDisplayerProps,
} from '@hashcodeti/ui-kit-sgm'
