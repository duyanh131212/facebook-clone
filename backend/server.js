const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { readdirSync } = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

//import routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//connect database
mongoose.set("strictQuery", false); //this is to avoid deprecation warning
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected ...");
  })
  .catch((err) => {
    console.log(err);
  });

//port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} ...`);
});
