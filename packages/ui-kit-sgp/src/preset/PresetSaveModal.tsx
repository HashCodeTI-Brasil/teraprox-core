// @hashcodeti/ui-kit-sgp/preset/PresetSaveModal
//
// Promoção do SaveViewModal local (`teraprox-SGP-caderno/Components/processo/`)
// para ui-kit-sgp. Renomeado de `SaveViewModal` → `PresetSaveModal` para
// alinhar ao vocabulário "Caderno como Preset"
// (ver `decisions-log/2026-05-15-caderno-como-preset.md`).
//
// Modal "Salvar Visualização" — coleta nome + descrição + acesso (private/all)
// e dispara onSave. Mostra snapshot do estado capturado (período, agrupamento,
// status, contagens) para o usuário confirmar.
//
// Stack-puro: Modal/TextField/Button/Tabs/Badge de ui-kit-core + Tailwind.
// View-pure: sem Redux, sem fetch — caller injeta onSave.

import * as React from 'react'
import { FiSave, FiSearch, FiX } from 'react-icons/fi'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TextField,
  Tabs,
  TabsList,
  TabsTrigger,
  Badge,
} from '@hashcodeti/ui-kit-core'

export type PresetAccessMode = 'private' | 'all'

export interface PresetSavePayload {
  nome: string
  descricao: string | null
  /** `'all'` = todos da empresa; `string[]` = lista de userIds (P2 — UI atual apenas private/all). */
  access: 'all' | string[]
  /**
   * Lista explícita de `controleRefId` que o preset deve carregar.
   * - `[]` = sem filtro (todos os controles do plano)
   * - `[refId, ...]` = só esses controles
   * Convenção alinhada ao backend `projetarPorPlano` (query `controleRefIds`).
   */
  controleRefIds: string[]
  /**
   * Quando `true` força criar uma nova entrada mesmo no modo update
   * (`initial.id` presente). O caller deve fazer POST create em vez de PUT.
   */
  saveAsNew?: boolean
}

export interface PresetSummary {
  planoNome: string
  periodo: string
  groupOption: string
  sortOption: string
  activeStatus: string
  visibleGroupsCount: number
  pinnedCount: number
  totalGroups?: number
}

/** Opção mostrada no picker de controles do modal de save. */
export interface PresetControleOption {
  refId: string
  /** Nome principal exibido (geralmente `nomeParametro`). */
  label: string
  /** Nome do recurso (para sub-linha contextual). */
  recursoNome?: string | null
}

export interface PresetSaveModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: PresetSavePayload) => Promise<void>
  summary: PresetSummary
  /** Pre-preenche o modal para editar um preset existente. */
  initial?: {
    /**
     * ID do preset que está sendo editado. Presença ativa o **modo update**:
     * - botão principal vira "Atualizar" e o caller deve fazer PUT.
     * - aparece botão secundário "Salvar como nova" (`saveAsNew: true` no payload).
     * Ausência ⇒ modo create (POST).
     */
    id?: string
    nome?: string
    descricao?: string | null
    access?: 'all' | string[]
    /** Subset inicial de `controleRefIds` ao editar (vazio = "todos"). */
    controleRefIds?: string[]
    /**
     * Quando `false`, modo update bloqueia o botão "Atualizar" e instrui o
     * usuário a usar "Salvar como nova" (preset de terceiros sem permissão
     * de write). Default `true`.
     */
    canEdit?: boolean
    /**
     * Pre-preenche o campo de busca do picker. Útil quando o caller já tem
     * o usuário filtrando na tela ("ph") e quer refletir no modal.
     */
    searchQuery?: string
  }
  /**
   * Universo de controles disponíveis no plano corrente (para o picker).
   * Quando omitido ou vazio, o picker é escondido e `controleRefIds` sai
   * sempre como `[]` no payload (back-compat com callers antigos).
   */
  controles?: PresetControleOption[]
}

const SUMMARY_LABELS: Record<string, Record<string, string>> = {
  groupOption: {
    none: 'Sem Agrupamento',
    recurso: 'Por Recurso',
    parametro: 'Por Parâmetro',
    plano: 'Por Plano',
    semana: 'Por Semana',
  },
  sortOption: {
    posicao: 'Posição',
    label_az: 'Nome A→Z',
    freq_asc: 'Freq. ↑',
    freq_desc: 'Freq. ↓',
  },
  activeStatus: {
    todos: 'Todos',
    pendente: 'Pendente',
    atrasado: 'Atrasado',
    feito: 'Feito',
  },
}

/**
 * PresetSaveModal — modal para nomear e salvar a visualização atual do
 * Caderno Dinâmico como preset. Acesso `private` (default) ou `all`.
 *
 * Decisão arquitetural: `decisions-log/2026-05-15-caderno-como-preset.md`.
 *
 * @example
 * // Criar novo preset
 * <PresetSaveModal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onSave={(p) => presetService.create(p)}
 *   summary={currentViewSummary}
 * />
 *
 * @example
 * // Editar preset existente — pre-preenche
 * <PresetSaveModal
 *   open={open}
 *   onClose={close}
 *   onSave={(p) => presetService.update(presetId, p)}
 *   summary={currentViewSummary}
 *   initial={{ nome: preset.nome, descricao: preset.descricao, access: preset.access }}
 * />
 */
export const PresetSaveModal: React.FC<PresetSaveModalProps> = ({
  open,
  onClose,
  onSave,
  summary,
  initial,
  controles,
}) => {
  const [nome, setNome] = React.useState('')
  const [descricao, setDescricao] = React.useState('')
  const [accessMode, setAccessMode] = React.useState<PresetAccessMode>('private')
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Picker de controles (Fase B+B+ do plano "Caderno como preset"):
  //   - estado interno: `Set<refId>` do que está selecionado
  //   - busca local por nome do parâmetro OU nome do recurso
  //   - "Selecionar visíveis" / "Limpar" / "Todos"
  //   - Convenção: `selected.size === controles.length` ⇒ payload `controleRefIds: []`
  //     (sinaliza "sem filtro"). Subset real ⇒ payload com os refIds.
  const controlesUniverse = controles ?? []
  const hasPicker = controlesUniverse.length > 0
  const [selectedRefIds, setSelectedRefIds] = React.useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = React.useState('')

  React.useEffect(() => {
    if (!open) return
    setNome(initial?.nome ?? '')
    setDescricao(initial?.descricao ?? '')
    setAccessMode(initial?.access === 'all' ? 'all' : 'private')
    setError(null)
    setSearchQuery(initial?.searchQuery ?? '')
    // Initial seleção: subset declarado, ou tudo (= sem filtro).
    if (hasPicker) {
      const initialSubset = initial?.controleRefIds
      if (Array.isArray(initialSubset) && initialSubset.length > 0) {
        // Restringe ao universo atual (refs órfãs do preset antigo são descartadas).
        const universe = new Set(controlesUniverse.map((c) => c.refId))
        setSelectedRefIds(new Set(initialSubset.filter((r) => universe.has(r))))
      } else {
        setSelectedRefIds(new Set(controlesUniverse.map((c) => c.refId)))
      }
    } else {
      setSelectedRefIds(new Set())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial])

  const filteredControles = React.useMemo(() => {
    if (!hasPicker) return []
    const q = searchQuery.trim().toLowerCase()
    if (!q) return controlesUniverse
    return controlesUniverse.filter(
      (c) =>
        (c.label || '').toLowerCase().includes(q) ||
        (c.recursoNome || '').toLowerCase().includes(q) ||
        (c.refId || '').toLowerCase().includes(q),
    )
  }, [controlesUniverse, hasPicker, searchQuery])

  const allSelected = hasPicker && selectedRefIds.size === controlesUniverse.length
  const isSubset = hasPicker && !allSelected && selectedRefIds.size > 0

  const toggleRef = (refId: string) => {
    setSelectedRefIds((prev) => {
      const next = new Set(prev)
      if (next.has(refId)) next.delete(refId)
      else next.add(refId)
      return next
    })
  }
  const selectFilteredVisible = () => {
    setSelectedRefIds((prev) => {
      const next = new Set(prev)
      for (const c of filteredControles) next.add(c.refId)
      return next
    })
  }
  const selectOnlyFilteredVisible = () => {
    setSelectedRefIds(new Set(filteredControles.map((c) => c.refId)))
  }
  const clearSelection = () => setSelectedRefIds(new Set())
  const selectAll = () => setSelectedRefIds(new Set(controlesUniverse.map((c) => c.refId)))

  const isUpdateMode = !!initial?.id
  const canEditExisting = initial?.canEdit !== false
  const canSave = !!nome.trim() && !saving && (!isUpdateMode || canEditExisting)
  const canSaveAsNew = !!nome.trim() && !saving

  const doSave = async (saveAsNew: boolean) => {
    const trimmed = nome.trim()
    if (!trimmed) {
      setError('Dê um nome para esta visualização')
      return
    }
    setError(null)
    setSaving(true)
    try {
      const controleRefIds: string[] = !hasPicker || allSelected
        ? []
        : Array.from(selectedRefIds)
      await onSave({
        nome: trimmed,
        descricao: descricao.trim() ? descricao.trim() : null,
        access: accessMode === 'all' ? 'all' : [],
        controleRefIds,
        ...(saveAsNew ? { saveAsNew: true } : null),
      })
      onClose()
    } catch (e: any) {
      setError(e?.message || 'Falha ao salvar')
    } finally {
      setSaving(false)
    }
  }
  const handleSave = () => void doSave(false)
  const handleSaveAsNew = () => void doSave(true)

  const renderSummaryRow = (label: string, value: React.ReactNode) => (
    <>
      <span className="text-neutral-400">{label}</span>
      <span className="text-neutral-700">{value}</span>
    </>
  )

  return (
    <Modal open={open} onOpenChange={(o) => !o && onClose()} size="md">
      <ModalHeader>
        {isUpdateMode ? '✏️ Editar visualização' : '💾 Salvar visualização'}
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4">
          <TextField
            label="Nome"
            required
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Inspeção diária — Linha A"
            maxLength={120}
          />

          <TextField
            label="Descrição"
            multiline
            rows={2}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Opcional — para que serve este preset?"
            maxLength={400}
          />

          <div>
            <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">
              Acesso
            </label>
            <Tabs
              value={accessMode}
              onValueChange={(v) => setAccessMode(v as PresetAccessMode)}
            >
              <TabsList variant="pills" size="sm" className="grid grid-cols-2 gap-2">
                <TabsTrigger value="private" title="Apenas você vê e edita">
                  Só eu
                </TabsTrigger>
                <TabsTrigger value="all" title="Qualquer usuário vê (só você edita)">
                  Todos da empresa
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {hasPicker && (
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-600">
                  Controles incluídos
                </label>
                <span className="text-xs text-neutral-500">
                  {allSelected ? (
                    <Badge tone="neutral" size="sm" variant="subtle">
                      Todos ({controlesUniverse.length})
                    </Badge>
                  ) : (
                    <Badge tone="info" size="sm" variant="subtle">
                      {selectedRefIds.size} de {controlesUniverse.length}
                    </Badge>
                  )}
                </span>
              </div>

              <div className="relative mb-2">
                <FiSearch
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Filtrar por nome — ex.: "pH", "tanque"…'
                  className="w-full text-sm pl-8 pr-8 py-1.5 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    aria-label="Limpar busca"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={selectAll}
                  disabled={allSelected}
                  type="button"
                >
                  Todos
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearSelection}
                  disabled={selectedRefIds.size === 0}
                  type="button"
                >
                  Nenhum
                </Button>
                {searchQuery && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={selectFilteredVisible}
                      type="button"
                      title="Adiciona os visíveis à seleção atual"
                    >
                      + Visíveis ({filteredControles.length})
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={selectOnlyFilteredVisible}
                      type="button"
                      title="Substitui a seleção atual pelos visíveis"
                    >
                      = Só visíveis
                    </Button>
                  </>
                )}
              </div>

              <div className="max-h-48 overflow-y-auto border border-neutral-200 rounded-md divide-y divide-neutral-100 bg-white">
                {filteredControles.length === 0 ? (
                  <div className="text-center text-xs text-neutral-400 py-6">
                    Nenhum controle corresponde a "{searchQuery}"
                  </div>
                ) : (
                  filteredControles.map((c) => {
                    const checked = selectedRefIds.has(c.refId)
                    return (
                      <label
                        key={c.refId}
                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs hover:bg-neutral-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRef(c.refId)}
                          className="accent-brand-primary"
                        />
                        <span className="flex-1 min-w-0">
                          <span className="text-neutral-700 truncate block">
                            {c.label || c.refId}
                          </span>
                          {c.recursoNome && (
                            <span className="text-neutral-400 truncate block">
                              {c.recursoNome}
                            </span>
                          )}
                        </span>
                      </label>
                    )
                  })
                )}
              </div>

              {isSubset && (
                <p className="text-xs text-neutral-500 mt-1.5">
                  O preset vai carregar só os {selectedRefIds.size} controles selecionados —
                  menos dados do servidor.
                </p>
              )}
            </div>
          )}

          <div className="border border-dashed border-neutral-300 rounded-lg p-3 bg-neutral-50 text-xs">
            <div className="font-semibold text-neutral-700 mb-2">
              Estado atual capturado
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-y-1">
              {renderSummaryRow('Plano', summary.planoNome)}
              {renderSummaryRow('Período', summary.periodo)}
              {renderSummaryRow(
                'Agrupamento',
                SUMMARY_LABELS.groupOption[summary.groupOption] ?? summary.groupOption,
              )}
              {renderSummaryRow(
                'Ordenação',
                SUMMARY_LABELS.sortOption[summary.sortOption] ?? summary.sortOption,
              )}
              {renderSummaryRow(
                'Status',
                <Badge tone="info" size="sm" variant="subtle">
                  {SUMMARY_LABELS.activeStatus[summary.activeStatus] ?? summary.activeStatus}
                </Badge>,
              )}
              {summary.totalGroups != null &&
                renderSummaryRow(
                  'Grupos visíveis',
                  `${summary.visibleGroupsCount} de ${summary.totalGroups}`,
                )}
              {renderSummaryRow('Campos pinados', summary.pinnedCount)}
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="bg-error-muted text-error border border-error/30 rounded-md px-3 py-2 text-xs"
            >
              {error}
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        {isUpdateMode && (
          <Button
            variant="secondary"
            onClick={handleSaveAsNew}
            disabled={!canSaveAsNew}
            title="Cria um preset novo a partir desta visualização (mantém o original)"
          >
            Salvar como nova
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!canSave}
          leftIcon={<FiSave size={14} />}
          title={
            isUpdateMode && !canEditExisting
              ? 'Você não é dono deste preset — use "Salvar como nova" para criar uma cópia sua'
              : undefined
          }
        >
          {saving
            ? 'Salvando…'
            : isUpdateMode
              ? 'Atualizar'
              : 'Salvar'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default PresetSaveModal
