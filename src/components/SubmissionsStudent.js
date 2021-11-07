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

        const data = await dataResponse.json();
        this.setState({ students: data.students });

        //this.setState(await dataResponse.json());
        console.log(data);
        console.log(this.state)
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