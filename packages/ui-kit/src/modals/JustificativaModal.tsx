import React, { useState, useEffect } from "react"
import { Modal, Button, Form, ListGroup, Badge, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FaTrashAlt, FaUndo } from 'react-icons/fa'
import dayjs from "dayjs"

export interface Justificativa {
	id: string | number
	descricao: string
	user?: {
		userId: string | number
		userName?: string
		firstName?: string
	}
	createdAt: string | number | Date
	removed?: boolean
	isNew?: boolean
}

export interface JustificativaModalProps {
	/** Se o modal está aberto */
	show: boolean
	/** Callback para fechar */
	onClose: () => void
	/** Lista atual de justificativas */
	justificativas: Justificativa[]
	/** ID do usuário atual (para indentificar autoria) */
	currentUserId: string | number
	/** Nome/Primeiro nome do usuário atual */
	currentUserName: string
	/** Callback quando uma nova justificativa é adicionada ou a lista é alterada */
	onUpdateJustificativas: (justificativas: Justificativa[]) => Promise<void> | void
}

/**
 * Modal de Justificativas com estilo de chat e suporte a edição/exclusão lógica.
 */
export const JustificativaModal: React.FC<JustificativaModalProps> = ({
	show,
	onClose,
	justificativas: initialJustificativas = [],
	currentUserId,
	currentUserName,
	onUpdateJustificativas,
}) => {
	const [localJustificativas, setLocalJustificativas] = useState<Justificativa[]>(initialJustificativas)
	const [novaDescricao, setNovaDescricao] = useState('')
	const [editandoId, setEditandoId] = useState<string | number | null>(null)

	useEffect(() => {
		setLocalJustificativas(initialJustificativas)
	}, [initialJustificativas])

	const handleAddOrEdit = async () => {
		if (!novaDescricao.trim()) return

		let updatedList: Justificativa[] = []

		if (editandoId) {
			updatedList = localJustificativas.map(j =>
				j.id === editandoId ? { ...j, descricao: novaDescricao } : j
			)
			setEditandoId(null)
		} else {
			const nova: Justificativa = {
				id: Math.random().toString(36).substr(2, 9), // Simples ID local se uuid não estiver disp.
				descricao: novaDescricao,
				user: { userId: currentUserId, firstName: currentUserName },
				createdAt: new Date().toISOString(),
				isNew: true
			}
			updatedList = [...localJustificativas, nova]
		}

		setNovaDescricao('')
		await onUpdateJustificativas(updatedList)
		setLocalJustificativas(updatedList)
	}

	const handleRemove = async (id: string | number) => {
		const updated = localJustificativas.map(j => j.id === id ? { ...j, removed: true } : j)
		await onUpdateJustificativas(updated)
		setLocalJustificativas(updated)
	}

	const handleUndoRemove = async (id: string | number) => {
		const updated = localJustificativas.map(j => j.id === id ? { ...j, removed: false } : j)
		await onUpdateJustificativas(updated)
		setLocalJustificativas(updated)
	}

	return (
		<Modal show={show} onHide={onClose} centered size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Justificativas / Comentários</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="mb-4">
					<Form.Group controlId="justificativaInput" className="mb-2">
						<Form.Label className="small text-muted fw-bold">NOVO REGISTRO</Form.Label>
						<Form.Control
							as="textarea"
							rows={2}
							value={novaDescricao}
							onChange={(e) => setNovaDescricao(e.target.value)}
							placeholder="Descreva o motivo ou informação adicional..."
						/>
					</Form.Group>
					<div className="d-flex justify-content-end">
						<Button variant="primary" size="sm" onClick={handleAddOrEdit}>
							{editandoId ? 'Salvar Edição' : 'Adicionar Justificativa'}
						</Button>
					</div>
				</Form>

				<ListGroup className="border-0">
					{localJustificativas.map((j) => {
						const isMe = j.user?.userId === currentUserId
						return (
							<ListGroup.Item
								key={j.id}
								className="border-0 px-0"
								style={{
									opacity: j.removed ? 0.5 : 1,
									display: 'flex',
									flexDirection: 'column',
									alignItems: isMe ? 'flex-start' : 'flex-end',
									backgroundColor: 'transparent'
								}}
							>
								<div className="d-flex align-items-center mb-1" style={{ width: '100%', justifyContent: isMe ? 'flex-start' : 'flex-end' }}>
									<span className="small fw-bold text-dark me-2">
										{isMe ? 'Você' : (j.user?.userName || j.user?.firstName || 'Usuário')}
									</span>
									<Badge bg="secondary" style={{ fontSize: '0.65rem' }}>
										{dayjs(j.createdAt).format("DD/MM [às] HH:mm")}
									</Badge>
								</div>

								<div
									onClick={() => !j.removed && isMe && (setNovaDescricao(j.descricao), setEditandoId(j.id))}
									style={{
										maxWidth: '85%',
										alignSelf: isMe ? 'flex-start' : 'flex-end',
										backgroundColor: j.removed ? '#f8d7da' : isMe ? '#e3f2fd' : '#f8f9fa',
										color: '#333',
										padding: '12px 16px',
										borderRadius: '12px',
										cursor: (isMe && !j.removed) ? 'pointer' : 'default',
										textDecoration: j.removed ? 'line-through' : 'none',
										boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
										border: isMe ? '1px solid #bbdefb' : '1px solid #e0e0e0'
									}}
								>
									{j.descricao}
								</div>

								{isMe && (
									<div className="mt-1 d-flex gap-2">
										{j.removed ? (
											<OverlayTrigger placement="top" overlay={<Tooltip>Desfazer</Tooltip>}>
												<FaUndo
													onClick={() => handleUndoRemove(j.id)}
													className="text-success cursor-pointer"
													size={14}
												/>
											</OverlayTrigger>
										) : (
											<OverlayTrigger placement="top" overlay={<Tooltip>Remover</Tooltip>}>
												<FaTrashAlt
													onClick={() => handleRemove(j.id)}
													className="text-danger cursor-pointer"
													size={14}
												/>
											</OverlayTrigger>
										)}
									</div>
								)}
							</ListGroup.Item>
						)
					})}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-secondary" onClick={onClose}>
					Fechar
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default JustificativaModal
