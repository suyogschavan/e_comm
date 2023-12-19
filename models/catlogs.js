const mongoose = require('mongoose');
const catlogsSchema = mongoose.Schema({
    seller_id: {
      type:mongoose.Types.ObjectId,
    },
    products: [{
      type:mongoose.Types.ObjectId,
      ref:'Products',
    }],
  });

exports.Catlog = mongoose.model('Catlog', catlogsSchema);