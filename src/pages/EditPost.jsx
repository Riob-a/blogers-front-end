import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./page.css";
import { Button, Form, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
          easing: "ease-in-out",
        });
      }, []);
    
      const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],     
        [{ font: [] }],                            
        [{ size: ['small', false, 'large', 'huge'] }], 
        ['bold', 'italic', 'underline', 'strike'], 
        [{ color: [] }, { background: [] }],        
        [{ script: 'sub' }, { script: 'super' }],   
        [{ list: 'ordered' }, { list: 'bullet' }],  
        [{ indent: '-1' }, { indent: '+1' }],       
        [{ align: [] }],                            
        ['blockquote', 'code-block'],              
        ['link', 'image', 'video'],                 
        ['clean'] 
        ]
      };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get(`http://127.0.0.1:5000/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                toast.error("Failed to load the post.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");

        try {
            await axios.put(`http://127.0.0.1:5000/api/posts/${id}`, {
                title,
                content,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            toast.success("Post updated successfully!");
            navigate("/my-posts");
        } catch (err) {
            toast.error("Failed to update post.");
        }
    };

    if (loading) return (
        <Container className="mt-5 text-center">
          <Spinner animation="border" style={{ color: "#ffffe3" }} />
          <p>Loading ...</p>
        </Container>
      );

    return (
        <Container className="mt-5">
            <h3>Edit Post</h3>
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <ReactQuill value={content} onChange={setContent} modules={modules}/>
                </Form.Group>

                <Button variant="" type="submit" className="all-button">Update Post</Button>
            </Form>
        </Container>
    );
};

export default EditPost;
