import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import DOMPurify from "dompurify";
import axios from "axios";
import './page.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [updateMessage, setUpdateMessage] = useState("");
    const [posts, setPosts] = useState([]); // Store user's posts

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should happen only once
            easing: "ease-in-out", // Animation easing
        });
    }, []);

    useEffect(() => {
        const fetchProfileAndPosts = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setError("Unauthorized. Please log in.");
                setLoading(false);
                setTimeout(() => navigate("/"), 1500);
                return;
            }

            try {
                // Fetch user profile
                const profileResponse = await axios.get("http://127.0.0.1:5000/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(profileResponse.data);
                setUsername(profileResponse.data.username);
                setEmail(profileResponse.data.email);

                // Fetch user's blog posts
                const postsResponse = await axios.get("http://127.0.0.1:5000/api/user/posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPosts(postsResponse.data); // Assuming response contains an array of posts
            } catch (err) {
                if (err.response?.status === 401) {
                    // setError("Session expired. Redirecting to login...");
                    localStorage.removeItem("access_token");
                    toast.error("Session expired. Please log in again.");
                    setTimeout(() => navigate("/"), 1500);
                } else {
                    setError("Failed to fetch data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndPosts();
    }, [navigate]);

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("access_token");

        if (!token) {
            toast.error("Unauthorized. Please log in.");
            setTimeout(() => navigate("/"), 1500);
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        if (profileImage) {
            formData.append("profile_image", profileImage);
        }

        try {
            const response = await axios.patch(
                "http://127.0.0.1:5000/api/profile/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUser(response.data);
            setUpdateMessage("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
                localStorage.removeItem("access_token");
                navigate("/login");
            } else {
                setUpdateMessage("Failed to update profile.");
            }
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5 mb-5">
            <h2>User Profile</h2>
            <hr />
            <div className="card p-3" data-aos="fade-up" data-aos-duration="800">
                <div className="text-center m-4">
                    {user.profile_image ? (
                        <img
                            src={user.profile_image}
                            alt="Profile"
                            className="profile-image"
                            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                        />
                    ) : (
                        <div>No Profile Image</div>
                    )}
                </div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Created:</strong> {user.created_at}</p>

                <hr />
                
                <div className="text-center">
                    <button onClick={() => setIsEditing(!isEditing)} className="all-button ">
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                <div className={`edit-form-container ${isEditing ? "expanded" : ""}`}>

                    {isEditing && (
                        <form onSubmit={handleUpdateProfile} className="mt-4">
                            <div className="mb-3">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button type="submit" className="all-button">Update Profile</button>
                        </form>
                    )}
                </div>

                {updateMessage && <p className="mt-3 text-info">{updateMessage}</p>}
            </div>

            {/* Your Posts Section */}
            {/* <h2 className="mt-4">Your Posts</h2>
            <Card className=" p-3">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="border-bottom pb-2 mb-2">
                            <h5>{post.title}</h5>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content).substring(0, 100) + "..." }} />
                            <button
                                // href={`/post/${post.id}`}
                                onClick={() => navigate(`/post/${post.id}`)}
                                className="small  p-1"
                            >
                                Read More
                            </button>
                        </div>
                    ))
                ) : (
                    <Card.Text>No posts available.</Card.Text>
                )}
            </Card> */}
        </div>
    );
};

export default Profile;
