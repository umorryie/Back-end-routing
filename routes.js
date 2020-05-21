const express = require("express");
const router = express.Router();
router.get("/producst", (req, res) => {
  res.json("lol");
});
module.exports = router;
