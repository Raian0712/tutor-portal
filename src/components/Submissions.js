import React from 'react'
import { Container, Table, Button, Row } from 'react-bootstrap'
import LoadingPage from './LoadingPage';

class Submissions extends React.Component {
    state = {
        showPage: false,
        students: [
            {
                id: 1
            }
        ],
        rows: 0,
        clickedEntry: 0,
        isModalOpen: false
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
        if (accData.userType == "Tutor") {
            //load all submissions then display them as tables
            const dataResponse = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/assess/getAll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.props.tutorEmail })
            });

            //const data = await dataResponse.json();
            //this.setState({ students: data });

            this.setState(await dataResponse.json());
            this.setState({ showPage: true });
            console.log(this.state);
        } else {
            //redirects user back to previous pages
            window.location.href = "/dashboard";
        }
    }

    renderTableHeader() {
        let headerElement = ['id', 'name', 'email', 'solutions']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const { id, name, age, email } = student //destructuring
            if (id <= 0) {
                this.setState((prevState, props) => {
                    const row = 0;
                    return { rows: row };
                });
            }
            
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                        <Button variant="primary" onClick={this.handleClearTable(index)}>View</Button>
                    </td>
                </tr>
            )
        })
    }

    renderTableHeaderSubmissions() {
        let headerElement = ['level id', 'view']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableDataSubmissions() {
        let students = this.state.students[this.state.clickedEntry];
        console.log(this.state.clickedEntry);
        return this.state.students[this.state.clickedEntry].solutions.map((solutions, index) => {
            const { _id } = students;
            const { id, levelID } = solutions //destructuring
            if (id <= 0) {
                this.setState((prevState, props) => {
                    const row = 1;
                    return { rows: row };
                });
            }
            
            return (
                <tr key={id}>
                    <td>{levelID}</td>
                    <td>
                        <Button variant="primary" href={ `https://${process.env.REACT_APP_WEBSITE_ADDRESS}/assessment/` + _id + "/" + levelID}>View</Button>
                    </td>
                </tr>
            )
        })
    }
    
    handleClearTable = param => e => {
        this.setState((prevState, props) => {
            return { rows: 1, clickedEntry: param };
        });
    };

    render() {
        if (this.state.showPage) {
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
                        {this.state.rows == 1 && <Button className="mb-3" onClick={() => { this.setState({ rows: 0 }) }}>Back</Button>}
                        <Table striped bordered hover id='students'>
                            <tbody>
                                <tr>{this.state.rows == 0 && this.renderTableHeader()}</tr>
                                {this.state.rows == 0 && this.renderTableData()}

                                <tr>{this.state.rows == 1 && this.renderTableHeaderSubmissions()}</tr>
                                {this.state.rows == 1 && this.renderTableDataSubmissions()}
                            </tbody>
                        </Table>
                    </Container>
                    
                </div>
            );
        }
        return (
            <LoadingPage />
        );    
    }
}

export default Submissions;