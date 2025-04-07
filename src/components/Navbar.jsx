import { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import "./components.css"; 

function BasicExample() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await axios.get("http://127.0.0.1:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
      }
    };

    fetchUserProfile();
    const handleStorageChange = () => {
      fetchUserProfile();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogoClick = (event) => {
    event.preventDefault();
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setMessage("Logged out successfully.");  
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${expanded ? "navbar-expanded" : "navbar-collapsed"} py-1 px-1`}
    >
      <Container>
        <Navbar.Brand
          className="fs-6 fw-bold me-3 logo"
          onClick={handleLogoClick}
          onDoubleClick={() => navigate("/")}
        >
          blogers<b id="i">'</b>
          <FaChevronRight className={`ms-2 arrow-icon small ${expanded ? "open" : ""}`} />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className={`justify-content-end  ${expanded ? "show" : "hide"}`}>
          <Nav className="me-auto ">
            <Nav.Link href="/" className="fs-6 px-2">Home</Nav.Link>
            <Nav.Link href="/dashboard" className="fs-6 px-2">Dashboard</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="fs-6 px-2">
              <NavDropdown.Item href="/create-post" className="fs-6">Create post</NavDropdown.Item>
              <NavDropdown.Item href="/blogs" className="fs-6">View Blogs</NavDropdown.Item>
              <NavDropdown.Item href="/register" className="fs-6">Join us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="fs-6">Demo</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            {/* Conditionally Render Login/Logout */}
            {!user ? (
              <Nav.Link href="/login" className="fs-6 px-2">Login</Nav.Link>
            ) : (
              // <Nav.Link onClick={handleLogout} className="fs-6 px-2">Logout</Nav.Link>
              <Nav.Link href='/logout' className="fs-6 px-2">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
