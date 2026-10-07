
Loading older messages…
write aa post maiiii first we need to login after that we will able to write aa post matlbb pehle login page show hoo raha hai firrr post vala aa raha haiiii wohh chij vi btani hai
Haan, ye important point Slide 5 mein add karna chahiye, kyunki flow actually Login → Write a Post → Publish hai. Isko natural way mein aise bolo:

Slide 5 – Write a Post
“Next, we have the Write a Post feature. In Sprint 1, publishing a post was only a concept and it wasn’t actually working. But now in Sprint 3, users can create and publish real posts.

First, the user needs to log in. If the user is not logged in and tries to access the Write a Post page, the application shows the Login page first. After successfully logging in, the user can access the Write a Post page and create a post.

Here, the user can enter a title, write the content, and select a category, such as Housing or Food. After clicking Publish Post, the post is sent to the backend and saved.

For example, I can log in, write a post about Indian food, select Food as the category, and publish it. After publishing, the post appears on the Blog page and can also be found through the Food category.

So, this page is protected by authentication, and only logged-in users are able to create and publish posts.”

Ye tumhari slide ke main point “Only a signed-in user can reach the writing page” ko bhi clearly explain karta hai. 

wohhh hmnee demo mai dikhana haii tohhh example bolna shi rhe ga kya
Haan, agar live demo mein tum khud login → write post → publish → blog mein show karne wali ho, toh presentation script mein “For example, I can…” bolna thoda repetitive lagega. Better hai pehle feature explain karo aur phir bolo ki ab hum demo mein ye flow dikhayenge.

Slide 5 ko aise bolo:

“Next, we have the Write a Post feature. In Sprint 1, publishing a post was only a concept and it wasn’t actually working. But now in Sprint 3, users can create and publish real posts.

First, the user needs to log in. If the user is not logged in and tries to access the Write a Post page, the application shows the Login page first. After successfully logging in, the user can access the Write a Post page.

Here, the user can enter a title, write the content, and select a category. After clicking Publish Post, the post is sent to the backend and saved. The published post can then be seen on the Blog page.

This page is protected by authentication, so only logged-in users can create and publish posts. We’ll show this complete flow in our demo.”

Ye zyada professional lagega because presentation mein tum explain karogi aur demo mein actually karke dikhaogi. 

abbb4 , 5 jaa dono bhej diii final touch dai kkk joo mai bol saku
Bilkul ❤️ ye final version rakh lo — natural English, easy to remember, aur aisa lagega ki tum explain kar rahi ho, sirf slide read nahi kar rahi.

Slide 4 – Blog Page
“Now, let’s look at our Blog page. In Sprint 1, we only had a prototype with static content. But in Sprint 3, we connected the Blog with our backend and MongoDB, so now it displays real posts from our database.

Each post shows its category, title, description, and author. The author is automatically connected to the account of the user who created the post.

For example, if I’m logged in as Prabhleen Kaur and publish a post, my name will appear as the author. If another user creates a post from their account, their name will appear instead.

We can also click Read More to open the post and see the full content. So, compared to Sprint 1, our Blog page is now fully functional and connected to real data.”


Slide 5 – Write a Post
“Next, we have the Write a Post feature. In Sprint 1, publishing a post was only a concept and it wasn’t actually working. But now in Sprint 3, users can create and publish real posts.

First, the user needs to log in. If the user is not logged in and tries to access the Write a Post page, the Login page is shown first. After successfully logging in, the user can access the Write a Post page.

Here, the user can enter a title, write the content, and select a category. When they click Publish Post, the post is sent to the backend and saved. After publishing, the post can be seen on the Blog page.

So, this page is protected by authentication, which means only logged-in users can create and publish posts. We’ll show this complete flow in our demo.”


Bas ye final rakh lo. Slide 4 se Slide 5 ka transition bhi natural hai, aur end mein demo ka mention bhi aa gaya.

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
- Set up the MongoDB Atlas database and the .env.example file.
- Put the site online on Render, with Express serving the built React app so it
  all runs as one service.
- Built the Sprint 3 presentation.

## What went well

The tests were the best thing I did. On the last night I changed a lot of backend
code, and I could run npm test and know in 20 seconds if something broke.
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
covered by tests.    mereko viii meri ese hiii self assesment bnaa daiiii bss mera main kamm front end pr thaa aur aurr maine sprint 3 kk according bhej dai
…
Haan, tumhare Sprint 3 ke actual frontend work ke according, Sehwinder wali same style aur simple English mein ye use kar sakti ho. Presentation mein bhi tumhara contribution frontend side par listed hai: shared API hook, environment URL, auth context, tokens, protected routes, and signed-in navigation. 

Sprint 3 Self-Assessment - Prabhleen Kaur
Project: Migrant Hub
Sprint: Sprint 3 (17 September - 7 October 2026)
My part: Frontend — API connection, authentication, protected routes and navigation

What I did
Worked mainly on the frontend and connected it with our backend API.
Made a shared API hook so the frontend can get data from the backend more easily.
Set up the environment URL so the frontend works correctly with the API in development and deployment.
Worked on the authentication context to keep track of whether a user is logged in or not.
Handled the authentication token on the frontend after login.
Added protected routes so some pages can only be accessed by logged-in users.
Updated the navigation based on the login status of the user.
Helped connect the Blog and Write a Post flow with authentication.
Helped with integration and fixing frontend issues when connecting our work together.
Took part in the daily Scrums, Sprint Review and Sprint 3 presentation.
What went well
The authentication flow worked well. The frontend can recognize when a user is logged in and show the correct pages and navigation.

I also liked how the frontend and backend worked together in the final version. For example, a user needs to log in before accessing the Write a Post page, and after login they can continue using the protected features.

What was hard
Connecting the frontend with the backend was sometimes difficult because both sides needed to use the same API routes and data.

We also had some problems when combining everyone's work. Working on the same React project can cause conflicts, so we had to communicate and fix some things together.

What I would do differently
I would communicate earlier about who is working on each file and test the frontend and backend together more often during the Sprint instead of waiting until the end.

I would also keep the frontend structure and API connections organized from the beginning, because it makes integration easier later.

My grade
Full marks.

I completed my frontend tasks for Sprint 3, including the shared API connection, authentication context, tokens, protected routes and signed-in navigation. I also helped with integration and worked with the team to make sure the frontend and backend worked together correctly in the final application.




