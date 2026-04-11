import React, { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import "../styles/SectorSelector.css"

export interface Sector {
	id: string | number
	nome: string
}

export interface SectorSelectorProps {
	/** Lista de setores a serem exibidos */
	setores: Sector[]
	/** Callback quando um setor é selecionado */
	onSectorSelect: (setor: Sector) => void
	/** Label exibido acima do seletor */
	selectionLabel?: string
	/** Placeholder quando nada está selecionado */
	selectionPlaceholder?: string
	/** Permite selecionar a opção "Todos" */
	allowAll?: boolean
	/** Nome do setor selecionado por padrão/externamente */
	defaultSectorName?: string | false
	/** Oculta o componente */
	hideComponent?: boolean
}

/**
 * Seletor de setores customizado com dropdown estilizado.
 * Totalmente desacoplado do Redux/API; dados devem ser injetados via props.
 */
export const SectorSelector: React.FC<SectorSelectorProps> = ({
	setores,
	onSectorSelect,
	selectionLabel = "Selecione o Setor",
	selectionPlaceholder = "Selecione o setor",
	hideComponent = false,
	defaultSectorName = false,
	allowAll = false,
}) => {
	const [expanded, setExpanded] = useState(false)
	const [selectedSector, setSelectedSector] = useState<Sector | null>(null)

	// Sincroniza estado local com prop externa de defaultSectorName
	useEffect(() => {
		if (defaultSectorName && setores.length > 0) {
			const setor = setores.find((s) => s.nome === defaultSectorName)
			if (setor && setor.id !== selectedSector?.id) {
				setSelectedSector(setor)
			}
		} else if (!defaultSectorName) {
			setSelectedSector(null)
		}
	}, [defaultSectorName, setores])

	const handleSelectSetor = (setor: Sector) => {
		setSelectedSector(setor)
		onSectorSelect(setor)
		setExpanded(false)
	}

	const toggleExpand = () => {
		setExpanded(!expanded)
	}

	if (hideComponent) return null

	const setorOptions: Sector[] = allowAll 
		? [{ id: "all", nome: "Todos" }, ...setores] 
		: [...setores]

	return (
		<Form.Floating className="sector-selector-floating">
			<div className="custom-select-container" onClick={toggleExpand}>
				<span className="selected-sector-label mt-1">
					{selectedSector?.nome || selectionPlaceholder}
				</span>
				<div className="zoom-container">
					{expanded ? <BsChevronUp /> : <BsChevronDown />}
				</div>
			</div>
			{selectedSector?.nome && (
				<label htmlFor="floatingInputCustom">{selectionLabel}</label>
			)}

			{expanded && (
				<div
					className="custom-dropdown-menu"
					onMouseLeave={() => setExpanded(false)}
				>
					{setorOptions
						.sort((a, b) => a.nome.localeCompare(b.nome))
						.map((setor, idx) => (
							<div
								key={idx}
								className={`dropdown-option ${
									setor.nome === selectedSector?.nome
										? "selected-option"
										: ""
								}`}
								onClick={() => handleSelectSetor(setor)}
							>
								{setor.nome === "default" ? "Nenhum" : setor.nome}
							</div>
						))}
					{setores.length === 0 && (
						<div className="dropdown-option text-muted italic">Carregando setores...</div>
					)}
				</div>
			)}
		</Form.Floating>
	)
}

export default SectorSelector
