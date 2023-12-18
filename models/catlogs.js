const mongoose = require('mongoose');
const catlogsSchema = mongoose.Schema({
    seller: {
      type:mongoose.Types.ObjectId,
      ref:'Users',
    },
    products: [{
      type:mongoose.Types.ObjectId,
      ref:'products',
    }],
  });

exports.Catlog = mongoose.model('Catlog', catlogsSchema);