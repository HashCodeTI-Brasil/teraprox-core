import React from 'react'
import { FormModal } from '@teraprox/ui-kit-core'
import { UnidadeMaterialForm } from 'teraprox-ui-kit'
import type {
  IUnidadeMaterialViewModel,
  UnidadeMaterialValue,
} from 'teraprox-core-sdk'

/**
 * UnidadeMaterialModal — modal composto para adicionar/editar uma
 * composição Unidade-Material de uma tarefa.
 *
 * Consome a Port `IUnidadeMaterialViewModel` (core-sdk). Nao acessa
 * Redux/useSelector/useDispatch/useCoreService diretamente — toda a
 * lógica de estado vive no adapter hexagonal.
 *
 * Wave 1 fase 2 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */

export interface UnidadeMaterialModalProps {
  show: boolean
  onClose: () => void
  onConfirmed: (dto: UnidadeMaterialValue) => void | Promise<void>
  vm: IUnidadeMaterialViewModel
  title?: string
  primaryLabel?: string
}

export const UnidadeMaterialModal: React.FC<UnidadeMaterialModalProps> = ({
  show,
  onClose,
  onConfirmed,
  vm,
  title,
  primaryLabel,
}) => {
  const handleConfirm = async () => {
    try {
      const dto = await vm.submit()
      await onConfirmed(dto)
      vm.reset()
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[UnidadeMaterialModal] submit failed', err)
    }
  }

  return (
    <FormModal
      show={show}
      onClose={onClose}
      title={title ?? 'Adicionar Material'}
      size="md"
      isValid={vm.isValid}
      isLoading={vm.isSubmitting}
      primaryAction={{
        label: primaryLabel ?? 'Adicionar',
        onClick: handleConfirm,
      }}
      secondaryAction={{ label: 'Cancelar', onClick: onClose }}
    >
      <UnidadeMaterialForm
        value={vm.value as any}
        onMaterialSelected={vm.onMaterialSelected}
        onQuantidadeUpdate={vm.onQuantidadeUpdate}
        onUnidadeSelected={vm.onUnidadeSelected}
        loadMaterialsFunc={vm.loadMaterials}
        loadUnidadesFunc={vm.loadUnidades}
      />
    </FormModal>
  )
}

export default UnidadeMaterialModal
