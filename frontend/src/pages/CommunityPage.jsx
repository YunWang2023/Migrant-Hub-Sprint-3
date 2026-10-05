import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/communities")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load communities.");
        return res.json();
      })
      .then((data) => {
        setCommunities(data);
        if (data.length) setSelected(data[0]);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(`/api/communities/${selected.id}/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load posts.");
        return res.json();
      })
      .then(setPosts)
      .catch((err) => setError(err.message));
  }, [selected]);

  return (
    <>
      <Navbar />
      <main className="community-page">
        <h1>Communities</h1>
        {error && <p role="alert">{error}</p>}

        <div role="group" aria-label="Choose a community">
          {communities.map((c) => (
            <button
              key={c.id}
              className="join-button"
              aria-pressed={selected?.id === c.id}
              onClick={() => setSelected(c)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {selected && (
          <section>
            <h2>{selected.name}</h2>
            <p className="community-description">{selected.description}</p>
            <p>{selected.memberCount} members</p>

            <h3 className="community-post-title">Community posts</h3>
            {posts.length === 0 && <p>No posts in this community yet.</p>}
            {posts.map((post) => (
              <article className="community-post" key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.aiTeaser || post.body.slice(0, 150) + "…"}</p>
                <small>By {post.author?.displayName ?? post.author}</small>
              </article>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}