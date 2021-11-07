import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        accountType: ''
    }

    async verifyTutorOrStudent(email) {
        console.log(email)
        const response = await fetch(`https://${process.env.REACT_APP_SERVER_ADDRESS}/users/getUserType`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
        });

        const data = await response.json();
        console.log(data);
        this.setState({
            accountType: data.userType
        })
    }

    async componentDidMount() {
        const { email } = this.props;
        await this.verifyTutorOrStudent(email);
    }

    render() {
        const { isValidated } = this.props;
        console.log(this.props);

        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/dashboard">Byte Harvester Assessment Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {this.state.accountType == "Tutor" && <Nav.Link href="/submissions">Submissions</Nav.Link>}
                        {this.state.accountType == "Tutor" && <Nav.Link href="/report">Reports</Nav.Link>}
                    </Nav>
                    <Nav>
                        {!isValidated && <Nav.Link href="/login">Login</Nav.Link>}
                        {!isValidated && <Nav.Link href="/register">Register</Nav.Link>}
                        {isValidated && <Nav.Link href="/profile">Profile</Nav.Link>}
                        {isValidated && <Nav.Link onClick={() => { console.log('logging out'); this.props.logout() }}>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
    }
}

export default NavigationBar;