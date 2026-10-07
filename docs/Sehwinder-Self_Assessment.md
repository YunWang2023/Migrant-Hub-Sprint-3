# Sprint 3 Self-Assessment - Sehwinder Singh

**Project:** Migrant Hub
**Sprint:** Sprint 3 (17 September - 7 October 2026)
**My part:** Backend — login system, the AI feature, testing and putting the site online

## What I did

- Made the User model and used bcrypt so the password is never saved as plain
  text.
- Made the login tokens (JWT) and the middleware that checks the token and finds
  the user.
- Changed posts so the author name comes from the logged in user, not from a box
  someone types in. Now nobody can post with another person's name.
- Built the AI endpoint that asks Google Gemini for a category, tags and a short
  summary. If the AI does not answer, you can still publish the post.
- Wrote 43 tests with Vitest and Supertest. They use their own database, so our
  demo data is safe.
- Added edit and delete for your own posts. If the post is not yours, the server
  says no.
- Set up the MongoDB Atlas database and the `.env.example` file.
- Put the site online on Render, with Express serving the built React app so it
  all runs as one service.
- Built the Sprint 3 presentation.

## What went well

The tests were the best thing I did. On the last night I changed a lot of backend
code, and I could run `npm test` and know in 20 seconds if something broke.
Without them I would have been guessing.

The AI failing safely also worked well. Gemini was busy almost every time near
the deadline, and the site was still fine, because publishing never waits for the
AI.

## What was hard

Two of us changed the same file on the same night and I had to fix the conflict by
hand. That was my fault too, because we never said who owns which file.

The AI being down so often also made it hard to know if my code was wrong or the
service was busy. I found the real reason only after I printed the full answer
from Google instead of just the status number.

## What I would do differently

Say who owns which file before we start and begin the documents in the first
week instead of the last two days.

## My grade

**Full marks.**

I finished everything in my part of the task split and I helped others with three things that
like I helped in the automated tests, edit and delete for your own posts and
putting the site online. Everything I built works in the deployed site and is
covered by tests.
