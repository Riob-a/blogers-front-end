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
      .get("https://blogers-backend.onrender.com/api/posts")
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
        `https://blogers-backend.onrender.com/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setPosts((prevPosts) =>
      //   prevPosts.map((post) =>
      //     post.id === postId ? { ...post, like_count: response.data.like_count } : post
      //   )
      // );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data } : post
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
        `https://blogers-backend.onrender.com/api/posts/${postId}/unlike`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setPosts((prevPosts) =>
      //   prevPosts.map((post) =>
      //     post.id === postId ? { ...post, like_count: response.data.like_count } : post
      //   )
      // );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data } : post
        )
      );

    } catch (error) {
      alert(error.response?.data.message || "Error unliking post");
    }
  };

  const handleDislike = async (postId) => {
    if (!token) {
      alert("You need to log in to dislike a post.");
      return;
    }

    try {
      const response = await axios.post(
        `https://blogers-backend.onrender.com/api/posts/${postId}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setPosts((prevPosts) =>
      //   prevPosts.map((post) =>
      //     post.id === postId
      //       ? { ...post, dislike_count: response.data.dislike_count, like_count: response.data.like_count }
      //       : post
      //   )
      // );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data } : post
        )
      );

    } catch (error) {
      alert(error.response?.data.message || "Error disliking post");
    }
  };

  const handleUndislike = async (postId) => {
    if (!token) {
      alert("You need to log in to remove your dislike.");
      return;
    }

    try {
      const response = await axios.delete(
        `https://blogers-backend.onrender.com/api/posts/${postId}/undislike`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setPosts((prevPosts) =>
      //   prevPosts.map((post) =>
      //     post.id === postId
      //       ? { ...post, dislike_count: response.data.dislike_count }
      //       : post
      //   )
      // );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data } : post
        )
      );

    } catch (error) {
      alert(error.response?.data.message || "Error removing dislike");
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
      <Row className="header " data-aos="fade-up" data-aos-duration="800">
        <h1 className="mb-2 mt-5 unbounded-uniquifier-header">
          Blog Posts
        </h1>
        <hr />
      </Row>

      {/* Genre Filter Dropdown */}
      <div className="above ">
        <Row className="mb-4 p-2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <b>Genre:</b> {selectedGenre}
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
      </div>

      {/* Filtered Blog Posts */}
      <Row>
        {filteredPosts.length === 0 ? (
          <Alert variant="info" className="unbounded-uniquifier-p">
            No posts available.
          </Alert>
        ) : (
          filteredPosts.map((post) => (
            <Card className="my-3 blog-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" key={post.id}>
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

                <div className="d-flex justify-content-between align-items-center mt-3">
                  {/* Read More Button */}
                  <Button variant="" className="all-button" onClick={() => navigate(`/post/${post.id}`)}>
                    Read More
                  </Button>

                  {/* Reactions */}
                  <div className="d-flex align-items-center ms-auto">
                    <Button
                      className={`small me-2 like-button ${post.isLiked ? "btn-success" : ""}`}
                      onClick={() => post.isLiked ? handleUnlike(post.id) : handleLike(post.id)}
                    >
                      <FaThumbsUp className="me-1" />
                    </Button>
                    <span className="me-3">{post.like_count}</span>

                    <Button
                      className={`small me-2 like-button ${post.isDisliked ? "btn-danger" : ""}`}
                      onClick={() => post.isDisliked ? handleUndislike(post.id) : handleDislike(post.id)}
                    >
                      <FaThumbsDown className="me-1" />
                    </Button>
                    <span className="me-3">{post.dislike_count}</span>

                    {token && post.isLiked && (
                      <span className="text-success">You liked this</span>
                    )}
                  </div>
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
