const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  type: {
    type:String,
    enum: ['buyer','seller'],
    required:true
  },
});

exports.User = mongoose.model("Users", userSchema);
