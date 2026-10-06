import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import useApi from "../hooks/useApi.js";

function Blog() {
    const [posts, setPosts] = useState([]);
    const { loading, error, request } = useApi();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const result = await request("/posts");
                setPosts(result || []);
            } catch {
                // Error is displayed below.
            }
        };

        loadPosts();
    }, [request]);

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

                    {loading && <p>Loading posts...</p>}

                    {error && (
                        <p className="auth-error" role="alert">
                            {error}
                        </p>
                    )}

                    {!loading && !error && posts.length === 0 && (
                        <p>No posts have been published yet.</p>
                    )}

                    {!loading && !error && posts.length > 0 && (
                        <div className="blog-posts-grid">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Blog;
