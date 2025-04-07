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
