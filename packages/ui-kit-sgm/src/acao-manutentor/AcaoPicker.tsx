// @ts-nocheck
import React from 'react'
import { Button } from 'react-bootstrap'
import { AutoComplete } from 'teraprox-ui-kit'

/**
 * AcaoPicker (ui-kit-sgm) — Wave 2C migration.
 *
 * Widget puramente visual: lista de ações carregada via prop `loadAcoes`,
 * seleção comunicada via `onSelect` e callback `onNovaAcao` para o botão
 * de ação alternativa. Sem Redux, sem useCoreService, sem useNavigator.
 *
 * O consumidor em SGM-OS mantém o HOC `withGenericPicker` + o reducer de
 * ação — apenas embrulha este componente passando `acao`, `onSelect`
 * (dispatch de setAcaoPicked), `loadAcoes` (controller('acao').readAll)
 * e `onNovaAcao` (navigate(paths.acaoForm)).
 */

export interface AcaoRef {
  id?: string | number
  nome?: string
  [key: string]: any
}

export interface AcaoPickerProps {
  /** Ação atualmente selecionada (mostra no campo) */
  acao?: AcaoRef | null
  /** Chamado quando usuário seleciona uma ação no AutoComplete */
  onSelect: (selected: AcaoRef) => void
  /** Carrega a lista de ações (ex.: controller('acao').readAll() no consumer) */
  loadAcoes: () => Promise<AcaoRef[]>
  /** Chamado quando usuário clica no botão "Nova Ação" (ex.: navegar para form) */
  onNovaAcao?: () => void
  /** Habilita/desabilita o fetch do AutoComplete */
  loadCondition?: boolean
  /** Rótulo customizável (default: "Acao") */
  title?: string
}

export const AcaoPicker: React.FC<AcaoPickerProps> = ({
  acao,
  onSelect,
  loadAcoes,
  onNovaAcao,
  loadCondition = true,
  title = 'Acao',
}) => {
  return (
    <AutoComplete
      title={title}
      displayKey={'nome'}
      value={acao?.nome}
      onSelectedClick={(selected: AcaoRef) => onSelect(selected)}
      actionButton={
        onNovaAcao
          ? () => <Button onClick={onNovaAcao}>Nova Ação</Button>
          : undefined
      }
      loadCondition={loadCondition}
      loadFunc={loadAcoes}
    />
  )
}

export default AcaoPicker
