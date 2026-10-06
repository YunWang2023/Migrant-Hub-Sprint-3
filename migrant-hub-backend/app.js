require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const communityRoutes = require("./routes/communityRoutes");
const mustDoRoutes = require("./routes/mustDoRoutes");

// This file only builds the Express app. Connecting to MongoDB and
// listening on a port happens in server.js, so the test suite can
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

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

module.exports = app;
