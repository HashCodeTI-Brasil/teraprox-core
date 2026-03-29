import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="py-3">
            <h2 className="mb-3">Bem-vindo ao TeraproX Core</h2>
            <p className="text-muted mb-4">
                Use o menu superior para navegar entre os modulos federados.
                Se algum modulo estiver indisponivel, o Core exibira uma mensagem amigavel.
            </p>

            <Row className="g-3">
                <Col md={6} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Solicitacoes de Servico</Card.Title>
                            <Card.Text>
                                Acesse pelo menu "Solicitacoes" para abrir o novo modulo federado.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Resiliencia</Card.Title>
                            <Card.Text>
                                Quando um remote nao estiver no ar, o Core mostra erro amigavel em vez de quebrar a aplicacao.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Fluxo recomendado</Card.Title>
                            <Card.Text>
                                Comece por esta Home e abra os modulos conforme necessidade do teste.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
