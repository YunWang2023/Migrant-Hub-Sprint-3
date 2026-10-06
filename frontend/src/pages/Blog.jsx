import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";
import useApi from "../hooks/useApi.js";

function Blog() {
    const [posts, setPosts] = useState([]);
    const { loading, error, request } = useApi();

    useEffect(() => {
        request("/posts")
            .then((result) => setPosts(result || []))
            .catch(() => {
                // The error message is rendered below.
            });
    }, [request]);

    return (
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

                <Link to="/" className="back-home">
                    ← Back home
                </Link>

            </div>

            {loading && <p>Loading posts…</p>}

            {error && (
                <p className="auth-error" role="alert">
                    {error}
                </p>
            )}

            {!loading && !error && posts.length === 0 && (
                <p>No posts have been published yet.</p>
            )}

            {!loading && !error && posts.length > 0 && (
                <div className="post-grid">
                    {posts.map((post) => (
                        <PostCard key={post.id ?? post._id} post={post} />
                    ))}
                </div>
            )}

        </main>
    );
}

export default Blog;
