const express = require("express");
const { User } = require("../models/users");
const { Catlog } = require("../models/catlogs");
const router = express.Router();
const auth = require("../helpers/jwt");
const { Product } = require("../models/products");
const { Order } = require("../models/orders");

router.get("/list-of-sellers", auth, async (req, res) => {
  try {
    const sellers = await User.find({ type: "seller" }).select("username");
    res.send(sellers);
    // res.json({'id':sellers._id, 'sellerName':sellers.username})
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/seller-catalog/:seller_id", auth, async (req, res) => {
  try {
    const id = req.params.seller_id;
    const seller = await User.findById(id);
    if (!seller || seller.type != "seller") {
      return res.status(400).json({ message: "Seller not found" });
    }
    const catalog = await Catlog.findOne({ seller_id: id });
    res.send(catalog);
  } catch (err) {
    res.status(500).send("An error occured" + err);
  }
});

router.post("/create-order/:seller_id", auth, async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const user_id = req.user.userId;
    const products = req.body.products;

    const seller = await User.findById(seller_id);
    if (!seller || seller.type != "seller") {
      res.status(400).send("Seller does not exists");
    }

    const validProducts = await Product.find({ _id: { $in: products } });
    if (validProducts.length != products.length) {
      res.status(400).send("Products are not valid");
    }

    const order = new Order({
      buyer: user_id,
      seller: seller_id,
      products: products,
    });

    await order.save();
    res.status(200).json({ message: "Order created successfully" });
  } catch {
    (err) => {
      res.status(400).send(err);
    };
  }
});

module.exports = router;
