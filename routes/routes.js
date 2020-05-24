const express = require("express");
const router = express.Router();
const Product = require("../products/Producs");
const produkti = require("../productsListForDataBase");
// get all products from database
router.get("/products", (req, res) => {
  Product.find({})
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err));
});

//post requested product
router.post("/product", (req, res) => {
  const { name, price, date, available, productID } = req.body;

  if (date) {
    const object = { price, date, name, productID, available };
    console.log(object);
    const novi = new Product(object);
    novi
      .save()
      .then((e) => res.json("Saved"))
      .catch((err) => res.status(400).json(err));
  } else {
    const object = { price, name, productID, available };
    const novi = new Product(object);
    novi
      .save()
      .then((e) => res.json("Saved"))
      .catch((err) => res.status(400).json(err));
  }
});
//get product by its id
router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findOne({ _id: id })
    .then((data) =>
      data
        ? res.json(data)
        : res.status(404).json(`No product with _id: ${id}!`)
    )
    .catch((err) => res.status(404).json(err));
});
//get product by productID
router.get("/product/productID/:productID", (req, res) => {
  const { productID } = req.params;
  Product.findOne({ productID })
    .then((data) =>
      data
        ? res.json(data)
        : res.status(404).json(`No product with productID: ${productID}!`)
    )
    .catch((err) => res.status(404).json(err));
});
//delete product with certain id
router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findOneAndDelete({ _id: id })
    .then((data) =>
      data
        ? res.json(`Successfully deleted product with _id:${id}!`)
        : res.status(404).json(`No product with id: ${id}!`)
    )
    .catch((err) => res.status(404).json(err));
});
//delete product with certain productID
router.delete("/product/productID/:productID", (req, res) => {
  const { productID } = req.params;
  Product.findOneAndDelete({ productID })
    .then((data) => {
      data
        ? res.json(`Successfully deleted product with productID: ${productID}!`)
        : res.status(404).json(`No product with productID: ${productID}!`);
    })
    .catch((err) => res.status(404).json(err));
});
//change products property by id
router.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, date, available, productID } = req.body;
  const arayNames = ["name", "price", "date", "available", "productID"];
  const aray = [name, price, date, available, productID];
  let objekt = {};
  aray.forEach((el, i) => {
    if (el) {
      objekt[arayNames[i]] = el;
    }
  });
  console.log(objekt);

  Product.findByIdAndUpdate(id, objekt)
    .then((data) =>
      data
        ? res.json("Successfully updated!")
        : res.status(404).json(`No product with productID: ${id}`)
    )
    .catch((err) => res.status(404).json(err));
});
//change products property by productID
router.put("/product/productID/:productID", (req, res) => {
  const { productID } = req.params;
  const { name, price, date, available, NewproductID } = req.body;
  const arayNames = ["name", "price", "date", "available", "productID"];
  const aray = [name, price, date, available, NewproductID];
  let objekt = {};
  aray.forEach((el, i) => {
    if (el) {
      objekt[arayNames[i]] = el;
    }
  });
  console.log(objekt);

  Product.findOne({ productID })
    .then((data) => {
      console.log(data);
      if (data) {
        Product.findByIdAndUpdate(data["_id"], objekt)
          .then((newdata) =>
            newdata
              ? res.json("Successfully updated!")
              : res.status(404).json(`No product with productID: ${id}`)
          )
          .catch((err) => res.status(404).json(err));
      } else {
        res.status(404).json(`No product with productID: ${productID}`);
      }
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
