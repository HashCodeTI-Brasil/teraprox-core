import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttpController } from '../hooks/useHttpController'
import { useToast } from '../hooks/useToast'
import type {
  IUnidadeMaterialViewModel,
  UnidadeMaterialRef,
  UnidadeMaterialValue,
  ValidationResult,
} from './IUnidadeMaterialViewModel'
import {
  clearUnidadeMaterial,
  populateUnidadeMaterial,
  selectUnidadeMaterial,
  setMaterial,
  setQuantidade,
  setUnidade,
} from './unidadeMaterialSlice'

/**
 * Validacao sincrona — mesma regra do SGM-OS
 * Services/default/validations.js#validarUnidadeMaterial.
 */
function runValidate(value: UnidadeMaterialValue): ValidationResult {
  const errors: Record<string, string> = {}

  if (!value?.material) {
    errors.material = 'O material é obrigatório.'
  }

  if (!value?.unidade) {
    errors.unidade = 'A unidade é obrigatória.'
  }

  const qtd = value?.quantidade
  const qtdNum = typeof qtd === 'number' ? qtd : Number(qtd)
  if (qtd === '' || qtd === null || qtd === undefined || isNaN(qtdNum) || qtdNum <= 0) {
    errors.quantidade = 'A quantidade deve ser um número maior que zero.'
  }

  return { ok: Object.keys(errors).length === 0, errors }
}

/**
 * Adapter Redux que implementa IUnidadeMaterialViewModel.
 *
 * Consome useHttpController('material') e useHttpController('unidade')
 * para expor loadMaterials/loadUnidades.
 *
 * Estado lido do slice 'unidadeMaterial' (ver unidadeMaterialSlice.ts),
 * parametrizado por tarefaId para suportar multiplas composicoes simultaneas
 * (ex: varias tarefas no mesmo form de Ordem de Servico).
 *
 * isSubmitting vive em useState local — estado transiente do modal,
 * nao precisa ir para Redux.
 */
export function useUnidadeMaterialViewModel(
  tarefaId?: string | number
): IUnidadeMaterialViewModel {
  const dispatch = useDispatch()
  const toast = useToast()

  const materialCtrl = useHttpController('material')
  const unidadeCtrl = useHttpController('unidade')
  const tarefaUnidadeMaterialCtrl = useHttpController('tarefaUnidadeMaterial')

  const value = useSelector((state: any) =>
    selectUnidadeMaterial(state, tarefaId)
  ) as UnidadeMaterialValue

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onMaterialSelected = useCallback(
    (material: UnidadeMaterialRef) => {
      dispatch(setMaterial({ tarefaId, value: material ?? null }))
    },
    [dispatch, tarefaId]
  )

  const onQuantidadeUpdate = useCallback(
    (qtd: string) => {
      dispatch(setQuantidade({ tarefaId, value: qtd }))
    },
    [dispatch, tarefaId]
  )

  const onUnidadeSelected = useCallback(
    (unidade: UnidadeMaterialRef) => {
      dispatch(setUnidade({ tarefaId, value: unidade ?? null }))
    },
    [dispatch, tarefaId]
  )

  const loadMaterials = useCallback(async (): Promise<any[]> => {
    const res = await materialCtrl.readAll()
    return Array.isArray(res) ? res : res?.data ?? []
  }, [materialCtrl])

  const loadUnidades = useCallback(async (): Promise<any[]> => {
    const res = await unidadeCtrl.readAll()
    return Array.isArray(res) ? res : res?.data ?? []
  }, [unidadeCtrl])

  const clear = useCallback(() => {
    dispatch(clearUnidadeMaterial({ tarefaId }))
  }, [dispatch, tarefaId])

  const populate = useCallback(
    (next: UnidadeMaterialValue) => {
      dispatch(populateUnidadeMaterial({ tarefaId, value: next }))
    },
    [dispatch, tarefaId]
  )

  const validate = useCallback((): ValidationResult => {
    return runValidate(value)
  }, [value])

  const reset = useCallback(() => {
    dispatch(clearUnidadeMaterial({ tarefaId }))
  }, [dispatch, tarefaId])

  const submit = useCallback(async (): Promise<UnidadeMaterialValue> => {
    setIsSubmitting(true)
    try {
      const result = runValidate(value)
      if (!result.ok) {
        const firstErr = Object.values(result.errors)[0] ?? 'Dados invalidos.'
        throw new Error(firstErr)
      }
      return value
    } finally {
      setIsSubmitting(false)
    }
  }, [value])

  const updateQuantidade = useCallback(
    async (tumId: string | number, quantidade: number): Promise<void> => {
      try {
        const body: { quantidade: number; tarefaId?: string | number } = {
          quantidade,
        }
        if (tarefaId !== undefined && tarefaId !== null) {
          body.tarefaId = tarefaId
        }
        await tarefaUnidadeMaterialCtrl.put(String(tumId), body)
      } catch (err: any) {
        const msg =
          err?.message ||
          'Nao foi possivel atualizar a quantidade do material.'
        try {
          toast.warning(msg)
        } catch {
          // toast indisponivel — silencia
        }
        throw err
      }
    },
    [tarefaUnidadeMaterialCtrl, tarefaId, toast]
  )

  const isValid = useMemo(() => runValidate(value).ok, [value])

  return useMemo<IUnidadeMaterialViewModel>(
    () => ({
      value,
      isValid,
      isSubmitting,
      onMaterialSelected,
      onQuantidadeUpdate,
      onUnidadeSelected,
      loadMaterials,
      loadUnidades,
      clear,
      populate,
      validate,
      submit,
      reset,
      updateQuantidade,
    }),
    [
      value,
      isValid,
      isSubmitting,
      onMaterialSelected,
      onQuantidadeUpdate,
      onUnidadeSelected,
      loadMaterials,
      loadUnidades,
      clear,
      populate,
      validate,
      submit,
      reset,
      updateQuantidade,
    ]
  )
}
