import React from "react";
export interface IconLabelItemProps {
    /** Ícone a ser exibido (ex: vindo de react-icons) */
    icon: React.ReactNode;
    /** Texto/Label associado ao ícone */
    label: React.ReactNode;
    /** Classe CSS para o container principal */
    containerClassName?: string;
    /** Classe CSS para o label */
    labelClassName?: string;
    /** Callback de clique */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Estilo CSS opcional para o container */
    style?: React.CSSProperties;
}
/**
 * Componente que agrupa um ícone e um label.
 */
export declare const IconLabelItem: React.FC<IconLabelItemProps>;
export default IconLabelItem;
