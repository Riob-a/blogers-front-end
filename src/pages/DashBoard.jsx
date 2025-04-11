import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
      AOS.init({
        once: true, // Whether animation should happen only once
        easing: "ease-in-out", // Animation easing
      });
    }, []);

  return (
    <Container className="dashboard mb-5 mt-5 p-1">
      <Row className="text-center gy-3" data-aos="zoom-in" data-aos-duration="900" data-aos-delay="500">
        <Col>
          <h1>Dashboard</h1>
          <p>Manage your profile and blog posts</p>
        </Col>
      </Row>

      <Row className="mt-4 gy-3">
        {/* User Profile Section */}
        <Col xs={12} md={6}>
          <Card className="h-100" data-aos="fade-right" data-aos-duration="700">
            <Card.Body>
              <Card.Title>View Profile</Card.Title>
              <Card.Text>Click the button to view and edit your profile</Card.Text>
              <Button variant="" className="all-button" onClick={() => navigate("/profile")}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Create a Blog Post Section */}
        <Col xs={12} md={6}>
          <Card className="h-100" data-aos="fade-left" data-aos-duration="700">
            <Card.Body>
              <Card.Title>Create a Blog Post</Card.Title>
              <Card.Text>Write and share your thoughts.</Card.Text>
              <Button variant="" className="all-button" onClick={() => navigate("/create-post")}>
                New Post
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 mb-4 gy-3">
        <Col xs={12}>
          <Card className="h-100" data-aos="fade-up" data-aos-duration="700" data-aos-delay="100">
            <Card.Body>
              <Card.Title>Recent Posts</Card.Title>
              <Card.Text>Manage your latest blog posts.</Card.Text>
              <Button variant="" className="all-button" onClick={() => navigate("/my-posts")}>
                View Posts
              </Button>
            </Card.Body></Card></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
