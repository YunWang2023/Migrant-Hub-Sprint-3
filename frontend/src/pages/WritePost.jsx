import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useApi from "../hooks/useApi.js";

function WritePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [formError, setFormError] = useState("");

    const { user, isAuthenticated } = useAuth();
    const { loading, request } = useApi();
    const navigate = useNavigate();

    const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
    const remainingWords = 512 - wordCount;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError("");

        if (!isAuthenticated) {
            setFormError("Please log in before publishing a post.");
            return;
        }

        if (wordCount === 0) {
            setFormError("Please write something in your post.");
            return;
        }

        if (wordCount > 512) {
            setFormError("Your post is over the 512 word limit.");
            return;
        }

        try {
            await request("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.trim(),
                    body: body.trim(),
                    author: user?.name || user?.email || "Migrant Hub User",
                    category,
                        }),
            });

            navigate("/blog");
        } catch (error) {
            setFormError(error.message || "Failed to publish post.");
        }
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

                {formError && (
                    <p className="auth-error" role="alert">
                        {formError}
                    </p>
                )}

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

                    <button
                        type="submit"
                        disabled={loading || wordCount > 512 || wordCount === 0}
                    >
                        {loading ? "Publishing..." : "Publish post"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default WritePost;
