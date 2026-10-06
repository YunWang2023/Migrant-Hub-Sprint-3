import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BlogDetails() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:4000/api/posts/${id}`
                );

                if (!response.ok) {
                    throw new Error("Post not found");
                }

                const data = await response.json();
                setPost(data);
            } catch (err) {
                setError(err.message || "Failed to load post.");
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [id]);

    if (loading) {
        return (
            <main className="blog-details-page">
                <div className="section-container">
                    <h1>Loading post...</h1>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="blog-details-page">
                <div className="section-container">
                    <h1>Post not found</h1>

                    <Link to="/blog" className="view-all-link">
                        ← Back to blog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="blog-details-page">
            <article className="section-container blog-details">
                <p className="section-label">{post.category}</p>

                <h1>{post.title}</h1>

                <p className="blog-details-author">
                    By {post.author}
                </p>

                {post.tags?.length > 0 && (
                    <div className="blog-details-tags">
                        {post.tags.map((tag) => (
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