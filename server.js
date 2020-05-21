const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const port = process.env.PORT || 5000;
const uri = require("./key").uri;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection to MongoDb failed"));
db.once("open", () => {
  console.log("Connected to MongoDb");
});
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use("/router", router);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
