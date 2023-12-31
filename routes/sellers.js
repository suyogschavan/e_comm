const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
// const { User } = require("../models/users");
const { Catlog } = require("../models/catlogs");
const { Product } = require("../models/products");
const auth = require("../helpers/jwt");
const { Order } = require("../models/orders");

// router.use(bodyParser.json());

router.post("/create-catalog", auth, async (req, res) => {
  try {
    const sellerId = req.user.userId;
    const userType = req.user.userType;
    const products = req.body.products;

    if (userType != "seller") {
      res.status(400).send("User is not a seller");
    }

    const existingCatlog = await Catlog.findOne({ seller_id: sellerId });
    if (existingCatlog) {
      return res.status(400).send("Seller already has a catalog");
    }

    const validProducts = await Product.find({ _id: { $in: products } });
    if (validProducts.length !== products.length) {
      return res
        .status(400)
        .json({ error: "Invalid products in the catalog." });
    }

    const newCatalog = new Catlog({
      seller_id: sellerId,
      products: products,
    });

    await newCatalog.save();
    console.log(sellerId, userType);
    // res.status(200).json({ message: "Catalog created successfully", id:sellerId });
    res.status(200).json({ message: "Catalog created successfully" });
  } catch (err) {
    res.status(400).send("An error has occured" + err);
  }
});

router.get("/orders", auth, async (req, res) => {
  try {
    const sellerId = req.user.userId;
    const orders = await Order.find({ seller: sellerId });
    res.json(orders);
  } catch {
    (err) => {
      res.status(400).send("There's an error somewhere here:" + err);
    };
  }
});
// extra API
router.post("/create-products", auth, async (req, res) => {
  try {
    // const seller_id = req.user.userId;
    const { name, price } = req.body;

    const alreadyExists = Product.find({ name: name });
    if (alreadyExists) {
      res.status(400).send("Product already exists with name " + name);
    }

    const newProduct = new Product({
      name: name,
      price: price,
    });

    await newProduct.save().then(()=>{res.json({ message: "Product added successfully" });})
    
  } catch (error) {
    // console.error(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});
// another extra API
router.get("/allproducts", auth, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
module.exports = router;
