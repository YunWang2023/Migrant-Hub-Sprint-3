import { useState } from "react";

function CommunityPage() {
  const [isJoined, setIsJoined] = useState(false);
  const [postText, setPostText] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Alex",
      time: "2 hours ago",
      question: "Best places to buy cheap groceries?",
      text: "Check out Lidl or Prisma for budget-friendly student shopping!",
      likes: 5,
      comments: 12,
    },
    {
      id: 2,
      name: "Sara",
      time: "5 hours ago",
      question: "Anyone joining Metropolia this fall?",
      text: "Would be nice to meet other international students before classes start.",
      likes: 8,
      comments: 15,
    },
    {
      id: 3,
      name: "Raj",
      time: "1 day ago",
      question: "Best cafés to study in Helsinki?",
      text: "Looking for quiet cafés with good Wi-Fi and affordable coffee.",
      likes: 10,
      comments: 21,
    },
  ]);

  const handlePost = (event) => {
    event.preventDefault();

    if (!postText.trim()) {
      return;
    }

    const newPost = {
      id: Date.now(),
      name: "You",
      time: "Just now",
      question: postText,
      text: "Thanks for sharing with the Migrant Hub community!",
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
  };

  return (
    <main className="community-page">

      {/* ================= COMMUNITY HERO ================= */}

      <section className="community-hero">

        <div className="community-hero-content">

          <p className="community-label">
            COMMUNITY
          </p>

          <h1>
            Helsinki Newcomers Community
          </h1>

          <p>
            Connect with other international students living and studying
            in Helsinki. Ask questions, share experiences, and find new
            friends.
          </p>

          <button
            className="community-join-button"
            type="button"
            onClick={() => setIsJoined(!isJoined)}
          >
            {isJoined ? "Joined ✓" : "Join Community"}
          </button>

        </div>

        <div className="community-decoration">
          Good People
          <br />
          Brighter Journeys
          <span>♡</span>
        </div>

      </section>


      {/* ================= COMMUNITY CONTENT ================= */}

      <section className="community-content">

        {/* CREATE POST */}

        <div className="community-post-box">

          <form onSubmit={handlePost}>

            <input
              type="text"
              value={postText}
              onChange={(event) => setPostText(event.target.value)}
              placeholder="Share your thoughts or ask a question..."
            />

            <button type="submit">
              Post
            </button>

          </form>

        </div>


        {/* RECENT POSTS */}

        <div className="community-section-heading">

          <div>

            <p className="section-label">
              COMMUNITY
            </p>

            <h2>
              Recent Posts
            </h2>

          </div>

          <button
            type="button"
            className="community-view-all"
          >
            View all →
          </button>

        </div>


        {/* POSTS */}

        <div className="community-posts-grid">

          {posts.map((post) => (

            <article
              className="community-post-card"
              key={post.id}
            >

              <div className="community-post-header">

                <div className="community-avatar">
                  {post.name.charAt(0)}
                </div>

                <div>

                  <strong>
                    {post.name}
                  </strong>

                  <span>
                    {post.time}
                  </span>

                </div>

              </div>


              <h3>
                {post.question}
              </h3>


              <p>
                {post.text}
              </p>


              <div className="community-post-actions">

                <span>
                  ♡ {post.likes}
                </span>

                <span>
                  ◌ {post.comments}
                </span>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}

export default CommunityPage;