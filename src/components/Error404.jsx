import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function Error404() {
    return (
        <Container>
            <Row className="mt-5 d-flex justify-content-center">
                <Col className="text-center">
                    <h1>Error 404</h1>
                    <p>Ups! There's nothing here!</p>
                    <Link to="/" className="btn" style={{ backgroundColor: "#fb5d14", color: "white" }}>Return home</Link>
                </Col>
            </Row>
        </Container>
    )
}