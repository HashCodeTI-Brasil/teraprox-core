import React from "react";
import "../styles/SwitchOnClick.css";
export interface SwitchOnClickProps {
    /** Conteúdo exibido quando clicado. Recebe objeto com handleClose para fechar internamente. */
    children: (props: {
        handleClose: () => void;
    }) => React.ReactNode;
    /** Elemento exibido antes do clique (padrão: ícone de Adicionar) */
    placeHolder?: React.ReactNode;
    /** Callback chamado ao clicar no placeholder */
    onSwitchClick?: () => void;
    /** Callback chamado ao cancelar/fechar */
    onCancel?: () => void;
    /** Classe CSS adicional para o container */
    containerClassName?: string;
}
/**
 * Componente que alterna entre um Placeholder (ex: botão de adicionar)
 * e um formulário/conteúdo detalhado.
 */
export declare const SwitchOnClick: React.FC<SwitchOnClickProps>;
export default SwitchOnClick;
