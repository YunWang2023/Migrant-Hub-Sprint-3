import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import useApi from "../hooks/useApi.js";
import "../styles/post-actions.css";

const CATEGORIES = [
    "Housing",
    "Paperwork",
    "Transport",
    "Food",
    "Study",
    "Community",
    "Places",
];

const WORD_LIMIT = 512;

function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const [post, setPost] = useState(null);
    const [editing, setEditing] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [formError, setFormError] = useState("");

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");

    // One hook for loading the post, one for saving, so a failed save
    // does not wipe the post that is already on screen.
    const loadApi = useApi();
    const saveApi = useApi();

    const loadPost = loadApi.request;

    useEffect(() => {
        loadPost(`/posts/${id}`)
            .then((result) => setPost(result))
            .catch(() => setPost(null));
    }, [id, loadPost]);

    // A post can only be changed by the person who wrote it.
    // Seeded posts from before accounts existed have no owner.
    const isOwner =
        isAuthenticated &&
        user &&
        post &&
        (String(post.user) === String(user.id) || user.role === "admin");

    const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
    const remainingWords = WORD_LIMIT - wordCount;

    const startEditing = () => {
        setTitle(post.title);
        setBody(post.body);
        setCategory(post.category);
        setFormError("");
        setConfirmingDelete(false);
        setEditing(true);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setFormError("");

        if (!title.trim()) {
            setFormError("Please add a title.");
            return;
        }

        if (wordCount === 0) {
            setFormError("Please write something in your post.");
            return;
        }

        if (wordCount > WORD_LIMIT) {
            setFormError(`Your post is over the ${WORD_LIMIT} word limit.`);
            return;
        }

        if (!CATEGORIES.includes(category)) {
            setFormError("Please choose a category.");
            return;
        }

        try {
            const updated = await saveApi.request(`/posts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    body: body.trim(),
                    category,
                }),
            });

            setPost(updated);
            setEditing(false);
        } catch (error) {
            setFormError(error.message || "Could not save your changes.");
        }
    };

    const handleDelete = async () => {
        setFormError("");

        try {
            await saveApi.request(`/posts/${id}`, { method: "DELETE" });
            navigate("/blog");
        } catch (error) {
            setConfirmingDelete(false);
            setFormError(error.message || "Could not delete this post.");
        }
    };

    if (loadApi.loading) {
        return (
            <main className="blog-details-page">
                <h1>Loading post…</h1>
            </main>
        );
    }

    if (loadApi.error || !post) {
        return (
            <main className="blog-details-page">
                <h1>Post not found</h1>

                <p>
                    {loadApi.error === "Not found"
                        ? "This post does not exist."
                        : loadApi.error}
                </p>

                <Link to="/blog" className="view-all-link">
                    ← Back to blog
                </Link>
            </main>
        );
    }

    const tags = Array.isArray(post.tags) ? post.tags : [];

    return (
        <main className="blog-details-page">
            <article className="blog-details">

                <p className="section-label">{post.category}</p>

                <h1>{post.title}</h1>

                <p className="blog-details-author">
                    By {post.author || "Migrant Hub user"}
                </p>

                {tags.length > 0 && (
                    <div className="blog-details-tags">
                        {tags.map((tag) => (
                            <span key={tag} className="post-card-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {formError && (
                    <p className="auth-error" role="alert">
                        {formError}
                    </p>
                )}

                {editing ? (
                    <form className="post-edit-form" onSubmit={handleSave}>

                        <label htmlFor="edit-title">Title</label>

                        <input
                            id="edit-title"
                            type="text"
                            value={title}
                            maxLength={120}
                            onChange={(event) => setTitle(event.target.value)}
                        />

                        <label htmlFor="edit-body">Post</label>

                        <textarea
                            id="edit-body"
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                        ></textarea>

                        <p
                            className={
                                remainingWords < 0
                                    ? "word-counter exceeded"
                                    : "word-counter"
                            }
                        >
                            {remainingWords >= 0
                                ? `${remainingWords} words remaining`
                                : `${Math.abs(remainingWords)} words over the limit`}
                        </p>

                        <label htmlFor="edit-category">Category</label>

                        <select
                            id="edit-category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            <option value="">Select a category</option>

                            {CATEGORIES.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <div className="post-actions">
                            <button
                                type="submit"
                                className="post-action"
                                disabled={saveApi.loading}
                            >
                                {saveApi.loading ? "Saving…" : "Save changes"}
                            </button>

                            <button
                                type="button"
                                className="post-action"
                                onClick={() => {
                                    setEditing(false);
                                    setFormError("");
                                }}
                                disabled={saveApi.loading}
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                ) : (
                    <div className="blog-details-content">{post.body}</div>
                )}

                {isOwner && !editing && (
                    <div className="post-actions">

                        <button
                            type="button"
                            className="post-action"
                            onClick={startEditing}
                        >
                            Edit post
                        </button>

                        <button
                            type="button"
                            className="post-action post-action-danger"
                            onClick={() => setConfirmingDelete(true)}
                            disabled={confirmingDelete}
                        >
                            Delete post
                        </button>

                        <span className="post-action-note">
                            Only you can see these buttons, because you wrote this post.
                        </span>

                        {confirmingDelete && (
                            <div className="post-confirm" role="alert">
                                <p>Delete this post? This cannot be undone.</p>

                                <button
                                    type="button"
                                    className="post-action post-action-danger"
                                    onClick={handleDelete}
                                    disabled={saveApi.loading}
                                >
                                    {saveApi.loading ? "Deleting…" : "Yes, delete it"}
                                </button>

                                <button
                                    type="button"
                                    className="post-action"
                                    onClick={() => setConfirmingDelete(false)}
                                    disabled={saveApi.loading}
                                >
                                    Keep it
                                </button>
                            </div>
                        )}

                    </div>
                )}

                <Link to="/blog" className="view-all-link">
                    ← Back to blog
                </Link>

            </article>
        </main>
    );
}

export default BlogDetails;
