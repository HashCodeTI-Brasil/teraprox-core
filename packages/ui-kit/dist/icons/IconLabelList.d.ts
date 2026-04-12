import React from "react";
import "../styles/IconLabelList.css";
export interface IconLabelListItem {
    /** Ícone para o item */
    icon: React.ReactNode;
    /** Label para o item */
    label: React.ReactNode;
    /** Callback de clique opcional para este item específico */
    onClick?: () => void;
}
export interface IconLabelListProps {
    /** Lista de itens a serem exibidos */
    items: IconLabelListItem[];
    /** Classe CSS adicional para o container da lista */
    className?: string;
}
/**
 * Lista horizontal de ícones com labels.
 */
export declare const IconLabelList: React.FC<IconLabelListProps>;
export default IconLabelList;
