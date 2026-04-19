/**
 * Adapter default do Port `IAnexoManagerViewModel`.
 *
 * Delega para `useAnexoManager` (hook parcial ja existente em core-sdk/hooks).
 * A existencia deste Adapter formaliza a camada: a UI consome
 * `useAnexoManagerViewModel({...})` e ganha contrato tipado + isolamento
 * de implementacao.
 *
 * Retrocompatibilidade: `useAnexoManager` continua exportado no root do SDK
 * com a mesma assinatura original.
 */

import { useMemo } from 'react'
import { useAnexoManager } from '../hooks/useAnexoManager'
import type {
  IAnexoManagerViewModel,
  UseAnexoManagerOptions,
} from './IAnexoManagerViewModel'

export function useAnexoManagerViewModel(
  opts: UseAnexoManagerOptions
): IAnexoManagerViewModel {
  const base = useAnexoManager(opts)

  return useMemo<IAnexoManagerViewModel>(
    () => ({
      persistidos: base.persistidos,
      locais: base.locais,
      loading: base.loading,
      loadAnexos: base.loadAnexos,
      addFiles: base.addFiles,
      removeLocal: base.removeLocal,
      uploadAll: base.uploadAll,
      removePersistido: base.removePersistido,
      getUrl: base.getUrl,
    }),
    [
      base.persistidos,
      base.locais,
      base.loading,
      base.loadAnexos,
      base.addFiles,
      base.removeLocal,
      base.uploadAll,
      base.removePersistido,
      base.getUrl,
    ]
  )
}
