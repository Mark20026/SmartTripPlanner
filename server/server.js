const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./controllers/authController");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);

const DB =
  "mongodb+srv://bogimark2002:TripPlannerBM@cluster0.7wjvm.mongodb.net/tripPlanner";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
