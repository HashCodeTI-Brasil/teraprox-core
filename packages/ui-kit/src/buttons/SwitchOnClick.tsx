import React, { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { GrAddCircle } from 'react-icons/gr'
import "../styles/SwitchOnClick.css"

export interface SwitchOnClickProps {
	/** Conteúdo exibido quando clicado. Recebe objeto com handleClose para fechar internamente. */
	children: (props: { handleClose: () => void }) => React.ReactNode
	/** Elemento exibido antes do clique (padrão: ícone de Adicionar) */
	placeHolder?: React.ReactNode
	/** Callback chamado ao clicar no placeholder */
	onSwitchClick?: () => void
	/** Callback chamado ao cancelar/fechar */
	onCancel?: () => void
	/** Classe CSS adicional para o container */
	containerClassName?: string
}

/**
 * Componente que alterna entre um Placeholder (ex: botão de adicionar)
 * e um formulário/conteúdo detalhado.
 */
export const SwitchOnClick: React.FC<SwitchOnClickProps> = ({
	children,
	placeHolder = (
		<div
			className="text-center zoom-container"
			style={{
				fontSize: "1.2rem",
				color: "#666",
			}}
		>
			<GrAddCircle
				size={25}
				className="mb-2"
				style={{ cursor: "pointer" }}
			/>
		</div>
	),
	onSwitchClick,
	onCancel,
	containerClassName = ""
}) => {
	const [clicked, setClicked] = useState(false)

	const handleClick = () => {
		onSwitchClick && onSwitchClick()
		setClicked(!clicked)
	}

	const handleClose = () => {
		setClicked(false)
		onCancel && onCancel()
	}

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose()
			}
		}

		window.addEventListener("keydown", handleEscape)
		return () => window.removeEventListener("keydown", handleEscape)
	}, [])

	if (!clicked) {
		return <div onClick={handleClick} style={{ cursor: 'pointer' }}>{placeHolder}</div>
	}

	return (
		<div className={`switch-on-click-container ${containerClassName}`}>
			<div className="close-icon" onClick={handleClose}>
				<FaTimes title="Fechar" />
			</div>
			{children({ handleClose })}
		</div>
	)
}

export default SwitchOnClick
