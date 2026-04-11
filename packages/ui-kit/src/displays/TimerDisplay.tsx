import React from "react"
import dayjs from "dayjs"
import duration from 'dayjs/plugin/duration'
import { BiTimer } from "react-icons/bi"
import { BsPause, BsPlay } from "react-icons/bs"
import "../styles/timerDisplay.css"

dayjs.extend(duration)

export interface TimerDisplayProps {
	/** ID único do timer ou da entidade relacionada */
	id?: string | number
	/** Tempo atual em segundos */
	tempo?: number
	/** Se o timer já foi encerrado definitivamente */
	isStopped?: boolean
	/** Exibe o botão de pausa */
	pausable?: boolean
	/** Exibe o botão de play */
	playable?: boolean
	/** Se falso, exibe um placeholder de visualização (ex: - : - : -) */
	enableView?: boolean
	/** Callback chamado ao clicar em pausar */
	onPause?: (id: string | number) => void
	/** Callback chamado ao clicar em iniciar/continuar */
	onPlay?: (id: string | number) => void
	/** Label customizado para quando o timer não foi iniciado */
	emptyMessage?: string
}

/**
 * Componente visual para exibição e controle básico de timers.
 * Mantém-se agnóstico à lógica de persistência e notificações do host.
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({
	id,
	tempo = 0,
	isStopped = false,
	pausable = false,
	playable = false,
	enableView = true,
	onPause,
	onPlay,
	emptyMessage = "Timer ainda não iniciado."
}) => {

	const handlePause = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (id && onPause) onPause(id)
	}

	const handlePlay = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (id && onPlay) onPlay(id)
	}

	const formatDuration = (seconds: number) => {
		if (!enableView) return "- : - : -";
		const time = dayjs.duration(seconds, "seconds");
		const days = Math.floor(time.asDays());
		const hours = time.hours().toString().padStart(2, "0");
		const minutes = time.minutes().toString().padStart(2, "0");
		const secondsRemaining = time.seconds().toString().padStart(2, "0");
	  
		return days > 0 
		  ? `${days}d ${hours}:${minutes}:${secondsRemaining}` 
		  : `${hours}:${minutes}:${secondsRemaining}`;
	};

	return (
		<div className="timer-display-container">
			<div className="timer-display-content">
				{id ? (
					<>
						<BiTimer
							size={24}
							className="timer-icon"
							title="Timer"
						/>
						{pausable && !isStopped && (
							<BsPause
								size={20}
								className="timer-icon-action"
								onClick={handlePause}
								title="Pausar"
							/>
						)}
						{playable && !isStopped && (
							<BsPlay
								size={20}
								className="timer-icon-action"
								onClick={handlePlay}
								title="Iniciar"
							/>
						)}
						<span className="timer-display-time">
							{formatDuration(tempo)}
						</span>
					</>
				) : (
					<span className="timer-display-message">
						{emptyMessage}
					</span>
				)}
			</div>
		</div>
	)
}

export default TimerDisplay
