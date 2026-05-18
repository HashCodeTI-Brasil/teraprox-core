// @hashcodeti/ui-kit-sgm/os/tabs/TarefasTab
//
// Wave H.1 (2026-05-13) — promoção dedicada de
// teraprox-SGM-OS/src/Components/manutencao/OrdemDeServico/tabs/TarefasTab.tsx.
//
// Componente apresentacional 100% Tailwind+ui-kit-core. Toda a IO/Redux
// que existia inline no MF foi extraída para props injetadas pelo caller
// (Screen) na Sprint web-client + ui-kit-tailwind-migration. Refs:
// wiki/arquitetura/wave-g-sgm-os-inventory.md (entrada TarefasTab — DEDICADO).
//
// Restrições hexagonais (idênticas ao TarefaItem unificado):
//  - Zero `useDispatch`, `useSelector`, `useCoreService`, `useNavigate`,
//    `useHttpController`, `endPointManutencao`. Toda IO via props.
//  - Zero imports de `teraprox-SGM-OS/...` — o componente não conhece o caller.
//  - Imports permitidos: `@hashcodeti/ui-kit-core`, `@hashcodeti/ui-kit-sgm`
//    (TarefaItem irmão), `teraprox-ui-kit` (AutoComplete), `teraprox-core-sdk`
//    (apenas tipos), `react-icons`, `react-device-detect`.
//
// Acoplamentos refatorados:
//   useDispatch + populateToEdit/clearLimiteDeControle → onLimiteEditClick / onLimiteClear
//   useSelector(state.limiteDeControle.form)           → prop limiteDeControleForm
//   useCoreService('unidade').readAll()                 → prop loadUnidades()
//   useCoreService('parametro').readAll()               → prop loadParametros()
//   useCoreService('acao').readAll()                    → prop loadAcoes()
//   useTarefaItemViewModel(...)                          → prop useTarefaItemVm({tarefaId, mode})
//   useToast                                            → prop onError(message, error?)
//   InspecoesList (vive no MF)                          → render-prop renderInspecoesList
//   LimiteDeControlePicker (vive no MF)                 → render-prop renderLimiteDeControlePicker
//
// O caller (Screen) faz:
//   const useVm = useTarefaItemViewModel
//   const limiteForm = useSelector(s => s.limiteDeControle?.form ?? {})
//   const dispatch  = useDispatch()
//   const cs        = useCoreService()
//   <TarefasTab
//      useTarefaItemVm={useVm}
//      limiteDeControleForm={limiteForm}
//      onLimiteEditClick={(op) => dispatch(populateToEdit(op))}
//      onLimiteClear={() => dispatch(clearLimiteDeControle())}
//      loadUnidades={() => cs.createController('unidade').readAll()}
//      loadParametros={() => cs.createController('parametro').readAll()}
//      loadAcoes={() => cs.createController('acao').readAll()}
//      onError={(msg, e) => { toast.error(msg); console.error(e) }}
//      renderInspecoesList={(args) => <InspecoesList {...args} />}
//      renderLimiteDeControlePicker={(args) => <LimiteDeControlePicker {...args} />}
//      {...rest}
//   />

// @ts-nocheck
import * as React from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  FaClipboardList,
  FaComments,
  FaCubes,
  FaPlus,
} from 'react-icons/fa'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  InformativeOverlay,
  cn,
} from '@hashcodeti/ui-kit-core'
import { AutoComplete } from 'teraprox-ui-kit'

import { TarefaItem } from '../../tarefa/TarefaItem'

// ─── Tipos auxiliares ──────────────────────────────────────────────────────

export interface TarefasTabTarefa {
  id?: number | string
  __id?: string | number
  sequencia?: number
  descricao?: string
  tarefaJustificativas?: any[]
  unidadesMateriais?: any[]
  tarefaUnidadesMateriais?: any[]
  [k: string]: unknown
}

export interface TarefasTabForm {
  tarefas?: TarefasTabTarefa[]
  [k: string]: unknown
}

/** Hook do core-sdk (`useTarefaItemViewModel`) injetado como prop estável. */
export type UseTarefaItemVmHook = (args: {
  tarefaId: string | number
  mode: 'edit' | 'execute' | 'readOnly'
}) => any

export interface RenderInspecoesListArgs {
  inspecoes: any[]
  isMobile?: boolean
  readOnly?: boolean
  onRemove: (inspecao: any, idx: number) => void
  onDuplicate: (inspecao: any) => void
  updateInspecaoCallback: (
    id: any,
    nome: string,
    field: string,
    idx: number,
    inspecao: any,
  ) => void
}

export interface RenderLimitePickerArgs {
  insVm: any
  limiteDeControleForm: any
  onLimiteEditClick?: (op: any) => void
  onLimiteClear?: () => void
}

export interface TarefasTabProps {
  /** Form atual (Redux do form pré-save) — fonte das tarefas. */
  form: TarefasTabForm
  /** Quando true, oculta CTAs de mutação (status final). */
  isFinished: boolean

  // ─── Dispatchers ───
  adicionarTarefaOs: (tarefa: { acao: any; descricao: string; sequencia: number }) => void
  /** Reservado (legacy). Mantido p/ compat — não usado internamente. */
  updateDescricaoTarefa?: (data: any) => void
  onTarefaAction: (action: 'remove' | 'update' | string, data: any) => void
  onInspecaoAction: (action: 'add' | 'remove' | 'update' | string, data: any) => void
  onUnidadeMaterialAction: (action: 'add' | string, data: any) => void
  onObservacaoAction: (action: 'add' | string, data: any) => void
  onDupeTarefa: (tarefa: TarefasTabTarefa) => void
  onOpenModelosTarefa: () => void

  // ─── Hexagonal: hook de VM injetado pelo caller ───
  /** Caller injeta `useTarefaItemViewModel` do core-sdk. Função estável. */
  useTarefaItemVm: UseTarefaItemVmHook

  // ─── IO services injetados (substituem useCoreService) ───
  loadUnidades: () => Promise<any[]>
  loadParametros: () => Promise<any[]>
  loadAcoes: () => Promise<any[]>

  // ─── Estado de LimiteDeControle (substitui useSelector + useDispatch) ───
  limiteDeControleForm?: any
  onLimiteEditClick?: (op: any) => void
  onLimiteClear?: () => void

  // ─── Render-props para componentes que ainda vivem no MF ───
  renderInspecoesList: (args: RenderInspecoesListArgs) => React.ReactNode
  renderLimiteDeControlePicker: (args: RenderLimitePickerArgs) => React.ReactNode

  // ─── Catálogo de tipos de dado p/ inspeção (caller passa filtrado) ───
  /** Lista de tipos de dado disponíveis no modal de Inspeção. Caller filtra
   *  conforme regras locais (ex.: remover Tempo / ƒ(x) e adicionar V/F). */
  tiposDeDadoInspecao: Array<{ nome: string; type?: string }>

  // ─── Side-effects opcionais ───
  onError?: (message: string, error?: unknown) => void

  /** Caller injeta detecção mobile (ex.: `isMobile` de react-device-detect ou
   *  matchMedia). Default `false`. */
  isMobile?: boolean

  className?: string
}

// ─── Sub-componente row (hooks por tarefa) ────────────────────────────────

interface TarefaItemRowProps {
  tarefa: TarefasTabTarefa
  index: number
  isFinished: boolean
  onTarefaAction: TarefasTabProps['onTarefaAction']
  onInspecaoAction: TarefasTabProps['onInspecaoAction']
  onUnidadeMaterialAction: TarefasTabProps['onUnidadeMaterialAction']
  onObservacaoAction: TarefasTabProps['onObservacaoAction']
  onDupeTarefa: TarefasTabProps['onDupeTarefa']
  parametrosOps: any[]
  loadUnidades: TarefasTabProps['loadUnidades']
  limiteDeControleForm: any
  onLimiteEditClick?: (op: any) => void
  onLimiteClear?: () => void
  useTarefaItemVm: UseTarefaItemVmHook
  tiposDeDadoInspecao: TarefasTabProps['tiposDeDadoInspecao']
  renderInspecoesList: TarefasTabProps['renderInspecoesList']
  renderLimiteDeControlePicker: TarefasTabProps['renderLimiteDeControlePicker']
  onError?: TarefasTabProps['onError']
  isMobile?: boolean
}

function TarefaItemRow({
  tarefa,
  index,
  isFinished,
  onTarefaAction,
  onInspecaoAction,
  onUnidadeMaterialAction,
  onObservacaoAction,
  onDupeTarefa,
  parametrosOps,
  loadUnidades,
  limiteDeControleForm,
  onLimiteEditClick,
  onLimiteClear,
  useTarefaItemVm,
  tiposDeDadoInspecao,
  renderInspecoesList,
  renderLimiteDeControlePicker,
  onError,
  isMobile = false,
}: TarefaItemRowProps) {
  const tarefaIdForVm = (tarefa?.id ?? `local-${tarefa?.__id ?? index}`) as string | number
  const baseVm = useTarefaItemVm({ tarefaId: tarefaIdForVm, mode: 'edit' })

  const normalizeUnidadeMaterialDto = useCallback((dto: any) => {
    const material = dto?.material ?? null
    const unidade = dto?.unidade ?? null
    return {
      ...dto,
      material,
      unidade,
      materialId: dto?.materialId ?? material?.id ?? null,
      nomeMaterial:
        dto?.nomeMaterial ?? material?.nome ?? material?.descricao ?? '-',
      unidadeId: dto?.unidadeId ?? unidade?.id ?? null,
      labelUnidade:
        dto?.labelUnidade ?? unidade?.label ?? unidade?.nome ?? '-',
      nomeUnidade:
        dto?.nomeUnidade ?? unidade?.nome ?? unidade?.label ?? '',
      quantidade: dto?.quantidade ?? '',
    }
  }, [])

  // Vm com mini-override apenas em `observacoes.list` (e `load` no-op): a
  // lista vive no Redux do form pré-save, não no backend. Gap #4 P3 do Port.
  const vm = useMemo(() => {
    const tarefaJustificativas = Array.isArray(tarefa?.tarefaJustificativas)
      ? tarefa.tarefaJustificativas
      : []
    return {
      ...baseVm,
      observacoes: {
        ...baseVm.observacoes,
        list: tarefaJustificativas,
        load: async () => {
          // No-op: lista vem do Redux do form via prop tarefa.
        },
      },
    }
  }, [baseVm, tarefa?.tarefaJustificativas])

  const tarefaForView = useMemo(() => {
    const um = Array.isArray(tarefa?.unidadesMateriais)
      ? tarefa.unidadesMateriais
      : Array.isArray(tarefa?.tarefaUnidadesMateriais)
        ? tarefa.tarefaUnidadesMateriais
        : []
    return { ...tarefa, index, tarefaUnidadesMateriais: um }
  }, [tarefa, index])

  const handleRenderInspecoesList = useCallback(
    ({ inspecoes, isMobile: mobileFromCtx, readOnly }: any) =>
      renderInspecoesList({
        inspecoes,
        isMobile: mobileFromCtx ?? isMobile,
        readOnly,
        onRemove: (inspecao: any, idx: number) =>
          onInspecaoAction('remove', {
            ...inspecao,
            inspecao: { ...inspecao, index: idx },
            index: idx,
            indexTarefa: index,
          }),
        onDuplicate: (inspecao: any) =>
          onInspecaoAction('add', { inspecao, indexTarefa: index }),
        updateInspecaoCallback: (
          _id: any,
          nome: string,
          _field: string,
          idx: number,
          inspecao: any,
        ) => {
          const inspecaoCopy = {
            ...inspecao,
            index: idx,
            nomeParametro: nome,
          }
          onInspecaoAction('update', {
            inspecao: inspecaoCopy,
            indexTarefa: index,
          })
        },
      }),
    [index, onInspecaoAction, renderInspecoesList],
  )

  const inspecaoExtras = useMemo(
    () => ({
      tiposDeDado: tiposDeDadoInspecao,
      parametrosOps,
      loadUnidadesFunc: async () => {
        if (typeof loadUnidades !== 'function') return []
        try {
          const res = await loadUnidades()
          return Array.isArray(res) ? res : []
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[TarefasTab] load unidades failed:', err)
          onError?.('Falha ao carregar unidades', err)
          return []
        }
      },
      renderLimitesDeControle: (insVm: any) =>
        renderLimiteDeControlePicker({
          insVm,
          limiteDeControleForm,
          onLimiteEditClick,
          onLimiteClear,
        }),
    }),
    [
      tiposDeDadoInspecao,
      parametrosOps,
      loadUnidades,
      limiteDeControleForm,
      onLimiteEditClick,
      onLimiteClear,
      onError,
      renderLimiteDeControlePicker,
    ],
  )

  return (
    <TarefaItem
      vm={vm as any}
      mode="edit"
      tarefa={tarefaForView}
      index={index}
      isMobile={isMobile}
      onRemove={() => onTarefaAction('remove', (tarefa as any).__id)}
      onDuplicate={() => onDupeTarefa(tarefa)}
      allowDupe={!isFinished}
      onSaveObservacao={(texto: string) =>
        onObservacaoAction('add', {
          justificativa: { descricao: texto },
          indexTarefa: index,
        })
      }
      onAddUnidadeMaterial={(dto: any) =>
        onUnidadeMaterialAction('add', {
          unidadeMaterial: normalizeUnidadeMaterialDto(dto),
          indexTarefa: index,
        })
      }
      onSaveNovaInspecao={(dto: any) =>
        onInspecaoAction('add', {
          inspecao: dto,
          indexTarefa: index,
        })
      }
      renderInspecoesList={handleRenderInspecoesList}
      inspecaoExtras={inspecaoExtras}
    />
  )
}

// ─── TarefasTab (root) ────────────────────────────────────────────────────

export const TarefasTab = forwardRef<HTMLDivElement, TarefasTabProps>(
  function TarefasTab(props, ref) {
    const {
      form,
      isFinished,
      adicionarTarefaOs,
      onTarefaAction,
      onInspecaoAction,
      onUnidadeMaterialAction,
      onObservacaoAction,
      onDupeTarefa,
      onOpenModelosTarefa,
      useTarefaItemVm,
      loadUnidades,
      loadParametros,
      loadAcoes,
      limiteDeControleForm,
      onLimiteEditClick,
      onLimiteClear,
      tiposDeDadoInspecao,
      renderInspecoesList,
      renderLimiteDeControlePicker,
      onError,
      isMobile = false,
      className,
    } = props

    const [showAddPanel, setShowAddPanel] = useState(false)

    // Carrega parâmetros uma única vez na montagem — refs internas leem versão
    // atual sem participar dos deps (evita loop infinito por refs instáveis).
    const [parametrosOps, setParametrosOps] = useState<any[]>([])
    const loadParametrosRef = useRef(loadParametros)
    const onErrorRef = useRef(onError)
    useEffect(() => {
      loadParametrosRef.current = loadParametros
      onErrorRef.current = onError
    })
    useEffect(() => {
      let cancelled = false
      ;(async () => {
        try {
          const parametrosManutencao = await loadParametrosRef.current()
          const list = Array.isArray(parametrosManutencao)
            ? parametrosManutencao
            : []
          const mapped = list
            .map((param: any) => ({
              ...param,
              nome:
                param?.nome ??
                param?.nomeParametro ??
                param?.parametro ??
                '',
              labelUnidade:
                param?.labelUnidade ??
                param?.unidadeParametro ??
                param?.unidade?.label ??
                param?.unidade?.nome ??
                param?.unidade ??
                '',
            }))
            .filter((param: any) => String(param?.nome ?? '').trim() !== '')
          if (!cancelled) setParametrosOps(mapped)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[TarefasTab] loadParametros failed:', err)
          onErrorRef.current?.('Falha ao carregar parâmetros de inspeção', err)
          if (!cancelled) setParametrosOps([])
        }
      })()
      return () => {
        cancelled = true
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tarefasOrdenadas = [...(form?.tarefas || [])].sort(
      (a: any, b: any) => (a?.sequencia ?? 0) - (b?.sequencia ?? 0),
    )

    const handleAddFromAcao = (acao: any) => {
      adicionarTarefaOs({
        acao,
        descricao: acao?.descricao ?? acao?.nome ?? '',
        sequencia: (form?.tarefas?.length ?? 0) + 1,
      })
      setShowAddPanel(false)
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)}>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-1 py-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex h-6 min-w-6 items-center justify-center rounded-full',
                'bg-primary-100 px-2 text-xs font-semibold text-primary-700',
              )}
            >
              {tarefasOrdenadas.length}
            </span>
            <span className="text-sm font-medium text-neutral-700">
              {tarefasOrdenadas.length === 1 ? 'Tarefa' : 'Tarefas'}
            </span>
          </div>
          <InformativeOverlay
            contentItems={[
              { icon: <FaComments size={18} />, label: 'Observações' },
              { icon: <FaClipboardList size={18} />, label: 'Inspeções' },
              { icon: <FaCubes size={18} />, label: 'Materiais' },
            ]}
          />
        </div>

        {/* Estado vazio */}
        {tarefasOrdenadas.length === 0 && !showAddPanel && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-surface-border bg-neutral-50 p-8 text-center">
            <FaClipboardList size={48} className="text-neutral-300" />
            <p className="text-base font-medium text-neutral-700">
              Nenhuma tarefa adicionada
            </p>
            <p className="text-sm text-neutral-500">
              Adicione tarefas manualmente ou a partir de um modelo
            </p>
            {!isFinished && (
              <Button
                variant="primary"
                onClick={() => setShowAddPanel(true)}
                className="mt-2"
              >
                <FaPlus className="mr-2" />
                Adicionar primeira tarefa
              </Button>
            )}
          </div>
        )}

        {/* Lista de tarefas */}
        {tarefasOrdenadas.map((t: any, i: number) => (
          <TarefaItemRow
            key={t.id ?? t.__id ?? i}
            tarefa={t}
            index={i}
            isFinished={isFinished}
            onTarefaAction={onTarefaAction}
            onInspecaoAction={onInspecaoAction}
            onUnidadeMaterialAction={onUnidadeMaterialAction}
            onObservacaoAction={onObservacaoAction}
            onDupeTarefa={onDupeTarefa}
            parametrosOps={parametrosOps}
            loadUnidades={loadUnidades}
            limiteDeControleForm={limiteDeControleForm}
            onLimiteEditClick={onLimiteEditClick}
            onLimiteClear={onLimiteClear}
            useTarefaItemVm={useTarefaItemVm}
            tiposDeDadoInspecao={tiposDeDadoInspecao}
            renderInspecoesList={renderInspecoesList}
            renderLimiteDeControlePicker={renderLimiteDeControlePicker}
            onError={onError}
            isMobile={isMobile}
          />
        ))}

        {/* Modal "Nova Tarefa" */}
        <Modal
          open={showAddPanel}
          onOpenChange={(o) => { if (!o) setShowAddPanel(false) }}
          size="md"
        >
          <ModalHeader>Nova Tarefa</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6">
              <div className="flex-1">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Buscar ação ou digitar descrição livre
                </div>
                <AutoComplete
                  loadFunc={() => loadAcoes()}
                  loadCondition
                  displayKey="nome"
                  className="w-100"
                  title="Ação / Descrição"
                  autoFocusConfig
                  onSelectedClick={(acao: any) => {
                    if (acao?.id) handleAddFromAcao(acao)
                  }}
                  onEnterKey={(inputValue: string) => {
                    if (inputValue?.trim())
                      handleAddFromAcao({
                        nome: inputValue.trim(),
                        descricao: inputValue.trim(),
                      })
                  }}
                  onBlurEvent={() => {}}
                  onValueChanged={() => {}}
                />
                <p className="mt-1 text-xs text-neutral-500">
                  Selecione uma ação da lista ou pressione Enter para usar o
                  texto digitado
                </p>
              </div>

              <div className="flex items-center justify-center md:flex-col">
                <span className="rounded-full border border-surface-border bg-white px-3 py-1 text-xs uppercase text-neutral-500">
                  ou
                </span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Usar um modelo de tarefa
                </div>
                <p className="mb-2 text-xs text-neutral-500">
                  Preencha múltiplas tarefas de uma vez a partir de um modelo
                  pré-configurado
                </p>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setShowAddPanel(false)
                    onOpenModelosTarefa()
                  }}
                  className="self-start"
                >
                  <FaClipboardList className="mr-2" />
                  Selecionar modelo
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Barra inferior "Adicionar Tarefa" */}
        {!isFinished && tarefasOrdenadas.length > 0 && (
          <div className="flex justify-center pt-1">
            <Button
              variant="outline"
              onClick={() => setShowAddPanel(true)}
            >
              <FaPlus className="mr-2" />
              Adicionar Tarefa
            </Button>
          </div>
        )}
      </div>
    )
  },
)

TarefasTab.displayName = 'TarefasTab'
