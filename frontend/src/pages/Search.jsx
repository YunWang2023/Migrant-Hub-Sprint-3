import { Link, useSearchParams } from "react-router-dom";
import posts from "../data/postsData";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() || "";

    const results = posts.filter((post) => {
        const searchableText = [
            post.title,
            post.author,
            post.category,
            post.aiTeaser,
            post.content,
            ...(post.tags || [])
        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(query.toLowerCase());
    });

    return (
        <main className="page">
            <div className="section-container">
                <p className="section-label">SEARCH</p>

                <h1>
                    {query ? `Search results for "${query}"` : "Search"}
                </h1>

                {!query ? (
                    <p>Enter something in the search bar to find posts.</p>
                ) : results.length === 0 ? (
                    <p>No posts found for "{query}".</p>
                ) : (
                    <div className="blog-posts-grid">
                        {results.map((post) => (
                            <article className="post-card" key={post.id}>
                                <div className="post-category">
                                    {post.category}
                                </div>

                                <h3>{post.title}</h3>

                                <div className="post-author">
                                    By {post.author}
                                </div>

                                <p>
                                    {post.aiTeaser || post.content}
                                </p>

                                <div className="post-tags">
                                    {post.tags?.map((tag) => (
                                        <span
                                            className="post-card-tag"
                                            key={tag}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    to={`/blog/${post.id}`}
                                    className="read-more"
                                >
                                    Read more →
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                <Link to="/" className="view-all-link">
                    ← Back home
                </Link>
            </div>
        </main>
    );
}

export default Search;
