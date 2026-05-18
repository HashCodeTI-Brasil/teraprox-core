// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/RegistroDeCampoCardView.tsx
// Wave H.4 (2026-05-15) — DOMAIN_PURO. View-puro Tailwind+ui-kit-core.
//
// Bloqueio anterior (Wave E.2.1) era 10 dependencias externas heterogeneas
// (custom hook gigante + Redux + useCoreService + react-toast + react-bootstrap +
// teraprox-ui-kit + GenericOverlay local). Resolucao Wave H.4:
//
//   1. useRegistroDeCampoCard            -> DECOMPOSTO em 4 micro-hooks deste pacote
//                                           (useRegistroStyle, useAnexoManager,
//                                            useJustificativaModal, useHistory).
//   2. RegistroDeCampoField              -> import canonico de '../registro/RegistroDeCampoField'
//                                           (ja promovido Wave G.1).
//   3. JustificativaModal                -> render prop `renderJustificativaModal`
//                                           (caller injeta widget legado).
//   4. HistoryModal                      -> import canonico de '../caderno/HistoryModal'
//                                           (ja promovido Wave E.2.1).
//   5. StatusLight                       -> render prop `renderStatusLight` opcional.
//                                           Default: bullet inline (sem dep externa).
//   6. IconWithBadge                     -> import canonico de @hashcodeti/ui-kit-core.
//   7. GenericOverlay                    -> SUBSTITUIDO por <Tooltip> Radix do ui-kit-core.
//   8. useCoreService (controller)       -> NAO entra. Caller passa `getSignedUrl`.
//   9. useToasts                         -> prop `onToast` (callback opcional).
//  10. AnexoManager                      -> import canonico de @hashcodeti/ui-kit-core,
//                                           orquestrado pelo hook local.
//
// react-bootstrap erradicado (Card/Form/Badge/OverlayTrigger/Tooltip/Collapse/Button/Modal)
// — substituido por divs Tailwind + Modal/Tooltip/Badge/Button do ui-kit-core.

import { forwardRef, useMemo, useState } from 'react'
import {
  FaPlus,
  FaTools,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaPaperclip,
} from 'react-icons/fa'
import { GrEdit, GrLineChart } from 'react-icons/gr'
import { FiClock, FiHash, FiAlignLeft } from 'react-icons/fi'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Tooltip,
  Badge,
  Button,
  IconWithBadge,
  AnexoManager,
} from '@hashcodeti/ui-kit-core'
import { RegistroDeCampoField } from './RegistroDeCampoField'
import { HistoryModal } from '../caderno/HistoryModal'
import { useRegistroStyle, type OldestNewestMap } from './hooks/useRegistroStyle'
import {
  useAnexoManager,
  type AnexoToastLevel,
} from './hooks/useAnexoManager'
import { useJustificativaModal } from './hooks/useJustificativaModal'
import { useHistory } from './hooks/useHistory'

// ─── Sub-component: StatusLight default (sem dep externa) ─────────────────
const DefaultStatusLight = ({ active }: { active: boolean }) => (
  <span
    aria-label={active ? 'em dia' : 'em atraso'}
    className="inline-block h-2.5 w-2.5 rounded-full"
    style={{ backgroundColor: active ? '#22c55e' : '#ef4444' }}
  />
)

// ─── Helpers ──────────────────────────────────────────────────────────────
const getTipoIcon = (tipoDeCampo: string) => {
  switch (tipoDeCampo) {
    case 'number':
      return <FiHash size={14} />
    case 'time':
      return <FiClock size={14} />
    case 'formula':
      return <FiHash size={14} />
    case 'text':
    default:
      return <FiAlignLeft size={14} />
  }
}

const tipoToneMap: Record<string, any> = {
  formula: 'info',
  number: 'primary',
  time: 'warning',
}

// ─── Types publicos ──────────────────────────────────────────────────────
export interface RegistroDeCampoCardPalette {
  okBg?: string
  errBg?: string
}

export interface RegistroDeCampoCardViewProps {
  registro: any
  index: number
  folha: { id?: any; updatedAt?: any; registrosDeCampo?: any[] }
  paginaAtual?: number
  oldestAndNewestMap: OldestNewestMap
  /** Registros agrupados (pai + filhos) — sem o principal. */
  relatedRegistros?: any[]
  showRegistroData?: boolean

  // Field-state callbacks (substituem dispatch Redux do hook gigante).
  setValor: (valor: any) => void
  setStyle: (style: Record<string, any>) => void
  setErrorMsg: (msg: string) => void
  sendValor: (formatarStyleCampo: (v: any, r: any) => void) => void
  recalculateValor: (formatarStyleCampo: (v: any, r: any) => void) => void
  onSaveJustificativas: (justificativas: any[]) => void
  onCheck?: (checked: boolean) => void
  onAddChild?: (registro: any) => void
  onDelete?: (registro: any) => void
  onAbrirCorrecao?: (registro: any) => void

  // Anexo IO (Port).
  putAnexoApi: (id: any, file: File) => Promise<any>
  deleteAnexoApi: (id: any, key: string) => Promise<any>
  getSignedUrl?: (key: string) => Promise<string>

  // History IO (Port).
  fetchHistoryApi: (
    campoId: any,
    range: { startDate: string; endDate: string; limit: number; order: 'ASC' | 'DESC' },
  ) => Promise<any[]>
  loadChart?: (campo: any, controle: any, historyData: any[]) => void

  // Cross-cutting callbacks.
  onToast?: (level: AnexoToastLevel, msg: string) => void

  // Render-prop slots p/ widgets injetados.
  renderJustificativaModal?: (args: {
    show: boolean
    onClose: () => void
    registro: any
    onSaveJustificativas: (j: any[]) => void
  }) => React.ReactNode
  renderStatusLight?: (active: boolean) => React.ReactNode

  // Helpers de formato — defaults sensatos.
  formatDateTime?: (date: any) => string
  convertMilisecondsToScale?: (valor: number, escala: string) => number | null

  palette?: RegistroDeCampoCardPalette
}

// ─── Component ────────────────────────────────────────────────────────────
export const RegistroDeCampoCardView = forwardRef<HTMLDivElement, RegistroDeCampoCardViewProps>(
  (props, ref) => {
    const {
      registro,
      paginaAtual = 1,
      oldestAndNewestMap,
      relatedRegistros = [],
      folha,
      showRegistroData = true,
      setValor,
      setStyle,
      setErrorMsg,
      sendValor,
      recalculateValor,
      onSaveJustificativas,
      onCheck,
      onAddChild,
      onDelete,
      onAbrirCorrecao,
      putAnexoApi,
      deleteAnexoApi,
      getSignedUrl,
      fetchHistoryApi,
      loadChart,
      onToast,
      renderJustificativaModal,
      renderStatusLight,
      formatDateTime = (d: any) => new Date(d).toLocaleString(),
      convertMilisecondsToScale,
    } = props

    const controle = registro.campoDeVerificacao?.controle
    const emDia = !registro?.isLate
    const correctionCount =
      registro.quantidadeOrdensDeCorrecao ||
      registro.ordensDeCorrecaoIds?.length ||
      registro.ordensDeCorrecao?.length ||
      0

    // ── Micro-hooks ──
    const styleClass = useRegistroStyle({ registro, oldestAndNewestMap })

    const justifica = useJustificativaModal({ registro, onSaveJustificativas })

    const history = useHistory({
      campoDeVerificacaoId: registro?.campoDeVerificacao?.id,
      fetchHistoryApi,
    })

    const anexo = useAnexoManager({
      registroId: registro.id,
      rawAnexos: registro.anexos,
      putAnexoApi,
      deleteAnexoApi,
      getSignedUrl,
      onToast,
    })

    const [showRelated, setShowRelated] = useState(false)

    const StatusLightCmp = ({ active }: { active: boolean }) =>
      renderStatusLight ? <>{renderStatusLight(active)}</> : <DefaultStatusLight active={active} />

    const especificacaoLimites = useMemo(() => {
      if (!controle || controle === 'default') return null
      const list = controle?.especificacao?.limitesDeControle
      if (!list || !list.length) return null
      return [...list].sort((a: any, b: any) => a.valor - b.valor)
    }, [controle])

    const frequenciaLabel = useMemo(() => {
      if (!controle || controle === 'default') return '-'
      const conv = convertMilisecondsToScale
        ? convertMilisecondsToScale(controle.valor, controle.escala)
        : null
      return conv != null ? `${conv} ${controle.escala}` : controle.escala ?? '—'
    }, [controle, convertMilisecondsToScale])

    return (
      <>
        {history.showHistory && (
          <HistoryModal
            show={history.showHistory}
            onClose={history.closeHistory}
            historyData={history.historyData}
            isLoading={history.isLoadingHistory}
            title={`Histórico - ${registro?.campoDeVerificacao?.label || ''}`}
            unit={registro?.campoDeVerificacao?.controle?.labelUnidade}
            frequency={registro?.campoDeVerificacao?.controle}
            canShowChart={registro.campoDeVerificacao?.tipoDeCampo !== 'text'}
            onOpenChart={() => {
              history.closeHistory()
              loadChart?.(registro.campoDeVerificacao, controle, history.historyData)
            }}
            onRefresh={(range: { startDate: string; endDate: string }) => history.fetchHistory(range)}
            renderStatusLight={(active: boolean) =>
              renderStatusLight ? renderStatusLight(active) : <DefaultStatusLight active={active} />
            }
            convertToScale={convertMilisecondsToScale as any}
          />
        )}

        {renderJustificativaModal?.({
          show: justifica.showJustificativaModal,
          onClose: justifica.closeJustificativaModal,
          registro,
          onSaveJustificativas: justifica.saveJustificativas,
        })}

        <div
          ref={ref}
          id={`registro-${registro.id}`}
          className={`registro-card mb-3 rounded-xl bg-white shadow-sm transition-colors ${styleClass}`}
          style={{
            border: registro.changed
              ? '2px solid #faad14'
              : registro.fromDinamico
                ? '2px solid #7c3aed'
                : '1px solid #dee2e6',
            boxShadow: registro.fromDinamico
              ? '0 2px 8px rgba(124, 58, 237, 0.18)'
              : '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: registro.changed ? '#fffbe6' : undefined,
          }}
        >
          <div className="p-4">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  {registro.id && (
                    <Badge tone="neutral" size="sm">
                      ID: {registro.id}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1">
                    {getTipoIcon(registro.campoDeVerificacao?.tipoDeCampo)}
                    <Badge tone={tipoToneMap[registro.campoDeVerificacao?.tipoDeCampo] || 'neutral'} size="sm">
                      {registro.campoDeVerificacao?.tipoDeCampo}
                    </Badge>
                  </div>
                </div>
                <h6 className="mb-1 font-semibold text-slate-800">
                  {registro?.campoDeVerificacao?.label}
                </h6>
                <div className="mb-2 flex items-center gap-2">
                  <p className="m-0 flex-1 text-[13px] text-slate-500">
                    {registro?.campoDeVerificacao?.controle?.parametro?.nome ||
                      registro?.campoDeVerificacao?.controle?.nomeParametro ||
                      registro.campoDeVerificacao?.descricao}
                  </p>
                  {registro?.campoDeVerificacao?.controle?.labelUnidade && (
                    <Badge tone="neutral" size="sm">
                      {registro.campoDeVerificacao.controle.labelUnidade}
                    </Badge>
                  )}
                </div>
              </div>

              {onDelete && (
                <input
                  type="checkbox"
                  disabled={!registro.id}
                  checked={!!registro.checked}
                  onChange={(e) => onCheck?.(e.target.checked)}
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>

            {/* Data + Usuário */}
            {showRegistroData && (
              <div className="mb-3 flex items-center justify-between">
                <div className="flex flex-col">
                  {!registro.id && registro.lastRegister?.data && (
                    <small className="text-[11px] text-slate-500">Último registro</small>
                  )}
                  <small className="flex items-center gap-1 text-[13px] text-slate-700">
                    <FiClock size={12} className="text-slate-500" />
                    {formatDateTime(
                      !registro.id && registro.lastRegister?.data
                        ? registro.lastRegister.data
                        : registro.data,
                    )}
                  </small>
                </div>

                {registro.nomeUsuario && (
                  <Badge tone="neutral" size="sm">
                    <FaUser size={10} />
                    <span className="ml-1">{registro.nomeUsuario}</span>
                  </Badge>
                )}
                {registro.fromDinamico && (
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold tracking-wide text-white"
                    style={{ background: '#7c3aed' }}
                    title="Registro lançado pelo Caderno Dinâmico (não vinculado a esta folha)"
                  >
                    ⚡ DINÂMICO
                  </span>
                )}
              </div>
            )}

            {/* Especificação + Frequência */}
            <div className="mb-4 grid min-h-[60px] grid-cols-[2fr_1fr] gap-3 rounded-md bg-slate-50 p-3">
              <div>
                <small className="mb-1 block text-[11px] text-slate-500">Especificação</small>
                <div className="text-xs">
                  {especificacaoLimites ? (
                    <div className="flex flex-wrap gap-1">
                      {especificacaoLimites.map((limite: any, i: number) => (
                        <Badge key={i} tone="neutral" size="sm">
                          {limite.boundRule} {Number(limite.valor)?.toFixed(2)}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">-</span>
                  )}
                </div>
              </div>
              <div>
                <small className="mb-1 block text-[11px] text-slate-500">Frequência</small>
                <div className="text-xs">
                  {controle && controle !== 'default' ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        {paginaAtual > 1 && (
                          <Tooltip content={emDia ? 'em dia' : 'em atraso'}>
                            <span>
                              <StatusLightCmp active={emDia} />
                            </span>
                          </Tooltip>
                        )}
                        <span className="text-xs">{frequenciaLabel}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">-</span>
                  )}
                </div>
              </div>
            </div>

            {/* Campo de valor */}
            <div className="mb-4">
              <RegistroDeCampoField
                folha={folha as any}
                registro={registro}
                setValor={setValor}
                sendValor={sendValor}
                setStyle={setStyle}
                setErrorMsg={setErrorMsg}
                recalculateValor={recalculateValor}
              />
              {registro.errorMessage && (
                <small className="mt-1 block text-red-600">{registro.errorMessage}</small>
              )}
            </div>

            {/* Ações */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
              <div className="flex flex-wrap items-center gap-3">
                {relatedRegistros.length > 0 && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowRelated(!showRelated)}
                    className="flex items-center gap-1 p-0 text-xs text-slate-500"
                  >
                    {showRelated ? <FaChevronUp /> : <FaChevronDown />}
                    {relatedRegistros.length} anterior
                    {relatedRegistros.length > 1 ? 'es' : ''}
                  </Button>
                )}

                <Tooltip content="Abrir correcao">
                  <span
                    onClick={registro.id ? () => onAbrirCorrecao?.(registro) : undefined}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium"
                    style={{
                      cursor: registro.id ? 'pointer' : 'default',
                      color: registro.id ? '#495057' : '#adb5bd',
                    }}
                  >
                    <FaTools size={14} color={registro.id ? '#fd7e14' : '#adb5bd'} />
                    <span>{correctionCount}</span>
                    <span className="hidden sm:inline">
                      {' '}
                      corre{correctionCount === 1 ? 'cao aberta' : 'coes abertas'}
                    </span>
                  </span>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip content="Histórico">
                  <span
                    onClick={() => history.fetchHistory()}
                    className="cursor-pointer text-slate-500"
                  >
                    <GrLineChart size={18} />
                  </span>
                </Tooltip>

                <Tooltip content="Adicionar Filho">
                  <span
                    onClick={registro.id ? () => onAddChild?.(registro) : undefined}
                    style={{
                      cursor: registro.id ? 'pointer' : 'default',
                      color: registro.id ? '#0d6efd' : '#adb5bd',
                    }}
                  >
                    <FaPlus size={18} />
                  </span>
                </Tooltip>

                <Tooltip content="Justificativa">
                  <span
                    onClick={registro.id ? justifica.openJustificativaModal : undefined}
                    style={{
                      cursor: registro.id ? 'pointer' : 'default',
                      color: registro.id ? '#0dcaf0' : '#adb5bd',
                    }}
                  >
                    <IconWithBadge icon={<GrEdit size={18} />} content={justifica.validCount} />
                  </span>
                </Tooltip>

                <Tooltip content="Anexos">
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0"
                    style={{
                      color: registro.id ? '#0d6efd' : '#adb5bd',
                      cursor: registro.id ? 'pointer' : 'not-allowed',
                    }}
                    disabled={!registro.id}
                    onClick={anexo.openAnexoModal}
                  >
                    <IconWithBadge icon={<FaPaperclip size={18} />} content={anexo.anexoBadgeCount} />
                  </button>
                </Tooltip>

                <Modal
                  open={anexo.showAnexoModal}
                  onOpenChange={(o: boolean) => (o ? anexo.openAnexoModal() : anexo.closeAnexoModal())}
                  size="lg"
                >
                  <ModalHeader>Anexos do registro</ModalHeader>
                  <ModalBody>
                    {anexo.showAnexoModal && (
                      <AnexoManager
                        persistidos={anexo.persistedAnexos}
                        locais={anexo.locais}
                        onAddFiles={anexo.onAddFiles}
                        onRemoveLocal={anexo.onRemoveLocal}
                        onRemovePersistido={anexo.onRemovePersistido}
                        onDownload={anexo.onDownloadAnexo}
                        getImageReadUrl={anexo.getImageReadUrl}
                        readonly={!registro.id}
                        maxFiles={10}
                      />
                    )}
                  </ModalBody>
                </Modal>
              </div>
            </div>

            {/* Área colapsável — registros anteriores */}
            {showRelated && relatedRegistros.length > 0 && (
              <div className="mt-3 border-t border-slate-200 pt-3">
                <h6 className="mb-3 text-[13px] text-slate-500">
                  Histórico de registros (nesta folha)
                </h6>
                <div className="flex flex-col gap-2">
                  {relatedRegistros.map((relReg: any, idx: number) => (
                    <div
                      key={relReg._localId || relReg.id || idx}
                      className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-2"
                    >
                      <div className="flex items-center gap-2">
                        <Badge tone="neutral" size="sm">
                          ID: {relReg.id}
                        </Badge>
                        <span className="text-xs font-medium">{relReg.valor || '(vazio)'}</span>
                        <small className="text-[11px] text-slate-400">
                          {formatDateTime(relReg.data)}
                        </small>
                        {relReg.nomeUsuario && (
                          <small className="flex items-center gap-1 text-[11px] text-slate-400">
                            <FaUser size={10} />
                            {relReg.nomeUsuario.split(' ')[0]}
                          </small>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {relReg.errorMessage && (
                          <Badge tone="danger" size="sm">
                            Erro
                          </Badge>
                        )}
                        {relReg.isLate && (
                          <Badge tone="warning" size="sm">
                            Atrasado
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  },
)

RegistroDeCampoCardView.displayName = 'RegistroDeCampoCardView'

export default RegistroDeCampoCardView
