import React from "react";
import "../styles/BonusButton.css";
export interface BonusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Condição para renderizar o botão */
    renderCondition?: boolean;
    /** Callback chamando ao clicar */
    onClickCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Texto do botão */
    label: string;
}
/**
 * Botão chamativo com animação de 'glow'. usado para ações de destaque.
 */
export declare const BonusButton: React.FC<BonusButtonProps>;
export default BonusButton;
