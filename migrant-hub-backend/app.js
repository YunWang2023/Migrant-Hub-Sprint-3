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
const mustDoRoutes = require("./routes/mustDoRoutes");
const communityRoutes = require("./routes/communityRoutes");

app.use("/api/posts", postRoutes);
app.use("/api/mustdo", mustDoRoutes);
app.use("/api/communities", communityRoutes);

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