import React, { useState, useRef } from "react"
import { Button, ButtonProps } from "react-bootstrap"
import { LoadingProgress } from "../progress/LoadingProgress"

/**
 * Hook customizado para gerenciar operações assíncronas internas ao botão.
 */
const useAsyncAction = () => {
	const [loading, setLoading] = useState(false)
	const isMounted = useRef(true)
	const isProcessing = useRef(false)

	const execute = async (action: () => Promise<void> | void) => {
		if (typeof action !== "function") {
			throw new Error("Ação inválida: não é uma função")
		}
		if (!action || isProcessing.current) return

		isProcessing.current = true
		setLoading(true)

		try {
			await action()
		} catch (error) {
			console.error("Async operation failed:", error)
		} finally {
			if (isMounted.current) {
				setLoading(false)
				isProcessing.current = false
			}
		}
	}

	return { loading, execute }
}

export interface AsyncButtonProps {
	/** Função assíncrona a ser executada no clique */
	onClick: () => Promise<void> | void
	/** Conteúdo do botão */
	children: React.ReactNode
	/** Componente de loading customizado (padrão: <LoadingProgress />) */
	loadingComponent?: React.ReactNode
	/** Props adicionais para o componente Button do react-bootstrap */
	buttonProps?: ButtonProps
}

/**
 * Componente de botão para operações assíncronas com tratamento interno de estado.
 */
export const AsyncButton: React.FC<AsyncButtonProps> = ({
	onClick,
	children,
	loadingComponent = <LoadingProgress />,
	buttonProps,
}) => {
	const { loading, execute } = useAsyncAction()

	return (
		<Button
			{...buttonProps}
			onClick={() => execute(onClick)}
			disabled={loading || (buttonProps && buttonProps.disabled)}
		>
			{loading ? loadingComponent : children}
		</Button>
	)
}

export default AsyncButton
