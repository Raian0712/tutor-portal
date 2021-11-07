import React from 'react';
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import bcrypt from 'bcryptjs';
import CustomModal from "./CustomModal";

async function validatePasswordResetToken(token) {
    const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/validatePasswordResetToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
    });

    return response.json();
}

async function sendPasswordResetData(credentials) {
    const saltResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/passwordReset/${credentials.user_id}/${credentials.token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });

    let saltResponseJSON = await saltResponse.json();

    const prefix = "$2b$04$";
    let salt = prefix + saltResponseJSON.salt;
    console.log(salt);

    let hash = bcrypt.hashSync(credentials.password, salt);
    credentials.password = hash;

    const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/passwordReset/${credentials.user_id}/${credentials.token}/2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: credentials.password
        })
    })

    return response.json();
}

class PasswordReset extends React.Component {
    state = { password: '', passwordReset: '', isValidated: false, isModalOpen: false, isSuccessful: false, errors: {} };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {
        //validates token
        console.log(this.props)
        const response = await validatePasswordResetToken(this.props.match.params.token);
        if (response.message == "Your password reset token is valid.") {
            this.setState({ isValidated: true });
        }
        else {
            this.setState({ isModalOpen: true });
            console.log(response.message);
        }
    }

    handleValidation = () => {
        let errorsList = {};
        let formIsValid = true;

        if (!this.state.password) {
            formIsValid = false;
            errorsList["password"] = "Password cannot be empty";
        }

        if (typeof this.state.password !== "undefined") {
            if (!this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                formIsValid = false;
                errorsList["password"] = "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character";
            }
        }

        if (!this.state.passwordReset) {
            formIsValid = false;
            errorsList["passwordConfirm"] = "Password confirmation cannot be empty";
        }

        if (typeof this.state.passwordReset !== "undefined") {
            if (this.state.password !== this.state.passwordReset) {
                formIsValid = false;
                errorsList["passwordConfirm"] = "Passwords do not match";
            }
        }

        this.setState({errors: errorsList});
        return formIsValid;
    }

    handleSubmit = async e => {
        e.preventDefault();
        if (this.handleValidation()) {
            const { token, user_id } = this.props.match.params;
            const { password, passwordReset } = this.state;
            let response = await sendPasswordResetData({ password, passwordReset, token, user_id });
            //give feedback to user after success
            if (response.message == "Password changed successfully.") {
                this.setState({ isSuccessful: true, isModalOpen: true });
            }
            else {
                this.setState({ isSuccessful: false, isModalOpen: true });
            }
        }
    }

    render() {
        if (this.state.isValidated) {
            return (
                <div className="login-wrapper border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
                    <Container className="container h-100">
                        <Row className="mt-4 justify-content-center align-items-center text-center">
                            <h4 className="mb-3">Enter New Password</h4>
                            <hr
                                style={{
                                    color: "#0275d8",
                                    width: '5em'
                                }}
                            />
                        </Row>
                        <Row className="h-100 justify-content-center align-items-center">
                            <Col lg={4} md={6} sm={12}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="form-email">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter New Password" onChange={e => this.setState({ password: e.target.value })}/>
                                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                    </Form.Group>
        
                                    <Form.Group className="mb-3" controlId="form-password">
                                        <Form.Label>Reenter New Password</Form.Label>
                                        <Form.Control type="password" placeholder="Re-enter New Password" onChange={e => this.setState({ passwordReset: e.target.value })}/>
                                        <span style={{ color: "red" }}>{this.state.errors["passwordConfirm"]}</span>
                                    </Form.Group>
                                    
                                    <Button onClick={this.handleSubmit} type="submit" variant="primary w-100">
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                        </Row>

                        {this.state.isSuccessful && <CustomModal
                            show={this.state.isModalOpen}
                            onHide={() => { this.setState({ isModalOpen: false }); }}
                            title="Success"
                            message={<span>Your password has been reset successfully. Login again by clicking <a href="/login">here</a>.</span>}
                            buttonText="OK"
                        />}
                    </Container>
                </div>
            );
        } else if (!this.state.isValidated) {
            return (
                <CustomModal
                    show={this.state.isModalOpen}
                    onHide={() => { this.setState({ isModalOpen: false }); this.props.history.push('/login'); }}
                    title="Error"
                    message="Your password reset token is invalid. Returning back to login screen."
                    buttonText="OK"
                />
            );
        }
        return null;
    }
}

export default PasswordReset;