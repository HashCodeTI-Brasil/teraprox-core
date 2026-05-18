// Declaracao ambiente p/ pacotes peer sem types proprios.
// Wave H.4 (2026-05-15) — `uuid` virou peerDep p/ useAnexoManager (uuid v4 estavel).
declare module 'uuid' {
  export function v4(): string
  export function v1(): string
}
