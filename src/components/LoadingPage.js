import React from 'react';
import { Container, Spinner, Row } from "react-bootstrap";

const LoadingPage = () => {
    return (
        <div className="h-100 border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
            <Container>
                <Row className="mt-4 justify-content-center align-items-center text-center">
                    <Spinner animation="border" role="status" size="lg">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            </Container>
        </div>
    );
}

export default LoadingPage;