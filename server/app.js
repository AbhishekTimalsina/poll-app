const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { job } = require("./cron.js");

const pollRoute = require("./routes/poll");

const PORT = 3000 || process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

job.start();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(pollRoute);

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
});
