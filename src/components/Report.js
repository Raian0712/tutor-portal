import React from 'react';
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import LoadingPage from "./LoadingPage"
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPage: false,
            data: {},
            averageAttemptsOptions: {},
            averageTimeOptions: {},
            averageStepsOptions: {},
        }
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
        if (accData.userType == "Tutor") {
            //loads data from server and returns it to be stored as state/prop
            const dataResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/assess/getAll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.props.email })
            });

            const data = await dataResponse.json();
            console.log(data);
            this.setState({ data: data.students });
            const averageAttemptsOptions = await this.processData(this.state.data, "attemptsTaken", "Average Attempts Taken to Complete a Level");
            const averageTimeOptions = await this.processData(this.state.data, "timeTaken", "Average Time Taken to Complete a Level");
            const averageStepsOptions = await this.processData(this.state.data, "stepsTaken", "Average Steps Taken to Complete a Level");
            this.setState({ showPage: true, averageAttemptsOptions: averageAttemptsOptions, averageTimeOptions: averageTimeOptions, averageStepsOptions: averageStepsOptions });
        } else {
            //redirects user back to previous pages
            window.location.href = "/dashboard";
        }
        
    }

    async processData(data, mode, title) {
        //process data returned from server and show graphs
        let levels = ['1-1', '1-2', '1-3', '1-4', '1-5', '2-1', '2-2', '2-3', '2-4', '2-5', '3-1', '3-2', '3-3', '3-4', '4-1', '4-2', '5-1'];
        let averageList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let tempScore = 0;
        let totalStudents = data.length;
        let axisYTitle = '';

        for (let i = 0; i < totalStudents; i++) {
            for (let j = 0; j < data[i].solutions.length; j++) {
                for (let k = 0; k < levels.length; k++) {
                    if (data[i].solutions[j].levelID === levels[k]) {
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
                        averageList[k] += tempScore;
                        tempScore = 0;
                        break;
                    }
                }
            }
        }

        for (let i = 0; i < averageList.length; i++) {
            averageList[i] = averageList[i] / totalStudents;
        }

        const averageOptions = {
            title: {
              text: title
            },
            data: [{				
                type: "column",
                dataPoints: [{}]
            }],
            axisX:{
                title: "Level ID",
            },
            axisY: {
                title: axisYTitle,
            }
        }

        for (let i = 0; i < averageList.length; i++) {
            averageOptions.data[0].dataPoints[i] = { label: levels[i], y: averageList[i] };
        }

        return averageOptions;
    }

    render() {
        //need some function to process data
        if (this.state.showPage) {
            return (
                <div className="h-100 border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
                    <Container>
                        <Row className="mt-4 justify-content-center align-items-center text-center">
                            <h4 className="mb-3">Reports</h4>
                            <hr
                                style={{
                                    color: "#0275d8",
                                    width: '5em'
                                }}
                            />
                        </Row>
                        <Tabs unmountOnExit={true} id="reports" className="mb-3">
                            <Tab eventKey="averageAttempts" title="Average Attempts">
                                <CanvasJSChart options={this.state.averageAttemptsOptions} />
                            </Tab>
                            <Tab eventKey="averageTime" title="Average Time">
                                <CanvasJSChart options={this.state.averageTimeOptions} />
                            </Tab>
                            <Tab eventKey="averageSteps" title="Average Steps">
                                <CanvasJSChart options={this.state.averageStepsOptions} />
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            );
        }
        return (
            <LoadingPage />
        );
    }
}

export default Report;