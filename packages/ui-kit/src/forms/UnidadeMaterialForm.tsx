import React from "react"
import { Button } from "react-bootstrap"
import { AutoComplete } from "./AutoComplete"
import { FormField } from "./FormField"

export interface UnidadeMaterialValue {
  material?: { id: string | number; nome: string } | null
  quantidade?: number | string
  unidade?: { id: string | number; nome: string } | null
}

export interface UnidadeMaterialFormProps {
  /** Valor atual da composição Unidade-Material */
  value: UnidadeMaterialValue
  /** Calback quando o material é selecionado */
  onMaterialSelected: (material: any) => void
  /** Callback quando a quantidade é alterada */
  onQuantidadeUpdate: (qtd: string) => void
  /** Callback quando a unidade de medida é selecionada */
  onUnidadeSelected: (unidade: any) => void
  /** Callback para o botão 'Novo Material' */
  onNavigateToCreateMaterial?: () => void
  /** Callback para o botão 'Nova Unidade' */
  onNavigateToCreateUnidade?: () => void
  /** Função que retorna a Promise de carregamento de materiais */
  loadMaterialsFunc: () => Promise<any[]>
  /** Função que retorna a Promise de carregamento de unidades */
  loadUnidadesFunc: () => Promise<any[]>
  /** Label para o campo de Material (padrão: Materia Prima) */
  materialLabel?: string
  /** Oculta campos específicos se necessário */
  hideMaterial?: boolean
  hideQuantidade?: boolean
  hideUnidade?: boolean
  /** Classe CSS customizada */
  className?: string
}

/**
 * Componente de formulário para associação de Materiais e Unidades com quantidades.
 * Agnóstico ao Redux; deve ser controlado pelo componente pai.
 */
export const UnidadeMaterialForm: React.FC<UnidadeMaterialFormProps> = ({
  value,
  onMaterialSelected,
  onQuantidadeUpdate,
  onUnidadeSelected,
  onNavigateToCreateMaterial,
  onNavigateToCreateUnidade,
  loadMaterialsFunc,
  loadUnidadesFunc,
  materialLabel = "Materia Prima",
  hideMaterial = false,
  hideQuantidade = false,
  hideUnidade = false,
  className = ""
}) => {

  const renderNewMaterialButton = () => (
    <Button onClick={onNavigateToCreateMaterial} size="sm" variant="outline-primary">
      Novo Material
    </Button>
  )

  const renderNewUnidadeButton = () => (
    <Button onClick={onNavigateToCreateUnidade} size="sm" variant="outline-primary">
      Nova Unidade
    </Button>
  )

  return (
    <div className={`unidade-material-form ${className}`}>
      {!hideMaterial && (
        <AutoComplete
          displayKey={"nome"}
          value={value?.material?.nome || ""}
          loadCondition={true}
          title={materialLabel}
          loadFunc={loadMaterialsFunc}
          onSelectedClick={onMaterialSelected}
          actionButton={onNavigateToCreateMaterial ? renderNewMaterialButton : undefined}
        />
      )}

      {!hideQuantidade && (
        <FormField
          label={"Quantidade"}
          val={value?.quantidade ?? ""}
          onValueUpdate={onQuantidadeUpdate}
          ty={"number"}
        />
      )}

      {!hideUnidade && (
        <AutoComplete
          displayKey={"nome"}
          value={value?.unidade?.nome || ""}
          loadCondition={true}
          title={"Unidade"}
          loadFunc={loadUnidadesFunc}
          onSelectedClick={onUnidadeSelected}
          actionButton={onNavigateToCreateUnidade ? renderNewUnidadeButton : undefined}
        />
      )}
    </div>
  )
}

export default UnidadeMaterialForm
