import { useState } from "react";

function WritePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [community, setCommunity] = useState("");

    const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
    const remainingWords = 512 - wordCount;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (wordCount > 512) {
            return;
        }

        alert("Post submitted successfully!");
    };

    return (
        <main className="write-post-page">
            <section className="write-post-container">
                <p className="section-label">SHARE YOUR EXPERIENCE</p>

                <h1>Write a post</h1>

                <p className="write-post-intro">
                    Share your experience, advice, or useful information
                    with the Migrant Hub community.
                </p>

                <form className="write-post-form" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter your post title"
                        required
                    />

                    <label htmlFor="body">Post</label>

                    <textarea
                        id="body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        placeholder="Write your post here..."
                        rows="12"
                        required
                    />

                    <p className={remainingWords < 0 ? "word-counter exceeded" : "word-counter"}>
                        {remainingWords >= 0
                            ? `${remainingWords} words remaining`
                            : `${Math.abs(remainingWords)} words over the limit`}
                    </p>

                    <label htmlFor="category">Category</label>

                    <select
                        id="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Housing">Housing</option>
                        <option value="Paperwork">Paperwork</option>
                        <option value="Transport">Transport</option>
                        <option value="Food">Food</option>
                        <option value="Study">Study</option>
                        <option value="Community">Community</option>
                        <option value="Places">Places</option>
                    </select>

                    <label htmlFor="community">Community</label>

                    <select
                        id="community"
                        value={community}
                        onChange={(event) => setCommunity(event.target.value)}
                        required
                    >
                        <option value="">Select a community</option>
                        <option value="Students">Students</option>
                        <option value="Newcomers">Newcomers</option>
                        <option value="Helsinki">Helsinki</option>
                        <option value="Espoo">Espoo</option>
                        <option value="Vantaa">Vantaa</option>
                    </select>

                    <button
                        type="submit"
                        disabled={wordCount > 512 || wordCount === 0}
                    >
                        Publish post
                    </button>
                </form>
            </section>
        </main>
    );
}

export default WritePost;