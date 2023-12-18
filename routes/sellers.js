const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const { Catlog } = require("../models/catlogs");
const { Product } = require("../models/products");
const auth = require("../helpers/jwt");

router.post("/create-catalog", auth, async (req, res) => {
  try {
    const seller_id = req.user.userId;
    const products = req.body;

    const existingCatlog = await Catlog.findOne({ seller: seller_id });
    if (existingCatlog) {
      return res.status(400).send("Seller already has a catalog");
    }

    const validProduct = await Product.find({ _id: { $in: products } });
    if (validProduct.length != products.length) {
      return res.status(400).send("Invalid products in catalog");
    }

    const newCatalog = new Catlog({
      seller: seller_id,
      products: products,
    });

    await newCatalog.save();
    res.status(200).json({ message: "Catalog created successfully" });
  } catch (err) {
    res.status(400).send("An error has occured" + err);
  }
});

router.post("/create-products", async (req, res) => {
  try {
    // const seller_id = req.user.userId;
    const { name, price } = req.body;

    // const alreadyExists = Product.find({name:name});
    // if(alreadyExists){res.status(400).send('Product already exists with name '+name)};

    const newProduct = new Product({
      name: name,
      price: price,
    });

    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/allproducts', (req, res)=>{
    const products = Product.find();
    res.send(products);
})

module.exports = router;
