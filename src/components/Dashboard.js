import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Dashboard = ({ email }) => {
    const [userType, setUserType] = useState();

    useEffect(() => {
        async function verifyTutorOrStudent(email) {
            //console.log(email)
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
            //console.log(data);
            return data.userType;
        }

        verifyTutorOrStudent(email).then(data => {
            setUserType(data);
        });
    }, []);

    return (
        <div className="border border-primary mt-4 mx-auto" style={{ width: '70%', paddingBottom: '1.5em' }}>
            <Container>
                <Row className="mt-4 justify-content-center align-items-center text-center">
                    <h4 className="mb-3">Dashboard</h4>
                    <hr
                        style={{
                            color: "#0275d8",
                            width: '5em'
                        }}
                    />
                </Row>
                <Row className="justify-content-center align-items-center text-center">
                    <Col>
                        {userType == "Student" && <span>Welcome to the assessment portal. Here you can view your submissions.</span>}
                        {userType == "Tutor" && <span>Welcome to the assessment portal. Here you can view your student's submissions and assess them, as well as seeing the statistics of your student's submissions.</span>}
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default Dashboard;