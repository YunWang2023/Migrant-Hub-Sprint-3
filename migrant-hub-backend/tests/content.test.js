const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const connectDB = require("../config/db");
const Community = require("../models/communityModel");
const MustDo = require("../models/mustDoModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const api = supertest(app);

const userData = {
  name: "Content Tester",
  email: "content.tester@example.com",
  password: "password123",
};

const communityData = {
  name: "Test Community",
  description: "A community used by the tests.",
  memberCount: 3,
};

const mustDoData = {
  slug: "test-item",
  title: "Test Must Do item",
  summary: "An item used by the tests.",
  whatIsIt: "A test fixture.",
  whoNeedsIt: "The test suite.",
  documents: ["Passport"],
  howLong: "No time at all",
  officialUrl: "https://example.com",
  officialLabel: "Example",
  checkedOn: "2026-10-06",
  order: 1,
};

let token = null;
let communityId = null;

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Post.deleteMany({});
  await Community.deleteMany({});
  await MustDo.deleteMany({});

  const signupResponse = await api
    .post("/api/auth/register")
    .send(userData)
    .expect(201);

  token = signupResponse.body.token;

  const community = await Community.create(communityData);
  communityId = community.id;

  await MustDo.create(mustDoData);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/communities", () => {
  it("should return all communities without a token", async () => {
    const response = await api.get("/api/communities").expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe(communityData.name);
  });

  it("should return the posts of one community", async () => {
    const response = await api
      .get(`/api/communities/${communityId}/posts`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 404 for a community that does not exist", async () => {
    await api.get("/api/communities/5f2a1b9c8d7e6f5a4b3c2d1e").expect(404);
  });
});

describe("Protected community routes", () => {
  it("should return 401 when creating without a token", async () => {
    await api
      .post("/api/communities")
      .send({ name: "Sneaky", description: "Should not be created." })
      .expect(401);
  });

  it("should return 401 when deleting without a token", async () => {
    await api.delete(`/api/communities/${communityId}`).expect(401);
  });
});

describe("GET /api/mustdo", () => {
  it("should return the checklist without a token", async () => {
    const response = await api.get("/api/mustdo").expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].slug).toBe(mustDoData.slug);
  });

  it("should return one item by its slug", async () => {
    const response = await api.get("/api/mustdo/test-item").expect(200);

    expect(response.body.title).toBe(mustDoData.title);
  });

  it("should return 404 for a slug that does not exist", async () => {
    await api.get("/api/mustdo/no-such-item").expect(404);
  });
});

describe("Protected must do routes", () => {
  it("should return 401 when deleting without a token", async () => {
    await api.delete("/api/mustdo/test-item").expect(401);
  });

  it("should return 401 when updating without a token", async () => {
    await api
      .patch("/api/mustdo/test-item")
      .send({ title: "Changed" })
      .expect(401);
  });
});

describe("POST /api/posts/enrich", () => {
  it("should return 401 without a token", async () => {
    await api
      .post("/api/posts/enrich")
      .send({ title: "Something", body: "Some text." })
      .expect(401);
  });

  it("should return 400 when the draft is empty", async () => {
    await api
      .post("/api/posts/enrich")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "", body: "" })
      .expect(400);
  });

  it(
    "should return suggestions, or 503 when the AI service is busy",
    async () => {
      const response = await api
        .post("/api/posts/enrich")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Opening a bank account in Helsinki",
          body: "I took my passport and residence permit to the bank and waited two weeks for the codes.",
        });

      // 503 is a valid result: the AI is an optional helper and must
      // never stop someone from publishing a post.
      expect([200, 503]).toContain(response.status);

      if (response.status === 200) {
        expect(Array.isArray(response.body.tags)).toBe(true);
        expect(response.body.tags.length).toBeLessThanOrEqual(5);
      }
    },
    45000
  );
});

describe("Unknown routes", () => {
  it("should return 404 with a JSON body", async () => {
    const response = await api.get("/api/does-not-exist").expect(404);

    expect(response.body.error).toBe("Not found");
  });
});
