import React, { useState, useEffect } from "react"
import { Table, Button, Modal } from "react-bootstrap"

export interface ReusableTableColumnConfig {
	columns: string[]
	dataObj: any
}

export interface ReusableTableWithModalProps {
	/** Promise que resolve para os dados brutos */
	fetchDataCallback: () => Promise<any[]>
	/** Callback para configurar colunas de cada linha */
	configureColumnsCallback: (item: any) => ReusableTableColumnConfig
	/** Cabeçalhos da tabela */
	headers: string[]
	/** Callback chamado pelo botão principal do modal */
	modalButtonCallback?: (selectedItem: any) => void
	/** Conteúdo customizado do modal */
	modalContent?: (selectedItem: any) => React.ReactNode
	/** Label para o botão de confirmação do modal */
	confirmLabel?: string
	/** Callback opcional quando os dados são carregados */
	onFetchData?: (data: any[]) => void
}

/**
 * Tabela interativa que abre um modal de detalhes ao clicar na linha.
 * Combina carregamento de dados e apresentação modal em um único componente.
 */
export const ReusableTableWithModal: React.FC<ReusableTableWithModalProps> = ({
	fetchDataCallback,
	modalButtonCallback,
	configureColumnsCallback,
	headers,
	modalContent,
	confirmLabel = "Aceitar",
	onFetchData
}) => {
	const [data, setData] = useState<any[]>([])
	const [selectedItem, setSelectedItem] = useState<any | null>(null)
	const [showModal, setShowModal] = useState(false)
	const [loading, setLoading] = useState(false)
	const [tableDataRows, setTableDataRows] = useState<ReusableTableColumnConfig[]>([])

	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await fetchDataCallback()
			onFetchData && onFetchData(response)
			setData(response)
			
			const items = Array.isArray(response) ? response : [response]
			const tabData = items.map(r => configureColumnsCallback(r))
			setTableDataRows(tabData)
		} catch (error) {
			console.error("Erro ao buscar dados na ReusableTable:", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleRowClick = (td: ReusableTableColumnConfig) => {
		setSelectedItem(td.dataObj)
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
		setSelectedItem(null)
	}

	return (
		<>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						{headers.map((col, index) => (
							<th key={index}>{col}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan={headers.length} className="text-center py-4">
								Carregando...
							</td>
						</tr>
					) : tableDataRows.length > 0 ? (
						tableDataRows.map((td, index) => (
							<tr
								key={index}
								onClick={() => handleRowClick(td)}
								style={{ cursor: "pointer" }}
							>
								{td.columns.map((col, colIndex) => (
									<td key={colIndex}>{col || "N/A"}</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={headers.length} className="text-center py-4">
								Nenhum dado encontrado.
							</td>
						</tr>
					)}
				</tbody>
			</Table>

			<Modal show={showModal} onHide={handleCloseModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Detalhes</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedItem && (
						<div>
							{modalContent ? modalContent(selectedItem) : "Visualizando detalhes do item."}
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleCloseModal}>
						Fechar
					</Button>
					{modalButtonCallback && (
						<Button
							variant="primary"
							onClick={() => {
								modalButtonCallback(selectedItem)
								handleCloseModal()
							}}
						>
							{confirmLabel}
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ReusableTableWithModal
