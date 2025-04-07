import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { Container, Row, Card, Alert, Spinner, Badge, Dropdown, Button } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; 
import AOS from "aos";
import "aos/dist/aos.css";
import './page.css';

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch posts");
        if (err.response?.status === 404 || err.response?.status === 403) {
          localStorage.removeItem("access_token");
          navigate("/");
        }
        setLoading(false);
      });
  }, []);

  const handleLike = async (postId) => {
    if (!token) {
      alert("You need to log in to like a post.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, like_count: response.data.like_count } : post
        )
      );
    } catch (error) {
      alert(error.response?.data.message || "Error liking post");
    }
  };

  const handleUnlike = async (postId) => {
    if (!token) {
      alert("You need to log in to unlike a post.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${postId}/unlike`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, like_count: response.data.like_count } : post
        )
      );
    } catch (error) {
      alert(error.response?.data.message || "Error unliking post");
    }
  };

  const allGenres = ["All", ...new Set(posts.flatMap((post) => post.genres || []))];

  const filteredPosts =
    selectedGenre === "All" ? posts : posts.filter((post) => post.genres?.includes(selectedGenre));

  if (loading)
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" style={{ color: "#ffffe3" }} />
        <p>Loading posts...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="justify-content-center mb-5 blog-page">
      <Row className=" " data-aos="fade-up" data-aos-duration="800">
        <h1 className="mb-2 mt-5 unbounded-uniquifier-header wow fadeInLeft">
          Blog Posts
        </h1>
        <hr />
      </Row>

      {/* Genre Filter Dropdown */}
      <Row className="mb-4 p-2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            {selectedGenre}
          </Dropdown.Toggle>
          <Dropdown.Menu className="drop-menu">
            {allGenres.map((genre, index) => (
              <Dropdown.Item key={index} onClick={() => setSelectedGenre(genre)} className="drop-item">
                {genre}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>

      {/* Filtered Blog Posts */}
      <Row>
        {filteredPosts.length === 0 ? (
          <Alert variant="info" className="unbounded-uniquifier-p">
            No posts available.
          </Alert>
        ) : (
          filteredPosts.map((post) => (
            <Card className="my-3 wow fadeInUp shadow-sm blog-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" key={post.id}>
              <Card.Body>
                <Card.Title className="unbounded-uniquifier-header">
                  {post.title}
                </Card.Title>

                {/* Genres Section */}
                <div className="mb-2">
                  {post.genres?.length > 0 ? (
                    post.genres.map((genre, index) => (
                      <Badge bg="" className="me-1" key={index}>
                        {genre}
                      </Badge>
                    ))
                  ) : (
                    <Badge bg="" text="">No Genre</Badge>
                  )}
                </div>

                <Card.Text className="unbounded-uniquifier-p" dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content).length > 200
                    ? DOMPurify.sanitize(post.content).substring(0, 200) + "..."
                    : DOMPurify.sanitize(post.content)
                }} />

                <Button className="all-button" onClick={() => navigate(`/post/${post.id}`)}>
                  Read More
                </Button>

                {/* Like/Unlike Buttons */}
                <div className="d-flex align-items-center mt-3">
                  <Button  className=" small me-2  like-button" onClick={() => handleLike(post.id)}>
                  <FaThumbsUp className="me-1" />
                  </Button>
                  <Button   className="small like-button" onClick={() => handleUnlike(post.id)}>
                  <FaThumbsDown className="me-1 " /> 
                  </Button> 
                  <span className="ms-2 small">Likes: {post.like_count}</span>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Blogs;
