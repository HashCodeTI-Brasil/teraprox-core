// @hashcodeti/ui-kit-sgp — Wave 3B.
// Widgets do dominio Processo (SGP). Props-driven: sem Redux,
// sem useCoreService, sem useHttpController. Callers resolvem IO.

// Correcao
export {
  CalculoCorrecao,
  type CalculoCorrecaoProps,
  type CalculoVM,
} from './correcao/CalculoCorrecao'

export {
  CalculadoraCorrecaoModal,
  type CalculadoraCorrecaoModalProps,
  type CalculoDeCorrecaoVM,
  type RegraDeCorrecaoVM,
} from './correcao/CalculadoraCorrecaoModal'

// Tarefa / Unidade Material
export {
  UnidadeMaterialCard,
  type UnidadeMaterialCardProps,
  type UnidadeMaterialVM,
  type TarefaUnidadeMaterialVM,
} from './tarefa-unidade/UnidadeMaterialCard'

export {
  TarefaUnidadeForm,
  type TarefaUnidadeFormProps,
  type TarefaFormVM,
  type AcaoOption,
  type UnidadeMaterialFormValue,
} from './tarefa-unidade/TarefaUnidadeForm'

// Frequencia — re-export compat apontando para ui-kit-core. O shape legado
// (FrequenciaVM / FrequenciaFormChange / FrequenciaEscala 'DIA'|'HORAS'|...)
// foi removido no realinhamento Track C.1 UI. Callers SGP que ainda passam
// o shape antigo sao debito residual documentado — migrar para Port
// (useRecorrenciaViewModel) quando possivel.
export {
  FrequenciaFormV2,
  type FrequenciaFormV2Props,
  type RecorrenciaValue,
  type RecorrenciaEscala,
} from './frequencia/FrequenciaFormV2'

// Folha de Verificacao — sub-widgets
export {
  CampoDeVerificacaoV2,
  type CampoDeVerificacaoV2Props,
  type CampoVM,
} from './folha-verificacao/CampoDeVerificacaoV2'

// Ordem de Correcao (Wave E.2.1)
export {
  OrdemDeCorrecaoCard,
  type OrdemDeCorrecaoCardProps,
} from './ordem-correcao/OrdemDeCorrecaoCard'

export {
  TarefaCard,
  type TarefaCardProps,
  type UnidadeMaterialFormVM,
} from './ordem-correcao/TarefaCard'

export {
  AutorizacaoCard,
  type AutorizacaoCardProps,
  type AutorizacaoVM,
} from './ordem-correcao/AutorizacaoCard'

// Ordem de Correcao (Wave G.1, 2026-05-15)
export {
  BadgePendenteAutorizacao,
  type BadgePendenteAutorizacaoProps,
} from './ordem-correcao/BadgePendenteAutorizacao'

export {
  MaterialApontarCard,
  type MaterialApontarCardProps,
  type MaterialApontarTumVM,
  type MaterialApontarUnidadeMaterialVM,
} from './ordem-correcao/MaterialApontarCard'

export {
  TarefaApontarCard,
  type TarefaApontarCardProps,
  type TarefaApontarVM,
} from './ordem-correcao/TarefaApontarCard'

// Relatorio Moderno (Wave E.2.1)
export {
  RelatorioModernCard,
  type RelatorioModernCardProps,
} from './relatorio/RelatorioModernCard'

export {
  RelatorioModernWrapper,
  type RelatorioModernWrapperProps,
  type RelatorioModernWrapperHandle,
  type RelatorioStats,
} from './relatorio/RelatorioModernWrapper'

// Caderno de Verificacao (Wave E.2.1)
export {
  CadernoDeVerificacaoHeader,
  type CadernoDeVerificacaoHeaderProps,
} from './caderno/CadernoDeVerificacaoHeader'

export {
  HistoryModal,
  type HistoryModalProps,
  type HistoryRecord,
  type FrequencyVM,
} from './caderno/HistoryModal'

// Wave G.1 (2026-05-15) — promocoes SGP-caderno
export {
  RegistroDeCampoField,
  type RegistroDeCampoFieldProps,
  type RegistroDeCampoFieldPalette,
} from './registro/RegistroDeCampoField'

// Wave H.4 (2026-05-15) — promocao dedicada (bloqueio E.2.1 resolvido).
// Decompoe useRegistroDeCampoCard em 4 micro-hooks; substitui Redux/useCoreService/useToasts
// por callbacks injetados pelo caller (Port-style).
export {
  RegistroDeCampoCardView,
  type RegistroDeCampoCardViewProps,
  type RegistroDeCampoCardPalette,
} from './registro/RegistroDeCampoCardView'

export {
  useRegistroStyle,
  type OldestNewestMap,
  type UseRegistroStyleArgs,
} from './registro/hooks/useRegistroStyle'

export {
  useAnexoManager,
  type UseAnexoManagerArgs,
  type UseAnexoManagerResult,
  type AnexoToastLevel,
} from './registro/hooks/useAnexoManager'

export {
  useJustificativaModal,
  type UseJustificativaModalArgs,
  type UseJustificativaModalResult,
} from './registro/hooks/useJustificativaModal'

export {
  useHistory,
  type UseHistoryArgs,
  type UseHistoryResult,
  type HistoryFilters,
} from './registro/hooks/useHistory'

export {
  ReferenciaDinamicaPicker,
  type ReferenciaDinamicaPickerProps,
  type ReferenciaCadernoVM,
  type ReferenciaCampoVM,
} from './formula/ReferenciaDinamicaPicker'

export {
  FormulaBuilderOffcanvas,
  type FormulaBuilderOffcanvasProps,
} from './formula/FormulaBuilderOffcanvas'

export {
  SheetOrdenationCard,
  type SheetOrdenationCardProps,
  type SheetVM,
  type SheetMoveInfo,
} from './folha/SheetOrdenationCard'

export {
  CampoDeVerificacaoSelectableCards,
  type CampoDeVerificacaoSelectableCardsProps,
  type SelectableCampoVM,
} from './folha/CampoDeVerificacaoSelectableCards'

export {
  ChartWithStats,
  type ChartWithStatsProps,
} from './analise/ChartWithStats'

export {
  ChartStats,
  type ChartStatsProps,
} from './analise/ChartStats'

// Wave G.1 (2026-05-15) — promocoes SGP-planoDeControle (DOMAIN_PURO)
//
// Fluxo (BPMN canvas) — primitivos + adornos visuais. Componente que orquestra
// (FluxoCanvas, FluxoListPanel) permanece DOMAIN_COMPOSITION no MF.
export {
  FluxoNode,
  TIPO_CONFIG,
  type FluxoNodeProps,
  type FluxoNodeData,
  type FluxoTipoConfig,
  type FluxoTipoConfigKey,
} from './fluxo/FluxoNode'
export { FluxoEdge, type FluxoEdgeProps, type FluxoEdgeData } from './fluxo/FluxoEdge'
export { FluxoLegend, type FluxoLegendProps } from './fluxo/FluxoLegend'
export { FluxoToolbar, type FluxoToolbarProps } from './fluxo/FluxoToolbar'

// Plano — dashboard cards e selector visual
export {
  PlanoBadgeSelector,
  type PlanoBadgeSelectorProps,
  type PlanoBadgeOption,
} from './plano/PlanoBadgeSelector'
export {
  PlanoDashboardCard,
  type PlanoDashboardCardProps,
  type EstatisticasPlanoVM,
} from './plano/PlanoDashboardCard'

// Controle — dashboards, selector e estatisticas
export {
  ControleDashboardCard,
  type ControleDashboardCardProps,
  type ControleOption,
} from './controle/ControleDashboardCard'
export {
  ControleSelector,
  type ControleSelectorProps,
  type ControleSelectorPlano,
  type ControleSelectorPlanoOption,
  type ControleSelectorOperacao,
  type ControleSelectorLpc,
  type ControleSelectorControle,
  type ControleSelectorEspecificacao,
  type ControleSelectorLimite,
} from './controle/ControleSelector'
export {
  EstatisticaDoControleDashBoard,
  type EstatisticaDoControleDashBoardProps,
  type EstatisticaDoControleCurrent,
  type EstatisticaControleVM,
} from './controle/EstatisticaDoControleDashBoard'
export {
  EstatisticasFrequenciaDashboard,
  type EstatisticasFrequenciaDashboardProps,
  type EstatisticasFrequenciaVM,
} from './controle/EstatisticasFrequenciaDashboard'

// Registro — view dashboard
export {
  RegistroviewDashboardCard,
  type RegistroviewDashboardCardProps,
  type RegistroviewControle,
  type RegistroviewRegistro,
  type RegistroviewLimite,
} from './registro/RegistroviewDashboardCard'

// Frequencia — picker thin wrapper (form injetado)
export {
  FrequenciaPicker,
  type FrequenciaPickerProps,
} from './frequencia/FrequenciaPicker'

// Autorizacao — modal de rejeicao de autorizacao
export {
  AutorizacaoRejeicaoModal,
  type AutorizacaoRejeicaoModalProps,
} from './autorizacao/AutorizacaoRejeicaoModal'

// Mini-Wave "Caderno V2 closure" (2026-05-16) — migrações de legado/local
// para o kit SGP.
//
// Justificativa — modal de comentários sobre registro de campo. Migrado de
// `teraprox-ui-kit/modals/JustificativaModal` (react-bootstrap) para stack
// Tailwind+Radix usando primitivos de ui-kit-core. API parity 100%.
export {
  JustificativaModal,
  type JustificativaModalProps,
  type Justificativa,
} from './justificativa'

// Preset — modal "Salvar visualização" do Caderno Dinâmico. Promovido de
// `teraprox-SGP-caderno/Components/processo/SaveViewModal.tsx` local.
// Renomeado: SaveViewModal→PresetSaveModal, SavePresetPayload→PresetSavePayload.
// Ver `decisions-log/2026-05-15-caderno-como-preset.md`.
export {
  PresetSaveModal,
  type PresetSaveModalProps,
  type PresetSavePayload,
  type PresetSummary,
  type PresetAccessMode,
} from './preset'

// Wave H.6 (2026-05-15) — promocoes adiadas da Wave G.1 SGP-caderno
//
// FolhaDeVerificacao (DOMAIN_COMPOSITION) — view-pure. Caller injeta:
//   - fetchFolha (substitui useCoreService)
//   - onReplaceFolha / onCheckAllRegistros / onPersistFolha (substituem dispatch)
//   - renderRegistroCard (RegistroDeCampoCardView — Wave H.4 paralela)
export {
  FolhaDeVerificacao,
  type FolhaDeVerificacaoProps,
  type RegistroCardRenderProps,
} from './folha/FolhaDeVerificacao'
export {
  useGrouping,
  GROUP_LABELS,
  type GroupingMode,
  type GroupedItem,
  type DisplayGroupNode,
  type UseGroupingApi,
} from './folha/hooks/useGrouping'
export {
  useFolhaFetcher,
  type FolhaVM,
  type UseFolhaFetcherApi,
  type UseFolhaFetcherOptions,
} from './folha/hooks/useFolhaFetcher'

// FormulaEditor (DOMAIN_COMPOSITION) — view-pure. Modais Radix (ui-kit-core/Modal),
// useToasts substituido por prop `onNotify`. ReferenciaDinamicaPicker injetado via
// render-prop `renderReferenciaPicker` (caller fornece loaders).
export {
  FormulaEditor,
  type FormulaEditorProps,
} from './formula/FormulaEditor'
export {
  useDragFormula,
  type FormulaToken,
  type FormulaSegment as DragFormulaSegment,
  type UseDragFormulaApi,
  type UseDragFormulaOptions,
} from './formula/hooks/useDragFormula'
export {
  TokenBadge,
  type TokenBadgeProps,
} from './formula/tokens/TokenBadge'
export {
  TokenDragItem,
  type TokenDragItemProps,
  type FormulaSegment as TokenDragSegment,
  type FormulaSegmentType,
} from './formula/tokens/TokenDragItem'
export {
  TOKEN_STYLES,
  getTokenStyle,
  type TokenStyle,
  type TokenLabelKind,
} from './formula/tokens/tokenStyles'
