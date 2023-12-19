const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { User } = require("../models/users");
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
  const { username, password, type } = req.body;

  if(!username || !password || !type){
    return res.status(500).send("Please enter all the required fields")
  }

  const isThere = await User.findOne({ username });
  if (isThere) {
    return res.status(400).send("User with this username already Exists");
  }
  // const hash_key = process.env.secret_key;
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPass,
    type,
  });
  await newUser.save().catch((err)=>{res.status(500).json({message:"Internal Server Error"})});
  res.status(200).json({ message: "User registered successfully" });
  // res.status(200).json(newUser);
});


router.post("/login", async (req, res) => {
  const user = await User.findOne({username:req.body.username});
  if(!user){
    return res.status(400).send('Wrong username or password');
  }
  if(bcrypt.compareSync(req.body.password, user.password)){
    // Generating the JWT token
    const secret = process.env.secret;
    const token = jwt.sign({user}, secret, {expiresIn:'12h'})
    res.status(200).send({username: user.username, token:token});
  }else{
    return res.status(400).send('Wrong username or password');
  }
});

module.exports = router;