/**
 * Dependência de reducer declarada no manifest.
 *
 * Cada rota declara quais fatias do Redux precisa.
 * O core injeta APENAS essas fatias antes de montar o componente.
 *
 * A string é a chave no store (ex: 'tarefa', 'solicitacaoDeServico').
 */
export type ReducerDep = string

/**
 * Manifesto que cada remote exporta para o Core
 * montar menu e rotas dinamicamente.
 */
export interface RemoteMenuItem {
  /** Label exibido no menu */
  label: string
  /** Rota no react-router (ex: '/manutencao/ordens-de-servico') */
  path: string
  /** Nome do módulo no exposes do webpack (ex: './OrdensDeServico') */
  module: string
  /** Contexto para ReducersBundle (ex: 'ordemDeServico') */
  context: string
  /** Reducer keys que esta tela precisa no store do core */
  reducers?: ReducerDep[]
  /** ID do componente para withPermission */
  componentId?: string
  /** Ícone react-icons (ex: 'FaTools') */
  icon?: string
}

export interface RemoteMenuSection {
  /** Nome da seção no menu (ex: 'Manutenção') */
  label: string
  /** Ícone da seção */
  icon?: string
  items: RemoteMenuItem[]
}

/**
 * Rota de formulário / tela interna que não aparece no menu,
 * mas precisa ser registrada como <Route> no host.
 */
export interface RemoteFormRoute {
  /** Rota no react-router (ex: '/solicitacaoDeServicoForm') */
  path: string
  /** Nome do módulo no exposes do webpack (ex: './SolicitacaoDeServicoForm') */
  module: string
  /** Contexto para ReducersBundle e HTTP (ex: 'solicitacaoDeServico') */
  context: string
  /** Reducer keys que esta tela precisa no store do core */
  reducers?: ReducerDep[]
}

/**
 * Reducers que o remote disponibiliza, agrupados por chave do store.
 * O manifest declara quais cada rota precisa; o ReducersBundle provê os importadores.
 */
export interface RemoteReducerMap {
  [storeKey: string]: () => Promise<any>
}

/**
 * Reducers defaults que são injetados em TODAS as rotas do remote,
 * independentemente do que cada rota declara.
 */
export type DefaultReducerKeys = string[]

export interface RemoteManifest {
  /** Nome do remote (deve corresponder ao name do ModuleFederationPlugin) */
  name: string
  /** Versão semântica */
  version: string
  /** Seções de menu que este remote contribui */
  menuSections: RemoteMenuSection[]
  /** Rotas internas (formulários, detalhe) que não aparecem no menu */
  formRoutes?: RemoteFormRoute[]
  /**
   * Mapa de TODOS os reducers que este remote disponibiliza.
   * Chave = nome no store, valor = lazy import do reducer.
   * Se presente, o core usa isso + reducers[] de cada rota para injeção granular.
   * Se ausente, fallback para o ReducersBundle legado.
   */
  reducerMap?: RemoteReducerMap
  /** Reducer keys injetados em TODAS as rotas deste remote */
  defaultReducers?: DefaultReducerKeys
}
