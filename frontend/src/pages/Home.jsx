import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        "Places",
    ];

    const handleSearch = (event) => {
        event.preventDefault();

        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <main className="home-page">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-content">
                    <p className="hero-label">WELCOME TO FINLAND</p>

                    <h1>Everything you need to start your life in Finland</h1>

                    <p className="hero-text">
                        Find practical information, useful guides, local communities,
                        and experiences shared by other international students.
                    </p>

                    {/* SEARCH */}
                    <form className="hero-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            aria-label="Search Migrant Hub"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />

                        <button type="submit">Search</button>
                    </form>

                    {/* CATEGORY CHIPS */}
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
            </section>

            {/* LATEST POSTS SECTION */}
            <section className="latest-posts-section">
                <div className="section-container">
                    <div className="section-heading">
                        <div>
                            <p className="section-label">LATEST STORIES</p>
                            <h2>Helpful posts for your journey</h2>
                        </div>

                        <Link to="/blog" className="view-all-link">
                            View all posts →
                        </Link>
                    </div>

                    <div className="posts-grid">
                        <p>Latest posts will appear here.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;