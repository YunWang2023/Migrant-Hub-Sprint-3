const mongoose = require("mongoose");

// Which database we connect to depends on the environment, so running
// the tests never touches the data used for development.
function databaseUri() {
  if (process.env.NODE_ENV === "test") {
    return process.env.MONGO_URI_TEST;
  }

  return process.env.MONGO_URI;
}

async function connectDB() {
  const uri = databaseUri();

  if (!uri) {
    const name =
      process.env.NODE_ENV === "test" ? "MONGO_URI_TEST" : "MONGO_URI";
    throw new Error(`${name} is missing from .env`);
  }

  await mongoose.connect(uri);

  if (process.env.NODE_ENV !== "test") {
    console.log("MongoDB connected");
  }
}

module.exports = connectDB;
