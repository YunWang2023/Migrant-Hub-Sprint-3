import { Link, useParams } from "react-router-dom";
import posts from "../data/postsData";

function BlogDetails() {
    const { id } = useParams();

    const post = posts.find((item) => item.id === Number(id));

    if (!post) {
        return (
            <main className="blog-details-page">
                <div className="section-container">
                    <h1>Post not found</h1>
                    <Link to="/blog">← Back to blog</Link>
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

                <div className="blog-details-tags">
                    {post.tags.map((tag) => (
                        <span key={tag} className="post-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="blog-details-content">
                    {post.content}
                </p>

                <Link to="/blog" className="view-all-link">
                    ← Back to blog
                </Link>
            </article>
        </main>
    );
}

export default BlogDetails;