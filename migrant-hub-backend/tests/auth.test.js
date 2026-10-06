const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const connectDB = require("../config/db");
const User = require("../models/userModel");

const api = supertest(app);

const userData = {
  name: "Author Person",
  email: "author@example.com",
  password: "password123",
};

let token = null;

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  it("should create a user and return a token", async () => {
    const response = await api
      .post("/api/auth/register")
      .send(userData)
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.user.role).toBe("user");
    expect(response.body.user.password).toBeUndefined();

    token = response.body.token;
  });

  it("should reject an email that is already registered", async () => {
    const response = await api
      .post("/api/auth/register")
      .send(userData)
      .expect(409);

    expect(response.body.error).toMatch(/already registered/i);
  });

  it("should reject a password shorter than 8 characters", async () => {
    const response = await api
      .post("/api/auth/register")
      .send({
        name: "Short Pass",
        email: "short@example.com",
        password: "1234",
      })
      .expect(400);

    expect(response.body.error).toBe("Validation failed");
    expect(response.body.details.join(" ")).toMatch(/8 characters/);
  });

  it("should reject an invalid email address", async () => {
    await api
      .post("/api/auth/register")
      .send({
        name: "Bad Email",
        email: "not-an-email",
        password: "password123",
      })
      .expect(400);
  });
});

describe("POST /api/auth/login", () => {
  it("should log in with the correct password", async () => {
    const response = await api
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(userData.email);
  });

  it("should give the same error for a wrong password and an unknown email", async () => {
    const wrongPassword = await api
      .post("/api/auth/login")
      .send({ email: userData.email, password: "not-the-password" })
      .expect(401);

    const unknownEmail = await api
      .post("/api/auth/login")
      .send({ email: "nobody@example.com", password: "password123" })
      .expect(401);

    // The messages must match, otherwise an attacker can find out
    // which email addresses have an account.
    expect(wrongPassword.body.error).toBe(unknownEmail.body.error);
  });
});

describe("GET /api/auth/me", () => {
  it("should return the current user when the token is valid", async () => {
    const response = await api
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.user.email).toBe(userData.email);
  });

  it("should return 401 without a token", async () => {
    const response = await api.get("/api/auth/me").expect(401);

    expect(response.body.error).toMatch(/authentication required/i);
  });

  it("should return 401 for a token that is not valid", async () => {
    await api
      .get("/api/auth/me")
      .set("Authorization", "Bearer clearly.not.a.jwt")
      .expect(401);
  });
});

describe("POST /api/auth/logout", () => {
  it("should log out when the token is valid", async () => {
    const response = await api
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBeDefined();
  });

  it("should return 401 without a token", async () => {
    await api.post("/api/auth/logout").expect(401);
  });
});
