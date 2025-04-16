import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Col, Container, Row, Alert } from 'react-bootstrap';
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isError, setIsError] = useState(false); // State for error tracking
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await fetch('https://blogers-backend.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                localStorage.setItem('access_token', result.access_token);
                console.log(localStorage.getItem('access_token'));
    
                setMessage('Sign-in successful');
                setShowAlert(true);
                setIsError(false);
    
                // Redirect to the homepage after a brief delay (optional)
                setTimeout(() => {
                    navigate('/');
                }, 1000); // Optional delay to show the success message before redirecting
            } else {
                setMessage(result.message || 'Error signing in');
                setShowAlert(true);
                setIsError(true);
            }
        } catch (error) {
            setMessage('An error occurred');
            setShowAlert(true);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
          easing: "ease-in-out",
        });
      }, []);

    return (
        <Container className="justify-content-center mb-5 mt-5 p-1">
            <Row className="text-center" data-aos="fade-right" data-wow-duration="800">
                <h2 className=''>Sign In</h2>
            </Row>
            <Row className="justify-content-center mb-5">
                <Col xs={12} md={6} className=" mt-5" data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
                    <Card className="rounded-5">
                        <Card.Body className="p-5">
                            <Card.Title className=" mb-4">Sign In</Card.Title>

                            {showAlert && (
                                <Alert variant={isError ? "danger" : "success"} className="mt-3">
                                    {message}
                                </Alert>
                            )}

                            <Form onSubmit={handleSignIn}>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label className='unbounded-uniquifier-h1'>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label className='unbounded-uniquifier-h1'>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="" type="submit" className="mt-3 all-button" disabled={isLoading}>
                                    {isLoading ? "Signing In..." : "Sign In" }
                                </Button>
                                {!showAlert && <p className="mt-3">{message}</p>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className=" text-center mb-5" data-aos="fade-right" data-aos-duration="800" data-aos-delay="200" >
                <p>If you don't have an account <a href="/register"> Go here</a></p>
            </Row>
        </Container>
    );
}

export default SignIn;
