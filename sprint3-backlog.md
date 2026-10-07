# Sprint 3 Backlog

**Project:** Migrant Hub - student onboarding and blogging platform
**Sprint:** Sprint 3 (17 September – 7 October 2026)
**Board:** <https://trello.com/b/xGXjiGYn/20268-group-4>

## Sprint goal

Connect the React frontend with the backend API so the application works properly
from start to finish, add working registration and login, and deploy the
application. The Sprint 1 prototype is the reference.

## Integration

- Integration spike: blog list reading GET /api/posts end to end
- CORS so the frontend can call the API
- API base URL in an environment variable
- Custom hook for calling the API with loading, error and data
- Reconcile the mock page copy with the seeded database

## Authentication

- User model: name, email, password hash, role, timestamps
- Hash passwords with bcrypt before saving
- Check a submitted password against the stored hash
- Issue and verify JWTs with the secret in .env
- Auth middleware that reads the token and attaches the user
- Register and login controllers and routes
- Logout and current user routes
- One consistent error shape for authentication failures
- Authentication state with useContext
- Store the token, send it on protected requests, clear it on logout
- Protected routes: Write a Post redirects to Login
- Navbar shows the user name and Logout when signed in
- Login and Register forms with real errors

## Posts and publishing

- Home page reads real posts from the API
- Blog list from the API with loading and error states
- Post detail page by id, handling a post that does not exist
- Write a Post sending a real POST request
- Post author taken from the logged in user, not typed
- Protect create, update and delete post routes
- Category filter and search results page

## AI enrichment

- AI endpoint returning a teaser, tags and a category
- Keep the Gemini key on the server, never in the browser
- Handle AI failure so publishing is never blocked
- Show the AI suggestions and let the writer edit them

## Must Do and Community

- Must Do overview and detail reading from the API
- Community page reading real communities and their posts

## Quality and documentation

- API tests
- Postman collection updated with the auth requests
- API documentation
- Responsiveness and accessibility pass across every page
- Document every environment variable in .env.example

## Process

- Daily scrum log written on the day
- Sprint Review
- Sprint Retrospective in 4Ls with velocity and team satisfaction
- Contribution record
- Frontend self assessment
- Backend self assessment
- Alignment with the Sprint 1 prototype
- Presentation of 10 to 12 minutes and a timed rehearsal



