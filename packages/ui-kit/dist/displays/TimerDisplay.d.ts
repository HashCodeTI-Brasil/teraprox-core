import React from "react";
import "../styles/timerDisplay.css";
export interface TimerDisplayProps {
    /** ID único do timer ou da entidade relacionada */
    id?: string | number;
    /** Tempo atual em segundos */
    tempo?: number;
    /** Se o timer já foi encerrado definitivamente */
    isStopped?: boolean;
    /** Exibe o botão de pausa */
    pausable?: boolean;
    /** Exibe o botão de play */
    playable?: boolean;
    /** Se falso, exibe um placeholder de visualização (ex: - : - : -) */
    enableView?: boolean;
    /** Callback chamado ao clicar em pausar */
    onPause?: (id: string | number) => void;
    /** Callback chamado ao clicar em iniciar/continuar */
    onPlay?: (id: string | number) => void;
    /** Label customizado para quando o timer não foi iniciado */
    emptyMessage?: string;
}
/**
 * Componente visual para exibição e controle básico de timers.
 * Mantém-se agnóstico à lógica de persistência e notificações do host.
 */
export declare const TimerDisplay: React.FC<TimerDisplayProps>;
export default TimerDisplay;
