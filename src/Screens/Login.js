import React from "react"
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import ToogablePasswordField from "../Components/User/ToogablePasswordField"
import useLogin from "../hooks/useLogin"

const Login = () => {
    const global = useSelector((state) => state.global)
    const { setUsuario, setSenha, authPlataform } = useLogin()

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
