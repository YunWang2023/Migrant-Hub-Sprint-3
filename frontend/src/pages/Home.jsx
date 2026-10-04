import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import posts from "../data/postsData";
import PostCard from "../components/PostCard";

function Home() {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const categories = [
        "Housing",
        "Paperwork",
        "Transport",
        "Food",
        "Study",
        "Community",
        "Places"
    ];

    const handleSearch = (event) => {

        event.preventDefault();

        if (searchTerm.trim()) {
            navigate(
                `/search?q=${encodeURIComponent(searchTerm.trim())}`
            );
        }
    };

    return (
        <main className="home-page">

            {/* HERO */}

            <section className="hero-section">

                <div className="hero-overlay"></div>

                <div className="hero-content">

                    <p className="hero-label">
                        WELCOME TO FINLAND
                    </p>

                    <h1>
                        Everything you need to start
                        <br />
                        your life in Finland
                    </h1>

                    <p className="hero-text">
                        Find practical information, useful guides, local communities,
                        and experiences shared by other international students.
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
                                className="category-chip"
                            >
                                {category}
                            </button>

                        ))}

                    </div>

                </div>


                {/* TAGLINE */}

                <div className="hero-tagline">
                    <span>New faces</span>
                    <br />
                    <span>Similar home</span>
                    <div>♡</div>
                </div>

            </section>


            {/* FEATURE BAR */}

            <section className="feature-strip">

                <div className="feature-item">

                    <div className="feature-icon">
                        □
                    </div>

                    <div>
                        <h3>Practical Guides</h3>
                        <p>Step by step</p>
                    </div>

                </div>


                <div className="feature-item">

                    <div className="feature-icon">
                        ♟
                    </div>

                    <div>
                        <h3>Real Experiences</h3>
                        <p>From students</p>
                    </div>

                </div>


                <div className="feature-item">

                    <div className="feature-icon">
                        ♡
                    </div>

                    <div>
                        <h3>Supportive Community</h3>
                        <p>Connect & belong</p>
                    </div>

                </div>


                <div className="feature-item">

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

            <section className="latest-posts-section">

                <div className="section-container">

                    <div className="section-heading">

                        <div>

                            <p className="section-label">
                                LATEST STORIES
                            </p>

                            <h2>
                                Helpful posts for your journey
                            </h2>

                        </div>

                        <Link
                            to="/blog"
                            className="view-all-link"
                        >
                            View all posts →
                        </Link>

                    </div>


                    <div className="blog-posts-grid">

                        {posts.slice(0, 3).map((post) => (

                            <PostCard
                                key={post.id}
                                post={post}
                            />

                        ))}

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;