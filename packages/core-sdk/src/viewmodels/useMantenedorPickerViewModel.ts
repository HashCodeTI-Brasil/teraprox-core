import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type {
  IMantenedorPickerViewModel,
  MantenedorOption,
} from './IMantenedorPickerViewModel'
import {
  setMantenedorOptions,
  setMantenedorSearchTerm,
  setMantenedorLoading,
  setMantenedorError,
  setMantenedorPendingConfirm,
  clearMantenedorSlot,
  MantenedorPickerSliceState,
} from './mantenedorPickerSlice'
import { useCoreService } from '../hooks/useCoreService'

const DEFAULT_KEY = '__default__'

/**
 * Adapter Redux que implementa IMantenedorPickerViewModel.
 *
 * Estado lido do slice 'mantenedorPicker', parametrizado por entityId
 * (normalmente osId). IO via useCoreService().createController('mantenedor').
 */
export function useMantenedorPickerViewModel(
  entityId?: string | number | null
): IMantenedorPickerViewModel {
  const key = entityId != null && entityId !== '' ? String(entityId) : DEFAULT_KEY
  const dispatch = useDispatch()
  const core = useCoreService()

  const slot = useSelector(
    (s: { mantenedorPicker?: MantenedorPickerSliceState }) =>
      s.mantenedorPicker?.byEntity[key] ?? null
  )

  const options = slot?.options ?? []
  const searchTerm = slot?.searchTerm ?? ''
  const isLoading = slot?.isLoading ?? false
  const error = slot?.error ?? null
  const pendingConfirm = slot?.pendingConfirm ?? null

  const refresh = useCallback(async () => {
    dispatch(setMantenedorLoading({ key, loading: true }))
    dispatch(setMantenedorError({ key, error: null }))
    try {
      const controller = core.createController('mantenedor')
      const raw: any = await controller.get('mantenedorDashboard')
      // Backend pode retornar array direto OR um wrapper { content/data/items: [...] }
      // Interceptor do SGM-OS já desembrulha res.data.content, mas em alguns
      // ambientes (tests, NullCoreService) podemos receber outras shapes.
      const list: MantenedorOption[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.content)
        ? raw.content
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.items)
        ? raw.items
        : []
      if (typeof window !== 'undefined' && (window as any).__DEV__ !== false) {
        // eslint-disable-next-line no-console
        console.debug(
          `[MantenedorPickerVM] refresh key="${key}" → ${list.length} options`,
          { rawType: Array.isArray(raw) ? 'array' : typeof raw }
        )
      }
      dispatch(setMantenedorOptions({ key, options: list }))
    } catch (e: any) {
      if (typeof window !== 'undefined' && (window as any).__DEV__ !== false) {
        // eslint-disable-next-line no-console
        console.error('[MantenedorPickerVM] refresh failed', e)
      }
      dispatch(
        setMantenedorError({ key, error: e?.message ?? 'fetch error' })
      )
    } finally {
      dispatch(setMantenedorLoading({ key, loading: false }))
    }
  }, [dispatch, key, core])

  // Auto-fetch on mount and whenever the entity key changes. Depende apenas
  // de `key` para evitar loops causados por novas referências de `refresh`
  // (core/dispatch podem mudar de identidade entre renders).
  // Teste manual: navegar /os/form, abrir tab "Manutentores" → console deve
  // exibir "[MantenedorPickerVM] refresh key=..." e a lista popula ao clicar
  // no input.
  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const search = useCallback(
    (term: string) => {
      dispatch(setMantenedorSearchTerm({ key, term }))
    },
    [dispatch, key]
  )

  const requestSelect = useCallback(
    (
      item: MantenedorOption,
      currentOsId?: number | string | null
    ): 'confirm' | 'immediate' => {
      if (item._busy && item.osId != null && item.osId !== currentOsId) {
        dispatch(setMantenedorPendingConfirm({ key, item }))
        return 'confirm'
      }
      return 'immediate'
    },
    [dispatch, key]
  )

  const confirmSelect = useCallback((): MantenedorOption | null => {
    const item = pendingConfirm
    dispatch(setMantenedorPendingConfirm({ key, item: null }))
    return item
  }, [dispatch, key, pendingConfirm])

  const cancelConfirm = useCallback(() => {
    dispatch(setMantenedorPendingConfirm({ key, item: null }))
  }, [dispatch, key])

  const reset = useCallback(() => {
    dispatch(clearMantenedorSlot({ key }))
  }, [dispatch, key])

  const filteredOptions = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return [...options]
      .filter((o) =>
        (o.nomeUsuario ?? '').toLowerCase().includes(term)
      )
      .sort((a, b) =>
        (a.nomeUsuario ?? '')
          .toLowerCase()
          .localeCompare((b.nomeUsuario ?? '').toLowerCase())
      )
  }, [options, searchTerm])

  return useMemo<IMantenedorPickerViewModel>(
    () => ({
      options,
      filteredOptions,
      searchTerm,
      isLoading,
      error,
      pendingConfirm,
      search,
      refresh,
      requestSelect,
      confirmSelect,
      cancelConfirm,
      reset,
    }),
    [
      options,
      filteredOptions,
      searchTerm,
      isLoading,
      error,
      pendingConfirm,
      search,
      refresh,
      requestSelect,
      confirmSelect,
      cancelConfirm,
      reset,
    ]
  )
}
