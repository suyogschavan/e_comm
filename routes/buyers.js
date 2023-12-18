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

    const catalog = await Catlog.findOne({ seller: id });
    res.send(catalog);
  } catch (err) {
    res.status(500).send("An error occured");
  }
});

router.post("/create-order/:seller_id", auth, async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const buyerID = req.user.userId;
    const { products } = req.body;

    const seller = await findById(seller_id);
    if (!seller || seller.type != "seller") {
      res.status(500).send("No seller found");
    }

    const validateProducts = await Product.find({ _id: { $in: products } });
    if (validProducts.length !== products.length) {
      return res.status(400).json({ error: "Invalid products in the order." });
    }

    // creating the order
    const order = new Order({
      buyer: buyerID,
      seller: seller_id,
      products: products,
    });

    await order.save();
    res.status(200).json({ message: "Order created successfully" });
  } catch (err) {
    res.status(500).send("An error occured");
  }
});
module.exports = router;
