import React from "react"
import { Form, InputGroup } from "react-bootstrap"
import { TiDelete } from "react-icons/ti"

export interface CheckBoxOption {
	valor: string | number
	[key: string]: any
}

export interface CheckBoxProps {
	/** Lista de opções para renderizar */
	opcoes: CheckBoxOption[]
	/** Modo edição/hover para alteração de nomes */
	isHover?: boolean
	/** Modo 'criador' (novo item) */
	isCreator?: boolean
	/** Callback para atualizar valor (modo hover) */
	updateEvent?: (event: React.ChangeEvent<any>, index: number) => void
	/** Callback para deletar opção (modo hover) */
	deleteEvent?: () => void
	/** Callback para a tecla Enter (modo hover) */
	enterEvent?: (event: React.KeyboardEvent<any>, index: number, opcao: CheckBoxOption) => void
	/** Desabilita interação */
	disabled?: boolean
	/** Classe CSS customizada */
	className?: string
}

/**
 * Componente de CheckBox múltiplo com suporte a modo de edição dinâmica (hover).
 */
export const CheckBox: React.FC<CheckBoxProps> = ({
	opcoes,
	isHover = false,
	isCreator = false,
	updateEvent,
	deleteEvent,
	enterEvent,
	disabled = false,
	className = ""
}) => {
	if (isHover) {
		return (
			<div className={className}>
				{opcoes.map((opcao, index) => (
					<InputGroup key={index} style={{ padding: 12, justifyItems: "center", opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
						<InputGroup.Checkbox />
						<Form.Control
							autoFocus={true}
							onKeyDown={(event) => enterEvent && enterEvent(event, index, opcao)}
							style={{ border: "none", borderBottom: "solid", borderRadius: 0, borderColor: "gray", borderWidth: '1px' }}
							value={isCreator ? "Nova opcao" : String(opcao.valor)}
							onChange={(event) => updateEvent && updateEvent(event, index)}
						/>
						{deleteEvent && (
							<span style={{ cursor: 'pointer' }}>
								<TiDelete size={"18"} className="delete text-danger" onClick={() => deleteEvent()} />
							</span>
						)}
					</InputGroup>
				))}
			</div>
		)
	}

	return (
		<div className={className} style={{ textAlign: "start" }}>
			{opcoes.map((opcao, index) => (
				<Form.Check
					key={index}
					disabled={disabled}
					type="checkbox"
					label={`${opcao.valor}`}
				/>
			))}
		</div>
	)
}

export default CheckBox
