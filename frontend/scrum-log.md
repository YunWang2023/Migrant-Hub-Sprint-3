# Daily Scrum Log — Sprint 2

**Project:** Migrant Hub — Student Onboarding and Blogging Platform  
**Sprint 2 Duration:** 3 September – 17 September 2026  
**Scrum Master:** Sajib Das  

| Date | Attendance | Progress & Work Completed | Blockers & Next Steps | Committed By |
|---|---|---|---|---|
| **Thu 3 Sep** | All (5) | Refined product backlog and established Sprint 2 goals. Defined team splits: Sajib, Pratham, and Prabhleen on Frontend; Sehwinder and Yun on Backend. | Blocked on API contract agreement. Next: Finalize API endpoints and build shared navbar and post models. | All |
| **Wed 9 Sep** | All (5) | Attended MongoDB/Mongoose class session. Sehwinder set up local/Atlas MongoDB connection and designed initial array models for Post, Community, and MustDo. Prabhleen built shared Navbar/Footer and React Router links. | Sehwinder setting up Mongoose schemas. Next: Build array-based controllers and core page views. | Sehwinder / Prabhleen |
| **Thu 10 Sep** | All (5) | Yun completed array-based Express REST API endpoints for Posts and tested routes in Postman. Pratham created a reusable Post Card component and set up mock post data. | Sehwinder preparing seed data. Next: Build MustDo overview and detail page structures. | Yun / Pratham |
| **Fri 11 Sep** | All (5) | Sajib created `mustDoData.js` with corrected links for Finnish Police and S-Pankki. Built reusable `MustDoPage.jsx` component handling all 6 checklist items via state/props. | Need input validation middleware. Next: Build Auth and Community page placeholders. | Sajib |
| **Sat 12 Sep** | All (5) | Pratham completed the "Write a Post" controlled form with a dynamic 512-word limit counter. Sajib created Login and Register forms with success message state. | Backend middleware refactoring. Next: Error handling and community endpoints. | Pratham / Sajib |
| **Sun 13 Sep** | All (5) | Yun implemented custom request validation (`validatePost.js`) and JSON error handling middleware (`errorHandler.js`). Sajib added the Community page with a `useState` toggle for joining. | Prepare for Mongoose refactor. Next: Swap array models to Mongoose schemas. | Yun / Sajib |
| **Mon 14 Sep** | All (5) | Sehwinder refactored data models from array methods to Mongoose models without altering controller signatures. Created database seeding script `seedData.js`. | Re-testing endpoints required. Next: Run full Postman test suite. | Sehwinder |
| **Tue 15 Sep** | All (5) | Yun executed full Postman collection tests against MongoDB and captured passing screenshots. Sajib verified all React page routes (`/must-do`, `/login`, `/register`, `/community`) render cleanly in `App.jsx`. | Feature freeze in effect. Next: Process documentation and presentation preparation. | Yun / Sajib |
| **Wed 16 Sep** | All (5) | Code freeze observed. Completed team 4Ls Retrospective (Liked, Learned, Lacked, Longed for), individual LLM self-assessments, and finalized presentation slides. | Rehearsal timing check. Next: Final presentation and OMA submission on 17 Sep. | All |