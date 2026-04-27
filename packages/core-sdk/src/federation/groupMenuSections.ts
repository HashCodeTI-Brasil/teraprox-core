import type { RemoteManifest, RemoteMenuItem } from './types'

/**
 * Nó top-level da árvore de menu agregada.
 * Pode representar um `group` (vários remotes/sections fundidos)
 * ou uma section sem group (legacy / retrocompat).
 */
export interface MenuTreeNode {
  /** Identificador único — `group:<name>` ou `<remote>:<sectionLabel>` */
  key: string
  /** Label exibido no dropdown principal */
  label: string
  /** Ícone (react-icons name) */
  icon?: string
  /** Order (default 999) — usado para sort estável */
  order: number
  /** Filhos: sub-sections (quando agrupando) ou items diretos */
  children: MenuTreeChild[]
}

/**
 * Filho de um MenuTreeNode.
 * - kind='section': sub-cabeçalho com items aninhados (default p/ group)
 * - kind='item': item direto (top-level legacy ou flatten=true)
 */
export type MenuTreeChild =
  | { kind: 'section'; label: string; icon?: string; items: RemoteMenuItem[] }
  | { kind: 'item'; item: RemoteMenuItem }

/**
 * Recebe array de manifests e produz árvore agregada por `group`.
 *
 * Regras:
 * - Sections sem group e sem `manifest.menuGroup` → top-level node próprio
 *   (children = items diretos kind='item' — comportamento legado)
 * - Sections com group (próprio ou herdado de menuGroup) → fundidas sob 1 node
 *   `{ key='group:<name>', label=<name> }`
 *   - flatten=true: items entram direto como children kind='item'
 *   - flatten=false (default): wrapping `{kind:'section', label, items}`
 * - `menuGroup` do manifest aplica fallback para sections que não declaram
 *   o próprio `group` (não sobrescreve override por section).
 */
export function groupMenuSections(manifests: RemoteManifest[]): MenuTreeNode[] {
  const groupMap = new Map<string, MenuTreeNode>()
  const topLevel: MenuTreeNode[] = []

  for (const manifest of manifests) {
    const fallbackGroup = manifest.menuGroup
    for (const section of manifest.menuSections ?? []) {
      const groupName = section.group ?? fallbackGroup?.name
      if (!groupName) {
        // Top-level legacy: section vira nó próprio com items como children
        topLevel.push({
          key: `${manifest.name}:${section.label}`,
          label: section.label,
          icon: section.icon,
          order: section.order ?? 999,
          children: section.items.map((item) => ({ kind: 'item', item })),
        })
        continue
      }

      let groupNode = groupMap.get(groupName)
      if (!groupNode) {
        groupNode = {
          key: `group:${groupName}`,
          label: groupName,
          icon: fallbackGroup?.icon ?? section.icon,
          order: fallbackGroup?.order ?? section.order ?? 999,
          children: [],
        }
        groupMap.set(groupName, groupNode)
      } else if (!groupNode.icon) {
        const candidate = fallbackGroup?.icon ?? section.icon
        if (candidate) groupNode.icon = candidate
      }

      if (section.flatten) {
        for (const item of section.items) {
          groupNode.children.push({ kind: 'item', item })
        }
      } else {
        groupNode.children.push({
          kind: 'section',
          label: section.label,
          icon: section.icon,
          items: section.items,
        })
      }
    }
  }

  const all = [...topLevel, ...groupMap.values()]
  all.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
  return all
}
