import React from 'react';
import { Container, Button, Col, Form, Row} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import LoadingPage from './LoadingPage';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

class Assessment extends React.Component {
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
        const response = await fetch(`https://${process.env.REACT_APP_SERVER_URL}/users/getUserType`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: sessionStorage.getItem('email')
            })
        });

        const accData = await response.json();
        if (accData.userType == "Tutor") {
            //loads data from server and returns it to be stored as state/prop
            console.log(this.props);
            const dataResponse = await fetch(`https://${process.env.REACT_APP_SERVER_URL}/assess/getSubmission`, {
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
                efficiency: data.solutions[index].marks.efficiency,
                attemptsTaken: data.solutions[index].marks.attemptsTaken,
                correctness: data.solutions[index].marks.correctness,
                amountOfTime: data.solutions[index].marks.amountOfTime,
            });
        } else {
            window.location.href = "/dashboard";
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : Number(target.value);
        const name = target.name;

        this.setState({
            [name]: value
        });

        /* var student = { ...this.state.student };
        student.solution.marks[name] = value;

        this.setState({ student });*/
    }

    handleSubmit = async e => {
        e.preventDefault();
        
        //sends response to http://${process.env.SERVER_URL}/assess/submit
        const dataResponse = await fetch(`https://${process.env.REACT_APP_SERVER_URL}/assess/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentEmail: this.state.email,
                tutorEmail: this.state.tutorEmail,
                levelID: this.state.levelID,
                marks: {
                    amountOfTime: this.state.amountOfTime,
                    efficiency: this.state.efficiency,
                    correctness: this.state.correctness,
                    attemptsTaken: this.state.attemptsTaken,
                }
            })
        });

        const data = await dataResponse.json();
        console.log(data);
    }

    render() {
        console.log(this.props);
        const textRowCount = this.state.code.split("\n").length
        const rows = textRowCount + 1
        if (this.state.showPage) {
            return (
                <div className="h-100 border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
                    <Container className="container h-100">
                        <Row className="mt-4 justify-content-center align-items-center text-center">
                            <h4 className="mb-3">Assessment</h4>
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
                                            <RangeSlider min={0} max={5} name="amountOfTime" value={this.state.amountOfTime} onChange={this.handleChange}/>
                                        </Col>
                                    </Form.Group>
    
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Efficiency
                                        </Form.Label>
                                        <Col>
                                        <RangeSlider min={0} max={5} name="efficiency" value={this.state.efficiency} onChange={this.handleChange}/>
                                        </Col>
                                    </Form.Group>
    
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Correctness
                                        </Form.Label>
                                        <Col>
                                        <RangeSlider min={0} max={5} name="correctness" value={this.state.correctness} onChange={this.handleChange}/>
                                        </Col>
                                    </Form.Group>
    
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Attempts
                                        </Form.Label>
                                        <Col>
                                        <RangeSlider min={0} max={5} name="attemptsTaken" value={this.state.attemptsTaken} onChange={this.handleChange}/>
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
                            <Col>
                                <Button type="submit" onClick={this.handleSubmit} variant="primary" className="mx-auto" style={{width: '100%'}}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                        
                    </Container>
                </div>
            );
        }
        return (
            <LoadingPage />
        )
    }
}

export default Assessment;