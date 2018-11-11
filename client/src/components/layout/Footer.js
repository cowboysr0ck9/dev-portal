import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col>
                        <p className="text-center p-3">
                            Copyright &copy; {new Date().getFullYear()}{' '}
                            DevPortal
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
