import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AOS from "aos";
import "aos/dist/aos.css";
import "./page.css";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genres, setGenres] = useState([]); // State to store selected genres
  const [genreInput, setGenreInput] = useState(''); // Input for adding new genres
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

 

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],     // Headers
    [{ font: [] }],                             // Font options
    [{ size: ['small', false, 'large', 'huge'] }], // Font size
    ['bold', 'italic', 'underline', 'strike'],  // Basic formatting
    [{ color: [] }, { background: [] }],        // Font color and background
    [{ script: 'sub' }, { script: 'super' }],   // Subscript/superscript
    [{ list: 'ordered' }, { list: 'bullet' }],  // Lists
    [{ indent: '-1' }, { indent: '+1' }],       // Indentation
    [{ align: [] }],                            // Text alignment
    ['blockquote', 'code-block'],               // Blockquote & code
    ['link', 'image', 'video'],                 // Media
    ['clean'] 
    ]
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !genres.includes(genreInput.trim())) {
      setGenres([...genres, genreInput.trim()]);
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genre) => {
    setGenres(genres.filter(g => g !== genre));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const token = localStorage.getItem('access_token');

    if (!token) {
      setError('You need to be logged in to create a post');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, genres }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      setSuccessMessage('Post created successfully!');
      setTitle('');
      setGenres([]); // Clear genres
      setContent('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4 mb-2 p-1">
      <Card className="p-3 create-post" data-aos="fade-left" data-aos-duration="800">
        <h3 className="text-center mt-3">Create a Post</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="p-1">Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="p-3">Post Content</Form.Label>
            <ReactQuill
            className='quill-editor'
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              // style={{ height: '200px', marginBottom: '20px' }}
            />
          </Form.Group>

          {/* Genre Input */}
          <Form.Group className="mb-3">
            <Form.Label className="p-4">Genres</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Enter genre"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
              />
              <Button className="ms-2 all-button" onClick={handleAddGenre}>
                Add
              </Button>
            </div>
            <div className="mt-2">
              {genres.map((genre, index) => (
                <span key={index} className="badge bg- me-2">
                  {genre} <span style={{ cursor: 'pointer' }} onClick={() => handleRemoveGenre(genre)}>✖</span>
                </span>
              ))}
            </div>
          </Form.Group>

          <Button className="all-button" type="submit">
            Publish
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default CreatePost;
