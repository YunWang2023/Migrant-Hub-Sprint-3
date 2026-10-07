# Daily Scrum Log — Sprint 3

**Project:** Migrant Hub
**Sprint 3 goal:** Connect the React frontend to the Express API so the application works end to end, add real registration and login, and deploy it — keeping the Sprint 1 prototype as the reference.
**Scrum Master:** Sajib Das
**Note:** Entries from 17 Sep to 6 Oct were written up afterwards from meeting notes, chat and Git history. Entries from 7 Oct onward are recorded on the day.

| Date | Attendance | Progress & Work Completed | Blockers & Next Steps | Recorded By |
|---|---|---|---|---|
| **Thu 17 Sep** | All (5) | Sprint 2 presented. Started Sprint 3 planning: reviewed Sprint 2 velocity (25 of 26 tasks) and agreed the 10% buffer. | Next: agree the Sprint 3 goal and split tasks between frontend and backend. | Sajib |
| **Mon 21 Sep** | All (5) | Agreed the Sprint 3 goal (connect frontend to API, real auth, deploy). Split tasks: Pratham, Prabhleen, Sajib on frontend; Sehwinder, Yun on backend. | Next: agree the authentication approach before anyone builds on it. | Sajib |
| **Tue 22 Sep** | All (5) | Agreed auth approach: JWT returned on login, token stored on the frontend, create/update/delete posts protected, reading stays public. | Next: Sehwinder to design the User model; Yun to plan the auth endpoints. | Sajib |
| **Wed 23 Sep** | All (5) | Reviewed the API contract for the new auth endpoints (register, login, logout, current user) and the unified error shape. | Next: plan the integration spike — blog list fetching real data from GET /api/posts. | Sajib |
| **Thu 24 Sep** | All (5) | Named what we drop first if short on time: role-based access, admin review, AI community suggestion. Agreed integration must not wait until the end of the sprint. | Next: reconcile mock wording with the seeded database (Sajib + Sehwinder). | Sajib |
| **Mon 28 Sep** | All (5) | Sajib and Sehwinder compared Must Do and community wording between the mock data and the seed file. Prabhleen planned the shared useApi hook and AuthContext. | Others' pages depend on Prabhleen's hook and auth context. Next: decide the hook's interface. | Sajib |
| **Tue 29 Sep** | All (5) | Sehwinder planned password hashing (bcrypt pre-save hook) and JWT helpers with the secret in .env. Yun planned CORS as a day-one task. | Next: start the backend auth branch. | Sajib |
| **Wed 30 Sep** | All (5) | Pratham planned the blog list, post detail and Write a Post flow with the author taken from the logged-in user. Sehwinder scoped the AI enrichment (teaser, tags, category, failure path). | Risk: the AI feature growing too big. Next: keep it to one call and four fields. | Sajib |
| **Thu 1 Oct** | All (5) | Reviewed progress against the week-by-week plan. Agreed to try deployment in week 7 rather than leaving it to week 8. | Next: push the backend auth work and start frontend integration. | Sajib |
| **Mon 5 Oct** | All (5) | Yun merged register, login, logout, current user, protected post routes and API docs (PR #3). Sehwinder merged the User model, JWT helpers and Gemini AI service (PR #2). Prabhleen added AuthContext, useApi and ProtectedRoute. Sajib connected Must Do and Community pages to the API. | Blocker: Sprint 2 copy (a996351) reverted backend app.js, losing auth routes and CORS on main. Next: restore backend from 8f3e721. | Sajib |
| **Tue 6 Oct** | All (5) | Sajib finished Login and Register with real authentication, added the Sign up link and opened a PR. Pratham fixed navigation and posts. | Blockers: backend on main still missing auth routes; Sajib's PR not yet merged. Next: merge PRs, restore backend, accessibility pass, deployment. | Sajib |