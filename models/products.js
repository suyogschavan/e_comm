const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  // seller_id: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Users",
  //   required: true,
  // }
});

exports.Product = mongoose.model("Product", productSchema);
