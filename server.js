const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
const router = require("./routes");
const port = process.env.PORT || 5000;

app.use("/router", router);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});