import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi.js";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() || "";

    const { data, loading, error, request } = useApi();

    useEffect(() => {
        if (!query) return;

        request(`/posts?search=${encodeURIComponent(query)}`).catch(() => {});
    }, [query, request]);

    const results = Array.isArray(data)
        ? data
        : Array.isArray(data?.posts)
          ? data.posts
          : [];

    return (
        <main className="page">
            <div className="section-container">
                <p className="section-label">SEARCH</p>

                <h1>
                    {query ? `Search results for "${query}"` : "Search"}
                </h1>

                {!query ? (
                    <p>Enter something in the search bar to find posts.</p>
                ) : loading ? (
                    <p>Searching posts...</p>
                ) : error ? (
                    <p>Unable to load search results: {error}</p>
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
                                    {post.aiTeaser || post.body || post.content}
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
