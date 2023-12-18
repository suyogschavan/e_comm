const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const {Product} = require('../models/products');

router.post("/", (req, res) => {
  const product = new Product({
    username: req.body.username,
    type: req.body.type,
  });

  product
    .save()
    .then(() => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

module.exports = router;
