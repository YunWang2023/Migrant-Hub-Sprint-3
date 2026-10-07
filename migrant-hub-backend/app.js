require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const communityRoutes = require("./routes/communityRoutes");
const mustDoRoutes = require("./routes/mustDoRoutes");

// This file only builds the Express app. Connecting to MongoDB and
// listening on a port happens in index.js, so the test suite can
// import the app without starting a real server.
const app = express();

app.use(cors());
app.use(express.json());

// Keep the request log out of the test output.
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/mustdo", mustDoRoutes);

// The built React app is copied into this folder, so the backend
// serves the whole site and we deploy one service.
const publicFolder = path.join(__dirname, "public");

if (fs.existsSync(publicFolder)) {
  app.use(express.static(publicFolder));

  // Anything that is not an API route is a React Router path, so send
  // index.html and let the router in the browser handle it.
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    res.sendFile(path.join(publicFolder, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

module.exports = app;