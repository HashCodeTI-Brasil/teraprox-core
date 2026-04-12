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
}

export interface RemoteManifest {
  /** Nome do remote (deve corresponder ao name do ModuleFederationPlugin) */
  name: string
  /** Versão semântica */
  version: string
  /** Seções de menu que este remote contribui */
  menuSections: RemoteMenuSection[]
  /** Rotas internas (formulários, detalhe) que não aparecem no menu */
  formRoutes?: RemoteFormRoute[]
}
