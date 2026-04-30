import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type {
  IPickMantenedorTipoViewModel,
  PickMantenedorOption,
  PickTipoDeOrdemOption,
} from './IPickMantenedorTipoViewModel'
import {
  PickMantenedorTipoSliceState,
  resetPickMantenedorTipo,
  setPickMantenedorTipoAssigning,
  setPickMantenedorTipoError,
  setPickMantenedorTipoLoading,
  setPickMantenedorTipoOptions,
} from './pickMantenedorTipoSlice'
import { useCoreService } from '../hooks/useCoreService'

const unwrapList = <T>(raw: unknown): T[] => {
  if (Array.isArray(raw)) return raw as T[]
  const r = raw as { content?: unknown; data?: unknown; items?: unknown } | null
  if (Array.isArray(r?.content)) return r!.content as T[]
  if (Array.isArray(r?.data)) return r!.data as T[]
  if (Array.isArray(r?.items)) return r!.items as T[]
  return []
}

export function usePickMantenedorTipoViewModel(): IPickMantenedorTipoViewModel {
  const dispatch = useDispatch()
  const core = useCoreService()

  const state = useSelector(
    (s: { pickMantenedorTipo?: PickMantenedorTipoSliceState }) =>
      s.pickMantenedorTipo
  )

  const mantenedores = state?.mantenedores ?? []
  const tiposDeOrdem = state?.tiposDeOrdem ?? []
  const loading = state?.loading ?? false
  const assigning = state?.assigning ?? false
  const error = state?.error ?? null

  const loadOptions = useCallback(async () => {
    dispatch(setPickMantenedorTipoLoading(true))
    dispatch(setPickMantenedorTipoError(null))
    try {
      const mantenedorCtl = core.createController('mantenedor')
      const tipoCtl = core.createController('tipoDeOrdem')
      const [mRaw, tRaw] = await Promise.all([
        mantenedorCtl.get('mantenedorDashboard'),
        tipoCtl.readAll(),
      ])
      const mantenedoresList = unwrapList<PickMantenedorOption>(mRaw)
      const tiposList = unwrapList<PickTipoDeOrdemOption>(tRaw)
      dispatch(
        setPickMantenedorTipoOptions({
          mantenedores: mantenedoresList,
          tiposDeOrdem: tiposList,
        })
      )
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'fetch error'
      dispatch(setPickMantenedorTipoError(msg))
    } finally {
      dispatch(setPickMantenedorTipoLoading(false))
    }
  }, [dispatch, core])

  const assignMantenedores = useCallback(
    async (osId: number | string, items: PickMantenedorOption[]) => {
      if (!items || items.length === 0) return
      dispatch(setPickMantenedorTipoAssigning(true))
      try {
        const ctl = core.createController('ordemDeServico')
        for (const m of items) {
          await ctl.post(`atribuirMantenedor/${osId}`, {
            mantenedorId: m.id,
            id: null,
            userId: m.userId,
          })
        }
      } finally {
        dispatch(setPickMantenedorTipoAssigning(false))
      }
    },
    [dispatch, core]
  )

  const assignTipo = useCallback(
    async (osId: number | string, tipoId: number | string) => {
      dispatch(setPickMantenedorTipoAssigning(true))
      try {
        const ctl = core.createController('ordemDeServico')
        await ctl.put(`updateTipoDeOrdem/${osId}`, { tipoOs: tipoId })
      } finally {
        dispatch(setPickMantenedorTipoAssigning(false))
      }
    },
    [dispatch, core]
  )

  const reset = useCallback(() => {
    dispatch(resetPickMantenedorTipo())
  }, [dispatch])

  return useMemo<IPickMantenedorTipoViewModel>(
    () => ({
      mantenedores,
      tiposDeOrdem,
      loading,
      assigning,
      error,
      loadOptions,
      assignMantenedores,
      assignTipo,
      reset,
    }),
    [mantenedores, tiposDeOrdem, loading, assigning, error, loadOptions, assignMantenedores, assignTipo, reset]
  )
}
