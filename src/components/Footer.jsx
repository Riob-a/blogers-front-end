import React, { useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./components.css"; // Ensure styles are applied

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <footer className="custom-footer mt-5" data-aos="fade-up" data-aos-duration="800" >
      <Container>
        <Row className="py-4 text-light">
          {/* Left Section - Logo & Address */}
          <Col md={8}>
            <h4 className="footer-logo mb-4">blogers<b id="i">'</b></h4>
            <p className="mb-1 logo-p">Writting and blogs</p>
            <p className="mb-1 logo-p">CBD, Nairobi</p>
            <p className="mb-1 logo-p">+245 (905) 253-0145</p>
          </Col>

          {/* Middle Section - Navigation Links */}
          <Col md={2} className="text-center footer-text">
            <h5 className="text-uppercase text-muted mb-4">Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="/" className="footer-link">Home</Nav.Link>
              <Nav.Link href="/dashboard" className="footer-link">Dashboard</Nav.Link>
              <Nav.Link href="/create-post" className="footer-link">Create Post</Nav.Link>
              <Nav.Link href="/login" className="footer-link">Login</Nav.Link>
            </Nav>
          </Col>

          {/* Right Section - Social Media */}
          <Col md={2} className="text-center footer-text">
            <h5 className="text-uppercase text-muted mb-4">Social</h5>
            <div className="social-icons">
              <Nav className="flex-column">
                <Nav.Link href="https://facebook.com" className="footer-link"><FaFacebook /> FaceBook</Nav.Link>
                <Nav.Link href="https://twitter.com" className="footer-link"><FaTwitter />Twitter</Nav.Link>
                <Nav.Link href="https://instagram.com" className="footer-link"><FaInstagram />Instagram</Nav.Link>
                <Nav.Link href="https://linkedin.com" className="footer-link"><FaLinkedin />LinkedIn</Nav.Link>
              </Nav>
            </div>
          </Col>
        </Row>
        <hr />

        {/* Copyright Section */}
        <Row>
          <Col className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </Col>
          <Col className="text-end">
            <p className="footer-text text-muted logo">© {new Date().getFullYear()} Blogers<b id="i">'</b>. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
