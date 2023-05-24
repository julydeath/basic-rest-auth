const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routers/auth.js");

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to DB....");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/auth", authRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log("server listining on port 8080");
});
