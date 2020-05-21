const express = require("express");
const router = express.Router();
router.get("/products", (req, res) => {
  res.json("lol");
});
router.post("/products", (req, res) => {
  res.json("l123ol");
});
router.get("/product/:id", (req, res) => {
  res.json("lo123l");
});
router.delete("/product/:id", (req, res) => {
  res.json("lol");
});
router.put("/product", (req, res) => {
  res.json("lol");
});

module.exports = router;
