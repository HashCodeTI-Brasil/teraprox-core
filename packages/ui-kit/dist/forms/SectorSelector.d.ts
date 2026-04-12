import React from "react";
import "../styles/SectorSelector.css";
export interface Sector {
    id: string | number;
    nome: string;
}
export interface SectorSelectorProps {
    /** Lista de setores a serem exibidos */
    setores: Sector[];
    /** Callback quando um setor é selecionado */
    onSectorSelect: (setor: Sector) => void;
    /** Label exibido acima do seletor */
    selectionLabel?: string;
    /** Placeholder quando nada está selecionado */
    selectionPlaceholder?: string;
    /** Permite selecionar a opção "Todos" */
    allowAll?: boolean;
    /** Nome do setor selecionado por padrão/externamente */
    defaultSectorName?: string | false;
    /** Oculta o componente */
    hideComponent?: boolean;
}
/**
 * Seletor de setores customizado com dropdown estilizado.
 * Totalmente desacoplado do Redux/API; dados devem ser injetados via props.
 */
export declare const SectorSelector: React.FC<SectorSelectorProps>;
export default SectorSelector;
