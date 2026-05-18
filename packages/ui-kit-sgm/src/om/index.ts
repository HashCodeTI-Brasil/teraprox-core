// Wave G.1 — promoções DOMAIN_PURO de teraprox-SGM-OM/Components → ui-kit-sgm/om.
// Componentes apresentacionais, props-driven, Tailwind+Radix via @hashcodeti/ui-kit-core.

export {
  OrdemStatusIndicator,
  type OrdemStatusIndicatorProps,
  type OrdemStatus,
} from './OrdemStatusIndicator'

export {
  OrdemStatusActions,
  type OrdemStatusActionsProps,
  type OrdemStatusActionsOrdem,
} from './OrdemStatusActions'

export {
  OrdemInfoCard,
  type OrdemInfoCardProps,
  type OrdemInfoCardOrdem,
} from './OrdemInfoCard'

export {
  OSQuickEndModal,
  type OSQuickEndModalProps,
  type OSQuickEndModalOS,
} from './OSQuickEndModal'

export {
  OSQuickActionsMenu,
  type OSQuickActionsMenuProps,
  type OSQuickActionsMenuOS,
} from './OSQuickActionsMenu'

// Wave H.2 (2026-05-15) — par DEDICADO: OSCheckoutModalV2 + OSQuickStartModal.
// Refactor hexagonal: Ports/callbacks substituem useCoreService/useToast/useNavigate.
// Slots de render permitem ao caller injetar pickers ligados a Redux/CoreService.
export {
  OSCheckoutModalV2,
  type OSCheckoutModalV2Props,
  type OSCheckoutForm,
  type OSCheckoutOMContext,
  type OSCheckoutMode,
} from './OSCheckoutModalV2'

export {
  OSQuickStartModal,
  type OSQuickStartModalProps,
  type OSQuickStartModalOS,
  type ToastType as OSQuickStartToastType,
} from './OSQuickStartModal'
