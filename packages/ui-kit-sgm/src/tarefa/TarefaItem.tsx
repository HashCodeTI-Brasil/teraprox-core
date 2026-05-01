import React, { useEffect, useMemo, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import {
  FaClipboardList,
  FaComments,
  FaCubes,
  FaPaperclip,
  FaTimes,
  FaWrench,
} from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'
import {
  FormField,
  ResponsiveContainer,
  StatusBadge,
  SwitchOnClick,
} from 'teraprox-ui-kit'
import { AnexoManager, IconWithBadge } from '@teraprox/ui-kit-core'
import type {
  ITarefaItemViewModel,
  TarefaItemMode,
} from 'teraprox-core-sdk'

import { InspecaoModal } from '../inspecao/InspecaoModal'
import { UnidadeMaterialModal } from '../unidade-material/UnidadeMaterialModal'
import { ObservacaoModal } from './ObservacaoModal'
import './TarefaItem.css'

/**
 * TarefaItem — componente apresentacional unificado para os tres modos
 * de uso (`edit`, `execute`, `readOnly`). Sprint 2026-04-29
 * tarefa-item-unified, Phase 2.
 *
 * Diferente da versao Wave 2B (slot-driven), este TarefaItem **internaliza**
 * todos os modais e consome o ViewModel umbrella `ITarefaItemViewModel`
 * (core-sdk). O caller monta o vm via `useTarefaItemViewModel({ tarefaId,
 * mode, fatherId })` e passa pelo prop `vm`.
 *
 * Restricao hexagonal:
 *  - Zero `useDispatch`, `useSelector`, `useCoreService`, `useHttpController`,
 *    `endPointManutencao`. Toda IO via Port `vm`.
 *  - Zero imports de `teraprox-SGM-OS/...` (componente nao conhece o caller).
 *  - Imports permitidos: `teraprox-ui-kit`, `@teraprox/ui-kit-core`,
 *    `teraprox-core-sdk` (apenas tipos), Bootstrap.
 *
 * Diferenciacao por modo:
 *  - `execute`  → StatusBadge clicavel (toggle PENDENTE↔ENCERRADO via
 *                 vm.status.toggle()), descricao plana, subscribeLive() ativo.
 *  - `edit`     → sem StatusBadge clicavel, ícones FaTimes/MdContentCopy
 *                 para remover/duplicar, descricao plana (TODO inline-edit).
 *  - `readOnly` → sem mutacao alguma; modais abrem em modo apresentacional.
 */
export interface TarefaItemInspecaoExtras {
  /** Lista de tipos de dado (ex: filtrado de tiposDeCampo) */
  tiposDeDado: Array<{ nome: string; type?: string }>
  /** Parametros pre-cadastrados (caller carrega via useEffect) */
  parametrosOps: Array<{
    nome: string
    labelUnidade?: string
    id?: string
    [k: string]: any
  }>
  /** Carregador de unidades sob demanda (passa pro AutoComplete) */
  loadUnidadesFunc: () => Promise<any[]>
  /**
   * Componente de Limites de Controle (LimiteDeControlePicker) — vive em
   * SGM-OS, injetado para compor o InspecaoModal. Opcional.
   */
  renderLimitesDeControle?: (vm: import('teraprox-core-sdk').IInspecaoModalViewModel) => React.ReactNode
}

export interface TarefaItemProps {
  /** Shape do backend (id, descricao, status, sequencia, inspecoes,
   *  tarefaUnidadesMateriais, anexos, acao, tarefaJustificativas). */
  tarefa: any
  /** ViewModel umbrella vindo do core-sdk (`useTarefaItemViewModel(...)`). */
  vm: ITarefaItemViewModel
  /** Modo de operacao do componente */
  mode: TarefaItemMode
  /** Indice na lista (mantido para compat com legacy callers) */
  index: number
  /** Detecta layout responsivo (default: false) */
  isMobile?: boolean

  // ─── edit-only ───────────────────────────────────────────────────────────
  /** Remover esta tarefa (visivel apenas em mode='edit') */
  onRemove?: () => void
  /** Duplicar esta tarefa (visivel apenas em mode='edit' e allowDupe) */
  onDuplicate?: () => void
  /** Permite o icone de duplicar (visivel apenas em mode='edit') */
  allowDupe?: boolean

  // ─── inspecao extras ─────────────────────────────────────────────────────
  /**
   * Dados/render externos para o InspecaoModal embutido. Quando ausente,
   * o botao "Nova inspecao" nao e renderizado (modo readOnly de inspecao).
   */
  inspecaoExtras?: TarefaItemInspecaoExtras

  // ─── observacoes (UI extras) ─────────────────────────────────────────────
  /** Id do usuario atual — destaca bubbles "sent" no chat de observacoes */
  currentUserId?: string | number
  /** Nome do usuario atual — incluido no payload de envio de observacoes */
  currentUserName?: string

  // ─── renderInspecoesList (slot opcional, justificado abaixo) ─────────────
  /**
   * Renderizador da lista de inspecoes (legacy `InspecoesList` do SGM-OS).
   * Mantido como slot opcional porque o componente legacy depende de
   * `useInspecaoService`, `endPointManutencao`, `GenericImageAttachment`,
   * `InnerEditableTextField` e `InspecaoItem` — nao trivial migrar para
   * apresentacional puro nesta sprint. Quando ausente, exibe placeholder.
   *
   * Sub-sprint dedicada: 2026-04-29-tarefa-item-unified Phase 2 (slot
   * justificado em decisoes-log).
   */
  renderInspecoesList?: (ctx: {
    inspecoes: any[]
    isMobile?: boolean
    readOnly?: boolean
    /** Callback para atualizar campo de uma inspecao (delegado ao vm). */
    onUpdateInspecaoField?: (
      id: any,
      valor: any,
      field: string,
      indexInspecao: number,
    ) => void
  }) => React.ReactNode

  // ─── overrides opcionais para `mode='edit'` (P3) ─────────────────────────
  /**
   * Override opcional. Em `edit` mode, o caller redireciona a IO da
   * confirmacao do `<InspecaoModal>` para o Redux do form (em vez de
   * persistir direto via `vm.inspecao.submit()`). Em `execute`/`readOnly`
   * mode, deixe ausente — o componente chama `vm.inspecao.submit()` por
   * default e persiste direto via API.
   */
  onSaveNovaInspecao?: (dto: any) => void
  /**
   * Override opcional. Em `edit` mode, o caller redireciona a IO da
   * confirmacao do `<UnidadeMaterialModal>` para o Redux do form. Em
   * `execute`/`readOnly` mode, deixe ausente — o componente chama
   * `vm.unidadeMaterial.submit()` por default.
   */
  onAddUnidadeMaterial?: (dto: any) => void
  /**
   * Override opcional. Em `edit` mode, o caller redireciona o envio do
   * `<ObservacaoModal>` para o Redux do form. Em `execute`/`readOnly`
   * mode, deixe ausente — o componente chama `vm.observacoes.add({texto})`
   * por default.
   */
  onSaveObservacao?: (texto: string) => void
}

export const TarefaItem: React.FC<TarefaItemProps> = ({
  tarefa,
  vm,
  mode,
  index: _index,
  isMobile = false,
  onRemove,
  onDuplicate,
  allowDupe = false,
  inspecaoExtras,
  currentUserId,
  currentUserName,
  renderInspecoesList,
  onSaveNovaInspecao,
  onAddUnidadeMaterial,
  onSaveObservacao,
}) => {
  const isExecute = mode === 'execute'
  const isEdit = mode === 'edit'
  const isReadOnly = mode === 'readOnly'

  const [showObs, setShowObs] = useState(false)
  const [showInsp, setShowInsp] = useState(false)
  const [showAddInsp, setShowAddInsp] = useState(false)
  const [showMat, setShowMat] = useState(false)
  const [showAddMat, setShowAddMat] = useState(false)
  const [showAnexo, setShowAnexo] = useState(false)

  // Estado local para persistencia inline da quantidade de TUM em mode='execute'.
  // - savingTUM: spinner per-row enquanto vm.unidadeMaterial.updateQuantidade esta pending.
  // - localQty: input controlado local (evita re-render por mudanca em prop tarefa).
  // - dirtyQty: rastreia ids cuja quantidade local diverge da prop (so persiste se mudou).
  const [savingTUM, setSavingTUM] = useState<Set<string | number>>(new Set())
  const [localQty, setLocalQty] = useState<Record<string, any>>({})
  const [dirtyQty, setDirtyQty] = useState<Set<string | number>>(new Set())

  // Subscribe RTDB live — no-op em modos != execute (o adapter retorna () => {})
  // Dep precisa ser apenas `vm.subscribeLive` (callback estável com deps primitivas:
  // mode + tarefaId + subscribe/unsubscribe). Usar `[vm]` causa re-subscribe a cada
  // render porque o vm umbrella recria quando QUALQUER sub-VM muda (anexos/observacoes
  // têm state interno) — gera loop infinito (subscribe → refresher → load → setState
  // → vm recria → effect rerruns).
  const subscribeLive = vm.subscribeLive
  useEffect(() => {
    return subscribeLive()
  }, [subscribeLive])

  // Auto-upload de anexos em mode='execute' — o tarefa.id é real, então não há
  // razão de manter arquivos como 'local'. Disparamos uploadAll quando há
  // pendentes. Watch via useEffect (não no onAddFiles) para evitar closure
  // stale: addFiles faz setLocais async; chamar uploadAll imediato leria a
  // lista antiga. Aqui o effect roda DEPOIS do commit do React.
  const anexosLocais = vm.anexos?.locais
  const uploadAll = vm.anexos?.uploadAll
  const tarefaIdForUpload = tarefa?.id
  useEffect(() => {
    if (!isExecute || !tarefaIdForUpload || !uploadAll) return
    const pending = (anexosLocais ?? []).filter(
      (a: any) => a.status === 'pending' || a.status === 'error',
    )
    if (pending.length === 0) return
    void uploadAll(tarefaIdForUpload)
  }, [isExecute, tarefaIdForUpload, uploadAll, anexosLocais])

  const tarefaUM = Array.isArray(tarefa?.tarefaUnidadesMateriais)
    ? tarefa.tarefaUnidadesMateriais
    : []
  const inspecoes = Array.isArray(tarefa?.inspecoes) ? tarefa.inspecoes : []
  const anexoCount = Array.isArray(tarefa?.anexos) ? tarefa.anexos.length : 0

  const checked = useMemo(
    () => (vm.status?.current ?? tarefa?.status) === 'ENCERRADO',
    [vm.status?.current, tarefa?.status],
  )

  const handleQuantidadeChange = (tumId: string | number, value: any) => {
    setLocalQty((prev) => ({ ...prev, [String(tumId)]: value }))
    setDirtyQty((prev) => {
      if (prev.has(tumId)) return prev
      const next = new Set(prev)
      next.add(tumId)
      return next
    })
  }

  const handleQuantidadeBlur = async (tumId: string | number) => {
    if (!dirtyQty.has(tumId)) return
    const raw = localQty[String(tumId)]
    const num = typeof raw === 'number' ? raw : Number(raw)
    if (Number.isNaN(num)) {
      // valor invalido — apenas limpa dirty para nao spammar
      setDirtyQty((prev) => {
        const next = new Set(prev)
        next.delete(tumId)
        return next
      })
      return
    }
    setSavingTUM((prev) => {
      const next = new Set(prev)
      next.add(tumId)
      return next
    })
    try {
      await vm.unidadeMaterial.updateQuantidade(tumId, num)
      setDirtyQty((prev) => {
        const next = new Set(prev)
        next.delete(tumId)
        return next
      })
    } catch {
      // toast ja disparado pelo adapter — mantem dirty para o usuario tentar de novo
    } finally {
      setSavingTUM((prev) => {
        const next = new Set(prev)
        next.delete(tumId)
        return next
      })
    }
  }

  const handleOpenObs = async () => {
    try {
      await vm.observacoes.load()
    } catch {
      // ignora — modal abre mesmo em erro de fetch
    }
    setShowObs(true)
  }

  const handleOpenAnexo = async () => {
    // Carrega persistidos sob demanda quando o usuario abre o modal
    // (mesmo padrao de handleOpenObs). vm.anexos.persistidos comeca vazio
    // — useAnexoManager so popula via loadAnexos() que chama
    // GET /anexo/{entityId}/{context}.
    try {
      await vm.anexos?.loadAnexos?.()
    } catch {
      // ignora — modal abre mesmo em erro de fetch
    }
    setShowAnexo(true)
  }

  const handleSendObs = async (texto: string) => {
    if (onSaveObservacao) {
      onSaveObservacao(texto)
      return
    }
    await vm.observacoes.add({ texto })
  }

  const handleToggleStatus = async () => {
    try {
      await vm.status.toggle()
    } catch {
      // toast ja disparado pelo adapter
    }
  }

  const handleConfirmedNovaInspecao = async (dto: any) => {
    if (onSaveNovaInspecao) {
      // Em edit mode, caller redireciona IO para Redux do form
      onSaveNovaInspecao(dto)
      return
    }
    // Default: persistencia direta via vm.inspecao (server-direct). O proprio
    // <InspecaoModal> ja chamou vm.inspecao.submit() antes de invocar este
    // callback — nada mais a fazer aqui.
  }

  const handleConfirmedAddMaterial = async (dto: any) => {
    if (onAddUnidadeMaterial) {
      // Em edit mode, caller redireciona IO para Redux do form
      onAddUnidadeMaterial(dto)
      return
    }
    // Default: persistencia direta via vm.unidadeMaterial (server-direct).
    // O proprio <UnidadeMaterialModal> ja chamou vm.unidadeMaterial.submit()
    // — nada mais a fazer aqui.
  }

  const conditionalMaterialUtilizadoFieldRender = (tUM: any, _i: number) => {
    const tumId = tUM.id
    if (savingTUM.has(tumId)) {
      return (
        <div className="w-100">
          <Spinner animation="border" />
        </div>
      )
    }
    const localValue = localQty[String(tumId)]
    const displayValue = localValue !== undefined ? localValue : tUM.quantidade
    return (
      <FormField
        styleObj={{ fontSize: '1.2rem' }}
        ty={'number'}
        className={'w-100'}
        val={displayValue}
        onValueUpdate={(v: any) => handleQuantidadeChange(tumId, v)}
        onBlur={() => void handleQuantidadeBlur(tumId)}
      />
    )
  }

  // Mapeamento dos anexos do VM para o shape esperado pelo AnexoManager
  const anexosPersistidos = useMemo(() => {
    return (vm.anexos?.persistidos ?? []).map((a: any, i: number) => ({
      id: a.id ?? `p-${i}`,
      nome: a.nome ?? a.name ?? `Anexo ${i + 1}`,
      originalName: a.originalName ?? a.nome,
      mimeType: a.mimeType ?? a.contentType,
      tipo: a.tipo ?? a.type ?? a.contentType ?? '',
      tamanho: a.tamanho ?? a.size,
      url: a.url ?? a.signedUrl,
      signedUrl: a.signedUrl,
      key: a.key,
      createdAt: a.createdAt,
    }))
  }, [vm.anexos?.persistidos])

  return (
    <>
      <Card className="shadow-sm tarefa-shell-card">
        <div className="tarefa-grid">
          {/* ----- descricao + acao ----- */}
          <div>
            <div className="tarefa-title-line">
              <strong>
                {(tarefa.sequencia && `${tarefa.sequencia}.`) ?? '-'}
              </strong>
              <span className="ms-2">{tarefa.descricao}</span>
            </div>

            {tarefa.acao?.nome && (
              <div className="tarefa-acao-line">
                <FaWrench /> {tarefa.acao.nome}
              </div>
            )}
          </div>

          {/* ----- icones de acao ----- */}
          <div className="d-flex gap-3 align-items-center">
            <FaComments
              title="Observações"
              size={25}
              className="hoverable-div"
              onClick={() => void handleOpenObs()}
            />

            <IconWithBadge
              icon={
                <FaClipboardList
                  title="Inspeções"
                  size={25}
                  className="hoverable-div"
                  onClick={() => setShowInsp(true)}
                />
              }
              content={inspecoes.length}
            />

            <IconWithBadge
              icon={
                <FaCubes
                  title="Materiais"
                  size={25}
                  className="hoverable-div"
                  onClick={() => setShowMat(true)}
                />
              }
              content={tarefaUM.length}
            />

            <IconWithBadge
              icon={
                <FaPaperclip
                  title="Anexos"
                  size={25}
                  className="hoverable-div"
                  onClick={() => void handleOpenAnexo()}
                />
              }
              content={anexoCount > 0 ? anexoCount : null}
            />
          </div>

          {/* ----- edit: remover/duplicar ; execute: status badge ----- */}
          {isEdit && (
            <>
              {allowDupe && (
                <div className="d-flex gap-3 align-items-center">
                  <MdContentCopy
                    className="hoverable-div"
                    size={20}
                    onClick={() => onDuplicate?.()}
                    role="button"
                    aria-label="Duplicar tarefa"
                  />
                </div>
              )}
              <div
                style={{ marginLeft: 'auto' }}
                className="d-flex gap-3 align-items-center"
              >
                <FaTimes
                  className="hoverable-div"
                  size={20}
                  onClick={() => onRemove?.()}
                  role="button"
                  aria-label="Remover tarefa"
                />
              </div>
            </>
          )}

          {(isExecute || isReadOnly) && (
            <div className="d-flex align-items-start">
              <StatusBadge
                status={vm.status?.current ?? tarefa.status}
                showCheckbox={isExecute}
                checked={checked}
                onToggle={isExecute ? () => void handleToggleStatus() : undefined}
                loading={!!vm.status?.saving}
              />
            </div>
          )}
        </div>

        {tarefaUM.length > 0 && (
          <Card.Footer>
            {tarefaUM.map((tum: any, i: number) => (
              <div
                key={tum.id ?? i}
                style={{
                  gap: '8px',
                  display: 'flex',
                  padding: '4px 0',
                  borderBottom: '1px solid #ddd',
                  opacity: 0.7,
                }}
              >
                <div style={{ textAlign: 'center' }}>{i + 1}</div>
                <div>
                  {tum.unidadeMaterial?.nomeMaterial ??
                    tum.nomeMaterial ??
                    '-'}
                </div>
                <div>
                  {tum.quantidade}{' '}
                  {tum.unidadeMaterial?.labelUnidade ?? tum.labelUnidade ?? ''}
                </div>
              </div>
            ))}
          </Card.Footer>
        )}
      </Card>

      {/* ─── Modal: Observacoes ─────────────────────────────────────────── */}
      <ObservacaoModal
        show={showObs}
        onClose={() => setShowObs(false)}
        observacoes={vm.observacoes?.list ?? []}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        readOnly={isReadOnly}
        onSend={handleSendObs}
      />

      {/* ─── Container: Inspecoes ───────────────────────────────────────── */}
      <ResponsiveContainer
        title="Inspeções"
        show={showInsp}
        setShow={setShowInsp}
      >
        {renderInspecoesList ? (
          renderInspecoesList({
            inspecoes,
            isMobile,
            readOnly: isReadOnly,
          })
        ) : (
          <div className="text-muted small p-2">
            {inspecoes.length === 0
              ? 'Nenhuma inspeção cadastrada.'
              : `${inspecoes.length} inspeção(ões) — visualizacao detalhada nao disponivel neste contexto.`}
          </div>
        )}
        {!isReadOnly && inspecaoExtras && (
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setShowAddInsp(true)}
            >
              Nova inspeção
            </button>
          </div>
        )}
      </ResponsiveContainer>

      {/* InspecaoModal — sibling do container "Inspeções" para evitar
          chicken-and-egg (botão de abrir não pode estar dentro do container
          que só renderiza quando aberto). */}
      {!isReadOnly && inspecaoExtras && (
        <InspecaoModal
          show={showAddInsp}
          onClose={() => setShowAddInsp(false)}
          onConfirmed={async (dto) => {
            await handleConfirmedNovaInspecao(dto)
            setShowAddInsp(false)
          }}
          vm={vm.inspecao}
          tiposDeDado={inspecaoExtras.tiposDeDado}
          parametrosOps={inspecaoExtras.parametrosOps}
          loadUnidadesFunc={inspecaoExtras.loadUnidadesFunc}
          renderLimitesDeControle={inspecaoExtras.renderLimitesDeControle}
        />
      )}

      {/* ─── Container: Materiais ───────────────────────────────────────── */}
      {/* Card grid inspirado em teraprox-SGP-ordemDeCorrecao MaterialApontarCard
          (sprint 2026-05-01: equiparação visual /os/execucao com SGP). */}
      <ResponsiveContainer
        title="Materiais"
        show={showMat}
        setShow={setShowMat}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 12,
            marginTop: 12,
          }}
        >
          {tarefaUM.map((tum: any, i: number) => {
            const nomeMaterial =
              tum.unidadeMaterial?.nomeMaterial ?? tum.nomeMaterial ?? '-'
            const labelUnidade =
              tum.unidadeMaterial?.labelUnidade ?? tum.labelUnidade ?? ''
            const qtdPlanejada =
              tum.unidadeMaterial?.quantidade ?? tum.quantidade ?? '-'
            return (
              <Card
                key={tum.id ?? i}
                style={{
                  border: '1px solid #e3e6f0',
                  borderRadius: 8,
                  backgroundColor: '#fdfdfe',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Card.Body style={{ padding: '1rem' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <FaCubes style={{ color: '#17a2b8', fontSize: '1rem' }} />
                    <Card.Title
                      className="mb-0"
                      style={{ fontSize: '1rem', color: '#2c3e50' }}
                    >
                      {nomeMaterial}
                    </Card.Title>
                  </div>

                  <div
                    className="mb-3 p-2"
                    style={{ backgroundColor: '#f8f9fa', borderRadius: 6 }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <small className="text-muted fw-bold">UNIDADE</small>
                        <span className="text-dark fw-semibold">
                          {labelUnidade || '-'}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <small className="text-muted fw-bold">QTD. PLANEJADA</small>
                        <span className="text-dark fw-semibold">
                          {qtdPlanejada}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <small className="text-muted fw-bold d-block mb-1">
                      QTD. UTILIZADA
                    </small>
                    {isExecute
                      ? conditionalMaterialUtilizadoFieldRender(tum, i)
                      : (
                        <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                          {tum.quantidade ?? '-'}
                        </span>
                      )}
                  </div>
                </Card.Body>
              </Card>
            )
          })}
        </div>
        {!isReadOnly && (
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                vm.unidadeMaterial?.reset?.()
                setShowAddMat(true)
              }}
            >
              Adicionar material
            </button>
            <UnidadeMaterialModal
              show={showAddMat}
              onClose={() => setShowAddMat(false)}
              onConfirmed={async (dto) => {
                await handleConfirmedAddMaterial(dto)
                setShowAddMat(false)
              }}
              vm={vm.unidadeMaterial}
            />
          </div>
        )}
      </ResponsiveContainer>

      {/* ─── Container: Anexos ──────────────────────────────────────────── */}
      <ResponsiveContainer
        title="Anexos"
        show={showAnexo}
        setShow={setShowAnexo}
        scrollable
      >
        <AnexoManager
          persistidos={anexosPersistidos}
          locais={vm.anexos?.locais ?? []}
          onAddFiles={vm.anexos?.addFiles}
          onRemoveLocal={vm.anexos?.removeLocal}
          onRemovePersistido={vm.anexos?.removePersistido}
          getImageReadUrl={async (anexo) => {
            const u = (anexo as any).url || (anexo as any).signedUrl
            if (u) return u
            try {
              return await vm.anexos.getUrl(anexo.id, (anexo as any).key)
            } catch {
              return ''
            }
          }}
          onDownload={async (anexo) => {
            const url =
              (anexo as any).url ||
              (anexo as any).signedUrl ||
              (await vm.anexos
                .getUrl(anexo.id, (anexo as any).key)
                .catch(() => ''))
            if (url) window.open(url, '_blank')
          }}
          loading={vm.anexos?.loading}
          readonly={isReadOnly}
          maxFiles={10}
        />
      </ResponsiveContainer>
    </>
  )
}

export default TarefaItem
