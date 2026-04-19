import React from "react"
import { Button, ButtonGroup, Dropdown, ButtonProps } from "react-bootstrap"

export interface ButtonWithDropdownOption {
	label: string
	callback: () => void
}

export interface ButtonWithDropdownProps {
	/** Texto do botão principal */
	title: string
	/** Callback ao clicar no botão principal */
	onClickButton: () => void
	/** Lista de opções para o dropdown */
	options: ButtonWithDropdownOption[]
	/** Varinate do menu (padrão: light) */
	menuVariant?: "light" | "dark"
	/** Variante do botão (padrão: primary) */
	variant?: ButtonProps["variant"]
	/** Variante do toggle (padrão: coincide com variant) */
	toggleVariant?: ButtonProps["variant"]
}

/**
 * Botão principal com um dropdown (split button) que ocupa 100% da largura.
 */
export const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
	title,
	onClickButton,
	options,
	menuVariant = "light",
	variant = "primary",
	toggleVariant,
}) => {
	return (
		<Dropdown
			as={ButtonGroup}
			className="d-flex w-100"
			style={{ flex: 1, minWidth: 0 }}
		>
			<Button
				variant={variant}
				onClick={onClickButton}
				className="flex-grow-1 text-truncate"
				style={{ minWidth: 0 }}
			>
				{title}
			</Button>

			<Dropdown.Toggle
				split
				variant={toggleVariant || variant}
				id="dropdown-split-basic"
				style={{
					flex: "0 0 2.5rem",
					width: "2.5rem",
					padding: "0",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			/>

			<Dropdown.Menu variant={menuVariant}>
				{options.map((opt, idx) => (
					<Dropdown.Item key={`${opt.label}-${idx}`} onClick={opt.callback}>
						{opt.label}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default ButtonWithDropdown
