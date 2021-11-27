import React, { useState } from 'react';
import { Container, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import './Login.css';
import CustomModal from './CustomModal.js';

async function sendPasswordReset(credentials) {
    const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/passwordReset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email})
    })

    return response.json();
}

const ForgetPassword = ({ setTempEmail }) => {
    const [email, setEmail] = useState();
    const [isModalOpen, setIsModalOpen] = useState();
    const [modalTitle, setModalTitle] = useState();
    const [modalMessage, setModalMessage] = useState();
    const [loadingIcon, setLoadingIcon] = useState();
    const [errors, setErrors] = useState({});

    const handleValidation = () => {
        let errorsList = {};
        let formIsValid = true;

        //Email
        if (!email) {
            formIsValid = false;
            errorsList["email"] = "Email cannot be empty";
        }
        
        if (typeof email !== "undefined") {
            let lastAtPos = email.lastIndexOf("@");
            let lastDotPos = email.lastIndexOf(".");
        
            if (
                !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                email.indexOf("@@") == -1 &&
                lastDotPos > 2 &&
                email.length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errorsList["email"] = "Email is not valid";
            }
        }

        setErrors(errorsList);
        return formIsValid;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (handleValidation()) {
            setLoadingIcon(true);
            const response = await sendPasswordReset({
                email
            })
            setLoadingIcon(false);
            if (response.message != "User with given email address doesn't exist.") {
                setModalTitle("Success");
                setModalMessage(response.message + " If you still have not received your email, please try and check for it in your junk email list.");
                setIsModalOpen(true);
            } else {
                setModalTitle("Error");
                setModalMessage(response.message);
                setIsModalOpen(true);
            }
        }
    }

    return (
        <div className="login-wrapper border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
            <Container className="container h-100">
                <Row className="mt-4 justify-content-center align-items-center text-center">
                    <h4 className="mb-3">Forget Your Password?</h4>
                    <hr
                        style={{
                            color: "#0275d8",
                            width: '5em'
                        }}
                    />
                </Row>
                <Row className="h-100 justify-content-center align-items-center">
                    <Col lg={4} md={6} sm={12}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="form-email">
                                <Form.Label>Enter your email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
                                <span style={{ color: "red" }}>{errors["email"]}</span>
                            </Form.Group>
                            
                            <Button type="submit" variant="primary w-100">
                            {loadingIcon && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                            
                            {!loadingIcon && <span>Submit</span>}
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <CustomModal
                    show={isModalOpen}
                    onHide={() => { setIsModalOpen(false); }}
                    title={modalTitle}
                    message={modalMessage}
                    buttonText="OK"
                />
            </Container>
        </div>
    )
}

export default ForgetPassword;
