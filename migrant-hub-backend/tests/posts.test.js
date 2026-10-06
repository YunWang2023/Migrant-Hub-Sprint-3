const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const connectDB = require("../config/db");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const api = supertest(app);

const authorData = {
  name: "Author Person",
  email: "post.author@example.com",
  password: "password123",
};

const strangerData = {
  name: "Stranger Person",
  email: "post.stranger@example.com",
  password: "password123",
};

let authorToken = null;
let strangerToken = null;
let postId = null;

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Post.deleteMany({});

  const authorResponse = await api
    .post("/api/auth/register")
    .send(authorData)
    .expect(201);

  authorToken = authorResponse.body.token;

  const strangerResponse = await api
    .post("/api/auth/register")
    .send(strangerData)
    .expect(201);

  strangerToken = strangerResponse.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/posts", () => {
  it("should return all posts without a token", async () => {
    const response = await api.get("/api/posts").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /api/posts", () => {
  it("should return 401 without a token", async () => {
    await api
      .post("/api/posts")
      .send({
        title: "No token",
        body: "This should not be saved.",
        category: "Study",
      })
      .expect(401);
  });

  it("should create a post when authenticated", async () => {
    const response = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${authorToken}`)
      .send({
        title: "Finding a flat in Vantaa",
        body: "What I learned while applying for student housing.",
        category: "Housing",
        tags: ["housing", "vantaa"],
      })
      .expect(201);

    expect(response.body.title).toBe("Finding a flat in Vantaa");
    expect(response.body.category).toBe("Housing");

    postId = response.body.id;
  });

  it("should take the author from the token and ignore the one sent", async () => {
    const response = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${authorToken}`)
      .send({
        title: "Trying to change the author",
        body: "The author field should be ignored.",
        category: "Study",
        author: "Somebody Else",
      })
      .expect(201);

    expect(response.body.author).toBe(authorData.name);
  });

  it("should return 400 when the category is missing", async () => {
    const response = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${authorToken}`)
      .send({ title: "No category", body: "The category is missing." })
      .expect(400);

    expect(response.body.details.join(" ")).toMatch(/category/i);
  });

  it("should return 400 for a category that is not allowed", async () => {
    await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${authorToken}`)
      .send({
        title: "Bad category",
        body: "Nonsense is not a category.",
        category: "Nonsense",
      })
      .expect(400);
  });

  it("should return 400 when the body is over 512 words", async () => {
    await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${authorToken}`)
      .send({
        title: "Far too long",
        body: "word ".repeat(600).trim(),
        category: "Study",
      })
      .expect(400);
  });
});

describe("GET /api/posts/:id", () => {
  it("should return one post", async () => {
    const response = await api.get(`/api/posts/${postId}`).expect(200);

    expect(response.body.id).toBe(postId);
  });

  it("should return 404 for an id that does not exist", async () => {
    await api.get("/api/posts/5f2a1b9c8d7e6f5a4b3c2d1e").expect(404);
  });

  it("should return 400 for an id that is not a valid ObjectId", async () => {
    await api.get("/api/posts/not-a-real-id").expect(400);
  });
});

describe("PATCH /api/posts/:id", () => {
  it("should update only the field that was sent", async () => {
    const response = await api
      .patch(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${authorToken}`)
      .send({ title: "Finding a flat in Vantaa (updated)" })
      .expect(200);

    expect(response.body.title).toBe("Finding a flat in Vantaa (updated)");
    expect(response.body.category).toBe("Housing");
  });

  it("should return 401 without a token", async () => {
    await api
      .patch(`/api/posts/${postId}`)
      .send({ title: "No token" })
      .expect(401);
  });

  it("should return 403 when another user tries to update the post", async () => {
    const response = await api
      .patch(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${strangerToken}`)
      .send({ title: "Taken over" })
      .expect(403);

    expect(response.body.error).toMatch(/your own/i);
  });
});

describe("Filtering and search", () => {
  it("should filter posts by category", async () => {
    const response = await api.get("/api/posts?category=Housing").expect(200);

    response.body.forEach((post) => {
      expect(post.category).toBe("Housing");
    });
  });

  it("should treat the search term as text and not as a regular expression", async () => {
    const response = await api.get("/api/posts?search=.*").expect(200);

    // Without escaping, .* would match every post in the database.
    expect(response.body).toHaveLength(0);
  });
});

describe("DELETE /api/posts/:id", () => {
  it("should return 401 without a token", async () => {
    await api.delete(`/api/posts/${postId}`).expect(401);
  });

  it("should return 403 when another user tries to delete the post", async () => {
    await api
      .delete(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${strangerToken}`)
      .expect(403);
  });

  it("should delete the post when the owner asks", async () => {
    await api
      .delete(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${authorToken}`)
      .expect(204);

    await api.get(`/api/posts/${postId}`).expect(404);
  });
});
