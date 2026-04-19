/**
 * Stub de tipos para quebrar a dependência circular DTS entre
 * `teraprox-ui-kit` (meta-package legado) e `@teraprox/ui-kit-sgm`.
 *
 * Wave 2F da sprint 2026-04-21-ui-kit-domain-split-wave0.
 *
 * Contexto:
 *   - Os shims Wave 2A em `ui-kit/src/displays/{RecursoDisplayer,
 *     BranchDropDisplay}.tsx` e `ui-kit/src/forms/FindRecursoByTagField.tsx`
 *     re-exportam de `@teraprox/ui-kit-sgm`.
 *   - `ui-kit-sgm` depende de `teraprox-ui-kit` (ciclo inverso).
 *   - tsup --dts do `ui-kit` falha ao resolver `@teraprox/ui-kit-sgm.d.ts`.
 *
 * Solução pragmática (Opção B): tipa os re-exports como `any` para a
 * fase de declaração. Runtime nao e afetado.
 *
 * TODO (Wave 3+): Opção A arquitetural — assim que o lado oposto
 * (ui-kit-sgm) nao depender mais de `teraprox-ui-kit`, ajustar a
 * ordem de build (ui-kit-sgm antes, ui-kit depois) elimina a
 * necessidade deste stub.
 */

declare module '@teraprox/ui-kit-sgm' {
  // Wave 2A — familia Recurso (shims em ui-kit/src/displays + forms)
  export const RecursoDisplayer: any
  export type RecursoDisplayerProps = any

  export const BranchDropDisplay: any
  export type BranchDropDisplayProps = any

  export const FindRecursoByTagField: any
  export type FindRecursoByTagFieldProps = any
}
