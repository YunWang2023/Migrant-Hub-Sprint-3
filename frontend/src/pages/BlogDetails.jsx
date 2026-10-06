import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import useApi from "../hooks/useApi.js";

function BlogDetails() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const { loading, error, request } = useApi();

    useEffect(() => {
        request(`/posts/${id}`)
            .then((result) => setPost(result))
            .catch(() => setPost(null));
    }, [id, request]);

    if (loading) {
        return (
            <main className="blog-details-page">
                <h1>Loading post…</h1>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="blog-details-page">

                <h1>Post not found</h1>

                <p>{error === "Not found" ? "This post does not exist." : error}</p>

                <Link to="/blog" className="view-all-link">
                    ← Back to blog
                </Link>

            </main>
        );
    }

    const tags = Array.isArray(post.tags) ? post.tags : [];

    return (
        <main className="blog-details-page">
            <article className="blog-details">

                <p className="section-label">{post.category}</p>

                <h1>{post.title}</h1>

                <p className="blog-details-author">
                    By {post.author || "Migrant Hub user"}
                </p>

                {tags.length > 0 && (
                    <div className="blog-details-tags">
                        {tags.map((tag) => (
                            <span key={tag} className="post-card-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="blog-details-content">
                    {post.body}
                </div>

                <Link to="/blog" className="view-all-link">
                    ← Back to blog
                </Link>

            </article>
        </main>
    );
}

export default BlogDetails;
