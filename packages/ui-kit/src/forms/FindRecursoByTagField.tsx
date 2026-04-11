import React, { useState } from "react"
import { GrCheckmark } from "react-icons/gr"
import { useHttpController } from "teraprox-core-sdk"
import { AutoComplete } from "../forms/AutoComplete"
import { QrCodeScanButton } from "../qr/QrCodeScanButton"

export interface FindRecursoByTagFieldProps {
	/** Callback chamado quando um recurso é selecionado ou lido via QR. */
	callback: (recurso: any, confirmed: boolean) => void
	/** Controller de recurso injetado (deve implementar read, get e findByTagDescription) */
	recursoController?: {
		read: (endpoint: string, data?: any) => Promise<any>
		get: (endpoint: string) => Promise<any>
	}
}

/**
 * Componente para encontrar um recurso por sua tag (descrição ou ID).
 * Suporta busca via AutoComplete e leitura via QR Code.
 */
export const FindRecursoByTagField: React.FC<FindRecursoByTagFieldProps> = ({ callback, recursoController }) => {
	const recursoControllerPadrao = useHttpController("recurso")
	const controladorAtivo = recursoController ?? {
		read: recursoControllerPadrao.read.bind(recursoControllerPadrao),
		get: recursoControllerPadrao.get.bind(recursoControllerPadrao),
	}

	const [selectedTag, setSelectedTag] = useState<any>("")
	const [reachedRecurso, setReachedRecurso] = useState<any>(null)

	/**
	 * Handler para encontrar um recurso pelo ID da tag.
	 */
	const findRecursoByTagIdHandler = async (tagId: string | number) => {
		try {
			const r = await controladorAtivo.read("findRecursoByTagId", tagId)
			setReachedRecurso(r)
		} catch (error) {
			console.error("Erro ao buscar recurso por tag ID:", error)
		}
	}

	/**
	 * Handler para encontrar um recurso pela descrição da tag (geralmente vindo do QR).
	 */
	const findRecursoByTagDescriptionHandler = async (description: string) => {
		try {
			const formattedDescription = description.replace(/\s/g, "")
			const recurso = await controladorAtivo.read(
				`recurso/findByTagDescription`,
				formattedDescription
			)

			if (!callback) {
				console.log("Recurso encontrado (sem callback):", recurso)
			} else {
				callback(recurso, true)
			}
		} catch (error) {
			console.error("Erro ao buscar recurso por descrição de tag:", error)
		}
	}

	/**
	 * Botão de confirmação da seleção do recurso no AutoComplete.
	 */
	const confirmRecursoSelectionButton = () => {
		return (
			<div
				className="hoverable-div"
				style={{
					border: "solid",
					borderTopRightRadius: "3px",
					borderBottomRightRadius: "3px",
					padding: "8px",
					borderLeft: "none",
					borderColor: "#ccc",
					borderWidth: "1px",
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<GrCheckmark
					size={25}
					onClick={() => reachedRecurso && callback(reachedRecurso, true)}
				/>
			</div>
		)
	}

	return (
		<div>
			<AutoComplete
				sortKey={"id"}
				loadCondition={true}
				loadFunc={() => controladorAtivo.get("findActiveRecursosTags")}
				displayKey={"descricao"}
				title={"Selecione ou Digite a TAG"}
				actionButton={confirmRecursoSelectionButton}
				actionButton2={() => (
					<QrCodeScanButton
						callback={(description) =>
							findRecursoByTagDescriptionHandler(description)
						}
					/>
				)}
				onSelectedClick={(v) => {
					setSelectedTag(v)
					findRecursoByTagIdHandler(v.id)
				}}
				value={selectedTag?.descricao || ""}
			/>
		</div>
	)
}

export default FindRecursoByTagField
