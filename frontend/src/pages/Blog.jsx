import { Link } from "react-router-dom";
import posts from "../data/postsData";
import PostCard from "../components/PostCard";

function Blog() {
    return (
        <main className="blog-page">
            <section className="blog-header">
                <div className="section-container">
                    <p className="section-label">MIGRANT HUB BLOG</p>

                    <h1>Stories, guides and experiences</h1>

                    <p>
                        Discover practical information and experiences shared
                        by people building their lives in Finland.
                    </p>
                </div>
            </section>

            <section className="blog-list-section">
                <div className="section-container">
                    <div className="section-heading">
                        <div>
                            <p className="section-label">LATEST POSTS</p>
                            <h2>Explore the community</h2>
                        </div>

                        <Link to="/" className="view-all-link">
                            ← Back home
                        </Link>
                    </div>

                    <div className="blog-posts-grid">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Blog;