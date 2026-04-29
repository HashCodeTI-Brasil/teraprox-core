import React from 'react'
import { FormModal } from '@teraprox/ui-kit-core'
import { AutoComplete } from 'teraprox-ui-kit'
import type {
  IInspecaoModalViewModel,
  InspecaoValue,
} from 'teraprox-core-sdk'

/**
 * InspecaoModal — modal composto para adicionar/editar uma Inspecao
 * de uma Tarefa. Consome a Port `IInspecaoModalViewModel` (core-sdk).
 *
 * A UI nao acessa Redux/useSelector/useDispatch diretamente. Os dados
 * externos (listas, componente de limites) sao injetados via props —
 * o caller e responsavel por carregar `tiposDeDado` e `parametrosOps`
 * e por fornecer o `renderLimitesDeControle` (que vive em SGM-OS).
 *
 * Wave 1 fase 2 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */

export interface InspecaoModalProps {
  show: boolean
  onClose: () => void
  onConfirmed: (dto: InspecaoValue) => void | Promise<void>
  vm: IInspecaoModalViewModel
  title?: string
  primaryLabel?: string
  /** Lista de tipos de dado para o AutoComplete (ex: tiposDeCampo filtrado) */
  tiposDeDado: Array<{ nome: string; type?: string }>
  /** Lista de parametros pre-cadastrados (carregados pelo caller via useEffect) */
  parametrosOps: Array<{
    nome: string
    labelUnidade?: string
    id?: string
    [k: string]: any
  }>
  /** Callback para carregar unidades sob demanda */
  loadUnidadesFunc: () => Promise<any[]>
  /**
   * Componente de Limites de Controle (LimiteDeControlePicker) — o caller
   * injeta porque vive em SGM-OS. Opcional. So renderiza se tipo ===
   * 'Numerico' ou 'Numérico'.
   */
  renderLimitesDeControle?: (vm: IInspecaoModalViewModel) => React.ReactNode
  /** Opcional — expoe trigger para selecao de parametro existente */
  onOpenParametrosPicker?: () => void
}

export const InspecaoModal: React.FC<InspecaoModalProps> = ({
  show,
  onClose,
  onConfirmed,
  vm,
  title,
  primaryLabel,
  tiposDeDado,
  parametrosOps,
  loadUnidadesFunc,
  renderLimitesDeControle,
}) => {
  const handleConfirm = async () => {
    try {
      const dto = await vm.submit()
      await onConfirmed(dto)
      vm.reset()
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[InspecaoModal] submit failed', err)
    }
  }

  const tipo = vm.value?.tipo
  const showLimites =
    (tipo === 'Numerico' || tipo === 'Numérico') && !!renderLimitesDeControle

  return (
    <FormModal
      show={show}
      onClose={onClose}
      title={title ?? 'Adicionar Inspeção'}
      size="lg"
      isValid={vm.isValid}
      isLoading={vm.isSubmitting}
      primaryAction={{
        label: primaryLabel ?? 'Adicionar',
        onClick: handleConfirm,
      }}
      secondaryAction={{ label: 'Cancelar', onClick: onClose }}
    >
      <AutoComplete
        ops={tiposDeDado}
        displayKey="nome"
        title="Tipo de dado"
        value={vm.value?.tipo ?? ''}
        onSelectedClick={(op: any) => vm.onTipoDeDado(op?.nome ?? '')}
      />

      <AutoComplete
        loadCondition
        ops={parametrosOps}
        title="Parâmetro"
        value={vm.value?.nomeParametro ?? ''}
        displayKeys={['nome', 'labelUnidade']}
        onValueChanged={(v: string) => vm.onNomeParametro(v)}
        onSelectedClick={(p: any) => vm.onParametroSelected(p)}
      />

      <AutoComplete
        loadCondition
        loadFunc={loadUnidadesFunc}
        title="Unidade"
        value={vm.value?.unidadeParametro ?? ''}
        displayKeys={['nome', 'label']}
        onSelectedClick={(u: any) =>
          vm.onUnidadeParametro(u?.label ?? u?.nome ?? '')
        }
      />

      {showLimites ? renderLimitesDeControle!(vm) : null}
    </FormModal>
  )
}

export default InspecaoModal
