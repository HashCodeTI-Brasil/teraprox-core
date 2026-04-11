import React, { useState } from "react"
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
	Spinner,
} from "react-bootstrap"
import { useSelector } from "react-redux"
import { useFetchData } from "../../hooks/useFetchData"
import { usePostData } from "../../hooks/usePostData"
import { endPointCaderno } from "../../models/constantes"

/**
 * Componente que permite aos usuários selecionar destinatários de email,
 * adicionar emails personalizados e enviar conteúdo HTML por email.
 * 
 * Centralizado no Core pois o Core gerencia a conexão com os serviços de e-mail.
 *
 * @component
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.htmlContent - O conteúdo HTML a ser enviado no corpo do email.
 * @param {boolean} props.hide - Flag para esconder ou mostrar o componente.
 * @returns {JSX.Element|null} Retorna o componente MailSender ou null se estiver oculto.
 */
const MailSender = ({ htmlContent, hide }) => {
	// Estados do componente
	const [openned, setOpenned] = useState(false)
	const [addingEmail, setAddingEmail] = useState(false)
	const [selectedEmails, setSelectedEmails] = useState([])
	const [customEmail, setCustomEmail] = useState("")
	const [emailError, setEmailError] = useState("")

	/** Nome da companhia obtido do estado global (Redux). */
	const companieName = useSelector((state) => state.global.company)
	/** Hook personalizado para buscar emails da companhia. */
	const { data: emails, loading, error, fetchData } = useFetchData()
	
	function mailListLinter() {
		const resultAsObjects = []
		const seen = new Set()

		if (emails) {
			for (const item of emails) {
				if (item.email && !seen.has(item.email)) {
					seen.add(item.email)
					resultAsObjects.push({ email: item.email })
				}
			}
		}

		return resultAsObjects
	}
	
	/** Hook personalizado para enviar dados via POST e gerenciar o estado de carregamento. */
	const {
		executePost,
		loading: postLoading,
		error: postError,
	} = usePostData()

	/**
	 * Envia o email para os destinatários selecionados com o conteúdo HTML fornecido.
	 */
	const sendEmail = () => {
		const emailString = selectedEmails
			.map((email) => (email.email ? email.email : email))
			.join(", ")

		const emailData = {
			to: emailString,
			subject: `Relatório - ${companieName}`,
			text: `Relatório de processo da empresa ${companieName}`,
			html: htmlContent
		}

		executePost(
			null,
			"/sendMail",
			emailData,
			endPointCaderno
		).then(() => {
			clearScreen()
		})
	}

	const clearScreen = () => {
		setSelectedEmails([])
		setCustomEmail("")
		setAddingEmail(false)
		setOpenned(false)
	}

	const handleEmailSelect = (email) => {
		setSelectedEmails((prev) => [...prev, email])
	}

	const handleEmailRemove = (email) => {
		setSelectedEmails((prev) => prev.filter((e) => e !== email))
	}

	const handleCustomEmailAdd = () => {
		if (customEmail && validateEmail(customEmail)) {
			if (!selectedEmails.includes(customEmail)) {
				setSelectedEmails((prev) => [...prev, customEmail])
			}
			setCustomEmail("")
			setEmailError("")
			setAddingEmail(false)
		} else {
			setEmailError("Por favor, insira um email válido.")
		}
	}

	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/
		return re.test(email)
	}

	if (hide) return null

	if (!openned) {
		return (
			<Button
				hidden={hide}
				disabled={loading}
				className="w-100 mb-2"
				onClick={() => {
					fetchData("user", "getCompanyMails").then(() =>
						setOpenned(true)
					)
				}}
			>
				{loading ? "Carregando..." : "Enviar por email"}
			</Button>
		)
	}

	return (
		<div style={{ 
			backgroundColor: "#f8f9fa", 
			borderRadius: "12px", 
			overflow: "hidden",
			border: "1px solid #dee2e6"
		}}>
			<div style={{ 
				background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
				color: "white",
				padding: "20px 25px"
			}}>
				<div className="d-flex justify-content-between align-items-center">
					<div>
						<h4 className="mb-1" style={{ fontWeight: "600", fontSize: "20px" }}>
							📧 Enviar Relatório por Email
						</h4>
						<small style={{ opacity: "0.9" }}>
							Selecione os destinatários para envio do relatório
						</small>
					</div>
					<div className="d-flex gap-2">
						<Button
							variant="light"
							size="sm"
							onClick={sendEmail}
							disabled={selectedEmails.length === 0 || postLoading}
							style={{ 
								borderRadius: "8px",
								fontWeight: "600",
								minWidth: "120px"
							}}
						>
							{postLoading ? (
								<>
									<Spinner size="sm" className="me-2" />
									Enviando...
								</>
							) : (
								"📤 Enviar"
							)}
						</Button>
						<Button
							variant="outline-light"
							size="sm"
							onClick={() => setOpenned(false)}
							disabled={postLoading}
							style={{ borderRadius: "8px" }}
						>
							✕
						</Button>
					</div>
				</div>
			</div>

			<Container fluid className="p-4">
				<Card className="mb-4" style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
					<Card.Body style={{ padding: "20px" }}>
						<div className="d-flex justify-content-between align-items-center">
							<div>
								<h6 className="mb-1" style={{ color: "#495057", fontWeight: "600" }}>
									🔧 Ações Rápidas
								</h6>
								<small className="text-muted">
									Adicione emails personalizados ou selecione da lista
								</small>
							</div>
							{!addingEmail && (
								<Button
									variant="outline-primary"
									size="sm"
									onClick={() => setAddingEmail(true)}
									disabled={postLoading}
									style={{ borderRadius: "8px", fontSize: "13px" }}
								>
									➕ Email Personalizado
								</Button>
							)}
						</div>

						{addingEmail && (
							<div style={{ 
								marginTop: "15px", 
								padding: "20px", 
								backgroundColor: "#f8f9ff", 
								borderRadius: "8px",
								border: "1px solid #e3f2fd"
							}}>
								<h6 className="mb-3" style={{ color: "#1976d2" }}>
									✉️ Adicionar Email Personalizado
								</h6>
								<Row className="align-items-end">
									<Col md={8}>
										<Form.Group controlId="customEmail">
											<Form.Control
												type="email"
												placeholder="Digite o email"
												value={customEmail}
												onChange={(e) => {
													setCustomEmail(e.target.value)
													if (emailError) setEmailError("")
												}}
												isInvalid={emailError !== ""}
												disabled={postLoading}
											/>
											{emailError && (
												<Form.Control.Feedback type="invalid">
													{emailError}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Button
											variant="success"
											onClick={handleCustomEmailAdd}
											disabled={postLoading}
										>
											Adicionar
										</Button>
										<Button
											variant="outline-secondary"
											className="ms-2"
											onClick={() => setAddingEmail(false)}
											disabled={postLoading}
										>
											Cancelar
										</Button>
									</Col>
								</Row>
							</div>
						)}
					</Card.Body>
				</Card>

				{selectedEmails.length > 0 && (
					<Card className="mb-4" style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
						<Card.Body style={{ padding: "20px" }}>
							<h6 className="mb-3" style={{ color: "#495057", fontWeight: "600" }}>
								📋 Destinatários Selecionados
							</h6>
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
											fontWeight: "500"
										}}
									>
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
												fontSize: "16px"
											}}
										>
											✕
										</Button>
									</div>
								))}
							</div>
						</Card.Body>
					</Card>
				)}

				<Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
					<Card.Body style={{ padding: "20px" }}>
						<h6 className="mb-3" style={{ color: "#495057", fontWeight: "600" }}>
							👥 Destinatários de {companieName}
						</h6>
						
						{loading ? (
							<div className="text-center py-4">
								<Spinner />
								<p className="mt-2 text-muted">Carregando emails...</p>
							</div>
						) : emails && mailListLinter(emails).filter(email => !selectedEmails.includes(email)).length === 0 ? (
							<div className="text-center py-4">
								<p className="text-muted mb-0">
									Nenhum email disponível
								</p>
							</div>
						) : (
							<Row>
								{emails &&
									mailListLinter(emails)
										.filter(email => !selectedEmails.includes(email))
										.map((email) => (
											<Col key={email.email} xs={12} sm={6} lg={4} className="mb-3">
												<Card
													onClick={() => handleEmailSelect(email)}
													style={{
														cursor: "pointer",
														border: "1px solid #e9ecef",
														borderRadius: "10px",
														transition: "all 0.2s ease",
														backgroundColor: "#fff"
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.transform = "translateY(-2px)"
														e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
														e.currentTarget.style.borderColor = "#007bff"
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.transform = "translateY(0)"
														e.currentTarget.style.boxShadow = "none"
														e.currentTarget.style.borderColor = "#e9ecef"
													}}
												>
													<Card.Body style={{ padding: "15px", textAlign: "center" }}>
														<div style={{ 
															fontSize: "14px", 
															fontWeight: "500",
															color: "#2c3e50",
															wordBreak: "break-word"
														}}>
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
			</Container>
		</div>
	)
}

export default MailSender
