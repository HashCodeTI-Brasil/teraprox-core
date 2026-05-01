import React, { useState, useEffect } from "react"
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import ToogablePasswordField from "../Components/User/ToogablePasswordField"
import useLogin from "../hooks/useLogin"
import { shouldPromptTenant, getDevTenant, setDevTenant } from "../utils/tenantResolver.js"

const Login = () => {
    const global = useSelector((state) => state.global)
    const { setUsuario, setSenha, authPlataform } = useLogin()
    const showTenantField = shouldPromptTenant()
    const [devTenant, setDevTenantState] = useState(getDevTenant())

    useEffect(() => {
        setDevTenant(devTenant)
    }, [devTenant])

    if (global.isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col md={5}>
                    <Card border="0" className="shadow-lg p-4">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <h1 className="h3 mb-3 font-weight-normal text-primary">TeraproX</h1>
                                <p className="text-muted">Faça login para entrar no portal</p>
                            </div>

                            <Form>
                                {showTenantField && (
                                    <Form.Group className="mb-3" controlId="formTenant">
                                        <Form.Label className="text-muted small">
                                            Empresa / Tenant
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="ex: cationbrasil"
                                            value={devTenant}
                                            onChange={(e) => setDevTenantState(e.target.value)}
                                            className="py-2"
                                            style={{ borderColor: '#ffc107', backgroundColor: '#fffdf0' }}
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                        />
                                        <Form.Text className="text-muted small">
                                            Em produção com domínio próprio (ex: cationbrasil.teraprox.com.br)
                                            esse campo é detectado automaticamente.
                                        </Form.Text>
                                    </Form.Group>
                                )}

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>E-mail ou Usuário</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Seu email ou nome de usuário"
                                        onChange={(event) => setUsuario(event.target.value)}
                                        className="py-2"
                                    />
                                </Form.Group>

                                <ToogablePasswordField
                                    onChangeEvent={setSenha}
                                    callback={authPlataform}
                                />

                                <div className="d-grid gap-2 mt-4">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={authPlataform}
                                    >
                                        Log In
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
