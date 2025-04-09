import React, { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronUp, FaChevronDown, FaPaperPlane } from "react-icons/fa";
import "./page.css";

const Home = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
      easing: "ease-in-out", // Animation easing
    });
  }, []);


  return (
    <div className="mb-5">
      <header>
        <section id="home" className="mb-5">
          <div className="container">
            <NavigationBar />
            <h1 className="" data-aos="fade-up" data-aos-duration="800">
              blogers<b id="i" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">'</b>
            </h1>
          </div>
        </section>
      </header>

      <Container className="home-content">
        <Row className="gy-3">  {/* Add gap between rows */}
          {/* Left Column */}
          <Col xs={12} md={6}>
            <Card className="h-100" data-aos="fade-up" data-aos-duration="800">
              <Card.Body>
                <Card.Title>Latest Post</Card.Title>
                <Card.Text>Explore new insights and stories.</Card.Text>
                <Button className="all-button" onClick={() => navigate("/blogs")}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column (Stacked Cards) */}
          <Col xs={12} md={6} className="d-flex flex-column gap-3">
            <Card className="h-100" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              <Card.Body>
                <Card.Title>Dash Board</Card.Title>
                <Card.Text>Share your thoughts with the world</Card.Text>
                <Button className="all-button" onClick={() => navigate("/dashboard")}>
                  Get Started
                </Button>
              </Card.Body>
            </Card>

            <Card className="h-100" data-aos="fade-up" data-aos-duration="800" data-aos-delay="150">
              <Card.Body>
                <Card.Title>Join Us</Card.Title>
                <Card.Text>Register now and start blogging.</Card.Text>
                <Button className="all-button" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12} className=" mt-5" data-aos="fade-up" data-aos-duration="800">
            <Card className={`about-card ${isExpanded ? "expanded" : "collapsed"}`}>
              <Button
                variant=""
                className=" p-1 mb-5 lrn-button  d-flex justify-content-between align-items-center "
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <FaChevronDown className={`arrow-icon ${isExpanded ? "open" : ""} all-button`} />
              </Button>
              <Card.Body>
                <Card.Title as="h3" className="mb-2 text-center" id="disappear2">
                  What is blogers?
                </Card.Title>
                <Card.Title className="mb-2" id="disappear">
                  <h3 className="logo">blogers<b id="i">'</b></h3>
                </Card.Title>
                <Card.Text id="disappear">
                  ...is a platform where you can share your thoughts and
                  ideas with the world. It is a place where you can read and
                  write blogs on various topics.
                </Card.Text>
                <br />
                <Button href="/about" id="disappear" className="all-button mb-5">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
            
          </Col>
          
        </Row>
      </Container>
    </div>
  );
};

export default Home;
