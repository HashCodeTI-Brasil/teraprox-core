import React from "react";
export interface UnidadeMaterialValue {
    material?: {
        id: string | number;
        nome: string;
    } | null;
    quantidade?: number | string;
    unidade?: {
        id: string | number;
        nome: string;
    } | null;
}
export interface UnidadeMaterialFormProps {
    /** Valor atual da composição Unidade-Material */
    value: UnidadeMaterialValue;
    /** Calback quando o material é selecionado */
    onMaterialSelected: (material: any) => void;
    /** Callback quando a quantidade é alterada */
    onQuantidadeUpdate: (qtd: string) => void;
    /** Callback quando a unidade de medida é selecionada */
    onUnidadeSelected: (unidade: any) => void;
    /** Callback para o botão 'Novo Material' */
    onNavigateToCreateMaterial?: () => void;
    /** Callback para o botão 'Nova Unidade' */
    onNavigateToCreateUnidade?: () => void;
    /** Função que retorna a Promise de carregamento de materiais */
    loadMaterialsFunc: () => Promise<any[]>;
    /** Função que retorna a Promise de carregamento de unidades */
    loadUnidadesFunc: () => Promise<any[]>;
    /** Label para o campo de Material (padrão: Materia Prima) */
    materialLabel?: string;
    /** Oculta campos específicos se necessário */
    hideMaterial?: boolean;
    hideQuantidade?: boolean;
    hideUnidade?: boolean;
    /** Classe CSS customizada */
    className?: string;
}
/**
 * Componente de formulário para associação de Materiais e Unidades com quantidades.
 * Agnóstico ao Redux; deve ser controlado pelo componente pai.
 */
export declare const UnidadeMaterialForm: React.FC<UnidadeMaterialFormProps>;
export default UnidadeMaterialForm;
