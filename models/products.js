const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

exports.Product = mongoose.model("Product", productSchema);
