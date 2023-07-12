const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// database connection with mongoose
const database = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.17kyq.mongodb.net/learning_portal?retryWrites=true&w=majority`;
    // const uri = "mongodb://127.0.0.1:27017/learning_portal";
    const mongo = await mongoose.connect(uri);
    if (mongo) {
      console.log("_________MongoDB successfully connected_________");
    }
  } catch (error) {
    console.log("Error : ", error);
  }
};

database();

app.get("/", (req, res) => {
  res.json({
    message: "Learning Portal Server is running!🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
