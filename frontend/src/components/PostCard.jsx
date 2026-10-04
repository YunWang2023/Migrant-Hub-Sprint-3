import { Link } from "react-router-dom";

function PostCard({ post }) {
    return (
        <article className="post-card">
            <div className="post-card-content">
                <p className="post-card-category">{post.category}</p>

                <h3>{post.title}</h3>

                <p className="post-card-author">
                    By {post.author}
                </p>

                <p className="post-card-teaser">
                    {post.aiTeaser}
                </p>

                <div className="post-card-tags">
                    {post.tags.map((tag) => (
                        <span key={tag} className="post-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <Link
                    to={`/blog/${post.id}`}
                    className="post-card-link"
                >
                    Read more →
                </Link>
            </div>
        </article>
    );
}

export default PostCard;