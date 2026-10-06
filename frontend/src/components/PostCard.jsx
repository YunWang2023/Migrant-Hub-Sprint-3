import { Link } from "react-router-dom";

function excerpt(text, maxLength = 180) {
    if (typeof text !== "string" || !text.trim()) {
        return "";
    }

    const clean = text.trim();

    return clean.length > maxLength
        ? `${clean.slice(0, maxLength)}…`
        : clean;
}

function PostCard({ post }) {
    // Mongo documents come back with "id" from the model's toJSON
    // transform, but mock data and older code used "_id".
    const id = post.id ?? post._id;
    const tags = Array.isArray(post.tags) ? post.tags : [];

    return (
        <article className="post-card">

            <div className="post-category">
                {post.category}
            </div>

            <h3>
                {post.title}
            </h3>

            <div className="post-author">
                By {post.author || "Migrant Hub user"}
            </div>

            <p>
                {post.aiTeaser || excerpt(post.body ?? post.content)}
            </p>

            {tags.length > 0 && (
                <div className="post-tags">
                    {tags.map((tag) => (
                        <span key={tag} className="post-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <Link to={`/blog/${id}`} className="read-more">
                Read more →
            </Link>

        </article>
    );
}

export default PostCard;
