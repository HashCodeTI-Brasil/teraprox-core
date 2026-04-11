import React from "react"
import { Modal, Button, ModalProps } from "react-bootstrap"

export interface ModalBasicTemplateProps {
	/** Se o modal deve ser exibido */
	show: boolean
	/** Callback para fechar o modal */
	closeFunc: () => void
	/** Conteúdo do Body (React Node ou Função que retorna Node) */
	body: React.ReactNode | (() => React.ReactNode)
	/** Conteúdo do Header (opcional) */
	header?: React.ReactNode | (() => React.ReactNode)
	/** Conteúdo do Footer (opcional) */
	footer?: React.ReactNode | (() => React.ReactNode)
	/** Props adicionais para o componente Modal do Bootstrap */
	props?: ModalProps & { bodyStyle?: React.CSSProperties; dialogStyle?: React.CSSProperties }
}

/**
 * Template base flexível para criação de modais consistentes.
 */
export const ModalBasicTemplate: React.FC<ModalBasicTemplateProps> = ({
	show,
	closeFunc,
	body,
	header,
	footer,
	props = {},
}) => {
	const { bodyStyle, dialogStyle, ...modalProps } = props

	const renderPart = (part: any) => {
		if (typeof part === "function") return part()
		return part
	}

	return (
		<Modal
			show={show}
			onHide={closeFunc}
			centered
			style={dialogStyle}
			{...modalProps}
		>
			{header && (
				<Modal.Header closeButton>
					<Modal.Title>{renderPart(header)}</Modal.Title>
				</Modal.Header>
			)}

			<Modal.Body style={bodyStyle}>
				{renderPart(body)}
			</Modal.Body>

			{footer && (
				<Modal.Footer>
					{renderPart(footer)}
					{!footer && (
						<Button variant="secondary" onClick={closeFunc}>
							Fechar
						</Button>
					)}
				</Modal.Footer>
			)}
		</Modal>
	)
}

export default ModalBasicTemplate
