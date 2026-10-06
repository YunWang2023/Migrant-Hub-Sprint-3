# Migrant Hub - Sprint 3

Migrant Hub is a web application designed to help newcomers in Finland find useful information about everyday life, services, communities, and practical tasks.

## Sprint 3

Sprint 3 focuses on connecting the frontend and backend, adding authentication, protecting API routes, and testing the API.

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

```text
http://localhost:4000/api
```

# Authentication API

Authentication uses JWT (JSON Web Token).

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

The same error is returned for an unknown email or an incorrect password.

---

## Current User

### GET `/auth/me`

Returns the currently authenticated user.

### Authentication

Requires:

```text
Authorization: Bearer <token>
```

### Success Response

**200 OK**

Returns the authenticated user's information.

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

Requires a valid authentication token.

### Authentication

```text
Authorization: Bearer <token>
```

### Success Response

**200 OK**

```json
{
  "message": "Logged out successfully"
}
```

---

# Posts API

Reading posts is public.

Creating, updating, and deleting posts require authentication.

## Get All Posts

### GET `/posts`

Public endpoint.

Returns the posts.

---

## Get One Post

### GET `/posts/:id`

Public endpoint.

Returns one post by its ID.

---

## Create Post

### POST `/posts`

Requires authentication.

### Authentication

```text
Authorization: Bearer <token>
```

### Responses

**201 Created**

The post is created successfully.

**401 Unauthorized**

Returned when no valid authentication token is provided.

---

## Update Post

### PATCH `/posts/:id`

Requires authentication.

### Authentication

```text
Authorization: Bearer <token>
```

### Responses

**200 OK**

The post is updated successfully.

**401 Unauthorized**

Returned when no valid authentication token is provided.

---

## Delete Post

### DELETE `/posts/:id`

Requires authentication.

### Authentication

```text
Authorization: Bearer <token>
```

### Responses

**204 No Content**

The post is deleted successfully.

**401 Unauthorized**

Returned when no valid authentication token is provided.

---

# Authentication Errors

Protected endpoints use HTTP `401 Unauthorized` when authentication fails.

### Missing Token

```json
{
  "error": "Authentication required"
}
```

### Invalid or Expired Token

```json
{
  "error": "Invalid or expired token"
}
```

### Invalid Login

```json
{
  "error": "Invalid email or password"
}
```

---

# CORS

CORS is enabled in the Express application so that the frontend can communicate with the backend from a different origin.

---

# API Testing

The API was tested using Postman.

## Authentication Tests

- Register - Success
- Register - Duplicate Email
- Login - Success
- Login - Wrong Password
- Login - Unknown Email
- Current User - Valid Token
- Current User - No Token
- Current User - Invalid Token
- Logout - Valid Token

## Protected Post Tests

- Create Post - No Token
- Create Post - Valid Token
- Update Post - No Token
- Update Post - Valid Token
- Delete Post - No Token
- Delete Post - Valid Token

The Postman environment uses a `token` variable for authenticated requests.
