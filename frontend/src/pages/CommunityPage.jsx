import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useApi from "../hooks/useApi.js";
import "../styles/community.css";

export default function CommunityPage() {
  const communitiesApi = useApi();
  const postsApi = useApi();
  const [selectedId, setSelectedId] = useState(null);

  const communities = communitiesApi.data ?? [];
  const posts = postsApi.data ?? [];
  const selected = communities.find((c) => c.id === selectedId) ?? communities[0];

  const loadCommunities = communitiesApi.request;
  const loadPosts = postsApi.request;

  useEffect(() => {
    loadCommunities("/communities").catch(() => {});
  }, [loadCommunities]);

  useEffect(() => {
    if (selected) {
      loadPosts(`/communities/${selected.id}/posts`).catch(() => {});
    }
  }, [loadPosts, selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <main className="community-page">
        <p className="cm-eyebrow">Find your people</p>
        <h1>Communities</h1>
        <p className="cm-intro">
          Groups of newcomers sharing tips, questions and experiences about life in Finland.
        </p>

        {communitiesApi.loading && <p role="status">Loading communities…</p>}
        {communitiesApi.error && (
          <p role="alert" className="cm-error">{communitiesApi.error}</p>
        )}

        <div className="cm-tabs" role="group" aria-label="Choose a community">
          {communities.map((c) => (
            <button
              key={c.id}
              type="button"
              className="cm-tab"
              aria-pressed={selected?.id === c.id}
              onClick={() => setSelectedId(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {selected && (
          <section className="cm-panel" aria-labelledby="cm-title">
            <header className="cm-header">
              <div className="cm-avatar" aria-hidden="true">
                {selected.name.charAt(0)}
              </div>
              <div>
                <h2 id="cm-title">{selected.name}</h2>
                <p>{selected.description}</p>
              </div>
              <span className="cm-members">
                <strong>{selected.memberCount}</strong> members
              </span>
            </header>

            <h3 className="cm-posts-title">Latest posts</h3>

            {postsApi.loading && <p role="status">Loading posts…</p>}
            {postsApi.error && <p role="alert" className="cm-error">{postsApi.error}</p>}
            {!postsApi.loading && !postsApi.error && posts.length === 0 && (
              <p className="cm-empty">No posts in this community yet. Be the first to write one!</p>
            )}

            <ul className="cm-posts">
              {posts.map((post) => (
                <li key={post.id} className="cm-post">
                  {post.category && <span className="cm-category">{post.category}</span>}
                  <h4>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h4>
                  <p>{post.aiTeaser || `${post.body.slice(0, 160)}…`}</p>
                  <small>By {post.author?.name ?? post.author}</small>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
