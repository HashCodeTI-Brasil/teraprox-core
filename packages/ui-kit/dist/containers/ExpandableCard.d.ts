import React from "react";
import "../styles/ExpandableCard.css";
export interface ExpandableCardItemObject {
    content: React.ReactNode;
    label?: React.ReactNode;
    clickable?: boolean;
}
export type ExpandableCardItem = string | React.ReactNode | ExpandableCardItemObject;
export interface ExpandableCardProps {
    /** Lista de itens a serem exibidos. Pode ser string, Nodo ou Objeto estruturado */
    items: ExpandableCardItem[];
    /** Quantidade inicial de itens visíveis (padrão: 3) */
    initialVisibleCount?: number;
    /** Habilita a funcionalidade de expansão */
    expandable?: boolean;
    /** Conteúdo para a lateral esquerda */
    leftSideContent?: React.ReactNode;
    /** Conteúdo para a lateral direita */
    rightSideContent?: React.ReactNode;
    /** Classe CSS para o Card */
    cardClassName?: string;
    /** Classe CSS para o Body */
    cardBodyClassName?: string;
    /** Estilo CSS para o Body */
    cardBodyStyle?: React.CSSProperties;
    /** Detecta modo Mobile para layout empilhado */
    isMobile?: boolean;
}
/**
 * Card expansível com suporte a listagem parcial de itens e conteúdos laterais.
 * Layout otimizado para visualização de densidade variável.
 */
export declare const ExpandableCard: React.FC<ExpandableCardProps>;
export default ExpandableCard;
