// @ts-nocheck
// Wave H.6 (2026-05-15) — extraido de FolhaDeVerificacao.
// Encapsula state de grouping (2 niveis) + computeGroupKey + frozenKeys + colapso.
// View-pure: nao acessa Redux nem IO.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type GroupingMode =
  | 'none'
  | 'preenchimento'
  | 'status'
  | 'usuario'
  | 'data'
  | 'tipoCampo'
  | 'descricao'
  | 'unidade'
  | 'frequencia'

export const GROUP_LABELS: Record<GroupingMode, string> = {
  none: 'Agrupar',
  preenchimento: 'Preenchimento',
  status: 'Status',
  usuario: 'Usuario',
  data: 'Data',
  tipoCampo: 'Tipo de campo',
  descricao: 'Descricao',
  unidade: 'Unidade',
  frequencia: 'Frequencia',
}

export interface GroupedItem {
  mainRegistro: any
  history: any[]
}

export interface DisplayGroupNode {
  path: string | null
  label: string | null
  items: GroupedItem[] | null
  subGroups:
    | { path: string; label: string; items: GroupedItem[]; subGroups: null }[]
    | null
}

const computeGroupKey = (reg: any, mode: GroupingMode): string => {
  if (mode === 'preenchimento') {
    const val = reg.valor
    return val !== null && val !== undefined && val !== '' && val !== 0 && val !== '0' ? 'Preenchido' : 'Vazio'
  }
  if (mode === 'status') return reg.isLate ? 'Atrasado' : 'Em dia'
  if (mode === 'usuario') return reg.nomeUsuario || 'Sem usuario'
  if (mode === 'data') {
    const raw = reg.data || reg.lastRegister?.data
    return raw ? new Date(raw).toLocaleDateString('pt-BR') : 'Sem data'
  }
  if (mode === 'tipoCampo') {
    const tipoMap: Record<string, string> = { text: 'Textual', number: 'Numerico', time: 'Tempo', formula: 'f(x)' }
    return tipoMap[reg.campoDeVerificacao?.tipoDeCampo] || reg.campoDeVerificacao?.tipoDeCampo || 'Sem tipo'
  }
  if (mode === 'descricao') return reg.campoDeVerificacao?.descricao || 'Sem descricao'
  if (mode === 'unidade') return reg.campoDeVerificacao?.controle?.labelUnidade || 'Sem unidade'
  if (mode === 'frequencia') return reg.campoDeVerificacao?.controle?.escala || 'Sem frequencia'
  return 'unknown'
}

export interface UseGroupingApi {
  groupingLevels: GroupingMode[]
  setGroupingLevels: React.Dispatch<React.SetStateAction<GroupingMode[]>>
  collapsedGroups: Record<string, boolean>
  setCollapsedGroups: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  toggleGroup: (key: string) => void
  toggleAllGroups: () => void
  allGroupsCollapsed: boolean
  displayGroupTree: DisplayGroupNode[]
  resetFrozenKeys: () => void
}

/** Recebe a lista ja-agrupada-por-campo (`groupedRegistros`) e produz a arvore display. */
export function useGrouping(groupedRegistros: GroupedItem[]): UseGroupingApi {
  const [groupingLevels, setGroupingLevels] = useState<GroupingMode[]>(['none'])
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const frozenGroupKeys = useRef<Map<string, string>>(new Map())
  const prevGroupingLevelsRef = useRef<GroupingMode[]>(['none'])

  const displayGroupTree: DisplayGroupNode[] = useMemo(() => {
    const l0 = groupingLevels[0]
    const l1 = groupingLevels[1]
    if (!l0 || l0 === 'none') {
      return [{ path: null, label: null, items: groupedRegistros, subGroups: null }]
    }
    const l1Map = new Map<string, GroupedItem[]>()
    groupedRegistros.forEach((item) => {
      const reg = item.mainRegistro
      const id = reg._localId || reg.id
      const frozenKeyL0 = `l0::${id}`
      let key: string
      if (reg.changed) {
        if (!frozenGroupKeys.current.has(frozenKeyL0)) frozenGroupKeys.current.set(frozenKeyL0, computeGroupKey(reg, l0))
        key = frozenGroupKeys.current.get(frozenKeyL0)!
      } else {
        frozenGroupKeys.current.delete(frozenKeyL0)
        key = computeGroupKey(reg, l0)
      }
      if (!l1Map.has(key)) l1Map.set(key, [])
      l1Map.get(key)!.push(item)
    })
    return Array.from(l1Map.entries()).map(([l1Label, l1Items]) => {
      if (!l1 || l1 === 'none') {
        return { path: l1Label, label: l1Label, items: l1Items, subGroups: null }
      }
      const l2Map = new Map<string, GroupedItem[]>()
      l1Items.forEach((item) => {
        const reg = item.mainRegistro
        const id = reg._localId || reg.id
        const frozenKeyL1 = `l1::${id}`
        let key: string
        if (reg.changed) {
          if (!frozenGroupKeys.current.has(frozenKeyL1)) frozenGroupKeys.current.set(frozenKeyL1, computeGroupKey(reg, l1))
          key = frozenGroupKeys.current.get(frozenKeyL1)!
        } else {
          frozenGroupKeys.current.delete(frozenKeyL1)
          key = computeGroupKey(reg, l1)
        }
        if (!l2Map.has(key)) l2Map.set(key, [])
        l2Map.get(key)!.push(item)
      })
      const subGroups = Array.from(l2Map.entries()).map(([l2Label, l2Items]) => ({
        path: `${l1Label}::${l2Label}`,
        label: l2Label,
        items: l2Items,
        subGroups: null as null,
      }))
      return { path: l1Label, label: l1Label, items: null, subGroups }
    })
  }, [groupedRegistros, groupingLevels])

  const allGroupsCollapsed = useMemo(() => {
    if (!groupingLevels[0] || groupingLevels[0] === 'none') return false
    return displayGroupTree.length > 0 && displayGroupTree.every((g) => collapsedGroups[g.path as string])
  }, [displayGroupTree, collapsedGroups, groupingLevels])

  const toggleGroup = useCallback((key: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const toggleAllGroups = useCallback(() => {
    if (allGroupsCollapsed) {
      setCollapsedGroups({})
    } else {
      const all: Record<string, boolean> = {}
      displayGroupTree.forEach((g) => {
        if (g.path) all[g.path] = true
      })
      setCollapsedGroups(all)
    }
  }, [allGroupsCollapsed, displayGroupTree])

  // Colapsa automaticamente ao trocar de modo de agrupamento
  useEffect(() => {
    const prev = prevGroupingLevelsRef.current
    if (prev.join(',') === groupingLevels.join(',')) return
    prevGroupingLevelsRef.current = groupingLevels
    if (!groupingLevels[0] || groupingLevels[0] === 'none') {
      setCollapsedGroups({})
      return
    }
    const all: Record<string, boolean> = {}
    displayGroupTree.forEach((g) => {
      if (g.path) all[g.path] = true
    })
    setCollapsedGroups(all)
  }, [groupingLevels, displayGroupTree])

  const resetFrozenKeys = useCallback(() => frozenGroupKeys.current.clear(), [])

  return {
    groupingLevels,
    setGroupingLevels,
    collapsedGroups,
    setCollapsedGroups,
    toggleGroup,
    toggleAllGroups,
    allGroupsCollapsed,
    displayGroupTree,
    resetFrozenKeys,
  }
}

export { computeGroupKey }
