import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import useApi from "../hooks/useApi.js";

const CATEGORIES = [
    "Housing",
    "Paperwork",
    "Transport",
    "Food",
    "Study",
    "Community",
    "Places",
];

function Search() {
    // useSearchParams keeps the page in sync when the query changes,
    // which window.location.search did not.
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() || "";

    const [results, setResults] = useState([]);
    const { loading, error, request } = useApi();

    useEffect(() => {
        // Nothing to look up yet; the empty state is rendered below.
        if (!query) {
            return;
        }

        // A category chip filters by category; anything else is a text search.
        const endpoint = CATEGORIES.includes(query)
            ? `/posts?category=${encodeURIComponent(query)}`
            : `/posts?search=${encodeURIComponent(query)}`;

        let cancelled = false;

        request(endpoint)
            .then((result) => {
                if (!cancelled) {
                    setResults(result || []);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setResults([]);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [query, request]);

    return (
        <main className="search-page">

            <h1 className="page-title">
                {query ? `Search results for "${query}"` : "Search"}
            </h1>

            {!query && <p>Enter something in the search bar to find posts.</p>}

            {query && loading && <p>Searching…</p>}

            {query && error && (
                <p className="auth-error" role="alert">
                    {error}
                </p>
            )}

            {query && !loading && !error && results.length === 0 && (
                <p>No posts found for "{query}".</p>
            )}

            {query && !loading && !error && results.length > 0 && (
                <div className="post-grid">
                    {results.map((post) => (
                        <PostCard key={post.id ?? post._id} post={post} />
                    ))}
                </div>
            )}

            <Link to="/" className="back-home">
                ← Back home
            </Link>

        </main>
    );
}

export default Search;
