import React from 'react'
import { Container, Table, Button, Row } from 'react-bootstrap'

class SubmissionsStudent extends React.Component {
    state = {
        students:  [
            {
                id: 1
            }
        ],
        rows: 0,
        clickedEntry: 0
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        //load all submissions then display them as tables
        const dataResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/assess/getAllSubmissionsStudent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.props.email })
        });

        let data = await dataResponse.json();
        data = this.sortLevels(data);
        this.setState({ students: data.students });

        //this.setState(await dataResponse.json());
    }

    sortLevels(dataParam) {
        let levels = ['1-1', '1-2', '1-3', '1-4', '1-5', '2-1', '2-2', '2-3', '2-4', '2-5', '3-1', '3-2', '3-3', '3-4', '4-1', '4-2', '5-1'];
        
        //dataParam = {students: [{solutions: [{levelID: '1-1'}]}]}
        //remove level 0-0 from dataParam.students[i].solutions array
        for (let j = 0; j < dataParam.students.solutions.length; j++) {
            if (dataParam.students.solutions[j].levelID == '0-0') {
                dataParam.students.solutions.splice(j, 1);
            }
        }

        dataParam.students.solutions.sort(function (a, b) {
            return levels.indexOf(a.levelID) - levels.indexOf(b.levelID);
        });
        //console.log(dataParam.students);
        return dataParam;
    }

    renderTableHeaderSubmissions() {
        let headerElement = ['level id', 'view']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableDataSubmissions() {
        if (this.state.students.solutions) {
            const { _id } = this.state.students;
            return this.state.students.solutions.map((student, index) => {
                const { levelID } = student;
                return (
                    <tr key={index}>
                        <td>{student.levelID}</td>
                        <td>
                            <Button variant="primary" href={ `https://${process.env.REACT_APP_WEBSITE_ADDRESS}/solutions/` + _id + "/" + levelID}>
                                View
                            </Button>
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <div className="border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '2em' }}>
                <Container className="container h-100">
                    <Row className="mt-4 justify-content-center align-items-center text-center">
                        <h4 className="mb-3">Submissions</h4>
                        <hr
                            style={{
                                color: "#0275d8",
                                width: '5em'
                            }}
                        />
                    </Row>
                    <Table striped bordered hover id='students' className="mt-2">
                        <tbody>
                        <tr>{this.renderTableHeaderSubmissions()}</tr>
                            {this.renderTableDataSubmissions()}
                        </tbody>
                    </Table>
                </Container>
                
            </div>
        )
    }
}

export default SubmissionsStudent;