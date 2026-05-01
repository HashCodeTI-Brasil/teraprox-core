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
