import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useApi from "../hooks/useApi.js";
import "../styles/ai-suggestions.css";

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

function WritePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [communityId, setCommunityId] = useState("");
    const [tags, setTags] = useState([]);
    const [aiTeaser, setAiTeaser] = useState("");

    const [communities, setCommunities] = useState([]);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiNote, setAiNote] = useState("");
    const [aiFailed, setAiFailed] = useState(false);
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    // Separate hook instances so the AI call never overwrites the
    // publish call's loading or error state.
    const publishApi = useApi();
    const aiApi = useApi();
    const communityApi = useApi();

    const loadCommunities = communityApi.request;

    useEffect(() => {
        loadCommunities("/communities")
            .then((result) => setCommunities(result || []))
            .catch(() => setCommunities([]));
    }, [loadCommunities]);

    const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
    const remainingWords = WORD_LIMIT - wordCount;

    const handleSuggest = async () => {
        setAiNote("");
        setAiFailed(false);

        if (!title.trim() || !wordCount) {
            setAiFailed(true);
            setAiNote("Add a title and some text first, then ask for suggestions.");
            return;
        }

        setAiLoading(true);

        try {
            const result = await aiApi.request("/posts/enrich", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    body: body.trim(),
                }),
            });

            if (result?.category && CATEGORIES.includes(result.category)) {
                setCategory(result.category);
            }

            if (Array.isArray(result?.tags)) {
                setTags(result.tags.filter((tag) => typeof tag === "string"));
            }

            if (typeof result?.aiTeaser === "string") {
                setAiTeaser(result.aiTeaser);
            }

            setAiNote("Suggestions added. Change anything you do not agree with.");
        } catch (error) {
            // The AI service is optional: say so and leave the form usable.
            setAiFailed(true);
            setAiNote(
                `${error.message || "AI suggestions are unavailable"}. You can still publish the post yourself.`
            );
        } finally {
            setAiLoading(false);
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (event) => {
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

        // Only whitelisted fields; the author is taken from the token
        // server-side, so sending it here would be ignored anyway.
        const payload = {
            title: title.trim(),
            body: body.trim(),
            category,
            tags,
        };

        if (aiTeaser.trim()) {
            payload.aiTeaser = aiTeaser.trim();
        }

        if (communityId) {
            payload.communityId = communityId;
        }

        try {
            await publishApi.request("/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            navigate("/blog");
        } catch (error) {
            setFormError(error.message || "Failed to publish post.");
        }
    };

    return (
        <main className="write-page">

            <div className="write-heading">

                <div className="eyebrow dark">
                    SHARE YOUR EXPERIENCE
                </div>

                <h1>
                    Write a post
                </h1>

                <p>
                    Share your experience, advice, or useful information with the
                    Migrant Hub community.
                </p>

            </div>

            {formError && (
                <p className="auth-error" role="alert">
                    {formError}
                </p>
            )}

            <form className="write-form" onSubmit={handleSubmit}>

                <label htmlFor="title">
                    Title
                </label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    maxLength={120}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter your post title"
                />

                <label htmlFor="body">
                    Post
                </label>

                <textarea
                    id="body"
                    value={body}
                    rows="12"
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Write your post here..."
                ></textarea>

                <div className="word-count">
                    {remainingWords >= 0
                        ? `${remainingWords} words remaining`
                        : `${Math.abs(remainingWords)} words over the limit`}
                </div>

                {/* AI help is optional. Publishing never depends on it. */}
                <div className="ai-panel">

                    <div className="ai-panel-head">

                        <h3>Need a hand?</h3>

                        <button
                            type="button"
                            className="ai-button"
                            onClick={handleSuggest}
                            disabled={aiLoading}
                        >
                            {aiLoading ? "Thinking…" : "Suggest category, tags & summary"}
                        </button>

                    </div>

                    <p>
                        Migrant Hub can read your draft and suggest a category, a few
                        tags and a short summary. Everything stays editable.
                    </p>

                    {aiNote && (
                        <p
                            className={aiFailed ? "ai-note ai-note-warn" : "ai-note"}
                            role={aiFailed ? "alert" : "status"}
                        >
                            {aiNote}
                        </p>
                    )}

                    {aiTeaser && (
                        <div className="ai-teaser">
                            {aiTeaser}
                        </div>
                    )}

                    {tags.length > 0 && (
                        <div className="ai-tags">
                            {tags.map((tag) => (
                                <span key={tag} className="ai-tag">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        aria-label={`Remove tag ${tag}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                </div>

                <label htmlFor="category">
                    Category
                </label>

                <select
                    id="category"
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

                <label htmlFor="community">
                    Community (optional)
                </label>

                <select
                    id="community"
                    value={communityId}
                    onChange={(event) => setCommunityId(event.target.value)}
                >
                    <option value="">No community</option>

                    {communities.map((community) => (
                        <option key={community.id} value={community.id}>
                            {community.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="publish-button"
                    disabled={publishApi.loading}
                >
                    {publishApi.loading ? "Publishing…" : "Publish post"}
                </button>

            </form>

        </main>
    );
}

export default WritePost;
