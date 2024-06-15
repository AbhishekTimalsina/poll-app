const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const pollRoute = require("./routes/poll");

const PORT = 3000 || process.env.PORT;

app.use(
  cors({
    origin: "https://pollapphai.netlify.app/",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(pollRoute);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
});
