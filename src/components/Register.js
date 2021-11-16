import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import './Login.css';
import CustomModal from "./CustomModal";
import bcrypt from 'bcryptjs';

async function getTutors() {
    const tutorsRespose = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/getTutors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return tutorsRespose.json();
}

async function registerUser(credentials) {
    const saltResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/registerLookup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            accountType: credentials.accountType,
        })
    })

    let saltResponseJSON = await saltResponse.json();

    if (saltResponseJSON.message === "Register lookup completed") {
        const prefix = "$2b$04$";
        let salt = prefix + saltResponseJSON.salt;

        let hash = await bcrypt.hash(credentials.password, salt);
        credentials.password = hash;

        const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        return response.json();
    } else {
        return saltResponseJSON;
    }
}

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [programme, setProgramme] = useState();
    const [group, setGroup] = useState();
    const [accountType, setAccountType] = useState();
    const [tutorName, setTutorName] = useState();
    const [tutorList, setTutorList] = useState([]);
    const [tutorEmail, setTutorEmail] = useState();
    const [isModalOpen, setIsModalOpen] = useState();
    const [modalMessage, setModalMessage] = useState();
    const [errors, setErrors] = useState({});
    const [loadingIcon, setLoadingIcon] = useState();

    const handleValidation = () => {
        let errorsList = {};
        let formIsValid = true;
    
        //Name
        if (!name) {
            formIsValid = false;
            errorsList["name"] = "Name cannot be empty";
        }
        
        if (typeof name !== "undefined") {
            if (!name.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errorsList["name"] = "Only letters";
            }
        }
        
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

        if (typeof password !== "undefined") {
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                formIsValid = false;
                errorsList["password"] = "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character";
            }
        }

        if (!passwordConfirm) {
            formIsValid = false;
            errorsList["passwordConfirm"] = "Password confirmation cannot be empty";
        }

        if (typeof passwordConfirm !== "undefined") {
            if (password !== passwordConfirm) {
                formIsValid = false;
                errorsList["passwordConfirm"] = "Passwords do not match";
            }
        }

        if (accountType == "") {
            formIsValid = false;
            errorsList["accountType"] = "Account type cannot be empty";
        }

        if (!programme && accountType == "Student") {
            formIsValid = false;
            errorsList["programme"] = "Programme cannot be empty";
        }

        if (!group && accountType == "Student") {
            formIsValid = false;
            errorsList["group"] = "Group cannot be empty";
        }        

        if (tutorName == "" && accountType == "Student") {
            formIsValid = false;
            errorsList["tutorName"] = "Tutor name cannot be empty";
        }
    
        setErrors(errorsList);
        return formIsValid;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("Validation complete");
            setLoadingIcon(true);
            const response = await registerUser({
                name, email, password, accountType, tutorName, tutorEmail, programme, group
            });
            setLoadingIcon(false);
            console.log(response);
            if (response.message == "User registered successfully.") {
                setModalMessage(response.message);
                setIsModalOpen(true);
            } else if (response.message == "User already exists") {
                setModalMessage(response.message);
                setIsModalOpen(true);
            }
        } else {
            console.log("Validation failed");
        }
        
        //setToken(response.token);
    }

    //run once on load
    useEffect(() => {
        const fetchData = async () => {
            const tempTutorList = await getTutors();
            console.log(tempTutorList);
            setTutorList(tempTutorList.tutors);
        }

        fetchData();
    }, [])

    //TODO: dynamic drop down list for tutor names/hide if they choose tutor type

    return (
        <div className="login-wrapper border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
            <Container className="container h-100">
                <Row className="mt-4 justify-content-center align-items-center text-center">
                    <h4 className="mb-3">Register</h4>
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
                            <Form.Group className="mb-3" controlId="form-account-type">
                                <Form.Label>Account Type</Form.Label>
                                <Form.Control as="select" name="accountType" onChange={e => setAccountType(e.target.value)}>
                                    <option value="">Choose Account Type</option>
                                    <option value="Student">Student</option>
                                    <option value="Tutor">Tutor</option>
                                </Form.Control>
                                <span style={{ color: "red" }}>{errors["accountType"]}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="form-name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)} />
                                <span style={{ color: "red" }}>{errors["name"]}</span>
                            </Form.Group>

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

                            <Form.Group className="mb-3" controlId="form-reenter-password">
                                <Form.Label>Re-enter Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password Again" onChange={e => setPasswordConfirm(e.target.value)}/>
                                <span style={{ color: "red" }}>{errors["passwordConfirm"]}</span>
                            </Form.Group>

                            {accountType == "Student" &&
                            <Form.Group className="mb-3" controlId="form-programme">
                                <Form.Label>Programme</Form.Label>
                                <Form.Control type="text" placeholder="Enter Programme" onChange={e => setProgramme(e.target.value)} />
                                <span style={{ color: "red" }}>{errors["programme"]}</span>
                            </Form.Group>}

                            {accountType == "Student" &&
                            <Form.Group className="mb-3" controlId="form-group">
                                <Form.Label>Group</Form.Label>
                                <Form.Control type="text" placeholder="Enter Group" onChange={e => setGroup(e.target.value)} />
                                <span style={{ color: "red" }}>{errors["group"]}</span>
                            </Form.Group>}

                            {accountType == "Student" &&
                            <Form.Group className="mb-3" controlId="form-tutor-name">
                                <Form.Label>Tutor Name (if student type)</Form.Label>
                                <Form.Control as="select" name="tutorName" onChange={e => {
                                    setTutorName(e.target.value);
                                    console.log(tutorList);
                                    tutorList.forEach(tutor => {
                                        if (tutor.name == e.target.value) {
                                            setTutorEmail(tutor.email);
                                        }
                                    });
                                }}>
                                    <option value="">Choose Tutor</option>
                                    {tutorList.map((e, key) => {
                                        return <option key={key} value={e.name}>{e.name}</option>
                                    })}
                                </Form.Control>
                                <span style={{ color: "red" }}>{errors["tutorName"]}</span>
                            </Form.Group>}
                            
                            <Button type="submit" variant="primary w-100">
                                {loadingIcon && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Registering</span>
                                </Spinner>}
                                
                                {!loadingIcon && <span>Register</span>}
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <CustomModal
                    show={isModalOpen}
                    onHide={() => { setIsModalOpen(false); window.location.href = "/login" }}
                    title="Success"
                    message={modalMessage}
                    buttonText="OK"
                />
            </Container>

        </div>
    );
}

export default Register;