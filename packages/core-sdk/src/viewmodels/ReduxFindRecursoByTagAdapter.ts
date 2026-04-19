import { useCallback, useMemo, useState } from 'react'
import { useHttpController } from '../hooks/useHttpController'
import type { HttpController } from '../types/HttpController'
import type {
  IFindRecursoByTagViewModel,
  RecursoTagRef,
} from './IFindRecursoByTagViewModel'

export interface FindRecursoByTagAdapterOverrides {
  /**
   * Override explicito do controller — util para callers que precisam de
   * gatewayBase customizado (workaround federation endpoint bake-in).
   * Se ausente, resolve via useHttpController('recurso').
   */
  recursoController?: HttpController | Pick<HttpController, 'read' | 'get'>
}

/**
 * Adapter que implementa IFindRecursoByTagViewModel.
 *
 * Porta para fora da UI a logica antes inline em
 * `teraprox-core/packages/ui-kit/src/forms/FindRecursoByTagField.tsx`
 * (useHttpController('recurso') + findRecursoByTagId/Description handlers).
 */
export function useFindRecursoByTagViewModel(
  overrides: FindRecursoByTagAdapterOverrides = {}
): IFindRecursoByTagViewModel {
  const defaultRecurso = useHttpController('recurso')
  const recursoCtrl = overrides.recursoController ?? defaultRecurso

  const [isSearching, setIsSearching] = useState<boolean>(false)

  const loadActiveTags = useCallback(async (): Promise<RecursoTagRef[]> => {
    try {
      const res = await recursoCtrl.get('findActiveRecursosTags')
      return Array.isArray(res) ? (res as RecursoTagRef[]) : []
    } catch (err) {
      console.warn('[FindRecursoByTagVM] loadActiveTags failed:', err)
      return []
    }
  }, [recursoCtrl])

  const searchByTagId = useCallback(
    async (tagId: string | number): Promise<any | null> => {
      setIsSearching(true)
      try {
        const r = await recursoCtrl.read('findRecursoByTagId', tagId)
        return r ?? null
      } catch (err) {
        console.error('[FindRecursoByTagVM] searchByTagId failed:', err)
        return null
      } finally {
        setIsSearching(false)
      }
    },
    [recursoCtrl]
  )

  const searchByTag = useCallback(
    async (description: string): Promise<any | null> => {
      setIsSearching(true)
      try {
        const formatted = description.replace(/\s/g, '')
        const r = await recursoCtrl.read(
          'recurso/findByTagDescription',
          formatted
        )
        return r ?? null
      } catch (err) {
        console.error('[FindRecursoByTagVM] searchByTag failed:', err)
        return null
      } finally {
        setIsSearching(false)
      }
    },
    [recursoCtrl]
  )

  return useMemo<IFindRecursoByTagViewModel>(
    () => ({
      isSearching,
      loadActiveTags,
      searchByTagId,
      searchByTag,
    }),
    [isSearching, loadActiveTags, searchByTagId, searchByTag]
  )
}
