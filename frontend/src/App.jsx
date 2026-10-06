import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext.jsx";
import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import MustDoPage from "./pages/MustDoPage";
import MustDoDetail from "./pages/MustDoDetail";
import CommunityPage from "./pages/CommunityPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import { useEffect, useState } from "react";
import useApi from "./hooks/useApi.js";
import posts from "./data/postsData";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          Migrant <span>Hub</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/blog">
            Blog
          </NavLink>

          <NavLink to="/write-post">
            Write a Post
          </NavLink>

          <NavLink to="/must-do">
            Must Do
          </NavLink>

          <NavLink to="/community">
            Community
          </NavLink>

          {isAuthenticated ? (
            <>
              <span className="user-name">
                {user?.displayName || user?.name || user?.email}
              </span>

              <button
                type="button"
                className="login-button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/register">
                Sign up
              </NavLink>

              <Link to="/login" className="login-button">
                Login
              </Link>
            </>
          )}


        </div>

      </div>
    </nav>
  );
}


/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <h3>Migrant Hub</h3>

        <p>
          Helping international students and newcomers settle into life in
          Finland.
        </p>

        <p>© 2026 Migrant Hub</p>

      </div>
    </footer>
  );
}


/* =========================
   HOME
========================= */

function Home() {
  const {
    data: posts,
    loading,
    error,
    request
  } = useApi();

  useEffect(() => {
    request("/posts").catch(() => { });
  }, [request]);

  return (
    <>
      <Navbar />

      <main>

        <section className="hero">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <div className="eyebrow">
              WELCOME TO FINLAND
            </div>

            <h1>
              Everything you need to start
              <br />
              your life in Finland
            </h1>

            <p className="hero-description">
              Find practical information, useful guides, local communities,
              and experiences shared by other international students.
            </p>

            <form
              className="search-box"
              onSubmit={(e) => {
                e.preventDefault();
                const value = e.currentTarget.elements.search.value.trim();
                if (value) {
                  window.location.href = `/search?q=${encodeURIComponent(value)}`;
                }
              }}
            >
              <input
                name="search"
                type="text"
                placeholder="What are you looking for?"
              />

              <button type="submit">
                Search
              </button>
            </form>

            <div className="category-buttons">
              <button onClick={() => (window.location.href = "/search?q=Housing")}>Housing</button>
              <button onClick={() => (window.location.href = "/search?q=Paperwork")}>Paperwork</button>
              <button onClick={() => (window.location.href = "/search?q=Transport")}>Transport</button>
              <button onClick={() => (window.location.href = "/search?q=Food")}>Food</button>
              <button onClick={() => (window.location.href = "/search?q=Study")}>Study</button>
              <button onClick={() => (window.location.href = "/search?q=Community")}>Community</button>
              <button onClick={() => (window.location.href = "/search?q=Places")}>Places</button>
            </div>

          </div>

          <div className="hero-tagline">
            <span>New faces</span>
            <br />
            <span>Similar home</span>

            <div className="heart">
              ♡
            </div>
          </div>

        </section>


        {/* FEATURE STRIP */}

        <section className="feature-strip">

          <div className="feature">

            <div className="feature-icon">
              □
            </div>

            <div>
              <h3>Practical Guides</h3>
              <p>Step by step</p>
            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              ♟
            </div>

            <div>
              <h3>Real Experiences</h3>
              <p>From students</p>
            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              ♡
            </div>

            <div>
              <h3>Supportive Community</h3>
              <p>Connect & belong</p>
            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              ♟
            </div>

            <div>
              <h3>Life in Finland</h3>
              <p>Explore the culture</p>
            </div>

          </div>

        </section>


        {/* LATEST STORIES */}

        <section className="latest-section">

          <div className="section-header">

            <div>

              <div className="eyebrow dark">
                LATEST STORIES
              </div>

              <h2>
                Helpful posts for your journey
              </h2>

            </div>

            <Link
              to="/blog"
              className="view-posts"
            >
              View all posts →
            </Link>

          </div>


          <div className="post-grid">

            {loading && <p>Loading posts...</p>}

            {error && <p>Failed to load posts: {error}</p>}

            {!loading && !error && posts?.length === 0 && (
              <p>No posts available yet.</p>
            )}

            {posts?.slice(0, 3).map((post) => (
              <PostCard
                key={post._id || post.id}
                id={post._id || post.id}
                category={post.category}
                title={post.title}
                description={post.description || post.content}
                tags={post.tags}
              />
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}


/* =========================
   POST CARD
========================= */

function PostCard({
  id,
  category,
  title,
  description,
  tags
}) {
  return (
    <article className="post-card">

      <div className="post-category">
        {category}
      </div>

      <h3>
        {title}
      </h3>

      <div className="post-author">
        By Pratham
      </div>

      <p>
        {description}
      </p>

      <div className="post-tags">
        {tags}
      </div>

      <Link
        to={`/blog/${id}`}
        className="read-more"
      >
        Read more →
      </Link>

    </article>
  );
}


/* =========================
   BLOG
========================= */

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:4000/api/posts");

        if (!response.ok) {
          throw new Error("Failed to load posts");
        }

        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message || "Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="page">

        <h1 className="page-title">
          Stories, guides and experiences
        </h1>

        <p className="page-description">
          Discover practical information and experiences shared by people
          building their lives in Finland.
        </p>

        <div className="blog-header">

          <div>

            <div className="eyebrow dark">
              LATEST POSTS
            </div>

            <h2>
              Explore the community
            </h2>

          </div>

          <Link
            to="/"
            className="back-home"
          >
            ← Back home
          </Link>

        </div>

        {loading && <p>Loading posts...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="post-grid">
            {blogPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                category={post.category}
                title={post.title}
                description={post.aiTeaser || post.body}
                tags={post.tags}
              />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}


/* =========================
   WRITE POST
========================= */

function WritePost() {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [aiTeaser, setAiTeaser] = useState("");
  const [tags, setTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  const wordCount = body.trim()
    ? body.trim().split(/\s+/).length
    : 0;

  const wordsRemaining = Math.max(512 - wordCount, 0);

  const handleGetSuggestions = async () => {
    setError("");

    if (!title.trim() || !body.trim() || !category) {
      setError("Please enter a title, post content, and category first.");
      return;
    }

    if (wordCount > 512) {
      setError("Your post exceeds the 512-word limit.");
      return;
    }

    if (!isAuthenticated || !token) {
      setError("You must be logged in to publish a post.");
      return;
    }

    try {
      setLoadingAI(true);

      const response = await fetch(
        "http://localhost:4000/api/posts/enrich",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            body: body.trim(),
            category,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate AI suggestions."
        );
      }

      setAiTeaser(data.teaser || data.aiTeaser || "");
      setTags(Array.isArray(data.tags) ? data.tags : []);
      setShowSuggestions(true);
    } catch (err) {
      setError(err.message || "Failed to generate AI suggestions.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    setError("");

    if (!title.trim() || !body.trim() || !category) {
      setError("Please enter a title, post content, and category.");
      return;
    }

    if (wordCount > 512) {
      setError("Your post exceeds the 512-word limit.");
      return;
    }

    if (!isAuthenticated || !token) {
      setError("You must be logged in to publish a post.");
      return;
    }

    try {
      setPublishing(true);

      const response = await fetch(
        "http://localhost:4000/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            body: body.trim(),
            category,
            communityId: communityId || null,
            aiTeaser: aiTeaser.trim() || null,
            tags,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to publish the post."
        );
      }

      navigate(`/blog/${data.id}`);
    } catch (err) {
      setError(err.message || "Failed to publish the post.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="write-page">
        <div className="write-heading">
          <div className="eyebrow dark">
            SHARE YOUR EXPERIENCE
          </div>

          <h1>
            Write a post
          </h1>

          <p>
            Share your experience, advice, or useful information with the
            Migrant Hub community.
          </p>
        </div>

        {!isAuthenticated && (
          <p>
            Please log in before publishing a post.
          </p>
        )}

        {user && (
          <p>
            Publishing as <strong>{user.name}</strong>
          </p>
        )}

        <form className="write-form" onSubmit={handlePublish}>
          <label>
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter your post title"
            maxLength={120}
          />

          <label>
            Post
          </label>

          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write your post here..."
          />

          <div className="word-count">
            {wordsRemaining} words remaining
          </div>

          <label>
            Category
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">
              Select a category
            </option>

            <option value="Housing">Housing</option>
            <option value="Paperwork">Paperwork</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="Study">Study</option>
            <option value="Community">Community</option>
            <option value="Places">Places</option>
          </select>

          <label>
            Community
          </label>

          <select
            value={communityId}
            onChange={(event) => setCommunityId(event.target.value)}
          >
            <option value="">
              Select a community
            </option>

            <option value="Helsinki Newcomers Community">
              Helsinki Newcomers Community
            </option>
          </select>

          {error && (
            <p>
              {error}
            </p>
          )}

          <button
            type="button"
            className="publish-button"
            onClick={handleGetSuggestions}
            disabled={loadingAI || publishing}
          >
            {loadingAI
              ? "Generating suggestions..."
              : "Get AI suggestions"}
          </button>

          {showSuggestions && (
            <div>
              <label>
                AI Teaser
              </label>

              <textarea
                value={aiTeaser}
                onChange={(event) => setAiTeaser(event.target.value)}
                placeholder="AI-generated teaser"
              />

              <label>
                Suggested Tags
              </label>

              <input
                type="text"
                value={tags.join(", ")}
                onChange={(event) =>
                  setTags(
                    event.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="housing, Finland, newcomers"
              />

              <button
                type="submit"
                className="publish-button"
                disabled={publishing}
              >
                {publishing ? "Publishing..." : "Publish post"}
              </button>
            </div>
          )}
        </form>
      </main>

      <Footer />
    </>
  );
}

/* =========================
   MUST DO
========================= */

function MustDo() {

  const tasks = [
    {
      title: "DVV Registration",
      text: "Register your address and personal details with the Digital and Population Data Services Agency."
    },
    {
      title: "Police & Residence Permit",
      text: "Complete identity verification or submit additional documentation if required."
    },
    {
      title: "Bank Account",
      text: "Open a Finnish bank account to handle daily expenses and strong electronic identification (e-identification)."
    },
    {
      title: "HSL Travel Card",
      text: "Get student discounts on public transport across the Helsinki metropolitan area."
    },
    {
      title: "Tuudo App",
      text: "Download Tuudo to access your official student card, class schedules, and student lunch discounts."
    },
    {
      title: "HOAS & Student Housing",
      text: "Apply for affordable student accommodation through HOAS or other housing providers."
    }
  ];

  return (
    <>
      <Navbar />

      <main className="must-do-page">

        <h1>
          Must Do Checklist
        </h1>

        <div className="task-grid">

          {tasks.map((task, index) => (

            <div
              className="task-card"
              key={index}
            >

              <h2>
                {task.title}
              </h2>

              <p>
                {task.text}
              </p>

              <button>
                View Details
              </button>

            </div>

          ))}

        </div>

      </main>

      <Footer />
    </>
  );
}


/* =========================
   COMMUNITY
========================= */

function Community() {
  return (
    <>
      <Navbar />

      <main className="community-page">

        <h1>
          Helsinki Newcomers Community
        </h1>

        <p className="community-description">
          Connect with other international students living and studying in Helsinki.
        </p>

        <button className="join-button">
          Join Community
        </button>


        <h2 className="community-post-title">
          Community Posts
        </h2>


        <div className="community-post">

          <h3>
            Best places to buy cheap groceries?
          </h3>

          <p>
            Check out Lidl or Prisma for budget-friendly student shopping!
          </p>

        </div>

      </main>

      <Footer />
    </>
  );
}


/* =========================
   SEARCH
========================= */

function Search() {
  const query = new URLSearchParams(window.location.search)
    .get("q")
    ?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const categories = [
          "Housing",
          "Paperwork",
          "Transport",
          "Food",
          "Study",
          "Community",
          "Places",
        ];

        const isCategory = categories.includes(query);
        const endpoint = isCategory
          ? `http://localhost:4000/api/posts?category=${encodeURIComponent(query)}`
          : `http://localhost:4000/api/posts?search=${encodeURIComponent(query)}`;

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to search posts.");
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchPosts();
  }, [query]);

  return (
    <>
      <Navbar />

      <main className="search-page">
        <div className="section-container">
          <h1>
            {query ? `Search results for "${query}"` : "Search"}
          </h1>

          {!query ? (
            <p>Enter something in the search bar.</p>
          ) : loading ? (
            <p>Searching...</p>
          ) : error ? (
            <p className="auth-error">{error}</p>
          ) : results.length === 0 ? (
            <p>No posts found for "{query}".</p>
          ) : (
            <div className="blog-posts-grid">
              {results.map((post) => (
                <article className="post-card" key={post.id}>
                  <div className="post-category">
                    {post.category}
                  </div>

                  <h3>{post.title}</h3>

                  <div className="post-author">
                    By {post.author}
                  </div>

                  <p>{post.aiTeaser || post.body}</p>

                  <Link
                    to={`/blog/${post.id}`}
                    className="read-more"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

/* =========================
   LOGIN
========================= */

function Login() {
  return (
    <>
      <Navbar />

      <main className="login-page">

        <div className="login-container">

          <h1>
            Login
          </h1>

          <input
            type="text"
            placeholder="Username"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button>
            Log In
          </button>

        </div>

      </main>

      <Footer />
    </>
  );
}


/* =========================
   APP
========================= */

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/blog"
        element={<Blog />}
      />

      <Route
        path="/write-post"
        element={<WritePost />}
      />
      <Route
        path="/community"
        element={<CommunityPage />}
      />

      <Route
        path="/search"
        element={<Search />}
      />

      <Route
        path="/blog/:id"
        element={<BlogDetails />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/must-do"
        element={<MustDoPage />}
      />

      <Route
        path="/must-do/:slug"
        element={<MustDoDetail />}
      />

    </Routes>
  );
}

export default App;