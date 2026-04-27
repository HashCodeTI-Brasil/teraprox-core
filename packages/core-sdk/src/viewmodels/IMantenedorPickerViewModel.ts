/**
 * IMantenedorPickerViewModel — Port do widget de seleção de manutentor
 * (Wave 5B hexagonal). Suporta estado client-side de busca + fluxo de
 * confirmação de desalocação quando o mantenedor selecionado já está
 * alocado em outra OS.
 */

export interface MantenedorOption {
  id: number | string
  nomeUsuario: string
  _busy?: boolean
  osId?: number | string | null
  [key: string]: unknown
}

export interface IMantenedorPickerViewModel {
  readonly options: MantenedorOption[]
  readonly filteredOptions: MantenedorOption[]
  readonly searchTerm: string
  readonly isLoading: boolean
  readonly error?: string | null
  readonly pendingConfirm: MantenedorOption | null

  search(term: string): void
  refresh(): Promise<void>
  requestSelect(
    item: MantenedorOption,
    currentOsId?: number | string | null
  ): 'confirm' | 'immediate'
  confirmSelect(): MantenedorOption | null
  cancelConfirm(): void
  reset(): void
}
