import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PostCard from "../components/PostCard";
import useApi from "../hooks/useApi.js";

const CATEGORIES = [
    "Housing",
    "Paperwork",
    "Transport",
    "Food",
    "Study",
    "Community",
    "Places",
];

function Home() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { loading, error, request } = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        request("/posts?limit=3")
            .then((result) => setPosts(result || []))
            .catch(() => {
                // The error message is rendered below.
            });
    }, [request]);

    const handleSearch = (event) => {
        event.preventDefault();

        const value = searchTerm.trim();

        if (value) {
            navigate(`/search?q=${encodeURIComponent(value)}`);
        }
    };

    return (
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

                    <form className="search-box" onSubmit={handleSearch}>

                        <input
                            name="search"
                            type="text"
                            placeholder="What are you looking for?"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />

                        <button type="submit">
                            Search
                        </button>

                    </form>

                    <div className="category-buttons">

                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() =>
                                    navigate(`/search?q=${encodeURIComponent(category)}`)
                                }
                            >
                                {category}
                            </button>
                        ))}

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
                    <div className="feature-icon">□</div>
                    <div>
                        <h3>Practical Guides</h3>
                        <p>Step by step</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">♟</div>
                    <div>
                        <h3>Real Experiences</h3>
                        <p>From students</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">♡</div>
                    <div>
                        <h3>Supportive Community</h3>
                        <p>Connect &amp; belong</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">♟</div>
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

                    <Link to="/blog" className="view-posts">
                        View all posts →
                    </Link>

                </div>

                <div className="post-grid">

                    {loading && <p>Loading posts…</p>}

                    {error && <p className="auth-error">Failed to load posts: {error}</p>}

                    {!loading && !error && posts.length === 0 && (
                        <p>No posts have been published yet.</p>
                    )}

                    {!loading &&
                        !error &&
                        posts.map((post) => (
                            <PostCard key={post.id ?? post._id} post={post} />
                        ))}

                </div>

            </section>

        </main>
    );
}

export default Home;
