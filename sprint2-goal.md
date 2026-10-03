# Sprint 2 Goal

**Project:** Migrant Hub — a website that helps new international students in Finland
**Sprint 2:** 3 September – 17 September 2026

---

## Our goal

> In Sprint 2 we will build two things separately: the frontend in Reac and the backend
> in Express. We will not connect them yet. Before we start, we will agree on how they will
> talk to each other later.

By the end of the sprint we want:

- a React website you can click through, using some data
- a backend that stores and returns the same data, tested in Postman
- one document that says which API endpoints we will use, so both sides match when we
  connect them in Sprint 3

## What we will build

**Frontend (React)**

- React components for the nine screens we designed in Sprint 1
- Routing, so the pages change when you click the navbar
- A navbar that works on every page
- Layouts that also work on a phone
- Blog list, single post page, Must Do pages, community page
- The "write a post" form with the word counter (max 512 words)
- Login and register pages — these only show a message like "Login successful". They do
  not really log anyone in.
- Data written in the same shape as the real API will use
- Styling that matches our Sprint 1 prototype

**Backend (Express)**

- Server set up using the MVC structure from class
- Models for posts, communities and Must Do items
- Routes, controllers and middleware
- Create, read, update and delete for our data
- Start with data in arrays, then change it to MongoDB and Mongoose after we learn it in class
- Error handling
- Test every endpoint in Postman

**Both teams together**

- Write down the API: the endpoints, the methods (GET, POST, PUT, DELETE), what data goes
  in, what JSON comes back and the type of every field

## What we are NOT doing

These are Sprint 3 jobs. We are not doing them now, even if we have time:

- connecting the frontend to the backend
- real login, passwords, JWT or sessions
- API documentation
- automated tests
- the AI feature

**Why we are leaving out AI:** it is optional this sprint and it is the main thing we want
to build in Sprint 3. We would rather finish a clean frontend and backend than rush all
three and do all of them badly.

## Who is doing what

| Team | Members |
|---|---|
| Frontend (React) | Sajib Das, Pratham Arora, Prabhleen Kaur |
| Backend (Express) | Sehwinder Singh, Yun Wang |


## When is something "done"?

We agree a task is done when:

1. The code runs and does not throw errors.
2. It looks and works like our Sprint 1 prototype.
3. It follows what we learned in class — components on the frontend, MVC on the backend.
4. Backend endpoints have been tested in Postman and give back the JSON we agreed.
5. It is pushed on a feature branch, reviewed by one teammate in a pull request and merged
   into `dev`.
