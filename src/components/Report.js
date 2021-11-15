import React from 'react';
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
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
            attemptsOptions: {},
            attemptsStats: {},
            timeOptions: {},
            timeStats: {},
            stepsOptions: {},
            stepsStats: {},
            level11AttemptsOptions: {},
            level11AttemptsStats: {},
            level11TimeOptions: {},
            level11TimeStats: {},
            level11StepsOptions: {},
            level11StepsStats: {},
            level12AttemptsOptions: {},
            level12AttemptsStats: {},
            level12TimeOptions: {},
            level12TimeStats: {},
            level12StepsOptions: {},
            level12StepsStats: {},
            level13AttemptsOptions: {},
            level13AttemptsStats: {},
            level13TimeOptions: {},
            level13TimeStats: {},
            level13StepsOptions: {},
            level13StepsStats: {},
            level14AttemptsOptions: {},
            level14AttemptsStats: {},
            level14TimeOptions: {},
            level14TimeStats: {},
            level14StepsOptions: {},
            level14StepsStats: {},
            level15AttemptsOptions: {},
            level15AttemptsStats: {},
            level15TimeOptions: {},
            level15TimeStats: {},
            level15StepsOptions: {},
            level15StepsStats: {},
            level15AttemptsOptions: {},
            level15AttemptsStats: {},
            level15TimeOptions: {},
            level15TimeStats: {},
            level15StepsOptions: {},
            level15StepsStats: {},
            level21AttemptsOptions: {},
            level21AttemptsStats: {},
            level21TimeOptions: {},
            level21TimeStats: {},
            level21StepsOptions: {},
            level21StepsStats: {},
            level22AttemptsOptions: {},
            level22AttemptsStats: {},
            level22TimeOptions: {},
            level22TimeStats: {},
            level22StepsOptions: {},
            level22StepsStats: {},
            level23AttemptsOptions: {},
            level23AttemptsStats: {},
            level23TimeOptions: {},
            level23TimeStats: {},
            level23StepsOptions: {},
            level23StepsStats: {},
            level24AttemptsOptions: {},
            level24AttemptsStats: {},
            level24TimeOptions: {},
            level24TimeStats: {},
            level24StepsOptions: {},
            level24StepsStats: {},
            level25AttemptsOptions: {},
            level25AttemptsStats: {},
            level25TimeOptions: {},
            level25TimeStats: {},
            level25StepsOptions: {},
            level25StepsStats: {},
            level31AttemptsOptions: {},
            level31AttemptsStats: {},
            level31TimeOptions: {},
            level31TimeStats: {},
            level31StepsOptions: {},
            level31StepsStats: {},
            level32AttemptsOptions: {},
            level32AttemptsStats: {},
            level32TimeOptions: {},
            level32TimeStats: {},
            level32StepsOptions: {},
            level32StepsStats: {},
            level33AttemptsOptions: {},
            level33AttemptsStats: {},
            level33TimeOptions: {},
            level33TimeStats: {},
            level33StepsOptions: {},
            level33StepsStats: {},
            level34AttemptsOptions: {},
            level34AttemptsStats: {},
            level34TimeOptions: {},
            level34TimeStats: {},
            level34StepsOptions: {},
            level34StepsStats: {},
            level41AttemptsOptions: {},
            level41AttemptsStats: {},
            level41TimeOptions: {},
            level41TimeStats: {},
            level41StepsOptions: {},
            level41StepsStats: {},
            level42AttemptsOptions: {},
            level42AttemptsStats: {},
            level42TimeOptions: {},
            level42TimeStats: {},
            level42StepsOptions: {},
            level42StepsStats: {},
            level51AttemptsOptions: {},
            level51AttemptsStats: {},
            level51TimeOptions: {},
            level51TimeStats: {},
            level51StepsOptions: {},
            level51StepsStats: {},
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
            const attemptsOptions = await this.processData(this.state.data, "attemptsTaken", "Average Amount of Attempts Taken to Complete a Level");
            const timeOptions = await this.processData(this.state.data, "timeTaken", "Average Amount of Time Taken to Complete a Level");
            const stepsOptions = await this.processData(this.state.data, "stepsTaken", "Average Amount of Steps Taken to Complete a Level");
            const level11AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 1-1 Attempts Taken Overview", "1-1");
            const level11TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 1-1 Time Taken Overview", "1-1");
            const level11StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 1-1 Steps Taken Overview", "1-1");
            const level12AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 1-2 Attempts Taken Overview", "1-2");
            const level12TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 1-2 Time Taken Overview", "1-2");
            const level12StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 1-2 Steps Taken Overview", "1-2");
            const level13AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 1-3 Attempts Taken Overview", "1-3");
            const level13TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 1-3 Time Taken Overview", "1-3");
            const level13StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 1-3 Steps Taken Overview", "1-3");
            const level14AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 1-4 Attempts Taken Overview", "1-4");
            const level14TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 1-4 Time Taken Overview", "1-4");
            const level14StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 1-4 Steps Taken Overview", "1-4");
            const level15AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 1-5 Attempts Taken Overview", "1-5");
            const level15TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 1-5 Time Taken Overview", "1-5");
            const level15StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 1-5 Steps Taken Overview", "1-5");
            const level21AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 2-1 Attempts Taken Overview", "2-1");
            const level21TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 2-1 Time Taken Overview", "2-1");
            const level21StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 2-1 Steps Taken Overview", "2-1");
            const level22AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 2-2 Attempts Taken Overview", "2-2");
            const level22TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 2-2 Time Taken Overview", "2-2");
            const level22StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 2-2 Steps Taken Overview", "2-2");
            const level23AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 2-3 Attempts Taken Overview", "2-3");
            const level23TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 2-3 Time Taken Overview", "2-3");
            const level23StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 2-3 Steps Taken Overview", "2-3");
            const level24AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 2-4 Attempts Taken Overview", "2-4");
            const level24TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 2-4 Time Taken Overview", "2-4");
            const level24StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 2-4 Steps Taken Overview", "2-4");
            const level25AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 2-5 Attempts Taken Overview", "2-5");
            const level25TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 2-5 Time Taken Overview", "2-5");
            const level25StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 2-5 Steps Taken Overview", "2-5");
            const level31AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 3-1 Attempts Taken Overview", "3-1");
            const level31TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 3-1 Time Taken Overview", "3-1");
            const level31StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 3-1 Steps Taken Overview", "3-1");
            const level32AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 3-2 Attempts Taken Overview", "3-2");
            const level32TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 3-2 Time Taken Overview", "3-2");
            const level32StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 3-2 Steps Taken Overview", "3-2");
            const level33AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 3-3 Attempts Taken Overview", "3-3");
            const level33TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 3-3 Time Taken Overview", "3-3");
            const level33StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 3-3 Steps Taken Overview", "3-3");
            const level34AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 3-4 Attempts Taken Overview", "3-4");
            const level34TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 3-4 Time Taken Overview", "3-4");
            const level34StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 3-4 Steps Taken Overview", "3-4");
            const level41AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 4-1 Attempts Taken Overview", "4-1");
            const level41TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 4-1 Time Taken Overview", "4-1");
            const level41StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 4-1 Steps Taken Overview", "4-1");
            const level42AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 4-2 Attempts Taken Overview", "4-2");
            const level42TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 4-2 Time Taken Overview", "4-2");
            const level42StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 4-2 Steps Taken Overview", "4-2");
            const level51AttemptsOptions = await this.processIndividualData(this.state.data, "attemptsTaken", "Level 5-1 Attempts Taken Overview", "5-1");
            const level51TimeOptions = await this.processIndividualData(this.state.data, "timeTaken", "Level 5-1 Time Taken Overview", "5-1");
            const level51StepsOptions = await this.processIndividualData(this.state.data, "stepsTaken", "Level 5-1 Steps Taken Overview", "5-1");
            this.setState({ showPage: true, attemptsOptions: attemptsOptions, timeOptions: timeOptions, stepsOptions: stepsOptions });
            this.setState({ level11AttemptsOptions: level11AttemptsOptions, level11TimeOptions: level11TimeOptions, level11StepsOptions: level11StepsOptions });
            this.setState({ level12AttemptsOptions: level12AttemptsOptions, level12TimeOptions: level12TimeOptions, level12StepsOptions: level12StepsOptions });
            this.setState({ level13AttemptsOptions: level13AttemptsOptions, level13TimeOptions: level13TimeOptions, level13StepsOptions: level13StepsOptions });
            this.setState({ level14AttemptsOptions: level14AttemptsOptions, level14TimeOptions: level14TimeOptions, level14StepsOptions: level14StepsOptions });
            this.setState({ level15AttemptsOptions: level15AttemptsOptions, level15TimeOptions: level15TimeOptions, level15StepsOptions: level15StepsOptions });
            this.setState({ level21AttemptsOptions: level21AttemptsOptions, level21TimeOptions: level21TimeOptions, level21StepsOptions: level21StepsOptions });
            this.setState({ level22AttemptsOptions: level22AttemptsOptions, level22TimeOptions: level22TimeOptions, level22StepsOptions: level22StepsOptions });
            this.setState({ level23AttemptsOptions: level23AttemptsOptions, level23TimeOptions: level23TimeOptions, level23StepsOptions: level23StepsOptions });
            this.setState({ level24AttemptsOptions: level24AttemptsOptions, level24TimeOptions: level24TimeOptions, level24StepsOptions: level24StepsOptions });
            this.setState({ level25AttemptsOptions: level25AttemptsOptions, level25TimeOptions: level25TimeOptions, level25StepsOptions: level25StepsOptions });
            this.setState({ level31AttemptsOptions: level31AttemptsOptions, level31TimeOptions: level31TimeOptions, level31StepsOptions: level31StepsOptions });
            this.setState({ level32AttemptsOptions: level32AttemptsOptions, level32TimeOptions: level32TimeOptions, level32StepsOptions: level32StepsOptions });
            this.setState({ level33AttemptsOptions: level33AttemptsOptions, level33TimeOptions: level33TimeOptions, level33StepsOptions: level33StepsOptions });
            this.setState({ level34AttemptsOptions: level34AttemptsOptions, level34TimeOptions: level34TimeOptions, level34StepsOptions: level34StepsOptions });
            this.setState({ level41AttemptsOptions: level41AttemptsOptions, level41TimeOptions: level41TimeOptions, level41StepsOptions: level41StepsOptions });
            this.setState({ level42AttemptsOptions: level42AttemptsOptions, level42TimeOptions: level42TimeOptions, level42StepsOptions: level42StepsOptions });
            this.setState({ level51AttemptsOptions: level51AttemptsOptions, level51TimeOptions: level51TimeOptions, level51StepsOptions: level51StepsOptions });

        } else {
            //redirects user back to previous pages
            window.location.href = "/dashboard";
        }
        
    }

    processData(data, mode, title) {
        //process data returned from server and show graphs
        let levels = ['1-1', '1-2', '1-3', '1-4', '1-5', '2-1', '2-2', '2-3', '2-4', '2-5', '3-1', '3-2', '3-3', '3-4', '4-1', '4-2', '5-1'];
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
                type: "column",
                dataPoints: [{}]
            }],
            axisX: {
                title: "Level ID",
            },
            axisY: {
                title: axisYTitle,
            }
        };
        let averageStatsOptions = {
            highest: 0,
            lowest: 0,
            average: 0
        };

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
                        totalNonZeroStudents[k]++;
                        tempScore = 0;
                        break;
                    }
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

        averageStatsOptions = this.calculateStats(averageList, highestIndex, lowestIndex);
        if (mode == "attemptsTaken") {
            this.setState({attemptsStats: averageStatsOptions});
        } else if (mode == "timeTaken") {
            this.setState({timeStats: averageStatsOptions});
        } else if (mode == "stepsTaken") {
            this.setState({stepsStats: averageStatsOptions});
        }
        

        //stores data for graph render
        for (let i = 0; i < averageList.length; i++) {
            averageOptions.data[0].dataPoints[i] = { label: levels[i], y: averageList[i], indexLabel:  (i === highestIndex ? "Highest: " + averageList[i] : "") + (i === lowestIndex ? "Lowest: " + averageList[i] : "") };
        }

        return averageOptions;
    }

    processIndividualData(data, mode, title, level) {
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
            highestPerson: '',
            lowest: 0,
            lowestPerson: '',
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

        averageStatsOptions = this.calculateStats(averageList, highestIndex, lowestIndex);
        if (highestIndex == lowestIndex) {
            if (averageList[highestIndex] == averageList[lowestIndex + 1]) {
                lowestIndex++;
            }
        }
        averageStatsOptions.highestPerson = data[highestIndex].name;
        averageStatsOptions.lowestPerson = data[lowestIndex].name;
        if (mode == "attemptsTaken") {
            switch (level) {
                case "1-1": {
                    this.setState({ level11AttemptsStats: averageStatsOptions });
                    break;
                }
                case "1-2": {
                    this.setState({ level12AttemptsStats: averageStatsOptions });
                    break;
                }
                case "1-3": {
                    this.setState({ level13AttemptsStats: averageStatsOptions });
                    break;
                }
                case "1-4": {
                    this.setState({ level14AttemptsStats: averageStatsOptions });
                    break;
                }
                case "1-5": {
                    this.setState({ level15AttemptsStats: averageStatsOptions });
                    break;
                }
                case "2-1": {
                    this.setState({ level21AttemptsStats: averageStatsOptions });
                    break;
                }
                case "2-2": {
                    this.setState({ level22AttemptsStats: averageStatsOptions });
                    break;
                }
                case "2-3": {
                    this.setState({ level23AttemptsStats: averageStatsOptions });
                    break;
                }
                case "2-4": {
                    this.setState({ level24AttemptsStats: averageStatsOptions });
                    break;
                }
                case "2-5": {
                    this.setState({ level25AttemptsStats: averageStatsOptions });
                    break;
                }
                case "3-1": {
                    this.setState({ level31AttemptsStats: averageStatsOptions });
                    break;
                }
                case "3-2": {
                    this.setState({ level32AttemptsStats: averageStatsOptions });
                    break;
                }
                case "3-3": {
                    this.setState({ level33AttemptsStats: averageStatsOptions });
                    break;
                }
                case "3-4": {
                    this.setState({ level34AttemptsStats: averageStatsOptions });
                    break;
                }
                case "4-1": {
                    this.setState({ level41AttemptsStats: averageStatsOptions });
                    break;
                }
                case "4-2": {
                    this.setState({ level42AttemptsStats: averageStatsOptions });
                    break;
                }
                case "5-1": {
                    this.setState({ level51AttemptsStats: averageStatsOptions });
                    break;
                }
            }
        } else if (mode == "timeTaken") {
            switch (level) {
                case "1-1": {
                    this.setState({ level11TimeStats: averageStatsOptions });
                    break;
                }
                case "1-2": {
                    this.setState({ level12TimeStats: averageStatsOptions });
                    break;
                }
                case "1-3": {
                    this.setState({ level13TimeStats: averageStatsOptions });
                    break;
                }
                case "1-4": {
                    this.setState({ level14TimeStats: averageStatsOptions });
                    break;
                }
                case "1-5": {
                    this.setState({ level15TimeStats: averageStatsOptions });
                    break;
                }
                case "2-1": {
                    this.setState({ level21TimeStats: averageStatsOptions });
                    break;
                }
                case "2-2": {
                    this.setState({ level22TimeStats: averageStatsOptions });
                    break;
                }
                case "2-3": {
                    this.setState({ level23TimeStats: averageStatsOptions });
                    break;
                }
                case "2-4": {
                    this.setState({ level24TimeStats: averageStatsOptions });
                    break;
                }
                case "2-5": {
                    this.setState({ level25TimeStats: averageStatsOptions });
                    break;
                }
                case "3-1": {
                    this.setState({ level31TimeStats: averageStatsOptions });
                    break;
                }
                case "3-2": {
                    this.setState({ level32TimeStats: averageStatsOptions });
                    break;
                }
                case "3-3": {
                    this.setState({ level33TimeStats: averageStatsOptions });
                    break;
                }
                case "3-4": {
                    this.setState({ level34TimeStats: averageStatsOptions });
                    break;
                }
                case "4-1": {
                    this.setState({ level41TimeStats: averageStatsOptions });
                    break;
                }
                case "4-2": {
                    this.setState({ level42TimeStats: averageStatsOptions });
                    break;
                }
                case "5-1": {
                    this.setState({ level51TimeStats: averageStatsOptions });
                    break;
                }
            }
        } else if (mode == "stepsTaken") {
            switch (level) {
                case "1-1": {
                    this.setState({ level11StepsStats: averageStatsOptions });
                    break;
                }
                case "1-2": {
                    this.setState({ level12StepsStats: averageStatsOptions });
                    break;
                }
                case "1-3": {
                    this.setState({ level13StepsStats: averageStatsOptions });
                    break;
                }
                case "1-4": {
                    this.setState({ level14StepsStats: averageStatsOptions });
                    break;
                }
                case "1-5": {
                    this.setState({ level15StepsStats: averageStatsOptions });
                    break;
                }
                case "2-1": {
                    this.setState({ level21StepsStats: averageStatsOptions });
                    break;
                }
                case "2-2": {
                    this.setState({ level22StepsStats: averageStatsOptions });
                    break;
                }
                case "2-3": {
                    this.setState({ level23StepsStats: averageStatsOptions });
                    break;
                }
                case "2-4": {
                    this.setState({ level24StepsStats: averageStatsOptions });
                    break;
                }
                case "2-5": {
                    this.setState({ level25StepsStats: averageStatsOptions });
                    break;
                }
                case "3-1": {
                    this.setState({ level31StepsStats: averageStatsOptions });
                    break;
                }
                case "3-2": {
                    this.setState({ level32StepsStats: averageStatsOptions });
                    break;
                }
                case "3-3": {
                    this.setState({ level33StepsStats: averageStatsOptions });
                    break;
                }
                case "3-4": {
                    this.setState({ level34StepsStats: averageStatsOptions });
                    break;
                }
                case "4-1": {
                    this.setState({ level41StepsStats: averageStatsOptions });
                    break;
                }
                case "4-2": {
                    this.setState({ level42StepsStats: averageStatsOptions });
                    break;
                }
                case "5-1": {
                    this.setState({ level51StepsStats: averageStatsOptions });
                    break;
                }
            }
        }
        

        //stores data for graph render
        console.log(data)
        averageOptions.data[0].dataPoints[0] = { label: "Average", y: averageStatsOptions.average, indexLabel: "Average: " + averageStatsOptions.average };
        for (let i = 1; i < totalStudents + 1; i++) {
            //sets average bar on the graph
            averageOptions.axisY.scaleBreaks.customBreaks[0].startValue = averageStatsOptions.average;
            averageOptions.axisY.scaleBreaks.customBreaks[0].endValue = averageStatsOptions.average + 0.01;
            averageOptions.data[0].dataPoints[i] = { label: data[i - 1].name, y: averageList[i - 1], indexLabel:  (i - 1 === highestIndex ? "Highest: " + averageList[i - 1] : "") + (i - 1 === lowestIndex ? "Lowest: " + averageList[i - 1] : "") };
        }

        return averageOptions;
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

        return averageStatsOptions;
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
                        <Row>
                            <Tabs unmountOnExit={true} id="reports" className="mb-3">
                                <Tab eventKey="overviewAttempts" title="Average Attempts">
                                    <CanvasJSChart options={this.state.attemptsOptions} className="mb-3" />
                                    <Row>
                                        <Col className="mt-3">
                                            <p>Highest Average Amount of Attempts Taken: {this.state.attemptsStats.highest}</p>
                                            <p>Lowest Average Amount of Attempts Taken: {this.state.attemptsStats.lowest}</p>
                                            <p>Average Amount of Attempts Taken: {this.state.attemptsStats.average}</p>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="overviewTime" title="Average Time">
                                    <CanvasJSChart options={this.state.timeOptions} />
                                    <Row>
                                        <Col className="mt-3">
                                            <p>Highest Amount of Time Taken: {this.state.timeStats.highest}</p>
                                            <p>Lowest Amount of Time Taken: {this.state.timeStats.lowest}</p>
                                            <p>Average Amount of Time Taken: {this.state.timeStats.average}</p>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="overviewSteps" title="Average Steps">
                                    <CanvasJSChart options={this.state.stepsOptions} />
                                    <Row>
                                        <Col className="mt-3">
                                            <p>Highest Amount of Steps Taken: {this.state.stepsStats.highest}</p>
                                            <p>Lowest Amount of Steps Taken: {this.state.stepsStats.lowest}</p>
                                            <p>Average Amount of Steps Taken: {this.state.stepsStats.average}</p>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Row>
                        <Row className="mt-4 justify-content-center align-items-center text-center">
                            <h4 className="mb-3">Individual Levels</h4>
                            <hr
                                style={{
                                    color: "#0275d8",
                                    width: '5em'
                                }}
                            />
                        </Row>
                        <Row>
                            <Tabs unmountOnExit={true} id="individualLevelReport" className="mb-3">
                                <Tab eventKey="1-1" title="1-1">
                                    <Tabs unmountOnExit={true} id="individualLevelReport1-1" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level11AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level11AttemptsStats.highest} by {this.state.level11AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level11AttemptsStats.lowest} by {this.state.level11AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level11AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level11TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level11TimeStats.highest} by {this.state.level11TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level11TimeStats.lowest} by {this.state.level11TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level11TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level11StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level11StepsStats.highest} by {this.state.level11StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level11StepsStats.lowest} by {this.state.level11StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level11StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="1-2" title="1-2">
                                    <Tabs unmountOnExit={true} id="individualLevelReport1-2" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level12AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level12AttemptsStats.highest} by {this.state.level12AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level12AttemptsStats.lowest} by {this.state.level12AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level12AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level12TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level12TimeStats.highest} by {this.state.level12TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level12TimeStats.lowest} by {this.state.level12TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level12TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level12StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level12StepsStats.highest} by {this.state.level12StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level12StepsStats.lowest} by {this.state.level12StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level12StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="1-3" title="1-3">
                                    <Tabs unmountOnExit={true} id="individualLevelReport1-3" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level13AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level13AttemptsStats.highest} by {this.state.level13AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level13AttemptsStats.lowest} by {this.state.level13AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level13AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level13TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level13TimeStats.highest} by {this.state.level13TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level13TimeStats.lowest} by {this.state.level13TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level13TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level13StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level13StepsStats.highest} by {this.state.level13StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level13StepsStats.lowest} by {this.state.level13StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level13StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="1-4" title="1-4">
                                    <Tabs unmountOnExit={true} id="individualLevelReport1-4" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level14AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level14AttemptsStats.highest} by {this.state.level14AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level14AttemptsStats.lowest} by {this.state.level14AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level14AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level14TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level14TimeStats.highest} by {this.state.level14TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level14TimeStats.lowest} by {this.state.level14TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level14TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level14StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level14StepsStats.highest} by {this.state.level14StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level14StepsStats.lowest} by {this.state.level14StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level14StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="1-5" title="1-5">
                                    <Tabs unmountOnExit={true} id="individualLevelReport1-5" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level15AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level15AttemptsStats.highest} by {this.state.level15AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level15AttemptsStats.lowest} by {this.state.level15AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level15AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level15TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level15TimeStats.highest} by {this.state.level15TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level15TimeStats.lowest} by {this.state.level15TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level15TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level15StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level15StepsStats.highest} by {this.state.level15StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level15StepsStats.lowest} by {this.state.level15StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level15StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="2-1" title="2-1">
                                    <Tabs unmountOnExit={true} id="individualLevelReport2-1" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level21AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level21AttemptsStats.highest} by {this.state.level21AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level21AttemptsStats.lowest} by {this.state.level21AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level21AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level21TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level21TimeStats.highest} by {this.state.level21TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level21TimeStats.lowest} by {this.state.level21TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level21TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level21StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level21StepsStats.highest} by {this.state.level21StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level21StepsStats.lowest} by {this.state.level21StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level21StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="2-2" title="2-2">
                                    <Tabs unmountOnExit={true} id="individualLevelReport2-2" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level22AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level22AttemptsStats.highest} by {this.state.level22AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level22AttemptsStats.lowest} by {this.state.level22AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level22AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level22TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level22TimeStats.highest} by {this.state.level22TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level22TimeStats.lowest} by {this.state.level22TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level22TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level22StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level22StepsStats.highest} by {this.state.level22StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level22StepsStats.lowest} by {this.state.level22StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level22StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="2-3" title="2-3">
                                    <Tabs unmountOnExit={true} id="individualLevelReport2-3" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level23AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level23AttemptsStats.highest} by {this.state.level23AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level23AttemptsStats.lowest} by {this.state.level23AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level23AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level23TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level23TimeStats.highest} by {this.state.level23TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level23TimeStats.lowest} by {this.state.level23TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level23TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level23StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level23StepsStats.highest} by {this.state.level23StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level23StepsStats.lowest} by {this.state.level23StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level23StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="2-4" title="2-4">
                                    <Tabs unmountOnExit={true} id="individualLevelReport2-4" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level24AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level24AttemptsStats.highest} by {this.state.level24AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level24AttemptsStats.lowest} by {this.state.level24AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level24AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level24TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level24TimeStats.highest} by {this.state.level24TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level24TimeStats.lowest} by {this.state.level24TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level24TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level24StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level24StepsStats.highest} by {this.state.level24StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level24StepsStats.lowest} by {this.state.level24StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level24StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="2-5" title="2-5">
                                    <Tabs unmountOnExit={true} id="individualLevelReport2-5" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level25AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level25AttemptsStats.highest} by {this.state.level25AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level25AttemptsStats.lowest} by {this.state.level25AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level25AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level25TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level25TimeStats.highest} by {this.state.level25TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level25TimeStats.lowest} by {this.state.level25TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level25TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level25StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level25StepsStats.highest} by {this.state.level25StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level25StepsStats.lowest} by {this.state.level25StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level25StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="3-1" title="3-1">
                                    <Tabs unmountOnExit={true} id="individualLevelReport3-1" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level31AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level31AttemptsStats.highest} by {this.state.level31AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level31AttemptsStats.lowest} by {this.state.level31AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level31AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level31TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level31TimeStats.highest} by {this.state.level31TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level31TimeStats.lowest} by {this.state.level31TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level31TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level31StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level31StepsStats.highest} by {this.state.level31StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level31StepsStats.lowest} by {this.state.level31StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level31StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="3-2" title="3-2">
                                    <Tabs unmountOnExit={true} id="individualLevelReport3-2" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level32AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level32AttemptsStats.highest} by {this.state.level32AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level32AttemptsStats.lowest} by {this.state.level32AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level32AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level32TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level32TimeStats.highest} by {this.state.level32TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level32TimeStats.lowest} by {this.state.level32TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level32TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level32StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level32StepsStats.highest} by {this.state.level32StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level32StepsStats.lowest} by {this.state.level32StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level32StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="3-3" title="3-3">
                                    <Tabs unmountOnExit={true} id="individualLevelReport3-3" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level33AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level33AttemptsStats.highest} by {this.state.level33AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level33AttemptsStats.lowest} by {this.state.level33AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level33AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level33TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level33TimeStats.highest} by {this.state.level33TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level33TimeStats.lowest} by {this.state.level33TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level33TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level33StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level33StepsStats.highest} by {this.state.level33StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level33StepsStats.lowest} by {this.state.level33StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level33StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="3-4" title="3-4">
                                    <Tabs unmountOnExit={true} id="individualLevelReport3-4" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level34AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level34AttemptsStats.highest} by {this.state.level34AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level34AttemptsStats.lowest} by {this.state.level34AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level34AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level34TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level34TimeStats.highest} by {this.state.level34TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level34TimeStats.lowest} by {this.state.level34TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level34TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level34StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level34StepsStats.highest} by {this.state.level34StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level34StepsStats.lowest} by {this.state.level34StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level34StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="4-1" title="4-1">
                                    <Tabs unmountOnExit={true} id="individualLevelReport4-1" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level41AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level41AttemptsStats.highest} by {this.state.level41AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level41AttemptsStats.lowest} by {this.state.level41AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level41AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level41TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level41TimeStats.highest} by {this.state.level41TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level41TimeStats.lowest} by {this.state.level41TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level41TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level41StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level41StepsStats.highest} by {this.state.level41StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level41StepsStats.lowest} by {this.state.level41StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level41StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="4-2" title="4-2">
                                    <Tabs unmountOnExit={true} id="individualLevelReport4-2" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level42AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level42AttemptsStats.highest} by {this.state.level42AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level42AttemptsStats.lowest} by {this.state.level42AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level42AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level42TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level42TimeStats.highest} by {this.state.level42TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level42TimeStats.lowest} by {this.state.level42TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level42TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level42StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level42StepsStats.highest} by {this.state.level42StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level42StepsStats.lowest} by {this.state.level42StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level42StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                                <Tab eventKey="5-1" title="5-1">
                                    <Tabs unmountOnExit={true} id="individualLevelReport5-1" className="mb-3">
                                        <Tab eventKey="attempts" title="Attempts">
                                            <CanvasJSChart options={this.state.level51AttemptsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Attempts Taken: {this.state.level51AttemptsStats.highest} by {this.state.level51AttemptsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Attempts Taken: {this.state.level51AttemptsStats.lowest} by {this.state.level51AttemptsStats.lowestPerson}</p>
                                                    <p>Average Amount of Attempts Taken: {this.state.level51AttemptsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="timeTaken" title="Time Taken">
                                            <CanvasJSChart options={this.state.level51TimeOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Time Taken: {this.state.level51TimeStats.highest} by {this.state.level51TimeStats.highestPerson}</p>
                                                    <p>Lowest Amount of Time Taken: {this.state.level51TimeStats.lowest} by {this.state.level51TimeStats.lowestPerson}</p>
                                                    <p>Average Amount of Time Taken: {this.state.level51TimeStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="stepsTaken" title="Steps Taken">
                                            <CanvasJSChart options={this.state.level51StepsOptions} />
                                            <Row>
                                                <Col className="mt-3">
                                                    <p>Highest Amount of Steps Taken: {this.state.level51StepsStats.highest} by {this.state.level51StepsStats.highestPerson}</p>
                                                    <p>Lowest Amount of Steps Taken: {this.state.level51StepsStats.lowest} by {this.state.level51StepsStats.lowestPerson}</p>
                                                    <p>Average Amount of Steps Taken: {this.state.level51StepsStats.average}</p>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Tab>

                            </Tabs>
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

export default Report;