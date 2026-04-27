// @teraprox/ui-kit-sgm — Wave 1 fase 2 + Wave 2C.
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

// Wave 2B — widgets do dominio Tarefa migrados de SGM-OS.
// Apresentacionais puros: IO/Redux fica no caller (SGM-OS).
export {
  TarefaCard,
  type TarefaCardProps,
} from './tarefa/TarefaCard'

export {
  TarefaItem,
  type TarefaItemProps,
} from './tarefa/TarefaItem'

export {
  UnidadeMaterialPicker,
  type UnidadeMaterialPickerProps,
} from './tarefa/UnidadeMaterialPicker'

// Wave 5B — MantenedorPicker hexagonal (consome IMantenedorPickerViewModel do core-sdk)
export {
  MantenedorPicker,
  type MantenedorPickerProps,
} from './mantenedor/MantenedorPicker'
