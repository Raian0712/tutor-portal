import React from 'react';
import { Container, Button, Col, Form, Row} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import LoadingPage from './LoadingPage';
import CustomModal from './CustomModal.js';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
        isModalOpen: false,
        modalMessage: '',
        modalTitle: '',
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
        attemptsOptions: {},
        attemptsStats: {},
        timeOptions: {},
        timeStats: {},
        stepsOptions: {},
        stepsStats: {}
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/getUserType`, {
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
        if (accData.userType === "Tutor") {
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
                efficiency: data.solutions[index].marks.efficiency,
                attemptsTaken: data.solutions[index].marks.attemptsTaken,
                correctness: data.solutions[index].marks.correctness,
                amountOfTime: data.solutions[index].marks.amountOfTime,
            });

            //compare against maximum, minimum and average stats
            const dataResponse2 = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/assess/getAll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: sessionStorage.getItem('email') })
            });

            const data2 = await dataResponse2.json();
            console.log(data2);
            const attemptsOptions = await this.processData(data2.students, "attemptsTaken", "Comparison of Attempts Taken to Complete a Level", this.state.levelID);
            const timeOptions = await this.processData(data2.students, "timeTaken", "Comparison of Time Taken to Complete a Level", this.state.levelID);
            const stepsOptions = await this.processData(data2.students, "stepsTaken", "Comparison of Steps Taken to Complete a Level", this.state.levelID);
            this.setState({ showPage: true, attemptsOptions: attemptsOptions, timeOptions: timeOptions, stepsOptions: stepsOptions });
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
    }

    handleSubmit = async e => {
        e.preventDefault();
        
        //sends response to http://${process.env.SERVER_URL}/assess/submit
        const dataResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/assess/submit`, {
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
        if (data.message === "Successfully marked solution.") {
            this.setState({ isModalOpen: true, modalTitle: "Success", modalMessage: data.message });
        } else {
            this.setState({ isModalOpen: true, modalTitle: "Error", modalMessage: "Error submitting submission." });
        }
        
        console.log(data);
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

    processData(data, mode, title, level) {
        //process data returned from server and show graphs
        let averageList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let tempScore = 0;
        let totalStudents = data.length;
        let totalNonZeroStudents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let highestIndex = 0;
        let lowestIndex = 0;
        let axisYTitle = '';
        const averageOptions = {
            title: {
                text: title
            },
            data: [{
                color: "#AAAAAA",
                type: "column",
                dataPoints: [{}]
            }],
            axisX: {
                title: "Student",
            },
            axisY: {
                title: axisYTitle,
                scaleBreaks: {
                    customBreaks: [
                        {
                            startValue: 0,
                            endValue: 0,
                            spacing: 0,
                            lineColor: "red",
                            lineThickness: 3,
                            type: "straight"
                        }
                    ]
                },
            }
        };
        let averageStatsOptions = {
            highest: 0,
            lowest: 0,
            average: 0
        };

        for (let i = 0; i < totalStudents; i++) {
            for (let j = 0; j < data[i].solutions.length; j++) {
                    if (data[i].solutions[j].levelID === level) {
                        if (mode == "timeTaken") {
                            tempScore = data[i].solutions[j].timeTaken;
                            axisYTitle = "Time in seconds";
                        } else if (mode == "stepsTaken") {
                            tempScore = data[i].solutions[j].stepsTaken;
                            axisYTitle = "Number of steps";
                        } else if (mode == "attemptsTaken") {
                            tempScore = data[i].solutions[j].attempts;
                            axisYTitle = "Number of attempts";
                        }
                        averageList[i] += tempScore;
                        totalNonZeroStudents[i]++;
                        tempScore = 0;
                        break;
                    }
                
            }
        }

        for (let i = 0; i < averageList.length; i++) {
            averageList[i] = averageList[i] / totalNonZeroStudents[i];
            //finds highestIndex and lowestIndex in averageList
            if (averageList[i] > averageList[highestIndex]) {
                highestIndex = i;
            }
            if (averageList[i] < averageList[lowestIndex]) {
                lowestIndex = i;
            }
        }
        
        if (highestIndex == lowestIndex) {
            if (averageList[highestIndex] == averageList[lowestIndex + 1]) {
                lowestIndex++;
            }
        }

        averageStatsOptions = this.calculateStats(averageList, highestIndex, lowestIndex);
        if (mode == "attemptsTaken") {
            this.setState({attemptsStats: averageStatsOptions});
        } else if (mode == "timeTaken") {
            this.setState({timeStats: averageStatsOptions});
        } else if (mode == "stepsTaken") {
            this.setState({stepsStats: averageStatsOptions});
        }
        

        //stores data for graph render
        console.log(data)
        averageOptions.data[0].dataPoints[0] = { label: "Average", y: averageStatsOptions.average, indexLabel: "Average: " + averageStatsOptions.average };
        let index = 1;
        for (let i = 1; i < totalStudents + 1; i++) {
            //sets average bar on the graph
            averageOptions.axisY.scaleBreaks.customBreaks[0].startValue = averageStatsOptions.average;
            averageOptions.axisY.scaleBreaks.customBreaks[0].endValue = averageStatsOptions.average + 0.01;
            if ((i - 1) === highestIndex || (i - 1) === lowestIndex || this.state.name === data[i-1].name) {
                averageOptions.data[0].dataPoints[index] = { label: data[i - 1].name, y: averageList[i - 1], indexLabel:  (i - 1 === highestIndex ? "Highest: " + averageList[i - 1] : "") + (i - 1 === lowestIndex ? "Lowest: " + averageList[i - 1] : "") };
                index++;
            }
            
        }

        //sets the color of the bar which highlights the current student
        this.setColor(averageOptions);

        return averageOptions;
    }

    setColor(chart) {
        for(var i = 0; i < chart.data.length; i++) {
            let dataSeries = chart.data[i];
            console.log(dataSeries.dataPoints);
            for (var j = 0; j < dataSeries.dataPoints.length; j++){
                if (dataSeries.dataPoints[j].label == this.state.name) {
                    dataSeries.dataPoints[j].color = 'rgb(170, 0, 0)';
                    dataSeries.dataPoints[j].indexLabel = "This Student: " + dataSeries.dataPoints[j].y;
                } else if (dataSeries.dataPoints[j].label == "Average") {
                    dataSeries.dataPoints[j].color = 'rgb(0, 170, 0)';
                }
                
            }
        }
    }

    calculateStats(data, highestIndex, lowestIndex) {
        const averageStatsOptions = {
            highest: 0,
            lowest: 0,
            average: 0
        };
        let legitNumber = 0;
        //calculate highest, lowest and average of averageList and store it in averageStatsOptions
        averageStatsOptions.highest = data[highestIndex];
        averageStatsOptions.lowest = data[lowestIndex];
        //calculate average of data while ignoring NaN
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            if (!isNaN(data[i])) {
                total += data[i];
                legitNumber++;
            }
        }
        //calculate average and reduce to 2 decimal palces
        averageStatsOptions.average = Math.round((total / legitNumber) * 100) / 100;
        console.log(averageStatsOptions.average);

        return averageStatsOptions;
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

                                <Row>
                                    <Col>
                                        <CanvasJSChart options={this.state.attemptsOptions} className="mb-3" />
                                    </Col>
                                    <Col>
                                        <CanvasJSChart options={this.state.timeOptions} className="mb-3" />
                                    </Col>
                                    <Col>
                                        <CanvasJSChart options={this.state.stepsOptions} className="mb-3" />
                                    </Col>
                                </Row>
                            </Form>
                        </Row>
                        
                        <Row>
                            <Col>
                                <Row className="mt-4 justify-content-center align-items-center text-center">
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

                        <CustomModal
                            show={this.state.isModalOpen}
                            onHide={() => { this.setState({isModalOpen: false}) }}
                            title={this.state.modalTitle}
                            message={this.state.modalMessage}
                            buttonText="OK"
                        />
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