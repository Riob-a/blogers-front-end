import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Alert, Card, Col } from 'react-bootstrap';

function Logout() {
    const[message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:5000/api/logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
    
                    const data = await response.json();
                    setMessage(data.message || "You have been logged out.");
    
                    if (response.ok) {
                        localStorage.removeItem('access_token');
                    }
                } catch (error) {
                    setMessage("An error occurred while logging out.");
                }
            } else {
                setMessage("No active session found.");
            }
    
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
            }, 2000); // Redirect after 2 seconds
        };
    
        performLogout();
    }, [navigate]);

    // const handleLogout = () => {
    //     localStorage.removeItem('access_token'); // Remove token from localStorage
    //     navigate('/'); // Redirect to the login page
    // };

    return (
        <Container className="justify-content-center p-5 mb-5 mt-5 gx-5">
            <Col>
            <Row className="justify-content-center text-center">
                {showAlert && (
                    <Card className="mt-3 " data-aos-duration="1s" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Alert variant="info">
                                {message}
                            </Alert>
                        </Card.Body>
                    </Card>
                )}
            </Row>
            </Col>
        </Container>
    );
}

export default Logout;
