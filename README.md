# Migrant Hub – API Documentation

Migrant Hub is a web application designed to help newcomers in Finland find useful information about everyday life, services, communities, and practical tasks.

**Live site:** https://migrant-hub-sprint-3.onrender.com

## Sprint 3

Sprint 3 focuses on connecting the frontend and backend, adding authentication, protecting API routes, adding AI post enrichment, testing the API, and deploying the application.

## Backend

The backend is built with:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

## API Base URL

In development:

```text
http://localhost:4000/api
```

In production the frontend is served by the same Express app, so the API is at `/api` on the deployed site:

```text
https://migrant-hub-sprint-3.onrender.com/api
```

The frontend always calls `/api`. In development Vite proxies that to port 4000; in production it is the same origin, so no proxy is needed.

## Running the API

```bash
cd migrant-hub-backend
npm install
cp .env.example .env      # then fill in the values
npm run seed              # loads demo data
npm run dev               # starts the API on port 4000
npm test                  # runs the Vitest test suite
```

To run the production build locally, the way the deployed site runs:

```bash
cd frontend
npm run build
rm -rf ../migrant-hub-backend/public
cp -r dist ../migrant-hub-backend/public

cd ../migrant-hub-backend
npm start
```

Express then serves the built React app from `migrant-hub-backend/public`, so the whole site runs on one port. The `public` folder is committed, so Render only has to install and start the backend.

---

# Authentication

Authentication uses JWT (JSON Web Token). Tokens are valid for 7 days.

For protected requests, send the token in the request header:

```text
Authorization: Bearer <token>
```

## Register

### POST `/auth/register`

Creates a new user account.

### Request

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Test123456"
}
```

The password must be at least 8 characters.

### Success Response

**201 Created**

```json
{
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "user"
  },
  "token": "..."
}
```

The password is not returned in the response.

### Validation Failed

**400 Bad Request**

```json
{
  "error": "Validation failed",
  "details": ["password must be at least 8 characters"]
}
```

### Duplicate Email

**409 Conflict**

```json
{
  "error": "Email already registered"
}
```

---

## Login

### POST `/auth/login`

Logs in an existing user and returns a JWT token.

### Request

```json
{
  "email": "testuser@example.com",
  "password": "Test123456"
}
```

### Success Response

**200 OK**

```json
{
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "user"
  },
  "token": "..."
}
```

### Invalid Login

**401 Unauthorized**

```json
{
  "error": "Invalid email or password"
}
```

The same error is returned for an unknown email or an incorrect password. This is deliberate: a different message would tell an attacker which email addresses exist.

---

## Current User

### GET `/auth/me`

Returns the currently authenticated user. The frontend calls this on startup to check whether a saved token is still valid.

### Authentication

Requires:

```text
Authorization: Bearer <token>
```

### Success Response

**200 OK**

```json
{
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "user"
  }
}
```

The password is not returned.

### No Token

**401 Unauthorized**

```json
{
  "error": "Authentication required"
}
```

### Invalid or Expired Token

**401 Unauthorized**

```json
{
  "error": "Invalid or expired token"
}
```

---

## Logout

### POST `/auth/logout`

Requires a valid authentication token. The token is removed by the frontend; the endpoint exists so the client has a single place to call.

### Success Response

**200 OK**

```json
{
  "message": "Logged out successfully"
}
```

---

# Posts API

Reading posts is public. Creating, updating, and deleting posts require authentication, and a post can only be changed by the user who wrote it.

## The Post Object

```json
{
  "id": "...",
  "title": "Finding a flat in Vantaa",
  "body": "What I learned applying for student housing...",
  "author": "Test User",
  "user": "...",
  "category": "Housing",
  "tags": ["housing", "vantaa"],
  "aiTeaser": "A short summary for the listing page.",
  "communityId": "...",
  "imageUrl": null,
  "createdAt": "2026-10-06T21:00:00.000Z",
  "updatedAt": "2026-10-06T21:00:00.000Z"
}
```

`category` must be one of: `Housing`, `Paperwork`, `Transport`, `Food`, `Study`, `Community`, `Places`.

`author` and `user` are taken from the token. If a request sends them they are ignored, so nobody can post under someone else's name.

## Get All Posts

### GET `/posts`

Public. Returns an array of posts, newest first.

### Query Parameters

| Parameter | Example | Description |
|---|---|---|
| `category` | `?category=Housing` | Only posts in that category |
| `search` | `?search=bank` | Matches the title or body, case-insensitive |
| `communityId` | `?communityId=...` | Only posts in that community |
| `limit` | `?limit=3` | Maximum number of posts (default 100) |

The search term is escaped before it reaches MongoDB, so `.*` is treated as text and not as a regular expression.

---

## Get One Post

### GET `/posts/:id`

Public. Returns one post.

**200 OK** – the post object
**400 Bad Request** – the id is not a valid MongoDB id
**404 Not Found** – no post with that id

---

## Create Post

### POST `/posts`

Requires authentication.

### Request

```json
{
  "title": "Finding a flat in Vantaa",
  "body": "What I learned applying for student housing...",
  "category": "Housing",
  "tags": ["housing", "vantaa"],
  "aiTeaser": "A short summary for the listing page.",
  "communityId": "..."
}
```

`title`, `body` and `category` are required. The title is limited to 120 characters and the body to 512 words. `tags`, `aiTeaser` and `communityId` are optional.

### Responses

**201 Created** – the new post object

**400 Bad Request**

```json
{
  "error": "Validation failed",
  "details": ["category is required"]
}
```

**401 Unauthorized** – no valid token

---

## Update Post

### PATCH `/posts/:id`

Requires authentication. Only the fields you send are changed.

### Request

```json
{
  "title": "Finding a flat in Vantaa (updated)"
}
```

### Responses

**200 OK** – the updated post object
**401 Unauthorized** – no valid token
**403 Forbidden** – the post belongs to another user

```json
{
  "error": "You can only change your own posts"
}
```

**404 Not Found** – no post with that id

---

## Delete Post

### DELETE `/posts/:id`

Requires authentication.

**204 No Content** – deleted, with an empty body
**401 Unauthorized** – no valid token
**403 Forbidden** – the post belongs to another user
**404 Not Found** – no post with that id

---

## AI Suggestions

### POST `/posts/enrich`

Requires authentication. Sends a draft to Google Gemini and returns a suggested category, tags and summary. The writer can edit or ignore everything that comes back.

This endpoint is a helper, not a step in publishing: if it fails, the Write a Post page shows a note and the post can still be published.

### Request

```json
{
  "title": "Opening a bank account in Helsinki",
  "body": "I took my passport and residence permit to the bank..."
}
```

### Success Response

**200 OK**

```json
{
  "aiTeaser": "A short summary of the post.",
  "tags": ["banking", "helsinki", "paperwork"],
  "category": "Paperwork"
}
```

At most five tags are returned, and the category is only returned if it is one of the seven allowed values. The API key stays on the server and is never sent to the browser.

### Other Responses

**400 Bad Request** – the title or body is empty
**401 Unauthorized** – no valid token
**503 Service Unavailable** – the AI service did not answer

```json
{
  "error": "AI suggestions are currently unavailable"
}
```

---

# Communities API

Reading is public. Creating, updating and deleting require authentication.

### GET `/communities`

Returns an array of communities.

```json
[
  {
    "id": "...",
    "name": "Helsinki Newcomers",
    "description": "Tips and questions about settling in Helsinki.",
    "memberCount": 42
  }
]
```

### GET `/communities/:id`

Returns one community. **404** if it does not exist.

### GET `/communities/:id/posts`

Returns the posts belonging to that community. **404** if the community does not exist.

### POST `/communities`

Requires authentication. Body: `name` (max 60 characters, unique) and `description` (max 300 characters).

**201 Created**, **400** on validation failure, **401** without a token, **409** if the name is taken.

### PATCH `/communities/:id`

Requires authentication. **200 OK**, **401**, **404**.

### DELETE `/communities/:id`

Requires authentication. **204 No Content**, **401**, **404**.

---

# Must Do API

The six steps a newcomer has to complete. Items are addressed by `slug`, not by id. Reading is public; writing requires authentication.

### GET `/mustdo`

Returns the checklist in order.

```json
[
  {
    "id": "...",
    "slug": "dvv",
    "title": "DVV Registration",
    "summary": "Register your personal information and address in Finland with DVV.",
    "whatIsIt": "...",
    "whoNeedsIt": "...",
    "documents": ["Passport", "Residence permit", "Rental agreement"],
    "howLong": "1 to 3 weeks",
    "officialUrl": "https://dvv.fi/en/foreigner-registration",
    "officialLabel": "DVV: registering a foreigner",
    "checkedOn": "2026-09-01",
    "order": 1
  }
]
```

`officialUrl` and `checkedOn` are stored with every item so the site always links to the official source and shows when the information was last verified. This content is written by hand, not generated.

### GET `/mustdo/:slug`

Returns one item. **404** if the slug does not exist.

### POST `/mustdo`

Requires authentication. **201 Created**, **400**, **401**, **409** if the slug is taken.

### PATCH `/mustdo/:slug`

Requires authentication. **200 OK**, **401**, **404**.

### DELETE `/mustdo/:slug`

Requires authentication. **204 No Content**, **401**, **404**.

---

# Errors

Every error is JSON with an `error` field. Validation errors also include `details`.

| Status | Meaning | Example |
|---|---|---|
| 400 | Bad request | Missing field, invalid category, malformed id |
| 401 | Not authenticated | No token, expired token, wrong password |
| 403 | Not allowed | Editing a post written by someone else |
| 404 | Not found | Unknown id, slug, or route |
| 409 | Conflict | Email or community name already in use |
| 503 | Service unavailable | The AI service did not answer |
| 500 | Server error | Anything unhandled |

```json
{
  "error": "Validation failed",
  "details": ["title is required", "invalid category"]
}
```

---

# CORS

CORS is enabled in the Express application. In development the frontend runs on port 5173 and the API on port 4000, so the browser treats them as different origins. In production both are served by the same Express app, so CORS is not needed there, but it stays enabled so the development setup keeps working.

---

# Deployment

The site is deployed as a single service on Render.

The React app is built with `npm run build` in `frontend`, and the result is copied into `migrant-hub-backend/public`, which is committed to the repository. Express serves that folder, and any path that is not an API route returns `index.html` so React Router can handle it in the browser.

Render settings:

| Setting | Value |
|---|---|
| Root Directory | `migrant-hub-backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Environment | `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `GEMINI_MODEL` |

`PORT` is not set: Render provides it, and `index.js` reads `process.env.PORT` with 4000 as the fallback.

The free instance sleeps after a period of inactivity, so the first request after a quiet period takes up to a minute to answer.

**When the frontend changes**, rebuild it and copy it into `public` again, then commit. Otherwise the deployed site keeps serving the previous build.

---

# API Testing

## Automated tests

The API is tested with **Vitest** and **Supertest**, the tools used in the Week 7 testing labs.

```bash
npm install vitest supertest -D
npm install cross-env
npm test
```

`cross-env NODE_ENV=test` makes `config/db.js` connect to `MONGO_URI_TEST` instead of `MONGO_URI`, so the tests never touch the data used for the demo. Supertest starts the Express app from `app.js` in memory, which is why `app.js` only builds the app and `index.js` connects to the database and listens.

| Script | What it does |
|---|---|
| `npm test` | Runs every test once |
| `npm run test:watch` | Re-runs tests as files change |
| `npm run test:coverage` | Runs the tests and reports coverage |

43 tests in three files:

- **`tests/auth.test.js`** – register, duplicate email, short password, invalid email, login, the identical error for a wrong password and an unknown email, `/auth/me` with a valid, missing and invalid token, and logout
- **`tests/posts.test.js`** – public reading, creating without a token, the author being taken from the token, an `author` sent by the client being ignored, missing and invalid categories, the 512 word limit, unknown and malformed ids, partial updates, 403 when another user updates or deletes, category filtering, search terms being escaped, and the owner deleting their own post
- **`tests/content.test.js`** – communities and the Must Do checklist, 401 on every write route, the AI endpoint without a token and with an empty draft, and a 404 with a JSON body for an unknown route

## Manual testing

Endpoints were also checked by hand in the browser and with Postman during development. The automated suite replaced the saved Postman collection as the testing artifact for this sprint.

---

# API Summary

| Method | Endpoint | Authentication |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Required |
| POST | `/auth/logout` | Required |
| GET | `/posts` | Public |
| GET | `/posts/:id` | Public |
| POST | `/posts` | Required |
| PATCH | `/posts/:id` | Required, owner only |
| DELETE | `/posts/:id` | Required, owner only |
| POST | `/posts/enrich` | Required |
| GET | `/communities` | Public |
| GET | `/communities/:id` | Public |
| GET | `/communities/:id/posts` | Public |
| POST | `/communities` | Required |
| PATCH | `/communities/:id` | Required |
| DELETE | `/communities/:id` | Required |
| GET | `/mustdo` | Public |
| GET | `/mustdo/:slug` | Public |
| POST | `/mustdo` | Required |
| PATCH | `/mustdo/:slug` | Required |
| DELETE | `/mustdo/:slug` | Required |
