// @hashcodeti/ui-kit-sgm — Wave 1 fase 2 + Wave 2C.
// Modais compostos e widgets do domínio SGM (Manutenção). Consomem
// ViewModels (Ports) do teraprox-core-sdk ou recebem IO via props —
// sem Redux/useCoreService/useHttpController na UI.

export {
  UnidadeMaterialModal,
  type UnidadeMaterialModalProps,
} from './unidade-material/UnidadeMaterialModal'

export {
  InspecaoModal,
  type InspecaoModalProps,
} from './inspecao/InspecaoModal'

// Wave 2C — widgets de Ação/Manutentor (props-driven, sem Redux)
export {
  AcaoPicker,
  type AcaoPickerProps,
  type AcaoRef,
} from './acao-manutentor/AcaoPicker'

export {
  MantenedorRender,
  type MantenedorRenderProps,
} from './acao-manutentor/MantenedorRender'

export {
  MantenedorRenderCompact,
  type MantenedorRenderCompactProps,
  type MaintainerAssignment,
} from './acao-manutentor/MantenedorRenderCompact'

export {
  ManutentoresDisplay,
  type ManutentoresDisplayProps,
  type ManutentorEntry,
} from './acao-manutentor/ManutentoresDisplay'

export {
  ManutentorCard,
  type ManutentorCardProps,
  type MantenedorVM,
} from './acao-manutentor/ManutentorCard'

export {
  ManutentorCardCompact,
  type ManutentorCardCompactProps,
} from './acao-manutentor/ManutentorCardCompact'

export {
  MetricasDisplay,
  type MetricasDisplayProps,
} from './acao-manutentor/MetricasDisplay'

// Wave 2A — familia Recurso migrada do ui-kit legado.
// Componentes puramente apresentacionais; logica de IO vive em Ports do core-sdk.
export {
  RecursoDisplayer,
  type RecursoDisplayerProps,
} from './recurso/RecursoDisplayer'

export {
  BranchDropDisplay,
  type BranchDropDisplayProps,
} from './recurso/BranchDropDisplay'

export {
  FindRecursoByTagField,
  type FindRecursoByTagFieldProps,
} from './recurso/FindRecursoByTagField'

// Wave G.1 (2026-05-15) — promovidos de teraprox-app-SGM-UTILS.
// View-puros props-driven; toda lógica Redux/hooks fica no caller.
export {
  BranchNodeDisplayV2,
  type BranchNodeDisplayV2Props,
  type BranchNodeData,
  type BranchData,
  type BranchNodeRecurso,
} from './recurso/BranchNodeDisplayV2'

export {
  BranchContainerV2,
  type BranchContainerV2Props,
} from './recurso/BranchContainerV2'

// Wave 2B — widgets do dominio Tarefa migrados de SGM-OS.
// Apresentacionais puros: IO/Redux fica no caller (SGM-OS).
export {
  TarefaCard,
  type TarefaCardProps,
} from './tarefa/TarefaCard'

export {
  TarefaItem,
  type TarefaItemProps,
  type TarefaItemInspecaoExtras,
} from './tarefa/TarefaItem'

export {
  UnidadeMaterialPicker,
  type UnidadeMaterialPickerProps,
} from './tarefa/UnidadeMaterialPicker'

// Sprint 2026-04-29 tarefa-item-unified, Phase 2 — modal apresentacional
// promovido de teraprox-SGM-OS/Components/manutencao/ObservacaoModal.js
// (zero Redux, zero ChatComponent legacy — props-driven puro).
export {
  ObservacaoModal,
  type ObservacaoModalProps,
  type ObservacaoMessage,
} from './tarefa/ObservacaoModal'

// Wave 5B — MantenedorPicker hexagonal (consome IMantenedorPickerViewModel do core-sdk)
export {
  MantenedorPicker,
  type MantenedorPickerProps,
} from './mantenedor/MantenedorPicker'

// Sprint 2026-04-30 pick-mantenedor-os-card-unified — promovidos do
// teraprox-SGM-OS/Components/.../OsPlanejada para uso em SGM-OS + SGM-OM.
// OsCard: props-driven puro. PickMantenedorTipoModal: consome
// IPickMantenedorTipoViewModel (Port no core-sdk).
export {
  OsCard,
  type OsCardProps,
  type OsCardOrdem,
  PickMantenedorTipoModal,
  type PickMantenedorTipoModalProps,
  OS_STATUS_PALETTE,
  getOsStatusMeta,
  type OsStatusMeta,
  // Wave H.3 (2026-05-15) — OrdemDeServicoDisplayCard promovido de SGM-OS.
  // Apresentacional puro com slots para inline-edit; caller injeta dispatch/navigate.
  OrdemDeServicoDisplayCard,
  getOrdemDeServicoDisplayColor,
  type OrdemDeServicoDisplayCardProps,
  type OrdemDeServicoDisplayCardItem,
  type OsDisplayStatus,
} from './os'

// Wave G.1 (2026-05-15) — promoções DOMAIN_PURO de teraprox-SGM-OM/Components.
// Apresentacionais puros (zero Redux/router/useCoreService); 100% Tailwind+Radix
// via @hashcodeti/ui-kit-core. Markers nos arquivos originais do MF documentam
// o import canônico e o TODO de refactor dos callers.
export {
  OrdemStatusIndicator,
  type OrdemStatusIndicatorProps,
  type OrdemStatus,
  OrdemStatusActions,
  type OrdemStatusActionsProps,
  type OrdemStatusActionsOrdem,
  OrdemInfoCard,
  type OrdemInfoCardProps,
  type OrdemInfoCardOrdem,
  OSQuickEndModal,
  type OSQuickEndModalProps,
  type OSQuickEndModalOS,
  OSQuickActionsMenu,
  type OSQuickActionsMenuProps,
  type OSQuickActionsMenuOS,
  // Wave H.2 (2026-05-15) — par DEDICADO promovido com Port/slots.
  OSCheckoutModalV2,
  type OSCheckoutModalV2Props,
  type OSCheckoutForm,
  type OSCheckoutOMContext,
  type OSCheckoutMode,
  OSQuickStartModal,
  type OSQuickStartModalProps,
  type OSQuickStartModalOS,
  type OSQuickStartToastType,
} from './om'

// ─── Wave G.1 (2026-05-15) — promoções SGM-OS execução ───
// Componentes domain SGM promovidos de teraprox-SGM-OS/Components.
// Refs: wiki/arquitetura/wave-g-sgm-os-inventory.md.

// OsSkeleton — placeholder card OS planejada (loading state).
// OsEmpty — estado vazio canônico da tela de planejamento.
export { OsSkeleton, OsEmpty, type OsSkeletonProps, type OsEmptyProps } from './states/OsSkeleton'

// ─── Wave H.1 (2026-05-13) — promoção dedicada SGM-OS ───
// TarefasTab — tab de edição de tarefas em /os/form. Componente complexo que
// vivia em teraprox-SGM-OS com Redux + useCoreService + useTarefaItemViewModel
// + hooks customizados inline; agora 100% props-driven (caller injeta hook do
// VM, dispatchers, IO services e render-props para componentes que ainda
// vivem no MF — InspecoesList, LimiteDeControlePicker).
// Refs: wiki/arquitetura/wave-g-sgm-os-inventory.md (DEDICADO).
export {
  TarefasTab,
  type TarefasTabProps,
  type TarefasTabForm,
  type TarefasTabTarefa,
  type UseTarefaItemVmHook,
  type RenderInspecoesListArgs,
  type RenderLimitePickerArgs,
} from './os/tabs/TarefasTab'
