import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import posts from "../data/postsData";

const topics = [
  "Housing",
  "Paperwork",
  "Transport",
  "Food",
  "Study",
  "Community",
  "Places",
];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeTab, setActiveTab] = useState("All");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return posts;
    }

    return posts.filter((post) => {
      const text = [
        post.title,
        post.author,
        post.category,
        post.aiTeaser,
        post.content,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(search);
    });
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      setSearchParams({ q: trimmedQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleTopicClick = (topic) => {
    setQuery(topic);
    setSearchParams({ q: topic });
  };

  return (
    <>
      <main className="search-page">
        <div className="section-container">
          <h1>Search</h1>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for guides, topics, or posts..."
              aria-label="Search"
            />

            <button type="submit">Search</button>
          </form>

          <div className="search-tabs">
            {["All", "Blog Posts", "Community Posts", "Guides"].map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <section className="search-results">
            <h2>
              {query.trim()
                ? `Search results for "${query}"`
                : "All Posts"}
            </h2>

            {results.length > 0 ? (
              results.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-category">{post.category}</div>

                  <h3>{post.title}</h3>

                  <div className="post-author">
                    By {post.author}
                  </div>

                  <p>{post.aiTeaser}</p>

                  <div className="post-tags">
                    {post.tags?.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTopicClick(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="read-more"
                  >
                    Read more →
                  </Link>
                </article>
              ))
            ) : (
              <p>No posts found. Try another search.</p>
            )}
          </section>

          <section className="popular-topics">
            <h2>Popular Topics</h2>

            <div className="topic-tags">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleTopicClick(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Search;
