import { useCallback, useMemo, useState } from 'react'

/**
 * Modos de combinação de predicados em filtros multi-select.
 *
 * - `union` (∪)         — item passa se satisfazer QUALQUER predicado ativo (OR).
 * - `intersection` (∩)  — item passa se satisfazer TODOS os predicados ativos (AND).
 * - `xor` (△)           — diferença simétrica: item passa se satisfazer UM número
 *                         ímpar de predicados (exactly-one quando há 2 predicados;
 *                         generaliza para N: usado para "A ou B, mas não ambos").
 */
export type FilterCombineMode = 'union' | 'intersection' | 'xor'

export const FILTER_COMBINE_MODES: readonly FilterCombineMode[] = [
  'union',
  'intersection',
  'xor',
] as const

export interface FilterCombineModeApi {
  mode: FilterCombineMode
  setMode: (mode: FilterCombineMode) => void
  /** Avança para o próximo modo do ciclo: union → intersection → xor → union. */
  cycleMode: () => void
  /**
   * Combina predicados contra um item segundo o modo atual.
   * Retorna `true` quando não há predicados (semântica "sem filtro").
   */
  matches: <T>(predicates: Array<(item: T) => boolean>, item: T) => boolean
}

const nextMode: Record<FilterCombineMode, FilterCombineMode> = {
  union: 'intersection',
  intersection: 'xor',
  xor: 'union',
}

/**
 * Hook que gerencia o modo de combinação para filtros multi-select.
 *
 * Contexto: em listas com múltiplas pills selecionáveis, o usuário pode querer:
 *   - ver a UNIÃO dos filtros (qualquer match — padrão "mais permissivo"),
 *   - a INTERSECÇÃO (drill-down, todos os filtros devem bater),
 *   - ou a DIFERENÇA SIMÉTRICA (itens que batem em um número ímpar de filtros).
 *
 * Expõe um helper `matches` que o consumidor chama dentro do seu loop de filtragem:
 *
 * ```ts
 * const combine = useFilterCombineMode('union')
 * const filtered = items.filter(item => combine.matches(activePredicates, item))
 * ```
 */
export function useFilterCombineMode(
  initialMode: FilterCombineMode = 'union'
): FilterCombineModeApi {
  const [mode, setMode] = useState<FilterCombineMode>(initialMode)

  const cycleMode = useCallback(() => {
    setMode((prev) => nextMode[prev])
  }, [])

  const matches = useCallback(
    <T>(predicates: Array<(item: T) => boolean>, item: T): boolean => {
      if (!predicates || predicates.length === 0) return true

      if (mode === 'union') {
        for (let i = 0; i < predicates.length; i++) {
          if (predicates[i](item)) return true
        }
        return false
      }

      if (mode === 'intersection') {
        for (let i = 0; i < predicates.length; i++) {
          if (!predicates[i](item)) return false
        }
        return true
      }

      // xor — paridade ímpar de matches
      let hits = 0
      for (let i = 0; i < predicates.length; i++) {
        if (predicates[i](item)) hits++
      }
      return hits % 2 === 1
    },
    [mode]
  )

  return useMemo(
    () => ({ mode, setMode, cycleMode, matches }),
    [mode, cycleMode, matches]
  )
}
