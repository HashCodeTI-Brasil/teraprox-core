/**
 * Stub de tipos para quebrar a dependência circular DTS entre
 * `@hashcodeti/ui-kit-sgm` e `teraprox-ui-kit`.
 *
 * Wave 2F da sprint 2026-04-21-ui-kit-domain-split-wave0.
 *
 * Contexto:
 *   - Em runtime, `@hashcodeti/ui-kit-sgm` importa vários componentes
 *     apresentacionais de `teraprox-ui-kit` (AutoComplete, FormField,
 *     ExpandableCard, etc).
 *   - O meta-package `teraprox-ui-kit`, por sua vez, re-exporta alguns
 *     componentes de `@hashcodeti/ui-kit-sgm` (RecursoDisplayer,
 *     BranchDropDisplay, FindRecursoByTagField — shims Wave 2A).
 *   - tsup --dts do `ui-kit-sgm` falha ao tentar resolver
 *     `teraprox-ui-kit.d.ts` (que ainda nao existe porque o build do
 *     meta-package precisa de `ui-kit-sgm.d.ts`).
 *
 * Solução pragmática (Opção B): declaramos as APIs consumidas como `any`
 * apenas para a fase de emit de declaração. Os .js bundles funcionam
 * normalmente; consumers externos resolvem os tipos reais via dist/.
 *
 * TODO (Wave 3+): Opção A arquitetural — mover AutoComplete, FormField
 * e demais primitivos cross-cutting para `@hashcodeti/ui-kit-core`.
 * Depois que o ciclo for inteiramente quebrado neste lado, este stub
 * pode ser deletado.
 */

declare module 'teraprox-ui-kit' {
  // Forms / primitivos consumidos em ui-kit-sgm
  export const AutoComplete: any
  export const UnidadeMaterialForm: any
  export const FormField: any
  export const DeleteConfirm: any

  // Displays / containers
  export const ExpandableCard: any
  export const GenericDisplay: any
  export const ResponsiveContainer: any
  export const StatusBadge: any
  export const TextWithMore: any

  // Buttons / inputs
  export const SwitchOnClick: any

  // QR
  export const QrCodeScanButton: any
}
