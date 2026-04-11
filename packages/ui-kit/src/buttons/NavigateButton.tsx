import React from "react"
import { Button, ButtonProps } from "react-bootstrap"

export interface NavigateButtonProps extends ButtonProps {
	/** Nome exibido no botão */
	displayName: React.ReactNode
	/** Caminho para navegação */
	path: string
	/** Configurações extras de navegação */
	config?: any
	/** Nome da página para rastreamento/contexto */
	pageName?: string
	/** Função de navegação (ex: vinda do useNavigator ou useNavigate) */
	navigator: (path: string, config?: any, pageName?: string) => void
	/** Callback opcional antes de mudar de página */
	onBeforeNavigate?: () => void
}

/**
 * Botão de navegação agnóstico. 
 * Requer que a função de navegação seja passada via props.
 */
export const NavigateButton: React.FC<NavigateButtonProps> = ({
	displayName,
	path,
	config,
	pageName,
	navigator,
	onBeforeNavigate,
	variant = "outline-primary",
	style,
	...props
}) => {
	const handleClick = () => {
		if (onBeforeNavigate) {
			onBeforeNavigate()
		}
		navigator(path, config, pageName)
	}

	return (
		<Button
			style={style}
			variant={variant}
			onClick={handleClick}
			{...props}
		>
			{displayName}
		</Button>
	)
}

export default NavigateButton
