const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();
const notFound = require("./middleware/not-found");
// middleware
app.use(express.static("./public"));

//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// route
app.use("/api/v1/tasks", tasksRoute);

app.use(notFound);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
