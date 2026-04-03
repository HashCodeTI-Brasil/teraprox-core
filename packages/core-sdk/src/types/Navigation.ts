export interface NavigationConfig {
  replace?: boolean
  state?: any
  [key: string]: any
}

export type NavigateFn = (path: string | number, config?: NavigationConfig, pageName?: string) => void
