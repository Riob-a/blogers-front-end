import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Image, Button, Carousel, Card } from "react-bootstrap";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="about">
      {/* About Section */}
      <Container className="py-5 justify-content-center mb-5 mt-5">
        <Row className="gy-5">
          <Col xs={12} md={6} style={{ padding: "20px" }} >
            <h1 className="text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="0">About </h1>
            <hr data-aos="fade-up" data-aos-duration="800" data-aos-delay="0" />
            <p className="about-p" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              Whether you're a seasoned writer or just starting your journey, <strong>blogers'</strong> provides a welcoming space for you to express yourself.
            </p>
            <br />
            <p data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <strong className="strong">Write & Share: </strong> Publish your thoughts and ideas in an engaging way.
            </p>
            <p data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
              <strong className="strong">Discover & Learn: </strong> Explore blogs from a diverse community of writers.
            </p>
            <p data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
              <strong className="strong">Engage & Connect: </strong> Like, comment, and discuss with fellow bloggers.
            </p>
            <br />
            <Button
              className=" all-button mt-3"
              href="/register"
              data-aos="fade-up" data-aos-duration="800" data-aos-delay="500"
              
            >
              Get Started <FaArrowRight />
            </Button>
          </Col>

          <Col xs={12} md={6} style={{ border: "2px solid #fbfbc4", padding: "20px" , borderRadius: "20px"}} className="text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <h3 className="about-logo text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              <a href="/" className="a" > blogers<b id="i">'</b></a>
            </h3>
            <br />
            <p id="" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">For more information, contact us at:</p>
            <Button className="all-button" href="mailto:" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" style={{ border: "1px solid #fbfbc452" }}
            >blogers@email</Button>
          </Col>
        </Row>
      </Container>

      {/* Key Features */}
      <Container className="features-section py-5 mb-4">
        <h2 className="text-center wow fadeInUp" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">Why Join Us?</h2>
        <Row className="mt-4 gy-4">
          <Col xs={12} md={4} className="text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <h4>Engaging Content</h4>
            <p>Explore a wide range of blogs, from tech and lifestyle to personal experiences.</p>
          </Col>
          <Col xs={12} md={4} className="text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <h4>Community Engagement</h4>
            <p>Connect with like-minded bloggers, share feedback, and grow together.</p>
          </Col>
          <Col xs={12} md={4} className="text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
            <h4>User-Friendly Interface</h4>
            <p>Enjoy a seamless experience with easy-to-use writing and reading tools.</p>
          </Col>
        </Row>
      </Container>

      {/* Testimonials */}
      <Container className="testimonials-section py-5 bg-dark text-white text-center rounded-5">
        <h2 className="" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">What Our Users Say</h2>
        <Carousel className="mt-4 p-5" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
          <Carousel.Item>
            <p>"This platform has inspired me to write more and share my thoughts with the world!" – Jane Doe</p>
          </Carousel.Item>
          <Carousel.Item>
            <p>"I’ve discovered so many amazing bloggers here. Truly a great community!" – John Smith</p>
          </Carousel.Item>
          <Carousel.Item>
            <p>"The writing and submission process is so smooth. Love the engagement!" – Maria Lopez</p>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Call to Action */}
      <Container className="cta-section py-5 text-center mb-5">
        <h2 className="" data-aos="fade-up" data-aos-duration="800" data-aos-delay="">Ready to Share Your Voice?</h2>
        <br />
        <Button
          className="all-button"
          data-aos="fade-up" data-aos-duration="800" data-aos-delay="200"
          href="/register"
        >
          Join Now <FaArrowRight />
        </Button>
      </Container>

    </div>
  );
};

export default About;
