// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/FolhaDeVerificacao.tsx
// Wave H.6 (2026-05-15) — DOMAIN_COMPOSITION view-puro Tailwind.
//
// Refactor:
// - useDispatch / replaceFolha / addFolhaDoCadernoView / checkAllRegistroFromFolha
//   removidos. Caller injeta callbacks via props (props-driven, padrao ui-kit-sgp).
// - useCoreService removido — caller injeta `fetchFolha` no useFolhaFetcher.
// - useMatchingObject (real-time RTDB) removido — caller pode invocar `refresh`
//   manualmente ou via wrapper externo.
// - Hooks `useGrouping` + `useFolhaFetcher` extraidos em ./hooks/.
// - RegistroDeCampoCardView vem de prop `renderRegistroCard` (render-prop).
//   Coordenacao Wave H.4: quando RegistroDeCampoCardView for promovido para
//   ui-kit-sgp/registro/, callers podem usar diretamente; ate la, wrapper SGP
//   injeta o componente legacy do MF.
// - react-bootstrap (Card/Form/Spinner/Dropdown) substituido por:
//     - Spinner -> @hashcodeti/ui-kit-core Spinner
//     - Dropdown -> @hashcodeti/ui-kit-core DropdownMenu (Radix)
//     - Card/Form.Check -> Tailwind utilities
// - react-icons mantidos (peerDep).
import { useCallback, useMemo, useRef, useEffect, ReactNode } from 'react'
import { v4 as uuid } from 'uuid'
import { FiArrowDown, FiChevronsDown, FiChevronsUp, FiLayers } from 'react-icons/fi'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Spinner,
} from '@hashcodeti/ui-kit-core'
import { useGrouping, GROUP_LABELS, type GroupingMode, type GroupedItem } from './hooks/useGrouping'
import { useFolhaFetcher, type FolhaVM } from './hooks/useFolhaFetcher'

const SORT_LABELS: Record<string, string> = {
  none: 'Ordenar',
  campo_az: 'Campo A->Z',
  campo_za: 'Campo Z->A',
  data_asc: 'Data ↑',
  data_desc: 'Data ↓',
  usuario: 'Usuario A->Z',
}
type SortMode = keyof typeof SORT_LABELS

const normalizeString = (s: string) =>
  (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export interface RegistroCardRenderProps {
  mainRegistro: any
  history: any[]
  index: number
  /** Callbacks injetados pelo FolhaDeVerificacao para o card. */
  addRegistroDeCampoChild: (father: any) => void
  oldestAndNewestMap: Map<any, { start: any; end: any }>
  paginaAtual: any
  updateRegistroDeCampo: (payload: any) => void
  folha: FolhaVM
  markChangesDetected?: () => void
  /** Quando truthy, modo "edicao" (mostra botoes de delete). */
  deleteRegistroDeCampo?: any
  /** Forwards de otherParams. */
  otherParams: Record<string, any>
}

export interface FolhaDeVerificacaoProps {
  paginaAtual: any
  outFolha: FolhaVM | undefined
  otherParams?: Record<string, any>
  caderno: { id?: any; camposDeVerificacao?: any[] }
  searchTerm?: string
  /** Modo edicao — quando truthy mostra "marcar todos" + botoes de delete nos cards. */
  deleteRegistroDeCampo?: any
  markChangesDetected?: () => void
  regIdToAncor?: any
  /** Atualiza folha completa (substitui dispatch replaceFolha). */
  onReplaceFolha: (folha: FolhaVM) => void
  /** Marca/desmarca todos os registros (substitui dispatch checkAllRegistroFromFolha). */
  onCheckAllRegistros: (folha: FolhaVM, checked: boolean) => void
  /** Persistencia opcional pos-fetch (ex.: dispatch addFolhaDoCadernoView). */
  onPersistFolha?: (folha: FolhaVM) => void
  /** IO injetada — caller resolve o controller. */
  fetchFolha: (cadernoId: any, pagina: any) => Promise<FolhaVM>
  /** Renderiza o card de registro — caller injeta RegistroDeCampoCardView. */
  renderRegistroCard: (props: RegistroCardRenderProps) => ReactNode
  /** Calculadora opcional (parity legado — invocada pelo card). */
  calculadoraOpenHandler?: (...args: any[]) => void
}

export const FolhaDeVerificacao = ({
  paginaAtual,
  outFolha,
  otherParams = {},
  caderno,
  searchTerm,
  deleteRegistroDeCampo,
  markChangesDetected,
  regIdToAncor,
  onReplaceFolha,
  onCheckAllRegistros,
  onPersistFolha,
  fetchFolha,
  renderRegistroCard,
}: FolhaDeVerificacaoProps) => {
  const { folha, setFolha, loading, atualizarRegistro } = useFolhaFetcher({
    outFolha,
    paginaAtual,
    caderno,
    fetchFolha,
    onPersistFolha,
  })

  const scrollAttempts = useRef(0)
  const sortModeRef = useRef<SortMode>('none')
  const [, force] = useReducerForce()

  // --- Helpers
  const buildDataForFilter = useCallback(
    (registroDeCampo: any) => {
      if (!registroDeCampo) return {}
      return {
        ...registroDeCampo,
        _id: registroDeCampo.id,
        _label:
          registroDeCampo?.campoDeVerificacao?.label?.value || registroDeCampo?.campoDeVerificacao?.label,
        _parametro:
          registroDeCampo.campoDeVerificacao.controle?.nomeParametro ||
          registroDeCampo.campoDeVerificacao.controle?.parametro?.nome ||
          registroDeCampo.campoDeVerificacao.descricao,
        isLate: registroDeCampo.isLate,
      }
    },
    [],
  )

  const oldestAndNewestMap = useMemo(() => {
    const m = new Map<any, { start: any; end: any }>()
    if (!folha?.registrosDeCampo) return m
    const byCampo = new Map<any, any[]>()
    for (const r of folha.registrosDeCampo) {
      const key = r.campoDeVerificacao.id
      if (!byCampo.has(key)) byCampo.set(key, [])
      byCampo.get(key)!.push(r)
    }
    for (const [key, regs] of byCampo.entries()) {
      if (!Array.isArray(regs) || regs.length <= 1) continue
      const oldest = regs[0]
      const newest = regs[regs.length - 1]
      m.set(key, {
        start: oldest.id ? oldest.id : oldest._localId,
        end: newest.id ? newest.id : newest._localId,
      })
    }
    return m
  }, [folha?.registrosDeCampo])

  const filteredRegistros = useMemo(() => {
    if (!folha?.registrosDeCampo) return [] as any[]
    const term = searchTerm ? normalizeString(searchTerm) : ''
    return folha.registrosDeCampo
      .map((rc) => buildDataForFilter(rc))
      .filter((rc: any) => {
        if (!term) return true
        const safeStr = (v: any) => (v ? String(v) : '')
        const label = normalizeString(safeStr(rc._label))
        const parametro = normalizeString(safeStr(rc._parametro))
        const valor = normalizeString(safeStr(rc.valor))
        const usuario = normalizeString(safeStr(rc.nomeUsuario))
        return (
          label.includes(term) || parametro.includes(term) || valor.includes(term) || usuario.includes(term)
        )
      })
  }, [folha, searchTerm, buildDataForFilter])

  const groupedRegistros: GroupedItem[] = useMemo(() => {
    const groups = new Map<string, any[]>()
    filteredRegistros.forEach((reg: any) => {
      const idCampo = String(reg.campoDeVerificacao?.id || '')
      if (!idCampo) return
      if (!groups.has(idCampo)) groups.set(idCampo, [])
      groups.get(idCampo)!.push(reg)
    })
    return Array.from(groups.values()).map((group) => {
      const sortedGroup = group
      const mainRegistro = sortedGroup[sortedGroup.length - 1]
      const history = sortedGroup.length > 1 ? sortedGroup.slice(0, -1) : []
      return { mainRegistro, history }
    })
  }, [filteredRegistros])

  const grouping = useGrouping(groupedRegistros)

  const sortedDisplayGroupTree = useMemo(() => {
    const sortMode = sortModeRef.current
    const tree = grouping.displayGroupTree
    if (sortMode === 'none') return tree
    const sortFn = (a: GroupedItem, b: GroupedItem) => {
      const ra = a.mainRegistro
      const rb = b.mainRegistro
      if (sortMode === 'campo_az') return (ra._label || '').localeCompare(rb._label || '')
      if (sortMode === 'campo_za') return (rb._label || '').localeCompare(ra._label || '')
      if (sortMode === 'data_asc') {
        const da = new Date(ra.data || ra.lastRegister?.data || 0).getTime()
        const db = new Date(rb.data || rb.lastRegister?.data || 0).getTime()
        return da - db
      }
      if (sortMode === 'data_desc') {
        const da = new Date(ra.data || ra.lastRegister?.data || 0).getTime()
        const db = new Date(rb.data || rb.lastRegister?.data || 0).getTime()
        return db - da
      }
      if (sortMode === 'usuario') return (ra.nomeUsuario || '').localeCompare(rb.nomeUsuario || '')
      return 0
    }
    const sortItems = (items: GroupedItem[]) => [...items].sort(sortFn)
    return tree.map((g) => ({
      ...g,
      items: g.items ? sortItems(g.items) : null,
      subGroups: g.subGroups ? g.subGroups.map((sg) => ({ ...sg, items: sortItems(sg.items) })) : null,
    }))
  }, [grouping.displayGroupTree, sortModeRef.current])

  // Scroll para registro especifico
  useEffect(() => {
    if (!regIdToAncor || !folha || loading) return
    const attemptScroll = () => {
      const el = document.getElementById(`registro-${regIdToAncor}`)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          const originalBg = el.style.backgroundColor
          const originalTransition = el.style.transition
          el.style.transition = 'background-color 0.5s ease-in-out'
          el.style.backgroundColor = 'rgba(253, 126, 20, 0.3)'
          setTimeout(() => {
            el.style.backgroundColor = originalBg
            setTimeout(() => {
              el.style.transition = originalTransition
            }, 500)
          }, 1500)
          scrollAttempts.current = 0
        }, 300)
      } else if (scrollAttempts.current < 5) {
        scrollAttempts.current += 1
        setTimeout(attemptScroll, 200)
      } else {
        scrollAttempts.current = 0
      }
    }
    attemptScroll()
  }, [regIdToAncor, folha, loading])

  // addRegistroDeCampoChild — usa onReplaceFolha (substitui dispatch replaceFolha)
  const addRegistroDeCampoChild = useCallback(
    (fatherRegistro: any) => {
      if (!folha) return
      const folhaCopy = { ...folha, registrosDeCampo: [...folha.registrosDeCampo] }
      const novoRegistro = {
        ...fatherRegistro,
        id: undefined,
        fatherId: fatherRegistro.id,
        _localId: uuid(),
        data: new Date().toISOString(),
        valor: '',
        isLate: false,
        style: undefined,
        errorMessage: undefined,
        justificativas: [],
      }
      const registros = folhaCopy.registrosDeCampo
      const key = fatherRegistro.campoDeVerificacao.id
      const indices = registros.reduce<number[]>((acc, registro, i) => {
        if (registro.campoDeVerificacao.id == key) acc.push(i)
        return acc
      }, [])
      const insertIndex = indices.length > 0 ? Math.max(...indices) + 1 : registros.length
      registros.splice(insertIndex, 0, novoRegistro)
      onReplaceFolha(folhaCopy)
    },
    [folha, onReplaceFolha],
  )

  if (loading) return <Spinner />
  if (!folha) {
    return (
      <div className="text-center mt-5">
        <span>Carregando dados da folha...</span>
      </div>
    )
  }

  const groupingActive = grouping.groupingLevels[0] !== 'none'

  return (
    <div>
      <div style={{ marginTop: 12 }}>
        {/* Barra de controle: agrupar + colapsar + ordenar */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {/* Agrupar nivel 0 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="inline-flex items-center gap-1.5 cursor-pointer"
                style={{
                  padding: '7px 10px',
                  backgroundColor: groupingActive ? '#dbeafe' : '#f8f9fa',
                  borderRadius: 10,
                  border: `1px solid ${groupingActive ? '#93c5fd' : '#dee2e6'}`,
                }}
              >
                <FiLayers size={16} color={groupingActive ? '#1d4ed8' : '#6c757d'} />
                <span style={{ fontSize: 12, fontWeight: 600, color: groupingActive ? '#1d4ed8' : '#6c757d' }}>
                  {GROUP_LABELS[grouping.groupingLevels[0]] || 'Agrupar'}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => grouping.setGroupingLevels(['none'])}>Sem agrupamento</DropdownMenuItem>
              <DropdownMenuSeparator />
              {(['preenchimento', 'status', 'usuario', 'data', 'tipoCampo', 'descricao', 'unidade', 'frequencia'] as GroupingMode[]).map((mode) => (
                <DropdownMenuItem
                  key={mode}
                  onSelect={() => {
                    if (mode === 'preenchimento' || mode === 'status') grouping.resetFrozenKeys()
                    grouping.setGroupingLevels((prev) => [mode, ...(prev.length > 1 ? prev.slice(1) : [])])
                  }}
                >
                  {`Por ${GROUP_LABELS[mode].toLowerCase()}`}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sub-agrupar nivel 1 */}
          {groupingActive && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="inline-flex items-center gap-1.5 cursor-pointer"
                  style={{
                    padding: '7px 10px',
                    backgroundColor: grouping.groupingLevels[1] && grouping.groupingLevels[1] !== 'none' ? '#dbeafe' : '#f8f9fa',
                    borderRadius: 10,
                    border: `1px solid ${grouping.groupingLevels[1] && grouping.groupingLevels[1] !== 'none' ? '#93c5fd' : '#dee2e6'}`,
                  }}
                >
                  <FiLayers size={14} color={grouping.groupingLevels[1] && grouping.groupingLevels[1] !== 'none' ? '#1d4ed8' : '#6c757d'} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: grouping.groupingLevels[1] && grouping.groupingLevels[1] !== 'none' ? '#1d4ed8' : '#6c757d' }}>
                    {GROUP_LABELS[grouping.groupingLevels[1] as GroupingMode] || 'Sub-agrupar'}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => grouping.setGroupingLevels((prev) => [prev[0]])}>Sem sub-agrupamento</DropdownMenuItem>
                <DropdownMenuSeparator />
                {(['preenchimento', 'status', 'usuario', 'data', 'tipoCampo', 'descricao', 'unidade', 'frequencia'] as GroupingMode[]).map((mode) => (
                  <DropdownMenuItem
                    key={mode}
                    onSelect={() => grouping.setGroupingLevels((prev) => [prev[0], mode])}
                  >
                    {`Por ${GROUP_LABELS[mode].toLowerCase()}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {groupingActive && grouping.displayGroupTree.length > 0 && (
            <div
              onClick={grouping.toggleAllGroups}
              className="inline-flex items-center gap-1.5 cursor-pointer"
              style={{ padding: '7px 10px', backgroundColor: '#f8f9fa', borderRadius: 10, border: '1px solid #dee2e6' }}
            >
              {grouping.allGroupsCollapsed ? <FiChevronsDown size={16} color="#6c757d" /> : <FiChevronsUp size={16} color="#6c757d" />}
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6c757d' }}>
                {grouping.allGroupsCollapsed ? 'Expandir' : 'Colapsar'}
              </span>
            </div>
          )}

          {/* Ordenar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="inline-flex items-center gap-1.5 cursor-pointer"
                style={{ padding: '7px 10px', backgroundColor: sortModeRef.current !== 'none' ? '#e9ecef' : '#f8f9fa', borderRadius: 10, border: '1px solid #dee2e6' }}
              >
                <FiArrowDown size={16} color="#6c757d" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6c757d' }}>
                  {SORT_LABELS[sortModeRef.current]}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(['none', 'campo_az', 'campo_za', 'data_asc', 'data_desc', 'usuario'] as SortMode[]).map((m) => (
                <DropdownMenuItem
                  key={m}
                  onSelect={() => {
                    sortModeRef.current = m
                    force()
                  }}
                >
                  {SORT_LABELS[m]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Marcar todos */}
        {deleteRegistroDeCampo && folha.id && (
          <div
            className="mb-3 rounded"
            style={{ backgroundColor: '#f8f9fa', border: '1px solid #e5e7eb', padding: 12 }}
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                disabled={!folha.id}
                onChange={(e) => onCheckAllRegistros(folha, e.target.checked)}
              />
              <span style={{ fontSize: 14, fontWeight: 500 }}>Marcar todos os registros</span>
            </label>
          </div>
        )}

        {/* Grid */}
        {sortedDisplayGroupTree.map(({ path, label, items, subGroups }) => {
          const totalItems = subGroups
            ? subGroups.reduce((acc, sg) => acc + sg.items.length, 0)
            : items?.length ?? 0
          return (
            <div key={path ?? '__flat'}>
              {label !== null && (
                <div
                  onClick={() => grouping.toggleGroup(path as string)}
                  className="flex items-center gap-2 cursor-pointer"
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 8,
                    border: '1px solid #dee2e6',
                    marginBottom: grouping.collapsedGroups[path as string] ? 8 : 6,
                  }}
                >
                  {grouping.collapsedGroups[path as string] ? <FiChevronsDown size={14} color="#495057" /> : <FiChevronsUp size={14} color="#495057" />}
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#495057' }}>
                    {label} <span style={{ fontWeight: 400, color: '#6c757d' }}>({totalItems})</span>
                  </span>
                </div>
              )}

              {!grouping.collapsedGroups[path as string] && (
                subGroups ? (
                  <div style={{ marginBottom: 12 }}>
                    {subGroups.map(({ path: p2, label: l2, items: i2 }) => (
                      <div key={p2} style={{ marginLeft: 16, marginBottom: 6 }}>
                        <div
                          onClick={() => grouping.toggleGroup(p2)}
                          className="flex items-center gap-2 cursor-pointer"
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#eef2ff',
                            borderRadius: 8,
                            border: '1px solid #c7d2fe',
                            marginBottom: grouping.collapsedGroups[p2] ? 6 : 4,
                          }}
                        >
                          {grouping.collapsedGroups[p2] ? <FiChevronsDown size={13} color="#4338ca" /> : <FiChevronsUp size={13} color="#4338ca" />}
                          <span style={{ fontWeight: 600, fontSize: 12, color: '#4338ca' }}>
                            {l2} <span style={{ fontWeight: 400, color: '#6d7eba' }}>({i2.length})</span>
                          </span>
                        </div>
                        {!grouping.collapsedGroups[p2] && (
                          <div className="registro-card-grid" style={{ marginBottom: 4 }}>
                            {i2.map(({ mainRegistro, history }, index) =>
                              renderRegistroCard({
                                mainRegistro,
                                history,
                                index,
                                addRegistroDeCampoChild,
                                oldestAndNewestMap,
                                paginaAtual,
                                updateRegistroDeCampo: atualizarRegistro,
                                folha,
                                markChangesDetected,
                                deleteRegistroDeCampo,
                                otherParams,
                              }),
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="registro-card-grid" style={{ marginBottom: label !== null ? 12 : 0 }}>
                    {items?.map(({ mainRegistro, history }, index) =>
                      renderRegistroCard({
                        mainRegistro,
                        history,
                        index,
                        addRegistroDeCampoChild,
                        oldestAndNewestMap,
                        paginaAtual,
                        updateRegistroDeCampo: atualizarRegistro,
                        folha,
                        markChangesDetected,
                        deleteRegistroDeCampo,
                        otherParams,
                      }),
                    )}
                  </div>
                )
              )}
            </div>
          )
        })}

        {(!folha.registrosDeCampo || filteredRegistros.length === 0) && (
          <div
            className="text-center"
            style={{ padding: 40, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' }}
          >
            <p style={{ color: '#6c757d', margin: 0 }}>
              Nenhum registro encontrado com os filtros aplicados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// --- helper: forceUpdate ---
import { useReducer } from 'react'
function useReducerForce(): [number, () => void] {
  const [n, dispatch] = useReducer((x: number) => x + 1, 0)
  return [n, () => dispatch()]
}

export default FolhaDeVerificacao
