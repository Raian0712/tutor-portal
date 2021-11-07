import React from 'react';
import { Container, Button, Col, Form, Row} from "react-bootstrap";

class AssessmentStudent extends React.Component {
    state = {
        /*student: {
            name: '',
            programme: '',
            group: '',
            solution: {
                levelID: '',
                code: '',
                attempts: 0,
                stepsTaken: 0,
                timeTaken: 0,
                codeErrors: [{
                    id: '',
                    type: '',
                    message: '',
                    lineOfError: 0,
                }],
                marks: {
                    amountOfTime: 0,
                    efficiency: 0,
                    correctness: 0,
                    attemptsTaken: 0,
                },
                tutorName: ''
            },
            tutor: {
                email: '',
            }
        }*/
        name: '',
        email: '',
        tutorEmail: '',
        program: '',
        group: '',
        levelID: '',
        code: '',
        attempts: 0,
        stepsTaken: 0,
        timeTaken: 0,
        codeErrors: [{
            id: '',
            type: '',
            message: '',
            lineOfError: 0,
        }],
        amountOfTime: 0,
        efficiency: 0,
        correctness: 0,
        attemptsTaken: 0,
        tutorName: '',
        tutorEmail: ''
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount(credentials) {
        //loads data from server and returns it to be stored as state/prop
        console.log(this.props);
        const dataResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/assess/getSubmission`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: this.props.match.params.student_id, levelID: this.props.match.params.level_id })
        });

        let data = await dataResponse.json();
    
        console.log(data);

        //find index of this.props.match.params.level_id in data.solutions
        let index = data.solutions.findIndex(x => x.levelID === this.props.match.params.level_id);

        this.setState({
            name: data.name,
            email: data.email,
            tutorEmail: data.tutorEmail,
            program: data.programme,
            group: data.group,
            levelID: data.solutions[index].levelID,
            code: data.solutions[index].code,
            attempts: data.solutions[index].attempts,
            stepsTaken: data.solutions[index].stepsTaken,
            timeTaken: data.solutions[index].timeTaken,
            codeErrors: data.solutions[index].codeErrors,
            amountOfTime: data.solutions[index].marks.amountOfTime,
            efficiency: data.solutions[index].marks.efficiency,
            correctness: data.solutions[index].marks.correctness,
            attemptsTaken: data.solutions[index].marks.attemptsTaken,
        });
    }

    render() {
        console.log(this.props);
        const textRowCount = this.state.code.split("\n").length
        const rows = textRowCount + 1
        return (
            <div className="h-100 border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
                <Container className="container h-100">
                    <Row className="mt-4 justify-content-center align-items-center text-center">
                        <h4 className="mb-3">View Solution</h4>
                        <hr
                            style={{
                                color: "#0275d8",
                                width: '5em'
                            }}
                        />
                    </Row>
                    <Row>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formName">
                                    <Form.Label column sm="5">Name</Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.name} readOnly defaultValue="Test" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formProgram">
                                    <Form.Label column sm="5">Program</Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.program} readOnly defaultValue="Test" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGroup">
                                    <Form.Label column sm="5">Group</Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.group} readOnly defaultValue="Test" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formLevelName">
                                    <Form.Label column sm="5">Level</Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.levelID} readOnly />
                                    </Col>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Row>
                    {/*code textarea*/}
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="mb-3" controlId="formSolutionCode">
                                    <Form.Label column>
                                    Solution Code
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                            as="textarea"
                                            readOnly
                                            value={this.state.code}
                                            style={{ width: '100%' }}
                                            rows={rows}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>

                        <Col lg={6} md={6} sm={12}>
                            <Form.Group className="mb-3" controlId="formSolutionCode">
                                <Form.Label column>
                                Code Errors
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        readOnly
                                        value={this.state.codeErrors}
                                        style={{ width: '100%' }}
                                        rows={rows}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formName">
                                    <Form.Label column sm="5">Attempts Taken</Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.attempts} readOnly defaultValue="Test" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formProgram">
                                    <Form.Label column sm="5">Time Taken</Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.timeTaken} readOnly defaultValue="Test" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGroup">
                                    <Form.Label column sm="5">Steps Taken</Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.stepsTaken} readOnly defaultValue="Test" />
                                    </Col>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Row className="mb-3">
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={3}>
                                        Time Taken
                                    </Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.amountOfTime} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={3}>
                                        Efficiency
                                    </Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.efficiency} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={3}>
                                        Correctness
                                    </Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.correctness} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={3}>
                                        Attempts
                                    </Form.Label>
                                    <Col>
                                        <Form.Control value={this.state.attemptsTaken} readOnly />
                                    </Col>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Button onClick={() => {window.history.back()}} variant="primary" className="mx-auto" style={{width: '100%'}}>
                                Back
                            </Button>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }
}

export default AssessmentStudent;