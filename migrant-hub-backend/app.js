require("dotenv").config();
const connectDB = require("./config/db");

const express = require("express");

const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");

const app = express();
connectDB();

app.use(express.json());

app.use(morgan("dev"));

const postRoutes = require("./routes/postRoutes");

app.use("/api/posts", postRoutes);

const PORT = 4000;

app.use((req, res) => {
  res.status(404).json({
    error: "Not found"
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});