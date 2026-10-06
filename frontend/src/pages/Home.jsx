import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi.js";
import PostCard from "../components/PostCard";

function Home() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        "Housing",
        "Paperwork",
        "Transport",
        "Food",
        "Study",
        "Community",
        "Places",
    ];

    const { data, loading, error, request } = useApi();

    useEffect(() => {
        const endpoint = selectedCategory
            ? `/posts?category=${encodeURIComponent(selectedCategory)}&limit=3`
            : "/posts?limit=3";

        request(endpoint).catch(() => {});
    }, [selectedCategory, request]);

    const posts = Array.isArray(data)
        ? data
        : Array.isArray(data?.posts)
          ? data.posts
          : [];

    const handleSearch = (event) => {
        event.preventDefault();

        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory((current) =>
            current === category ? "" : category
        );
    };

    return (
        <main className="home-page">
            <section className="home-hero">
                <div className="section-container">
                    <p className="section-label">MIGRANT HUB</p>

                    <h1>
                        Your guide to life
                        <br />
                        in Finland
                    </h1>

                    <p className="hero-description">
                        Find practical information, useful guides, local
                        communities, and experiences shared by other
                        international students.
                    </p>

                    <form
                        className="hero-search"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                        />

                        <button type="submit">
                            Search
                        </button>
                    </form>

                    <div className="category-chips">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={`category-chip ${
                                    selectedCategory === category
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleCategoryClick(category)
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
                    <div>♡</div>
                </div>
            </section>

            <section className="feature-strip">
                <div className="feature-item">
                    <div className="feature-icon">□</div>
                    <div>
                        <h3>Practical Guides</h3>
                        <p>Step by step</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">♟</div>
                    <div>
                        <h3>Real Experiences</h3>
                        <p>From students</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">♡</div>
                    <div>
                        <h3>Supportive Community</h3>
                        <p>Connect & belong</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">♟</div>
                    <div>
                        <h3>Life in Finland</h3>
                        <p>Explore the culture</p>
                    </div>
                </div>
            </section>

            <section className="latest-posts-section">
                <div className="section-container">
                    <div className="section-heading">
                        <div>
                            <p className="section-label">
                                {selectedCategory
                                    ? `${selectedCategory.toUpperCase()} POSTS`
                                    : "LATEST STORIES"}
                            </p>

                            <h2>
                                {selectedCategory
                                    ? `Posts about ${selectedCategory}`
                                    : "Helpful posts for your journey"}
                            </h2>
                        </div>

                        <Link
                            to="/blog"
                            className="view-all-link"
                        >
                            View all posts →
                        </Link>
                    </div>

                    {loading ? (
                        <p>Loading posts...</p>
                    ) : error ? (
                        <p>Unable to load posts: {error}</p>
                    ) : posts.length === 0 ? (
                        <p>
                            {selectedCategory
                                ? `No posts found in ${selectedCategory}.`
                                : "No posts available yet."}
                        </p>
                    ) : (
                        <div className="blog-posts-grid">
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Home;
