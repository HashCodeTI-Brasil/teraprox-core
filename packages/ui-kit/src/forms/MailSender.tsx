import React, { useState } from "react"
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
	Spinner,
	Badge,
	InputGroup,
} from "react-bootstrap"
import { FiMail, FiSearch, FiUser, FiX, FiPlus, FiSend } from "react-icons/fi"

export interface MailSenderProps {
	/** Conteúdo HTML a ser enviado no corpo do e-mail */
	htmlContent: string
	/** Nome da empresa para o assunto/corpo padrão */
	companyName: string
	/** Callback para buscar a lista de e-mails da companhia */
	onFetchEmails: () => Promise<Array<{ email: string }>>
	/** Callback para enviar o e-mail consolidado */
	onSendEmail: (emailData: { to: string; subject: string; text: string; html: string }) => Promise<void>
	/** Flag para ocultar o componente */
	hide?: boolean
	/** Render prop opcional para o botão de ativação customizado */
	renderTrigger?: (props: { onClick: () => void; loading: boolean }) => React.ReactNode
}

/**
 * Componente para seleção de destinatários e envio de e-mails.
 * Refatorado para ser agnóstico a implementações de hooks/endpoints específicos das apps.
 */
export const MailSender: React.FC<MailSenderProps> = ({
	htmlContent,
	companyName,
	onFetchEmails,
	onSendEmail,
	hide = false,
	renderTrigger
}) => {
	const [opened, setOpened] = useState(false)
	const [addingEmail, setAddingEmail] = useState(false)
	const [selectedEmails, setSelectedEmails] = useState<any[]>([])
	const [emails, setEmails] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [postLoading, setPostLoading] = useState(false)
	const [customEmail, setCustomEmail] = useState("")
	const [emailError, setEmailError] = useState("")
	const [searchFilter, setSearchFilter] = useState("")

	const handleOpen = async () => {
		setLoading(true)
		try {
			const data = await onFetchEmails()
			setEmails(data || [])
			setOpened(true)
		} catch (err) {
			console.error("Erro ao buscar e-mails:", err)
		} finally {
			setLoading(false)
		}
	}

	const mailListLinter = () => {
		const result: any[] = []
		const seen = new Set()
		if (emails) {
			for (const item of emails) {
				if (item.email && !seen.has(item.email)) {
					seen.add(item.email)
					result.push({ email: item.email })
				}
			}
		}
		return result
	}

	const filteredEmails = emails
		? mailListLinter().filter((email) =>
				email.email.toLowerCase().includes(searchFilter.toLowerCase()) &&
				!selectedEmails.some((selected) => (selected.email || selected) === email.email)
		  )
		: []

	const sendEmail = async () => {
		const emailString = selectedEmails
			.map((email) => (email.email ? email.email : email))
			.join(", ")

		const emailData = {
			to: emailString,
			subject: `Relatório - ${companyName}`,
			text: `Relatório de processo da empresa ${companyName}`,
			html: htmlContent,
		}

		setPostLoading(true)
		try {
			await onSendEmail(emailData)
			setSelectedEmails([])
			setCustomEmail("")
			setOpened(false)
		} catch (err) {
			console.error("Erro ao enviar e-mail:", err)
		} finally {
			setPostLoading(false)
		}
	}

	const validateEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/
		return re.test(email)
	}

	const handleEmailAdd = () => {
		if (!customEmail.trim()) {
			setEmailError("Por favor, digite um e-mail")
			return
		}
		if (!validateEmail(customEmail)) {
			setEmailError("Formato de e-mail inválido")
			return
		}
		if (selectedEmails.some((email) => (email.email || email) === customEmail)) {
			setEmailError("Este e-mail já foi selecionado")
			return
		}
		setSelectedEmails([...selectedEmails, customEmail])
		setCustomEmail("")
		setEmailError("")
		setAddingEmail(false)
	}

	const handleEmailRemove = (emailToRemove: any) => {
		setSelectedEmails(
			selectedEmails.filter(
				(email) => (email.email || email) !== (emailToRemove.email || emailToRemove)
			)
		)
	}

	if (hide) return null

	if (!opened) {
		if (renderTrigger) {
			return renderTrigger({ onClick: handleOpen, loading })
		}
		return (
			<Button disabled={loading} className="w-100" onClick={handleOpen}>
				{loading ? "Carregando..." : "Enviar por E-mail"}
			</Button>
		)
	}

	return (
		<div
			style={{
				backgroundColor: "#f8f9fa",
				borderRadius: "12px",
				overflow: "hidden",
				border: "1px solid #dee2e6",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			}}
		>
			<div
				style={{
					background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
					color: "white",
					padding: "25px",
				}}
			>
				<div className="d-flex justify-content-between align-items-center">
					<div>
						<h4 className="mb-1" style={{ fontWeight: "600", fontSize: "22px" }}>
							<FiMail className="me-2" size={20} />
							Enviar Relatório por E-mail
						</h4>
						<small style={{ opacity: "0.9", fontSize: "14px" }}>
							Selecione os destinatários para envio do relatório de {companyName}
						</small>
					</div>
					<div className="d-flex gap-2">
						<Button
							variant="light"
							onClick={sendEmail}
							disabled={selectedEmails.length === 0 || postLoading}
							style={{
								borderRadius: "8px",
								fontWeight: "600",
								minWidth: "130px",
								height: "40px",
							}}
						>
							{postLoading ? (
								<>
									<Spinner size="sm" className="me-2" />
									Enviando...
								</>
							) : (
								<>
									<FiSend className="me-2" size={14} />
									Enviar E-mail
								</>
							)}
						</Button>
						<Button
							variant="outline-light"
							onClick={() => setOpened(false)}
							disabled={postLoading}
							style={{ borderRadius: "8px", width: "40px", height: "40px" }}
						>
							<FiX size={16} />
						</Button>
					</div>
				</div>
			</div>

			<div style={{ padding: "25px" }}>
				<Card className="mb-4" style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
					<Card.Body style={{ padding: "20px" }}>
						<Row className="align-items-center">
							<Col md={6}>
								<h6 className="mb-2" style={{ color: "#495057", fontWeight: "600" }}>
									🔧 Filtros e Ações
								</h6>
								<InputGroup style={{ maxWidth: "300px" }}>
									<InputGroup.Text style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}>
										<FiSearch size={14} color="#6c757d" />
									</InputGroup.Text>
									<Form.Control
										type="text"
										placeholder="Buscar e-mails..."
										value={searchFilter}
										onChange={(e) => setSearchFilter(e.target.value)}
										style={{ border: "1px solid #dee2e6" }}
									/>
								</InputGroup>
							</Col>
							<Col md={6} className="text-end">
								<Button
									variant={addingEmail ? "outline-secondary" : "outline-primary"}
									size="sm"
									onClick={() => setAddingEmail(!addingEmail)}
									disabled={postLoading}
									style={{ borderRadius: "8px" }}
								>
									{addingEmail ? (
										<>
											<FiX className="me-1" size={14} />
											Cancelar
										</>
									) : (
										<>
											<FiPlus className="me-1" size={14} />
											E-mail Personalizado
										</>
									)}
								</Button>
							</Col>
						</Row>

						{addingEmail && (
							<div
								style={{
									marginTop: "20px",
									padding: "20px",
									backgroundColor: "#f8f9ff",
									borderRadius: "8px",
									border: "1px solid #e3f2fd",
								}}
							>
								<h6 className="mb-3" style={{ color: "#1976d2", fontWeight: "600" }}>
									✉️ Adicionar E-mail Personalizado
								</h6>
								<Row className="align-items-end">
									<Col md={8}>
										<Form.Label style={{ fontSize: "13px", color: "#6c757d", fontWeight: "500" }}>
											Endereço de E-mail
										</Form.Label>
										<Form.Control
											type="email"
											placeholder="exemplo@empresa.com"
											value={customEmail}
											onChange={(e) => {
												setCustomEmail(e.target.value)
												if (emailError) setEmailError("")
											}}
											isInvalid={!!emailError}
											disabled={postLoading}
											style={{ borderRadius: "8px" }}
											onKeyPress={(e) => e.key === "Enter" && handleEmailAdd()}
										/>
										<Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
									</Col>
									<Col md={4}>
										<Button
											variant="success"
											onClick={handleEmailAdd}
											disabled={postLoading}
											style={{ borderRadius: "8px", width: "100%" }}
										>
											<FiPlus className="me-1" size={14} />
											Adicionar
										</Button>
									</Col>
								</Row>
							</div>
						)}
					</Card.Body>
				</Card>

				{selectedEmails.length > 0 && (
					<Card className="mb-4" style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
						<Card.Body style={{ padding: "20px" }}>
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h6 className="mb-0" style={{ color: "#495057", fontWeight: "600" }}>
									📋 Destinatários Selecionados
								</h6>
								<Badge bg="primary" style={{ fontSize: "12px", padding: "6px 12px" }}>
									{selectedEmails.length} selecionado{selectedEmails.length > 1 ? "s" : ""}
								</Badge>
							</div>
							<div className="d-flex flex-wrap gap-2">
								{selectedEmails.map((email, index) => (
									<div
										key={index}
										style={{
											background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
											border: "1px solid #bbdefb",
											borderRadius: "20px",
											padding: "8px 15px",
											display: "flex",
											alignItems: "center",
											fontSize: "14px",
											fontWeight: "500",
										}}
									>
										<FiUser size={12} className="me-2" color="#1976d2" />
										<span>{email.email || email}</span>
										<Button
											variant="link"
											size="sm"
											onClick={() => handleEmailRemove(email)}
											disabled={postLoading}
											style={{
												padding: "0 0 0 8px",
												color: "#dc3545",
												textDecoration: "none",
												fontSize: "16px",
											}}
										>
											<FiX size={14} />
										</Button>
									</div>
								))}
							</div>
						</Card.Body>
					</Card>
				)}

				<Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
					<Card.Body style={{ padding: "20px" }}>
						<h6 className="mb-3" style={{ color: "#495057", fontWeight: "600" }}>
							<FiUser className="me-2" size={16} />
							E-mails de {companyName}
						</h6>

						{loading ? (
							<div className="text-center py-4">
								<Spinner />
								<p className="mt-2 text-muted">Carregando e-mails...</p>
							</div>
						) : filteredEmails.length === 0 ? (
							<div className="text-center py-4">
								<p className="text-muted mb-0">
									{searchFilter ? "Nenhum e-mail encontrado com esse filtro" : "Nenhum e-mail disponível"}
								</p>
							</div>
						) : (
							<Row>
								{filteredEmails.map((email) => (
									<Col key={email.email} xs={12} sm={6} lg={4} className="mb-3">
										<Card
											onClick={() => setSelectedEmails([...selectedEmails, email])}
											style={{
												cursor: "pointer",
												border: "1px solid #e9ecef",
												borderRadius: "10px",
												transition: "all 0.2s ease",
												backgroundColor: "#fff",
											}}
											onMouseEnter={(e: any) => {
												e.currentTarget.style.transform = "translateY(-2px)"
												e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
												e.currentTarget.style.borderColor = "#007bff"
											}}
											onMouseLeave={(e: any) => {
												e.currentTarget.style.transform = "translateY(0)"
												e.currentTarget.style.boxShadow = "none"
												e.currentTarget.style.borderColor = "#e9ecef"
											}}
										>
											<Card.Body style={{ padding: "15px", textAlign: "center" }}>
												<FiMail size={20} color="#007bff" className="mb-2" />
												<div
													style={{
														fontSize: "14px",
														fontWeight: "500",
														color: "#2c3e50",
														wordBreak: "break-word",
													}}
												>
													{email.email}
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						)}
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}
