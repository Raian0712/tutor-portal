import React from 'react';
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import LoadingPage from './LoadingPage';

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
        showPage: false,
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
        codeErrorsString: '',
        tagsList: '',
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

    async componentDidMount() {
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

        //process code error strings
        let finalStringCode = this.processCodeErrorsString(data, index);
        let finalStringTags = this.processTagsString(data, index);

        data.solutions[index].codeErrorsString = finalStringCode;
        data.solutions[index].tagsList = finalStringTags;

        this.setState({
            showPage: true,
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
            codeErrorsString: data.solutions[index].codeErrorsString,
            tagsList: data.solutions[index].tagsList,
            amountOfTime: data.solutions[index].marks.amountOfTime,
            efficiency: data.solutions[index].marks.efficiency,
            correctness: data.solutions[index].marks.correctness,
            attemptsTaken: data.solutions[index].marks.attemptsTaken,
        });
    }

    processTagsString(data, index) {
        if (data.solutions[index].tagsList == "" || data.solutions[index].tagsList == null) {
            return "-";
        }
        let finalStringTags = data.solutions[index].tagsList.split('|').join(', ');
        finalStringTags = finalStringTags.substring(0, finalStringTags.length - 2);
        return finalStringTags;
    }

    processCodeErrorsString(data, index) {
        if (data.solutions[index].codeErrorsString == "" || data.solutions[index].codeErrorsString == null) {
            return "-";
        }
        let string = data.solutions[index].codeErrorsString.split(':');
        let string2 = [];
        let finalString = '';
        for (let i = 0; i < string.length; i++) {
            let string3 = string[i].split('|');
            string2.push(string3);
        }
        for (let i = 0; i < string2.length; i++) {
            //check if string2[i] is empty
            if (string2[i].length > 1) {
                finalString += 'Line ' + string2[i][3] + ': ' + string2[i][2] + '\n';
            }
        }
        return finalString;
    }

    render() {
        console.log(this.props);
        const textRowCount = this.state.code.split("\n").length;
        const rows = textRowCount + 1;
        if (this.state.showPage) {
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
                                </Row>

                                <Row>
                                    <Form.Group as={Col} controlId="formLevelName">
                                        <Form.Label column sm="5">Level</Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.levelID} readOnly />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formTags">
                                        <Form.Label column sm="5">Tags</Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.tagsList} readOnly />
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
                                            value={this.state.codeErrorsString}
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
                                        <Form.Label column>Attempts Taken</Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.attempts} readOnly defaultValue="Test" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formProgram">
                                        <Form.Label column>Time Taken</Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.timeTaken} readOnly defaultValue="Test" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGroup">
                                        <Form.Label column>Steps Taken</Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.stepsTaken} readOnly defaultValue="Test" />
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Row>
                        
                        <Row>
                            <Col>
                                <Row className="justify-content-center align-items-center text-center">
                                    <h6 className="mb-3">Scores</h6>
                                    <hr
                                        style={{
                                            color: "#0275d8",
                                            width: '5em'
                                        }}
                                    />
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Time Taken
                                        </Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.amountOfTime + "/" + 5} readOnly />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Efficiency
                                        </Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.efficiency + "/" + 5} readOnly />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Correctness
                                        </Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.correctness + "/" + 5} readOnly />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Attempts
                                        </Form.Label>
                                        <Col>
                                            <Form.Control value={this.state.attemptsTaken + "/" + 5} readOnly />
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
        return (
            <LoadingPage />
        );   
    }
}

export default AssessmentStudent;