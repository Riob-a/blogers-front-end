import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { Container, Card, Spinner, Alert, Image, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaChevronUp, FaChevronDown, FaPaperPlane  } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import './page.css';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(null); // Store logged-in user ID
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true, // Whether animation should happen only once
        easing: "ease-out", // Animation easing
      });
    }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .get("https://blogers-backend.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUserId(res.data.id))
        .catch(() => {
          localStorage.removeItem("access_token");
          toast.error("Session expired. Please login again.");
        });
    }
  }, []);

  const fetchComments = () => {
    axios
      .get(`https://blogers-backend.onrender.com/api/comments?post_id=${id}`)
      .then(async (response) => {
        const commentsData = response.data;

        // Fetch user details for each comment
        const usersPromises = commentsData.map((comment) =>
          axios.get(`https://blogers-backend.onrender.com/api/users/${comment.user_id}`).catch(() => null)
        );

        const usersResponses = await Promise.all(usersPromises);

        // Map user details to comments
        const updatedComments = commentsData.map((comment, index) => ({
          ...comment,
          username: usersResponses[index]?.data?.username || "Unknown",
        }));

        setComments(updatedComments);
      })
      .catch(() => toast.error("Failed to fetch comments."));
  };

  useEffect(() => {
    axios
      .get(`https://blogers-backend.onrender.com/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        return axios.get(`https://blogers-backend.onrender.com/api/users/${response.data.user_id}`);
      })
      .then((authorResponse) => {
        setAuthor(authorResponse.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch the post or author.");
        if (err.response?.status === 404 || err.response?.status === 403) {
          localStorage.removeItem("access_token");
          toast.error("Session expired. Please login again.");
          navigate("/");
        }
        setLoading(false);
      });

    fetchComments();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    axios
      .post(
        "https://blogers-backend.onrender.com/api/comments",
        { content: newComment, post_id: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      )
      .then(() => {
        setNewComment("");
        fetchComments();
      })
      .catch(() => toast.error("Failed to submit comment."))
      .finally(() => setSubmitting(false));
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`https://blogers-backend.onrender.com/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      })
      .then(() => {
        toast.success("Comment deleted.");
        fetchComments();
      })
      .catch(() => toast.error("Failed to delete comment."));
  };

  if (loading)
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" style={{ color: "#ffffe3" }} />
        <p>Loading post...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-5">
      <h5>{post.title}</h5>
      <Card className="shadow-lg p-4 mb-4" data-aos="fade-up" data-aos-duration="800">
        <Card.Body>
          {/* <Card.Title></Card.Title> */}

          {author && (
            <div className="d-flex align-items-center mb-3">
              <h5 className="mb-0 small">By</h5>
              {author.profile_image && (
                <Image
                  src={author.profile_image}
                  roundedCircle
                  width={20}
                  height={20}
                  className="mx-2"
                  alt={author.username}
                />
              )}
              <h6 className="mb-0 small blog-header"> {author.username || "Unknown Author"}, </h6>
            </div>
          )}

          <hr />
          <Card.Text className="mb-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
        </Card.Body>
        <Card.Footer className="mb-0   small">\\ {new Date(post.created_at).toDateString()} \\</Card.Footer>
      </Card>

      {/* Comments section */}
      <div className="mt-4 mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
        <h5>Comments ({comments.length})</h5>
        <hr />

        {/* Display comments */}
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="mb-5 p-3" data-aos="fade-up" data-aos-duration="700" data-aos-delay="400">
              <small>
                <strong>{comment.username}</strong><br />
                <hr />
                {comment.content}
              </small>
              <span className="mt-4 small date"> - {new Date(comment.created_at).toLocaleString()}</span>
              {userId === comment.user_id && (
                <Button
                  
                  size="sm"
                  className="ms-2 all-button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </Button>
              )}
            </Card>
          ))
        )}

        {/* Comment Form */}
        <div>
        {userId ? (
          
          <Form onSubmit={handleCommentSubmit} className="mt-4 mb-4 p-1" data-aos="fade-right" data-aos-duration="500" data-aos-delay="600">
          <Form.Group className="d-flex align-items-center gap-2">
            <Form.Control
              className={`comment-box ${isExpanded ? "expanded" : "collapsed"}`}
              as="textarea"
              rows={isExpanded ? 6 : 3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              style={{ flex: 1 }} // Allows textarea to take up remaining space
            />
            <Button
              variant=""
              className="comment-max d-flex align-items-center"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </Form.Group>
          
          <Button type="submit" variant="" className="mt-2 post-b" disabled={submitting}>
            {submitting ? <Spinner animation="border" size=" " /> : <FaPaperPlane />}
          </Button>
        </Form>
        
        ) : (
          <p>Please log in to comment.</p>
        
        )}
        </div>
      </div>
    </Container>
  );
}

export default BlogDetail;
