const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    buyer: { type:mongoose.Types.ObjectId, ref:'users'},
    seller: { type:mongoose.Types.ObjectId, ref:'users'},
    products: [{type:mongoose.Types.ObjectId, ref: 'products'}],
  });

exports.Order = mongoose.model('Order', orderSchema);