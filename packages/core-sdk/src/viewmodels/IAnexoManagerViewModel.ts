/**
 * Port for AnexoManager (ui-kit).
 *
 * A UI (`AnexoManager` em ui-kit) eh puramente apresentacional — consome
 * `persistidos`, `locais`, e callbacks. Esta Port formaliza o ViewModel
 * reutilizavel, elevando o hook parcial `useAnexoManager` (em core-sdk/hooks)
 * ao padrao hexagonal completo com contrato explicito + adapter separado.
 *
 * O Adapter default (`ReduxAnexoManagerAdapter` — embora nao use Redux:
 * o nome segue a convencao do core-sdk para indicar "Adapter HTTP/CoreService")
 * usa `useCoreService().createController('anexo')` por baixo dos panos.
 *
 * Modulos que queiram customizar totalmente (testes, mocks, estrategias
 * alternativas) podem injetar um `IAnexoPort` via `port` ou implementar
 * um Adapter proprio respeitando `IAnexoManagerViewModel`.
 */

import type {
  IAnexoPort,
  AnexoPersistido,
  AnexoLocal,
} from '../types/IAnexoPort'

export type { AnexoPersistido, AnexoLocal, IAnexoPort }

export interface IAnexoManagerViewModel {
  /** Anexos salvos no servidor */
  persistidos: AnexoPersistido[]

  /** Anexos selecionados localmente aguardando upload */
  locais: AnexoLocal[]

  /** True durante operacoes assincronas */
  loading: boolean

  /** Busca anexos existentes da entidade (via Port.readByEntity) */
  loadAnexos(): Promise<void>

  /** Adiciona arquivos na fila local (ainda nao faz upload) */
  addFiles(files: File[]): void

  /** Remove um arquivo da fila local */
  removeLocal(localId: string): void

  /**
   * Executa upload de todos os pendentes.
   * Se `overrideEntityId` for fornecido, usa-o no lugar do entityId do hook —
   * util quando a entidade foi criada no mesmo fluxo (ex: save-then-upload).
   * Retorna lista de anexos persistidos.
   */
  uploadAll(overrideEntityId?: string | number): Promise<AnexoPersistido[]>

  /** Remove um anexo persistido (chama Port.remove) */
  removePersistido(anexoId: string | number): Promise<void>

  /** Obtem signed URL para preview/download */
  getUrl(anexoId: string | number): Promise<string>
}

export interface UseAnexoManagerOptions {
  /** Contexto da entidade (ex: 'ordemDeServico', 'tarefa') */
  context: string

  /** ID da entidade alvo */
  entityId: string | number

  /**
   * Port customizado (opcional). Por default o adapter constroi um Port
   * a partir do `useCoreService().createController('anexo')`.
   */
  port?: IAnexoPort
}
