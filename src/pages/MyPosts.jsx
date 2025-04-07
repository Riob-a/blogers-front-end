import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import DOMPurify from "dompurify";
import axios from "axios";
import { toast } from "react-toastify";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setError("Unauthorized. Please log in.");
                setLoading(false);
                setTimeout(() => navigate("/"), 2000);
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:5000/api/user/posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    toast.error("Session expired. Redirecting to login...");
                    localStorage.removeItem("access_token");
                    setTimeout(() => navigate("/"), 2000);
                } else {
                    setError("Failed to fetch posts.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [navigate]);

    const handleDelete = async (postId) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError("Unauthorized.Please Log in.");
            return;
        }
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.status === 200) {
                // Successfully deleted, update state
                setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
                toast.success("Post deleted successfully!");
            } else {
                toast.error("Failed to delete post. Please try again.");
            }
        } catch (err) {
            toast.error("An error occurred while deleting the post.");
        }
    };

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className="mt-5 mb-5 p-1">
            <h2>Your Blog Posts</h2>
            <hr />
            <Card className="p-3" data-aos="fade-up" data-aos-duration="800">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="border-bottom pb-2 mb-4">
                            <h5>{post.title}</h5>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content).substring(0, 150) + "..." }} />
                            <Card.Footer>
                            <Button
                                onClick={() => navigate(`/post/${post.id}`)}
                                className="small me-2   mb-4 m-2 all-button"
                            >
                                Read More
                            </Button>
                            <Button
                                className="me-2 small  mb-4 m-2 all-button"
                                // size="sm"
                                onClick={() => handleDelete(post.id)}
                            >
                                Delete
                            </Button>
                            </Card.Footer>
                        </div>
                    ))
                ) : (
                    <Card.Text>No posts available.</Card.Text>
                )}
            </Card>
        </Container>
    );
};

export default MyPosts;
