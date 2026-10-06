const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const categories = [
  "Housing",
  "Paperwork",
  "Transport",
  "Food",
  "Study",
  "Community",
  "Places",
];

function buildPrompt(title, body) {
  return `You are helping a website for new international students in Finland.

Read the blog post below and reply with JSON only, in this exact shape:
{ "teaser": "...", "tags": ["...", "..."], "category": "..." }

- teaser: one or two sentences summarising the post for a listing page.
- tags: three to five short tags, each one to three words.
- category: exactly one of ${categories.join(", ")}.

Title: ${title}

Post: ${body}`;
}

async function enrichPost({ title, body }) {
  if (!process.env.GEMINI_API_KEY) {
    console.log("GEMINI_API_KEY is missing, skipping enrichment");
    return null;
  }

  try {
    // Google returns 503 when busy, so try once more before giving up
    let response;

    for (let attempt = 1; attempt <= 2; attempt++) {
      // Give up after 15 seconds. With one retry the writer waits at
      // most about half a minute before the page says the AI is busy.
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(title, body) }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok) break;

      // only retry when the service is busy, not on a bad key or model
      if (response.status !== 503 && response.status !== 429) break;

      console.log(`Gemini returned ${response.status}, retrying once`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (!response.ok) {
      // The status alone is not enough: Google explains a retired model
      // or a rejected key only in the response body.
      const detail = await response.text().catch(() => "");
      console.log(
        "Gemini request failed:",
        response.status,
        detail.slice(0, 300)
      );
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return null;

    const result = JSON.parse(text);

    // never trust the model - check everything before it reaches the database
    return {
      aiTeaser: typeof result.teaser === "string" ? result.teaser : null,
      tags: Array.isArray(result.tags)
        ? result.tags.filter((tag) => typeof tag === "string").slice(0, 5)
        : [],
      category: categories.includes(result.category) ? result.category : null,
    };
  } catch (error) {
    console.log("Gemini enrichment failed:", error.message);
    return null;
  }
}

module.exports = { enrichPost };