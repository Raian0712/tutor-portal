import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import './Login.css';
import bcrypt from 'bcryptjs';
import CustomModal from './CustomModal.js';

async function loginUser(credentials) {
    const saltResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/userLookup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email})
    })

    let saltResponseJSON = await saltResponse.json();

    const prefix = "$2b$04$";
    let salt = prefix + saltResponseJSON.salt;
    //console.log(salt)

    let hash = await bcrypt.hash(credentials.password, salt);
    credentials.password = hash;

    const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    return response.json();
}

const Login = ({ setToken, login }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isModalOpen, setIsModalOpen] = useState();
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

        if (!password) {
            formIsValid = false;
            errorsList["password"] = "Password cannot be empty";
        }

        setErrors(errorsList);
        return formIsValid;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (handleValidation()) {
            setLoadingIcon(true);
            const response = await loginUser({
                email, password
            })
            setLoadingIcon(false);
            if (response.message != "You're now logged in!") {
                setModalMessage(response.message);
                setIsModalOpen(true);
            } else {
                setToken(response.token, email);
            }
        }
        
    }

    return (
        <div className="login-wrapper border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
            <Container className="container h-100">
                <Row className="mt-4 justify-content-center align-items-center text-center">
                    <h4 className="mb-3">Login</h4>
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
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
                                <span style={{ color: "red" }}>{errors["email"]}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="form-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
                                <span style={{ color: "red" }}>{errors["password"]}</span>
                            </Form.Group>
                            
                            <Button type="submit" variant="primary w-100">
                                {loadingIcon && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Logging in...</span>
                                </Spinner>}
                                
                                {!loadingIcon && <span>Login</span>}
                            </Button>

                            <p className="mt-3">
                                Don't have an account? <a href="/register">Register</a>
                            </p>

                            <div className="mt-3 text-end">
                                <a href="/password-reset"><small className="reset text-right">Forgot your password?</small></a>
                            </div>
                        </Form>
                    </Col>
                </Row>

                <CustomModal
                    show={isModalOpen}
                    onHide={() => { setIsModalOpen(false); }}
                    title="Success"
                    message={modalMessage}
                    buttonText="OK"
                />
            </Container>

        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
