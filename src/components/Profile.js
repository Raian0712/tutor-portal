import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

async function loadData(email) {
    const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/getProfile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ email: email })
    });

    const data = await response.json();
    //console.log(data);
    return data;
}

//takes list of level id, checks if user.solutions contains the level id, if it does, add 1 to the respective slot in progress array
function calculateProgress(data) {
    let levels = ['1-1', '1-2', '1-3', '1-4', '1-5', '2-1', '2-2', '2-3', '2-4', '2-5', '3-1', '3-2', '3-3', '3-4', '4-1', '4-2', '5-1'];
    let averageList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let total = 0;
    
    for (let i = 0; i < levels.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (levels[i] === data[j].levelID) {
                averageList[i] = 1;
                total++;
            }
        }
    }

    return total;
}

function calculatePercentage(total, completed) {
    let percentage = completed / total * 100;
    return percentage;
}

const Profile = ({ email }) => {
    const [name, setName] = useState();
    const [emailField, setEmailField] = useState();
    const [programme, setProgramme] = useState();
    const [group, setGroup] = useState();
    const [tutorName, setTutorName] = useState();
    const [id, setId] = useState();
    const [accountType, setAccountType] = useState();
    const [completed, setCompleted] = useState(0);
    const [percentage, setPercentage] = useState();
    
    useEffect(() => {
        async function handleOnLoad() {
            const data = await loadData(email);
            if (data.message == "User not found.") {
                alert("User not found.");
                return;
            } else {
                setName(data.user.name);
                setEmailField(data.user.email);
                setProgramme(data.user.programme);
                setGroup(data.user.group);
                setTutorName(data.user.tutorName);
                setId(data.user._id);
                setAccountType(data.user.accountType);
                setCompleted(calculateProgress(data.user.solutions));
                let percentageCalculated = calculatePercentage(17, completed);
                //console.log("Completed: " + completed);
                //console.log("Percentage: " + percentageCalculated);
                setPercentage(percentageCalculated);
            }
            
        }
        handleOnLoad();
    }, [completed])

    return (
        <div className="border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '1.5em' }}>
            <Container className="container h-100">
                <Row className="mt-4 justify-content-center align-items-center text-center">
                    <h4 className="mb-3">Profile</h4>
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
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="5">
                                Name
                                </Form.Label>
                                <Col>
                                <Form.Control value={name} plaintext readOnly />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="5">
                                Email
                                </Form.Label>
                                <Col>
                                <Form.Control value={emailField} plaintext readreadOnly />
                                </Col>
                            </Form.Group>

                            {accountType == "Student" && <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="5">
                                    Programme
                                </Form.Label>
                                <Col>
                                    <Form.Control value={programme} plaintext readreadOnly />
                                </Col>
                            </Form.Group>}

                            {accountType == "Student" && <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="5">
                                    Group
                                </Form.Label>
                                <Col>
                                    <Form.Control value={group} plaintext readreadOnly />
                                </Col>
                            </Form.Group>}

                            {accountType == "Student" && <Form.Group as={Row} className="mb-3" controlId="formPlaintextTutorName">
                                <Form.Label column sm="5">
                                Tutor Name
                                </Form.Label>
                                <Col>
                                <Form.Control value={tutorName} plaintext readOnly />
                                </Col>
                            </Form.Group>}
                            
                            {accountType == "Student" && <Form.Group as={Row} className="mb-3" controlId="formPlaintextProgress">
                                <Form.Label column sm="5">
                                    Progress
                                </Form.Label>
                                <Col sm="5">
                                    <div style={{ width: '5em', height: '5em' }}>
                                        <CircularProgressbar value={percentage} text={ completed + " / 17"} />
                                    </div>
                                </Col>
                            </Form.Group>}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;