export interface DevRoute {
  /** Display label for the route */
  label: string
  /** Route path (e.g., "/ordensDeServico") */
  path: string
  /** Category for grouping (e.g., "Operação", "Cadastros") */
  category?: string
}

export interface DevShellProps {
  appName: string
  routes: DevRoute[]
  children: React.ReactNode
}
